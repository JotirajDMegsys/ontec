import * as signalR from "@microsoft/signalr";
class SignalRService{
    constructor(){
        this.connection= new signalR.HubConnectionBuilder()
        .withUrl(`${API_BASE_URL}ontec`, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();
    }
     startConnection(){
          this.connection.start();
            const connectionId =   this.connection.invoke('GetConnectionId');
             AsyncStorage.setItem('connectionId', connectionId);
            console.log("===========connectionId3", connectionId);
    }

    stopConnection() {
        this.connection.stop()
          .then(() => console.log('SignalR disconnected'))
          .catch(error => console.error('SignalR disconnection error:', error));
      }
    
      // Define event handler function
      onMessageReceived(callback) {
        this.connection.on('ontecreceivemsg', message => {
          // Handle received message
          console.log("Message",message);
          callback(message);
        });
      }
    }
    
    const signalRService = new SignalRService();
    export default signalRService;