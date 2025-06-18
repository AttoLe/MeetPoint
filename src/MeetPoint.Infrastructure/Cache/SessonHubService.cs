using System.Text.Json;

using MeetPoint.Application.Interfaces;
using MeetPoint.Domain.Enums;

namespace MeetPoint.Infrastructure.Cache;

public class SessionHubService(IRedisService redisService) : ISessionHubService
{
    private IRedisService _redisService = redisService;

    public async Task CreateSession(string userId, string sessionId, string sessionType, string jsonSettings)
    {
        await _redisService.SetAddAsync(RedisUsersKeys.SessionsByTypeKey(userId, sessionType), sessionId);

        //add more metadata from type or whatever
        var meta = new { sessionType };
        var jsonMeta = JsonSerializer.Serialize(meta);
        await _redisService.SetJsonAsync(RedisSessionKeys.MetaKey(sessionId), jsonMeta);

        await _redisService.SetStringAsync(RedisSessionKeys.OwnerKey(sessionId), userId);
        await _redisService.SetAddAsync(RedisSessionKeys.UsersKey(sessionId), userId);

        await _redisService.SetJsonAsync(RedisSessionKeys.SettingsKey(sessionId), jsonSettings);

        await _redisService.TrackKeysAsync(RedisUsersKeys.TTLKey(sessionId, userId), RedisUsersKeys.AllKeysForTTl(sessionId, userId));
        await _redisService.TrackKeysAsync(RedisSessionKeys.TTLKey(sessionId), RedisSessionKeys.AllKeysForTTL(sessionId));
    }

    public async Task DeleteSession(string sessionId)
    {
        var meta = await _redisService.GetJsonAsync<SessionMeta>(RedisSessionKeys.MetaKey(sessionId));

        await _redisService.DeleteTrackedKeysAsync(RedisSessionKeys.TTLKey(sessionId));

        var usersId = await _redisService.SetMembersAsync(RedisSessionKeys.UsersKey(sessionId));
        foreach (var userId in usersId)
        {
            await _redisService.SetRemoveAsync(RedisUsersKeys.SessionsByTypeKey(userId, meta!.type), sessionId);
            await _redisService.DeleteTrackedKeysAsync(RedisUsersKeys.TTLKey(sessionId, userId));
        }
    }

    public async Task JoinSession(string userId, string sessionId)
    {
        var meta = await _redisService.GetJsonAsync<SessionMeta>(RedisSessionKeys.MetaKey(sessionId));
        await _redisService.SetAddAsync(RedisUsersKeys.SessionsByTypeKey(userId, meta!.type), sessionId);

        await _redisService.SetAddAsync(RedisSessionKeys.UsersKey(sessionId), userId);

        await _redisService.TrackKeysAsync(RedisUsersKeys.TTLKey(sessionId, userId), RedisUsersKeys.AllKeysForTTl(sessionId, userId));
    }

    public async Task LeaveSession(string userId, string sessionId)
    {
        var meta = await _redisService.GetJsonAsync<SessionMeta>(RedisSessionKeys.MetaKey(sessionId));
        await _redisService.SetRemoveAsync(RedisUsersKeys.SessionsByTypeKey(sessionId, meta!.type), userId);

        await _redisService.DeleteTrackedKeysAsync(RedisUsersKeys.TTLKey(sessionId, userId));

        await _redisService.TrackKeysAsync(RedisUsersKeys.TTLKey(sessionId, userId), RedisUsersKeys.AllKeysForTTl(sessionId, userId));
    }

    public async Task<bool> CheckSessionId(string sessionId) =>
        await _redisService.KeyExistsAsync(RedisSessionKeys.MetaKey(sessionId));

    public Task<string> GenerateSessionId() => Task.FromResult(Guid.NewGuid().ToString()[..10]);
}
