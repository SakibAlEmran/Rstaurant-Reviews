import mongodb from "mongodb";
import dotenv from "dotenv";

import app from "./server.js";
import RestaurantsDAO from "./DAO/restaurantsDAO.js";
import ReviewsDAO from "./DAO/reviewsDAO.js";

dotenv.config();
//database connection
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000 ;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
        {
        maxPoolSize:50,
        wtimeoutMS: 2500,
        useNewUrlParser: true, 
        useUnifiedTopology: true
        }
    )
    .catch(error => {
        console.log(error.stack);
        process.exit(1)
    })
    .then(async client => {
        await RestaurantsDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
            console.log('database connection established')
        })
    })