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
                return ctx.Usuarios.Include(c => c.IdTipoUsuarioNavigation).ToList();
            }
        }

        //public Usuarios BuscarEmailSenha(string email, string senha) => new SpmedgroupContext().Usuarios.Include(c => c.IdTipoUsuarioNavigation).FirstOrDefault(x => x.Email == email && x.Senha == senha);
        public Usuarios BuscarEmailSenha(string email, string senha)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                Usuarios usuarioBuscado = ctx.Usuarios
                    .Include(m => m.Medicos)
                    .Include(p => p.Prontuarios)
                    .Include(c => c.IdTipoUsuarioNavigation)
                    .ToList().FirstOrDefault(u => u.Email == email && u.Senha == senha);
                return usuarioBuscado;
            }
        }

    }
}
