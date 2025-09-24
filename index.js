const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./ServerLayer/routes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./ServerLayer/swagger")));
app.use(express.json());
app.use(routes);


const init = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

   await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

init();