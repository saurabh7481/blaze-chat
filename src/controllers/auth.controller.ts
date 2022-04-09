import {User} from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {Request, Response} from "express";

interface RequestBody {
    name?: string,
    email: string,
    phnumber?: string,
    password: string
}

export const signUp = async ( req: Request, res: Response ) => {
    const userData = req.body as RequestBody;
	try {
		const user = await User.create( {
			name: userData.name,
			email: userData.email,
			phnumber: userData.phnumber,
			password: bcrypt.hashSync( userData.password, 8 ),
		} );
		if ( user ) {
            const date = new Date();
            date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000))

            const token = jwt.sign( { id: user.id }, process.env.JWT_SECRET);
            res.cookie("token", token, {
                httpOnly: true,
                expires: date
            })

            return res.status(200).json({success: true, message: "Registered!"});
        } else {
            return res.json({success: false, message: "Server error"})
        }
	} catch ( error ) {
		return res.status( 500 ).send( { message: error.message } );
	}
};

export const login = async ( req: Request, res: Response ) => {
    try{
        const userData = req.body as RequestBody;
        const user = await User.findOne( {
            where: {
                email: userData.email
            }
        } );
        if ( !user ) return res.status( 404 ).json( { error: "User does not exists" } );

        const validPass = await bcrypt.compare( userData.password, user.password );
        if ( !validPass ) return res.status( 401 ).json( { error: "Invalid Credentials" } );

        const date = new Date();
        date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000))

        const token = jwt.sign( { id: user.id }, process.env.JWT_SECRET);

        res.cookie( "token", token, {
            httpOnly: true,
            expires: date
        });

        const {  name, email } = user;
        return res.status( 200 ).json( { token, user: {  name, email  } } );
    } catch(err){
        return res.status(500).json({success: false, error: err});
    }
};