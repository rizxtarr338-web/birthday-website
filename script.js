const galleryGrid = document.getElementById('galleryGrid');
const welcomeScreen = document.getElementById('welcomeScreen');
const musicToggle = document.getElementById('musicToggle');
const giftButton = document.getElementById('giftButton');
const giftReveal = document.getElementById('giftReveal');

const galleryImages = [
  { title: 'Ali 1', color1: '#5138b9', color2: '#ff8ec7' },
  { title: 'Ali 2', color1: '#412ab1', color2: '#80d8ff' },
  { title: 'Ali 3', color1: '#6b2ec7', color2: '#ffd166' },
  { title: 'Ali 4', color1: '#2b7dff', color2: '#ffb4d8' },
  { title: 'Ali 5', color1: '#8f47ff', color2: '#ffd6a5' },
  { title: 'Ali 6', color1: '#3f3d9d', color2: '#75d7ff' },
  { title: 'Ali 7', color1: '#9637c4', color2: '#ff9ac6' }
];

function imageSvg({ title, color1, color2 }) {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'>
      <defs>
        <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='${color1}' />
          <stop offset='100%' stop-color='${color2}' />
        </linearGradient>
      </defs>
      <rect width='800' height='1000' fill='url(#g)'/>
      <circle cx='400' cy='310' r='170' fill='rgba(255,255,255,0.18)'/>
      <ellipse cx='400' cy='325' rx='118' ry='136' fill='#f9d1d1'/>
      <circle cx='350' cy='295' r='18' fill='#2e1f4d'/>
      <circle cx='450' cy='295' r='18' fill='#2e1f4d'/>
      <circle cx='350' cy='290' r='6' fill='#fff'/>
      <circle cx='450' cy='290' r='6' fill='#fff'/>
      <path d='M350 365 Q400 420 450 365' fill='none' stroke='#2e1f4d' stroke-width='10' stroke-linecap='round'/>
      <path d='M250 650 C 300 510, 500 510, 550 650 L 550 900 L 250 900 Z' fill='rgba(255,255,255,0.17)'/>
      <circle cx='400' cy='690' r='120' fill='rgba(255,255,255,0.12)'/>
      <text x='50%' y='94%' text-anchor='middle' fill='white' font-size='42' font-family='Arial, sans-serif' font-weight='700' letter-spacing='3'>${title}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderGallery() {
  galleryGrid.innerHTML = galleryImages
    .map(
      (image, index) => `
        <figure class="gallery-card" aria-label="Ali photo ${index + 1}">
          <img src="${imageSvg(image)}" alt="${image.title}" />
          <figcaption>${image.title}</figcaption>
        </figure>
      `
    )
    .join('');
}

function hideWelcomeScreen() {
  welcomeScreen.classList.add('hidden');
}

welcomeScreen.addEventListener('click', () => {
  hideWelcomeScreen();
  if (!musicToggle.dataset.active) {
    musicToggle.textContent = '♫ Play Song';
  }
});

function startThreeScene() {
  const mount = document.getElementById('three-scene');
  if (!mount || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 8.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffd166, 2.6, 30);
  pointLight.position.set(3, 5, 5);
  scene.add(pointLight);

  const rimLight = new THREE.PointLight(0x7dd3fc, 2.2, 30);
  rimLight.position.set(-4, 2, 5);
  scene.add(rimLight);

  const group = new THREE.Group();
  scene.add(group);

  const cakeMaterial = new THREE.MeshStandardMaterial({ color: 0xffb0d8, roughness: 0.55, metalness: 0.15 });
  const icingMaterial = new THREE.MeshStandardMaterial({ color: 0xfff3f8, roughness: 0.45, metalness: 0.1 });
  const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0x5a3703, roughness: 0.35, metalness: 0.7 });

  const cakeBody = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.6, 1.5, 48), cakeMaterial);
  cakeBody.position.y = -0.5;
  group.add(cakeBody);

  const cakeIcing = new THREE.Mesh(new THREE.CylinderGeometry(1.38, 1.55, 0.25, 48), icingMaterial);
  cakeIcing.position.y = 0.45;
  group.add(cakeIcing);

  const candleGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.6, 24);
  const candlePositions = [-0.75, -0.25, 0.25, 0.75];

  candlePositions.forEach((x) => {
    const candle = new THREE.Mesh(candleGeometry, goldMaterial);
    candle.position.set(x, 1.2, 0);
    group.add(candle);

    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 18, 18),
      new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0xffb703, emissiveIntensity: 1.5 })
    );
    flame.position.set(x, 1.72, 0);
    group.add(flame);
  });

  const topStar = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.38, 0),
    new THREE.MeshStandardMaterial({ color: 0xffe38a, emissive: 0xffd166, emissiveIntensity: 0.8 })
  );
  topStar.position.set(0, 2.15, 0.3);
  group.add(topStar);

  const balloonMaterial1 = new THREE.MeshStandardMaterial({ color: 0xff5ecf, emissive: 0x3b0a28, roughness: 0.6 });
  const balloonMaterial2 = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, emissive: 0x093752, roughness: 0.6 });
  const balloonMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0x492d00, roughness: 0.6 });

  const balloons = [
    { x: -2.3, y: 1.5, z: 0.3, material: balloonMaterial1 },
    { x: 2.5, y: 1.9, z: -0.5, material: balloonMaterial2 },
    { x: 1.7, y: 2.5, z: 0.8, material: balloonMaterial3 }
  ];

  balloons.forEach((balloonProps) => {
    const balloon = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 24), balloonProps.material);
    balloon.position.set(balloonProps.x, balloonProps.y, balloonProps.z);
    group.add(balloon);

    const ribbon = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    ribbon.position.set(balloonProps.x, balloonProps.y - 0.6, balloonProps.z);
    group.add(ribbon);
  });

  let start = 0;
  const animate = () => {
    start += 0.016;
    group.rotation.y += 0.004;
    group.rotation.x = Math.sin(start * 1.3) * 0.18;
    topStar.rotation.y += 0.02;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  const resize = () => {
    if (!mount) return;
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  window.addEventListener('resize', resize);
}

function createConfettiBurst() {
  const burst = document.createElement('div');
  burst.style.position = 'fixed';
  burst.style.inset = '0';
  burst.style.pointerEvents = 'none';
  burst.style.zIndex = '50';
  document.body.appendChild(burst);

  const colors = ['#ffd166', '#ff5ecf', '#7dd3fc', '#7cf1ba', '#ff8ec7'];

  for (let i = 0; i < 90; i += 1) {
    const piece = document.createElement('span');
    piece.style.position = 'absolute';
    piece.style.left = `${50 + (Math.random() - 0.5) * 18}%`;
    piece.style.top = `${48 + (Math.random() - 0.5) * 12}%`;
    piece.style.width = `${8 + Math.random() * 10}px`;
    piece.style.height = `${14 + Math.random() * 16}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = '50%';
    piece.style.opacity = '0';
    piece.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
    piece.style.animation = `confettiFall ${1.6 + Math.random() * 1.5}s ease-in forwards`;
    burst.appendChild(piece);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0% { opacity: 0; transform: translate3d(0, 0, 0) rotate(0deg); }
      15% { opacity: 1; }
      100% { opacity: 0; transform: translate3d(${(Math.random() - 0.5) * 400}px, 220px, 0) rotate(${Math.random() * 720}deg); }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    burst.remove();
    style.remove();
  }, 2200);
}

let audioContext;
let musicTimer = null;
let musicPlaying = false;

function playMelody() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const melody = [
    { note: 392, duration: 0.35 },
    { note: 392, duration: 0.35 },
    { note: 440, duration: 0.5 },
    { note: 392, duration: 0.5 },
    { note: 523.25, duration: 0.5 },
    { note: 494, duration: 0.5 },
    { note: 392, duration: 0.5 },
    { note: 392, duration: 0.35 },
    { note: 440, duration: 0.35 },
    { note: 392, duration: 0.5 },
    { note: 587.33, duration: 0.5 },
    { note: 523.25, duration: 0.7 },
    { note: 392, duration: 0.4 },
    { note: 392, duration: 0.35 },
    { note: 659.25, duration: 0.5 },
    { note: 587.33, duration: 0.5 },
    { note: 523.25, duration: 0.5 },
    { note: 494, duration: 0.6 },
    { note: 659.25, duration: 0.4 },
    { note: 659.25, duration: 0.35 },
    { note: 587.33, duration: 0.5 },
    { note: 523.25, duration: 0.5 },
    { note: 440, duration: 0.7 },
    { note: 392, duration: 0.8 }
  ];

  if (!audioContext) {
    audioContext = new AudioCtx();
  }

  const now = audioContext.currentTime;
  melody.forEach((step, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = step.note;

    gainNode.gain.setValueAtTime(0.0001, now + index * 0.42 + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.09, now + index * 0.42 + 0.06);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.42 + step.duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now + index * 0.42);
    oscillator.stop(now + index * 0.42 + step.duration + 0.06);
  });
}

function toggleMusic() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  if (musicPlaying) {
    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
    musicPlaying = false;
    musicToggle.dataset.active = 'false';
    musicToggle.textContent = '♫ Play Song';
    return;
  }

  musicPlaying = true;
  musicToggle.dataset.active = 'true';
  musicToggle.textContent = '⏸ Pause Song';
  musicTimer = setInterval(() => {
    playMelody();
  }, 4200);
  playMelody();
}

musicToggle.addEventListener('click', toggleMusic);

giftButton.addEventListener('click', () => {
  giftReveal.classList.add('visible');
  createConfettiBurst();
  giftButton.textContent = '🎉 Gift Opened!';
  giftButton.disabled = true;
  giftButton.style.opacity = '0.9';
});

window.addEventListener('load', () => {
  renderGallery();
  startThreeScene();
  setTimeout(() => {
    welcomeScreen.classList.add('hidden');
  }, 1800);
});

window.addEventListener('resize', () => {
  if (galleryGrid) {
    renderGallery();
  }
});

console.log('%c🎂 Happy Birthday Ali! 🎂', 'font-size: 20px; color: #ffd166; font-weight: 700;');
