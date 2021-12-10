module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    "Photo",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        validate: {
          notNull: {
            msg: "Judul tidak boleh kosong",
          },
        },
        type: DataTypes.STRING,
      },
      caption: {
        allowNull: false,
        validate: {
          notNull: {
            msg: "Caption tidak boleh kosong",
          },
        },
        type: DataTypes.TEXT,
      },
      poster_image_url: {
        allowNull: false,
        validate: {
          notNull: {
            msg: "Poster_image_url tidak boleh kosong",
          },
          isUrl: {
            msg: "Poster_image_url tidak valid",
          },
        },
        type: DataTypes.TEXT,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "Photos",
    }
  );

  Photo.associate = (models) => {
    Photo.belongsTo(models.User, { foreignKey: "UserId" });
    Photo.hasMany(models.Comment, { foreignKey: "PhotoId" });
  };

  return Photo;
};
