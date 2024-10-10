import { MongoClient } from 'mongodb';

class DBClient {

	constructor() {
		this.host = process.env.DB_HOST || 'localhost';
		this.port = process.env.DB_PORT || 27017;
		this.database = process.env.DB_DATABASE || 'files_manager';
		const url = `mongodb://${this.host}:${this.port}/${this.database}`;
		this.client = new MongoClient(url, { useUnifiedTopology: true });
		this.ready = false;
		this.users = null;
		this.products = null;
		this.client.connect()
			.then(() => {
			   this.db = this.client.db(this.database);
                           this.db.createCollection('users', {
				   validator: {
					   $jsonSchema: {
						   bsonType: 'object',
						   required: ['name', 'email', 'password'],
						   properties: {
							   name: {
								   bsonType: 'string',
								   description: 'must be a string'
							   },
							   email: {
								   bsonType: 'string',
								   description: 'must be a string'
							   },
							   password: {
								   bsonType: 'string',
								   description: 'must be a string'
							   }
						   }
					   }
				   }
			   });
                           this.products = this.db.collection('products');
			   this.ready = true;
			}).catch((err) => {
				this.ready = false;
				console.log(err);
			});
	}
}

const dbClient = new DBClient();
export default dbClient;
