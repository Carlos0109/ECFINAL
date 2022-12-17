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
    [Route("api-publicidadRyR/dventa")]
    //: ControllerBase es una herencia para que sea un controlador
    public class DetalleVentaController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        //creamos el constructor
        public DetalleVentaController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Detalle_venta>>> findAll()
        {
            return await context.Detalle_venta.ToListAsync();
        }
        ////cuando queremos obtener solo los habilitados
        //[HttpGet("custom")]
        //public async Task<ActionResult<List<Detalle_venta>>> findAllCustom()
        //{
        //    return await context.Detalle_venta.Where(x => x.estado == true).ToListAsync();
        //}
        //cuando queremos guardar informacion
        [HttpPost]
        public async Task<ActionResult> add(Detalle_venta d)
        {
            context.Add(d);
            await context.SaveChangesAsync();
            return Ok();
        }
        //cuando queremos buscar informacion
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Detalle_venta>> findById(int id)
        {
            var dventa = await context.Detalle_venta
                .FirstOrDefaultAsync(x => x.id_detalle_venta == id);
            return dventa;

        }
        //cuando queremos actualizar informacion
        [HttpPut("{id:int}")]
        public async Task<ActionResult> update(Detalle_venta d, int id)
        {
            if (d.id_detalle_venta != id)
            {
                return BadRequest("No se encuentro el codigo correspondiente");
            }

            context.Update(d);
            await context.SaveChangesAsync();
            return Ok();
        }
        //cuando queremos eliminar informacion
        //[HttpDelete("{id:int}")]
        //public async Task<ActionResult> delete(int id)
        //{

        //    var existe = await context.Detalle_venta.AnyAsync(x => x.id_detalle_venta == id);
        //    if (!existe)
        //    {
        //        return NotFound();
        //    }
        //    var dventa = await context.Detalle_venta.FirstOrDefaultAsync(x => x.id_detalle_venta == id);
        //    //venta.estado = false;
        //    context.Update(dventa);
        //    await context.SaveChangesAsync();
        //    return Ok();
        //}

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> delete(int id)
        {
            var existe = await context.Detalle_venta.AnyAsync(x => x.id_detalle_venta == id);
            if (!existe)
            {
                return NotFound();
            }
            context.Remove(new Detalle_venta() { id_detalle_venta = id });
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}
