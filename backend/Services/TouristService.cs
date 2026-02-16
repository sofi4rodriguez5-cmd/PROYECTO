using OrtegaTourism.Models;

public class TouristService
{
    private readonly List<TouristPlace> _touristPlaces;
    private readonly List<Hotel> _hotels;
    private readonly List<Restaurant> _restaurants;
    private readonly List<Transportation> _transportations;
    private readonly CityInfo _cityInfo;

    public TouristService()
    {
        _touristPlaces = InitializeTouristPlaces();
        _hotels = InitializeHotels();
        _restaurants = InitializeRestaurants();
        _transportations = InitializeTransportations();
        _cityInfo = InitializeCityInfo();
    }

    // Lugares Turísticos
    public List<TouristPlace> GetAllTouristPlaces() => _touristPlaces;
    public TouristPlace? GetTouristPlaceById(int id) => _touristPlaces.FirstOrDefault(p => p.Id == id);
    public List<TouristPlace> GetTouristPlacesByCategory(string category) => 
        _touristPlaces.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();
    public List<string> GetAllCategories() => _touristPlaces.Select(p => p.Category).Distinct().ToList();

    // Hoteles
    public List<Hotel> GetAllHotels() => _hotels;
    public Hotel? GetHotelById(int id) => _hotels.FirstOrDefault(h => h.Id == id);

    // Restaurantes
    public List<Restaurant> GetAllRestaurants() => _restaurants;
    public Restaurant? GetRestaurantById(int id) => _restaurants.FirstOrDefault(r => r.Id == id);
    public List<Restaurant> GetRestaurantsByCuisine(string cuisineType) => 
        _restaurants.Where(r => r.CuisineType.Equals(cuisineType, StringComparison.OrdinalIgnoreCase)).ToList();
    public List<string> GetAllCuisineTypes() => _restaurants.Select(r => r.CuisineType).Distinct().ToList();

    // Transporte
    public List<Transportation> GetAllTransportations() => _transportations;
    public Transportation? GetTransportationById(int id) => _transportations.FirstOrDefault(t => t.Id == id);
    public List<Transportation> GetTransportationsByType(string type) => 
        _transportations.Where(t => t.Type.Equals(type, StringComparison.OrdinalIgnoreCase)).ToList();
    public List<string> GetAllTransportationTypes() => _transportations.Select(t => t.Type).Distinct().ToList();

    // Información de la ciudad
    public CityInfo GetCityInfo() => _cityInfo;

    private List<TouristPlace> InitializeTouristPlaces()
    {
        return new List<TouristPlace>
        {
            new TouristPlace
            {
                Id = 1,
                Name = "Cerro de los Abechuchos",
                Description = "Majestuoso cerro que ofrece las mejores vistas panorámicas de Ortega y sus alrededores. Ideal para senderismo, fotografía y contemplación de la naturaleza.",
                Category = "Natural",
                ImageUrl = "https://kids.kiddle.co/images/thumb/2/2f/Cerro_de_los_Avechucos.jpg/880px-Cerro_de_los_Avechucos.jpg",
                Activities = new List<string> { "Senderismo", "Fotografía", "Observación de aves", "Camping" },
                OpeningHours = "6:00 AM - 6:00 PM",
                Latitude = 3.7320,
                Longitude = -75.3450
            },
            new TouristPlace
            {
                Id = 2,
                Name = "Laguna de Ortega",
                Description = "Hermosa laguna natural rodeada de exuberante vegetación tropical. Un oasis de tranquilidad perfecto para la relajación y actividades acuáticas.",
                Category = "Natural",
                ImageUrl = "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
                Activities = new List<string> { "Natación", "Pesca", "Kayak", "Picnic" },
                OpeningHours = "7:00 AM - 5:00 PM",
                Latitude = 3.7280,
                Longitude = -75.3420
            },
            new TouristPlace
            {
                Id = 3,
                Name = "Parque Principal de Ortega",
                Description = "Corazón social y cultural del municipio. Plaza central con arquitectura colonial, rodeada de comercio local y actividades comunitarias.",
                Category = "Cultural",
                ImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
                Activities = new List<string> { "Paseos", "Eventos culturales", "Compras", "Gastronomía" },
                OpeningHours = "24 horas",
                Latitude = 3.7300,
                Longitude = -75.3400
            },
            new TouristPlace
            {
                Id = 4,
                Name = "Iglesia Principal de Ortega",
                Description = "Histórica iglesia colonial que representa el patrimonio religioso y arquitectónico del municipio. Construcción de gran valor cultural e histórico.",
                Category = "Cultural",
                ImageUrl = "https://elcronista.co/assets/media/ortega-tolima.jpg",
                Activities = new List<string> { "Visitas guiadas", "Fotografía", "Oración", "Turismo religioso" },
                OpeningHours = "6:00 AM - 6:00 PM",
                Latitude = 3.7305,
                Longitude = -75.3405
            },
            new TouristPlace
            {
                Id = 5,
                Name = "Ríos y Quebradas de Ortega",
                Description = "Red de ríos cristalinos y quebradas que atraviesan el territorio. Perfectos para ecoturismo, deportes acuáticos y conexión con la naturaleza.",
                Category = "Natural",
                ImageUrl = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
                Activities = new List<string> { "Rafting", "Pesca deportiva", "Caminatas ecológicas", "Fotografía" },
                OpeningHours = "6:00 AM - 6:00 PM",
                Latitude = 3.7250,
                Longitude = -75.3380
            }
        };
    }

    private List<Hotel> InitializeHotels()
    {
        return new List<Hotel>
        {
            new Hotel
            {
                Id = 1,
                Name = "Hotel Calle Real",
                Description = "Elegante hotel ubicado en el corazón de Ortega, combinando comodidad moderna con el encanto colonial del centro histórico.",
                Address = "Calle Real #15-23, Centro, Ortega",
                Phone = "+57 8 2345678",
                Email = "reservas@hotelcallereal.com",
                Stars = 4,
                PricePerNight = 120000,
                ImageUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
                Services = new List<string> { "WiFi gratuito", "Desayuno incluido", "Aire acondicionado", "TV cable", "Servicio a la habitación" },
                RoomTypes = new List<string> { "Habitación sencilla", "Habitación doble", "Suite junior", "Suite presidencial" },
                Latitude = 3.7300,
                Longitude = -75.3400
            },
            new Hotel
            {
                Id = 2,
                Name = "Hotel Loren's",
                Description = "Acogedor hotel familiar que ofrece una experiencia auténtica con la calidez y hospitalidad característica de Ortega.",
                Address = "Carrera 8 #12-45, Centro, Ortega",
                Phone = "+57 8 2345679",
                Email = "info@hotellorens.com",
                Stars = 3,
                PricePerNight = 85000,
                ImageUrl = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
                Services = new List<string> { "WiFi", "Desayuno", "Parqueadero", "Recepción 24h", "Lavandería" },
                RoomTypes = new List<string> { "Habitación estándar", "Habitación familiar", "Habitación triple" },
                Latitude = 3.7295,
                Longitude = -75.3395
            },
            new Hotel
            {
                Id = 3,
                Name = "La Posada del Coyote",
                Description = "Encantadora posada rural que ofrece una experiencia única en contacto directo con la naturaleza y las tradiciones locales.",
                Address = "Vereda El Coyote, Ortega",
                Phone = "+57 8 2345680",
                Email = "reservas@posadadelcoyote.com",
                Stars = 3,
                PricePerNight = 95000,
                ImageUrl = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
                Services = new List<string> { "Restaurante típico", "Piscina natural", "Senderismo guiado", "WiFi", "Parqueadero" },
                RoomTypes = new List<string> { "Cabaña rústica", "Habitación campestre", "Suite con vista al río" },
                Latitude = 3.7350,
                Longitude = -75.3500
            },
            new Hotel
            {
                Id = 4,
                Name = "Hotel Villa Valeria",
                Description = "Moderno hotel que combina confort contemporáneo con la tranquilidad del ambiente rural de Ortega.",
                Address = "Avenida Principal #20-15, Ortega",
                Phone = "+57 8 2345681",
                Email = "contacto@villavaleria.com",
                Stars = 4,
                PricePerNight = 110000,
                ImageUrl = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
                Services = new List<string> { "Spa", "Gimnasio", "Piscina", "WiFi premium", "Business center", "Restaurante gourmet" },
                RoomTypes = new List<string> { "Habitación ejecutiva", "Suite junior", "Suite presidencial", "Penthouse" },
                Latitude = 3.7310,
                Longitude = -75.3390
            }
        };
    }

    private List<Restaurant> InitializeRestaurants()
    {
        return new List<Restaurant>
        {
            new Restaurant
            {
                Id = 1,
                Name = "Blue Martini Ortega",
                Description = "Restaurante de ambiente sofisticado que combina cocina internacional con los sabores tradicionales del Tolima.",
                Address = "Calle 10 #8-25, Centro, Ortega",
                Phone = "+57 8 3456789",
                CuisineType = "Internacional",
                PriceRange = "$40.000 - $80.000",
                Rating = 4.5,
                ImageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                Specialties = new List<string> { "Filete de res", "Salmón a la plancha", "Pasta italiana", "Cócteles premium" },
                OpeningHours = "12:00 PM - 10:00 PM",
                Latitude = 3.7298,
                Longitude = -75.3402
            },
            new Restaurant
            {
                Id = 2,
                Name = "Restaurante La Gran Vía",
                Description = "Auténtico restaurante de comida tradicional tolimense, famoso por sus recetas ancestrales y ambiente familiar.",
                Address = "Carrera 9 #15-30, Centro, Ortega",
                Phone = "+57 8 3456790",
                CuisineType = "Tradicional Tolimense",
                PriceRange = "$15.000 - $35.000",
                Rating = 4.8,
                ImageUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
                Specialties = new List<string> { "Lechona tolimense", "Tamal tolimense", "Sancocho de gallina", "Chicha de maíz" },
                OpeningHours = "7:00 AM - 8:00 PM",
                Latitude = 3.7302,
                Longitude = -75.3398
            },
            new Restaurant
            {
                Id = 3,
                Name = "Las Delicias de Lorena",
                Description = "Restaurante casero que ofrece la auténtica sazón de la cocina tolimense en un ambiente acogedor y familiar.",
                Address = "Calle 12 #7-18, Ortega",
                Phone = "+57 8 3456791",
                CuisineType = "Casera",
                PriceRange = "$12.000 - $25.000",
                Rating = 4.6,
                ImageUrl = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
                Specialties = new List<string> { "Bandeja paisa", "Ajiaco santafereño", "Pescado frito", "Jugos naturales" },
                OpeningHours = "6:00 AM - 9:00 PM",
                Latitude = 3.7290,
                Longitude = -75.3410
            },
            new Restaurant
            {
                Id = 4,
                Name = "Asadero Brasa Roja",
                Description = "Especialistas en carnes asadas y parrillas, ofreciendo los mejores cortes en un ambiente rústico y acogedor.",
                Address = "Avenida Circunvalar #25-40, Ortega",
                Phone = "+57 8 3456792",
                CuisineType = "Parrilla",
                PriceRange = "$25.000 - $50.000",
                Rating = 4.4,
                ImageUrl = "https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop",
                Specialties = new List<string> { "Churrasco", "Costillas BBQ", "Chorizo artesanal", "Arepa con queso" },
                OpeningHours = "5:00 PM - 11:00 PM",
                Latitude = 3.7315,
                Longitude = -75.3385
            }
        };
    }

    private List<Transportation> InitializeTransportations()
    {
        return new List<Transportation>
        {
            new Transportation
            {
                Id = 1,
                Name = "Expreso Tolima - Ruta Ibagué-Ortega",
                Description = "Servicio de transporte intermunicipal cómodo y seguro que conecta Ibagué con Ortega en viajes regulares diarios.",
                Type = "Bus Intermunicipal",
                Route = "Ibagué - Ortega",
                Schedule = "Salidas cada 2 horas: 6:00 AM - 8:00 PM",
                Price = 15000,
                Contact = "+57 8 4567890",
                ImageUrl = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
                Services = new List<string> { "Aire acondicionado", "Asientos reclinables", "WiFi", "Baño a bordo" }
            },
            new Transportation
            {
                Id = 2,
                Name = "Taxis Ortega 24 Horas",
                Description = "Servicio de taxi local disponible las 24 horas para traslados dentro del municipio y veredas cercanas.",
                Type = "Taxi Local",
                Route = "Casco urbano y veredas de Ortega",
                Schedule = "Disponible 24 horas",
                Price = 8000,
                Contact = "+57 8 4567891",
                ImageUrl = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
                Services = new List<string> { "Servicio 24h", "Tarifas fijas", "Conductores conocedores", "Servicio a domicilio" }
            },
            new Transportation
            {
                Id = 3,
                Name = "Mototaxis El Rápido",
                Description = "Transporte ágil y económico en motocicleta, ideal para trayectos cortos y acceso a lugares de difícil acceso.",
                Type = "Mototaxi",
                Route = "Centro urbano y veredas",
                Schedule = "6:00 AM - 10:00 PM",
                Price = 5000,
                Contact = "+57 8 4567892",
                ImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
                Services = new List<string> { "Servicio rápido", "Tarifas económicas", "Casco incluido", "Conocimiento local" }
            },
            new Transportation
            {
                Id = 4,
                Name = "Transporte Rural Campesino",
                Description = "Servicio especializado para acceso a fincas, veredas y sitios turísticos rurales con vehículos 4x4.",
                Type = "Transporte Rural",
                Route = "Veredas y sitios rurales",
                Schedule = "7:00 AM - 5:00 PM",
                Price = 25000,
                Contact = "+57 8 4567893",
                ImageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
                Services = new List<string> { "Vehículos 4x4", "Guía local", "Seguro incluido", "Tours personalizados" }
            }
        };
    }

    private CityInfo InitializeCityInfo()
    {
        return new CityInfo
        {
            Name = "Ortega",
            Department = "Tolima",
            Population = 35000,
            Area = 627.3,
            Altitude = 350,
            Temperature = 28,
            Description = "Ortega es un municipio ubicado al sur del departamento del Tolima, reconocido por su riqueza natural, su clima agradable y la calidez de su gente. Rodeado de paisajes montañosos, ríos y zonas rurales, es un destino ideal para quienes buscan tranquilidad, naturaleza y contacto con la cultura local.",
            History = "Fundado en 1741, Ortega tiene una rica historia que se remonta a la época colonial. Su nombre proviene del apellido de uno de sus fundadores. El municipio ha sido testigo de importantes eventos históricos y conserva tradiciones que reflejan la identidad cultural del Tolima.",
            Economy = "Su economía se basa principalmente en la agricultura y el comercio, destacándose la producción de café, plátano, yuca, maíz y otros productos tradicionales de la región. También tiene un sector ganadero importante y un creciente desarrollo del turismo ecológico.",
            Culture = "Ortega conserva costumbres y tradiciones que reflejan la identidad cultural del Tolima. Sus festividades incluyen la Feria Agroindustrial y Agropecuaria, celebraciones religiosas y eventos culturales que resaltan la música, danza y gastronomía típica de la región."
        };
    }
}