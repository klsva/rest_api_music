import { body, validationResult } from 'express-validator';

export default async (req, res, next) => {
  if (req.path.startsWith('/authors')) {
    await body('name')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Name is empty')
      .run(req);
  }
  if (req.path.startsWith('/songs')) {
    await body('title')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Title is empty')
      .run(req);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  return next();
};
