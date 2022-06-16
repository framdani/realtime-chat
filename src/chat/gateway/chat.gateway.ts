import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { player } from 'src/auth/player.entity';

//enable the client to communicate with the server
@WebSocketGateway({cors:{origini:'http://localhost:3000'}}) //'https://hoppscotch.io', 
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  // create a server instance from the WebSocketServer decorators.
  @WebSocketServer() server: Server;
  
  user : any [] = [];
  decoded :any;
  title:any[]=[];
  player:player;

  constructor(private authService:AuthService){}
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
  async handleConnection(client:Socket) {
    try{
    this.decoded = client.handshake.headers.authorization.split(" ")[1];
    this.decoded = await this.authService.verifyJwt(this.decoded);
    this.player = await this.authService.getUserById(this.decoded.username);
 
   if (!this.player)
      return this.disconnect(client);


   //if username doesn't exist close connection

    this.user.push(client);
    this.title.push(`${client.id}`);
    console.log(`On Connnect ... !${client.id} `)
    this.server.emit('message', this.title)
    // this.user.map( x=> x.emit("message" ,`hey ${client.id}`));
    console.log("sent");
    }catch{
      return this.disconnect(client);

    }
  }
  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
  handleDisconnect(client: any) {
    console.log(`On Disconnet ... ! ${client.id}`)
  }
}
