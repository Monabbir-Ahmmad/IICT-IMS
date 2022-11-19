using System.Net.Http.Headers;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
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
        public async Task<ActionResult> Register(RegisterReqDto registerDto)
        {
            await _authService.RegisterUser(registerDto);

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResDto>> Login(LoginReqDto loginDto)
        {
            var result = await _authService.LoginUser(loginDto);

            SetHeaderCookie(result.AccessToken);

            return Ok(result);
        }

        [HttpPost("supplier/register")]
        public async Task<ActionResult> SupplierRegister(SupplierRegisterReqDto supplierRegisterDto)
        {
            await _authService.RegisterSupplier(supplierRegisterDto);

            return NoContent();
        }

        [HttpPost("supplier/login")]
        public async Task<ActionResult<AuthResDto>> SupplierLogin(LoginReqDto loginDto)
        {
            var result = await _authService.LoginSupplier(loginDto);

            SetHeaderCookie(result.AccessToken);

            return Ok(result);
        }

        [HttpPost("logout")]
        public Task<ActionResult> Logout()
        {
            HttpContext.Response.Cookies.Delete("authorization");
            return Task.FromResult<ActionResult>(Ok());
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordReqDto forgotPasswordDto)
        {
            await _authService.ForgotPassword(forgotPasswordDto);

            return NoContent();
        }

        [HttpGet("reset-password/{token}")]
        public async Task<ActionResult> ResetPassword(string token)
        {
            var newPassword = await _authService.ResetPassword(token);

            return Ok("New password: " + newPassword);
        }

        [HttpPost("refreshToken")]
        public async Task<ActionResult<AuthResDto>> RefreshToken(RefreshTokenReqDto refreshTokenReq)
        {
            var result = await _authService.RefreshToken(refreshTokenReq.RefreshToken);
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
