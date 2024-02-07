import express from "express";
import { Music } from "../models/musicModel";
import (Music);

const router = express.Router();

//Route to saving new Music
router.post('/', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.artist ||
            !request.body.album ||
            !request.body.genre ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, artist, album, genre, publishYear',
            })
        }
        const newMusic = {
            title: request.body.title,
            artist: request.body.artist,
            album: request.body.album,
            genre: request.body.genre,
            publishYear: request.body.publishYear,
        }

        const music = await Music.create(newMusic);

        return response.status(201).send(music);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to get all Music from database
router.get('/', async (request, response) => {
    try{
        const musics = await Music.find({});
        return response.status(200).json({
            count: musics.length,
            data: musics
        });
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to get one Music by id
router.get('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        
        
        const music = await Music.findById(id);
        return response.status(200).json(music);
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for update music
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.artist ||
            !request.body.album ||
            !request.body.genre ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, artist, album, genre, publishYear",
            });
        }

        const { id } = request.params;

        const result = await Music.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Music not found' });
        }

        return response.status(200).json({ message: 'Music updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

 // Route for Delete a Music

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Music.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Music not found' });
        }

        return response.status(200).send({ message: 'Music deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;
