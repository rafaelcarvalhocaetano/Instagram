// @ts-nocheck
const Like = require('../models/post');

module.exports = {
  async store(req, res) {
    const like = await Like.findById(req.params.id);
    like.likes += 1;
    await like.save();
    req.io.emit('like', like);
    return res.json(like);
  }
}