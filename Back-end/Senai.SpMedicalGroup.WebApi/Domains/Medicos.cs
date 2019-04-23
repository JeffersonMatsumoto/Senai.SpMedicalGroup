using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.Domains
{
    public partial class Medicos
    {
        public Medicos()
        {
            Consultas = new HashSet<Consultas>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Informe o nome do médico")]
        public string NomeMedico { get; set; }

        [Required(ErrorMessage = "Informe o CRM do paciente")]
        [StringLength(maximumLength:5, MinimumLength = 5)]
        public string Crm { get; set; }

        //
        public int? IdClinica { get; set; }
        public int IdEspecialidade { get; set; }
        public int? IdUsuario { get; set; } //prop

        public Clinicas IdClinicaNavigation { get; set; }
        public Especialidades IdEspecialidadeNavigation { get; set; }
        public Usuarios IdUsuarioNavigation { get; set; } //obj
        public ICollection<Consultas> Consultas { get; set; }
    }
}
