using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Procurement> Procurements { get; set; }
        public DbSet<ProcurementProduct> ProcurementProducts { get; set; }
        public DbSet<Quotation> Quotations { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<PurchaseOrderProduct> PurchaseOrderProducts { get; set; }
        public DbSet<DirectPurchase> DirectPurchases { get; set; }
        public DbSet<InventoryProduct> InventoryProducts { get; set; }
        public DbSet<Distribution> Distributions { get; set; }
        public DbSet<ReceiveReturn> ReceiveReturns { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }

        public DatabaseContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Category>().HasIndex(category => category.Name).IsUnique(true);

            builder
                .Entity<ProcurementProduct>()
                .HasOne(product => product.Procurement)
                .WithMany(procurement => procurement.Products)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<PurchaseOrderProduct>()
                .HasOne(product => product.PurchaseOrder)
                .WithMany(purchaseOrder => purchaseOrder.Products)
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

            builder
                .Entity<InventoryProduct>()
                .HasOne(product => product.CurrentDistribution)
                .WithMany();

            builder
                .Entity<InventoryProduct>()
                .HasMany(product => product.DistributionHistory)
                .WithMany(distribution => distribution.Products)
                .UsingEntity(j => j.ToTable("DistributionHistory"));

            builder
                .Entity<InventoryProduct>()
                .HasMany(product => product.ReceiveReturnHistory)
                .WithMany(receiveReturn => receiveReturn.Products)
                .UsingEntity(j => j.ToTable("ReceiveReturnHistory"));
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
