using Microsoft.AspNetCore.Mvc;
using OrtegaTourism.Models;

namespace OrtegaTourism.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly TouristService _touristService;

        public HotelsController(TouristService touristService)
        {
            _touristService = touristService;
        }

        [HttpGet]
        public ActionResult<List<Hotel>> GetAllHotels()
        {
            return Ok(_touristService.GetAllHotels());
        }

        [HttpGet("{id}")]
        public ActionResult<Hotel> GetHotel(int id)
        {
            var hotel = _touristService.GetHotelById(id);
            if (hotel == null)
            {
                return NotFound($"Hotel with ID {id} not found.");
            }
            return Ok(hotel);
        }
    }
}