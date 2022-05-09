import { useSockets } from "../context/socket.context"

export default function Home() {
    const { socket } = useSockets()

    return (
        <div>Socket id: <> {socket.id}</></div>
    )
}