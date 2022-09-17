using System.Net;

namespace API.Errors
{
    public class BadRequestException : ApiException
    {
        public BadRequestException(string? message = null)
            : base((int)HttpStatusCode.BadRequest, message ?? "Bad Request.") { }
    }
}
