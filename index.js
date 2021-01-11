import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// db connection

// mongoose.Promise = global.Promise
// const dbUrl = 'mongodb://localhost/dbsistema'
// mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true })
//     .then(
//         mongoose => console.log(`Conectado a la bd en el puerto ${mongoose}`)
//     ).catch(
//         err => console.log(err)
//     )

console.log("Conecting to database...");
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("dbMEVN connection successful"))
  .catch((e) => console.log(e));

app.use("/api", router);
app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Server running in port ${app.get("port")}`);
  console.log(path.join(__dirname, "public"));
});
