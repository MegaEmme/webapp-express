const mysql = require('mysql2');
//recupero credenziali accesso database dal file .env (escluso da .gitignore) per motivi di sicurezza 
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});
//mi connetto al database
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL server connected');
});

module.exports = connection;