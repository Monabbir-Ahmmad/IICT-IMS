using System.Net.Http.Headers;
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

            SetHeaderCookie(result.AccessToken);

            return Created("User created", result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResDto>> Login(LoginReqDto loginDto)
        {
            var result = await _authService.LoginUser(loginDto);

            SetHeaderCookie(result.AccessToken);

            return Ok(result);
        }

        [HttpPost("supplier/register")]
        public async Task<ActionResult<AuthResDto>> SupplierRegister(
            SupplierRegisterReqDto supplierRegisterDto
        )
        {
            var result = await _authService.RegisterSupplier(supplierRegisterDto);

            SetHeaderCookie(result.AccessToken);

            return Created("Supplier created", result);
        }

        [HttpPost("supplier/login")]
        public async Task<ActionResult<AuthResDto>> SupplierLogin(LoginReqDto loginDto)
        {
            var result = await _authService.LoginSupplier(loginDto);

            SetHeaderCookie(result.AccessToken);

            return Ok(result);
        }

        [HttpPost("refreshToken")]
        public async Task<ActionResult<AuthResDto>> RefreshToken(string refreshToken)
        {
            var result = await _authService.RefreshToken(refreshToken);

            SetHeaderCookie(result.AccessToken);

            return Ok(result);
        }

        private void SetHeaderCookie(string token)
        {
            HttpContext.Response.Cookies.Append(
                "authorization",
                new AuthenticationHeaderValue("Bearer", token).ToString(),
                new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
            );
        }
    }
}
