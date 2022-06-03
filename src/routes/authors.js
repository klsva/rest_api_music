import { Router } from 'express';
import authorController from '../controllers/authors-controller.js';

const router = Router();

router.post('/authors', authorController.create);
router.get('/authors', authorController.getAll);
router.get('/authors/:id', authorController.getOne);
router.put('/authors/:id', authorController.update);
router.delete('/authors/:id', authorController.delete);

export default router;