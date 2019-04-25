using Microsoft.EntityFrameworkCore;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        public void Alterar(Consultas consulta)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                //Consultas consultaExiste = ctx.Consultas.Find(consulta.Id);

                //if (consultaExiste != null)
                //{
                //consultaExiste.IdSituacao = consulta.IdSituacao;
                //ctx.Consultas.Update(consultaExiste);
                
                //SEM PASSAR O ID
                ctx.Consultas.Update(consulta);
                ctx.SaveChanges();
                
                //}

            }
        }

        public void Cadastrar(Consultas consulta)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                ctx.Consultas.Add(consulta);
                ctx.SaveChanges();
            }
        }

        public List<Consultas> Listar()
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                return ctx.Consultas.Include(x => x.IdMedicoNavigation).Include(y => y.IdProntuarioNavigation).Include(z => z.IdSituacaoNavigation).ToList();
            }
        }

        public List<Consultas> ListarConsultasMedico(int idUsuarioBuscado)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                int idMedicoBuscado = ctx.Medicos.First(x => x.IdUsuario == idUsuarioBuscado).Id;
                //Consultas consultaExiste = ctx.Consultas.Find(consulta.Id);
                //return ctx.Consultas.Find(medico.Id)   .ToList();
                //Consultas medicoConsultas = ctx.Consultas.Find(medico.Id);
                //medicoConsultas = ctx.Consultas.Find(medico.Id);

                //return ctx.Consultas.Include(c => c.IdMedicoNavigation).ToList();

                //ctx.Medicos.Include("Consultas").ToList();
                return ctx.Consultas.Where(c => c.IdMedico == idMedicoBuscado).ToList();
            }
        }

        public List<Consultas> ListarConsultasPaciente(int idUsuarioBuscado)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                int idPacienteBuscado = ctx.Prontuarios.First(x => x.IdUsuario == idUsuarioBuscado).Id;
                return ctx.Consultas.Where(c => c.IdProntuario == idPacienteBuscado).ToList();
                //return ctx.Consultas.Where(c => c.IdProntuarioNavigation.Id == idPaciente).ToList();
            }
        }
    }
}
