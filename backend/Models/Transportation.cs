namespace OrtegaTourism.Models
{
    public class Transportation
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // Bus, Taxi, Moto-taxi, etc.
        public string Description { get; set; } = string.Empty;
        public string Route { get; set; } = string.Empty;
        public string Schedule { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Contact { get; set; } = string.Empty;
        public List<string> Services { get; set; } = new List<string>();
        public string ImageUrl { get; set; } = string.Empty;
    }
}