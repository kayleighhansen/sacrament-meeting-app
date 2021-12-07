

namespace SacramentMeeting.Models
{
    public class Meeting
    {
        public long Id { get; set; }
        public string Date { get; set; }

        // People
        public Bishopric Presiding { get; set; }
        public Bishopric Conductor { get; set; }
        public Speaker[] Speakers { get; set; }

        // Prayers
        public string OpeningPrayer { get; set; }
        public string ClosingPrayer { get; set; }

        // Hymns
        public int OpeningHymnNumber { get; set; }
        public int ClosingHymnNumber { get; set; }
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