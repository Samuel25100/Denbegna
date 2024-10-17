import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();


class RedisClient {
	constructor() {
		this.client = createClient({
			url: process.env.REDIS_URL
		});
		this.ready = true;
		this.client.on('error', (err) => {
			this.ready = false;
			console.log(err);
		});
		this.connect();
		this.client.on('ready', () => {
			this.ready = true;
            	});
	}

	async connect() {
		try {
			await this.client.connect();
            		console.log('Redis connected');
        	} catch (err) {
            		console.error('Failed to connect to Redis:', err);
		}
	}

	isAlive() {
		return this.ready;
	}

	async get(key) {
		try {
			const val = await this.client.GET(key);
			return val ? val : null;
		} catch (err) {
			console.log("Error in redis GET:", err);
			return null;
		}
	}

	async set(key, val, exp) {
		new Promise(async (resolve, reject) => {
			await this.client.SETEX(key, exp, val, (err) => {
				if (!err) {
					resolve();
				}
			});
                });
	}

	async del(key) {
		await this.client.del(key);
	}
}
const redisClient = new RedisClient();
export default redisClient;
