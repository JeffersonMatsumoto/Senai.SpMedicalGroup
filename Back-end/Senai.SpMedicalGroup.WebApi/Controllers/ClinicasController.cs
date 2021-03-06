﻿using System;
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
    public class ClinicasController : ControllerBase
    {

        private IClinicaRepository ClinicaRepository { get; set; }

        public ClinicasController()
        { 
            ClinicaRepository = new ClinicaRepository();
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public IActionResult Post(Clinicas clinica)
        {
            try
            {
                ClinicaRepository.Cadastrar(clinica);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<Clinicas> clinicas = ClinicaRepository.Listar();
                var resultado = from c in clinicas
                                select new
                                {
                                    id = c.Id,
                                    nomeFantasia = c.NomeFantasia,
                                    razaoSocial = c.RazaoSocial,
                                    cnpj = c.Cnpj,
                                    horarioFuncionamento = c.HorarioFuncionamento,
                                    idEndereco = c.IdEnderecoNavigation.Logradouro,
                                    medicos = c.Medicos
                                };
                //return Ok(ClinicaRepository.Listar());
                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}