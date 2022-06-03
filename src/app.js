import express from 'express';
import apiRouter from './routes/index.js';
import sequelize from './db/db.js';
import cors from 'cors';
import {Author, Song} from './db/models/models.js';

const app = express();
let server;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
