using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public void Cadastrar(Usuarios usuario)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
        }

        public List<Usuarios> Listar()
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                return ctx.Usuarios.ToList();
            }
        }
    }
}
