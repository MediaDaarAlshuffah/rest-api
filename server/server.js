import http, { get } from "http";
import { getProducts, getProduct, createProduct, updateProduct, removeProduct } from "../controller/product.control.js";
import { getUser, getUsers, updateNewUser, createNewUser, removeNewUser } from "../controller/user.control.js";

export const server = http.createServer((req, res) => {
  if (req.url === "/api/izin" && req.method === "GET" || req.url === "/api/izin/" && req.method === "GET") {
    getProducts(req, res);
  }
  else if(req.url === "/api" && req.method === "GET"){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h1 class='text-2xl m-5'>API</h1><script src='https://cdn.tailwindcss.com'></script>");
    res.end("<ul class='m-5'><li><a href='/api/products'>- Products</a></li></ul>");
  }
  else if(req.url.match(/\/api\/izin\/([0-9]+)/) && req.method === "GET"){
    const id = req.url.split("/")[3];
    getProduct(req, res, id)
  }else if(req.url === '/api/izin' && req.method === 'POST' || req.url === '/api/izin/' && req.method === 'POST'){
    createProduct(req, res);
  }else if(req.url.match(/\/api\/izin\/([0-9]+)/) && req.method === "PUT"){
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  }
  else if(req.url.match(/\/api\/izin\/([0-9]+)/) && req.method === "DELETE"){
    const id = req.url.split("/")[3];
    removeProduct(req, res, id);
  }else if (req.url === "/user/" && req.method === "GET" || req.url === "/user" && req.method === 'GET'){
    getUsers(req, res)
  }else if (req.url.match(/\/user\/([0-9]+)/) && req.method === "GET"){
    const id = req.url.split("/")[2];
    getUser(req, res, id)
  }else if(req.url === '/user' && req.method === 'POST' || req.url === '/user/' && req.method === 'POST'){
    createNewUser(req, res);
  }else if(req.url.match(/\/user\/([0-9]+)/) && req.method === "PUT"){
    const id = req.url.split("/")[2];
    updateNewUser(req, res, id);
  }
  else if(req.url.match(/\/user\/([0-9]+)/) && req.method === "DELETE"){
    const id = req.url.split("/")[2];
    removeNewUser(req, res, id);
  }
    else{
     if(req.method === 'GET'){
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: "Gak Ada Aplikasi"}));
     }else if(req.method === 'POST'){
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: "Gak Bisa Post"}));
     }else if(req.method === 'PUT'){
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: "Tidak Bisa Mengupdate Aplikasi"}));
     }else if(req.method === 'DELETE'){
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: "Tidak Bisa Menghapus Aplikasi"}));
     }
  }
});
