using MeetPoint.Infrastructure.Identity;

namespace MeetPoint.Infrastructure.Services;

public class FriendService(AppDbContext appDbContext)
{
    /*
    public async Task<List<IdentityUser<Guid>>> GetUserFriends(Guid userId, AppDbContext db)
    {
        return await db.UserFriends
            .Where(uf => uf.UserId == userId || uf.FriendId == userId)
            .Select(uf => uf.UserId == userId ? uf.Friend : uf.User)
            .Distinct()
            .ToListAsync();
    }*/
}


public class UserFriend
{
    public Guid user1_id;
    public Guid user2_id;
}
