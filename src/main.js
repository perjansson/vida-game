import '@fontsource/luckiest-guy';
import * as THREE from 'three';

// Inställningar som är roliga att ändra på
const BALL_RADIUS = 0.6; // hur stor träffytan runt hunden är
const GRAVITY = 12; // hur snabbt hunden dras nedåt
const TAP_SPEED = 6; // farten uppåt när man trycker på hunden
const BOUNCE = 0.55; // hur mycket hunden studsar mot marken (0 till 1)
const HIT_MARGIN = 1.7; // gör det lättare att träffa hunden med fingret

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

// Stjärnor, så att man ser hur högt hunden kommer
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
const starGeometry = new THREE.SphereGeometry(0.06, 6, 6);
for (let i = 0; i < 80; i++) {
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.set((Math.random() - 0.5) * 16, 2 + Math.random() * 60, -3 - Math.random() * 6);
  scene.add(star);
}

// Hunden: en fluffig maltipoo, byggd av många mjuka bollar
const FUR = new THREE.MeshStandardMaterial({ color: 0xfbf1e0, roughness: 1 }); // gräddvit päls
const EAR_FUR = new THREE.MeshStandardMaterial({ color: 0xecc9a0, roughness: 1 }); // aprikosfärgade öron
const BLACK = new THREE.MeshStandardMaterial({ color: 0x1a1210, roughness: 0.3 });
const PINK = new THREE.MeshStandardMaterial({ color: 0xff8fb0, roughness: 0.6 });
const FLUFF = new THREE.SphereGeometry(1, 12, 10); // en pälstuss, ändrar storlek med scale

function part(geometry, material, x, y, z, parent) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}
function fluff(size, material, x, y, z, parent) {
  const mesh = part(FLUFF, material, x, y, z, parent);
  mesh.scale.setScalar(size);
  return mesh;
}

const dog = new THREE.Group(); // hundens fötter står på y = 0

// Kropp: rund och lurvig
fluff(0.36, FUR, 0.18, 0.55, 0, dog);
fluff(0.34, FUR, -0.2, 0.55, 0, dog);
fluff(0.2, FUR, 0, 0.8, 0.12, dog);
fluff(0.2, FUR, 0, 0.8, -0.12, dog);
fluff(0.22, FUR, 0.38, 0.72, 0, dog); // bröst
fluff(0.2, FUR, -0.4, 0.72, 0, dog);

// Korta ben med fluffiga tassar
for (const x of [-0.3, 0.3]) {
  for (const z of [-0.17, 0.17]) {
    fluff(0.13, FUR, x, 0.26, z, dog);
    fluff(0.12, FUR, x + 0.03, 0.1, z, dog);
  }
}

// Huvud: stort och runt med lurvig lugg
const head = new THREE.Group();
head.position.set(0.55, 1.05, 0);
dog.add(head);
fluff(0.33, FUR, 0, 0, 0, head);
fluff(0.17, FUR, 0.02, 0.27, 0, head); // lugg
fluff(0.13, FUR, 0.1, 0.24, 0.13, head);
fluff(0.13, FUR, 0.1, 0.24, -0.13, head);
fluff(0.15, FUR, 0.24, -0.1, 0.09, head); // nosparti
fluff(0.15, FUR, 0.24, -0.1, -0.09, head);
fluff(0.14, FUR, 0.1, -0.2, 0.17, head); // kinder
fluff(0.14, FUR, 0.1, -0.2, -0.17, head);
fluff(0.065, BLACK, 0.38, -0.04, 0, head); // nos
fluff(0.055, BLACK, 0.27, 0.07, 0.13, head); // knappögon
fluff(0.055, BLACK, 0.27, 0.07, -0.13, head);
const tongue = fluff(0.05, PINK, 0.33, -0.2, 0, head);
tongue.scale.set(0.05, 0.07, 0.05);

// Hängande, lurviga öron
const ears = [0.3, -0.3].map((z) => {
  const ear = new THREE.Group();
  ear.position.set(-0.02, 0.12, z);
  head.add(ear);
  fluff(0.14, EAR_FUR, 0, -0.1, 0, ear).scale.set(0.13, 0.2, 0.1);
  fluff(0.13, EAR_FUR, 0, -0.28, 0, ear);
  return ear;
});

// Svans: en liten pompom
const tail = new THREE.Group();
tail.position.set(-0.5, 0.8, 0);
dog.add(tail);
fluff(0.09, FUR, -0.06, 0.1, 0, tail);
fluff(0.15, FUR, -0.1, 0.26, 0, tail);

dog.rotation.y = -0.5; // vrid hunden lite mot kameran
scene.add(dog);

const DOG_CENTER = 0.7; // ungefär mitt på hunden, för att träffa med fingret
const dogCenter = new THREE.Vector3();
let speedY = 0; // hundens fart uppåt (minus betyder nedåt)

// Tryck eller klick på hunden får den att hoppa
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  dogCenter.set(dog.position.x, dog.position.y + DOG_CENTER, dog.position.z);
  if (raycaster.ray.distanceToPoint(dogCenter) < BALL_RADIUS * HIT_MARGIN) {
    speedY = TAP_SPEED;
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
  dog.position.y += speedY * dt;
  if (dog.position.y < 0) {
    dog.position.y = 0;
    speedY = Math.abs(speedY) > 1 ? -speedY * BOUNCE : 0;
  }

  // Svansen viftar, snabbare när hunden är i luften
  const t = clock.elapsedTime;
  const inAir = dog.position.y > 0.01;
  tail.rotation.x = Math.sin(t * (inAir ? 22 : 9)) * 0.6;
  ears[0].rotation.x = inAir ? -0.9 : Math.sin(t * 2) * 0.05; // öronen flaxar utåt i luften
  ears[1].rotation.x = -ears[0].rotation.x;

  // Kameran följer mjukt med hunden uppåt
  const targetY = Math.max(1, dog.position.y + DOG_CENTER);
  cameraY += (targetY - cameraY) * Math.min(1, dt * 5);
  camera.position.y = cameraY + 1;
  camera.lookAt(0, cameraY, 0);

  renderer.render(scene, camera);
});
