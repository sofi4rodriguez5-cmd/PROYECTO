using OrtegaTourism.Models;

public class CartService
{
    private readonly Dictionary<string, Cart> _carts = new Dictionary<string, Cart>();
    private readonly TouristService _touristService;

    public CartService(TouristService touristService)
    {
        _touristService = touristService;
    }

    public Cart GetOrCreateCart(string cartId)
    {
        if (string.IsNullOrEmpty(cartId))
        {
            cartId = Guid.NewGuid().ToString();
        }

        if (!_carts.ContainsKey(cartId))
        {
            _carts[cartId] = new Cart
            {
                Id = cartId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
        }

        return _carts[cartId];
    }

    public Cart AddItemToCart(string cartId, string itemType, int itemId)
    {
        var cart = GetOrCreateCart(cartId);
        
        // Verificar si el item ya existe en el carrito
        var existingItem = cart.Items.FirstOrDefault(i => i.Type == itemType && i.ItemId == itemId);
        if (existingItem != null)
        {
            return cart; // No agregar duplicados
        }

        var cartItem = CreateCartItem(itemType, itemId);
        if (cartItem != null)
        {
            cartItem.Id = Guid.NewGuid().ToString();
            cartItem.AddedAt = DateTime.Now;
            cart.Items.Add(cartItem);
            cart.UpdatedAt = DateTime.Now;
        }

        return cart;
    }

    public Cart RemoveItemFromCart(string cartId, string itemId)
    {
        var cart = GetOrCreateCart(cartId);
        var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
        
        if (item != null)
        {
            cart.Items.Remove(item);
            cart.UpdatedAt = DateTime.Now;
        }

        return cart;
    }

    public Cart ClearCart(string cartId)
    {
        var cart = GetOrCreateCart(cartId);
        cart.Items.Clear();
        cart.UpdatedAt = DateTime.Now;
        return cart;
    }

    private CartItem? CreateCartItem(string itemType, int itemId)
    {
        return itemType.ToLower() switch
        {
            "place" => CreatePlaceCartItem(itemId),
            "hotel" => CreateHotelCartItem(itemId),
            "restaurant" => CreateRestaurantCartItem(itemId),
            "transport" => CreateTransportCartItem(itemId),
            _ => null
        };
    }

    private CartItem? CreatePlaceCartItem(int placeId)
    {
        var place = _touristService.GetTouristPlaceById(placeId);
        if (place == null) return null;

        return new CartItem
        {
            Type = "place",
            ItemId = place.Id,
            Name = place.Name,
            Description = place.Description,
            ImageUrl = place.ImageUrl,
            Price = 0, // Los lugares turísticos son gratuitos
            Category = place.Category,
            AdditionalInfo = new Dictionary<string, object>
            {
                ["activities"] = place.Activities,
                ["openingHours"] = place.OpeningHours,
                ["latitude"] = place.Latitude,
                ["longitude"] = place.Longitude
            }
        };
    }

    private CartItem? CreateHotelCartItem(int hotelId)
    {
        var hotel = _touristService.GetHotelById(hotelId);
        if (hotel == null) return null;

        return new CartItem
        {
            Type = "hotel",
            ItemId = hotel.Id,
            Name = hotel.Name,
            Description = hotel.Description,
            ImageUrl = hotel.ImageUrl,
            Price = hotel.PricePerNight,
            Category = $"{hotel.Stars} estrellas",
            AdditionalInfo = new Dictionary<string, object>
            {
                ["address"] = hotel.Address,
                ["phone"] = hotel.Phone,
                ["email"] = hotel.Email,
                ["services"] = hotel.Services,
                ["roomTypes"] = hotel.RoomTypes
            }
        };
    }

    private CartItem? CreateRestaurantCartItem(int restaurantId)
    {
        var restaurant = _touristService.GetRestaurantById(restaurantId);
        if (restaurant == null) return null;

        return new CartItem
        {
            Type = "restaurant",
            ItemId = restaurant.Id,
            Name = restaurant.Name,
            Description = restaurant.Description,
            ImageUrl = restaurant.ImageUrl,
            Price = 25000, // Precio promedio estimado por persona
            Category = restaurant.CuisineType,
            AdditionalInfo = new Dictionary<string, object>
            {
                ["address"] = restaurant.Address,
                ["phone"] = restaurant.Phone,
                ["priceRange"] = restaurant.PriceRange,
                ["specialties"] = restaurant.Specialties,
                ["openingHours"] = restaurant.OpeningHours,
                ["rating"] = restaurant.Rating
            }
        };
    }

    private CartItem? CreateTransportCartItem(int transportId)
    {
        var transport = _touristService.GetTransportationById(transportId);
        if (transport == null) return null;

        return new CartItem
        {
            Type = "transport",
            ItemId = transport.Id,
            Name = transport.Name,
            Description = transport.Description,
            ImageUrl = transport.ImageUrl,
            Price = transport.Price,
            Category = transport.Type,
            AdditionalInfo = new Dictionary<string, object>
            {
                ["route"] = transport.Route,
                ["schedule"] = transport.Schedule,
                ["contact"] = transport.Contact,
                ["services"] = transport.Services
            }
        };
    }
}