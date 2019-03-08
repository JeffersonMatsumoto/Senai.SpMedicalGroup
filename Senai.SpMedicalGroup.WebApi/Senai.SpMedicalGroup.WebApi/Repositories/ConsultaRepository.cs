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
                return ctx.Consultas.ToList();
            }
        }

        public List<Consultas> ListarConsultasMedico(Medicos medico)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                //Consultas consultaExiste = ctx.Consultas.Find(consulta.Id);
                //return ctx.Consultas.Find(medico.Id)   .ToList();
                Consultas medicoConsultas = ctx.Consultas.Find(medico.Id);
                medicoConsultas = ctx.Consultas.Find(medico.Id);
            }
        }

        public List<Consultas> ListarConsultasPaciente(Prontuarios paciente)
        {
            throw new NotImplementedException();
        }
    }
}
