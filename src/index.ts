import app from "./app";
import initOrm from "./infrastructure/orm";
import { Product } from "./modules/product/product.entity";

const main = async () => {
  const PORT = process.env.PORT || 3000;

  const orm = await initOrm();
  const em = orm.em.fork();

  const product = new Product();
  product.name = "Product 1";
  product.qty = 10;
  product.price = 100;
  product.description = "This is product 1";

  em.persist(product).flush();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  const shutdown = () => {
    console.log("\nGraceful shutdown initiated...");

    server.close(() => {
      console.log("Closed out remaining connections.");
      process.exit(0);
    });

    setTimeout(() => {
      console.error("Forcing shutdown due to timeout.");
      process.exit(1);
    }, 5000);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

module.exports = app;
