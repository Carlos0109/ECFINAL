using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api_publicidadRyR.Entitys
{
    public class Cliente
    {
        //clave primaria
        [Key]
        public int codigocliente { get; set; }
        //valores no nulos
        [Required]
        //tamaño del campo
        [StringLength(
            maximumLength: 100,
            ErrorMessage = "Se tiene que ingresar un nombre"
            )]
        public string nombre { get; set; }
        [Required]
        [StringLength(
            maximumLength: 100,
            ErrorMessage = "Se tiene que ingresar un nombre"
            )]
        public string apellido { get; set; }
        [Required]
        public int telefono { get; set; }
        [Required]
        public bool estado { get; set; }
        public List<Venta> venta { get; set; }
    }
}
