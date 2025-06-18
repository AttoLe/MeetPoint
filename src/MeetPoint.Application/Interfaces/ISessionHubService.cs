namespace MeetPoint.Application.Interfaces;

public interface ISessionHubService
{
    Task CreateSession(string userId, string sessionId, string sessionType, string settingsJson);
    Task DeleteSession(string sessionId);

    Task JoinSession(string userId, string sessionId);
    Task LeaveSession(string userId, string sessionId);

    Task<string> GenerateSessionId();
    Task<bool> CheckSessionId(string sessionId);
}
