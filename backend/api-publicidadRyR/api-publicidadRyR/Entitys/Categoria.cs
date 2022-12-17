using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api_publicidadRyR.Entitys
{
    public class Categoria
    {
        [Key]
        public int cod_cat { get; set; }
        [Required]
        [StringLength(maximumLength: 40,
            ErrorMessage = "Se tiene que ingresar un nombre")]
        public string nom_cat { get; set; }
        public bool estado { get; set; }
        public List<Juguetes> juguetes { get; set; }
    }
}
