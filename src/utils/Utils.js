
function displayFormat(number) {
    return number > 9 ? number : ('0' + number);
}

export function toDateString(timeInMillis) {
    // TODO is there a better way to write this function?
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timeInMillis);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = (hours >= 12 ? 'PM' : 'AM');
    const hourIn12 = hours % 12;
    return `${monthNames[monthIndex]} ${displayFormat(day)} ${displayFormat(hourIn12)}:${displayFormat(minutes)}:${displayFormat(seconds)} ${ampm}`;
}
