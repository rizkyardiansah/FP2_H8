module.exports = (sequelize, DataTypes) => {
  const SocialMedia = sequelize.define('SocialMedia', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Nama tidak boleh kosong'
          }
        }
      },
      social_media_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Social_media_url tidak boleh kosong'
          },
          isUrl: {
            msg: "Social_media_url tidak valid",
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  },{
    tableName: 'Social_Media'
  })

  SocialMedia.associate = models => {
    SocialMedia.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  }

  return SocialMedia;
}