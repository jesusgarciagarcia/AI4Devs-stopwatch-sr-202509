
class Timer {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.interval = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) {
            this.stop();
            console.log('⏸ Pausado');
            return;
        }
        this.isRunning = true;
        this.interval = setInterval(() => this.tick(), 1000);
        console.log('▶️ Iniciado');
    }

    stop() {
        clearInterval(this.interval);
        this.isRunning = false;
    }

    reset() {
        this.stop();
        this.resetTime();
        this.render();
        console.log('🔁 Reiniciado');
    }

    render() {
        const { hours, minutes, seconds } = this.getTime();
        this.displayElement.textContent = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    pad(num) {
        return num.toString().padStart(2, '0');
    }

    tick() { }
    resetTime() { }
    getTime() { return {}; }
}

class Stopwatch extends Timer {
    constructor(displayElement) {
        super(displayElement);
        this.elapsedSeconds = 0;
        this.render();
    }

    tick() {
        this.elapsedSeconds++;
        this.render();
    }

    resetTime() {
        this.elapsedSeconds = 0;
    }

    getTime() {
        const hours = Math.floor(this.elapsedSeconds / 3600);
        const minutes = Math.floor((this.elapsedSeconds % 3600) / 60);
        const seconds = this.elapsedSeconds % 60;
        return { hours, minutes, seconds };
    }
}

class Countdown extends Timer {
    constructor(displayElement, inputElement, alarmElement) {
        super(displayElement);
        this.remainingSeconds = 0;
        this.inputElement = inputElement;
        this.alarmElement = alarmElement;
        this.render();
    }

    start() {
        if (!this.isRunning && this.remainingSeconds <= 0) {
            const inputSeconds = parseInt(this.inputElement.value, 10);
            if (isNaN(inputSeconds) || inputSeconds <= 0) {
                console.error('⛔ Tiempo inválido');
                alert('Introduce un tiempo válido en segundos');
                return;
            }
            this.remainingSeconds = inputSeconds;
        }
        super.start();
    }

    tick() {
        if (this.remainingSeconds > 0) {
            this.remainingSeconds--;
            this.render();
        } else {
            this.stop();
            console.log('🚨 Tiempo finalizado');
            this.displayElement.classList.add('bg-red-200');
            this.alarmElement.play();
            alert('⏰ ¡Tiempo terminado!');
        }
    }

    resetTime() {
        this.remainingSeconds = 0;
        this.displayElement.classList.remove('bg-red-200');
    }

    getTime() {
        const hours = Math.floor(this.remainingSeconds / 3600);
        const minutes = Math.floor((this.remainingSeconds % 3600) / 60);
        const seconds = this.remainingSeconds % 60;
        return { hours, minutes, seconds };
    }
}

// UI Handlers
try {
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const countdownDisplay = document.getElementById('countdown-display');
    const countdownInput = document.getElementById('countdown-input');
    const alarmSound = document.getElementById('alarm-sound');

    const stopwatch = new Stopwatch(stopwatchDisplay);
    const countdown = new Countdown(countdownDisplay, countdownInput, alarmSound);

    document.getElementById('stopwatch-start').addEventListener('click', () => stopwatch.start());
    document.getElementById('stopwatch-clear').addEventListener('click', () => stopwatch.reset());

    document.getElementById('countdown-start').addEventListener('click', () => countdown.start());
    document.getElementById('countdown-clear').addEventListener('click', () => countdown.reset());
} catch (error) {
    console.error('❌ Error al inicializar:', error);
}
