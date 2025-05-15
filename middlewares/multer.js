//importo multer per upload file da pc e slugify per rendere i titoli minuscoli e kebab-case
const multer = require('multer');
const slugify = require('slugify');
//dove salvare il file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/movies_cover')
  },
  //costruiamo il nome del file che vogliamo creare
  filename: function (req, file, cb) {
    //non deve essere doppione ne creo una copia unica
    const slugifiedName = slugify(file.originalname, {
      lower: true,
      trim: true
    });
//concateno dunque     la data attuale     con un numero casuale      con il nome slugificato
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${slugifiedName}`
    cb(null, uniqueName);
  }
})

const upload = multer({ storage });

module.exports= upload;

