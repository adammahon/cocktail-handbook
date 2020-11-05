import VuexORM, { Database } from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import VuexORMService from '@/plugins/vuex-orm-service';

// Models
import Category from '@/models/Category';
import Drink from '@/models/Drink';
import Glass from '@/models/Glass';
import Ingredient from '@/models/Ingredient';

// Register Axios plugin
VuexORM.use(VuexORMAxios);
VuexORM.use(VuexORMService);

// Create the database
const database = new Database();

// Register the models
[Category, Drink, Glass, Ingredient].forEach(model => database.register(model));

// Export database ready for registration to vuex store
export default database;
