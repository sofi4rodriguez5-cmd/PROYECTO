<?php
// Backend PHP para Ortega Tourism
// API REST con almacenamiento en memoria

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Autoload de clases
spl_autoload_register(function ($class) {
    $paths = [
        __DIR__ . '/Models/' . $class . '.php',
        __DIR__ . '/Services/' . $class . '.php',
        __DIR__ . '/Controllers/' . $class . '.php'
    ];
    
    foreach ($paths as $path) {
        if (file_exists($path)) {
            require_once $path;
            return;
        }
    }
});

// Inicializar servicios (singleton)
$touristService = TouristService::getInstance();
$cartService = CartService::getInstance($touristService);

// Enrutador simple
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remover query string
$requestUri = strtok($requestUri, '?');

// Parsear la ruta
$path = parse_url($requestUri, PHP_URL_PATH);
$path = str_replace('/proyecto/backend-php', '', $path);
$path = trim($path, '/');

// Dividir la ruta en segmentos
$segments = explode('/', $path);

// Routing
try {
    if ($segments[0] === 'api') {
        $controller = $segments[1] ?? '';
        
        switch ($controller) {
            case 'tourism':
                $tourismController = new TourismController($touristService);
                $tourismController->handleRequest($segments, $requestMethod);
                break;
                
            case 'hotels':
                $hotelsController = new HotelsController($touristService);
                $hotelsController->handleRequest($segments, $requestMethod);
                break;
                
            case 'restaurants':
                $restaurantsController = new RestaurantsController($touristService);
                $restaurantsController->handleRequest($segments, $requestMethod);
                break;
                
            case 'transportation':
                $transportationController = new TransportationController($touristService);
                $transportationController->handleRequest($segments, $requestMethod);
                break;
                
            case 'cart':
                $cartController = new CartController($cartService);
                $cartController->handleRequest($segments, $requestMethod);
                break;
                
            default:
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint not found']);
                break;
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Invalid API path']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
