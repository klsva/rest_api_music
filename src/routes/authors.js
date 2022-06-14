import { Router } from 'express';
import authorController from '../controllers/authors-controller.js';
import sanitizeRequests from '../middlewares/sanitize-request.js';

const router = Router();

router.post('/authors', sanitizeRequests, authorController.create);
router.get('/authors', authorController.getAll);
router.get('/authors/:id', authorController.getOne);
router.put('/authors/:id', sanitizeRequests, authorController.update);
router.delete('/authors/:id', authorController.delete);

export default router;