namespace OrtegaTourism.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int Stars { get; set; }
        public decimal PricePerNight { get; set; }
        public List<string> Services { get; set; } = new List<string>();
        public List<string> RoomTypes { get; set; } = new List<string>();
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}