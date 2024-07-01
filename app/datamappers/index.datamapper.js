import client from '../config/pg.client.js';
import PostDatamapper from './post.datamapper.js';

// Initialiser les datamappers avec le client
PostDatamapper.init({ client });

export default { PostDatamapper };