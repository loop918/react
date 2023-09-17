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
        db.Post.belongsTo(db.User); // 게시글은 작성자에 속해있다. 
        db.Post.belongsToMany(db.Hashtag, { through : 'PostHashtag'}); // 다대다 관계
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);

        db.User.belongsToMany(db.Post ,{ through : 'Like', as : 'Likers' });  // 좋아요.  → UserId, PostId

        db.Post.belongsTo(db.Post, { as : 'Retweet'}); // RetweetId → 일대다 관계
    };
    return Post;
}