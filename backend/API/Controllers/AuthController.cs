using API.DTOs.Request;
using API.DTOs.Response;
using API.Interfaces.Auth;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResDto>> Register(RegisterReqDto registerDto)
        {
            var result = await _authService.RegisterUser(registerDto);

            HttpContext.Response.Cookies.Append(
                "authorization",
                result.AccessToken,
                new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
            );

            return Created("User created", result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResDto>> Login(LoginReqDto loginDto)
        {
            var result = await _authService.LoginUser(loginDto);

            HttpContext.Response.Cookies.Append(
                "authorization",
                result.AccessToken,
                new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
            );

            return Ok(result);
        }

        [HttpPost("supplier/register")]
        public async Task<ActionResult<AuthResDto>> SupplierRegister(
            SupplierRegisterReqDto supplierRegisterDto
        )
        {
            var result = await _authService.RegisterSupplier(supplierRegisterDto);

            HttpContext.Response.Cookies.Append(
                "authorization",
                result.AccessToken,
                new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
            );

            return Created("Supplier created", result);
        }

        [HttpPost("supplier/login")]
        public async Task<ActionResult<AuthResDto>> SupplierLogin(LoginReqDto loginDto)
        {
            var result = await _authService.LoginSupplier(loginDto);

            HttpContext.Response.Cookies.Append(
                "authorization",
                result.AccessToken,
                new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
            );

            return Ok(result);
        }

        [HttpPost("refreshToken")]
        public async Task<ActionResult<AuthResDto>> RefreshToken(string refreshToken)
        {
            var result = await _authService.RefreshToken(refreshToken);

            HttpContext.Response.Cookies.Append(
                "authorization",
                result.AccessToken,
                new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
            );

            return Ok(result);
        }
    }
}
