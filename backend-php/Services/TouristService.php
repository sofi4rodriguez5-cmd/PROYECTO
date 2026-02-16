<?php

class TouristService {
    private static ?TouristService $instance = null;
    private array $touristPlaces = [];
    private array $hotels = [];
    private array $restaurants = [];
    private array $transportations = [];
    private ?CityInfo $cityInfo = null;
    
    private function __construct() {
        $this->touristPlaces = $this->initializeTouristPlaces();
        $this->hotels = $this->initializeHotels();
        $this->restaurants = $this->initializeRestaurants();
        $this->transportations = $this->initializeTransportations();
        $this->cityInfo = $this->initializeCityInfo();
    }
    
    public static function getInstance(): TouristService {
        if (self::$instance === null) {
            self::$instance = new TouristService();
        }
        return self::$instance;
    }
    
    // Lugares Turísticos
    public function getAllTouristPlaces(): array {
        return $this->touristPlaces;
    }
    
    public function getTouristPlaceById(int $id): ?TouristPlace {
        foreach ($this->touristPlaces as $place) {
            if ($place->id === $id) {
                return $place;
            }
        }
        return null;
    }
    
    public function getTouristPlacesByCategory(string $category): array {
        return array_filter($this->touristPlaces, function($place) use ($category) {
            return strcasecmp($place->category, $category) === 0;
        });
    }
    
    public function getAllCategories(): array {
        $categories = array_map(function($place) {
            return $place->category;
        }, $this->touristPlaces);
        return array_values(array_unique($categories));
    }
    
    // Hoteles
    public function getAllHotels(): array {
        return $this->hotels;
    }
    
    public function getHotelById(int $id): ?Hotel {
        foreach ($this->hotels as $hotel) {
            if ($hotel->id === $id) {
                return $hotel;
            }
        }
        return null;
    }
    
    // Restaurantes
    public function getAllRestaurants(): array {
        return $this->restaurants;
    }
    
    public function getRestaurantById(int $id): ?Restaurant {
        foreach ($this->restaurants as $restaurant) {
            if ($restaurant->id === $id) {
                return $restaurant;
            }
        }
        return null;
    }
    
    public function getRestaurantsByCuisine(string $cuisineType): array {
        return array_filter($this->restaurants, function($restaurant) use ($cuisineType) {
            return strcasecmp($restaurant->cuisineType, $cuisineType) === 0;
        });
    }
    
    public function getCuisineTypes(): array {
        $types = array_map(function($restaurant) {
            return $restaurant->cuisineType;
        }, $this->restaurants);
        return array_values(array_unique($types));
    }
    
    // Transporte
    public function getAllTransportations(): array {
        return $this->transportations;
    }
    
    public function getTransportationById(int $id): ?Transportation {
        foreach ($this->transportations as $transportation) {
            if ($transportation->id === $id) {
                return $transportation;
            }
        }
        return null;
    }
    
    public function getTransportationsByType(string $type): array {
        return array_filter($this->transportations, function($transportation) use ($type) {
            return strcasecmp($transportation->type, $type) === 0;
        });
    }
    
    public function getTransportationTypes(): array {
        $types = array_map(function($transportation) {
            return $transportation->type;
        }, $this->transportations);
        return array_values(array_unique($types));
    }
    
    // Información de la ciudad
    public function getCityInfo(): CityInfo {
        return $this->cityInfo;
    }
    
    private function initializeTouristPlaces(): array {
        $places = [];
        
        $place1 = new TouristPlace();
        $place1->id = 1;
        $place1->name = 'Cerro de los Abechuchos';
        $place1->description = 'Majestuoso cerro que ofrece las mejores vistas panorámicas de Ortega y sus alrededores. Ideal para senderismo, fotografía y contemplación de la naturaleza.';
        $place1->category = 'Natural';
        $place1->imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';
        $place1->activities = ['Senderismo', 'Fotografía', 'Observación de aves', 'Camping'];
        $place1->openingHours = '6:00 AM - 6:00 PM';
        $place1->latitude = 3.7320;
        $place1->longitude = -75.3450;
        $places[] = $place1;
        
        $place2 = new TouristPlace();
        $place2->id = 2;
        $place2->name = 'Laguna de Ortega';
        $place2->description = 'Hermosa laguna natural rodeada de exuberante vegetación tropical. Un oasis de tranquilidad perfecto para la relajación y actividades acuáticas.';
        $place2->category = 'Natural';
        $place2->imageUrl = 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop';
        $place2->activities = ['Natación', 'Pesca', 'Kayak', 'Picnic'];
        $place2->openingHours = '7:00 AM - 5:00 PM';
        $place2->latitude = 3.7280;
        $place2->longitude = -75.3420;
        $places[] = $place2;
        
        $place3 = new TouristPlace();
        $place3->id = 3;
        $place3->name = 'Parque Principal de Ortega';
        $place3->description = 'Corazón social y cultural del municipio. Plaza central con arquitectura colonial, rodeada de comercio local y actividades comunitarias.';
        $place3->category = 'Cultural';
        $place3->imageUrl = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop';
        $place3->activities = ['Paseos', 'Eventos culturales', 'Compras', 'Gastronomía'];
        $place3->openingHours = '24 horas';
        $place3->latitude = 3.7300;
        $place3->longitude = -75.3400;
        $places[] = $place3;
        
        $place4 = new TouristPlace();
        $place4->id = 4;
        $place4->name = 'Iglesia Principal de Ortega';
        $place4->description = 'Histórica iglesia colonial que representa el patrimonio religioso y arquitectónico del municipio. Construcción de gran valor cultural e histórico.';
        $place4->category = 'Cultural';
        $place4->imageUrl = 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&h=600&fit=crop';
        $place4->activities = ['Visitas guiadas', 'Fotografía', 'Oración', 'Turismo religioso'];
        $place4->openingHours = '6:00 AM - 6:00 PM';
        $place4->latitude = 3.7305;
        $place4->longitude = -75.3405;
        $places[] = $place4;
        
        $place5 = new TouristPlace();
        $place5->id = 5;
        $place5->name = 'Ríos y Quebradas de Ortega';
        $place5->description = 'Red de ríos cristalinos y quebradas que atraviesan el territorio. Perfectos para ecoturismo, deportes acuáticos y conexión con la naturaleza.';
        $place5->category = 'Natural';
        $place5->imageUrl = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop';
        $place5->activities = ['Rafting', 'Pesca deportiva', 'Caminatas ecológicas', 'Fotografía'];
        $place5->openingHours = '6:00 AM - 6:00 PM';
        $place5->latitude = 3.7250;
        $place5->longitude = -75.3380;
        $places[] = $place5;
        
        return $places;
    }
    
    private function initializeHotels(): array {
        $hotels = [];
        
        $hotel1 = new Hotel();
        $hotel1->id = 1;
        $hotel1->name = 'Hotel Calle Real';
        $hotel1->description = 'Elegante hotel ubicado en el corazón de Ortega, combinando comodidad moderna con el encanto colonial del centro histórico.';
        $hotel1->address = 'Calle Real #15-23, Centro, Ortega';
        $hotel1->phone = '+57 8 2345678';
        $hotel1->email = 'reservas@hotelcallereal.com';
        $hotel1->stars = 4;
        $hotel1->pricePerNight = 120000;
        $hotel1->imageUrl = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
        $hotel1->services = ['WiFi gratuito', 'Desayuno incluido', 'Aire acondicionado', 'TV cable', 'Servicio a la habitación'];
        $hotel1->roomTypes = ['Habitación sencilla', 'Habitación doble', 'Suite junior', 'Suite presidencial'];
        $hotel1->latitude = 3.7300;
        $hotel1->longitude = -75.3400;
        $hotels[] = $hotel1;
        
        $hotel2 = new Hotel();
        $hotel2->id = 2;
        $hotel2->name = "Hotel Loren's";
        $hotel2->description = 'Acogedor hotel familiar que ofrece una experiencia auténtica con la calidez y hospitalidad característica de Ortega.';
        $hotel2->address = 'Carrera 8 #12-45, Centro, Ortega';
        $hotel2->phone = '+57 8 2345679';
        $hotel2->email = 'info@hotellorens.com';
        $hotel2->stars = 3;
        $hotel2->pricePerNight = 85000;
        $hotel2->imageUrl = 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop';
        $hotel2->services = ['WiFi', 'Desayuno', 'Parqueadero', 'Recepción 24h', 'Lavandería'];
        $hotel2->roomTypes = ['Habitación estándar', 'Habitación familiar', 'Habitación triple'];
        $hotel2->latitude = 3.7295;
        $hotel2->longitude = -75.3395;
        $hotels[] = $hotel2;
        
        $hotel3 = new Hotel();
        $hotel3->id = 3;
        $hotel3->name = 'La Posada del Coyote';
        $hotel3->description = 'Encantadora posada rural que ofrece una experiencia única en contacto directo con la naturaleza y las tradiciones locales.';
        $hotel3->address = 'Vereda El Coyote, Ortega';
        $hotel3->phone = '+57 8 2345680';
        $hotel3->email = 'reservas@posadadelcoyote.com';
        $hotel3->stars = 3;
        $hotel3->pricePerNight = 95000;
        $hotel3->imageUrl = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop';
        $hotel3->services = ['Restaurante típico', 'Piscina natural', 'Senderismo guiado', 'WiFi', 'Parqueadero'];
        $hotel3->roomTypes = ['Cabaña rústica', 'Habitación campestre', 'Suite con vista al río'];
        $hotel3->latitude = 3.7350;
        $hotel3->longitude = -75.3500;
        $hotels[] = $hotel3;
        
        $hotel4 = new Hotel();
        $hotel4->id = 4;
        $hotel4->name = 'Hotel Villa Valeria';
        $hotel4->description = 'Moderno hotel que combina confort contemporáneo con la tranquilidad del ambiente rural de Ortega.';
        $hotel4->address = 'Avenida Principal #20-15, Ortega';
        $hotel4->phone = '+57 8 2345681';
        $hotel4->email = 'contacto@villavaleria.com';
        $hotel4->stars = 4;
        $hotel4->pricePerNight = 110000;
        $hotel4->imageUrl = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop';
        $hotel4->services = ['Spa', 'Gimnasio', 'Piscina', 'WiFi premium', 'Business center', 'Restaurante gourmet'];
        $hotel4->roomTypes = ['Habitación ejecutiva', 'Suite junior', 'Suite presidencial', 'Penthouse'];
        $hotel4->latitude = 3.7310;
        $hotel4->longitude = -75.3390;
        $hotels[] = $hotel4;
        
        return $hotels;
    }
    
    private function initializeRestaurants(): array {
        $restaurants = [];
        
        $restaurant1 = new Restaurant();
        $restaurant1->id = 1;
        $restaurant1->name = 'Blue Martini Ortega';
        $restaurant1->description = 'Restaurante de ambiente sofisticado que combina cocina internacional con los sabores tradicionales del Tolima.';
        $restaurant1->address = 'Calle 10 #8-25, Centro, Ortega';
        $restaurant1->phone = '+57 8 3456789';
        $restaurant1->cuisineType = 'Internacional';
        $restaurant1->priceRange = '$40.000 - $80.000';
        $restaurant1->rating = 4.5;
        $restaurant1->imageUrl = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop';
        $restaurant1->specialties = ['Filete de res', 'Salmón a la plancha', 'Pasta italiana', 'Cócteles premium'];
        $restaurant1->openingHours = '12:00 PM - 10:00 PM';
        $restaurant1->latitude = 3.7298;
        $restaurant1->longitude = -75.3402;
        $restaurants[] = $restaurant1;
        
        $restaurant2 = new Restaurant();
        $restaurant2->id = 2;
        $restaurant2->name = 'Restaurante La Gran Vía';
        $restaurant2->description = 'Auténtico restaurante de comida tradicional tolimense, famoso por sus recetas ancestrales y ambiente familiar.';
        $restaurant2->address = 'Carrera 9 #15-30, Centro, Ortega';
        $restaurant2->phone = '+57 8 3456790';
        $restaurant2->cuisineType = 'Tradicional Tolimense';
        $restaurant2->priceRange = '$15.000 - $35.000';
        $restaurant2->rating = 4.8;
        $restaurant2->imageUrl = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop';
        $restaurant2->specialties = ['Lechona tolimense', 'Tamal tolimense', 'Sancocho de gallina', 'Chicha de maíz'];
        $restaurant2->openingHours = '7:00 AM - 8:00 PM';
        $restaurant2->latitude = 3.7302;
        $restaurant2->longitude = -75.3398;
        $restaurants[] = $restaurant2;
        
        $restaurant3 = new Restaurant();
        $restaurant3->id = 3;
        $restaurant3->name = 'Las Delicias de Lorena';
        $restaurant3->description = 'Restaurante casero que ofrece la auténtica sazón de la cocina tolimense en un ambiente acogedor y familiar.';
        $restaurant3->address = 'Calle 12 #7-18, Ortega';
        $restaurant3->phone = '+57 8 3456791';
        $restaurant3->cuisineType = 'Casera';
        $restaurant3->priceRange = '$12.000 - $25.000';
        $restaurant3->rating = 4.6;
        $restaurant3->imageUrl = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop';
        $restaurant3->specialties = ['Bandeja paisa', 'Ajiaco santafereño', 'Pescado frito', 'Jugos naturales'];
        $restaurant3->openingHours = '6:00 AM - 9:00 PM';
        $restaurant3->latitude = 3.7290;
        $restaurant3->longitude = -75.3410;
        $restaurants[] = $restaurant3;
        
        $restaurant4 = new Restaurant();
        $restaurant4->id = 4;
        $restaurant4->name = 'Asadero Brasa Roja';
        $restaurant4->description = 'Especialistas en carnes asadas y parrillas, ofreciendo los mejores cortes en un ambiente rústico y acogedor.';
        $restaurant4->address = 'Avenida Circunvalar #25-40, Ortega';
        $restaurant4->phone = '+57 8 3456792';
        $restaurant4->cuisineType = 'Parrilla';
        $restaurant4->priceRange = '$25.000 - $50.000';
        $restaurant4->rating = 4.4;
        $restaurant4->imageUrl = 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop';
        $restaurant4->specialties = ['Churrasco', 'Costillas BBQ', 'Chorizo artesanal', 'Arepa con queso'];
        $restaurant4->openingHours = '5:00 PM - 11:00 PM';
        $restaurant4->latitude = 3.7315;
        $restaurant4->longitude = -75.3385;
        $restaurants[] = $restaurant4;
        
        return $restaurants;
    }
    
    private function initializeTransportations(): array {
        $transportations = [];
        
        $transport1 = new Transportation();
        $transport1->id = 1;
        $transport1->name = 'Expreso Tolima - Ruta Ibagué-Ortega';
        $transport1->description = 'Servicio de transporte intermunicipal cómodo y seguro que conecta Ibagué con Ortega en viajes regulares diarios.';
        $transport1->type = 'Bus Intermunicipal';
        $transport1->route = 'Ibagué - Ortega';
        $transport1->schedule = 'Salidas cada 2 horas: 6:00 AM - 8:00 PM';
        $transport1->price = 15000;
        $transport1->contact = '+57 8 4567890';
        $transport1->imageUrl = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop';
        $transport1->services = ['Aire acondicionado', 'Asientos reclinables', 'WiFi', 'Baño a bordo'];
        $transportations[] = $transport1;
        
        $transport2 = new Transportation();
        $transport2->id = 2;
        $transport2->name = 'Taxis Ortega 24 Horas';
        $transport2->description = 'Servicio de taxi local disponible las 24 horas para traslados dentro del municipio y veredas cercanas.';
        $transport2->type = 'Taxi Local';
        $transport2->route = 'Casco urbano y veredas de Ortega';
        $transport2->schedule = 'Disponible 24 horas';
        $transport2->price = 8000;
        $transport2->contact = '+57 8 4567891';
        $transport2->imageUrl = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop';
        $transport2->services = ['Servicio 24h', 'Tarifas fijas', 'Conductores conocedores', 'Servicio a domicilio'];
        $transportations[] = $transport2;
        
        $transport3 = new Transportation();
        $transport3->id = 3;
        $transport3->name = 'Mototaxis El Rápido';
        $transport3->description = 'Transporte ágil y económico en motocicleta, ideal para trayectos cortos y acceso a lugares de difícil acceso.';
        $transport3->type = 'Mototaxi';
        $transport3->route = 'Centro urbano y veredas';
        $transport3->schedule = '6:00 AM - 10:00 PM';
        $transport3->price = 5000;
        $transport3->contact = '+57 8 4567892';
        $transport3->imageUrl = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop';
        $transport3->services = ['Servicio rápido', 'Tarifas económicas', 'Casco incluido', 'Conocimiento local'];
        $transportations[] = $transport3;
        
        $transport4 = new Transportation();
        $transport4->id = 4;
        $transport4->name = 'Transporte Rural Campesino';
        $transport4->description = 'Servicio especializado para acceso a fincas, veredas y sitios turísticos rurales con vehículos 4x4.';
        $transport4->type = 'Transporte Rural';
        $transport4->route = 'Veredas y sitios rurales';
        $transport4->schedule = '7:00 AM - 5:00 PM';
        $transport4->price = 25000;
        $transport4->contact = '+57 8 4567893';
        $transport4->imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';
        $transport4->services = ['Vehículos 4x4', 'Guía local', 'Seguro incluido', 'Tours personalizados'];
        $transportations[] = $transport4;
        
        return $transportations;
    }
    
    private function initializeCityInfo(): CityInfo {
        $cityInfo = new CityInfo();
        $cityInfo->name = 'Ortega';
        $cityInfo->department = 'Tolima';
        $cityInfo->population = 35000;
        $cityInfo->area = 627.3;
        $cityInfo->altitude = 350;
        $cityInfo->temperature = 28;
        $cityInfo->description = 'Ortega es un municipio ubicado al sur del departamento del Tolima, reconocido por su riqueza natural, su clima agradable y la calidez de su gente. Rodeado de paisajes montañosos, ríos y zonas rurales, es un destino ideal para quienes buscan tranquilidad, naturaleza y contacto con la cultura local.';
        $cityInfo->history = 'Fundado en 1741, Ortega tiene una rica historia que se remonta a la época colonial. Su nombre proviene del apellido de uno de sus fundadores. El municipio ha sido testigo de importantes eventos históricos y conserva tradiciones que reflejan la identidad cultural del Tolima.';
        $cityInfo->economy = 'Su economía se basa principalmente en la agricultura y el comercio, destacándose la producción de café, plátano, yuca, maíz y otros productos tradicionales de la región. También tiene un sector ganadero importante y un creciente desarrollo del turismo ecológico.';
        $cityInfo->culture = 'Ortega conserva costumbres y tradiciones que reflejan la identidad cultural del Tolima. Sus festividades incluyen la Feria Agroindustrial y Agropecuaria, celebraciones religiosas y eventos culturales que resaltan la música, danza y gastronomía típica de la región.';
        
        return $cityInfo;
    }
}
