

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
        public Hymn OpeningHymn { get; set; }
        public Hymn ClosingHymn { get; set; }
        public Hymn SacramentHymn { get; set; }
        public Hymn DismissalHymn { get; set; }

        // Special Stuff
        public bool isFastSunday { get; set; }
        public bool isSpecialMusicNumber { get; set; }
        public bool SpecialMusicNumberName { get; set; }
    }
}