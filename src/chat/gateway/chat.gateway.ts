import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';




//enable the client to communicate with the server
@WebSocketGateway({cors:{origini:'http://localhost:3000'}}) //'https://hoppscotch.io', 
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  // create a server instance from the WebSocketServer decorators.
  @WebSocketServer() server: Server;
  user : any [] = [];
  //send data to the client
  @SubscribeMessage('Message')
  handleMessage(client: any, payload: any) {
  console.log(payload)
  this.user.push(client);

  this.user.map( x=> x.emit("sendMesssage" ,payload));


  //  this.server.("sendMessage", 'test');
 //   return 'Hello from server!';
  }

  //after a client has connected 
  afterInit(server: any) {

    
  }

  //when a client joins the connetion
  handleConnection(client:Socket) {
    console.log(`On Connnect ... !${client.id} `)
  }

  handleDisconnect(client: any) {
    console.log(`On Disconnet ... ! ${client.id}`)
  }
}
