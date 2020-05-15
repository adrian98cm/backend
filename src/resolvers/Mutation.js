import "babel-polyfill";
import chalk from 'chalk';
import { ObjectID } from "mongodb";
import { PubSub } from "graphql-yoga";
import uuid from "uuid";

const Mutation = {

    addUser: async (parent, args, ctx, info) => {
        const { client } = ctx
        const db = client.db("gimnasio");
        const collection = db.collection('users');

        const { email, password, autor } = args;

        if (await collection.findOne({ email })) throw new Error(`${email} already exists`);

        const result = await collection.insertOne({
            email,
            password,
            autor, //Variable que indica si es autor o no
        });
        return result.ops[0];
    },

    login: async (parent, args, ctx, info) => {
        const { client } = ctx
        const db = client.db("gimnasio");
        const collection = db.collection('users');

        const { email, password } = args;
        const token = uuid.v4();

        const user = await collection.findOne({ email });
        if (user && user.password === password) {
            await collection.updateOne({ _id: ObjectID(user._id) }, { $set: { token } });

        } else {
            throw new Error(`Email or password incorrect`)
        }

        setTimeout(() => {
            collection.findOneAndUpdate({ email }, { $set: { token: null } });
        }, 1800000)  //Nuestra sesión se termina automáticamente pasados 30 minutos

        return token;

    },

    logout: async (parent, args, ctx, info) => {
        const { client } = ctx
        const db = client.db("gimnasio");
        const collection = db.collection('users');

        const { email, token } = args;
        const user = await collection.findOneAndUpdate({ email }, { $set: { token: null } });
        if (!user) throw new Error('Not logout');
        return token;

    },

    addEntrada: async (parent, args, ctx, info) => {
        const { client, pubsub } = ctx
        const db = client.db("gimnasio");
        const usersCollection = db.collection('users');
        const entradasCollection = db.collection('entradas');

        const { titulo, descripcion, email, token } = args;

        const user = await usersCollection.findOne({ email });
        let result;

        if (user.autor === 1) {   //Comprueba si es autor para poder crear entradas
            if (user && user.token === token) {

                result = await entradasCollection.insertOne({ titulo, descripcion, autor: ObjectID(user._id) });

            } else {
                throw new Error(`Session caducated, login again`)

            }

        } else {
            throw new Error(`This user is not Author`)
        }


        pubsub.publish(
            user._id, {
            authorSubscribe: {
                _id: result.ops[0]._id,
                titulo,
                descripcion,
                autor: user._id
            }
        }
        )


        return {
            _id: result.ops[0]._id,
            titulo,
            descripcion,
            autor: user._id
        }

    },

    removeUser: async (parent, args, ctx, info) => {
        const { client } = ctx
        const db = client.db("gimnasio");
        const usersCollection = db.collection('users');
        const entradasCollection = db.collection('entradas');

        const { email, token } = args;
        const user = await usersCollection.findOne({ email });
        if (user && user.token === token) {
            await entradasCollection.deleteMany({ autor: ObjectID(user._id) });
            await usersCollection.deleteOne({ _id: ObjectID(user._id) });

        } else {
            throw new Error(`User doesn't exists`)
        }
        return user;

    },

    deleteEntrada: async (parent, args, ctx, info) => {
        const { client } = ctx
        const db = client.db("gimnasio");
        const usersCollection = db.collection('users');
        const entradasCollection = db.collection('entradas');

        const { titulo, email, token } = args;

        const user = await usersCollection.findOne({ email });
        const entrada = await entradasCollection.findOne({ titulo });

        if (user && user.token === token) {

            if (entrada.autor === user._id) {
                await entradasCollection.deleteOne({ _id: entrada._id });
            } else {
                throw new Error(`La entrada no pertenece al usuario`)
            }

        } else {
            throw new Error(`Not logged`)
        }

        return entrada;
    }


}

export { Mutation as default }