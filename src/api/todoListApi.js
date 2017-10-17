const express = require('express');
// const pg = require('pg');
// const app = express();
// const _conString = "postgres://giljquew:Vm-5zvhByXZjG7L2hk7KN4DSHn-TDswf@elmer.db.elephantsql.com:5432/giljquew";

const routes = express.Router();
const TodoTest = require('../setupSequlize.js');

routes.post('/todos', (req, res) => {
    TodoTest.create({
        title: req.body.title,
        completed: req.body.completed
    }).then(() => {
       return res.json({ 'success': true });
    });
});
/*SQL implementation*/
// routes.post('/todos', (req, res) => {
//     let client = new pg.Client(_conString);
//     console.log(`INSERT INTO TODO VALUES (1, default, '${req.body.title}', ${req.body.completed})`);
//     client.connect(function (err) {
//         if (err) {
//             res.json([]);
//             console.error('error running query', err);
//         }
//         client.query(`INSERT INTO TODO VALUES (1, default, '${req.body.title}', ${req.body.completed})`, function (err, result) {
//             // UPDATE TODO SET Completed=true WHERE ID=1;
//             if (err) {
//                 res.json([]);
//                 console.error('error running query', err);
//             }
//             client.query('SELECT * FROM TODO', function (err, result) {
//                 // UPDATE TODO SET Completed=true WHERE ID=1;
//                 if (err) {
//                     res.json([]);
//                     console.error('error running query', err);
//                 }
//                 console.log("===============Added and getting the data");
//                 res.json(result.rows);
//                 client.end();
//             });
//         });
//     });
// });

routes.get('/todos', (req, res) => {
    TodoTest.findAll().then((todos) => {
        return res.json(todos);
    });
});

/*SQL implementation*/
// routes.get('/todos', (req, res) => {
//     let client = new pg.Client(_conString);
//     client.connect(function (err) {
//         if (err) {
//             return console.error('could not connect to postgres', err);
//         }
//         client.query('SELECT * FROM "todo"', function (err, result) {
//             if (err) {
//                 return console.error('error running query', err);
//             }
//             res.json(result.rows);
//             client.end();
//         });
//     });
// });

routes.put('/todos/:id', (req, res) => {
    TodoTest.findById(req.params.id).then(todo => {
        if (todo) {
            todo.update({
                completed: true
            });
            return res.json({ 'success': true });
        }
        return res.json({ 'success': false });
    });
});

/*SQL implementation*/
// routes.put('/todos/:id', (req, res) => {
//     let client = new pg.Client(_conString);
//     client.connect(function (err) {
//         if (err) {
//             res.json([]);
//             console.error('error running query', err);
//         }
//         client.query(`UPDATE TODO SET Completed=true WHERE ID=${req.params.id}`, function (err, result) {
//             // UPDATE TODO SET Completed=true WHERE ID=1;
//             if (err) {
//                 res.json([]);
//                 console.error('error running query', err);
//             }
//             client.query('SELECT * FROM TODO', function (err, result) {
//                 // UPDATE TODO SET Completed=true WHERE ID=1;
//                 if (err) {
//                     res.json([]);
//                     console.error('error running query', err);
//                 }
//                 console.log("===============Updated and getting the data");
//                 res.json(result.rows);
//                 client.end();
//             });
//         });
//     });
// });

routes.delete('/todos/:id', (req, res) => {
    TodoTest.findById(req.params.id).then(todo => {
        if (todo) {
            todo.destroy();
            return res.json({ 'success': true });
        }
        return res.json({ 'success': false });
    });
});
/*SQL implementation*/
// routes.delete('/todos/:id', function (req, res) {
//     let client = new pg.Client(_conString);
//     client.connect(function (err) {
//         if (err) {
//             res.json([]);
//             console.error('error running query', err);
//         }
//         client.query(`DELETE FROM TODO WHERE ID=${req.params.id}`, function (err, result) {
//             // UPDATE TODO SET Completed=true WHERE ID=1;
//             if (err) {
//                 res.json([]);
//                 console.error('error running query', err);
//             }
//             client.query('SELECT * FROM TODO', function (err, result) {
//                 // UPDATE TODO SET Completed=true WHERE ID=1;
//                 if (err) {
//                     res.json([]);
//                     console.error('error running query', err);
//                 }
//                 console.log("===============Deleted and getting the data");
//                 res.json(result.rows);
//                 client.end();
//             });
//         });
//     });
// });
module.exports = routes;