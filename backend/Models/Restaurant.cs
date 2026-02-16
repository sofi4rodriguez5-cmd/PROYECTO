namespace OrtegaTourism.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string CuisineType { get; set; } = string.Empty;
        public string PriceRange { get; set; } = string.Empty;
        public List<string> Specialties { get; set; } = new List<string>();
        public string OpeningHours { get; set; } = string.Empty;
        public double Rating { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}