export default class CoreController {
  static entityName = null;
  static mainDatamapper = null;

  static async getAll(_, res) {
    try{
      console.log('get all', this.mainDatamapper);
      const rows = await this.mainDatamapper.findAll();
      return res.json({ data: rows });
    } catch (error) {
      console.log(error);
    }
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
        new ApiError(`${this.entityName} not found`, { status: 404 }),
      );
    }
    return res.json({ data: row });
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    const deleted = await this.mainDatamapper.delete(id);
    if (!deleted) {
      return next(
        new ApiError(`${this.entityName} not found`, { status: 404 }),
      );
    }
    return res.status(204).json();
  }
}
