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

        List<Consultas> ListarConsultasMedico();

        List<Consultas> ListarConsultasPaciente();
        
        void Cadastrar(Consultas consulta);
                    
        void Alterar(Consultas consulta);
    }
}
