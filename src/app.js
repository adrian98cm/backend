import "babel-polyfill";
import chalk from 'chalk';
import uuidv4 from 'uuid/v4';
import { GraphQLServer, PubSub } from "graphql-yoga";
import { MongoClient, ObjectID } from "mongodb";

import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Entrada from './resolvers/Entrada'
import Subscription from './resolvers/Subscription'

const usr = "adrian";
const pwd = "12345";
const url = "server1-zlr9p.mongodb.net/test?retryWrites=true&w=majority";

/**
 * Connects to MongoDB Server and returns connected client
 * @param {string} usr MongoDB Server user
 * @param {string} pwd MongoDB Server pwd
 * @param {string} url MongoDB Server url
 */

const connectToDb = async function (usr, pwd, url) {
  const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await client.connect();
  return client;
};

/**
 * Starts GraphQL server, with MongoDB Client in context Object
 * @param {client: MongoClient} context The context for GraphQL Server -> MongoDB Client
 */

const runGraphQLServer = function (context, pubsub, a) {

  const resolvers = {
    Query,
    Mutation,
    User,
    Entrada,
    Subscription,

  }

  const server = new GraphQLServer({ 
    typeDefs: './src/schema.graphql', 
    resolvers, 
    context
  });

  const options = { port: 8000 };

  try {
    server.start(options, ({ port }) => {
      console.log(chalk.bgGreen.black("\n--------------------------"))
      console.log(chalk.bgGreen.black(`Server started PORT: ${port}.`))
      console.log(chalk.bgGreen.black("--------------------------\n"))
    });
  } catch (e) {
    console.info(e);
    server.close();
  }
};

const runApp = async function() {
  const client = await connectToDb(usr, pwd, url);
  const pubsub = new PubSub()

  console.log(chalk.bgYellow.black("\nConnect to Mongo DB"));
  try {
    runGraphQLServer({ client, pubsub });
  } catch (e) {
    console.info(e);
    client.close();
  }
};

runApp();