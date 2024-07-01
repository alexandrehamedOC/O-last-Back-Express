import ProfilDatamapper from "../datamappers/profil.datamapper.js";   

export default class ProfilController {
    static async createProfil(req, res, next) {
        try {
            const profilData = req.body;
            const profil = await ProfilDatamapper.createProfil(profilData);
            res.status(201).json(profil);
        } catch (error) {
            next(error);// Utilis le middleware d'erreur
        }
    }
    static async getAllProfils(req, res, next) {
        try {
            const profils = await ProfilDatamapper.findAll();
            res.status(200).json(profils);
        } catch (error) {
            next(error);// Utilis le middleware d'erreur
        }
    }   
    static async getProfilById(req, res, next) {
        try {
            const { id } = req.params;
            const profil = await ProfilDatamapper.findByPk(id);
            res.status(200).json(profil);
        } catch (error) {
            next(error);// Utilis le middleware d'erreur
        }
    }
    static async updateProfil(req, res ,next) {
        try {
            const { id } = req.params;
            const profilData = req.body;
            const profil = await ProfilDatamapper.updateById(id, profilData);
            res.status(200).json(profil);
        } catch (error) {
            next(error);// Utilis le middleware d'erreur
        }
    }
    static async deleteProfil(req, res, next) {
        try {
            const { id } = req.params;
            const profil = await ProfilDatamapper.deleteById(id);
            res.status(200).json(profil);
        } catch (error) {
            next(error);// Utilis le middleware d'erreur
        }
    }
}