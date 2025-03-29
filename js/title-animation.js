class TitleAnimation {
    constructor() {
        this.canvas = document.getElementById('title-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.text = 'Kulturinsel Moabit';
        this.mouseX = 0;
        this.mouseY = 0;
        this.isHovered = false;

        // Setze die Canvas-Größe
        this.canvas.width = 400;
        this.canvas.height = 60;

        // Event Listener für Mausinteraktion
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            this.isHovered = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isHovered = false;
        });

        this.canvas.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        this.canvas.tabIndex = 0;
        this.canvas.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                window.location.href = 'index.html';
            }
        });

        this.init();
        this.animate();
    }

    init() {
        // Text-Einstellungen
        this.ctx.font = 'bold 32px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;

        // Zeichne Text auf temporären Canvas
        tempCtx.font = this.ctx.font;
        tempCtx.textAlign = this.ctx.textAlign;
        tempCtx.textBaseline = this.ctx.textBaseline;
        tempCtx.fillStyle = '#7a5816';
        tempCtx.fillText(this.text, tempCanvas.width / 2, tempCanvas.height / 2);

        // Analysiere Pixel und erstelle Partikel
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const pixels = imageData.data;

        for (let y = 0; y < tempCanvas.height; y += 2.0) {
            for (let x = 0; x < tempCanvas.width; x += 2.0) {
                const index = (Math.floor(y) * tempCanvas.width + Math.floor(x)) * 4;
                if (pixels[index + 3] > 128) {
                    this.particles.push({
                        x: x,
                        y: y,
                        baseX: x,
                        baseY: y,
                        size: 1.2,
                        color: '#7a5816',
                        velocity: { x: 0, y: 0 },
                        attraction: 0.08
                    });
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Aktualisiere und zeichne Partikel
        this.particles.forEach(particle => {
            if (this.isHovered) {
                const dx = this.mouseX - particle.x;
                const dy = this.mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 40) {
                    const force = (40 - distance) / 40;
                    particle.velocity.x -= dx * force * 0.03;
                    particle.velocity.y -= dy * force * 0.03;
                }
                
                // Normale Anziehung im Hover-Zustand
                particle.velocity.x += (particle.baseX - particle.x) * particle.attraction;
                particle.velocity.y += (particle.baseY - particle.y) * particle.attraction;
                
                particle.velocity.x *= 0.92;
                particle.velocity.y *= 0.92;
            } else {
                // Schnellere Rückkehr zur Ausgangsposition wenn keine Maus-Interaktion
                const dx = particle.baseX - particle.x;
                const dy = particle.baseY - particle.y;
                particle.velocity.x = dx * 0.2; // Schnellere Rückkehr
                particle.velocity.y = dy * 0.2;
            }

            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;

            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TitleAnimation();
});