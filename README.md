#Denbegna

##*API Endpoints Documentation*
These are the endpoint of the Denbegna ecommerce in backend.

###*‘/auth’*
*‘/auth/signup’*: create new user in database means new account, the controller will return a created session token.

$curl 0.0.0.0:5000/auth/signup -XPOST -H "Content-Type: application/json" -d '{ "email": "samuel@gselassie.com", "password": "toto1234!", "name": "Sam" }'

${"token":"auth_bf9a5d04-fecb-40d7-9eed-b641b0ae8609"}
	
The post request the frontend going to make must contain the following data ‘name’, ‘email’, ‘password’

*‘/auth/login’*: will let the right client with correct authentication information to make login in the website else will return an error with 401 status code. If the client provides correct information they will get a new session token that is going to expire in 1hr.

$ curl 0.0.0.0:5000/auth/login -XPOST -H "Content-Type: application/json" -d '{ "email":   "samuel@gselassie12.com", "password": "toto1234!"}'
$ {"token":"auth_c57dfd1b-9299-4e20-8f4c-a7273c659693"}

*‘/auth/logout’*: will let the user logout by stopping session

$ curl 0.0.0.0:5000/auth/logout -XPOST -H "X-Token: auth_fe33798c-b237-4635-879e-37d1899e5e25”
$

###*‘/products’*
*‘/products/add’*: add product the seller want to sell then will respond the id of the item

$ curl -XPOST 0.0.0.0:5000/products/add -H "X-Token: auth_fe33798c-b237-4635-879e-37d1899e5e25" -H "Content-Type: application/json" -d '{ "name": "JBL headset", "price": 20, "stock": 10,"category": "Electronics", "description": "Is an original headset with bluetooth and jack connections"}';

$ {“_id”: “60c72b2f4f1a5e456c7b9c9a”}


*‘/products/electronics’*: fetch all electronics products

$  curl 0.0.0.0:5000/products/electronics -H "X-Token: auth_b2eec568-13be-40a6-b147-5c9cc29b862e"
$ [{"_id":"67092013f80e4b1c50bb3503",
    "user_id":"6707b7bbf69b3cc9fe3618d6",
    "name":"JBL headset",
    "price":20,
    "stock":10
}]


*‘/products/clothings’*: fetch all electronics products

$  curl 0.0.0.0:5000/products/clothings -H "X-Token: auth_b2eec568-13be-40a6-b147-5c9cc29b862e"
$ [{"_id":"67092013f80e4b1c50bb3503",
    "user_id":"6707b7bbf69b3cc9fe3618d6",
    "name":"Nike air force",
    "price":20,
    "stock":10,
    “size”: “42”
}]


*‘/products/homeutils’*: fetch all home and kitchen utilities products

$  curl 0.0.0.0:5000/products/homeutils -H "X-Token: auth_b2eec568-13be-40a6-b147-5c9cc29b862e"
$ [{"_id":"67092013f80e4b1c50bb3503",
    "user_id":"6707b7bbf69b3cc9fe3618d6",
    "name":"Ezzo Knife",
    "price":24,
    "stock":10
}]


*‘/products/bookmedias’*: fetch all books and video products

$  curl 0.0.0.0:5000/products/homeutils -H "X-Token: auth_b2eec568-13be-40a6-b147-5c9cc29b862e"
$ [{"_id":"67092013f80e4b1c50bb3503",
    "user_id":"6707b7bbf69b3cc9fe3618d6",
    "name":"Lord of The Ring",
    “type”: “Hard copy”,
    "price":24,
    "stock":10
}]


*‘/products/getproduct’*: fetch a product from it _id, will include more informations

$ curl -G 0.0.0.0:5000/products/getproduct -H "X-Token: auth_c9084790-7f37-459f-8732-3410c5f72632" -H "Content-Type: application/json" --data-urlencode "_id=67092013f80e4b1c50bb3503" --data-urlencode "category=Electronics"; echo ""
${"_id":"67092013f80e4b1c50bb3503",
   "user_id":"6707b7bbf69b3cc9fe3618d6",
   "name":"JBL headset",
   "description":"Is an original headset with bluetooth and jack connections",
   "price":20,
   "stock":10}


*‘/products/del’*: to delete a product post by a user

$ curl -XDELETE 0.0.0.0:5000/products/del -H "X-Token: auth_0250a35e-d659-4e4a-892c-9a188909a50e" -H "Content-Type: application/json" -d '{"_id":"67092013f80e4b1c50bb3503", "category": "Electronics"}'
${“message”: “Deleting Succeed”}

###*‘/cart’*
*‘/cart/get’*: to fetch the user’s cart 

$curl 0.0.0.0:5000/cart/get -H "X-Token: auth_b41e25eb-d4f7-4d99-842a-9c328596a95e"; echo ""
$ [ ]

*‘/cart/add’*: add product to user’s cart

$curl -XPOST 0.0.0.0:5000/cart/add -H "X-Token: auth_1f3ea076-2d65-422f-8243-c5f0a8c02c27" -H "Content-Type: application/json" -d '{"category": "Electronics", "itemid": "670d344c9905742dbe18f756", "quantity": 1, "name": "JBL speaker"}'; echo ""
${"_id":"670d320c8a494875ea5c3bc9","name":"Sam1","email":"samuel@gselassie1.com","password":"$2a$10$3az890XKzUmqhM70hFZBMOV1SllDQ0QdplJk2SCerwqAxum9E.0Pm","createdAt":"2024-10-14T15:00:28.234Z","updatedAt":"2024-10-15T07:44:09.943Z","__v":0,"cart":[{"itemid":"670d344c9905742dbe18f756","category":"Electronics","quantity":1,"_id":"670e1d49efc86f594e2ac697"}]}


*‘/cart/remove’*: remove an item from cart based on ‘itemid’

$ curl -XDELETE  0.0.0.0:5000/cart/remove -H "X-Token: auth_4bbff1f6-d6bf-49d6-a1a0-0641446fb1e3" -H "Content-Type: application/json" -d '{"itemid":"670d369b9905742dbe18f767"}'; echo ""

${"cart":[{"itemid":"670d344c9905742dbe18f756","category":"Electronics","quantity":7,"_id":"670e2af7b75ba04072b4e921"},{"itemid":"670d36159905742dbe18f761","category":"Clothings","quantity":3,"_id":"670e2b61b75ba04072b4e927"}]}


*‘/cart/clear’*: clear all items from the cart
	
$ curl -XDELETE 0.0.0.0:5000/cart/clear -H "X-Token: auth_9e929519-1dee-40e4-b785-4dd2517efd4c"
${“message”: “All items are cleared from cart”}

###*‘/order’*
*‘/order/add’*: add order which will decrease the stock of bought item by ordered quantity

$curl -XPOST 0.0.0.0:5000/order/add -H "X-Token: auth_e59bd418-df04-4b1f-828b-95d00a550c1d" -H "Content-Type: application/json" -d '{"itemid": "670d344c9905742dbe18f756", "category": "Electronics", "quantity": 4}'; echo ""
${"itemid":"670d344c9905742dbe18f756","item_ownerid":"670d320c8a494875ea5c3bc9","_id":"670e784e03537e4f94dcf9ee"}

