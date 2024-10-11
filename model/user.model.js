// ! Import seluruh function yang berhubungan dengan JSON data
import Users from '../data/user.json' assert {type: "json"}
import { writeData } from '../utils.js'

export function createUser(user) {
    return new Promise((resolve, reject) => {
      const id = (Users.length + 1).toString();
      const newProduct = { ...user, id: id };
      Users.push(newProduct);
      writeData("data/user.json", Users);
      resolve(newProduct);
    });
  }
  
  export async function findAllUser() {
    return new Promise((resolve, reject) => {
      resolve(Users);
    });
  }
  
  export function findByIdUser(id) {
    return new Promise((resolve, reject) => {
      const product = Users.find((p) => p.id === id);
      resolve(product);
    });
  }
  
  export function updateUser(id, User){
    return new Promise((resolve, reject) => {
      const index = Users.findIndex((u) => u.id === id);
      if (index === -1) {
        reject(new Error("Product not found"));
      } else {
        Users[index] = User;
        writeData("data/user.json", Users);
        resolve(User[index]);
      }
    });
  }
  
  export function removeUser(id){
    return new Promise((resolve, reject) => {
      const index = Users.findIndex((p) => p.id === id);
      if (index === -1) {
        reject(new Error("User not found"));
      } else {
        Users.splice(index, 1);
        writeData("data/user.json", Users);
        resolve();
      }
    });
  }
  