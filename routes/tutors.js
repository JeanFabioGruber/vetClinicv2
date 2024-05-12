const express = require("express");
const { where } = require("sequelize");
const router = express.Router();
const Tutor = require(process.env.routesTutorToModels);
const Pet = require(process.env.routesPetToModels);

// add tutor via post
router.post(process.env.rotaPostTutor, (req, res) => {
  let { name, phone, email, dateOfBirth, zipCode } = req.body;

  Tutor.findOne({ where: { name, phone, email, dateOfBirth, zipCode } }).then(
    (tutorJaExistente) => {
      if (tutorJaExistente) {
        console.log("Esse Tutor já foi cadastrado!");
        res.json({ message: "Esse Tutor já foi cadastrado!" });
      } else {
        Tutor.create({
          name,
          phone,
          email,
          dateOfBirth,
          zipCode,
        })
          .then(() => res.json({ message: "Tutor Adicionado com sucesso" }))
          .catch((err) => console.log(err));
      }
    }
  );
});

//get
router.get(process.env.rotaGetTutor, (req, res) => {
  Tutor.findAll()
    .then((tutors) => {
      const tutoreSeusPets = [];
      Promise.all(
        tutors.map((tutor) => {
          return Pet.findAll({ where: { tutorId: tutor.id } }).then((pets) => {
            const tutorWithPets = {
              id: tutor.id,
              name: tutor.name,
              phone: tutor.phone,
              email: tutor.email,
              dateOfBirth: tutor.dateOfBirth,
              zipCode: tutor.zipCode,
              createdAt: tutor.createdAt,
              updatedAt: tutor.updatedAt,
              pets: pets,
            };
            tutoreSeusPets.push(tutorWithPets);
          });
        })
      )
        .then(() => {
          res.json(tutoreSeusPets);
        })
        .catch((err) => {
          console.error("Erro ao buscar tutores ou pets:", err);
          res.json({ message: "Erro " });
        });
    })
    .catch((err) => {
      console.error("Erro ao obter tutores:", err);
      res.json({ message: "Erro" });
    });
});

//put

router.put(process.env.rotaPutTutor, (req, res) => {
  const tutorId = req.params.id;
  const { name, phone, email, dateOfBirth, zipCode } = req.body;
  Tutor.update(
    { name, phone, email, dateOfBirth, zipCode },
    { where: { id: tutorId } }
  )
    .then((result) => {
      if (result[0] === 0) {
        console.log("Tutor não encontrado");
      } else {
        res.json({ message: "Tutor atualizado com sucesso" });
        console.log("Tutor atualizado com sucesso");
      }
    })
    .catch((err) => {
      console.log("Erro ao atualizar tutor:", err);
    });
});

//delete

router.delete(process.env.rotaDeleteTutor, (req, res) => {
  const tutorId = req.params.id;
  Pet.destroy({
    where: { tutorId: tutorId },
  })
    .then(() => {
      return Tutor.destroy({
        where: { id: tutorId },
      });
    })
    .then((deletedCount) => {
      if (deletedCount === 0) {
        res.json({ message: "Tutor não encontrado" });
      } else {
        res.json({ message: "Tutor e seus pets excluídos com sucesso" });
      }
    })
    .catch((error) => {
      console.error("Erro ao excluir tutor e seus pets:", error);
      res.json({ message: "Erro ao excluir tutor e seus pets" });
    });
});

module.exports = router;
