using System.ComponentModel.DataAnnotations;
namespace backend.Models
{
    public class PaperProperty
    {
        public int Id { get; set; }
        public int PaperId { get; set; } 
        public string PropertyName { get; set; } 
        public string PropertyValue { get; set; } 

        public Paper Paper { get; set; } 
        
        public PaperProperty() { }
    }
}