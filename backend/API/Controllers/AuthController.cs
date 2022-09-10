using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
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
            try
            {
                if (await _authService.UserExists(registerDto.Email))
                    return Conflict("User already exists");

                var result = await _authService.RegisterUser(registerDto);

                HttpContext.Response.Cookies.Append(
                    "authorization",
                    result.Token.ToString(),
                    new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
                );

                return Created("User created", result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResDto>> Login(LoginReqDto loginDto)
        {
            try
            {
                var result = await _authService.LoginUser(loginDto);

                if (result == null)
                    return Unauthorized("Invalid credentials");

                HttpContext.Response.Cookies.Append(
                    "authorization",
                    result.Token.ToString(),
                    new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
                );

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }

        [HttpPost("supplier/register")]
        public async Task<ActionResult<AuthResDto>> SupplierRegister(
            SupplierRegisterReqDto supplierRegisterDto
        )
        {
            try
            {
                if (
                    await _authService.SupplierExists(
                        supplierRegisterDto.BIN,
                        supplierRegisterDto.Email,
                        supplierRegisterDto.CompanyName
                    )
                )
                    return Conflict("Supplier already exists");

                var result = await _authService.RegisterSupplier(supplierRegisterDto);

                if (result == null)
                    return BadRequest("Failed to create supplier");

                HttpContext.Response.Cookies.Append(
                    "authorization",
                    result.Token.ToString(),
                    new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
                );

                return Created("Supplier created", result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }

        [HttpPost("supplier/login")]
        public async Task<ActionResult<AuthResDto>> SupplierLogin(LoginReqDto loginDto)
        {
            try
            {
                var result = await _authService.LoginUser(loginDto);

                if (result == null)
                    return Unauthorized("Invalid credentials");

                HttpContext.Response.Cookies.Append(
                    "authorization",
                    result.Token.ToString(),
                    new CookieOptions { HttpOnly = false, Expires = DateTime.Now.AddDays(7) }
                );

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }
    }
}
