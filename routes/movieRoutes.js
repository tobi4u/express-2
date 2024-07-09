import express from "express";
import db from "../db/conn.js";

const movieRoutes = express.Router();

movieRoutes.get("/", async(req, res) => {
    const collection =await db.collection("movies")
    const result =await collection.find({}).limit(20).toArray();
  res.status(200).send(result);
});

export default movieRoutes;