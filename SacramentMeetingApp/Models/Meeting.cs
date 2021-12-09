

using System.Collections.Generic;

namespace SacramentMeeting.Models
{
    public class Meeting
    {
        public int MeetingId { get; set; }
        public string Date { get; set; }

        // People
        public int PresidingId { get; set; }
        
        public int ConductorId { get; set; }
        

        // Prayers
        public string OpeningPrayer { get; set; }
        public string ClosingPrayer { get; set; }

        // Hymns
        public int OpeningHymnNumberId { get; set; }
        

        public int ClosingHymnNumberId { get; set; }
        
        public int SacramentHymnNumberId { get; set; }
        
        
        public int? IntermediateHymnNumberId { get; set; }
        
        
        public int DismissalHymnNumberId { get; set; }
       


        // Special Stuff
        public bool isFastSunday { get; set; }
        public bool isSpecialMusicNumber { get; set; }
        public string SpecialMusicNumberName { get; set; }
        public string SpecialMusicNumberMusician { get; set; }

        /* navigation properties */
        public Bishopric Presiding { get; set; }

        public Bishopric Conductor { get; set; }

        public Hymn OpeningHymnNumber { get; set;}

        public Hymn ClosingHymnNumber { get; set; }

        public Hymn SacramentHymnNumber { get; set; }

        // public Hymn? IntermediateHymnNumber { get; set; }

        public Hymn DismissalHymnNumber { get; set; }

        public virtual ICollection<Speaker> Speakers { get; set; }

    }
}