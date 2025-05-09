const connection = require('../data/db');
//index
function index (req,res) {
    console.log('index')
};
//show
function show (req,res) {
    console.log('show')
};

module.exports = {index, show};