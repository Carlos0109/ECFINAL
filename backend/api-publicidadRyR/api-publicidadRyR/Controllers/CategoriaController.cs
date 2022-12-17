using api_publicidadRyR;
using api_publicidadRyR.Entitys;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_PublicidadRyR.Controllers
{
    //dinciamos que es un controlador
    [ApiController]
    //es definir la ruta de acceso al controlador
    [Route("api-publicidadRyR/categoria")]
    //: ControllerBase es una herencia para que sea un controlador
    public class CategoriaController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        //creamos el constructor
        public CategoriaController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> findAll()
        {
            return await context.Categoria.ToListAsync();
        }
        //cuando queremos obtener solo los habilitados
        [HttpGet("custom")]
        public async Task<ActionResult<List<Categoria>>> findAllCustom()
        {
            return await context.Categoria.Where(x => x.estado == true).ToListAsync();
        }
        //cuando queremos guardar informacion
        [HttpPost]
        public async Task<ActionResult> add(Categoria c)
        {
            context.Add(c);
            await context.SaveChangesAsync();
            return Ok();
        }
        //cuando queremos buscar informacion
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Categoria>> findById(int id)
        {
            var categoria = await context.Categoria
                .FirstOrDefaultAsync(x => x.cod_cat== id);
            return categoria;

        }
        //cuando queremos actualizar informacion
        [HttpPut("{id:int}")]
        public async Task<ActionResult> update(Categoria c, int id)
        {
            if (c.cod_cat != id)
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

            var existe = await context.Categoria.AnyAsync(x => x.cod_cat == id);
            if (!existe)
            {
                return NotFound();
            }
            var categoria = await context.Categoria.FirstOrDefaultAsync(x => x.cod_cat == id);
            categoria.estado = false;
            context.Update(categoria);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
