using System.Text.Json;
using API.Entities;

namespace API.Database.Seed
{
    public class SeedDatabase
    {
        public static async Task SeedDataAsync(DatabaseContext context)
        {
            if (!context.ProductCategories.Any())
            {
                var productCategoriesData = System.IO.File.ReadAllText(
                    "Database/Seed/Data/ProductCategories.json"
                );

                var productCategories = JsonSerializer.Deserialize<List<ProductCategory>>(
                    productCategoriesData
                );

                foreach (var productCategory in productCategories)
                {
                    context.ProductCategories.Add(productCategory);
                }
                await context.SaveChangesAsync();
            }

            if (!context.UserRoles.Any())
            {
                var userRolesData = System.IO.File.ReadAllText("Database/Seed/Data/UserRoles.json");

                var userRoles = JsonSerializer.Deserialize<List<UserRole>>(userRolesData);

                foreach (var userRole in userRoles)
                {
                    context.UserRoles.Add(userRole);
                }
                await context.SaveChangesAsync();
            }
        }
    }
}
