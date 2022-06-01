import express from 'express';
import apiRouter from './routes/index.js';

const app = express();
let server;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

//server
export default {
  async start(port) {
    server = app.listen(port, () => {
      console.log(`Server is listening on ${port} port`);
    });

    // await db.connect();
    // await dbMigration.update();
    // await dbSync.syncDbAuthTokens();

    return server;
  },

  async stop() {
    console.log(`\nTrying to close the server..\n`);
    
    //await db.disconnect();

    return server.close();
  },
};
