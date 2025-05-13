const connection = require('../data/db');
const { url } = require('inspector');
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

        const movie = {...currentMovie,
            imagePath: process.env.PUBLIC_PATH + '/images/movies_cover/' + currentMovie.image
            }

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
    console.log(req.body);
    res.send(`Nuova recensione aggiunta id: ${id}`)
};

module.exports = {index, show, storeReview};