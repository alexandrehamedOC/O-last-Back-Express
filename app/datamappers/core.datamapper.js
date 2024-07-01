export default class CoreDatamapper {

    static tableName = null;

    static init (config){
        this.client = config.client;
    }
    static async findAll(){
        const result = await this.client.query(`SELECT * FROM "${this.tableName}"`);
        const {rows} = result;
        return rows;
    }

    static async findByPk(id){
        const result = await this.client.query(`SELECT * FROM "${this.tableName}" WHERE id = $1`, [id]);
        const {rows} = result;
        return rows[0];
      }

}