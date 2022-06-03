import { Router } from 'express';
import songsController from '../controllers/songs-controller.js';

const router = Router();

router.post('/songs', songsController.create);
router.get('/songs', songsController.getAll);
router.get('/songs/:songId', songsController.getOne);

router.put('/songs/:songId', async (req, res, next) => {
    const payload = {
      id: req.body.authorId,
      name: req.body.name,
    };
    const [err] = await to(update(payload));
    if (err) return next(ERR.CANNOT_UPDATE_SONG);
    return res.status(200).send(SONG_UPDATED);
  }
);

router.delete('/songs/:songId', async (req, res, next) => {
    const { songId } = req.params;
    const [err] = await to(remove(songId));
    if (err) return next(ERR.BAD_REQUEST);
    return res.status(200).send(SONG_DELETED);
  }
);

export default router;