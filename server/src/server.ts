import app from "./app"
import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log("connect to Mongo success!");
        app.listen(port, () => console.log("server open on port: " + port));
    })
    .catch(console.error);
