import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { User } from "./models/User";
import fs from "fs";
import express from "express";
import mongoose from "mongoose";
require("dotenv").config();

const schemas = [];
const folders = fs.readdirSync("./modules");
folders.forEach(folder => {
  const resolvers = require(`./modules/${folder}/resolvers`);
  const typeDefs = importSchema(`./modules/${folder}/schema.graphql`);

  schemas.push(makeExecutableSchema({ typeDefs, resolvers }));
});

const server = new ApolloServer({
  schema: mergeSchemas({ schemas })
});

const password = process.env.DBPSSWD;

mongoose
  .connect(
    `mongodb://St3lu:${password}@ds145484.mlab.com:45484/speak_code`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to DB");
    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
