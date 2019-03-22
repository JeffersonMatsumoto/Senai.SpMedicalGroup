using Microsoft.EntityFrameworkCore;
using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

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

        public Usuarios BuscarEmailSenha(string email, string senha) => new SpmedgroupContext().Usuarios.Include(c => c.IdTipoUsuarioNavigation).FirstOrDefault(x => x.Email == email && x.Senha == senha);
        
    }
}
