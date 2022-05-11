export function getCurrentTimeStamp() {
    return new Date().getTime().toString().slice(0,-3);
}