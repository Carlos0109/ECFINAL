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
    [Route("api-publicidadRyR/cliente")]
    //: ControllerBase es una herencia para que sea un controlador
    public class ClienteController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        //creamos el constructor
        public ClienteController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> findAll()
        {
            return await context.Cliente.ToListAsync();
        }
        //cuando queremos obtener solo los habilitados
        [HttpGet("custom")]
        public async Task<ActionResult<List<Cliente>>> findAllCustom()
        {
            return await context.Cliente.Where(x => x.estado == true).ToListAsync();
        }
        //cuando queremos guardar informacion
        [HttpPost]
        public async Task<ActionResult> add(Cliente c)
        {
            context.Add(c);
            await context.SaveChangesAsync();
            return Ok();
        }
        //cuando queremos buscar informacion
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Cliente>> findById(int id)
        {
            var cliente = await context.Cliente
                .FirstOrDefaultAsync(x => x.codigocliente == id);
            if (cliente == null)
            {
                return NotFound();
            }
            else
            {
                return cliente;
            }


        }
        //cuando queremos actualizar informacion
        [HttpPut("{id:int}")]
        public async Task<ActionResult> update(Cliente c, int id)
        {
            if (c.codigocliente != id)
            {
                return BadRequest("No se encuentro el codigo correspondiente");
            }

            context.Update(c);
            await context.SaveChangesAsync();
            return Ok();
        }
        //cuando queremos eliminar informacion
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> delete(int id)
        {
            var existe = await context.Cliente.AnyAsync(x => x.codigocliente == id);
            if (!existe)
            {
                return NotFound();
            }
            context.Remove(new Cliente() { codigocliente = id });
            await context.SaveChangesAsync();
            return Ok();
            /*[HttpDelete("{id:int}")]
            public async Task<ActionResult> delete(int id)
            {

                var existe = await context.Cliente.AnyAsync(x => x.codigocliente == id);
                if (!existe)
                {
                    return NotFound();
                }
                var cliente = await context.Cliente.FirstOrDefaultAsync(x => x.codigocliente == id);
                cliente.estado = false;
                context.Update(cliente);
                await context.SaveChangesAsync();
                return Ok();
            }*/
        }

    }
}
