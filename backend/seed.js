require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectdb = require("./config/db");
const User = require("./models/usermodel");
const Product = require("./models/productmodel");
const Order = require("./models/ordermodel");

const users = [
	{
		fullname: "Shopnest Admin",
		email: "admin@shopnest.test",
		password: "Admin@123",
		role: "admin",
	},
	{
		fullname: "Demo Customer",
		email: "customer@shopnest.test",
		password: "Customer@123",
		role: "user",
	},
];

const products = [
	{
		name: "Minimal Ceramic Mug",
		description: "A durable ceramic mug for coffee, tea, and everyday use.",
		price: 14.99,
		category: "Home",
		stock: 42,
		imageurl: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=800",
		rating: 4.6,
		numreviews: 18,
	},
	{
		name: "Everyday Canvas Backpack",
		description: "A lightweight backpack with room for your daily essentials.",
		price: 39.99,
		category: "Accessories",
		stock: 25,
		imageurl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
		rating: 4.8,
		numreviews: 31,
	},
	{
		name: "Wireless Desk Headphones",
		description: "Comfortable wireless headphones with clear sound for work or travel.",
		price: 79.99,
		category: "Electronics",
		stock: 16,
		imageurl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
		rating: 4.4,
		numreviews: 24,
	},
];

async function seedDatabase() {
	await connectdb();

	const savedUsers = {};
	for (const user of users) {
		const password = await bcrypt.hash(user.password, 10);
		savedUsers[user.email] = await User.findOneAndUpdate(
			{ email: user.email },
			{
				...user,
				password,
				verified: true,
				otp: undefined,
				otpexpiry: undefined,
			},
			{ new: true, upsert: true, setDefaultsOnInsert: true },
		);
	}

	const savedProducts = {};
	for (const product of products) {
		savedProducts[product.name] = await Product.findOneAndUpdate(
			{ name: product.name },
			product,
			{ new: true, upsert: true, setDefaultsOnInsert: true },
		);
	}

	await Order.deleteMany({ paymentid: /^seed-/ });
	await Order.create({
		user: savedUsers["customer@shopnest.test"]._id,
		items: [
			{
				productid: savedProducts["Minimal Ceramic Mug"]._id,
				qty: 2,
				price: savedProducts["Minimal Ceramic Mug"].price,
			},
			{
				productid: savedProducts["Everyday Canvas Backpack"]._id,
				qty: 1,
				price: savedProducts["Everyday Canvas Backpack"].price,
			},
		],
		totalamount: 69.97,
		address: {
			fullname: "Demo Customer",
			street: "42 Market Street",
			city: "New Delhi",
			postalcode: "110001",
			country: "India",
		},
		paymentid: "seed-demo-order-001",
		status: "delivered",
	});

	console.log("Seed complete.");
	console.log("Demo user: customer@shopnest.test / Customer@123");
	console.log("Admin user: admin@shopnest.test / Admin@123");
}

seedDatabase()
	.catch((error) => {
		console.error("Seed failed:", error.message);
		process.exitCode = 1;
	})
	.finally(async () => {
		await mongoose.disconnect();
	});
n