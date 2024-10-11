import {create,findAll,update, findById, remove } from "../model/product.model.js";
import { getPostData } from "../utils.js";

export async function getProducts(req, res) {
    try {
        const products = await findAll();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(products));
        }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getProduct(req, res, id) {
    try {
        if (!id) {
            res.status(400).json({ error: "Bad request" });
        }else{
            const product = await findById(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(product));
    }
    }
    catch (err) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: err.message}));    
    }
}

export async function createProduct(req, res) {
    try {
        const body = await getPostData(req, res);
        const {nama, kelas, keterangan, izin, tiba} = JSON.parse(body);
        const product = {
                nama, 
                kelas, 
                keterangan, 
                izin, 
                tiba,
            };

            const newProduct = await create(product);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newProduct));
    } catch (error) {
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}

export async function updateProduct(req, res, id) {
    try {
        const product = await findById(id);
        if (!product) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "Product not found"}));
        }else{
            const body = await getPostData(req, res);
            const {nama, kelas, keterangan, tiba, izin} = JSON.parse(body);
            const newProduct = {
                nama: nama || product.nama, 
                kelas: kelas || product.kelas, 
                keterangan: keterangan || product.keterangan,
                izin: izin || product.izin,
                tiba: tiba || product.tiba,
                id:  product.id
            };

            const updProduct = await update(id, newProduct);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(newProduct));
        }
    } catch (error) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}

export async function removeProduct(req, res, id) {
    try {
        const product = await findById(id);
        if (!product) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "Product not found"}));
        }else{
            const delProduct = await remove(id);
            res.writeHead(204, {"Content-Type": "application/json"});
            res.end();
        }
    } catch (error) {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: error.message}));
    }
}