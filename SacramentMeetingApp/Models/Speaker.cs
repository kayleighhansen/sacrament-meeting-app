namespace SacramentMeeting.Models
{
    public class Speaker {
        public int SpeakerId { get; set; }
        public string Name { get; set; }
        public string Topic { get; set; }
        public int MeetingId { get; set; }
    }
}