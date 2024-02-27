const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
        where: { postId: req.params.id },
        });
    
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
        where: {
            id: req.params.id,
            userId: req.session.userId,
        },
        });
    
        if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
        }
    
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

module.exports = router;