import CoreDatamapper from './core.datamapper.js';

export default class UserDatamapper extends CoreDatamapper {

    static tableName = 'users';

    static async findUser (email, password){
        const result = await this.client.query(`SELECT * FROM users WHERE email = $1 AND password = $2`,[email, password])
        const {rows} = result;
        return rows[0]; 
    }


}