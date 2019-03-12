using Senai.SpMedicalGroup.WebApi.Domains;
using Senai.SpMedicalGroup.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.SpMedicalGroup.WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {

        private string StringConexao = "Data Source=.\\SqlExpress; initial catalog=InLock_Games_Manha; user id=sa; pwd=132";

        public void Cadastrar(Usuarios usuario)
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
        }

        public List<Usuarios> Listar()
        {
            using (SpmedgroupContext ctx = new SpmedgroupContext())
            {
                return ctx.Usuarios.ToList();
            }
        }

        public Usuarios BuscarEmailSenha(string email, string senha)
        {
            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                string QuerySelect = "SELECT UsuarioId, Email, Senha, TipoUsuario FROM USUARIOS " +
                                                         "WHERE Email = @EMAIL AND Senha = @SENHA";

                using (SqlCommand cmd = new SqlCommand(QuerySelect, con))
                {
                    cmd.Parameters.AddWithValue("@EMAIL", email);
                    cmd.Parameters.AddWithValue("@SENHA", senha);

                    con.Open();

                    SqlDataReader sdr = cmd.ExecuteReader();

                    if (sdr.HasRows)
                    {
                        Usuarios usuario = new Usuarios();

                        while (sdr.Read())
                        {
                            usuario.UsuarioId = Convert.ToInt32(sdr["UsuarioId"]);
                            usuario.Email = sdr["Email"].ToString();
                            usuario.IdTipoUsuarioNavigation.Tipo = sdr["TipoUsuario"].ToString();
                        }
                        return usuario;
                    }
                }
                return null;
            }
        }
    }
}
