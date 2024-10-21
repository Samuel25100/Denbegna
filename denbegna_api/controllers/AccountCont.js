import {v4 as uuidv4 } from 'uuid';
import User from '../models/users_db';
import redisClient from '../utils/redis_db';
import bcrypt from 'bcryptjs';

export default class Accountcontn {

	static async createacc(req, res) {
		const {name, email, password} = req.body;
		const chk = await User.findOne({ email });
		if (chk) {
			res.status(409).json({"message": "Account already exist"});
			return;
		}
		if (!name) {
			res.status(409).json({"message": "Name is missing"});
			return;
		}
		if (!password) {
                        res.status(409).json({"message": "Password is missing"});
                        return;
                }
		const hashpwd = await bcrypt.hash(password, 10);
		const result = await User.create({
			name, email, 'password': hashpwd
		});
		const user_id = result._id.toString();
		const token = "auth_" + uuidv4().toString(); 
		await redisClient.set(token, user_id, 3600);
		res.status(201).json({"token": token});
	}

	static async loginacc(req, res) {
		const {email, password} = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			res.status(401).json({"error": "Email doesn't exist"});
			return;
		}
		const user_id = user._id.toString();
		await bcrypt.compare(password, user.password,
			async (err, match) => {
				if (err) {
					console.error(err);
				} else if (match) {
				const token = "auth_" + uuidv4().toString();
				await redisClient.set(token, user_id, 3600);
				res.status(200).json({"token": token});
				return;
				}
			res.status(401).json({"message": "Wrong password"});
                        return;
		});
	}

	static async logoutacc(req, res) {
		const token = req.headers['x-token'];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
		const user_id = await redisClient.get(token);
		 if (!user_id) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
		const result = await redisClient.del(token);
		res.status(204).send();
	}
}
