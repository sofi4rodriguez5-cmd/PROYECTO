using Microsoft.AspNetCore.Mvc;
using OrtegaTourism.Models;

namespace OrtegaTourism.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransportationController : ControllerBase
    {
        private readonly TouristService _touristService;

        public TransportationController(TouristService touristService)
        {
            _touristService = touristService;
        }

        [HttpGet]
        public ActionResult<List<Transportation>> GetAllTransportations()
        {
            return Ok(_touristService.GetAllTransportations());
        }

        [HttpGet("{id}")]
        public ActionResult<Transportation> GetTransportation(int id)
        {
            var transportation = _touristService.GetTransportationById(id);
            if (transportation == null)
            {
                return NotFound($"Transportation with ID {id} not found.");
            }
            return Ok(transportation);
        }

        [HttpGet("type/{type}")]
        public ActionResult<List<Transportation>> GetTransportationsByType(string type)
        {
            var transportations = _touristService.GetTransportationsByType(type);
            return Ok(transportations);
        }

        [HttpGet("types")]
        public ActionResult<List<string>> GetTransportationTypes()
        {
            var types = _touristService.GetTransportationTypes();
            return Ok(types);
        }
    }
}