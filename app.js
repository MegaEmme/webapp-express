const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const moviesRouter = require('./routers/moviesRouter');

//registro asset statici
app.use(express.static('public'));
//registro il body parser
app.use(express.json());
//registro la path del router
app.use('/movies', moviesRouter);
//attivo il server sulla porta
app.listen(port, () => {
    console.log(`sono un server attivo sulla porta ${port}`)
});
