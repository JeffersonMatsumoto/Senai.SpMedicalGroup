using Senai.SpMedicalGroup.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Interfaces
{
    interface IConsultaRepository
    {
        List<Consultas> Listar();

        List<Consultas> ListarConsultasMedico(int idmedico);

        List<Consultas> ListarConsultasPaciente(int idpaciente);
        
        void Cadastrar(Consultas consulta);
                    
        void Alterar(Consultas consulta);
    }
}
