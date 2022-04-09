const express = require('express');
const router = express.Router();
const multer = require('multer');

const PostController = require('../../controllers/api/Post');

//multer

//var upload = multer({ dest: 'uploads/'})

//RUTAS 

router.post('/',/*upload.single('image'),*/ PostController.create);

router.get('/id/:_id', PostController.findOneByID);

router.get('/all', PostController.findAll);

router.get('/user', PostController.findByUser);

router.patch('/like', PostController.addLike);

router.put('/update/:_id', PostController.updatePost);

router.delete('/delete/:_id', PostController.deleteOneByID);

module.exports = router;
