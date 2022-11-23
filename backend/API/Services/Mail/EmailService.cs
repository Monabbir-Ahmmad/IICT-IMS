using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using API.Interfaces.Mail;

namespace API.Services.Mail
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmail(string emailTo, string subject, string messageBody)
        {
            var systemEmailCredentials = _config.GetSection("EmailCredentials");
            var systemEmail = systemEmailCredentials.GetSection("Email").Value;
            var systemEmailPassword = systemEmailCredentials.GetSection("Password").Value;

            var message = new MailMessage();
            var smtp = new SmtpClient();

            message.From = new MailAddress(systemEmail);
            message.To.Add(new MailAddress(emailTo));
            message.Subject = subject;
            message.IsBodyHtml = true; //to make message body as html
            message.Body = messageBody;
            smtp.UseDefaultCredentials = true;
            smtp.Port = 587;
            smtp.Host = "smtp.gmail.com"; //for gmail host
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(systemEmail, systemEmailPassword);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

            await smtp.SendMailAsync(message);

            return;
        }
    }
}
