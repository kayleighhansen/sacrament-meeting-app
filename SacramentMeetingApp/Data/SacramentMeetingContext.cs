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

    }

    
