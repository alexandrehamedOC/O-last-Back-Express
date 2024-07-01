import client from '../config/pg.client.js';
import CoreDatamapper from './core.datamapper.js';
import ProfilDatamapper from './profil.datamapper.js
/**Import others datamapper here */



/**Inject client */
ProfilDatamapper.init({client});
/**Inject others datamapper here */ 
export default ProfilDatamapper;    

    




