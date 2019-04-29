using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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

        //[Authorize(Roles = "Administrador")]
        //[HttpGet]
        //public IActionResult Get()
        //{
        //    try
        //    {
        //        return Ok(ConsultaRepository.Listar());
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest();
        //    }
        //}

        //[Authorize(Roles = "Administrador, Médico")]
        ////[Authorize(Roles = "Médico")]
        //[HttpGet("ConsultasMedicos/{idmedico}")]
        //public IActionResult GetConsultasMedicos(int idmedico)
        //{
        //    try
        //    {
        //        return Ok(ConsultaRepository.ListarConsultasMedico(idmedico)); //break aqui
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[Authorize(Roles = "Administrador")]
        ////[Authorize(Roles = "Paciente")]
        //[HttpGet("ConsultasPacientes/{idpaciente}")]
        //public IActionResult GetConsultasPacientes(int idpaciente)
        //{
        //    try
        //    {
        //        return Ok(ConsultaRepository.ListarConsultasPaciente(idpaciente));
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //Não necessita das dependências do NuGet pq quando baixar o projeto já vai estar incluso
        //Xamarin muito lento.. React native
        //sign in into yourweb app, quando logar e pedir login do google é um API...
        // .NET é o framework e o ADO .NET é o que acessa aos dados

        //De vez 3 controllers, apenas 1 contendo 3 listas.
        [Authorize] //quando deixa sem role,
        [HttpGet] 
        public IActionResult Get() // Aqui na URL PODE CONSULTAR O ID DE OUTRO USUARIO COM O MESMO TIPO DE PERMISSÃO, por isso não foi utilizado
        { 
            try
            {
                string usuarioLogado = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value; //breakpoint aq

                #region usando switch
                //switch (usuarioLogado)
                //{
                //    case "Administrador":
                //        {
                //            return Ok(ConsultaRepository.Listar());
                //            //break;
                //        }
                //    case "Médico":
                //        {
                //            int idMedico = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
                //            return Ok(ConsultaRepository.ListarConsultasMedico(idMedico));
                //            //break;
                //        }

                //    default:
                //        int idProntuario = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
                //        return Ok(ConsultaRepository.ListarConsultasPaciente(idProntuario));
                //        //break
                //        ;
                //}
                #endregion

                List<Consultas> consultas = new List<Consultas>();
                if (usuarioLogado == "Administrador")
                {
                    consultas = ConsultaRepository.Listar();
                }
                else if (usuarioLogado == "Medico")
                {
                    int idUsuario = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
                    consultas = ConsultaRepository.ListarConsultasMedico(idUsuario);   
                } 
                else if (usuarioLogado == "Paciente") //f10 para ir passo a passo
                {
                    int idUsuario = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
                    consultas = ConsultaRepository.ListarConsultasPaciente(idUsuario);
                }

                var resultado = from c in consultas
                                select new
                                {
                                    id = c.Id,
                                    descricao = c.Descricao,
                                    dataConsulta = c.DataConsulta,
                                    idMedico = c.IdMedicoNavigation.NomeMedico,
                                    idProntuario = c.IdProntuarioNavigation.NomePaciente,
                                    idSituacao = c.IdSituacaoNavigation.Tipo
                                };

                return Ok(resultado);
            }
            catch (Exception)
            {
                return BadRequest();
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

        [Authorize(Roles = "Administrador, Medico")]
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