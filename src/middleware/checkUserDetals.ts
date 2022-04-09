import {User} from "../models";
import {Request, Response, NextFunction} from "express";

interface RequestBody {
    email: string
}

const checkUserDetails = async ( req: Request, res: Response, next: NextFunction ) => {
    const userData = req.body as RequestBody;
	try {
		let user = await User.findOne( {
			where: {
				email: userData.email
			}
		} );
		if ( user ) {
			return res.status( 400 ).json( {
				message: "Email is taken, try something else!"
			} );
		}
		return next();
	} catch ( error ) {
		return res.status( 500 ).json( {
			message: "Oops! Something went wrong. Try again later"
		} );
	}
};

export default checkUserDetails;