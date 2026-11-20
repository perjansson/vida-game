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

// Hunden, byggd av enkla former
const FUR = new THREE.MeshStandardMaterial({ color: 0xc98a4b, roughness: 0.8 });
const DARK = new THREE.MeshStandardMaterial({ color: 0x4a2f1a, roughness: 0.8 });
const BLACK = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4 });

function part(geometry, material, x, y, z, parent) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

const dog = new THREE.Group(); // hundens fötter står på y = 0
const body = part(new THREE.CapsuleGeometry(0.32, 0.6, 6, 12), FUR, 0, 0.6, 0, dog);
body.rotation.z = Math.PI / 2; // lägg kroppen ner
for (const x of [-0.32, 0.32]) {
  for (const z of [-0.18, 0.18]) {
    part(new THREE.CylinderGeometry(0.09, 0.09, 0.4, 10), FUR, x, 0.2, z, dog);
  }
}
const head = new THREE.Group();
head.position.set(0.62, 1.0, 0);
dog.add(head);
part(new THREE.SphereGeometry(0.3, 20, 16), FUR, 0, 0, 0, head);
part(new THREE.SphereGeometry(0.16, 14, 12), FUR, 0.26, -0.08, 0, head); // nos
part(new THREE.SphereGeometry(0.06, 10, 8), BLACK, 0.41, -0.04, 0, head); // nosspets
part(new THREE.SphereGeometry(0.045, 10, 8), BLACK, 0.24, 0.1, 0.13, head); // ögon
part(new THREE.SphereGeometry(0.045, 10, 8), BLACK, 0.24, 0.1, -0.13, head);
const ears = [0.26, -0.26].map((z) => {
  const ear = part(new THREE.SphereGeometry(0.14, 10, 8), DARK, -0.05, 0.05, z, head);
  ear.scale.set(0.6, 1.4, 0.5);
  return ear;
});
const tail = new THREE.Group();
tail.position.set(-0.6, 0.75, 0);
dog.add(tail);
const tailMesh = part(new THREE.CylinderGeometry(0.05, 0.07, 0.45, 8), DARK, -0.1, 0.18, 0, tail);
tailMesh.rotation.z = 0.5;

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
  for (const ear of ears) ear.rotation.z = inAir ? -0.6 : Math.sin(t * 2) * 0.05;

  // Kameran följer mjukt med hunden uppåt
  const targetY = Math.max(1, dog.position.y + DOG_CENTER);
  cameraY += (targetY - cameraY) * Math.min(1, dt * 5);
  camera.position.y = cameraY + 1;
  camera.lookAt(0, cameraY, 0);

  renderer.render(scene, camera);
});
