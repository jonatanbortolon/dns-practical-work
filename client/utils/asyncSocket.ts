import net from "net";

async function asyncSocket(port: number, ip: string, message: string) {
  return new Promise((accept, reject) => {
    const socket = new net.Socket();
    socket.connect(port, ip);

    socket.write(message);

    socket.once("data", (data) => {
      socket.destroy();

      accept(data);
    });

    socket.once("error", (data) => {
      socket.destroy();

      reject("Failed to connect!");
    });
  });
}

export default asyncSocket;
