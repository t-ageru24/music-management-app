import Express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Music} from './models/musicModel.js'
import musicRoutes from './routes/musicRoutes.js'

const app = Express();

//Middleware to parsing request body
app.use(Express.json())

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Music-App')
});

app.use('/musics', musicRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected Database');
        app.listen(PORT, () => {
            console.log(`Listening to port: ${PORT}`);
        });
        
    })
    .catch(() => {
        console.log(console.error)
    });