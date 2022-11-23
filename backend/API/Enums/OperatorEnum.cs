using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Enums
{
    public class OperatorEnum
    {
        public const string Equal = "==";
        public const string NotEqual = "!=";
        public const string GreaterThan = ">";
        public const string GreaterThanOrEqual = ">=";
        public const string LessThan = "<";
        public const string LessThanOrEqual = "<=";
        public const string Contains = "Contains";
        public const string StartsWith = "StartsWith";
        public const string EndsWith = "EndsWith";
    }
}
