const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const period = hour >= 12 ? "PM" : "AM";

    // Convert hour to 12-hour format
    const hourIn12 = hour % 12 || 12;  // If hour is 0 (12 AM), show as 12
    const minuteString = minute < 10 ? `0${minute}` : minute;

    return `${hourIn12}:${minuteString} ${period}`;
};

module.exports = { convertTo12HourFormat };