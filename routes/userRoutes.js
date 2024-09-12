const express = require('express');
const router = express.Router();
const { getUsers, blockUsers, unblockUsers, deleteUsers, deleteUserAsUser, selfBlock} = require('../controllers/userController');

router.get('/',  getUsers);
router.put('/block', blockUsers);
router.put('/unblock', unblockUsers);
router.put('/selfBlock', selfBlock);
router.delete('/delete', deleteUsers);
router.delete('/deleteSelf', deleteUserAsUser);


module.exports = router;
