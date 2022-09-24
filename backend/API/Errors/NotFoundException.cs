using System.Net;

namespace API.Errors
{
    public class NotFoundException : ApiException
    {
        public NotFoundException(string message = null)
            : base((int)HttpStatusCode.NotFound, message ?? "Resource Not Found.") { }
    }
}
