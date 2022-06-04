import express from 'express';
import apiRouter from './routes/index.js';
import sequelize from './db/db.js';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {Author, Song} from './db/models/models.js';

const app = express();
let server;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logger/access.log'), { flags: 'a' })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//logger
morgan.token('body', req => JSON.stringify(req.body));
app.use(morgan(':remote-addr :date[web] :method :url :status :body', { stream: accessLogStream }));
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

//routes
app.use('/api', apiRouter);

//server
export default {
  async start(port) {
    try {
      server = app.listen(port, () => {
        console.log(`Server is listening on ${port} port`);
      });

      // connect and check db
      await sequelize.authenticate();
      await sequelize.sync();
      return server;
    } catch(err){
      console.log(err);
    }  
  },

  async stop() {
    console.log(`\nTrying to close the server..\n`);

    //disconnect db
    await sequelize.close()
    return server.close();
  },
};
