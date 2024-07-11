import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

/**
 * Express router for movie routes.
 * @type {import('express').Router}
 */
const movieRoutes = express.Router();

/**
 * GET /movies
 * Retrieves all movies from the movies collection.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
movieRoutes.get("/movies", async (req, res) => {
  const collection = await db.collection("movies");
  const result = await collection.find({}).limit(20).toArray();
  res.status(200).send(result);
});

/**
 * GET /users
 * Retrieves all users from the users collection.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
movieRoutes.get("/users", async (req, res) => {
  const collection = await db.collection("users");
  const result = await collection.find({}).limit(20).toArray();
  res.status(200).send(result);
});

/**
 * GET /theaters
 * Retrieves all theaters from the theaters collection.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
movieRoutes.get("/theaters", async (req, res) => {
  const collection = await db.collection("theaters");
  const result = await collection.find({}).limit(20).toArray();
  res.status(200).send(result);
});

/**
 * GET /movies/:id
 * Retrieves a movie by its ID from the movies collection.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
movieRoutes.get("/movies/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    const ress = await db.collection("movies").findOne({ _id: id });
    if (!ress) {
      res.json({ message: "invalid id" });
    }
    res.send(ress);
  } catch (err) {
    throw err;
  }
});

/**
 * POST /users
 * Creates a new user in the users collection.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
movieRoutes.post("/users", async (req, res) => {
  // Add your code here to create a new user

  const data = req.body; // get the data from the request body
  let newDocument = {
    _id: new ObjectId(), // generate a new ObjectId
  };
  newDocument = { ...newDocument, ...data }; // merge the data with the newDocument

  const collection = await db.collection("users").insertOne(newDocument); // get the users collection
  res.status(201).send(collection); // send the newDocument in the response
});

// PUT /users/:id - Update a user by its ID
movieRoutes.put("/users/:id", async (req, res) => {
  const id = new ObjectId(req.params.id); // get the id from the request parameters
  const data = req.body; // get the data from the request body

  // Update the user by its ID with the data
  try {
    const result = await db
      .collection("users")
      .updateOne({ _id: id }, { $set: data });
    res.send(result);
  } catch (err) {
    throw err;
  }
});


// DELETE /users/:id - Delete a user by its ID
movieRoutes.delete("/users/:id", async (req, res) => {
    const id = new ObjectId(req.params.id); // get the id from the request parameters
  
    // Delete the user by its ID
    try {
      const result = await db.collection("users").deleteOne({ _id: id });
      res.send(result);
    } catch (err) {
      throw err;
    }
  });
  







 // export the movieRoutes router
 export default movieRoutes;
