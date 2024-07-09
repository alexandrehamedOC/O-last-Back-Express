import ApiError from "../errors/api.errors.js";
import validationMiddleware from "../middleware/validation.middleware.js";
export default class CoreController {
  static entityName = null;
  static mainDatamapper = null;
  static validateSchema(schema) {
    return validationMiddleware(schema);
  }

  static async getAll(req, res) {
    const { itemsByPage, page } = req.query;

    const itemsPerPage = Number(itemsByPage) && Number(itemsByPage) > 0 ? Number(itemsByPage) : 50;
    const currentPage = Number(page) && Number(page) >= 0 ? Number(page) : 0;
  

    try {
      const rows = await this.mainDatamapper.findAll(itemsPerPage, currentPage);

      if (!rows) {
        throw new ApiError(`${this.entityName} not found`, 404, "NOT_FOUND");
      }
      return res.json(rows);
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;

    try {
      const row = await this.mainDatamapper.findByPk(id);

      if (!row) {
        throw new ApiError(`${this.entityName} not found`, 404, "NOT_FOUND");
      }

      return res.json(row);
    } catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }

  static async create(req, res) {
    const input = req.body;

    try {
      if (!input) {
        throw new ApiError("All fields required", 400, "BAD_REQUEST");
      }

      const row = await this.mainDatamapper.create(input);
      return res.status(201).json(row);
    } catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const input = req.body;
    try {
      if (!input) {
        return next(new ApiError("All fields required", 400, "BAD_REQUEST"));
      }

      const row = await this.mainDatamapper.update(id, input);
      if (!row) {
        return next(
          new ApiError(`${this.entityName} not found`, { status: 404 })
        );
      }
      return res.json(row);
    } catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const eltToDelete = await this.mainDatamapper.delete(id);

      if (!eltToDelete) {
        return next(
          new ApiError(`${this.entityName} not found`, { status: 404 })
        );
      }

      res.status(204).json({ message: `${this.entityName} deleted` });
    } catch (error) {
      console.error(error);
      throw new ApiError();
    }
  }
}
