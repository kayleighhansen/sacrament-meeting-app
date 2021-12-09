namespace SacramentMeeting.Models
{
    public class Speaker {
        public long SpeakerId { get; set; }
        public string Name { get; set; }
        public string Topic { get; set; }
        public int MeetingId { get; set; }
    }
}