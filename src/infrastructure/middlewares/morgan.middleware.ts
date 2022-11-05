
import { Application } from "express";
import { StreamOptions } from "morgan";
import morganbody from "morgan-body";
import { logger } from "../logger/logger.config";

const stream = {
  write: (message: string) => Boolean(logger.http(message.trim())),
};

export default (app: Application) => morganbody(app, { 
  stream,
  maxBodyLength: 250,
  logReqDateTime: false,
  logReqUserAgent: false,
  logIP: false,
  logAllReqHeader: true,
  filterParameters: ['password'],
  noColors: true,
 });