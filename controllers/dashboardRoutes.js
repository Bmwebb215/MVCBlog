const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      where: {
        id: req.session.id
      },
      include: [User],
    });
    const posts = userPostData.map((post) => post.get({ plain: true }));

    // Render a Handlebars view named 'dashboard' and pass the posts data to it
    res.render('dashboard', { 
      posts,
      logged_in: req.session.logged_in // Make sure you're setting this session variable correctly elsewhere
    });
  } catch (err) { 
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).send('Post not found');
      return;
    }

    const post = postData.get({ plain: true });
    res.render('edit-post', { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
