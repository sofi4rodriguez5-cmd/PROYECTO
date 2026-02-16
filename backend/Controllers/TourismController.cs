using Microsoft.AspNetCore.Mvc;
using OrtegaTourism.Models;

namespace OrtegaTourism.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TourismController : ControllerBase
    {
        private readonly TouristService _touristService;

        public TourismController(TouristService touristService)
        {
            _touristService = touristService;
        }

        [HttpGet("city-info")]
        public ActionResult<CityInfo> GetCityInfo()
        {
            return Ok(_touristService.GetCityInfo());
        }

        [HttpGet("places")]
        public ActionResult<List<TouristPlace>> GetAllTouristPlaces()
        {
            return Ok(_touristService.GetAllTouristPlaces());
        }

        [HttpGet("places/{id}")]
        public ActionResult<TouristPlace> GetTouristPlace(int id)
        {
            var place = _touristService.GetTouristPlaceById(id);
            if (place == null)
            {
                return NotFound($"Tourist place with ID {id} not found.");
            }
            return Ok(place);
        }

        [HttpGet("places/category/{category}")]
        public ActionResult<List<TouristPlace>> GetTouristPlacesByCategory(string category)
        {
            var places = _touristService.GetTouristPlacesByCategory(category);
            return Ok(places);
        }

        [HttpGet("categories")]
        public ActionResult<List<string>> GetCategories()
        {
            var categories = _touristService.GetAllTouristPlaces()
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(categories);
        }
    }
}