const originalGallery = document.getElementById('originalGallery');
const aiGallery = document.getElementById('aiGallery');
const welcomeScreen = document.getElementById('welcomeScreen');
const musicToggle = document.getElementById('musicToggle');
const giftButton = document.getElementById('giftButton');
const giftReveal = document.getElementById('giftReveal');

const originalPhotos = [
  { name: 'ali-1.jpg', label: 'Ali Memory 1' },
  { name: 'ali-2.jpg', label: 'Ali Memory 2' },
  { name: 'ali-3.jpg', label: 'Ali Memory 3' },
  { name: 'ali-4.jpg', label: 'Ali Memory 4' },
  { name: 'ali-5.jpg', label: 'Ali Memory 5' },
  { name: 'ali-6.jpg', label: 'Ali Memory 6' },
  { name: 'ali-7.jpg', label: 'Ali Memory 7' }
];

const aiPhotos = [
  { name: 'ali-royal-prince.jpg', label: 'Royal Prince Ali' },
  { name: 'ali-birthday-king.jpg', label: 'Birthday King Ali' },
  { name: 'ali-cinematic-portrait.jpg', label: 'Cinematic Portrait' },
  { name: 'ali-magical-portrait.jpg', label: 'Magical Birthday Portrait' }
];

function createOriginalGallery() {
  originalGallery.innerHTML = originalPhotos
    .map(
      (photo, index) => `
        <figure class="gallery-card">
          <img
            src="assets/photos/original/${photo.name}"
            alt="${photo.label}"
            onerror="this.style.display='none'; this.parentElement.classList.add('placeholder-card')"
          />
          <figcaption>Ali ${index + 1}</figcaption>
        </figure>
      `
    )
    .join('');
}

function createAiGallery() {
  aiGallery.innerHTML = aiPhotos
    .map(
      (photo) => `
        <figure class="ai-card">
          <img
            src="assets/photos/ai/${photo.name}"
            alt="${photo.label}"
            onerror="this.style.display='none'; this.parentElement.classList.add('placeholder-card')"
          />
          <figcaption>${photo.label}</figcaption>
        </figure>
      `
    )
    .join('');
}

welcomeScreen.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
});

let audioContext;
let musicTimer = null;
let musicPlaying = false;

function playTone(freq, duration, time) {
  const context = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  audioContext = context;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(freq, context.currentTime + time);
  gain.gain.setValueAtTime(0.001, context.currentTime + time);
  gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + time + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + time + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(context.currentTime + time);
  oscillator.stop(context.currentTime + time + duration);
}

function playBirthdayMelody() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const melody = [392, 392, 440, 392, 523.25, 494, 392, 392, 440, 392, 587.33, 523.25];

  melody.forEach((note, index) => {
    playTone(note, 0.42, index * 0.35);
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
    musicToggle.textContent = '♫ Play Song';
    return;
  }

  musicPlaying = true;
  musicToggle.textContent = '⏸ Pause Song';
  playBirthdayMelody();
  musicTimer = setInterval(playBirthdayMelody, 4300);
}

musicToggle.addEventListener('click', toggleMusic);

giftButton.addEventListener('click', () => {
  giftReveal.classList.add('visible');
  giftButton.textContent = '🎉 Gift Opened!';
  giftButton.disabled = true;
  const burst = document.createElement('div');
  burst.textContent = '✨ 🎊 ✨ 🎉 ✨';
  burst.style.position = 'fixed';
  burst.style.left = '50%';
  burst.style.top = '50%';
  burst.style.transform = 'translate(-50%, -50%)';
  burst.style.fontSize = '3rem';
  burst.style.zIndex = '30';
  burst.style.pointerEvents = 'none';
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 1200);
});

function initThreeScene() {
  const mount = document.getElementById('three-scene');
  if (!mount || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 8.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambient);

  const point = new THREE.PointLight(0xffd166, 3, 30);
  point.position.set(2, 5, 6);
  scene.add(point);

  const rim = new THREE.PointLight(0x7dd3fc, 2.5, 30);
  rim.position.set(-4, 3, 5);
  scene.add(rim);

  const group = new THREE.Group();
  scene.add(group);

  const cakeMaterial = new THREE.MeshStandardMaterial({ color: 0xffafdd, roughness: 0.5 });
  const icing = new THREE.MeshStandardMaterial({ color: 0xfff5ff, roughness: 0.4 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0x563a00, roughness: 0.3, metalness: 0.7 });

  const cakeBody = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.7, 1.5, 48), cakeMaterial);
  cakeBody.position.y = -0.8;
  group.add(cakeBody);

  const cakeTop = new THREE.Mesh(new THREE.CylinderGeometry(1.38, 1.45, 0.25, 48), icing);
  cakeTop.position.y = 0.25;
  group.add(cakeTop);

  const candleGeom = new THREE.CylinderGeometry(0.08, 0.1, 0.6, 14);
  [-0.8, -0.3, 0.25, 0.75].forEach((x) => {
    const candle = new THREE.Mesh(candleGeom, gold);
    candle.position.set(x, 1.1, 0);
    group.add(candle);

    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0xffb703, emissiveIntensity: 1.8 })
    );
    flame.position.set(x, 1.7, 0);
    group.add(flame);
  });

  const star = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.38, 0),
    new THREE.MeshStandardMaterial({ color: 0xffe38a, emissive: 0xffd166, emissiveIntensity: 1.2 })
  );
  star.position.set(0, 2.15, 0.3);
  group.add(star);

  const colors = [0xff79c6, 0x7dd3fc, 0xffd166];
  for (let i = 0; i < 3; i += 1) {
    const balloon = new THREE.Mesh(
      new THREE.SphereGeometry(0.56, 24, 24),
      new THREE.MeshStandardMaterial({ color: colors[i], emissive: colors[i], emissiveIntensity: 0.18, roughness: 0.6 })
    );
    balloon.position.set(i * 2.2 - 2.2, 1.8 + i * 0.3, (i - 1) * 1.2);
    group.add(balloon);
  }

  let time = 0;
  function animate() {
    time += 0.016;
    group.rotation.y += 0.004;
    group.rotation.x = Math.sin(time * 1.4) * 0.22;
    star.rotation.y += 0.02;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

window.addEventListener('load', () => {
  createOriginalGallery();
  createAiGallery();
  initThreeScene();
  setTimeout(() => welcomeScreen.classList.add('hidden'), 1600);
});

console.log('%c🎂 Happy Birthday Ali! 🎂', 'font-size: 20px; color: #ffd166; font-weight: 700;');
