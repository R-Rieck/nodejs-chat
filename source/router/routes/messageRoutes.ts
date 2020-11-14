import { Request, Response, Router } from 'express';
import { Message } from '../../types/UserModel';
import { addMessage, deleteMessage } from '../../handlers/messageHandler';

const routes = Router()

routes.get('', (req: Request, res: Response) => {
})

routes.get('/:messageId', (req: Request, res: Response) => {
})

routes.post('', async (req: Request, res: Response) => {
    const message: Message = req.body;

    const infoMessage = await addMessage(message);

    res.send(infoMessage)
})

routes.delete('/:messageId', async (req: Request, res: Response) => {
    const infoMessage = await deleteMessage(req.params.messageId);

    res.send(infoMessage)
})

routes.put('/:messageId', (req: Request, res: Response) => {
    res.send('Update the Message with ID of:' + req.params.userId)
})

export default routes