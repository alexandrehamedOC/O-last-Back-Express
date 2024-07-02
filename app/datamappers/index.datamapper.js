import client from '../config/pg.client.js';
import UserDatamapper from './user.datamapper.js';

/**Import others datamapper here */
UserDatamapper.init({client});


/**Inject client */

    /**export datamapper here */
export default UserDatamapper;