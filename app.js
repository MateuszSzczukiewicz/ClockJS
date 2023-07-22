class Clock {
    constructor() {
        this.handMinutes = document.getElementById('hand-minutes');
        this.handHours = document.getElementById('hand-hours');
        this.digitalSeconds = document.getElementById('digital-seconds');
        this.digitalMinutes = document.getElementById('digital-minutes');
        this.digitalHours = document.getElementById('digital-hours');
        this.clockAnalog = document.getElementById('clock-analog');
        this.clockDigital = document.getElementById('clock-digital');
        this.clockSwitchButton = document.getElementById('clock-switch');
        this.clockSvgCircle = document.getElementById('clock-svgCircle');
        this.clockCenter = document.querySelector('.clock__center')
        this.clockNumbers = document.querySelectorAll('.clock__number')
        this.clockSection = document.getElementById('clock-section');
        this.isDragging = false;
        this.initialX = 0;
        this.initialY = 0;

        this.clockSwitchButton.addEventListener('click', this.clockSwitch.bind(this));
        this.clockSection.addEventListener('mousedown', this.startDragging.bind(this));
        this.clockSection.addEventListener('mouseup', this.stopDragging.bind(this));
        document.addEventListener('mousemove', this.moveClockSection.bind(this));
        window.addEventListener('resize', this.clockSectionScale.bind(this));

        setInterval(() => {
            this.updateAnalogTime();
            this.updateDigitalTime();
            this.clockCenterChange();
            this.clockNumbersChange();
            this.clockSectionScale();
        }, 1000);
    }

    updateAnalogTime() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();
        const secondsRotation = `calc(${942 - (942 * seconds) / 59}px)`;
        const minutesRotation = `translateX(-50%) rotate(${minutes * 6 + seconds / 10}deg)`;
        const hoursRotation = `translateX(-50%) rotate(${(hours % 12) * 30 + minutes / 2}deg)`;

        this.clockSvgCircle.style.strokeDashoffset = secondsRotation;
        this.handMinutes.style.transform = minutesRotation;
        this.handHours.style.transform = hoursRotation;
    }

    updateDigitalTime() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        this.digitalSeconds.innerText = String(seconds).padStart(2, '0');
        this.digitalMinutes.innerText = String(minutes).padStart(2, '0');
        this.digitalHours.innerText = String(hours).padStart(2, '0');
    }

    clockSwitch() {
        this.clockAnalog.classList.toggle("clock__main--isDisabled");
        this.clockDigital.classList.toggle("clock__main--isDisabled");
    }

    clockCenterChange() {
        const now = new Date();
        const seconds = now.getSeconds();
        this.clockCenter.style.backgroundImage = `linear-gradient(calc(${seconds} * 6deg),#ff8a00,#e52e71)`
    }

    clockNumbersChange() {
        const now = new Date();
        const seconds = now.getSeconds();
        let deg = 30;

        this.clockNumbers.forEach(clockNumber => {
            clockNumber.style.backgroundImage = `linear-gradient(${deg - seconds * 6}deg, #ff8a00, #e52e71)`;
            deg += 30;
        });
    }

    moveClockSection(e) {
        if (this.isDragging) {
            const x = e.clientX - this.initialX;
            const y = e.clientY - this.initialY;

            this.clockSection.style.left = `${x}px`;
            this.clockSection.style.top = `${y}px`;
        }
    };

    startDragging(e) {
        this.isDragging = true;
        this.initialX = e.clientX - this.clockSection.offsetLeft;
        this.initialY = e.clientY - this.clockSection.offsetTop;
    }

    stopDragging() {
        this.isDragging = false;
    }

    clockSectionScale() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const clockSectionWidth = this.clockSection.clientWidth;
        const clockSectionHeight = this.clockSection.clientHeight;

        const scaleWidth = windowWidth / clockSectionWidth;
        const scaleHeight = windowHeight / clockSectionHeight;

        const scale = Math.min(scaleWidth, scaleHeight);

        if (scale < 1.25) {
            this.clockSection.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
    }
}

const clock = new Clock();