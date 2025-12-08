using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/authentication")]
public class UsersController : ControllerBase
{
   private readonly ILogger<UsersController> _logger;
   private readonly UserManager<User> _userManager;
   private readonly IRepositoryManager _repository;
   private readonly IMapper _mapper;
  public UsersController(ILogger<UsersController> logger, UserManager<User> userManager, IRepositoryManager repository)
  {
    _logger = logger;
    _userManager = userManager;
    _repository = repository;
  }
  [HttpGet]
public async Task<IActionResult> GetAllUsers()
{
    var users = await _userManager.Users.ToListAsync();
    return Ok(users);
 }
//  
[HttpPost("register")]
public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
    {
        var user = _mapper.Map<User>(userForRegistration);
        if(ModelState.IsValid==false)
        {
            return BadRequest(ModelState);
        }
        var result = await _userManager.CreateAsync(user, userForRegistration.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return BadRequest(ModelState);
        }
        await _userManager.AddToRolesAsync(user, userForRegistration.Roles);
        _logger.LogInformation($"User {user.UserName} registered successfully");

        return StatusCode(201);
    }
    //  login
    public async Task<IActionResult> LoginUser()
    {
        return Ok();
    }
 }