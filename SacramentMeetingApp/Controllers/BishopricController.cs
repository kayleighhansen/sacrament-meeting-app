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
    public class BishopricController : ControllerBase
    {
        private readonly BishopricContext _context;

        public BishopricController(BishopricContext context)
        {
            _context = context;
        }

        // GET: api/Bishopric
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bishopric>>> GetBishopric()
        {
            return await _context.Bishopric.ToListAsync();
        }

        // GET: api/Bishopric/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bishopric>> GetBishopric(int id)
        {
            var bishopric = await _context.Bishopric.FindAsync(id);

            if (bishopric == null)
            {
                return NotFound();
            }

            return bishopric;
        }

        // PUT: api/Bishopric/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBishopric(int id, Bishopric bishopric)
        {
            if (id != bishopric.Id)
            {
                return BadRequest();
            }

            _context.Entry(bishopric).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BishopricExists(id))
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

        // POST: api/Bishopric
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bishopric>> PostBishopric(Bishopric bishopric)
        {
            _context.Bishopric.Add(bishopric);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBishopric", new { id = bishopric.Id }, bishopric);
        }

        // DELETE: api/Bishopric/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBishopric(int id)
        {
            var bishopric = await _context.Bishopric.FindAsync(id);
            if (bishopric == null)
            {
                return NotFound();
            }

            _context.Bishopric.Remove(bishopric);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BishopricExists(int id)
        {
            return _context.Bishopric.Any(e => e.Id == id);
        }
    }
}
