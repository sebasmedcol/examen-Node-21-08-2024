import Pet from "../models/pet.js";

export async function getPets(req, res) {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getPetById(req, res) {
    const { id } = req.params;
    try {
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json('Pet not found');
        }
        res.json(pet);
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function postPet(req, res) {
    const body = req.body;

    if (Array.isArray(body)) {
        try {
            const pets = await Pet.insertMany(body);
            res.status(201).json({ message: 'Mascotas creadas exitosamente', pets });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        try {
            const pet = new Pet(body);
            await pet.save();
            res.status(201).json({ message: 'Mascota creada exitosamente', pet });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export async function putPet(req, res) {
    const { id } = req.params;
    const { nombre, especie, color, raza, precio } = req.body;
    try {
        const pet = await Pet.findByIdAndUpdate(id, {
            nombre,
            especie,
            color,
            raza,
            precio
        }, { new: true });

        if (!pet) {
            return res.status(404).json('Pet not found');
        }

        res.status(201).json('Pet updated successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}
