import "babel-polyfill";
import chalk from 'chalk';
import { ObjectID } from "mongodb";
import { PubSub } from "graphql-yoga";

const User = {
    entradas: async (parent, args, ctx, info) => {
        const { client } = ctx

        const db = client.db("gimnasio");
        const collection = db.collection('entradas');
       
        const entradas = await collection.find({autor: ObjectID(parent._id)}).toArray();
        return entradas;
    }
}

export { User as default }