import express, { Application } from "express";
import mainLoader from "./Loaders";

const SUCCESS_MESSAGE = (port) => `
################################################
      🛡️  Server listening on port: ${port} 🛡️
################################################
`;

async function startServer() {
  const app: Application = express();
  const PORT = process.env.PORT || 5000;

  try {
    await mainLoader({ expressApp: app });
    app.listen(PORT, () => {
      console.log(SUCCESS_MESSAGE(PORT));
    });
  } catch (err) {
    throw new Error(err);
  }
}

startServer();
