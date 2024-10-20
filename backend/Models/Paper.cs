using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models 
{
    public class Paper
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsDiscontinued { get; set; } 
        public int StockQuantity { get; set; } 
        public ICollection<OrderEntry> OrderEntries { get; set; } = new List<OrderEntry>(); 
        public ICollection<PaperProperty> PaperProperties { get; set; } = new List<PaperProperty>();

        
        public Paper() { }
    }
}