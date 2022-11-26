const express = require("express");
const cors = require("cors");
const booksRouters = require("./routes/book.route");
const authorsRouters = require("./routes/author.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message: "Hello world"
    });
});


app.use("/api/books", booksRouters);
app.use("/api/authors", authorsRouters);


module.exports = app;