using System.ComponentModel.DataAnnotations;

namespace api_publicidadRyR.Entitys
{
    public class Detalle_venta
    {
        [Key]
        public int id_detalle_venta { get; set; }
        [Required]
        public int cantidad { get; set; }
        [Required]
        [StringLength(maximumLength: 40,
            ErrorMessage = "Se tiene que ingresar un nombre")]
        public string producto { get; set; }
        [Required]
        public int importe { get; set; }
        [Required]
        public int id_prod { get; set; }
        public Juguetes juguetes { get; set; }
        [Required]
        public int codigo_venta { get; set; }
        public Venta venta { get; set; }
    }
}
