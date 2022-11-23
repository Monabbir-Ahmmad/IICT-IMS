using System.Net;

namespace API.Errors
{
    public class UnauthorizedException : ApiException
    {
        public UnauthorizedException(string message = null)
            : base((int)HttpStatusCode.Unauthorized, message ?? "Unauthorized Access.") { }
    }
}
