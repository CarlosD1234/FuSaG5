const express = require("express");
const multer = require('multer');

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Audios')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Principal.js"))
})

app.post("/subida", upload.single("Audio"), (req, 
res) => {
    console.log(req.file);
    res.send("Archivo subido!");
})
app.listen(3000);