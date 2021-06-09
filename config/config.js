require("dotenv").config(); //instatiate environment variables

const CONFIG = {
  //Make this global to use all over the application

  app: process.env.APP || "dev",
  port: process.env.PORT || "3000",

  db_dialect: process.env.DB_DIALECT || "mongodb",
  db_host: process.env.DB_HOST || "localhost",
  db_port: process.env.DB_PORT || "27017",
  db_name: process.env.DB_NAME || "Prac_task_db",

};
module.exports = CONFIG;
