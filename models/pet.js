module.exports = function(sequelize, DataTypes) {
  const Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        isInt: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1]
      }
    },
    microchip: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    //picture url will be stored as a string
    picture: {
      type: DataTypes.STRING
    },
    reward: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    petType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Pet.associate = function(models) {
    Pet.hasOne(models.Post, {
      onDelete: "cascade"
    });
    Pet.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pet;
};
