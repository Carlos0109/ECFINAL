using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api_publicidadRyR.Entitys
{
    public class Venta
    {
        [Key]
        public int codigo_venta { get; set; }
        [Required]
        public string fech_venta { get; set; }
        [Required]
        [StringLength(
            maximumLength: 50,
            ErrorMessage = "Se tiene que ingresar un nombre"
            )]
        public string nom_cli { get; set; }
        [Required]
        public double total { get; set; }
        [Required]
        public Boolean estado { get; set; }
        [Required]
        public int codigo_user { get; set; }
        public Usuario usuario { get; set; }
        [Required]
        public int codigocliente { get; set; }
        public Cliente cliente { get; set; }
        public List<Detalle_venta> detalle_venta { get; set; }
    }
}
