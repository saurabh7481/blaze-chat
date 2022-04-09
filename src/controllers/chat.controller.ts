import { Chat, User } from "../models";
import {Request, Response} from "express";
import UserInt from "../interfaces/user.interface";
import {Op} from "sequelize";

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

export const getChats = async (req: RequestExtended, res: Response) => {
    const lastChatId = Number(req.query.lastchatid);
    try{
        let chats;
        if(lastChatId === 0){
            chats = await Chat.findAll();
        } else {
            chats = await Chat.findAll({
                where: {
                    id: {
                        [Op.gt]: lastChatId
                    }
                }
            })
        }
        if(chats){
            return res.status(200).json({success: true, chats: chats});
        } else {
            return res.status(401).json({success: false, message: "Something went wrong"});
        }
    } catch(err){
        return res.status(500).json({success: false, message: "Cannot send the message"});
    }
}