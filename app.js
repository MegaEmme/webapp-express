//collego express
const express = require('express');
const app = express();
//definisco la porta
const port = process.env.PORT || 3000;
//importo middleware cors
const cors = require('cors');
//importo il router
const moviesRouter = require('./routers/moviesRouter');
//importo middleware errorsHandler
const errorsHandler = require('./middlewares/errorsHandler');
//importo middleware notFound
const notFound = require('./middlewares/notFound');
//importo middleware cors
app.use(cors({
    origin: process.env.FE_APP
}));
//registro middleware asset statici
app.use(express.static('public'));
//registro middleware body parser
app.use(express.json());
//welcome page
app.get('/', (req,res) => {
    res.send('Benvenuto nella web application')
});
//registro la path del router
app.use('/api/movies', moviesRouter);
//registro middleware errorsHandler
app.use(errorsHandler);
//registro middleware notFound
app.use(notFound);
//attivo il server sulla porta
app.listen(port, () => {
    console.log(`sono un server attivo sulla porta ${port}`)
});
