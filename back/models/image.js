const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    }, {
      modelName: 'Image',
      tableName: 'images',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize,
    });
  }
  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
};

/*
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { // MySQL 에는 Images 테이블 생성.
        // id가 기본적으로  들어있다.
        src : {
            type : DataTypes.STRING(200),
            allowNull : false,            
        },
    },{
        charset : 'utf8',
        collate : 'utf8_general_ci', // 이모티콘 저장.
    });
    
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
}
*/