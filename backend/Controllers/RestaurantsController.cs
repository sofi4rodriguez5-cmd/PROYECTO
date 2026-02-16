using Microsoft.AspNetCore.Mvc;
using OrtegaTourism.Models;

namespace OrtegaTourism.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly TouristService _touristService;

        public RestaurantsController(TouristService touristService)
        {
            _touristService = touristService;
        }

        [HttpGet]
        public ActionResult<List<Restaurant>> GetAllRestaurants()
        {
            return Ok(_touristService.GetAllRestaurants());
        }

        [HttpGet("{id}")]
        public ActionResult<Restaurant> GetRestaurant(int id)
        {
            var restaurant = _touristService.GetRestaurantById(id);
            if (restaurant == null)
            {
                return NotFound($"Restaurant with ID {id} not found.");
            }
            return Ok(restaurant);
        }

        [HttpGet("cuisine/{cuisineType}")]
        public ActionResult<List<Restaurant>> GetRestaurantsByCuisine(string cuisineType)
        {
            var restaurants = _touristService.GetRestaurantsByCuisine(cuisineType);
            return Ok(restaurants);
        }

        [HttpGet("cuisine-types")]
        public ActionResult<List<string>> GetCuisineTypes()
        {
            var cuisineTypes = _touristService.GetCuisineTypes();
            return Ok(cuisineTypes);
        }
    }
}