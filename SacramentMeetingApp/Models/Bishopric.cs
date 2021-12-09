using System.Collections.Generic;

namespace SacramentMeeting.Models
{
    public class Bishopric
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Calling { get; set; }
        public bool Status { get; set; }

        /* Navigation Properties */
        public List<Meeting> Presidings { get; set; }
        public List<Meeting> Conductings { get; set; }
    }
}