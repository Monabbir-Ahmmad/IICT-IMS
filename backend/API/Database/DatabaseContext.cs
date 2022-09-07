using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DatabaseContext(DbContextOptions options) : base(options) { }
    }
}
