using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        public void Cadastrar(Clinicas clinica)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                ctx.Clinicas.Add(clinica);
                ctx.SaveChanges();
            }
        }

        public List<Clinicas> Listar()
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                return ctx.Clinicas.ToList();
            }
        }
    }
}
