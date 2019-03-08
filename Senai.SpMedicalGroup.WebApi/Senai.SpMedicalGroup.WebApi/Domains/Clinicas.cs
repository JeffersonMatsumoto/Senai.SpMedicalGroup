using System;
using System.Collections.Generic;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Clinicas
    {
        public Clinicas()
        {
            Medicos = new HashSet<Medicos>();
        }

        public int Id { get; set; }
        public string NomeFantasia { get; set; }
        public string RazaoSocial { get; set; }
        public string Cnpj { get; set; }
        public string HorarioFuncionamento { get; set; }
        public int IdEndereco { get; set; }

        public Enderecos IdEnderecoNavigation { get; set; }
        public ICollection<Medicos> Medicos { get; set; }
    }
}
