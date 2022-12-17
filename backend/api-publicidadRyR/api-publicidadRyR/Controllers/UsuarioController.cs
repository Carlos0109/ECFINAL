using api_publicidadRyR.Entitys;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_publicidadRyR.Controllers
{
    [ApiController]
    [Route("api-publicidadRyR/usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        public UsuarioController(ApplicationDBContext context)
        {
            this.context = context;
        }

        //mostrar usuario

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> findAll()
        {
            return await context.Usuario.ToListAsync();
        }

        //guardar usuario

        [HttpPost]

        public async Task<ActionResult> add(Usuario u)
        {
            context.Add(u);
            await context.SaveChangesAsync();
            return Ok();
        }

        //cuando queremos obtener solo los habilitados
        [HttpGet("custom")]
        public async Task<ActionResult<List<Usuario>>> findAllCustom()
        {
            return await context.Usuario.Where(x => x.estado == true).ToListAsync();
        }

        //cuando queremos buscar informacion
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Usuario>> findById(int id)
        {
            var usuario = await context.Usuario
                .FirstOrDefaultAsync(x => x.codigo_user == id);
            return usuario;
        }

        //cuando queremos actualizar informacion
        [HttpPut("{id:int}")]
        public async Task<ActionResult> update(Usuario u, int id)
        {
            if (u.codigo_user != id)
            {
                return BadRequest("No se encuentro el codigo correspondiente");
            }

            context.Update(u);
            await context.SaveChangesAsync();
            return Ok();
        }

        //delete

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> delete_false(int id)
        {
            var existe = await context.Usuario.AnyAsync(x => x.codigo_user == id);
            if (!existe)
            {
                return NotFound();
            }
            var usuario = await context.Usuario.FirstOrDefaultAsync(x => x.codigo_user == id);
            usuario.estado = false;
            context.Update(usuario);
            await context.SaveChangesAsync();
            return Ok();
        }

        //delete2

        /*[HttpDelete("{id:int}")]
        public async Task<ActionResult> delete(int id)
        {
            var existe = await context.Usuario.AnyAsync(x => x.codigo_user == id);
            if (!existe)
            {
                return NotFound();
            }
            context.Remove(new Usuario() { codigo_user = id });
            await context.SaveChangesAsync();
            return Ok();
        }*/
    }
}
