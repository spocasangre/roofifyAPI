const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/api/User');

//to do;  si se cambia la contra el token antigua sigue siendo valido
router.get('/', UserController.getUser);

router.get('/profile/:_id', UserController.getProfile);

router.put('/', UserController.updateByID);

router.patch('/savePost/:postID', UserController.savePost);

module.exports = router;
