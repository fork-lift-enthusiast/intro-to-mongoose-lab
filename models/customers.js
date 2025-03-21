import "dotenv/config.js"
import mongoose from "mongoose";
const customersSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });
// models/todo.js
const Customers = mongoose.model('Customers', customersSchema);

export default Customers;