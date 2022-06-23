import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Console } from 'console';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { player } from 'src/auth/player.entity';
import { ChatService } from '../chat.service';
import { RoomDto } from '../dto/room-dto';
import { room } from '../room.entity';


//enable the client to communicate with the server
@WebSocketGateway({cors:{origini:'http://localhost:3000'}}) //'https://hoppscotch.io', 
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  // create a server instance from the WebSocketServer decorators.
  @WebSocketServer() server: Server;
  
  user : any [] = [];
  decoded :any;
  title:any[]=[];
  player:player;
  players:player[]=[];

  //! add function to getUserFromSoccket 

  constructor(private authService:AuthService, private chatService:ChatService){}
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
    try
    {
      this.decoded = client.handshake.headers.authorization.split(" ")[1];
      this.decoded = await this.authService.verifyJwt(this.decoded);
      this.player = await this.authService.getUserById(this.decoded.id);
      console.log(this.decoded.id);
      console.log(this.player);

    // console.log(this.decoded.id);
    // console.log(this.player.username);
 
   if (!this.player)
    { return this.disconnect(client);}

      const rooms = "";
      client.data.player = this.player;
     // const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
      
      console.log(rooms);
  
      //if username doesn't exist close connection

    this.user.push(client);
    this.title.push(`${client.id}`);
    console.log(`On Connnect ... !${client.id} `)
   // this.server.emit('message', this.title)
    // this.user.map( x=> x.emit("message" ,`hey ${client.id}`));
  
    //only emit value to the concerned client => for now there is no room
    console.log(rooms);
    return this.server.to(client.id).emit('message', rooms);//rooms

    }catch{
      console.log('last catch');
      return this.disconnect(client);}
  }
  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
  handleDisconnect(client: any) {
    console.log(`On Disconnet ... ! ${client.id}`)
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: RoomDto){
  // console.log(room);
   //find all users by username
   const usernames = room.players;
  for (var username of usernames){
    console.log(username);
    const user:player = await this.authService.getUserByUsername(username);
    if (user)
        this.players.push(user);
    console.log(user);
  }
   this.players.push(socket.data.player);

   await this.chatService.createRoom(room,this.players);
   const rooms ="";
   //const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
     //I should send the created channel to all the users
    //  this.server.to(socket.id).emit('message', rooms);
  
    // this.user.map(x=> this.server.to(x).emit('message', rooms));
    //should store the connected users
    this.user.map( x=> x.emit("message" ,rooms));
    this.players.splice(0);
    this.user.splice(0);
  }
}