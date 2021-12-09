using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SacramentMeeting.Models;

    public class SacramentMeetingContext : DbContext
    {
        public SacramentMeetingContext (DbContextOptions<SacramentMeetingContext> options)
            : base(options)
        {
        }

        public DbSet<Meeting> Meeting { get; set; }
        public DbSet<Bishopric> Bishopric { get; set; }
        public DbSet<Speaker> Speaker { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)

        {
            modelBuilder.Entity<Meeting>().HasOne(m => m.Presiding).WithMany(o => o.Presidings).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Meeting>().HasOne(m => m.Conductor).WithMany(o => o.Conductings).OnDelete(DeleteBehavior.NoAction);

        }

    }

    
