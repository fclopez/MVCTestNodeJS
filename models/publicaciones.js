let Publicacion = (sequelize, Sequelize)=>{
  let modelo = sequelize.define(
    "Publicaciones",
    {
      "idPublicacion":{
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      "fechaPublicacion":{
        notEmpty: true,
        type: Sequelize.STRING
      },
      "tituloPublicacion":{
        notEmpty: true,
        type: Sequelize.STRING
      },
      "imagenPublicacion":{
        notEmpty: true,
        type: Sequelize.STRING
      },
      "textoPublicacion":{
        notEmpty: true,
        type: Sequelize.STRING
      },
      "idSemillero":{
        type: Sequelize.INTEGER,
        references:{
          model: "Semilleros",
          key: "idSemillero",
          deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    {
      timestamps:false,
      freezeTableName:true
    }
  );
  return modelo;
};

module.exports = Publicacion;
