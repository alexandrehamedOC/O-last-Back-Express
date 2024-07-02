import client from '../config/pg.client.js';

/**Import others datamapper here */
import GameDatamapper from './game.datamapper.js';


/**Inject client */
GameDatamapper.init({ client });


/**export datamapper here */

export default GameDatamapper;

