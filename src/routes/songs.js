import { Router } from 'express';
import songsController from '../controllers/songs-controller.js';

const router = Router();

router.post('/songs', songsController.create);
router.get('/songs', songsController.getAll);
router.get('/songs/:id', songsController.getOne);
router.put('/songs/:id', songsController.update);
router.delete('/songs/:id', songsController.delete);

export default router;