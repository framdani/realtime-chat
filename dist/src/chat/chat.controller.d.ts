import { ChatService } from './chat.service';
import { message } from './gateway/message.entity';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    getAllMessageByRoomId(roomid: number): Promise<message[]>;
}
