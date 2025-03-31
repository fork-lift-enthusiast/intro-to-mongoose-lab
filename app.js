import promptSync from "prompt-sync";
import Customers from "./models/customers.js";
import mongoose from "mongoose";
const prompt = promptSync();

let condition = true;

const connect = async (userInput) => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  if (userInput === "1") {
    const name = prompt("Name of new customer: ");
    const age = prompt("Age of new customer: ");
    await createCustomer(name, age);
  }
  
  if (userInput === "2") {
    const customers = await Customers.find();
    customers.forEach((element) => {
      console.log(`ID: ${element.id} -- Name: ${element.name}, Age: ${element.age}`);
    });
  }
  
  if (userInput === "3") {
    const id = prompt("Copy and paste the id of the customer you would like to update here: ");
    const newName = prompt("What is the customer's new name? ");
    const newAge = prompt("What is the customer's new age? ");
    await Customers.findByIdAndUpdate(id, { name: newName, age: parseInt(newAge) });
  }
  
  if (userInput === "4") {
    const id = prompt("Copy and paste the id of the customer you would like to delete here: ");
    await Customers.findByIdAndDelete(id);
  }
  
  if (userInput === "5") {
    condition = false; 
    await mongoose.connection.close();
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit();
  }
};

const createCustomer = async (name, age) => {
  const customerData = { name, age: parseInt(age) };
  const customer = await Customers.create(customerData);
  console.log("New Customer:", customer);
};

while (condition) {
  console.log(`
    Welcome to the CRM

    What would you like to do?

    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. Quit
  `);
  
  const choice = prompt("Number of action to run: ");
  await connect(choice);
}