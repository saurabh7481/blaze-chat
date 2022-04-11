import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { dbConfig } from "./models";

dotenv.config();

const app = express();

//Routes
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import groupRoutes from "./routes/group.routes";

app.use( cors() );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.static( path.join( __dirname, "..", "public" ) ) );

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/groups", groupRoutes);


const PORT = process.env.PORT || 3000;

dbConfig.sync().then( () => {
	app.listen( PORT, () => {
    console.log( `Server is running at ${PORT}` );
  } );
} );


