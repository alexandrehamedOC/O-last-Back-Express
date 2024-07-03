export default class CoreController {
  static entityName = null;
  static mainDatamapper = null;

  static async getAll(_, res) {
<<<<<<< HEAD

    try{
=======
    try{
      console.log("mainDatamapper avant findAll:", this.mainDatamapper);
>>>>>>> feature/route_profil
      const rows = await this.mainDatamapper.findAll();
      return res.json({ data: rows });
    } catch (error) {
      console.log(error);
    }
<<<<<<< HEAD

    return res.json({ data: rows });
=======
>>>>>>> feature/route_profil
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const row = await this.mainDatamapper.findByPk(id);
    return res.json({ data: row });
  }

  static async create(req, res) {
    const input = req.body;
    const row = await this.mainDatamapper.create(input);
    // 201 Created
    return res.status(201).json({ data: row });
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const input = req.body;
    const row = await this.mainDatamapper.update(id, input);
    if (!row) {
      return next(
<<<<<<< HEAD
        new ApiError(`${this.entityName} not found`, { status: 404 }),
=======
        // new ApiError(`${this.entityName} not found`, { status: 404 }),
>>>>>>> feature/route_profil
      );
    }
    return res.json({ data: row });
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    const deleted = await this.mainDatamapper.delete(id);
    if (!deleted) {
      return next(
<<<<<<< HEAD
        new ApiError(`${this.entityName} not found`, { status: 404 })
=======
        // new ApiError(`${this.entityName} not found`, { status: 404 }),
>>>>>>> feature/route_profil
      );
    }
    return res.status(204).json();
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> feature/route_profil
