import { createUser, updateUser, removeUser, findAllUser, findByIdUser } from "../model/user.model.js";
import { getPostData } from "../utils.js";

export async function getUsers(req, res) {
    try {
        const User = await findAllUser();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(User));
        }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getUser(req, res, id) {
    try {
        if (!id) {
            console.log("halo")
        }else{
            const User = await findByIdUser(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(User));
    }
    }
    catch (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: err.message}));    
    }
}

export async function createNewUser(req, res) {
    try {
        const body = await getPostData(req, res);
        const {username, name, password} = JSON.parse(body);
        const user = {
                username,
                name,
                password
            };

            const newUser = await createUser(user);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newUser));
    } catch (error) {
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}

export async function updateNewUser(req, res, id) {
    try {
        const user = await findByIdUser(id);
        if (!user) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "User not found"}));
        }else{
            const body = await getPostData(req, res);
            const {username, nama, password} = JSON.parse(body);
            const newUser = {
                username: username || user.username, 
                nama: nama || user.nama, 
                password: password || user.password,
                id: user.id
            };

            const updProduct = await updateUser(id, newUser);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newUser));
        }
    } catch (error) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}

export async function removeNewUser(req, res, id) {
    try {
        const user = await findByIdUser(id);
        if (!user) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "User not found"}));
        }else{
            const delUser = await removeUser(id);
            res.writeHead(204, {"Content-Type": "application/json"});
            res.end();
        }
    } catch (error) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}