import { Client } from "./dependencies/webstomp/client";
import { IFrame } from "./dependencies/webstomp/i-frame";

export class Receiver {
    private url: String;
    private client: Client;

    /**
     *
     */
    constructor() {
        //this.url = url;
        this.client = new Client({
            brokerURL: "ws://localhost:15674/ws",
            connectHeaders: {
              login: "guest",
              passcode: "guest"
            },
            debug: function (str) {
              console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
          });

        this.client.onConnect = this.onConnect;
        this.client.onStompError = this.onError;
    }

    connect() {

        this.client.activate();
    }

    onConnect(frame: IFrame) {
        console.log("Connected");
    }

    onError(frame: IFrame) {
        console.log("Error");
    }
}