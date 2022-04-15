// @ts-nocheck
import { Group, GroupUser, User } from "../models";
import {Request, Response} from "express";

// interface CreateRequestBody {
//     name: string,
//     adminId: number
// }

// interface AddRequestBody {
//     email: string
// }

// interface RequestExtended extends Request{
//     user? : typeof User
// }

export const createGroup = async (req, res) => {
    try{
        // const body = req.body as CreateRequestBody;
        const group = await Group.create({
            name: req.body.name
        });

        if(group){
            group.addUser(await User.findByPk(req.user.id), {through: {isAdmin: true}});
            return res.status(200).json({success: true, message: "Group created"});
        } else {
            return res.status(401).json({success: false, message: "Something went wrong"});
        }
    } catch(err){
        return res.status(500).json({success: false, message: "Server error"});
    }
}

export const getGroups = async (req, res) => {
    try{
        const groups = [];
        const groupusers = await GroupUser.findAll({
            where: {
                userId: req.user.id
            }
        });
        await Promise.all(
                groupusers.map(async groupuser => {
                    const group = await Group.findByPk(groupuser.groupId);
                    groups.push({
                        id: group.id,
                        name: group.name
                    });
                    console.log("Inside: ",groups);
                })
        );
        console.log("outside: " ,groups);
        return res.status(200).json({success: true, groups:  groups});
    } catch(err) {
        return res.status(500).json({success: false, err: err});
    }
};

export const addUser = async (req, res) => {
    try{
        // const body = req.body as AddRequestBody;
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        const group = await Group.findByPk(req.body.groupid);
        const added = await group.addUser(user);
        

        return res.status(200).json({success: true, message: "User added"});
    } catch(err){
        return res.status(500).json({success: false, err: err});
    }
}

export const removeUser = async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        const group = await Group.findByPk(req.body.groupid);
        await group.removeUser(user);

        return res.status(200).json({success: true, message: "User removed"});
    } catch(err){
        return res.status(500).json({success: false, err: err});
    }
}

export const makeAdmin = async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        const group = await Group.findByPk(req.body.groupid);
        if(await group.hasUser(user)){
            // const adUser = await group.getUsers({where: {id: user.id}});
            // adUser[0].groupuser.isAdmin = true;
            // console.log(adUser[0].groupuser.isAdmin);
            await group.addUser(user, {through: {isAdmin: true}});
            return res.status(200).json({success: true, message: "Admin added"});
        } else {
            return res.status(401).json({success: false, message: "User not in the group"});
        }
    } catch(err){
        return res.status(500).json({success: false, err: err});
    }
}

export const addChat = async (req, res) => {
    try{
        const chat = await req.user.createChat({
            message: req.body.message,
            group: req.body.groupId
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