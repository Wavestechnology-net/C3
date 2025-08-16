using Microsoft.EntityFrameworkCore;
using SoccerClub.Core.Entities;

namespace SoccerClub.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        //DbSets for your entities can be defined here
        public DbSet<News> News { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Tryout> Tryouts { get; set; }
        public DbSet<TryoutRegistration> TryoutRegistrations { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamProgram> TeamPrograms { get; set; }
        public DbSet<ProgramRegistration> ProgramRegistrations { get; set; }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<ContentMedia> ContentMedia { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
