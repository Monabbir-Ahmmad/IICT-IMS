namespace API.Interfaces.Mail
{
    public interface IEmailService
    {
        Task SendEmail(string emailTo, string subject, string messageBody);
    }
}
