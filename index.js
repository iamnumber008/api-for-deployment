const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');

const port = 4007;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once( 'open', () => console.log("Now connected to MongoDB Atlas."));

app.use("/b7/users", userRoutes);
app.use("/b7/products", productRoutes);
app.use("/b7/orders", orderRoutes);
app.use("/b7/carts", cartRoutes);


app.listen(process.env.PORT || port, () => {
	console.log(`API is now online on port ${ process.env.PORT || port}`)
});
