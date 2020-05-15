module.exports = function(sequelize, DataTypes) {
  const Location = sequelize.define("Location", {
    // Major Cross-streets
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    }
  });

  Location.associate = function(models) {
    Location.belongsToMany(models.Pet, {
      // Might need to change this
      through: "PetLocations"
    });
  };

  return Location;
};
