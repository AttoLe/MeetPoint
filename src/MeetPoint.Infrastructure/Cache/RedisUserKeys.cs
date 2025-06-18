namespace MeetPoint.Infrastructure.Cache;

public static class RedisUsersKeys
{
    public static string SessionsByTypeKey(string userId, string sessionType) =>
       $"user:{userId}:sessions:{sessionType}";

    public static string SettingsKey(string sessionId, string userId) =>
        $"session:{sessionId}:user:{userId}:settings";

    // 15 minutes ttl  - on starndart
    public static string MovementFullKey(string sessionId, string userId) =>
        $"session:{sessionId}:user:{userId}:movement:full";

    public static string MovementReducedKey(string sessionId, string userId) =>
        $"session:{sessionId}:user:{userId}:movement:reduced";

    public static string RouteKey(string sessionId, string userId) =>
        $"session:{sessionId}:user:{userId}:route";

    public static string TTLKey(string sessionId, string userId) =>
        $"session:{sessionId}:user:{userId}:ttl-anchor";

    public static IEnumerable<string> AllKeysForTTl(string sessionId, string userId) => [
        MovementFullKey(sessionId, userId),
        MovementReducedKey(sessionId, userId),
        RouteKey(sessionId, userId),
        SettingsKey(sessionId, userId)
    ];
}
