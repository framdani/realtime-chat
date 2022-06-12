import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

//enable the client to communicate with the server
@WebSocketGateway({cors:{origini:'http://localhost:3000'}}) //'https://hoppscotch.io', 
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  // create a server instance from the WebSocketServer decorators.
  @WebSocketServer() server: Server;

  
  
  user : any [] = [];
  //send data to the client
//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any) {
//   // console.log(payload)
// //   this.user.push(client);

// //  this.user.map( x=> x.emit("sendMesssage" ,payload));


//    this.server.emit("message", 'test');
//  //   return 'Hello from server!';
//   }

  //after a client has connected 
  afterInit(server: any) {

    
  }

  //when a client joins the connection
  handleConnection(client:Socket) {
    //verifyJWTtoken  after decoding it
    //get it from header authorization =>
    console.log(client.handshake.headers.authorization);
    this.user.push(client);
    console.log(`On Connnect ... !${client.id} `)
    this.server.emit('message', `${client.id}`)
    // this.user.map( x=> x.emit("message" ,`hey ${client.id}`));
    console.log("sent");
  }

  handleDisconnect(client: any) {
    console.log(`On Disconnet ... ! ${client.id}`)
  }
}
