using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SacramentMeeting.Models;

namespace SacramentMeetingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SacramentMeetingController : ControllerBase
    {
        private readonly SacramentMeetingContext _context;

        public SacramentMeetingController(SacramentMeetingContext context)
        {
            _context = context;
        }

        // GET: api/SacramentMeeting
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Meeting>>> GetMeetings()
        {
            return await _context.Meeting
                .Include(m => m.Conductor)
                .Include(m => m.Presiding)
                .Include(m => m.Speakers)
                .ToListAsync();
        }

        // GET: api/SacramentMeeting/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Meeting>> GetMeeting(long id)
        {
            var meeting = await _context.Meeting
                .Include(m => m.Conductor)
                .Include(m => m.Presiding)
                .Include(m => m.Speakers)
                .FirstOrDefaultAsync(m => m.MeetingId == id);

            if (meeting == null)
            {
                return NotFound();
            }

            return meeting;
        }

        // PUT: api/SacramentMeeting/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeeting(long id, Meeting meeting)
        {
            if (id != meeting.MeetingId)
            {
                return BadRequest();
            }

            _context.Entry(meeting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeetingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SacramentMeeting
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Meeting>> PostMeeting(Meeting meeting)
        {
            _context.Meeting.Add(meeting);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMeeting", new { id = meeting.MeetingId }, meeting);
        }

        // DELETE: api/SacramentMeeting/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeeting(int id)
        {
            var meeting = await _context.Meeting.FindAsync(id);
            if (meeting == null)
            {
                return NotFound();
            }

            _context.Meeting.Remove(meeting);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MeetingExists(long id)
        {
            return _context.Meeting.Any(e => e.MeetingId == id);
        }
    }
}
