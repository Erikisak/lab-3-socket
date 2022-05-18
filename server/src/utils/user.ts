//Stores information about users. fix specific type
const users: any[] = [];
export const roomsObject: Record<string, { name: string }> = {};
export const namesObject: Record<string, { name: string }> = {};

//join user to chat
export function userJoin(id: string, nickname: string, roomName: string) {
    const user = { id, nickname, roomName };
    users.push(user);

    return user;
}


export function createRoomsObject(roomName: string) {
    roomsObject[roomName] = {
        name: roomName
    }

    return roomsObject
}

export function createNamesObject(nickname: string) {
    namesObject[nickname] = {
        name: nickname
    }

    return roomsObject
}

//Get current user. Broken, sometimes returns wrong nickname, but always correct id????
export function getCurrentUser(id: string) {
    const found = users.find(user => user.id === id);
    console.log('id recieved from socket: ', id)
    console.log('id recieved from user.id: ', users.map(user => user.id))
    console.log('found item: ', found)
    return found
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

