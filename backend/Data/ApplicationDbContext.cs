using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Paper> Papers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderEntry> OrderEntries { get; set; }
        public DbSet<PaperProperty> PaperProperties { get; set; }

       protected override void OnModelCreating(ModelBuilder modelBuilder)
		{	
    		base.OnModelCreating(modelBuilder);

    		// Ensure the relationship configurations are correct.
    		modelBuilder.Entity<OrderEntry>()
        		.HasOne(o => o.Order) // This could cause issues if 'Order' is null
        		.WithMany(e => e.OrderEntries)
        		.HasForeignKey(o => o.OrderId);

    		modelBuilder.Entity<OrderEntry>()
        		.HasOne(p => p.Paper) // This could cause issues if 'Paper' is null
        		.WithMany(p => p.OrderEntries)
        		.HasForeignKey(p => p.PaperId);

    		modelBuilder.Entity<PaperProperty>()
        		.HasKey(pp => new { pp.PaperId, pp.Id });

    		modelBuilder.Entity<PaperProperty>()
        		.HasOne(pp => pp.Paper) // This could cause issues if 'Paper' is null
        		.WithMany(p => p.PaperProperties)
        		.HasForeignKey(pp => pp.PaperId);
		}

    }
}
