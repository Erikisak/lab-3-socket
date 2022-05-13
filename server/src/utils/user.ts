//Stores information about users. fix specific type
const users:any [] = [];

//join user to chat
export function userJoin(id: string, nickname: string, roomName: string) {
    const user = {id, nickname, roomName};
    users.push(user);

    return user;
}

//Get current user
export function getCurrentUser(id:string) {
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
export function getRoomUsers(room:string) {

    return users.filter(user => user.roomName === room);
}

