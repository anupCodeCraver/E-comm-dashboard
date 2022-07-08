const express = require('express');
require('./db/Config');
const cors = require('cors');
const users = require('./db/UsersSchema');
const Product = require('./db/ProductSchema');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';



//
// const jwt=require('jsonwebtoken');
// jwtKey="jwt"
//

const app = express();
app.use(express.json());
app.use(cors());

app.post('/register',verifyToken, async (req, res) => {
    const data = new users(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
   
    Jwt.sign({ result },jwtKey, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong...! please try after sometime" })
        }
        res.send({ result, auth: token });

    })
});

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await users.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user },jwtKey, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong...! please try after sometime" })
                }
       res.send({ user, auth: token });

            })
        } else {
            res.send({ result: "user not found" });
        }

    } else {
        res.send({ results: "user not found" });

    }
});

app.post('/add-product', async (req, res) => {
    let data = new Product(req.body);
    let result = await data.save();
    res.send(result);
});

app.get('/products',verifyToken, async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No products found" })
    }

});
app.delete('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)
})

app.get('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ "result": "User Not Found" })
    }
});
app.put('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})

app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                price: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            }
        ]
    });

    res.send(result)


});

function verifyToken(req, res, next) {
    console.log(req.headers['authorization']);
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token,jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "please provide a valid token" })
            } else {
                next();
            }
        
            })
}else {
    res.status(403).send({ result: "please provide a token" })
}

}
app.listen(5000);