import { Router } from 'express';
import authors from './authors.js';
import songs from './songs.js';

const api = Router();

api.use(authors);
api.use(songs);

export default api;