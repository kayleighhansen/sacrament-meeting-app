using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SacramentMeeting.Models;

    public class BishopricContext : DbContext
    {
        public BishopricContext (DbContextOptions<BishopricContext> options)
            : base(options)
        {
        }

        public DbSet<SacramentMeeting.Models.Bishopric> Bishopric { get; set; }
    }
