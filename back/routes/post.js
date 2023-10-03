const express = require('express');
const router = express.Router();
const { Post, Image, Comment , User} = require('../models');
const { isLoggedIn } = require('./middlewares');

// 게시글 등록
router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        // 추가
        const post = await Post.create({
            content : req.body.content,
            UserId : req.user.id,
        })

        // Join
        const fullPost = await Post.findOne({
            where : { id : post.id },
            include : [{
                model : Image,
            }, {
                model : Comment,
            }, {
                model : User,
            }]
        })
        return res.status(201).json(fullPost);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 등록
router.post('/:postId/comment', isLoggedIn,  async (req, res, next) => {
    try {
        const exPost = await Post.findOne({
            where : { id : req.params.postsId }
        })

        if( !exPost ) {
            return res.status(403).json('해당 게시글이 존재하지 않습니다.');
        }

        const comment = await Comment.create({
            content : req.body.content,
            PostId : req.params.postId,
            UserId : req.user.id,
        })
        return res.status(201).json(comment);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/', (req,res) => {
    res.json({ id : 1, content : 'hello'})
});

router.delete('/', (req,res) => {
    res.json({ id : 1})
});

module.exports = router;