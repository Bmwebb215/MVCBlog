const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts and render a view
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        const posts = postData.map(post => post.get({ plain: true }));
        
        // Render a view named 'all-posts' and pass posts data to it
        //res.render('post', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.toString());
    }
});

// Get a single post by id and render a view
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [User],
        });

        if (!postData) {
            res.status(404).send('No post found with this id');
            return;
        }

        const post = postData.get({ plain: true });

        // Render a view named 'single-post' and pass the post data to it
        res.render('post', { post,
        logged_in: req.session.logged_in});
    } catch (err) {
        console.error(err);
        res.status(500).send(err.toString());
    }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: { id: req.params.id, userId: req.session.userId },
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: 'Post updated' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
      // Include userId from session in the new post
      const newPost = await Post.create({
          ...req.body,
          userId: req.session.user_id, // Assuming the session stores userId
      });
      
      res.redirect('/'); // Redirect to the home page or to a specific page
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

// The create, update, delete operations typically do not render a view directly
// They might redirect to a page or perform another action upon completion

module.exports = router;
