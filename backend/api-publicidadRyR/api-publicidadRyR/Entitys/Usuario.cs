using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api_publicidadRyR.Entitys
{
    public class Usuario
    {
        [Key]
        public int codigo_user { get; set; }
        [Required]
        [StringLength(maximumLength:40, 
            ErrorMessage ="Se tiene que ingresar un nombre")]
        public string nombre_user { get; set; }
        [Required]
        [StringLength(maximumLength: 40,
            ErrorMessage = "Se tiene que ingresar los apellidos")]
        public string ape_user { get; set; }
        [Required]
        public string cargo { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string pass { get; set; }
        public bool estado { get; set; }
        public List<Venta> venta { get; set; }
    }
}
