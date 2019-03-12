using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Prontuarios
    {
        public Prontuarios()
        {
            Consultas = new HashSet<Consultas>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Informe o nome do paciente")]
        public string NomePaciente { get; set; }

        [Required(ErrorMessage = "Informe o Cpf do paciente")]
        [StringLength(11, MinimumLength = 11)]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "Informe o RG do paciente")]
        [StringLength(10, MinimumLength = 4)]
        public string Rg { get; set; }

        [DataType(DataType.Date)]
        [Required(ErrorMessage = "Informe a data de nascimento")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "Informe o telefone", AllowEmptyStrings = true)]
        public string Telefone { get; set; }

        public int? IdEndereco { get; set; }
        public int? IdUsuario { get; set; }

        public Enderecos IdEnderecoNavigation { get; set; }
        public Usuarios IdUsuarioNavigation { get; set; }
        public ICollection<Consultas> Consultas { get; set; }
    }
}
