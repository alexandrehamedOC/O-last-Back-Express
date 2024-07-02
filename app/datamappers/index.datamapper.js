import client from '../config/pg.client.js';
import ProfilDatamapper from './profil.datamapper.js';
/**Import others datamapper here */



/**Inject client */
ProfilDatamapper.init({ client });


export { ProfilDatamapper };




