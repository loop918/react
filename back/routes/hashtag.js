const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // 시퀄라이즈 operator
const { User, Post, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } =  require('./middlewares');

router.get('/:hashtag', async(req, res, next) => { // GET /hashtag/노드
    try {
        const where = {};
        if(parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때.
            where.id = { [Op.lt] : parseInt(req.query.lastId, 10) } // 조건 →  id가 lastId 보다 10 작은 것들! (현재, 내림차순 기준임 - 최신순)
        } 

        const posts = await Post.findAll({
            limit : 10, // 가져올 갯수
            where,
            order : [['createdAt', 'DESC']],
            include : [{
                model : Hashtag,
                where : { name : decodeURIComponent(req.params.hashtag) },
            }, {
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

        return res.status(200).json(posts);
        
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;

