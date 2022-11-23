namespace API.DTOs.Params
{
    public class PaginatedFilterSortParam
    {
        public int PageNumber { get; set; } = 0;
        public int PageSize { get; set; } = 20;
        public string SearchColumn { get; set; }
        public string SearchValue { get; set; }
        public string SearchOperator { get; set; }
        public string SortColumn { get; set; }
        public string SortDirection { get; set; }
    }
}
