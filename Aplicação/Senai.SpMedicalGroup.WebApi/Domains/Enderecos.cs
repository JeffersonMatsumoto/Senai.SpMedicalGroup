using System;
using System.Collections.Generic;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Enderecos
    {
        public Enderecos()
        {
            Clinicas = new HashSet<Clinicas>();
            Prontuarios = new HashSet<Prontuarios>();
        }

        public int Id { get; set; }
        public string Logradouro { get; set; }
        public string Uf { get; set; }
        public string Cep { get; set; }

        public ICollection<Clinicas> Clinicas { get; set; }
        public ICollection<Prontuarios> Prontuarios { get; set; }
    }
}
