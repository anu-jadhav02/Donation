const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs"); 
const path = require("path");

const PUBLISHABLE_KEY = "pk_test_51J8f9fSAeOJt4iKzCMFwAZV29NMYxOEzX4TUUakklX3J0LOgNmCAc1cKpx5qDwJajYrB8gfKc5g51gq5tO6RZDhC00HS63Bvrh"

const SECRET_KEY = "sk_test_51J8f9fSAeOJt4iKz5nWM9DncXG1ID0Jw0zdaMzbC7GMjhj95px81nEZDmBWDisv9BCMp7l2ae9oFz8nKMZrEBBWc00G4wYLVvA"

const stripe = require('stripe')(SECRET_KEY)
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000



app.get('/',(req,res) => {
    res.render('Home', {
        key: PUBLISHABLE_KEY
    })
})

app.post('/payment', (req,res) => {
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name:'Anushri Jadhav',
        address:{
            line1:'23 Mountain Valley New Delhi',
            postal_code:'110093',
            city:'New Delhi',
            state:"Delhi",
            country:'India'
        }
    })
    .then((customer) => {
        return stripe.charges.create({
            amount:7000,
            description:'BUY your PRODUCT',
            currency:'inr',
            customer:customer.id
        })
    })
    .then((charge) => {
        console.log(charge);
        res.send("SUCCESS...!!!!!!!!");
    })
    .catch((err) => {
        res.send(err);
    })
})

app.listen(PORT , () => {
    console.log(`Appp is listening on ${PORT}`);
});