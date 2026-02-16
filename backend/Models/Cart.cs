namespace OrtegaTourism.Models
{
    public class Cart
    {
        public string Id { get; set; } = string.Empty;
        public List<CartItem> Items { get; set; } = new List<CartItem>();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        
        public decimal TotalPrice => Items.Sum(item => item.Price);
        public int TotalItems => Items.Count;
        
        public Dictionary<string, List<CartItem>> ItemsByCategory => 
            Items.GroupBy(item => item.Type)
                 .ToDictionary(group => group.Key, group => group.ToList());
    }
}