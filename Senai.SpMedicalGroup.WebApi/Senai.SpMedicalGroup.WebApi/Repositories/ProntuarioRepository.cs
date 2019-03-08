using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositories
{
    public class ProntuarioRepository : IProntuarioRepository
    {
        public void Cadastrar(Prontuarios prontuario)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                ctx.Prontuarios.Add(prontuario);
                ctx.SaveChanges();
            }
        }

        public List<Prontuarios> Listar()
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                return ctx.Prontuarios.ToList();
            }
        }
    }
}
