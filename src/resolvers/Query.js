import "babel-polyfill";
import chalk from 'chalk';
import { ObjectID } from "mongodb";

const Query = {
    test: () => {
        console.log(chalk.blue(`------------------------`))
        console.log(chalk.blue(`REQUEST MADE TO 'test'`))
        console.log(chalk.blue(`------------------------`))

        return 'ok'
    },


    getEntradas: async (parent, args, ctx, info) => {
        const { client, pubsub } = ctx
        const db = client.db("gimnasio");
        const usersCollection = db.collection('users');
        const entradasCollection = db.collection('entradas');

        const { email, token } = args;
        const user = await usersCollection.findOne({email});
        let entradas;
        if(user && user.token === token){
            entradas = await entradasCollection.find().toArray();
        }else{
            throw new Error (`Not logged`);

        }
        return entradas;
    },


    getEntradasAutor: async (parent, args, ctx, info) => {
        const { client, pubsub } = ctx
        const db = client.db("gimnasio");
        const usersCollection = db.collection('users');
        const entradasCollection = db.collection('entradas');

        const { email, token } = args;
        const user = await usersCollection.findOne({email});

        let entradas;
        if(user && user.token === token){
            entradas = await entradasCollection.find({autor:ObjectID(user._id)}).toArray();
        }else{
            throw new Error (`Not logged`);

        }
        return entradas;
    },

    getEntradaEspecifica: async (parent, args, ctx, info) => {
        const { client, pubsub } = ctx
        const db = client.db("gimnasio");
        const usersCollection = db.collection('users');
        const entradasCollection = db.collection('entradas');

        const { titulo, email, token } = args;
        const user = await usersCollection.findOne({email});
        let entradas;
        if(user && user.token === token){
            entradas = await entradasCollection.find({titulo:titulo}).toArray();
        }else{
            throw new Error (`Not logged`);

        }
        return entradas;
    }
}

export {Query as default}