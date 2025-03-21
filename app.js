import promptSync from "prompt-sync";
import Customers from "./models/customers.js";
import mongoose from "mongoose";
const prompt = promptSync();

console.log(`
    Welcome to the CRM

    What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. quit
`);

const choice = prompt("Number of action to run: ");

const connect = async (userInput) => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  if (userInput === "1") {
    const name = prompt("name of new customer: ");
    const age = prompt("age of new customer: ");
    console.log(name, age)
    // await runQueries();
    await createCustomer(name, age)
  }

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

connect(choice);
/*------------------------------ Query Functions -----------------------------*/

const createCustomer = async (name, age) => {
  const customerData = {
    name: `${name}`,
    age: parseInt(`${age}`),
  };

  const customer = await Customers.create(customerData);
  console.log("New Customer:", customer);
};

