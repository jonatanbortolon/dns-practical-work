import net from "net";
import fs from "fs";

class Server {
  private socket: net.Server;
  private database: { [key: string]: string };
  private port: number;

  constructor({ port, databasePath }: { port: number; databasePath: string }) {
    if (!port) {
      throw new Error("Port required!");
    }

    if (!databasePath) {
      throw new Error("Database path required!");
    }

    this.port = port;

    this.socket = net.createServer((socket) => {
      socket.on("data", (rawData) => {
        const data = rawData.toString();
        console.log("Message received: " + data);
        const ip: string | null = this.database[data];

        if (!ip) {
          socket.write("Url not found in database!");
        } else {
          socket.write(ip);
        }
      });
    });

    const rawDatabase = fs.readFileSync(databasePath, "utf-8");
    this.database = JSON.parse(rawDatabase);
  }

  start() {
    this.socket.listen(this.port, "127.0.0.1", () => {
      console.log("Server started");
    });
  }
}

export default Server;
