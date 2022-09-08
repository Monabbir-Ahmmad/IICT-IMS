using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Procurement> Procurements { get; set; }

        public DbSet<ProcurementProduct> ProcurementProducts { get; set; }

        public DbSet<ProductCategory> ProductCategories { get; set; }

        public DatabaseContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ProductCategory>().HasIndex(category => category.Name).IsUnique(true);
        }
    }
}
