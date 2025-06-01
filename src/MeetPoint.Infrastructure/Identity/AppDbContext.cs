using MeetPoint.Infrastructure.Services;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MeetPoint.Infrastructure.Identity;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext(options)
{
    public DbSet<UserFriend> UserFriends { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserFriend>().HasKey(uf => new { uf.user1_id, uf.user2_id });

        //builder.Entity<UserFriend>().HasOne(uf => uf.user1_id)
    }
}

//objects as language objects with all data, or id as database layer???
