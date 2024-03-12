const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comments for a specific post and render a view
router.get('/for-post/:postId', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: { postId: req.params.postId },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Post,
                }
            ],
        });
        const comments = commentData.map(comment => comment.get({ plain: true }));

        // Assuming you have a view that lists comments for a post
        res.render('comments-for-post', { comments, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.toString());
    }
});

// Add a new comment to a post
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId, // Ensure the user is logged in
        });

        // Redirect back to the post or the page where the comment was added
        res.redirect(`/posts/${req.body.postId}`);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.toString());
    }
});

module.exports = router;
