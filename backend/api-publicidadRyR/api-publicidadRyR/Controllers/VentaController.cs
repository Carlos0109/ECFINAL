using api_publicidadRyR;
using api_publicidadRyR.Entitys;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_PublicidadRyR.Controllers
{
    //dinciamos que es un controlador
    [ApiController]
    //es definir la ruta de acceso al controlador
    [Route("api-publicidadRyR/venta")]
    //: ControllerBase es una herencia para que sea un controlador
    public class VentaController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        //creamos el constructor
        public VentaController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Venta>>> findAll()
        {
            return await context.Venta.ToListAsync();
        }
        //cuando queremos obtener solo los habilitados
        [HttpGet("custom")]
        public async Task<ActionResult<List<Venta>>> findAllCustom()
        {
            return await context.Venta.Where(x => x.estado == true).ToListAsync();
        }
        //cuando queremos guardar informacion
        [HttpPost]
        public async Task<ActionResult> add(Venta v)
        {
            context.Add(v);
            await context.SaveChangesAsync();
            return Ok();
        }
        //cuando queremos buscar informacion
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Venta>> findById(int id)
        {
            var venta = await context.Venta
                .FirstOrDefaultAsync(x => x.codigo_venta== id);
            return venta;

        }
        //cuando queremos actualizar informacion
        [HttpPut("{id:int}")]
        public async Task<ActionResult> update(Venta v, int id)
        {
            if (v.codigo_venta != id)
            {
                return BadRequest("No se encuentro el codigo correspondiente");
            }

            context.Update(v);
            await context.SaveChangesAsync();
            return Ok();
        }
        //cuando queremos eliminar informacion
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> delete(int id)
        {

            var existe = await context.Venta.AnyAsync(x => x.codigo_venta == id);
            if (!existe)
            {
                return NotFound();
            }
            var venta = await context.Venta.FirstOrDefaultAsync(x => x.codigo_venta == id);
            venta.estado = false;
            context.Update(venta);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
