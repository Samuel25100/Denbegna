import redisClient from '../utils/redis_db';
import { ObjectId } from 'mongodb';
import { Electronics, Clothings,
	HomeUtils, BookMedias } from '../models/products_db';
import bcrypt from 'bcryptjs';
import User from '../models/users_db';


export default class Products {

	static async add_prod(req, res) {
		const catagories = {
			"Electronics": Electronics,
			"HomeUtils": HomeUtils
		};
		const token = req.headers['x-token'];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
		const user_id = await redisClient.get(token);
		if (!user_id) {
			res.status(401).json({"message": "Session expired"});
			return;
		}
		const user = await User.findById(user_id);
		if (!user) {
			res.status(401).json({"error": "Unauthorized"});
			return;
		}
		const category = req.body["category"];
		if (category == "Electronics" || category == "HomeUtils") {
			const {name, description, price, stock} = req.body;
			const prod = await catagories[category].create({
				name, description, price, stock, user_id});
			res.status(201).json(
			{"_id": prod._id});
			return;
		}
		if (category == "Clothings") {
                        const {name, description, price, stock, size} = req.body;
                        const prod = await Clothings.create({
                                name, size, description, price, stock, user_id});
                        res.status(201).json(
                        {"_id": prod._id});
                        return;
                }
		if (category == "BookMedias") {
                        const { name, description, price,
				type, stock, size } = req.body;
                        const prod = await Clothings.create({
                                name, size, description,
				price, type, stock, user_id});
                        res.status(201).json(
                        {"_id": prod._id});
                        return;
                }
		res.status(401).json({"error": "Missing catagory"});
                return;
	}

	static async getElectronics(req, res) {
		const token = req.headers['x-token'];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);
                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
		const products = await Electronics.find({});
		const final = [];
		for (let line of products) {
			final.push({"_id": line["_id"],
				"user_id": line.user_id,
				"name": line.name,
				"price": line.price,
				"stock": line.stock}
			);
		}
		res.status(200).json(final);
	}

	static async getClothings(req, res) {
                const token = req.headers['x-token'];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);
                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
                const products = await Clothings.find({});
                const final = [];
                for (let line of products) {
                        final.push({"_id": line["_id"],
                                "user_id": line.user_id,
                                "name": line.name,
                                "price": line.price,
                                "stock": line.stock,
				"size": line.size});
                }
                res.status(200).json(final);
        }

	static async getHomeUtils(req, res) {
                const token = req.headers['x-token'];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);
                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
                const products = await HomeUtils.find({});
                const final = [];
                for (let line of products) {
                        final.push({"_id": line["_id"],
                                "user_id": line.user_id,
                                "name": line.name,
                                "price": line.price,
                                "stock": line.stock});
                }
                res.status(200).json(final);
        }

	static async getBookMedia(req, res) {
                const token = req.headers['x-token'];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);
                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
                const products = await BookMedias.find({});
                const final = [];
                for (let line of products) {
                        final.push({"_id": line["_id"],
                                "user_id": line.user_id,
                                "name": line.name,
				"type": line.type,
                                "price": line.price,
                                "stock": line.stock});
                }
                res.status(200).json(final);
        }

	static async getProduct(req, res) {
		const token = req.headers['x-token'];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);

                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
                if (!user) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
		const catagories = {
			"Clothings": Clothings,
			"BookMedias": BookMedias,
                        "Electronics": Electronics,
                        "HomeUtils": HomeUtils
                };
		const {_id, category} = req.query;
		const product = await catagories[category].findById(_id, '-__v');
		res.status(200).json(product);
		return;
	}

	static async delProduct(req, res) {
		const token = req.headers['x-token'];
		if (!token) {
                        res.status(401).json({"message": "Token is missing"});
                        return;
                }
                const user_id = await redisClient.get(token);
		const catagories = {
                        "Clothings": Clothings,
                        "BookMedias": BookMedias,
                        "Electronics": Electronics,
                        "HomeUtils": HomeUtils
                };
                if (!user_id) {
                        res.status(401).json({"message": "Session expired"});
                        return;
                }
                const user = await User.findById(user_id);
		const {_id, category} = req.body;
		const product = await catagories[category].findById(_id);
		if (!product) {
                        res.status(404).json({"message": "Resource not found"});
                        return;
                }
                if (!user || user_id.toString() != product.user_id) {
                        res.status(401).json({"error": "Unauthorized"});
                        return;
                }
		const response = await catagories[category].findByIdAndDelete(_id);
		res.status(200).json({"message": "Deleting Succeed"});
		return;
	}
}
