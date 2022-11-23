namespace API.DTOs.Response
{
    public class PaginatedResDto<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages
        {
            get { return (int)Math.Ceiling((double)TotalCount / PageSize); }
        }
        public int TotalCount { get; set; }
        public List<T> Data { get; set; }
    }
}
