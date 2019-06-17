// @ts-nocheck
const express = require('express');
const multer = require('multer');
const uploadConfig= require('../config/upload');

const PostController = require('../controllers/postController');
const LikeController = require('../controllers/likeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;