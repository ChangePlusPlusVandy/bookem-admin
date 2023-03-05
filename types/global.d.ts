import { Connection } from 'mongoose';

declare global {
  var mongoose: any;
}

export const mongoose = global.mongoose || new Connection();

if (process.env.NODE_ENV !== 'production') global.mongoose = mongoose;
