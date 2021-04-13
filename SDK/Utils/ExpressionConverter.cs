using System;
using System.Linq.Expressions;

namespace SDK.Utils
{
    public static class ExpressionConverter
    {
        public static Expression<Func<T, bool>> Convert<T, TMiddle>(Expression<Func<TMiddle, bool>> expression,
            Expression<Func<T, TMiddle>> memberExpression)
        {
            if (memberExpression.Body is MemberExpression member)
            {
                var newExpression = Expression.Lambda<Func<T, bool>>(new ReplaceVisitor()
                    .Modify<TMiddle>(expression.Body, member), memberExpression.Parameters[0]);

                return newExpression.CanReduce ? (Expression<Func<T, bool>>)newExpression.Reduce() : newExpression;
            }

            // ReSharper disable once SuspiciousTypeConversion.Global
            // ReSharper disable once ExpressionIsAlwaysNull
            return expression as Expression<Func<T, bool>>;
        }
    }

    internal class ReplaceVisitor : ExpressionVisitor
    {
        private MemberExpression _properMember;
        private Type _typeToBeSubstituted;

        public Expression Modify<T>(Expression expression, MemberExpression properMember)
        {
            _typeToBeSubstituted = typeof(T);
            _properMember = properMember;
            return properMember == null ? expression : Visit(expression);
        }

        protected override Expression VisitParameter(ParameterExpression node)
        {
            if (node.Type == _typeToBeSubstituted)
            {
                return _properMember;
            }

            return node;
        }
    }
}
