using MeetPoint.API;
using MeetPoint.Application.Interfaces;
using MeetPoint.Infrastructure.Persistence;
using MeetPoint.Infrastructure.Persistence.Entities;
using MeetPoint.Infrastructure.Services;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

builder.Services
    .AddBasicIdentity()
    .AddIdentityValidation()
    .AddAuth();

builder.Services
    .AddScoped<IFriendsService<string, IdentityUser>, FriendService>()
    .AddScoped<IFriendInvitationsService<string>, FriendInvitationService>();

builder.Services.AddLocalSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.AddSwaggerUI();
    app.DbContextEnsureCreation();
}

app.UseCors(x => x.AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

app.UseHttpsRedirection();
app.UseRouting();

app.MapGroup("/api/account/").MapIdentityApi<IdentityUser>();
app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();

app.Run();
