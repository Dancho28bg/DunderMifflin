using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class PaperProperty
    {
        public int Id { get; set; }
        
        public int PaperId { get; set; }

        [Required(ErrorMessage = "Property name is required.")]
        public string PropertyName { get; set; }

        [Required(ErrorMessage = "Property value is required.")]
        public string PropertyValue { get; set; }

        public Paper Paper { get; set; }

        public PaperProperty() { }
    }
}
