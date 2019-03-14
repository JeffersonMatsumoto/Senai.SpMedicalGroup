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

        [Authorize(Roles = "Administrador")]
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

        [Authorize(Roles = "Administrador, Médico")]
        //[Authorize(Roles = "Médico")]
        [HttpGet("ConsultasMedicos/{idmedico}")]
        public IActionResult GetConsultasMedicos(int idmedico)
        {
            try
            {
                return Ok(ConsultaRepository.ListarConsultasMedico(idmedico)); //break aqui
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Administrador")]
        //[Authorize(Roles = "Paciente")]
        [HttpGet("ConsultasPacientes/{idpaciente}")]
        public IActionResult GetConsultasPacientes(int idpaciente)
        {
            try
            {
                return Ok(ConsultaRepository.ListarConsultasPaciente(idpaciente));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Administrador")]
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

        [Authorize(Roles = "Administrador")]
        [Authorize(Roles = "Medico")]
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