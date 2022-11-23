namespace API.DTOs.Response
{
    public class ErrorResDto
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }

        public ErrorResDto(int statusCode, string message, string details = null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }
    }
}
