const Like = require('../models/post');

module.exports = {
  async store(req, res) {
    const post = await Like.findById(req.params.id);
    post['likes'] += 1;
    await post.save();
    req.io.emit('like', post);
    return res.json(post);
  }
}