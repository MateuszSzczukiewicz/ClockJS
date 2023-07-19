const handSeconds = document.getElementById('hand-seconds');
const handMinutes = document.getElementById('hand-minutes')
const handHours = document.getElementById('hand-hours')
const now = new Date()

const updateClockHands = () => {
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const minutesRotation = `rotate(${minutes * 6 + seconds / 10}deg)`;
    const hoursRotation = `rotate(${(hours % 12) * 30 + minutes / 2}deg)`;

    handMinutes.style.transform = `${minutesRotation}`;
    handHours.style.transform = `${hoursRotation}`;
}

setInterval(updateClockHands, 1000);
