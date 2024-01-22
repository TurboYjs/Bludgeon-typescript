import express from "express";
import {expressServer} from "./app";

const sth = new expressServer(express());

sth.run();