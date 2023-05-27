import mysql from "mysql2/promise";

export const connectDB = async () => {
  try {
    const conn = await mysql.createConnection({
      host: "127.0.0.1",
      user: "admin",
      password: "admin",
      database: "itfip",
    });

    console.log("Database Connected");
    return conn;
  } catch (error) {
    console.error(error);
  }
};
