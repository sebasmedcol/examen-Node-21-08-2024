import { model, Schema } from 'mongoose';

const PetSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    especie: {
        type: String,
        required: [true, 'La especie es requerida']
    },
    color: {
        type: String,
        required: [true, 'El color es requerido']
    },
    raza: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: [true, 'El precio es requerido']
    }
});


export default model('Pet', PetSchema, 'pet');
