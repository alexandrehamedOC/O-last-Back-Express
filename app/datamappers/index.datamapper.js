import client from '../config/pg.client.js';
import PostDatamapper from './post.datamapper.js';
import GameDatamapper from './game.datamapper.js';
import RateDatamapper from './rate.datamapper.js';

/**Initialisez le DataMapper avec le client */
PostDatamapper.init({ client });
GameDatamapper.init({ client });
RateDatamapper.init({client});


/**export datamapper here */

export default { 
    GameDatamapper,
    PostDatamapper,
    RateDatamapper
};



