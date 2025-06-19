using MeetPoint.Domain.ValueObjects;
using MeetPoint.Infrastructure.Persistence.Entities;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MeetPoint.API.Controllers;

public class GeoCoordinatesDto
{
    public double Lat { get; set; }
    public double Lng { get; set; }
    public DateTime? Timestamp { get; set; }
}


[ApiController]
[Route("api/[controller]")]
public class GeoController(UserManager<ApplicationUser> userManager, GeoDataIntoRedisService geoDataInputService) : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly GeoDataIntoRedisService _geoDataInputService = geoDataInputService;

    [HttpPost]
    public IActionResult ReceiveGeoData([FromBody] GeoCoordinatesDto dto, [FromQuery] string sessionType)
    {
        var coordinates = new Coordinates(dto.Lat, dto.Lng);
        var timestamp = dto.Timestamp ?? DateTime.UtcNow;
        var timedCoordinates = new TimedCoordinates(coordinates, timestamp);

        var user = _userManager.GetUserAsync(User);

        _geoDataInputService.OnNext(user.Id.ToString(), sessionType, timedCoordinates);

        return Ok(new { message = "Location received" });
    }
}
