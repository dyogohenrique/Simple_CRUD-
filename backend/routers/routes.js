const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/criar', userController.createUser);
router.get('/:id', userController.getUserById);
router.patch('/atualizar/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
