const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', 
  {
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      allowNull: false,
    },
  },



  {//SE PUEDE SACAR O VOLVER A PONER ESTOS ATRIBUTOS QUE VIENEN POR DEFECTO
    createdAt: false,
    updatedAt: false,
  });
};
