module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        }, 
        UserId: {
            allowNull: false,
            unique: true,
            type: DataTypes.INTEGER,
        },
        PhotoId: {
            allowNull: false,
            unique: true,
            type: DataTypes.INTEGER,
        }, 
        comment: {
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Comment tidak boleh kosong",
                }
            },
            type: DataTypes.TEXT,
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
        tableName: 'Comments',
    })

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {foreignKey: "UserId"})
        Comment.belongsTo(models.Photo, {foreignKey: "PhotoId"})
    }

    return Comment
}