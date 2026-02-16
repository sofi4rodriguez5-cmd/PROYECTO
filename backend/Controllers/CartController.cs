using Microsoft.AspNetCore.Mvc;
using OrtegaTourism.Models;

namespace OrtegaTourism.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{cartId}")]
        public ActionResult<Cart> GetCart(string cartId)
        {
            var cart = _cartService.GetOrCreateCart(cartId);
            return Ok(cart);
        }

        [HttpPost("{cartId}/items")]
        public ActionResult<Cart> AddItemToCart(string cartId, [FromBody] AddItemRequest request)
        {
            try
            {
                var cart = _cartService.AddItemToCart(cartId, request.ItemType, request.ItemId);
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{cartId}/items/{itemId}")]
        public ActionResult<Cart> RemoveItemFromCart(string cartId, string itemId)
        {
            var cart = _cartService.RemoveItemFromCart(cartId, itemId);
            return Ok(cart);
        }

        [HttpDelete("{cartId}")]
        public ActionResult<Cart> ClearCart(string cartId)
        {
            var cart = _cartService.ClearCart(cartId);
            return Ok(cart);
        }

        [HttpPost("create")]
        public ActionResult<Cart> CreateCart()
        {
            var cartId = Guid.NewGuid().ToString();
            var cart = _cartService.GetOrCreateCart(cartId);
            return Ok(cart);
        }
    }

    public class AddItemRequest
    {
        public string ItemType { get; set; } = string.Empty;
        public int ItemId { get; set; }
    }
}