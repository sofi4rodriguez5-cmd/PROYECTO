namespace OrtegaTourism.Models
{
    public class CityInfo
    {
        public string Name { get; set; } = "Ortega";
        public string Description { get; set; } = string.Empty;
        public string History { get; set; } = string.Empty;
        public int Population { get; set; }
        public string Climate { get; set; } = string.Empty;
        public List<string> Highlights { get; set; } = new List<string>();
        public string Location { get; set; } = string.Empty;
    }
}