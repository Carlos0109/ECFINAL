using api_publicidadRyR.Entitys;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_publicidadRyR.Controllers
{
    //dinciamos que es un controlador
    [ApiController]
    //es definir la ruta de acceso al controlador
    [Route("api-publicidadRyR/juguetes")]
    //: ControllerBase es una herencia para que sea un controlador
    public class JuguetesController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        //creamos el metodo constructor
        public JuguetesController(ApplicationDBContext context)
        {
            this.context = context;
        }

        //cuando queremos obtener informacion
        [HttpGet]
        public async Task<ActionResult<List<Juguetes>>> findAll()
        {
            return await context.Juguetes.ToListAsync();
        }

        //cuando queremos obtener solo los habilitados
        [HttpGet("custom")]
        public async Task<ActionResult<List<Juguetes>>> findAllCustom()
        {
            return await context.Juguetes.Where(x => x.estado == true).ToListAsync();
        }

        //cuando queremos guardar informacion
        [HttpPost]
        public async Task<ActionResult> add(Juguetes j)
        {
            context.Add(j);
            await context.SaveChangesAsync();
            return Ok();
        }

        //cuando queremos buscar informacion
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Juguetes>> findById(int id)
        {
            var juguetes = await context.Juguetes
                .FirstOrDefaultAsync(x => x.id_prod == id);
            return juguetes;

        }

        //cuando queremos actualizar informacion
        [HttpPut("{id:int}")]
        public async Task<ActionResult> update(Juguetes j, int id)
        {
            if (j.id_prod != id)
            {
                return BadRequest("No se encuentro el codigo correspondiente");
            }

            context.Update(j);
            await context.SaveChangesAsync();
            return Ok();
        }

        //cuando queremos eliminar informacion
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> delete(int id)
        {

            var existe = await context.Juguetes.AnyAsync(x => x.id_prod == id);
            if (!existe)
            {
                return NotFound();
            }
            var juguetes = await context.Juguetes.FirstOrDefaultAsync(x => x.id_prod == id);
            juguetes.estado = false;
            context.Update(juguetes);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
