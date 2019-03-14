using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Clinicas
    {
        public Clinicas()
        {
            Medicos = new HashSet<Medicos>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Informe um Nome Fantasia")]
        public string NomeFantasia { get; set; }

        [Required(ErrorMessage = "Informe um Razão Social")]
        public string RazaoSocial { get; set; }

        [Required(ErrorMessage = "Informe um Cnpj")]
        [StringLength(12, MinimumLength = 12)]
        public string Cnpj { get; set; }

        [Required(ErrorMessage = "Informe um horário de funcionamento")]
        public string HorarioFuncionamento { get; set; }
        public int IdEndereco { get; set; }

        public Enderecos IdEnderecoNavigation { get; set; }
        public ICollection<Medicos> Medicos { get; set; }
    }
}
