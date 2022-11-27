const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    
    id : {
      type : DataTypes.UUID,
      allowNull : false,
      primaryKey : true,
      defaultValue : DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false
    },
    release_date : {
      type : DataTypes.STRING
    },
    rating  : {
      type : DataTypes.FLOAT
    },
    platforms : {
      type : DataTypes.ARRAY(DataTypes.STRING),
      allowNull : false
    },
    image : {
      type : DataTypes.STRING,
      defaultValue : "https://media.istockphoto.com/vectors/photographs-pictures-icon-on-white-background-vector-id527820617?k=20&m=527820617&s=612x612&w=0&h=yUbIwUYHPeiYbcg6hYeWY-ci6QMkxCyxgei4fHYUtUA="
    }

  });
};
