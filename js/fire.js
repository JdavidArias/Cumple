const canvas = document.getElementById('fuegos');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Firework() {
    this.x = random(canvas.width * 0.2, canvas.width * 0.8);
    this.y = canvas.height;
    this.targetY = random(canvas.height * 0.2, canvas.height * 0.5);
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    this.radius = 2;
    this.speed = random(4, 7);
    this.exploded = false;
    this.particles = [];
}

Firework.prototype.update = function () {
    if (!this.exploded) {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            this.exploded = true;
            for (let i = 0; i < 100; i++) {
                this.particles.push(new Particle(this.x, this.y, this.color));
            }
        }
    } else {
        this.particles.forEach(p => p.update());
    }
};

Firework.prototype.draw = function () {
    if (!this.exploded) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    } else {
        this.particles.forEach(p => p.draw());
    }
};

function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 1.5;
    this.color = color;
    this.alpha = 1;
    this.speedX = random(-5, 5);
    this.speedY = random(-5, 5);
    this.gravity = 0.05;
}

Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.alpha -= 0.02;
};

Particle.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
};

let fireworks = [];

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        fireworks.push(new Firework());
    }

    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.exploded && fw.particles.every(p => p.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();
function crearGlobo() {
    const colores = ['#e63946', '#457b9d', '#2a9d8f', '#f4a261', '#ffb703', '#ff006e'];
    const globo = document.createElement('div');
    globo.classList.add('globo-dinamico');

    const color = colores[Math.floor(Math.random() * colores.length)];
    globo.style.backgroundColor = color;

    const left = Math.random() * 90; // porcentaje desde el borde izquierdo
    globo.style.left = `${left}%`;

    document.getElementById('globos-container').appendChild(globo);

    // Remover el globo cuando termine la animación
    setTimeout(() => globo.remove(), 10000);
}

// Crear globos cada 600ms
setInterval(crearGlobo, 600);
