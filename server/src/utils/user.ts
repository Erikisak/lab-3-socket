//Stores information about users. fix specific type
const users: any[] = [];
export const roomsObject: Record<string, { name: string }> = {};

//join user to chat
export function userJoin(id: string, nickname: string, roomName: string) {
    const user = { id, nickname, roomName };
    users.push(user);

    return user;
}

//work in progress
export function createRoomsObject(roomName: string) {
    roomsObject[roomName] = {
        name: roomName
    }

    return roomsObject
}

//Get current user
export function getCurrentUser(id: string) {
    return users.find(user => user.id === id);
}

//User leaves chat
export function userLeave(id: string) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// get room users
export function getRoomUsers(room: string) {
    const usersRoom = users.filter(user => user.roomName === room);

    if (usersRoom.length === 0) {
        delete roomsObject[room]
    }

    return usersRoom
}

