using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    interface IUsuarioRepository
    {
        List<Usuarios> Listar();
        void Cadastrar(Usuarios usuario);
        Usuarios BuscarEmailSenha(string email, string senha);
    }
}
