import app from "./app";
import config from "./config";

app.listen(config.PORT);
console.log("Server on port ", config.PORT);
