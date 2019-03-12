using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.ViewModel
{
    public class LoginViewModel
    {
        [RegularExpression(".+\\@.+\\..+", ErrorMessage = "Informe um email válido...")]
        [Required(ErrorMessage = "Informe o email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe a senha")]
        public string Senha { get; set; }
    }
}
