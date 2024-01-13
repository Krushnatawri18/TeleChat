import { useEffect, useState } from "react";
// adds document to collection
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, snapshot, orderBy } from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import '../styles/Chat.css'

export const Chat = (props) => {

    const { room } = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef,
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);

        });
        // allows firebase to listen those changes in collection

        return () => unsuscribe();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        // to make input tag empty
        setNewMessage("");

    };

    return (
        <div className="chat-app">
            <div className="header">
                <h2>Welcome to {room.toUpperCase()}</h2>
            </div>
            <div className="messages">
            {messages.map((message) => (
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}</span>
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message here ..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage} />
                {/* when we will change input the value will get empty */}
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};
