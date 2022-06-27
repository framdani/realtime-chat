import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Console } from 'console';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { player } from 'src/auth/player.entity';
import { ChatService } from '../chat.service';
import { RoleStatus } from '../dto/membership.model';
import { messageDto } from '../dto/message-dto';
import { RoomDto } from '../dto/room-dto';
import { room } from '../room.entity';


//enable the client to communicate with the server
@WebSocketGateway({cors:{origini:'http://localhost:3000'}}) //'https://hoppscotch.io', 
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  // create a server instance from the WebSocketServer decorators.
  @WebSocketServer() server: Server;
  
  user : any [] = []; //connected users
  decoded :any; //store the access token without bearer
  title:any[]=[];
  player:player; //get the user by the access token
  players:player[]=[]; ///store the members of the new created channel

  //! add function to getUserFromSoccket 

  constructor(private authService:AuthService, private chatService:ChatService){}

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
     // console.log(this.decoded.id);
     // console.log(this.player.username);

    // console.log(this.decoded.id);
    // console.log(this.player.username);
 
   if (!this.player)
    { return this.disconnect(client);}

     // const rooms = "";
      client.data.player = this.player;
      const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
      
     // console.log(rooms);
  
      //if username doesn't exist close connection

    this.user.push(client);
    this.title.push(`${client.id}`);
    console.log(`On Connnect ... !${client.id} ${this.player.username}`)
    //console.log(this.player.username);
   // this.server.emit('message', this.title)
    // this.user.map( x=> x.emit("message" ,`hey ${client.id}`));
  
    //only emit value to the concerned client => for now there is no room
   // console.log(rooms);
     this.server.to(client.id).emit('message', rooms);//rooms

   // console.log(rooms[0].id);
      const messages = await this.chatService.getMessagesByroomId(rooms[0].id);
      for (var x of this.user)
      {
      //  console.log(`the connected users  ${x.id}`);
        this.server.to(x.id).emit('sendMessage', messages);
      }

    }catch{
      console.log('last catch');
      return this.disconnect(client);}
  }
  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
  handleDisconnect(client: any) {
    //remove this client form the connected users
    this.user.splice(this.user.indexOf(`${client}`),1);
    console.log(`On Disconnet ... ! ${client.id}`)
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, roomdto: RoomDto){

   //find all users by username
   const usernames = roomdto.players;
    for (var username of usernames){
      console.log(username);
      const user:player = await this.authService.getUserByUsername(username);
    if (user)
        this.players.push(user);
   // console.log(user);
  }
  // this.players.push(socket.data.player);

    const room =  await this.chatService.createRoom(roomdto,this.players);
     await this.chatService.addMember(room, socket.data.player, RoleStatus.OWNER);
   //const rooms ="";
    const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
     //I should send the created channel to all the users
    //  this.server.to(socket.id).emit('message', rooms);
  
    // this.user.map(x=> this.server.to(x).emit('message', rooms));
    //should store the connected users

   // this.user.map( x=> x.emit("message" ,rooms));
  //  this.user.map(x => this.server.to(x)).emit('message', rooms));
    for (var x of this.user)
      {
        console.log(`the connected users  ${x.id}`);
        this.server.to(x.id).emit('message', rooms);
      }

      

    this.players.splice(0);
  //  this.user.splice(0);
  }

  @SubscribeMessage('createMessage')
  async onCreateMessage(socket:Socket, messageDto:messageDto){
    //id of the room
    //content of the message
      this.decoded = socket.handshake.headers.authorization.split(" ")[1];
      this.decoded = await this.authService.verifyJwt(this.decoded);
      this.player = await this.authService.getUserById(this.decoded.id);
   const message = await this.chatService.createMessage(messageDto,this.player);
   const messages = await this.chatService.getMessagesByroomId(messageDto.id);
   console.log(messageDto.id);
   console.log(messages);
   for (var x of this.user)
      {
        console.log(`the connected users  ${x.id}`);
        this.server.to(x.id).emit('sendMessage', messages);
      }
    
  }
}