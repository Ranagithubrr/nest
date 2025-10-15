import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
    constructor() { }

    getAllMessages() {
        return `This action returns all messages `;
    }

    createMessage(createMessageDto: CreateMessageDto) {
        return createMessageDto;
    }
}
