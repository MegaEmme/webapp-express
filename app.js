//collego express
const express = require('express');
const app = express();
//definisco la porta
const port = process.env.PORT || 3000;
//importo il router
const moviesRouter = require('./routers/moviesRouter');
//importo middleware errorsHandler
const errorsHandler = require('./middlewares/errorsHandler');
//importo middleware notFound
const notFound = require('./middlewares/notFound');
//registro asset statici
app.use(express.static('public'));
//registro il body parser
app.use(express.json());
//registro la path del router
app.use('/movies', moviesRouter);
//registro middleware errorsHandler
app.use(errorsHandler);
//registro middleware notFound
app.use(notFound);
//attivo il server sulla porta
app.listen(port, () => {
    console.log(`sono un server attivo sulla porta ${port}`)
});
