//dependencies
import express from "express";
import cors from "cors";
import restaurants from "./API/restaurants.route.js";

//app initialization
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/restaurants", restaurants);

//not found handler
app.use("*", (req, res) => {
    res.status(400).json({error: "not found"});
});

export default app;
