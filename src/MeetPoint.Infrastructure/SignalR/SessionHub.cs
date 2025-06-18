using MeetPoint.Application.Interfaces;
using MeetPoint.Domain.Enums;

using Microsoft.AspNetCore.SignalR;

namespace MeetPoint.Infrastructure.SignalR;

public class SessionHub(ISessionHubService sessionHubService) : Hub
{
  private ISessionHubService _sessionHubService = sessionHubService;

  public async Task JoinSession(string sessionId, string sessionType, PlaceType[] placeFilter)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
    Console.WriteLine($"\n\n\n{Context.User?.FindFirst("sub")?.Value}\n\n\n");

    //if (!await _sessionHubService.CheckSessionId(sessionId))
    // _sessionHubService.CreateSession(, sessionId, sessionType, placeFilter);

  }

  public async Task LeaveSesion(string sessionId)
  {
    await Groups.RemoveFromGroupAsync(Context.ConnectionId, sessionId);
  }
}
