const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // UserId: 1
      // PostId: 3
    }, {
      modelName: 'Comment',
      tableName: 'comments',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 이모티콘 저장
      sequelize,
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};

/*
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { // MySQL 에는 comments 테이블 생성.
        // id가 기본적으로  들어있다.
        content : {
            type : DataTypes.TEXT,
            allowNull : false,            
        },
        // userId : {},  →  db.Comment.belongsTo(db.User)
        // postId : {},  →  db.Comment.belongsTo(db.Post)
    },{
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci', // 이모티콘 저장.
    });
    
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User); // 댓글은 작성자에 속해 있다.
        db.Comment.belongsTo(db.Post); // 댓글은 게시글에 속해 있다.
    };
    return Comment;
}
*/