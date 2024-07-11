import express from 'express';
import data from "./data/data.json" assert { type: "json" };
import movieRoutes from './routes/movieRoutes.js';


const app = express();
const PORT = 2001 
app.use(express.json());
app.use("/movie", movieRoutes)


app.get('/', (req, res) => {
    res.send("Hello World")
});


app.post("/fruits", (req, res) => {
    console.log(req.body);
    const body = req.body;
    data.push(body);
    console.log(data);
    res.send("data saved successfully");
});



app.listen(PORT, () =>{
    console.log(`Your server is running on port ${PORT}`)
})
