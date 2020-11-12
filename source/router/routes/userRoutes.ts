import { Request, Response, Router } from 'express';
import { User } from '../../types/UserModel';
import { addUser, deleteUser, getUserById, updateUser } from '../../handlers/userHandler';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('You can\'t get all users. Try to retrieve with as single userId instead.')
})

router.get('/:userId', async (req: Request, res: Response) => {
    const user = await getUserById(req.params.userId);

    res.send(user)
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

router.put('/:userId', async (req: Request, res: Response) => {
    const user: User = req.body;

    const infoMessage = await updateUser(user, req.params.userId);

    res.send(infoMessage)
})

export default router