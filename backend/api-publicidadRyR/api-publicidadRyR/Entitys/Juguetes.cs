using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace api_publicidadRyR.Entitys
{
    public class Juguetes
    {
        [Key]
        public int id_prod { get; set; }
        [Required]
        public double precio_prod { get; set; }
        [Required]
        public int cant_prod { get; set; }
        [Required]
        [StringLength(maximumLength: 40,
            ErrorMessage = "Se tiene que ingresar un nombre")]
        public string nombreprod { get; set; }
        public bool estado {get; set; }
        [Required]
        public int cod_cat { get; set; }
        public Categoria categoria { get; set; }
        public List<Detalle_venta> detalle_venta { get; set; }
        
    }
}
