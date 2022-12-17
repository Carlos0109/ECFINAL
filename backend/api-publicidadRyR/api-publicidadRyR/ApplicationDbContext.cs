using api_publicidadRyR.Entitys;
using Microsoft.EntityFrameworkCore;

namespace api_publicidadRyR
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }

        //configurando las tablas de la base de datos
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Juguetes> Juguetes { get; set; }
        public DbSet<Venta> Venta { get; set; }
        public DbSet<Detalle_venta> Detalle_venta { get; set; }
        public DbSet<Categoria> Categoria { get; set; }
    }
}
