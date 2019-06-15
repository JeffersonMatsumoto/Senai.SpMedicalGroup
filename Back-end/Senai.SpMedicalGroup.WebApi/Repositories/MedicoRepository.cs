using Microsoft.EntityFrameworkCore;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        public List<Medicos> Listar()
        {
            using ( SpmedgroupContext ctx = new SpmedgroupContext())
            {
                return ctx.Medicos.Include(x => x.IdClinicaNavigation)
                                    .Include(y => y.IdUsuarioNavigation)
                                    .Include(z => z.IdEspecialidadeNavigation).ToList();
            }
        }
    }
}
