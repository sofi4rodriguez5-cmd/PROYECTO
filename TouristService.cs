using OrtegaTourism.Models;

public class TouristService
{
    private readonly List<TouristPlace> _touristPlaces;
    private readonly CityInfo _cityInfo;

    public TouristService()
    {
        _cityInfo = new CityInfo
        {
            Name = "Ortega",
            Description = "Un hermoso municipio ubicado en el departamento de Tolima, Colombia, conocido por su rica historia, cultura y paisajes naturales.",
            History = "Ortega fue fundada en 1627 y ha sido testigo de importantes eventos históricos de Colombia. Su arquitectura colonial y tradiciones se mantienen vivas hasta hoy.",
            Population = 35000,
            Climate = "Clima cálido tropical con temperaturas promedio de 28°C",
            Location = "Departamento del Tolima, Colombia",
            Highlights = new List<string>
            {
                "Arquitectura colonial preservada",
                "Rica tradición cultural",
                "Paisajes naturales únicos",
                "Gastronomía típica tolimense",
                "Festivales tradicionales"
            }
        };

        _touristPlaces = new List<TouristPlace>
        {
            new TouristPlace
            {
                Id = 1,
                Name = "Plaza Principal de Ortega",
                Description = "El corazón del municipio, rodeada de arquitectura colonial y la imponente iglesia parroquial.",
                Category = "Histórico",
                ImageUrl = "https://via.placeholder.com/400x300/2d5a27/ffffff?text=Plaza+Principal",
                Latitude = 3.7833,
                Longitude = -75.2667,
                Activities = new List<string> { "Fotografía", "Caminatas", "Observación arquitectónica" },
                OpeningHours = "24 horas"
            },
            new TouristPlace
            {
                Id = 2,
                Name = "Iglesia San Bartolomé",
                Description = "Hermosa iglesia colonial del siglo XVII, patrimonio arquitectónico de Ortega.",
                Category = "Religioso",
                ImageUrl = "https://via.placeholder.com/400x300/2d5a27/ffffff?text=Iglesia+San+Bartolome",
                Latitude = 3.7835,
                Longitude = -75.2665,
                Activities = new List<string> { "Visitas guiadas", "Oración", "Fotografía" },
                OpeningHours = "6:00 AM - 6:00 PM"
            },
            new TouristPlace
            {
                Id = 3,
                Name = "Mirador Cerro de la Cruz",
                Description = "Punto panorámico que ofrece vistas espectaculares del valle y el municipio de Ortega.",
                Category = "Natural",
                ImageUrl = "https://via.placeholder.com/400x300/2d5a27/ffffff?text=Mirador+Cerro",
                Latitude = 3.7900,
                Longitude = -75.2600,
                Activities = new List<string> { "Senderismo", "Fotografía", "Contemplación" },
                OpeningHours = "5:00 AM - 6:00 PM"
            },
            new TouristPlace
            {
                Id = 4,
                Name = "Casa de la Cultura",
                Description = "Centro cultural que preserva y promueve las tradiciones artísticas y culturales de Ortega.",
                Category = "Cultural",
                ImageUrl = "https://via.placeholder.com/400x300/2d5a27/ffffff?text=Casa+Cultura",
                Latitude = 3.7830,
                Longitude = -75.2670,
                Activities = new List<string> { "Exposiciones", "Talleres", "Eventos culturales" },
                OpeningHours = "8:00 AM - 5:00 PM"
            },
            new TouristPlace
            {
                Id = 5,
                Name = "Río Ortega",
                Description = "Río que atraviesa el municipio, ideal para actividades recreativas y contacto con la naturaleza.",
                Category = "Natural",
                ImageUrl = "https://via.placeholder.com/400x300/2d5a27/ffffff?text=Rio+Ortega",
                Latitude = 3.7800,
                Longitude = -75.2700,
                Activities = new List<string> { "Pesca", "Natación", "Picnic" },
                OpeningHours = "24 horas"
            },
            new TouristPlace
            {
                Id = 6,
                Name = "Mercado Municipal",
                Description = "Mercado tradicional donde se pueden encontrar productos locales y gastronomía típica.",
                Category = "Gastronómico",
                ImageUrl = "https://via.placeholder.com/400x300/2d5a27/ffffff?text=Mercado+Municipal",
                Latitude = 3.7825,
                Longitude = -75.2675,
                Activities = new List<string> { "Compras", "Degustación", "Intercambio cultural" },
                OpeningHours = "6:00 AM - 4:00 PM"
            }
        };
    }

    public CityInfo GetCityInfo()
    {
        return _cityInfo;
    }

    public List<TouristPlace> GetAllTouristPlaces()
    {
        return _touristPlaces;
    }

    public TouristPlace? GetTouristPlaceById(int id)
    {
        return _touristPlaces.FirstOrDefault(p => p.Id == id);
    }

    public List<TouristPlace> GetTouristPlacesByCategory(string category)
    {
        return _touristPlaces.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();
    }
}