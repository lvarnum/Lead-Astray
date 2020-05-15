module.exports = function(sequelize, DataTypes) {
  const Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    age: {
      type: DataTypes.INTEGER,
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
        // Might need to be longer or might not need
        len: [1, 500]
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
    }
  });

  Pet.associate = function(models) {
    Pet.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
    Pet.hasOne(models.Location, {});
  };

  return Pet;
};
