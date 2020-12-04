import multer from 'multer'
import { Request, Response, Router } from 'express';
import { User } from '../../types/UserModel';
import { addUser, deleteUser, getUserById, updateUser, validateUser, updateAvatar, updateContacts, getUserByName, getContacts } from '../../handlers/userHandler';

const router = Router();
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: any) => {
        cb(null, 'uploads')
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage })

router.get('/', (req: Request, res: Response) => {
    res.send('You can\'t get all users. Try to retrieve with as single userId instead.')
})

router.get('/user/:userId', async (req: Request, res: Response) => {
    const user = await getUserById(req.params.userId);

    res.send(user)
})

router.get('/getContacts/:userId', async (req: Request, res: Response) => {
    const user: any = await getContacts(req.params.userId);

    if (user !== false)
        res.send(user[0].contacts)
    else 
        res.send(user)
})

router.post('/getUserByName', async (req: Request, res: Response) => {
    const user = await getUserByName({ ...req.body });

    res.send(user)
})

router.post('/login', async (req: Request, res: Response) => {
    const user = await validateUser({ ...req.body });
    
    res.json(user)
})

router.post('/', async (req: Request, res: Response) => {
    const user: User = req.body;

    const infoMessage = await addUser(user);

    res.send(infoMessage)
})

router.post('/uploadAvatar/:userId', upload.single('profilePicture'), async (req: Request, res: Response) => {
    const infoMessage = await updateAvatar(req.file, req.params.userId);

    res.send(infoMessage)
})

router.post('/add/:userId', async (req: Request, res: Response) => {
    const infoMessage = await updateContacts(req.params.userId, { ...req.body });

    res.send(infoMessage);
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