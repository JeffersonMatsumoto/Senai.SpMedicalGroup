use spmedgroup

select * from ENDERECOS

select * from TIPO_USUARIOS

SELECT * FROM USUARIOS

select * from situacao

/*
insert into ENDERECOS
values('Rua dos Timbiras, 430 - Campos Elíseos','SP','01208000')
*/

--C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\Backup\

select * from CONSULTAS

select * from TIPO_USUARIOS

select medicos.NOME_MEDICO,  CONSULTAS.DATA_CONSULTA, CONSULTAS.DESCRICAO, CONSULTAS.ID_SITUACAO
from medicos inner join consultas
ON
medicos.id = CONSULTAS.ID_MEDICO where NOME_MEDICO = 'Helena Strada'