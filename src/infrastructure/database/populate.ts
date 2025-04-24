import { EntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql";
import * as bcrypt from "bcryptjs";

export const populateDB = async (em: EntityManager<PostgreSqlDriver>) => {
  // Populate roles
  const adminRole = em.create("Role", { name: "Admin" });
  const userRole = em.create("Role", { name: "User" });
  await em.persistAndFlush([adminRole, userRole]);

  // Populate users
  const adminUser = em.create("User", {
    name: "John Doe",
    email: "john.doe@mail.com",
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || "Test123!", 10),
    role: adminRole,
    phone: "1234567890",
    address: "123 Main St",
    country: "USA",
    city: "New York",
    postalCode: "10001",
    state: "NY",
  });
  await em.persistAndFlush(adminUser);

  // Populate categories
  const categories = [
    em.create("Category", { name: "Clothing" }),
    em.create("Category", { name: "Accessories" }),
    em.create("Category", { name: "Books" }),
    em.create("Category", { name: "Art" }),
  ];
  await em.persistAndFlush(categories);

  // Populate products
  const products = [
    em.create("Product", {
      name: "Blue Male T-Shirt",
      description: "A blue T-shirt for men",
      price: 20,
      qty: 50,
      category: categories[0],
    }),
    em.create("Product", {
      name: "Blue Female T-Shirt",
      description: "A blue T-shirt for women",
      price: 20,
      qty: 40,
      category: categories[0],
    }),
    em.create("Product", {
      name: "Indigo Pants",
      description: "A pair of pants of indigo color",
      price: 30,
      qty: 50,
      category: categories[0],
    }),
    em.create("Product", {
      name: "Blue Shorts",
      description: "A pair of shorts of blue color",
      price: 15,
      qty: 50,
      category: categories[0],
    }),
    em.create("Product", {
      name: "Blue Ring",
      description: "A beautiful blue ring",
      price: 10,
      qty: 80,
      category: categories[1],
    }),
    em.create("Product", {
      name: "Blue Necklace",
      description: "A beautiful blue necklace",
      price: 12,
      qty: 50,
      category: categories[1],
    }),
    em.create("Product", {
      name: "Stories of Blue",
      description: "A collection of stories about the color blue",
      price: 15,
      qty: 50,
      category: categories[2],
    }),
    em.create("Product", {
      name: "Indigo Plateau",
      description: "A beautiful art piece of an indigo plateau",
      price: 16,
      qty: 50,
      category: categories[3],
    }),
  ];
  await em.persistAndFlush(products);
};
