let express = require('express');
let router = express.Router();
/*accedo al modelo de la db*/
let models = require('../models/index');

/*peticion tipo get*/
router.get('/listaSemilleros',(req,res)=>{
  models.Semilleros.findAll().then(
    (lista)=>{
      res.json(lista);
    }
  ).catch(
    (error)=>{
      res.json(error);
    }
  );
});

router.get('/buscarSemillero/:id',(req,res)=>{
  let idSemillero = req.params.id;
  models.Semilleros.find({where:{'idSemillero':idSemillero}}).then(
    (semillero)=>{
      res.json(semillero);
    }
  ).catch(
    (error)=>{
      res.json(error);
    }
  );
});

router.get('/eliminarSemillero/:id',(req,res)=>{
  let idSemillero = req.params.id;
  models.Semilleros.find({where:{'idSemillero':idSemillero}}).then(
    (semillero)=>{
      semillero.destroy().then(res.json({"msg":"se eliminó"}));
    }
  ).catch(
    (error)=>{
      res.json(error);
    }
  );
});

/*peticion tipo post*/
router.post('/crearSemillero',(req, res)=>{
  let infoSemillero = {
    "nombreSemillero": req.body.nombreSemillero,
    "descripcionSemillero": req.body.descripcionSemillero,
    "liderSemillero": req.body.liderSemillero
  };

  models.Semilleros.create(infoSemillero).then(
    (nuevoSemillero, infoCreacion)=>{
      res.json(nuevoSemillero);
    }
  ).catch(
    (error)=>{
      res.json(error);
    }
  );
});

router.post('/modificarSemillero',(req, res)=>{
  let idSemillero = req.body.idSemillero;
  let infoSemillero = {
    "nombreSemillero": req.body.nombreSemillero,
    "descripcionSemillero": req.body.descripcionSemillero,
    "liderSemillero": req.body.liderSemillero
  };

  models.Semilleros.find({where:{'idSemillero':idSemillero}}).then(
    (semillero)=>{
      semillero.updateAttributes(infoSemillero).then(
        res.json(semillero));
    }
  ).catch(
    (error)=>{
      res.json(error);
    }
  );
});


module.exports = router;
