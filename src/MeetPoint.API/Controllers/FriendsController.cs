using MeetPoint.API.DTOs;
using MeetPoint.Application.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MeetPoint.API.Controllers;

[ApiController]
[Route("api/account/")]
public class FriendsController(UserManager<IdentityUser> userManager, IFriendsService<string, IdentityUser> friendsService, IFriendInvitationsService<string> friendInvitationsService) : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager = userManager;
    private readonly IFriendsService<string, IdentityUser> _friendsService = friendsService;
    private readonly IFriendInvitationsService<string> _friendInvitationsService = friendInvitationsService;

    //would be there just for now
#nullable disable
    public record UserDto(string Id, string Email, string Username, string PhoneNumber);

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return NotFound();

        return Ok(new UserDto(
            user.Id,
            user.Email,
            user.UserName,
            user.PhoneNumber
        ));
    }

    public record UpdateDTO(string Username, string PhoneNumber);

    [Authorize]
    [HttpPut("update")]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateDTO userDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return NotFound();

        user.UserName = userDto.Username;
        user.PhoneNumber = userDto.PhoneNumber;

        var result = await _userManager.UpdateAsync(user);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }

    [Authorize]
    [HttpPost("check-password")]
    public async Task<IActionResult> CheckPassword([FromBody] string password)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return NotFound();

        var result = await _userManager.CheckPasswordAsync(user, password);
        return result ? Ok() : Unauthorized();
    }

    [Authorize]
    [HttpGet("friends")]
    public async Task<IActionResult> GetFriends()
    {
        var userId = _userManager.GetUserId(User);

        if (userId == null)
            return NotFound();

        var friendsEntities = await _friendsService.GetFriendsAsync(userId);
        var friendsDtos = friendsEntities.Select(f => new FriendDto(f.Id, f.UserName!, f.PhoneNumber));
        return Ok(friendsDtos);
    }

    [HttpDelete("friends/delete/{friendId}")]
    [Authorize]
    public async Task<IActionResult> DeleteFriend([FromRoute] string friendId)
    {
        var userId = _userManager.GetUserId(User);

        if (userId == null)
            return NotFound();

        var result = await _friendsService.DeleteFriend(userId, friendId);
        return result.Succeded ? Ok() : BadRequest(result.Errors);
    }

    [HttpGet("invites/received")]
    [Authorize]
    public async Task<IActionResult> GetPendingInvites()
    {
        var userId = _userManager.GetUserId(User);

        if (userId == null)
            return NotFound();

        var invitesFromId = await _friendInvitationsService.GetPendingInvitations(userId);
        var friendsEntities = await Task.WhenAll(invitesFromId.Select(_userManager.FindByIdAsync));

        var friendsDtos = friendsEntities.Where(f => f != null)
            .Select(f => new FriendDto(f!.Id, f.UserName!, f.PhoneNumber));

        return Ok(friendsDtos);
    }

    [HttpGet("invites/send")]
    [Authorize]
    public async Task<IActionResult> GetActiveSentInvites()
    {
        var userId = _userManager.GetUserId(User);

        if (userId == null)
            return NotFound();

        var invitesFromId = await _friendInvitationsService.GetActiveSentInvitations(userId);
        var friendsEntities = await Task.WhenAll(invitesFromId.Select(_userManager.FindByIdAsync));

        var friendsDtos = friendsEntities.Where(f => f != null)
            .Select(f => new FriendDto(f!.Id, f.UserName!, f.PhoneNumber));

        return Ok(friendsDtos);
    }

    [HttpPost("invite/send/{toUserId}")]
    [Authorize]
    public async Task<IActionResult> SendInvite([FromRoute] string toUserId)
    {
        var userId = _userManager.GetUserId(User);

        if (userId == null)
            return NotFound();

        var result = await _friendInvitationsService.Send(userId, toUserId);
        return result.Succeded ? Ok() : BadRequest(result.Errors);
    }

    [HttpPost("invite/accept/{fromUserId}")]
    [Authorize]
    public async Task<IActionResult> Accept([FromRoute] string fromUserId)
    {
        var userId = _userManager.GetUserId(User);

        if (userId == null)
            return NotFound();

        var result = await _friendInvitationsService.Accept(fromUserId, userId);
        if (!result.Succeded)
            return BadRequest(result.Errors);

        result = await _friendsService.Befriend(fromUserId, userId);
        if (!result.Succeded)
            return Ok();

        await _friendInvitationsService.Reject(fromUserId, userId);
        return BadRequest(result.Errors);
    }


    [HttpPost("invite/reject{fromUserId}")]
    [Authorize]
    public async Task<IActionResult> Reject([FromRoute] string fromUserId)
    {
        var userId = _userManager.GetUserId(User);

        if (userId == null)
            return NotFound();

        var result = await _friendInvitationsService.Reject(fromUserId, userId);
        return result.Succeded ? Ok() : BadRequest(result.Errors);
    }

    [HttpGet("getAllUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
        return Ok(await _userManager.Users.ToListAsync());
    }
}
