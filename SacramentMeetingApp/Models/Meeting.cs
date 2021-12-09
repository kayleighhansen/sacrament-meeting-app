

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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
        public int OpeningHymnNumber { get; set; }
        public int ClosingHymnNumber { get; set; }
        public int SacramentHymnNumber { get; set; }
        public int? IntermediateHymnNumber { get; set; }
        public int DismissalHymnNumber { get; set; }


        // Special Stuff
        public bool isFastSunday { get; set; }
        public bool isSpecialMusicNumber { get; set; }
        public string SpecialMusicNumberMusician { get; set; }

        public string SpecialMusicNumberSong { get; set; }
        

        /* navigation properties */

        //[InverseProperty("PresidingId")]
        public Bishopric Presiding { get; set; }


        //[InverseProperty("ConductorId")]
        public Bishopric Conductor { get; set; }

        public virtual ICollection<Speaker> Speakers { get; set; }

    }
}