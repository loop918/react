module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { // MySQL 에는 posts 테이블 생성.
        // id가 기본적으로  들어있다.
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        }, 
        // RetweetId
    },{
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci', // 이모티콘 저장.
    });

    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // 게시글은 작성자에 속해있다.  // post.addUser, post.getUser, post.setUser
        db.Post.belongsToMany(db.Hashtag, { through : 'PostHashtag'}); // 다대다 관계  // post.addHashtags, post.getHashtags, post.setHashtags
        db.Post.hasMany(db.Comment);  //post.addComment , post.getComments , post.setComments
        db.Post.hasMany(db.Image); // post.addImages, post.getImages, post.setImages
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });  // 좋아요.  → UserId, PostId  // post.addLikers, postRemoveLikers
        db.Post.belongsTo(db.Post, { as : 'Retweet'}); // RetweetId → 일대다 관계    // post.addRetweet
    };
    return Post;
}