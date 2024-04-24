function formatDate(inputDate) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateParts = inputDate.split('-');
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1]) - 1];
    const day = parseInt(dateParts[2]);

    let daySuffix;
    
    switch (day) {
        case 1:
        case 21:
        case 31:
            daySuffix = 'st';
            break;
        case 2:
        case 22:
            daySuffix = 'nd';
            break;
        case 3:
        case 23:
            daySuffix = 'rd';
            break;
        default:
            daySuffix = 'th';
            break;
    }

    return `${month} ${day}${daySuffix}, ${year}`;
}

export default formatDate;
