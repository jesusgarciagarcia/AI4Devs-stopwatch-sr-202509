/* Utilidades -------------------------------------------------------------- */
const log = {
    info: (...a) => console.log("[INFO]", ...a),
    warn: (...a) => console.warn("[WARN]", ...a),
    error: (...a) => console.error("[ERROR]", ...a),
};

const format = (ms) => {
    const total = Math.max(0, Math.floor(ms / 1000));
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
};

const parseHms = (str) => {
    const parts = (str || "").trim().split(":");
    if (parts.length !== 3) throw new Error("Formato inválido. Usa HH:MM:SS");
    const [hh, mm, ss] = parts.map((p) => Number(p));
    if ([hh, mm, ss].some((n) => Number.isNaN(n) || n < 0)) {
        throw new Error("Valores inválidos en la duración");
    }
    return (hh * 3600 + mm * 60 + ss) * 1000;
};

const Notifications = (() => {
    let permissionRequested = false;
    const ensurePermission = async () => {
        try {
            if (!("Notification" in window)) return false;
            if (Notification.permission === "granted") return true;
            if (!permissionRequested && Notification.permission !== "denied") {
                permissionRequested = true;
                const res = await Notification.requestPermission();
                return res === "granted";
            }
            return false;
        } catch {
            return false;
        }
    };
    const show = async (title, options) => {
        const ok = await ensurePermission();
        if (!ok) return;
        new Notification(title, options);
    };
    return { show };
})();

/* Sonido: desbloqueo y reproducción segura ---------------------------------- */
const playAlarm = (() => {
    let unlocked = false;
    const audio = document.getElementById("alarm-audio");

    const unlock = () => {
        if (!unlocked) {
            audio.play()
                .then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    unlocked = true;
                    log.info("🔓 Sonido desbloqueado");
                })
                .catch((err) => log.warn("No se pudo desbloquear audio:", err.message));
        }
    };

    const play = () => {
        if (!unlocked) unlock();
        audio.currentTime = 0;
        audio.play().catch((err) => log.warn("No se pudo reproducir audio:", err.message));
    };

    document.body.addEventListener("click", unlock, { once: true });
    return play;
})();

/* Clases núcleo (SOLID) --------------------------------------------------- */
class Timer {
    constructor({ id, type, onChange }) {
        this.id = id;
        this.type = type;
        this.onChange = onChange;
        this.state = "idle"; // idle | running | paused | finished
        this.interval = null;
        this.startedAt = null;
    }

    start() {
        try {
            if (this.state === "running") return;
            if (!this.canStart()) throw new Error("No se puede iniciar en el estado actual.");

            this.startedAt = Date.now();
            this.interval = setInterval(() => this.tick(), 250);
            this.state = "running";
            this.notifyChange();
            log.info(`${this.type}#${this.id} ▶️ start`);
        } catch (e) {
            log.error(`${this.type}#${this.id} start error:`, e.message);
        }
    }

    pause() {
        try {
            if (this.state !== "running") return;
            clearInterval(this.interval);
            this.interval = null;
            this.persistOnPause();
            this.state = "paused";
            this.notifyChange();
            log.info(`${this.type}#${this.id} ⏸ pause`);
        } catch (e) {
            log.error(`${this.type}#${this.id} pause error:`, e.message);
        }
    }

    reset() {
        try {
            clearInterval(this.interval);
            this.interval = null;
            this.startedAt = null;
            this.resetTime();
            this.state = "idle";
            this.notifyChange();
            log.info(`${this.type}#${this.id} 🔁 reset`);
        } catch (e) {
            log.error(`${this.type}#${this.id} reset error:`, e.message);
        }
    }

    finish() {
        try {
            clearInterval(this.interval);
            this.interval = null;
            this.state = "finished";
            this.notifyChange();
            log.info(`${this.type}#${this.id} ✅ finished`);
        } catch (e) {
            log.error(`${this.type}#${this.id} finish error:`, e.message);
        }
    }

    notifyChange() {
        this.onChange && this.onChange(this);
    }

    getDisplay() { return "00:00:00"; }
    tick() { }
    canStart() { return true; }
    persistOnPause() { }
    resetTime() { }
}

class Stopwatch extends Timer {
    constructor(opts) {
        super({ ...opts, type: "stopwatch" });
        this.elapsedMs = 0;
    }
    getDisplay() {
        return format(this.elapsedMs + (this.startedAt ? Date.now() - this.startedAt : 0));
    }
    tick() { this.onChange && this.onChange(this); }
    persistOnPause() { this.elapsedMs += Date.now() - this.startedAt; this.startedAt = null; }
    resetTime() { this.elapsedMs = 0; }
}

class Countdown extends Timer {
    constructor(opts) {
        super({ ...opts, type: "countdown" });
        this.totalMs = 0;
        this.remainingMs = 0;
    }
    setDuration(ms) {
        if (ms <= 0) throw new Error("La duración debe ser mayor a 0.");
        this.totalMs = ms;
        this.remainingMs = ms;
        this.state = "idle";
        this.notifyChange();
        log.info(`countdown#${this.id} ⏳ set ${format(ms)}`);
    }
    canStart() {
        // Permitir reiniciar sin volver a setear manualmente
        return this.remainingMs > 0 || this.totalMs > 0;
    }
    getDisplay() {
        const runningLeft = this.startedAt ? this.remainingMs - (Date.now() - this.startedAt) : this.remainingMs;
        return format(runningLeft);
    }
    tick() {
        const left = this.remainingMs - (Date.now() - this.startedAt);
        if (left <= 0) {
            this.remainingMs = 0;
            this.finish();
            this.onComplete();
        }
        this.onChange && this.onChange(this);
    }
    persistOnPause() {
        this.remainingMs = Math.max(0, this.remainingMs - (Date.now() - this.startedAt));
        this.startedAt = null;
    }
    resetTime() {
        this.remainingMs = this.totalMs || 0;
    }
    onComplete() {
        Notifications.show("⏰ Cuenta regresiva terminada", { body: "¡Buen trabajo! 🔔" });
        playAlarm();
    }
}

/* TimerManager ------------------------------------------------------------ */
class TimerManager {
    constructor(container) {
        this.container = container;
        this.timers = new Map();
        this.counter = 0;
    }

    create(type) {
        const id = ++this.counter;
        const card = this.createCard(type, id);
        const onChange = () => this.updateCard(id);
        const timer = type === "stopwatch" ? new Stopwatch({ id, onChange }) : new Countdown({ id, onChange });
        this.timers.set(id, { timer, card, type });
        this.updateCard(id);
        log.info(`🆕 created ${type}#${id}`);
        return id;
    }

    delete(id) {
        const entry = this.timers.get(id);
        if (!entry) return;
        try {
            entry.timer.reset();
            entry.card.remove();
            this.timers.delete(id);
            log.info(`🗑️ deleted ${entry.type}#${id}`);
        } catch (e) {
            log.error(`${entry.type}#${id} delete error:`, e.message);
        }
    }

    createCard(type, id) {
        const tpl = document.getElementById("timer-card-template");
        const node = tpl.content.firstElementChild.cloneNode(true);
        node.dataset.id = id;

        node.querySelector(".timer-title").textContent = type === "stopwatch" ? "Cronómetro" : "Cuenta regresiva";
        if (type === "countdown") node.querySelector(".countdown-controls").classList.remove("hidden");

        node.querySelector(".btn-start").addEventListener("click", () => this.toggleStart(id));
        node.querySelector(".btn-reset").addEventListener("click", () => this.reset(id));
        node.querySelector(".btn-delete").addEventListener("click", () => this.delete(id));

        const setBtn = node.querySelector(".set-time");
        if (setBtn) {
            setBtn.addEventListener("click", () => {
                try {
                    const input = node.querySelector(".time-input");
                    const ms = parseHms(input.value || "00:00:00");
                    const entry = this.timers.get(id);
                    entry.timer.setDuration(ms);
                    this.pulse(node);
                } catch (e) {
                    log.warn(`countdown#${id} set error:`, e.message);
                    alert(e.message);
                }
            });
        }

        this.container.prepend(node);
        return node;
    }

    pulse(card) {
        card.classList.remove("ring-emerald-300");
        void card.offsetWidth;
        card.classList.add("ring-emerald-300");
        setTimeout(() => card.classList.remove("ring-emerald-300"), 600);
    }

    toggleStart(id) {
        const { timer } = this.timers.get(id);
        if (timer.state === "running") timer.pause(); else timer.start();
        this.updateCard(id);
    }

    reset(id) {
        const { timer } = this.timers.get(id);
        timer.reset();
        this.updateCard(id);
    }

    updateCard(id) {
        const entry = this.timers.get(id);
        if (!entry) return;
        const { timer, card, type } = entry;

        try {
            const display = card.querySelector(".timer-display");
            const badge = card.querySelector(".timer-badge");
            const btn = card.querySelector(".btn-start");

            display.textContent = timer.getDisplay();
            badge.textContent = timer.state;

            const map = {
                idle: "bg-slate-100 text-slate-600",
                running: "bg-emerald-100 text-emerald-700",
                paused: "bg-amber-100 text-amber-700",
                finished: "bg-rose-100 text-rose-700",
            };
            badge.className = "timer-badge text-xs px-2 py-1 rounded-full " + (map[timer.state] || map.idle);
            btn.textContent = timer.state === "running" ? "Pause" : "Start";

            if (timer.state === "finished" && type === "countdown") {
                card.classList.add("animate-[pulse_0.9s_ease-in-out_3]");
            } else {
                card.classList.remove("animate-[pulse_0.9s_ease-in-out_3]");
            }
        } catch (e) {
            log.error(`${type}#${id} render error:`, e.message);
        }
    }
}

/* Bootstrap --------------------------------------------------------------- */
(() => {
    const container = document.getElementById("timers-container");
    const manager = new TimerManager(container);

    document.getElementById("add-stopwatch").addEventListener("click", () => manager.create("stopwatch"));
    document.getElementById("add-countdown").addEventListener("click", () => manager.create("countdown"));

    // Timers de ejemplo
    manager.create("stopwatch");
    const cdId = manager.create("countdown");
    const entry = manager.timers.get(cdId);
    try { entry.timer.setDuration(parseHms("00:00:10")); } catch { }

    // Render loop
    const rafRender = () => {
        for (const [id] of manager.timers) manager.updateCard(id);
        requestAnimationFrame(rafRender);
    };
    requestAnimationFrame(rafRender);

    Notifications.show("¡Listo para avisarte! 🔔", { body: "Activa el sonido para mejor experiencia." });
})();
