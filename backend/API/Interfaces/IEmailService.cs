namespace API.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(string emailTo, string subject, string messageBody);
    }
}
