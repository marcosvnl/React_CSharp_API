using Microsoft.EntityFrameworkCore;
using ReactCrudAPI.Models;

namespace ReactCrudAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)  : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Product> Product { get; set; }
    }
}
