namespace API.Enums
{
    public class UserRoleEnum
    {
        public const string Admin = "Admin";
        public const string Director = "Director";
        public const string OfficeManager = "Office Manager";
        public const string StoreManager = "Store Manager";
        public const string OfficeOfficer = "Office Officer";
        public const string StoreOfficer = "Store Officer";
        public const string NormalEmployee = "Normal Employee";
        public const string Supplier = "Supplier";

        public static readonly List<string> AdminRoles = new List<string> { Admin, Director, };

        public static readonly List<string> IICTRoles = new List<string>
        {
            Admin,
            Director,
            OfficeManager,
            StoreManager,
            OfficeOfficer,
            StoreOfficer,
            NormalEmployee,
        };

        public static readonly List<string> IICTSignupRoles = new List<string>
        {
            OfficeManager,
            StoreManager,
            OfficeOfficer,
            StoreOfficer,
            NormalEmployee,
        };

        public static readonly List<string> ProcurementMakerRoles = new List<string>
        {
            Admin,
            Director,
            OfficeManager,
            OfficeOfficer,
        };

        public static readonly List<string> ProcurementApproverRoles = new List<string>
        {
            Admin,
            Director,
        };

        public static readonly List<string> PurchaseOrderMakerRoles = new List<string>
        {
            Admin,
            Director,
            OfficeManager,
            OfficeOfficer,
        };

        public static readonly List<string> PurchaseOrderApproverRoles = new List<string>
        {
            Admin,
            Director,
        };

        public static readonly List<string> InventoryManagementRoles = new List<string>
        {
            Admin,
            Director,
            StoreManager,
            StoreOfficer
        };
    }
}
