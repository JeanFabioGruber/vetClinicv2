# VetClinic API

A VetClinic é uma API RESTful para gerenciamento de tutores e seus respectivos pets;
Este projeto faz parte do priemeiro desafio do curso de NODE.JS + AWS oferecido pela Compassuol

## Descricao

Está API realiza o CRUD de tutores e seus respectivos Pets atendo alguns requisitos como um tutor pode ter vários pets, mas um pet pode ter apenas um tutor

## Instrução de instalação

```bash
npm install express express-handlebars body-parser dotenv sequelize sqlite3
```

## Instrução de uso

1.execute o npm install com todas as dependencias nescessarias
2.insira os dados do .env

```bash
porta = 3000
localBancodeDados = ./db/connection
rotaParaTutorsRoutes = ./routes/tutors
rotaParaPetsRoutes = ./routes/pets

modeloPetAndTurotssDb = ../db/connection

routesPetToModels = ../models/Pet
rotaPostPet = /pet/:id
rotaPutPet = /pet/:petId/tutor/:tutorId
rotaDeletePet = /pet/:petId/tutor/:tutorId

routesTutorToModels = ../models/Tutor

rotaPostTutor = /tutor
rotaGetTutor = /tutors
rotaPutTutor = /tutor/:id
rotaDeleteTutor = /tutor/:id

storegeA = ./db/app.db
```

3. rode o app.js
