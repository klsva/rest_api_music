import { Router } from 'express';
import to from 'await-to-js';

const router = Router();

const mockData = [
  {
    id: 4,
    name: 'Author Name',
  },
];

router.get('/authors', async (req, res, next) => {
  const promise = Promise.resolve(mockData);
  const [err, list] = await to(promise);
  if (err) return next(ERR.BAD_REQUEST);
  return res.status(200).send(list);
});

router.post('/authors', async (req, res, next) => {
    const payload = {
      name: req.body.name
    };
    const [err, author] = await to(create(payload));
    if (err) return next(ERR.CANNOT_CREATE_AUTHOR);
    return res.status(201).send(author);
  }
);

router.get('/authors/:authorId', async (req, res, next) => {
    const promise = Promise.resolve(mockData);
    const [err, author] = await to(promise);
    if (err) return next(ERR.BAD_REQUEST);
    return res.status(200).send(author);
  }
);

router.put('/authors/:authorId', async (req, res, next) => {
    const payload = {
      id: req.params.authorId,
      name: req.body.name,
    };
    const [err] = await to(update(payload));
    if (err) return next(ERR.CANNOT_UPDATE_AUTHOR);
    return res.status(200).send(AUTHOR_UPDATED);
  }
);

router.delete('/authors/:authorId', async (req, res, next) => {
    const { authorId } = req.params;
    const promise = Promise.resolve(authorId);
    const [err] = await to(promise);
    if (err) return next(ERR.BAD_REQUEST);
    return res.status(200).send(AUTHOR_DELETED);
  }
);

export default router;