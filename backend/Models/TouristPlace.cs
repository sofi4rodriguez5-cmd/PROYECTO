namespace OrtegaTourism.Models
{
    public class TouristPlace
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<string> Activities { get; set; } = new List<string>();
        public string OpeningHours { get; set; } = string.Empty;
    }
}