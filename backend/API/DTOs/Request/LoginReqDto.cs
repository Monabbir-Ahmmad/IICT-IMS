using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Request
{
    public class LoginReqDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
