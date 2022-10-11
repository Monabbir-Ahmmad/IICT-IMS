using System.Linq.Expressions;
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
            bool descending
        )
        {
            if (String.IsNullOrEmpty(propertyName))
            {
                return source;
            }

            ParameterExpression parameter = Expression.Parameter(source.ElementType, "");

            MemberExpression property = Expression.Property(parameter, propertyName);

            LambdaExpression lambda = Expression.Lambda(property, parameter);

            string methodName = descending ? "OrderByDescending" : "OrderBy";

            Expression methodCallExpression = Expression.Call(
                typeof(Queryable),
                methodName,
                new Type[] { source.ElementType, property.Type },
                source.Expression,
                Expression.Quote(lambda)
            );

            return source.Provider.CreateQuery<T>(methodCallExpression);
        }
    }
}
