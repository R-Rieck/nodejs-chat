import { Request, Response, Router } from 'express';
import { User } from '../../types/UserModel';
import { addUser, deleteUser } from '../../handlers/userHandler';

const router = Router();

router.get('/', (req: Request, res: Response) => {
})

router.get('/:userId', (req: Request, res: Response) => {
})

router.post('/', async (req: Request, res: Response) => {
    const user: User = req.body;

    const infoMessage = await addUser(user);

    res.send(infoMessage)
})

router.delete('/:userId', async (req: Request, res: Response) => {
    const infoMessage = await deleteUser(req.params.userId);

    res.send(infoMessage)
})

router.put('/:userId', (req: Request, res: Response) => {
    res.send('Update the User with ID of:' + req.params.userId)
})

export default router