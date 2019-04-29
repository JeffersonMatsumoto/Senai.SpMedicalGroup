using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using Senai.SpMedicalGroup.WebApi.Repositories;
using Senai.SpMedicalGroup.WebApi.ViewModel;

namespace Senai.SpMedicalGroup.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository { get; set; }

        public LoginController()
        {
            UsuarioRepository = new UsuarioRepository();
        }

        //string NomeLogado;

        [HttpPost]
        public IActionResult Post(LoginViewModel login)
        {
            try
            {

                Usuarios usuarioBuscado = UsuarioRepository.BuscarEmailSenha(login.Email, login.Senha);

                if (usuarioBuscado == null)
                {
                    return NotFound(new
                    {
                        mensagem = "Email ou senha inválido"
                    });
                }
                else
                {
                    string nome;
                    using (SpmedgroupContext ctx = new SpmedgroupContext())
                    {
                        Medicos m = new Medicos();
                        Prontuarios p = new Prontuarios();

                        if (ctx.Medicos.FirstOrDefault(x => x.IdUsuario == usuarioBuscado.Id) != null)
                        {
                            m = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == usuarioBuscado.Id);
                            nome = m.NomeMedico;
                        }

                        else if (ctx.Prontuarios.FirstOrDefault(x => x.IdUsuario == usuarioBuscado.Id) != null)
                        {
                            p = ctx.Prontuarios.FirstOrDefault(x => x.IdUsuario == usuarioBuscado.Id);
                            nome = p.NomePaciente;
                        }

                        else
                        {
                            nome = "Administrador";
                        }
                    }

                    //switch (usuarioBuscado.IdTipoUsuarioNavigation.Tipo)
                    //{
                    //    //case "Administrador":
                    //    //    NomeLogado = usuarioBuscado.;
                    //    //    break;
                    //    case "Medico":
                    //        NomeLogado = usuarioBuscado.Medicos.NomeMedico;
                    //        break;

                    //    case "Paciente":
                    //        NomeLogado = usuarioBuscado.Prontuarios.NomePaciente;
                    //        break;
                    //}

                    var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.Id.ToString()),
                    new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuarioNavigation.Tipo.ToString()),
                    new Claim("Permissao", usuarioBuscado.IdTipoUsuarioNavigation.Tipo.ToString()),
                    new Claim("Nome", nome)
                };

                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("spmedgroup-chave-autenticacao"));

                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: "SpMedGroup.WebApi",
                        audience: "SpMedGroup.WebApi",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: creds
                    );

                    return Ok(new
                    {
                        m = "Acesso liberado !",
                        token = new JwtSecurityTokenHandler().WriteToken(token)
                    });
                }
            }
            catch (Exception XX)
            {
                return BadRequest(XX.Message); //aparece o erro no postman
            }
        }
    }
}