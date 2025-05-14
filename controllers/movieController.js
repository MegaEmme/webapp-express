const connection = require('../data/db');
const { url } = require('inspector');
const slugify = require('slugify');
//operazioni CRUD
//index
function index (req,res) {
    const {search} = req.query;
    const preparedParams = [];
    let sql = `
    SELECT
        movies.*, ROUND(AVG(reviews.vote), 2) AS review_vote
    FROM
        movies
    LEFT JOIN
        reviews ON movies.id = reviews.movie_id
    `
    if(search) {
        sql += `
        WHERE 
            title
        LIKE
            ?
        OR
            director 
        LIKE
            ?
        OR
            genre
        LIKE
            ?
        OR
            abstract
        LIKE
            ?
        `
        preparedParams.push(`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`)
    }
    sql += `GROUP BY movies.id`

    connection.query(sql, preparedParams, (err, results) => {

        if (err) {
            return res.status(500).json({
                errorMessage: 'Database connection error'
            })
        }

        res.json(results.map(result => ({
            ...result,
            imagePath: process.env.PUBLIC_PATH + '/images/movies_cover/' + result.image
        })));
    })
};
//show
function show (req,res) {

    const {id} = req.params;
    //tiro fuori i dati del film
    const sql = `
                SELECT 
                    movies.*, ROUND(AVG(reviews.vote), 2) AS reviews_vote
                FROM
                    movies
                LEFT JOIN
                    reviews ON movies.id = reviews.movie_id
                WHERE
                    movie_id = ?
                `

    connection.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).json({
                errorMessage: err.sqlMessage
            })
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorMessage: 'No records found',
                id
            })
        }

        const currentMovie = results[0];

        const movie = {
            ...currentMovie,
            imagePath: process.env.PUBLIC_PATH + '/images/movies_cover/' + currentMovie.image
            }
        //trovato il film gli attacco le recensioni
        const sql = `SELECT 
                        *
                    FROM
                        reviews
                    WHERE
                        movie_id = ?
                    `

        connection.query(sql, [id], (err, results) => {
            if (err) {
                console.log(err);
            }            

            movie.reviews = results; 
            res.json(movie);
        })
    })
};
//store review
function storeReview (req, res) {
    const {id} = req.params;
    const {name, vote, text} = req.body;
    const sql = `
    INSERT INTO reviews (movie_id, name, vote, text) VALUES (?,?,?,?)
    `
    connection.query(sql, [id, name, vote, text], (err, result)=> {
        if(err) {
            return res.status(500).json({
                errorMessage: err.sqlMessage
            })
        }
        res.status(201);
        res.json ({
            id,
            name,
            vote,
            text
        })
    })
};
//store
function store (req,res) {

    const {title, director, genre, release_year, abstract} = req.body;

    const imageName = req.file.filename;

    const sql = `
    INSERT INTO movies (title, director, genre, release_year, abstract, image, slug) VALUES (?,?,?,?,?,?,?)
    `

    const slug = slugify(title, {
        lower:true,
        trim:true
    })
    
    connection.query(sql, [title, director, genre, release_year, abstract, imageName, slug], (err, results)=> {
            if(err) {
            return res.status(500).json({
                errorMessage: err.sqlMessage
            })
        }
        res.status(201);
        res.json ({ message: 'Movie added'})
    })
};

module.exports = {index, show, storeReview, store};