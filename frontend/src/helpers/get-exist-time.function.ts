const getExistTime = (createdAt: string) => {
    const givenDate = new Date(createdAt);
    const currentDate = new Date();
    const yearDiff = currentDate.getFullYear() - givenDate.getFullYear();
    const monthDiff = currentDate.getMonth() - givenDate.getMonth();
    const dayDiff = currentDate.getDate() - givenDate.getDate();
    const hourDiff = currentDate.getHours() - givenDate.getHours();
    const minuteDiff = currentDate.getMinutes() - givenDate.getMinutes();
    let formattedTimeDiff = '';
    if (yearDiff > 0) {
        formattedTimeDiff = `${yearDiff} ${yearDiff > 1 ? 'years ago' : 'year ago'}`;
    } else if (monthDiff > 0) {
        formattedTimeDiff = `${monthDiff} ${monthDiff > 1 ? 'months ago' : 'month ago'}`;
    } else if (dayDiff > 0) {
        formattedTimeDiff = `${dayDiff} ${dayDiff > 1 ? 'days ago' : 'day ago'}`;
    } else if (hourDiff > 0) {
        formattedTimeDiff = `${hourDiff} ${hourDiff > 1 ? 'hours ago' : 'hour ago'}`;
    } else if (minuteDiff > 0) {
        formattedTimeDiff = `${minuteDiff} ${minuteDiff > 1 ? 'minutes ago' : 'minute ago'}`;
    } else {
        formattedTimeDiff = 'Just now';
    }
    return formattedTimeDiff;
}

export default getExistTime;