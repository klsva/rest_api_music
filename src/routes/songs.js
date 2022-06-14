import { Router } from 'express';
import songsController from '../controllers/songs-controller.js';
import sanitizeRequests from '../middlewares/sanitize-request.js';

const router = Router();

router.post('/songs', sanitizeRequests, songsController.create);
router.get('/songs', songsController.getAll);
router.get('/songs/:id', songsController.getOne);
router.put('/songs/:id', sanitizeRequests, songsController.update);
router.delete('/songs/:id', songsController.delete);

export default router;