const express = require("express");
let app = express();
const path = require('path');

app.get('/', (req, res) => res.send("HELLO FROM EXPRESS"));



// app.use(express.static('public'))

app.listen(3000,  () => console.log("Server listening on port 3000"));