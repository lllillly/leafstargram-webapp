const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TeamInfo extends Model {
  static init(sequelize) {
    return super.init(
      {
        // 컬럼들의 정의
        name: {
          type: DataTypes.STRING(60),
          allowNull: false,
          unique: true,
        },
        value: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
      },
      {
        // 컬럼들의 옵션
        modelName: "TeamInfo",
        tableName: "teaminfos",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }

  static associations(db) {
    // 사이의 관계
  }
};
