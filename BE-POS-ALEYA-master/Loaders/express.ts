// import swaggerUI from "swagger-ui-express";

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "API";
// import swaggerDocs from "./swagger";

export default ({ app }) => {
  const corsOption = {
    credentials: true,
    // origin: ["http://localhost:3000", "http://localhost:3001"],
  };

  app.use(bodyParser.json({ limit: process.env.MAX_REQUEST_SIZE }));

  app.enable("trust-proxy");
  app.use(cors(corsOption));

  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(process.env.API_PREFIX, routes());

  // app.use(
  //   process.env.DOCS_PREFIX
  //   swaggerUI.serve
  //   swaggerUI.setup(swaggerDocs)
  // );

  app.use(cookieParser());

  app.use("/uploads", express.static("uploads"));
};
