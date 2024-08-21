import express from 'express';
import 'dotenv/config.js';
import dbConnection from '../database/config.js';
import { getPets, getPetById, postPet, putPet } from '../controllers/petController.js';

export default class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbConnect();
        this.pathPet = '/api/pet';
        this.route();
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }

    async dbConnect() {
        await dbConnection();
    }

    route() {
        this.app.use(express.json());
        this.app.get(this.pathPet, getPets);
        this.app.get(this.pathPet + '/:id', getPetById);
        this.app.post(this.pathPet, postPet);
        this.app.put(this.pathPet + '/:id', putPet);
    }
}
