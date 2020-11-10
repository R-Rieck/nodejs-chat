import { Request, Response, Router } from 'express';
import { Message } from '../../types/UserModel';
import { addMessage, deleteMessage } from '../../handlers/messageHandler';

const routes = Router()

routes.get('', (req: Request, res: Response) => {
})

routes.get('/:messageId', (req: Request, res: Response) => {
})

routes.post('', (req: Request, res: Response) => {
    const message: Message = req.body;

    const infoMessage = addMessage(message);

    res.send(infoMessage)
})

routes.delete('/:messageId', (req: Request, res: Response) => {
    const infoMessage = deleteMessage(req.params.userId);

    res.send(infoMessage)
})

routes.put('/:messageId', (req: Request, res: Response) => {
    res.send('Update the Message with ID of:' + req.params.userId)
})

export default routes