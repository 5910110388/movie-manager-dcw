const cors = require('cors');
const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
var router = express.Router();

const app = express();
app.use(cors());
app.use(bodyParser.json());

var config = {
    apiKey: "AIzaSyBq1uUduPor9Hx6VnKHkdf0lsg9j2Z9p6k",
    authDomain: "movie-manager-dcw.firebaseapp.com",
    databaseURL: "https://movie-manager-dcw.firebaseio.com",
    projectId: "movie-manager-dcw",
    storageBucket: "movie-manager-dcw.appspot.com",
    messagingSenderId: "597804645812"
};
firebase.initializeApp(config);

app.get('/movies', (req, res) => {
    console.log("HTTP Get Request") //แสดงเมื่อมีการเรียกใช้ Method นี้ผ่านหน้าจอคอนโซล
    const reference = firebase.database().ref("/movies/") //ทำการ reference ไปยัง firebase database

    reference.on("value",
        (snapshot) => {
            console.log(snapshot.val()) //ให้แสดงค่าที่ get ผ่านหน้าจอคอนโซล
            res.json(snapshot.val()) //ให้แสดงค่าที่ get ผ่านโปรแกรมของผู้เรียกใช้ API
            reference.off("value")
        },
        (error) => {
            console.log(`Failed to get movies ${error.code}`) //แสดงโค้ดข้อผิดพลาดผ่านหน้าจอคอนโซลเมื่อมีข้อผิดพลาดเกิดขึ้น
            res.send(`Failed to get movies ${error.code}`) //แสดงโค้ดข้อผิดพลาดผ่านโปรแกรมของผู้เรียกใช้ API เมื่อมีข้อผิดพลาดเกิดขึ้น
        }
    )
})

app.get('/movies/:movie_id', (req, res) => {
    console.log("HTTP Get Request")

    const referencePath = `/movies/${req.params.movie_id}`
    const reference = firebase.database().ref(referencePath);

    reference.once("value",
        (snapshot) => {
            console.log(snapshot.val())
            res.json(snapshot.val())
            reference.off("value")
        },
        (error) => {
            console.log(`Failed to get a movie ${error.code}`)
            res.send(`Failed to get a movie ${error.code}`)
        }
    )
})

app.post('/movies', (req, res) => {
    console.log("HTTP Post Request")

    let movie = req.body
    let id = req.body.id

    const referencePath = `/movies/${id}/`
    const reference = firebase.database().ref(referencePath)
    reference.set(movie,
        (error) => {
            if (error) {
                res.send(`Movie could not be created. ${error}`)
            } else {
                res.send("Create a movie successfully.")
            }
        });
});

app.put('/movies/:movie_id', (req, res) => {
    console.log("HTTP put Request")

    let movie = req.body

    const referencePath = `/movies/${req.params.movie_id}/`
    const reference = firebase.database().ref(referencePath)
    reference.update(movie,
        (error) => {
            if (error) {
                res.send(`Movie could not be updated. ${error}`)
            } else {
                res.send("Update a movie successfully.")
            }
        });
});

app.delete('/movies/:movie_id', (req, res) => {
    console.log("HTTP DELETE Request");

    const referencePath = `/movies/${req.params.movie_id}/`
    const reference = firebase.database().ref(referencePath)
    reference.remove(
        (error) => {
            if (error) {
                res.send(`Movie could not be removed. ${error}`)
            } else {
                res.send("Movie remove successfully.")
            }
        });
});

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Movie App listening at http://%s:%s", host, port);
});