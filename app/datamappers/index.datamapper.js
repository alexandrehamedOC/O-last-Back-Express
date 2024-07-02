import client from '../config/pg.client.js';
import PostDatamapper from './post.datamapper.js';

/**Initialisez le DataMapper avec le client */
PostDatamapper.init({ client });

export default PostDatamapper;
