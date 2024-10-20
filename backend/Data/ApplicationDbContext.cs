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

            modelBuilder.Entity<OrderEntry>()
                .HasOne<Order>(o => o.Order)
                .WithMany(e => e.OrderEntries)
                .HasForeignKey(o => o.OrderId);

            modelBuilder.Entity<OrderEntry>()
                .HasOne<Paper>(p => p.Paper)
                .WithMany(p => p.OrderEntries)
                .HasForeignKey(p => p.PaperId);

            modelBuilder.Entity<PaperProperty>()
                .HasKey(pp => new { pp.PaperId, pp.Id });

            modelBuilder.Entity<PaperProperty>()
                .HasOne<Paper>(pp => pp.Paper)
                .WithMany(p => p.PaperProperties)
                .HasForeignKey(pp => pp.PaperId);
            
            modelBuilder.Entity<Order>()
                .Property(o => o.Status)
                .HasDefaultValue("received");
    }
}