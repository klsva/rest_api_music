import { Router } from 'express';
import to from 'await-to-js';

const router = Router();

const mockData = [
  {
    id: 4,
    author_id: 2,
    name: 'Song Title',
  },
];

router.get('/songs', async (req, res, next) => {
  const promise = Promise.resolve(mockData);
  const [err, list] = await to(promise);
  if (err) return next(ERR.BAD_REQUEST);
  return res.status(200).send(list);
});

router.post('/songs', async (req, res, next) => {
    const payload = {
      author_id: req.body.autorId,
      name: req.body.name
    };
    const [err, song] = await to(create(payload));
    if (err) return next(ERR.CANNOT_CREATE_SONG);
    return res.status(201).send(song);
  }
);

router.get('/songs/:songId', async (req, res, next) => {
    const id = req.params.songId;
    const [err, song] = await to(findById(id));
    if (err) return next(ERR.BAD_REQUEST);
    return res.status(200).send(song);
  }
);

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