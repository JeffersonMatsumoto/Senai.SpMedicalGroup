using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using Senai.SpMedicalGroup.WebApi.Repositories;

namespace Senai.SpMedicalGroup.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProntuariosController : ControllerBase
    {
        private IProntuarioRepository ProntuarioRepository { get; set; }
        
        public ProntuariosController()
        {
            ProntuarioRepository = new ProntuarioRepository();
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(ProntuarioRepository.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPost]
        public IActionResult Post(Prontuarios prontuario)
        {
            try
            {
                ProntuarioRepository.Cadastrar(prontuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


    }
}