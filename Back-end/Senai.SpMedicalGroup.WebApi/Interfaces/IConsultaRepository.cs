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

        List<Consultas> ListarConsultasMedico(int idUsuario);

        List<Consultas> ListarConsultasPaciente(int idUsuario);
        
        void Cadastrar(Consultas consulta);
                    
        void Alterar(Consultas consulta);

        Consultas BuscarConsultaPorId(int consultaId);

        Consultas AtualizarDescricao(Consultas descricao, Consultas consultaRecebida);

    }
}
