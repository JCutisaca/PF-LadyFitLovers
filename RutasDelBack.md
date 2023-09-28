
# ruta que trae todos los ususarios

GET http://localhost:3001/user   

###


# ruta para traer user by id
GET http://localhost:3001/user/:id (id user = UUIDV1)

###


# ruta user delete
DELETE http://localhost:3001/user/:id     (id user = UUIDV1)

###

# ruta post user
POST http://localhost:3001/user/create
content-type: application/json

{
        "name": "Leo21",
        "surname":"Rodri21",
        "email": "Leo@gmail21.com",
        "phone": 166533422356,
        "password": "LeoL22oco",
        "typeUser": "User",
        "address": "Argent2ina2"
}

# ruta para crear User nuevo 
# en la base de datos
# lineas 24...32 le mandamos por body 
# los datos para crear un user 

###


# ruta que trae todos los productos

GET http://localhost:3001/product

###


# ruta para traer product by id
GET http://localhost:3001/product/1 (id product number)

###


# ruta product delete
DELETE http://localhost:3001/product/27    (id product number)

###

# ruta post product
POST http://localhost:3001/product/create
content-type: application/json

 {
    "name": "REMERA MANGA LARGA",
    "image": "https://d22fxaf9t8d39k.cloudfront.net/38e94b7bc0a1e5cdbc1c3523a0a138a1ca007735ba6eec97394a48f542c47469205310.jpg",
    "price": 8500,
    "sales": 0,
    "stock": [
      {
        "size": "s",
        "color": "gray",
        "quantity": 7
      },
      {
        "size": "m",
        "color": "blue",
        "quantity": 10
      },
      {
        "size": "l",
        "color": "white",
        "quantity": 8
      }
    ],
    "onSale": 14.99
  }

# ruta para crear product nuevo 
# en la base de datos
# lineas 64...87 le mandamos por body 
# los datos para crear un product 

###

