--OS PROCEDURE TEM DE SER A PRIMEIRA INSTRUÇÃO NO LOTE POR ISSO DEIXEI COMENTADO A LINHA ABAIXO 
--USE SPMEDGROUP

--https://www.dirceuresende.com/blog/validando-cpf-cnpj-e-mail-telefone-e-cep-no-sql-server/

--CRIANDO PROC

--QUANTIDADE DE MEDICOS POR ESPECIALIDADE
CREATE PROCEDURE QuantidadeMedicos
@especialidade int
AS
BEGIN

SELECT COUNT(ID_ESPECIALIDADE) AS QUANTIDADE_POR_ESPECIALIDADE
FROM MEDICOS WHERE ID_ESPECIALIDADE = @especialidade;

END
go

exec QuantidadeMedicos 17
go

--CALCULAR IDADE
CREATE PROCEDURE CalcularIdade
AS
BEGIN

SELECT DATEDIFF(DAY,DATA_NASCIMENTO,GETDATE()) / 365 AS IDADE FROM PRONTUARIOS 

END

EXEC Calcularidade

--VALIDAR E-MAIL e Senha
create PROCEDURE ValidarEmailSenha
@email varchar(250)
,@senha varchar(250)
as
begin
if (@email IS NULL 
   OR @email NOT LIKE '[0-9a-zA-Z]%@__%.__%' 
   OR @email LIKE '%@%@%' 
   OR @email LIKE '%..%' 
   OR @email LIKE '%.@' 
   OR @email LIKE '%@.' 
   OR @email LIKE '%@%.-%' 
   OR @email LIKE '%@%-.%' 
   OR @email LIKE '%@-%')
   AND @senha < 6
print('E-mail ou senha inválido')
else
insert into USUARIOS(EMAIL,SENHA) 
values(@email,@senha)
end

exec ValidarEmailSenha 'teste@hotmail.com', '123456'
exec ValidarEmailSenha 'TESTE@gmail.com', '654321'
go

--delete from usuarios where id in(12, 14)

--validar só um campo sem precisar de outro
--VALIDAR CPF
create PROCEDURE ValidarCpf
@cpf char(11)
as
begin
if(len(@cpf) = 11 and @cpf is not null and @cpf != '')
	begin
		insert into prontuarios (cpf) values(@cpf);
		print('Cpf válido e inserido')
	end
else
	begin
		print('Cpf inválido')
	end
end
go

exec ValidarCpf '12345678910'
go

CREATE PROCEDURE ValidarProntuario
@nome varchar(250), @cpf char(11), @rg char(9), @data_nasc date
AS
BEGIN
	IF(@nome is not null and @nome != '') and
	(len(@cpf) = 11 and @cpf is not null and @cpf != '') and
	(len(@rg) = 9 and @rg is not null and @rg != '') and
	(@data_nasc is not null and @data_nasc != '')
	begin
		insert into prontuarios (NOME_PACIENTE,CPF,RG,DATA_NASCIMENTO) values(@nome,@cpf,@rg,@data_nasc);
		print('O prontuário foi cadastrado')
	end
	ELSE
		begin
			print('Prontuário inválido')
		end
END
GO

SELECT * FROM PRONTUARIOS

--DELETE FROM PRONTUARIOS WHERE ID = 12

exec ValidarProntuario 'Jeff', '12345678910', '123456789', '11/11/1111' 

--ANTIGAS PROCEDURES
/*
CREATE PROCEDURE ValidarData
@DataNasc date
AS
BEGIN
@DataNasc(Convert(varchar(10),getdate(@DataNasc),103))
INSERT INTO PRONTUARIOS (DATA_NASCIMENTO) VALUES(@DataNasc)  
SELECT NOME_PACIENTE, DATA_NASCIMENTO FROM PRONTUARIOS WHERE DATA_NASCIMENTO = @DataNasc
END
GO

CREATE PROCEDURE ValidarCpf 
@CpfRecebido char(11)
AS
	If (@CpfRecebido is null or @CpfRecebido = '' or LEN(@CpfRecebido) != 11)
BEGIN
    raiserror('@CpfRecebido não pode ser nulo, igual a zero ou ter menos de 11 caracteres'  18, 0)
	else
	INSERT INTO PRONTUARIOS (CPF) VALUES(@CpfRecebido)  
	SELECT NOME, CPF FROM PRONTUARIOS 
	WHERE 
	CPF = @CpfRecebido
END
GO
*/

--INSERINDO VALORES

INSERT INTO SITUACAO(TIPO)
VALUES('Agendado'),('Cancelado'),('Realizado')

INSERT INTO TIPO_USUARIOS(TIPO)
VALUES('Administrador'),('Médico'),('Paciente')

INSERT INTO ESPECIALIDADES(NOME_ESPECIALIDADE)
VALUES('Acupuntura'),('Anestesiologia'),('Angiologia'),('Cardiologia'),('Cirurgia Cardiovascular'),('Cirurgia da Mão')
,('Cirurgia do Aparelho Digestivo'),('Cirurgia Geral'),('Cirurgia Pediátrica'),('Cirurgia Plástica'),('Cirurgia Torácica'),('Cirurgia Vascular')
,('Dermatologia'),('Radioterapia'),('Urologia'),('Pediatria'),('Psiquiatria')

INSERT INTO ENDERECOS
VALUES('Alameda Barão de Limeira, 532', 'SP', '01202001'),('Rua Estado de Israel, 240', 'SP' , '04022000')
,('Av. Paulista, 1578 - Bela Vista', 'SP', '01310200'),('Av. Ibirapuera - Indianópolis, 2927', 'SP', '04029200')
,('R. Vitória, 120 - Vila Sao Jorge', 'SP', '06402030'),('R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires', 'SP', '09405380')
,('Alameda dos Arapanés, 945 - Indianópolis', 'SP', '04524001'),('R Santo Antonio, 232 - Vila Universal, Barueri', 'SP', '06407140')

INSERT INTO USUARIOS
VALUES('ligia@gmail.com','123456',3)
	,('alexandre@gmail.com','123456',3)
	,('fernando@gmail.com','123456',3)
	,('henrique@gmail.com','123456',3)
	,('joao@hotmail.com','123456',3)
	,('bruno@gmail.com','123456',3)
	,('mariana@outlook.com','123456',3)
	,('ricardo.lemos@spmedicalgroup.com.br','654321',2)
	,('roberto.possarle@spmedicalgroup.com.br','654321',2)
	,('helena.strada@spmedicalgroup.com.br','654321',2)	

INSERT INTO CLINICAS
VALUES('SP Medical Group','Clinica Possarle','86400902000130','Horário comercial, das 9 às 18 horas',1)

/*
INSERT INTO MEDICOS
VALUES('a','12345',1,2,11)
insert into usuarios
values('a@gmail.com','123456',2)
*/

INSERT INTO MEDICOS
VALUES('Ricardo Lemos','54356',1,2,8)
	,('Roberto Possarle','53452',1,17,9)
	,('Helena Strada','65463',1,16,10)

--DELETE FROM USUARIOS WHERE ID = 11
--DELETE FROM MEDICOS WHERE ID = 5
--select * from USUARIOS
--select * from MEDICOS
--select * from prontuarios

INSERT INTO PRONTUARIOS --(yyyy-mm-dd)
VALUES('Ligia','94839859000','381336694','13/10/1983','11 3456-7654',2,1)
	,('Alexandre','73556944057','195545412','23/07/2001','11 98765-6543',3,2)
	,('Fernando','16839338002','345157679','10/10/1978','11 97208-4453',4,3)
	,('Henrique','14332654765','392696204','13/10/1985','11 3456-6543',5,4)
	,('João','91305348010','485339857','27/08/1975','11 7656-6377',6,5)
	,('Bruno','79799299004','210386988','21/03/1972','11 95436-8769',7,6)
	,('Mariana','13771913039','449188899','05/03/2018','',8,7) --PODE DEIXAR VAZIO? OU CRIA TABELA TELEFONES?

INSERT INTO CONSULTAS
VALUES('Crise de Bronquite','20/01/2019 15:00',3,7,3) -- CONSULTA  1 P/ 1  SITUAÇÃO ? OU N CONSULTA PARA 1 SITUAÇÃO?
	,('Distúrbio Mental','06/01/2018 10:00',2,2,2)
	,('Esquizofrenia','07/02/2019 11:00',2,3,3)
	,('Depressão','06/02/2018 10:00',2,2,3)
	,('Cirurgia no coração','07/02/2019 11:00',1,4,2)
	,('Febre','08/02/2019 15:00',3,7,1)
	,('Cirurgia de Hérnia de Disco','09/02/2019 11:00',1,4,1)
