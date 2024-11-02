using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PapersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PapersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paper>>> GetPapers()
        {
            return await _context.Papers.Include(p => p.PaperProperties).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Paper>> GetPaper(int id)
        {
            var paper = await _context.Papers.Include(p => p.PaperProperties)
                                              .FirstOrDefaultAsync(p => p.Id == id);

            if (paper == null)
            {
                return NotFound();
            }

            return paper;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Paper>> CreatePaper(Paper paper)
        {
            _context.Papers.Add(paper);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPaper), new { id = paper.Id }, paper);
        }

        [HttpPut("{id}/discontinue")]
        public async Task<IActionResult> DiscontinuePaper(int id)
        {
            var paper = await _context.Papers.FindAsync(id);
            if (paper == null)
            {
                return NotFound();
            }

            paper.IsDiscontinued = true; 
            _context.Entry(paper).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/restock")]
        public async Task<IActionResult> RestockPaper(int id, [FromBody] int quantity)
        {
            var paper = await _context.Papers.FindAsync(id);
            if (paper == null)
            {
                return NotFound();
            }

            paper.StockQuantity += quantity; 
            _context.Entry(paper).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaperExists(int id)
        {
            return _context.Papers.Any(e => e.Id == id);
        }
    }
}
