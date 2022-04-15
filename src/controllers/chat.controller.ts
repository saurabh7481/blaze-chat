// @ts-nocheck
import { Chat, User } from "../models";
import {Request, Response} from "express";
import UserInt from "../interfaces/user.interface";
import {Op} from "sequelize";
import AWS from "aws-sdk";
import fs from "fs";

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
    let groupId = Number(req.query.groupid);
    if(!groupId){
        groupId = 0
    }
    try{
        let chats;
        if(lastChatId === 0){
            chats = await Chat.findAll({
                where: {
                    group: groupId
                }
            });
        } else {
            
                chats = await Chat.findAll({
                    where: {
                        id: {
                            [Op.gt]: lastChatId
                        },
                        group: groupId
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

export const uploadFile = async (req, res) => {
    try{
        const user = req.user as User;
        const name = `File-${new Date()}`
        const file = req.file;
        console.log(file);
        const url  = await upoloadToS3(file, name);
        console.log(url);
        const chat = await user.createChat({
            message: `File link - ${url}`
        })
        if(chat){
            return res.status(200).json({success: true});
        } else {
            return res.status(401).json({success: false, message: "Something went wrong"});
        }

    } catch(err){
        return res.status(500).json({success: false, message: "Cannot send file"});
    }
}

const upoloadToS3 = ( file: string, name: string ) => {
	const s3 = new AWS.S3( {
		accessKeyId: process.env.IAM_USERID,
		secretAccessKey: process.env.IAM_SECRET,
	} );

    const fileStream = fs.createReadStream(file.path);

	const params: any = {
		Bucket: process.env.S3_BUCKET,
		Key: name,
		Body: fileStream,
		ACL: "public-read",
	};

	return new Promise( ( resolve, reject ) => {
		s3.upload( params, ( err: object, data: any ) => {
			if ( err ) {
				reject( err );
			}
			resolve( data.Location );
		} );
	} );
};