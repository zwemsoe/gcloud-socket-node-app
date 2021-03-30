import { useState, useContext, useEffect } from "react";
import { SocketContext } from "./SocketContext";

function App() {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messages update", (list) => {
      setMessageList(list);
    });
  });

  useEffect(() => {
    socket.emit("get old messages");
  }, [socket]);

  const handleSend = (e) => {
    if (message && e.key === "Enter") {
      socket.emit("send message", message);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "1em", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Type something"
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "600px",
            height: "50px",
            marginRight: "1em",
            fontSize: "1.5rem",
          }}
          onKeyDown={handleSend}
        />

        <ul>
          {messageList.map((msg, i) => {
            return (
              <p
                key={i}
                style={{
                  fontSize: "2em",
                }}
              >
                {msg?.id === socket?.id ? (
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "black",
                    }}
                  >
                    {msg?.message}
                  </span>
                ) : (
                  msg.message
                )}
              </p>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
