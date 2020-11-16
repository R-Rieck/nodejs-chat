import { Request, Response, Router } from 'express';
import { Message } from '../../types/UserModel';
import { addMessage, deleteMessage, getMessagesFromUser, getSingleMessage, updateMessage } from '../../handlers/messageHandler';
import message from '../../database/models/message';

const routes = Router()

routes.get('/getAll/:userId', async (req: Request, res: Response) => {
    const messages: Message[] = await getMessagesFromUser(req.params.userId)

    res.json(messages);
})

routes.get('/:messageId', async (req: Request, res: Response) => {
    const message = await getSingleMessage(req.params.messageId)

    res.send(message);
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

routes.put('/:messageId', async (req: Request, res: Response) => {
    const inputMsg: Message = req.body;

    const message: Message = await updateMessage(inputMsg, req.params.messageId);

    res.send(message)
})

export default routes