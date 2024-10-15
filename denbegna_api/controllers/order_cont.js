import redisClient from '../utils/redis_db';
import User from '../models/users_db';
import Order from '../models/orders_db';
import { Electronics, Clothings,
        HomeUtils, BookMedias } from '../models/products_db';

export default class Ordercls {

	static async MakeOrder(req, res) {
		const catagories = {
                        "Clothings": Clothings,
                        "BookMedias": BookMedias,
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
		const {itemid, category, quantity} = req.body;
		const itm = await catagories[category].findById(itemid);
		const stock = itm.stock;
		if (stock < quantity) {
			res.status(401).json({"Message": "Order larger than stock"});
                        return;
		}
		const item = await catagories[category].findByIdAndUpdate(itemid,
			{$set: {"stock": (stock - quantity)}},
			{ new: true }
		);
		const item_ownerid = item.user_id;
		const order = await Order.create({itemid, category,
			quantity, user_id, item_ownerid});
		const final = {"itemid": order.itemid,
			"item_ownerid": order.item_ownerid,
			"_id": order._id}
		res.status(200).json(final);
	}
}
