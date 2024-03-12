const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });
    // Convert the Sequelize model instances into plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render a Handlebars view named 'homepage' and pass the posts data to it
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) { 
    res.status(500).json(err);
  }
});

module.exports = router;
