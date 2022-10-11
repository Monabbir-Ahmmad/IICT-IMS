using System.ComponentModel;
using System.Linq.Expressions;
using System.Reflection;
using API.Enums;

namespace API.Utilities
{
    public static partial class ExpressionComparisonUtils
    {
        public static Expression<Func<T, bool>> BuildPredicate<T>(
            string propertyName,
            string comparison,
            string value
        )
        {
            var parameter = Expression.Parameter(typeof(T), "x");

            var member = Expression.Property(parameter, propertyName);

            var propertyType = ((PropertyInfo)member.Member).PropertyType;

            var converter = TypeDescriptor.GetConverter(propertyType);

            if (!converter.CanConvertFrom(typeof(string)))
                throw new NotSupportedException();

            var propertyValue = converter.ConvertFromInvariantString(value);

            var constant = Expression.Constant(propertyValue);

            var valueExpression = Expression.Convert(constant, propertyType);

            var body = MakeComparison(member, comparison, valueExpression);

            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }

        private static Expression MakeComparison(
            MemberExpression member,
            string comparison,
            UnaryExpression value
        )
        {
            switch (comparison)
            {
                case OperatorEnum.Equal:
                    return Expression.Equal(member, value);
                case OperatorEnum.NotEqual:
                    return Expression.NotEqual(member, value);
                case OperatorEnum.GreaterThan:
                    return Expression.GreaterThan(member, value);
                case OperatorEnum.GreaterThanOrEqual:
                    return Expression.GreaterThanOrEqual(member, value);
                case OperatorEnum.LessThan:
                    return Expression.LessThan(member, value);
                case OperatorEnum.LessThanOrEqual:
                    return Expression.LessThanOrEqual(member, value);
                case OperatorEnum.Contains:
                    return Expression.Call(member, "Contains", null, value);
                case OperatorEnum.StartsWith:
                    return Expression.Call(member, "StartsWith", null, value);
                case OperatorEnum.EndsWith:
                    return Expression.Call(member, "EndsWith", null, value);
                default:
                    throw new NotSupportedException($"Invalid comparison operator '{comparison}'.");
            }
        }
    }
}
