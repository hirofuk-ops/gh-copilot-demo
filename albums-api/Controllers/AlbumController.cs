using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        // GET: api/album
        [HttpGet]
        public IActionResult Get()
        {
            var albums = Album.GetAll();

            return Ok(albums);
        }

        // GET api/<AlbumController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var album = Album.GetById(id);
            if (album == null)
            {
                return NotFound();
            }
            return Ok(album);
        }


        // function that sort albums by name, artist or price
        [HttpGet("sort")]
        public IActionResult Sort(string sortBy)
        {
            var albums = Album.GetAll();

            if (string.IsNullOrEmpty(sortBy))
            {
                return BadRequest("Sort parameter is required.");
            }

            switch (sortBy.ToLower())
            {
                case "name":
                    albums = albums.OrderBy(a => a.Title).ToList();
                    break;
                case "artist":
                    albums = albums.OrderBy(a => a.Artist).ToList();
                    break;
                case "price":
                    albums = albums.OrderBy(a => a.Price).ToList();
                    break;
                default:
                    return BadRequest("Invalid sort parameter. Use 'title', 'artist', or 'price'.");
            }

            return Ok(albums);
        }
    }
}
