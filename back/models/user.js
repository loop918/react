module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySQL 에는 users 테이블 생성.
        // id가 기본적으로  들어있다.
        email : {
            type : DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEAGER, FLOAT, DATETIME
            allowNull : false, // 필수
            unique : true, // 고유한 값
        },
        nickname : {
            type : DataTypes.STRING(30),
            allowNull : false, // 필수
        },
        password : {
            type : DataTypes.STRING(100),
            allowNull : false, // 필수
        },
    },{
        charset :  'utf8',
        collate : 'utf8_general_ci', // 한글 저장.
    });
    
    User.associate = (db) => {
        db.User.hasMany(db.Post); // 사람이 Post 를 여러개 갖고 있다.
        db.User.hasMany(db.Comment);

        // through : 테이블 이름 변경, foreignKey : 컬럼 이름 변경
        db.User.belongsToMany(db.Post, { through : 'Like', as : 'Liked' }); // 좋아요. → UserId, PostId
        db.User.belongsToMany(db.User, { through : 'Follow', as : 'Followers'  ,foreignKey : 'FollowingId' }); // 팔로윙
        db.User.belongsToMany(db.User, { through : 'Follow', as : 'Followings' ,foreignKey : 'FollowerId'  }); // 팔로워
    };
    return User;
}