import mongoose from "mongoose";

export const connectDatabase = () => {
    
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
    const DB_CLUSTER = process.env.DB_CLUSTER;
    const DB_PARAMS = process.env.DB_PARAMS;

    const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/?${DB_PARAMS}`;

    mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Connected to MONGO DB!");
    })
    .catch((err) => {
        console.error("Error to connect", err);
    });
}