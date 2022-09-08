using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        
        public DbSet<Procurement> Procurements { get; set; }

        public DbSet<ProcurementItem> ProcurementItems { get; set; }

        public DbSet<ProductCategory> ProductCategories { get; set; }

        public DatabaseContext(DbContextOptions options) : base(options) { }
    }
}
