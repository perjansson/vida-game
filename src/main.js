import '@fontsource/luckiest-guy';
import * as THREE from 'three';

// Inställningar som är roliga att ändra på
const BALL_RADIUS = 0.6;
const GRAVITY = 12; // hur snabbt bollen dras nedåt
const TAP_SPEED = 6; // farten uppåt när man trycker på bollen
const BOUNCE = 0.55; // hur mycket bollen studsar mot marken (0 till 1)
const HIT_MARGIN = 1.7; // gör det lättare att träffa bollen med fingret

// Scen, kamera och renderare
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1b1035);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
let cameraY = 1;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Ljus
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(3, 8, 4);
sun.castShadow = true;
scene.add(sun);

// Mark
const ground = new THREE.Mesh(
  new THREE.CircleGeometry(6, 48),
  new THREE.MeshStandardMaterial({ color: 0x3b2a6b })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Stjärnor, så att man ser hur högt bollen kommer
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
const starGeometry = new THREE.SphereGeometry(0.06, 6, 6);
for (let i = 0; i < 80; i++) {
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.set((Math.random() - 0.5) * 16, 2 + Math.random() * 60, -3 - Math.random() * 6);
  scene.add(star);
}

// Bollen
const ball = new THREE.Mesh(
  new THREE.SphereGeometry(BALL_RADIUS, 32, 24),
  new THREE.MeshStandardMaterial({ color: 0xff5fa2, roughness: 0.35 })
);
ball.position.y = BALL_RADIUS;
ball.castShadow = true;
scene.add(ball);

let speedY = 0; // bollens fart uppåt (minus betyder nedåt)

// Tryck eller klick på bollen skickar den uppåt och byter färg
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  if (raycaster.ray.distanceToPoint(ball.position) < BALL_RADIUS * HIT_MARGIN) {
    speedY = TAP_SPEED;
    ball.material.color.setHSL(Math.random(), 0.9, 0.6);
  }
});

// Anpassa till skärmens storlek, både stående och liggande
function resize() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  camera.position.z = aspect < 1 ? 7.5 : 6; // lite längre bort på stående mobil
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resize);
resize();

// Spelloopen
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);

  // Tyngdkraft och studs mot marken
  speedY -= GRAVITY * dt;
  ball.position.y += speedY * dt;
  if (ball.position.y < BALL_RADIUS) {
    ball.position.y = BALL_RADIUS;
    speedY = Math.abs(speedY) > 1 ? -speedY * BOUNCE : 0;
  }

  // Kameran följer mjukt med bollen uppåt
  const targetY = Math.max(1, ball.position.y);
  cameraY += (targetY - cameraY) * Math.min(1, dt * 5);
  camera.position.y = cameraY + 1;
  camera.lookAt(0, cameraY, 0);

  renderer.render(scene, camera);
});
