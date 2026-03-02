// Generate Mock Data for 15-min increments (96 points)
const container = document.getElementById('mainProfile');
const podGrid = document.getElementById('podGrid');

// Create Main Graph
for (let i = 0; i < 96; i++) {
    const bar = document.createElement('div');
    bar.className = 'increment-bar';
    
    // Simulating solar curve + base load
    const timeFactor = Math.sin((i - 20) / 20); 
    const prodHeight = Math.max(0, timeFactor * 80 + (Math.random() * 10));
    const consHeight = 20 + Math.random() * 30;

    bar.innerHTML = `
        <div class="val-prod" style="height: ${prodHeight}%"></div>
        <div class="val-cons" style="height: ${consHeight}%"></div>
    `;
    container.appendChild(bar);
}

// Create Individual PoD items
const pods = [
    { id: 'POD-7721-RX', type: 'Producer', val: '42.1' },
    { id: 'POD-8812-BQ', type: 'Consumer', val: '18.4' },
    { id: 'POD-0922-LM', type: 'Producer', val: '88.5' },
    { id: 'POD-4410-XP', type: 'Consumer', val: '09.2' }
];

pods.forEach((pod, idx) => {
    const card = document.createElement('div');
    card.className = `machined-card pod-item animate-reveal`;
    card.style.animationDelay = `${0.4 + (idx * 0.1)}s`;
    
    const accent = pod.type === 'Producer' ? 'var(--accent-producer)' : 'var(--accent-consumer)';
    
    card.innerHTML = `
        <div>
            <span class="pod-id">${pod.id}</span>
            <div class="pod-status">${pod.val} <span class="metric-unit">kWh</span></div>
        </div>
        <div class="sparkline">
            ${Array(12).fill(0).map(() => `
                <div class="spark-bar" style="height: ${20 + Math.random() * 80}%; background: ${accent}"></div>
            `).join('')}
        </div>
        <div class="pod-id" style="margin-top: 10px; color: ${accent}; font-weight: 500;">${pod.type.toUpperCase()} UNIT</div>
    `;
    podGrid.appendChild(card);
});

// Interactive highlight for main bars
document.querySelectorAll('.increment-bar').forEach(bar => {
    bar.addEventListener('mouseenter', () => {
        bar.style.filter = 'brightness(0.95)';
    });
    bar.addEventListener('mouseleave', () => {
        bar.style.filter = 'none';
    });
});