using Microsoft.AspNetCore.Identity;

namespace MeetPoint.Infrastructure.Persistence.Entities;

#nullable disable
public class UserFriend
{
    public string UserId { get; set; }
    public string OtherUserId { get; set; }

    public IdentityUser User { get; set; }
    public IdentityUser OtherUser { get; set; }
}
