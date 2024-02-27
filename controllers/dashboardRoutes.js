const router = require('express').Router();
const { Post, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        const userPostData = await Post.findAll({
        where:{
            userId: req.session.userId},
        include: [User],
        });
        const posts = userPostData.map((post) => post.get({ plain: true }));
        res.status(200).json(posts);
    } catch (err) { 
        res.status(500).json(err);
    }
    });

    module.exports = router;