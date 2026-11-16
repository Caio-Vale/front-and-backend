import { Router } from 'express';
import { getTarefas, postTarefa, patchTarefa, deleteTarefa } from '../controllers/tarefaController.js';

const router = Router();

router.get('/tarefas', getTarefas);
router.post('/tarefas', postTarefa);
router.patch('/tarefas/:id', patchTarefa);
router.delete('/tarefas/:id', deleteTarefa);

export default router;
