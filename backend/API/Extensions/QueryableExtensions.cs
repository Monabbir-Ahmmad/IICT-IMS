using System.Linq.Expressions;
using System.Reflection;
using API.Utilities;

namespace API.Extensions
{
    public static partial class QueryableExtensions
    {
        public static IQueryable<T> Where<T>(
            this IQueryable<T> source,
            string propertyName,
            string comparison,
            string value
        )
        {
            return source.Where(
                ExpressionComparisonUtils.BuildPredicate<T>(propertyName, comparison, value)
            );
        }

        public static IQueryable<T> OrderBy<T>(
            this IQueryable<T> source,
            string propertyName,
            bool ascending = true
        )
        {
            var parameter = Expression.Parameter(typeof(T), "");

            var member = propertyName
                .Split('.')
                .Aggregate((Expression)parameter, Expression.Property);

            var propertyType = member.Type;

            var keySelector = Expression.Lambda(member, parameter);

            var methodName = ascending ? "OrderBy" : "OrderByDescending";

            var resultExpression = Expression.Call(
                typeof(Queryable),
                methodName,
                new[] { typeof(T), propertyType },
                source.Expression,
                Expression.Quote(keySelector)
            );

            return source.Provider.CreateQuery<T>(resultExpression);
        }

        public static IQueryable<T> ApplyFiltering<T>(
            this IQueryable<T> source,
            string SearchColumn,
            string SearchValue,
            string SearchOperator
        )
        {
            if (
                !string.IsNullOrEmpty(SearchColumn)
                && !string.IsNullOrEmpty(SearchValue)
                && !string.IsNullOrEmpty(SearchOperator)
            )
            {
                source = source.Where(SearchColumn, SearchOperator, SearchValue);
            }

            return source;
        }

        public static IQueryable<T> ApplySorting<T>(
            this IQueryable<T> source,
            string SortColumn,
            string SortDirection
        )
        {
            if (!string.IsNullOrEmpty(SortColumn) && !string.IsNullOrEmpty(SortDirection))
            {
                source = source.OrderBy(SortColumn, SortDirection == "asc");
            }

            return source;
        }

        public static IQueryable<T> ApplyPagination<T>(
            this IQueryable<T> source,
            int PageNumber,
            int PageSize
        )
        {
            if (PageNumber >= 0 && PageSize > 0)
            {
                source = source.Skip(PageNumber * PageSize).Take(PageSize);
            }

            return source;
        }
    }
}
