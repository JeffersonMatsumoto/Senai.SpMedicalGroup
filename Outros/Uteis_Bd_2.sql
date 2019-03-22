use spmedgroup

select * from usuarios
select * from MEDICOS
select * from PRONTUARIOS
select * from consultas

select * from medicos m inner join consultas c on m.id = c.id_medico where m.id = 3;

/*
deu certo pq id coincide

-id paciente														-id usuario
1	Ligia	94839859000	381336694	1983-10-13	11 3456-7654 	2	1

ñ vai dar certo
-id paciente														-id usuario
23	Fábio	12332112345	123321123	2000-11-01	11 3212-0931 	9	13

o id de médico mesma coisa
*/