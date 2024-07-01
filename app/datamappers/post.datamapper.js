import CoreDatamapper from './core.datamapper.js';

export default class PostDatamapper extends CoreDatamapper {
    static tableName = 'post';

    static async findByUserId(userId){
        const result = await this.client.query(`
        SELECT * FROM "${this.tableName}"
        JOIN "user" ON "${this.tableName}"."user_id" = "user"."id"
        WHERE "user"."id" = $1
        `, [userId]);
        const {rows} = result;
        return rows;
    }



    static async create(post){
        const result = await this.client.query(`
        INSERT INTO "${this.tableName}" (title, platform, description, schedule_start, schedule_end, status, user_id, game_id, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `, [post.title, post.platform, post.description, post.schedule_start, post.schedule_end, post.status, post.user_id, post.game_id, post.updated_at]);
        const {rows} = result;
        return rows[0];
    }


        // remaining methods TO DO
    // static async update(post){
    //     const result = await this.client.query(`
    //     UPDATE "${this.tableName}"
    //     SET content = $1
    //     WHERE id = $2
    //     RETURNING *
    //     `, [post.content, post.id]);
    //     const {rows} = result;
    //     return rows[0];
    // }

    static async delete(id){ 
        await this.client.query(`DELETE FROM "${this.tableName}" WHERE id = $1`, [id]);
    }
}