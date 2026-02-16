namespace OrtegaTourism.Models
{
    public class CartItem
    {
        public string Id { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // "place", "hotel", "restaurant", "transport"
        public int ItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
        public DateTime AddedAt { get; set; }
        public Dictionary<string, object> AdditionalInfo { get; set; } = new Dictionary<string, object>();
    }
}