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
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository MedicoRepository{ get; set; }

        public MedicosController()
        {
            MedicoRepository = new MedicoRepository();
        }

        [Authorize(Roles = "Administrador, Medico")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<Medicos> medicos = MedicoRepository.Listar();
                var resultado = from m in medicos
                                select new
                                {
                                    id = m.Id,
                                    crm = m.Crm,
                                    nome = m.NomeMedico,
                                    IdClinica = m.IdClinicaNavigation.RazaoSocial,
                                    IdEspecialidade = m.IdEspecialidadeNavigation.NomeEspecialidade,
                                    IdUsuario = m.IdUsuarioNavigation.Email
                                };
                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}