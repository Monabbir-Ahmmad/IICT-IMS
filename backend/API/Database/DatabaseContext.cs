using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Procurement> Procurements { get; set; }
        public DbSet<ProcurementProduct> ProcurementProducts { get; set; }
        public DbSet<Quotation> Quotations { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }

        public DatabaseContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ProductCategory>().HasIndex(category => category.Name).IsUnique(true);

            builder
                .Entity<ProcurementProduct>()
                .HasOne(product => product.Procurement)
                .WithMany(procurement => procurement.Products)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<Procurement>()
                .HasOne<ProductCategory>()
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<ProcurementProduct>()
                .HasOne<ProductCategory>()
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<Supplier>()
                .HasOne<ProductCategory>()
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<Quotation>()
                .HasOne(quotation => quotation.Procurement)
                .WithMany(procurement => procurement.Quotations)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<Quotation>()
                .HasOne(quotation => quotation.Supplier)
                .WithMany(supplier => supplier.Quotations)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public override int SaveChanges()
        {
            AddTimestamps();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = new CancellationToken()
        )
        {
            AddTimestamps();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void AddTimestamps()
        {
            var entities = ChangeTracker
                .Entries()
                .Where(
                    x =>
                        x.Entity is BaseEntity
                        && (x.State == EntityState.Added || x.State == EntityState.Modified)
                );

            foreach (var entity in entities)
            {
                var now = DateTime.Now;

                if (entity.State == EntityState.Added)
                {
                    ((BaseEntity)entity.Entity).CreatedAt = now;
                }
                ((BaseEntity)entity.Entity).UpdatedAt = now;
            }
        }
    }
}
