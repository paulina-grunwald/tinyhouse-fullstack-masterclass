require("dotenv").config();
import express, { Application } from 'express';
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from './database/index';
import {typeDefs, resolvers} from './graphql'

const port = process.env.PORT;


const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  });

  app.listen(port);
  console.log(`[app]: http://localhost:${port}`);
  const listings = await db.listings.find({}).toArray();
  console.log(listings);
}

mount(express())


