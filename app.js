const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//registro asset statici
app.use(express.static('public'));
//registro il body parser
app.use(express.json());

app.listen(port, () => {
    console.log(`sono un server attivo sulla porta ${port}`)
});