using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Usuarios
    {
        public Usuarios()
        {
            Medicos = new HashSet<Medicos>();
            Prontuarios = new HashSet<Prontuarios>();
        }
        
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Email { get; set; }
        public string Senha { get; set; }
        public int? IdTipoUsuario { get; set; }

        public TipoUsuarios IdTipoUsuarioNavigation { get; set; }
        public ICollection<Medicos> Medicos { get; set; }
        public ICollection<Prontuarios> Prontuarios { get; set; }
    }
}
