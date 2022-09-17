using System.Net;
using API.Database;
using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ErrorController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("not-found")]
        public ActionResult GetNotFoundRequest()
        {
            throw new NotFoundException();
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            throw new ApiException(HttpStatusCode.InternalServerError, "Something went wrong");
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            throw new BadRequestException();
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorizedRequest()
        {
            throw new UnauthorizedException();
        }
    }
}
