import client from '../config/pg.client.js';

/**Import others datamapper here */
import RateDatamapper from './rate.datamapper.js';


/**Inject client */
RateDatamapper.init({client});


/**export datamapper here */
export default RateDatamapper;
