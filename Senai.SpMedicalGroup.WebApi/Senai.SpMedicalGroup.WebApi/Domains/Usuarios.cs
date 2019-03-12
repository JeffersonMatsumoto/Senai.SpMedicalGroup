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
        [Required(ErrorMessage = "Informe o email")]
        [RegularExpression(".+\\@.+\\..+", ErrorMessage = "Informe um email válido...")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe a senha")]
        [StringLength(12, MinimumLength = 6)]
        public string Senha { get; set; }

        //
        [Required(ErrorMessage = "Informe o tipo de usuário")] //O front vai saber que informação passar mesmo pondo ADMINISTRADOR...
        public int? IdTipoUsuario { get; set; }

        public TipoUsuarios IdTipoUsuarioNavigation { get; set; }
        public ICollection<Medicos> Medicos { get; set; }
        public ICollection<Prontuarios> Prontuarios { get; set; }
        public object UsuarioId { get; internal set; }
    }
}
