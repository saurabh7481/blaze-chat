import { User } from "../models";
import {Request, Response} from "express";
import UserInt from "../interfaces/user.interface";

interface User {
    createChat: Function,
}

interface RequestExtended extends Request{
    user:UserInt,
    createChat: User
}

interface ChatBody {
    message: String
}

export const addChat =async (req: RequestExtended, res: Response) => {
    try{
        const body = req.body as ChatBody;
        const user = req.user as User;
        const chat = await user.createChat({
            message: body.message
        })
        if(chat){
            return res.status(200).json({success: true});
        } else {
            return res.status(401).json({success: false, message: "Something went wrong"});
        }
    } catch(err){
        return res.status(500).json({success: false, message: "Cannot send the message"});
    }
}