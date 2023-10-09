const express = require('express');
const {Post, Image, User, Comment} = require('../models');

const router = express.Router();

router.get('/', async(req,res,next) => { // GET /posts
    try {
        const posts = await Post.findAll({
            limit : 10, // 가져올 갯수
            order : [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include : [{
                model : User, // 게시글 작성자
                attributes : ['id', 'nickname'],
            }, {
                model : Image,
            }, {
                model : Comment,
                include : [{
                    model : User, // 댓글 작성자
                    attributes : ['id', 'nickname'],
                }]
            }, {
                model : User, // 좋아요 누른사람
                as : 'Likers',
                attributes : ['id'],
            }, {
                model : Post,
                as : 'Retweet',
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                },{
                    model : Image,
                }]
            }],
        })
        console.log(posts);
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
