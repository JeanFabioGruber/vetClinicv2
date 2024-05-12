const express = require("express");
const router = express.Router();
const Pet = require(process.env.routesPetTOModels);
const { where } = require("sequelize");

// Rota Post:

router.post(process.env.rotaPostPet, (req, res) => {
  const tutorId = req.params.id;
  let { name, species, carry, weight, dateOfBirth } = req.body;

  Pet.findOne({ where: { name, species, carry, weight, dateOfBirth } }).then(
    (petJaExiste) => {
      if (petJaExiste) {
        console.log("Esse Pet já foi cadastrado!");
        res.json({ message: "Esse Pet já foi cadastrado!" });
      } else {
        Pet.create({
          name,
          species,
          carry,
          weight,
          dateOfBirth,
          tutorId,
        })
          .then(() =>
            res.json({ message: "O pet foi cadatrado com sucesso!!" })
          )
          .catch((err) => console.log(err));
      }
    }
  );
});

// Rota Put:

router.put(process.env.rotaPutPet, (req, res) => {
  const petId = req.params.petId;
  const tutorId = req.params.tutorId;
  let { name, species, carry, weight, dateOfBirth } = req.body;
  Pet.update(
    { name, species, carry, weight, dateOfBirth },
    { where: { id: petId, tutorId: tutorId } }
  )
    .then((result) => {
      if (result[0] === 0) {
        res.json({ message: "Pet não encontrado para esse tutor." });
      } else {
        res.json({ message: "Pet atualizado com sucesso!" });
      }
    })
    .catch((err) => {
      console.error("Erro ao atualizar Pet:", err);
      res.json({ message: "Erro ao atualizar Pet." });
    });
});

// Rota delete

router.delete(process.env.rotaDeletePet, (req, res) => {
  const petId = req.params.petId;
  const tutorId = req.params.tutorId;

  Pet.destroy({
    where: { id: petId, tutorId: tutorId },
  })
    .then((deletedCount) => {
      if (deletedCount === 0) {
        res.json({ message: "Pet não encontrado para esse tutor." });
      } else {
        res.json({ message: "Pet excluído com sucesso!" });
      }
    })
    .catch((err) => {
      console.error("Erro ao excluir Pet:", err);
      res.json({ message: "Erro ao excluir Pet." });
    });
});

module.exports = router;
