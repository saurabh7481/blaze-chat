import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

//Routes


app.use( cors() );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.static( path.join( __dirname, "..", "public" ) ) );


const PORT = process.env.PORT || 3000;

// db.sequelize.sync().then( () => {
	
// } );

app.listen( PORT, () => {
  console.log( `Server is running at ${PORT}` );
} );

