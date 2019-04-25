SELECT * FROM CLINICAS
SELECT * FROM ENDERECOS
SELECT * FROM ESPECIALIDADES
SELECT * FROM MEDICOS
SELECT * FROM CONSULTAS
SELECT * FROM PRONTUARIOS
SELECT * FROM SITUACAO
SELECT * FROM TIPO_USUARIOS
SELECT * FROM USUARIOS

--DELETE FROM CONSULTAS WHERE ID=9
--DELETE FROM PRONTUARIOS WHERE ID IN (29,30)
--DELETE FROM USUARIOS WHERE ID IN (14,15,16)


SELECT CONVERT(VARCHAR,DATA_NASCIMENTO,103) AS DATA_NASCIMENTO_FORMATADA FROM PRONTUARIOS

SELECT FORMAT(DATA_NASCIMENTO, 'dd/MM/yyyy') AS DATA_NASCIMENTO_FORMATADA FROM PRONTUARIOS

--Converteu a data de nascimento do usu�rio para o formato (mm-dd-yyyy) USA
SELECT CONVERT(VARCHAR,DATA_NASCIMENTO,110) AS DATA_NASCIMENTO_FORMATADA FROM PRONTUARIOS

--Mostrou a quantidade de usu�rios ap�s realizar a importa��o do banco de dados
SELECT COUNT (ID) as QUANTIDADE_DE_USUARIOS FROM USUARIOS

--Criou uma fun��o para retornar � quantidade de m�dicos de uma determinada especialidade
SELECT COUNT(MEDICOS.ID) as QNT_POR_ESPECIALIDADE, ESPECIALIDADES.NOME_ESPECIALIDADE --COLUNAS
FROM MEDICOS -- TABELA
INNER JOIN
ESPECIALIDADES -- TABELA PARA O JOIN
ON -- ONDE
ESPECIALIDADES.ID = MEDICOS.ID_ESPECIALIDADE -- RELA��O ENTRE TABELAS, ONDE SEJA IGUAL O ID DA ESPECIALIDADE E O ID DA ESPECIALIDADE DENTOR DA TABELA MEDICOS 
GROUP BY ID_ESPECIALIDADE, NOME_ESPECIALIDADE;

--CREATE FUNCTION QntPorEspecialidade
--begin


SELECT COUNT(MEDICOS.ID) as QNT_POR_ESPECIALIDADE, ESPECIALIDADES.NOME_ESPECIALIDADE --COLUNAS
FROM MEDICOS -- TABELA
INNER JOIN
ESPECIALIDADES -- TABELA PARA O JOIN
ON -- ONDE
ESPECIALIDADES.ID = MEDICOS.ID_ESPECIALIDADE -- RELA��O ENTRE TABELAS, ONDE SEJA IGUAL O ID DA ESPECIALIDADE E O ID DA ESPECIALIDADE DENTOR DA TABELA MEDICOS 
GROUP BY ID_ESPECIALIDADE, NOME_ESPECIALIDADE


CREATE VIEW vwUSUARIOS 
AS
SELECT ID AS C�digo,
       EMAIL AS 'E-mails'
FROM USUARIOS

SELECT * FROM vwUSUARIOS ORDER BY C�digo

																																																																																		