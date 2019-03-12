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
    public class ConsultasController : ControllerBase
    {

        private IConsultaRepository ConsultaRepository { get; set; }

        public ConsultasController()
        {
            ConsultaRepository = new ConsultaRepository();
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(ConsultaRepository.Listar());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [Authorize(Roles = "MÉDICO")]
        [HttpGet("ConsultasMedicos")]
        public IActionResult GetConsultasMedicos()
        {
            try
            {
                return Ok(ConsultaRepository.ListarConsultasMedico()); //break aqui
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [Authorize(Roles = "PACIENTE")]
        [HttpGet("ConsultasPacientes")]
        public IActionResult GetConsultasPacientes()
        {
            try
            {
                return Ok(ConsultaRepository.ListarConsultasPaciente());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPost]
        public IActionResult Post(Consultas consulta)
        {
            try
            {
                ConsultaRepository.Cadastrar(consulta);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPut]
        public IActionResult Put(Consultas consulta)
        {
            try
            {
                ConsultaRepository.Alterar(consulta);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}