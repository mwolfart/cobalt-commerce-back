import { RequestContext } from "@mikro-orm/postgresql";
import app from "./app";
import getDB from "./infrastructure/database/db";

const main = async (initialize: boolean = false) => {
  const PORT = process.env.PORT || 3000;

  const {orm, em} = await getDB(initialize);

  app.use((req, res, next) => RequestContext.create(em, next));

  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  const shutdown = async () => {
    console.log("\nGraceful shutdown initiated...");

    await server.close(() => {
      console.log("Closed out remaining connections.");
      process.exit(0);
    });
    await orm.close();

    setTimeout(() => {
      console.error("Forcing shutdown due to timeout.");
      process.exit(1);
    }, 5000);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

const initialize = process.argv.includes('--initialize');
main(initialize).catch((err) => {
  console.error(err);
  process.exit(1);
});

module.exports = app;
