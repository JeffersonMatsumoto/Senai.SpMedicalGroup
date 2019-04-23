using System.ComponentModel.DataAnnotations;

namespace Senai.SpMedicalGroup.WebApi.ViewModel
{
    public class LoginViewModel
    {
        //[RegularExpression(".+\\@.+\\..+", ErrorMessage = "Informe um email válido...")]
        [Required(ErrorMessage = "Informe o email")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Informe um email válido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe a senha")]
        public string Senha { get; set; }
    }
}

//editor PANDAO EDITOR MD