using System.Text.Json;
using API.DTOs.Response;
using API.Errors;

namespace API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(
            RequestDelegate next,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env
        )
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                context.Response.ContentType = "application/json";

                var statusCode = ex is ApiException e ? e.StatusCode : 500;

                context.Response.StatusCode = statusCode;

                var response = _env.IsDevelopment()
                    ? new ErrorResDto(statusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ErrorResDto(
                        statusCode,
                        statusCode < 500 ? ex.Message : "Internal Server Error"
                    );

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                await context.Response.WriteAsJsonAsync<ErrorResDto>(response, options);
            }
        }
    }
}
