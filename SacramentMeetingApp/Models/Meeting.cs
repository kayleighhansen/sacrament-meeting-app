

namespace SacramentMeeting.Models
{
    public class Meeting
    {
        public long MeetingId { get; set; }
        public string Date { get; set; }

        // People
        public Bishopric Presiding { get; set; }
        public Bishopric Conductor { get; set; }
        public Speaker[] Speakers { get; set; }

        // Prayers
        public string OpeningPrayer { get; set; }
        public string ClosingPrayer { get; set; }

        // Hymns
        public int OpeningHymnNumberId { get; set; }

        public Hymn OpeningHymnNumber { get; set;}
        public int ClosingHymnNumberId { get; set; }

        public Hymn ClosingHymnNumber { get; set; }
        public int SacramentHymnNumber { get; set; }
        public int IntermediateHymnNumber { get; set; }
        public int DismissalHymnNumber { get; set; }

        // Special Stuff
        public bool isFastSunday { get; set; }
        public bool isSpecialMusicNumber { get; set; }
        public string SpecialMusicNumberName { get; set; }
        public string SpecialMusicNumberMusician { get; set; }
    }
}