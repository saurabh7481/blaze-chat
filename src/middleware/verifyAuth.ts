import jwt from "jsonwebtoken";
const config = process.env;

import {User} from "../models";
import UserInt from "../interfaces/user.interface";

import {Request, Response, NextFunction} from "express";

interface RequestBody {
	token: string
}

interface RequestExtended extends Request{
    user: UserInt
}

interface JWT {
    id: number
}

const verifyAuth = async ( req: RequestExtended, res: Response, next: NextFunction ) => {
	const auth = req.cookies as RequestBody;
	if ( !auth.token ) {
		return res.status( 403 ).send( "Unauthorized" );
	}
	try {
		const decode = jwt.verify( auth.token, config.JWT_SECRET) as JWT;
		const user = await User.findByPk( decode.id );
		if( user ) req.user = user;
	} catch ( err ) {
		console.log( err );
		return res.status( 401 ).send( "Invalid Authorization" );
	}
	return next();
};

export default verifyAuth;
