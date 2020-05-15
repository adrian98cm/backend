import "babel-polyfill";
import chalk from 'chalk';
import { ObjectID } from "mongodb";
import { PubSub } from "graphql-yoga";

const Entrada = {
    autor: async (parent, args, ctx, info) => {
        const { client } = ctx;

        const db = client.db("gimnasio");
        const collection = db.collection('users')
    
        const autor = await collection.findOne({_id: parent.autor});

        return autor;
    }
}

export { Entrada as default }

