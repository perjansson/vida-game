import '@fontsource/luckiest-guy';
import * as THREE from 'three';

// Inställningar som är roliga att ändra på
const BALL_RADIUS = 0.6; // hur stor träffytan runt hunden är
const GRAVITY = 12; // hur snabbt hunden dras nedåt
const TAP_SPEED = 6; // farten uppåt när man trycker på hunden
const BOUNCE = 0.55; // hur mycket hunden studsar mot marken (0 till 1)
const HIT_MARGIN = 1.7; // gör det lättare att träffa hunden med fingret

// ---------- Språk ----------
// Spelet är skrivet på svenska. Här finns översättningar till andra språk.
// Lägg till ett nytt språk genom att kopiera listan "en" och byta texterna.
const TEXTS = {
  fi: {
    'Klä ut hunden!': 'Pue koira!',
    'Klä ut {namn}!': 'Pue {namn}!',
    'Skriv hundens namn': 'Kirjoita koiran nimi',
    ingen: 'ei mitään',
    'Tryck på knapparna för att byta kläder': 'Vaihda vaatteita painamalla nappeja',
    'Dra för att snurra på hunden': 'Pyöritä koiraa vetämällä',
    'Tryck på hunden så hoppar den': 'Paina koiraa, niin se hyppää',
    'Ge hunden ett namn': 'Anna koiralle nimi',
    'Spela!': 'Pelaa!',
    '🐶 Hund': '🐶 Koira',
    'Pudel': 'Villakoira', 'Dalmatiner': 'Dalmatiankoira', 'Mops': 'Mopsi',
    'Välj hund och byt kläder med knapparna': 'Valitse koira ja vaihda vaatteita napeilla',
    '👕 Tröja': '👕 Paita',
    'Röd': 'Punainen', 'Randig': 'Raidallinen', 'Rosa': 'Pinkki', 'Grön': 'Vihreä', 'Blå': 'Sininen',
    '🎩 Hatt': '🎩 Hattu',
    'Partyhatt': 'Juhlahattu', 'Krona': 'Kruunu', 'Rosett': 'Rusetti', 'Trollhatt': 'Velhon hattu',
    '🕶️ Glasögon': '🕶️ Lasit',
    'Solbrillor': 'Aurinkolasit',
    '🎀 Hals': '🎀 Kaula',
    'Halsband': 'Kaulapanta', 'Halsduk': 'Kaulaliina', 'Fluga': 'Solmuke',
  },
  en: {
    'Klä ut hunden!': 'Dress up the dog!',
    'Klä ut {namn}!': 'Dress up {namn}!',
    'Skriv hundens namn': "Type the dog's name",
    ingen: 'none',
    'Tryck på knapparna för att byta kläder': 'Tap the buttons to change clothes',
    'Dra för att snurra på hunden': 'Drag to spin the dog',
    'Tryck på hunden så hoppar den': 'Tap the dog to make it jump',
    'Ge hunden ett namn': 'Give the dog a name',
    'Spela!': 'Play!',
    '🐶 Hund': '🐶 Dog',
    'Pudel': 'Poodle', 'Dalmatiner': 'Dalmatian', 'Mops': 'Pug',
    'Välj hund och byt kläder med knapparna': 'Choose a dog and change clothes with the buttons',
    '👕 Tröja': '👕 Sweater',
    'Röd': 'Red', 'Randig': 'Striped', 'Rosa': 'Pink', 'Grön': 'Green', 'Blå': 'Blue',
    '🎩 Hatt': '🎩 Hat',
    'Partyhatt': 'Party hat', 'Krona': 'Crown', 'Rosett': 'Bow', 'Trollhatt': 'Wizard hat',
    '🕶️ Glasögon': '🕶️ Glasses',
    'Solbrillor': 'Sunglasses',
    '🎀 Hals': '🎀 Neck',
    'Halsband': 'Collar', 'Halsduk': 'Scarf', 'Fluga': 'Bow tie',
  },
};
let lang = 'sv';
function t(text) {
  return (TEXTS[lang] && TEXTS[lang][text]) || text;
}
const refreshers = []; // funktioner som skriver om all text när språket byts

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

// Hunden byggs av enkla former. Varje hundtyp visar olika delar (se Hundtyper längre ner).
const FUR = new THREE.MeshStandardMaterial({ color: 0xfbf1e0, roughness: 1 }); // päls
const EAR_FUR = new THREE.MeshStandardMaterial({ color: 0xecc9a0, roughness: 1 }); // öron
const MUZZLE = new THREE.MeshStandardMaterial({ color: 0xfbf1e0, roughness: 1 }); // nosparti och kinder
const LEG_FUR = new THREE.MeshStandardMaterial({ color: 0xfbf1e0, roughness: 1 }); // ben och tassar
const BLACK = new THREE.MeshStandardMaterial({ color: 0x1a1210, roughness: 0.3 });
const PINK = new THREE.MeshStandardMaterial({ color: 0xff8fb0, roughness: 0.6 });
const FLUFF = new THREE.SphereGeometry(1, 14, 12); // en boll, ändrar storlek med scale

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
function group(parent, x = 0, y = 0, z = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  return g;
}

const dog = new THREE.Group(); // hundens fötter står på y = 0
const upper = group(dog); // allt utom benen, flyttas upp när benen är långa

// Kropp: en lurvig (många bollar) och en slät (en avlång form)
const fluffyBody = group(upper);
fluff(0.36, FUR, 0.18, 0.55, 0, fluffyBody);
fluff(0.34, FUR, -0.2, 0.55, 0, fluffyBody);
fluff(0.2, FUR, 0, 0.8, 0.12, fluffyBody);
fluff(0.2, FUR, 0, 0.8, -0.12, fluffyBody);
fluff(0.22, FUR, 0.38, 0.72, 0, fluffyBody); // bröst
fluff(0.2, FUR, -0.4, 0.72, 0, fluffyBody);
const smoothBody = group(upper);
part(new THREE.CapsuleGeometry(0.31, 0.5, 8, 16), FUR, 0, 0.57, 0, smoothBody).rotation.z = Math.PI / 2;
fluff(0.21, FUR, 0.38, 0.76, 0, smoothBody); // hals

// Ben: lurviga (bollar) och släta (pinnar med tassar)
const legs = group(dog);
const fluffyLegs = group(legs);
const smoothLegs = group(legs);
for (const x of [-0.3, 0.3]) {
  for (const z of [-0.17, 0.17]) {
    fluff(0.13, LEG_FUR, x, 0.26, z, fluffyLegs);
    fluff(0.12, LEG_FUR, x + 0.03, 0.1, z, fluffyLegs);
    part(new THREE.CylinderGeometry(0.08, 0.065, 0.32, 10), LEG_FUR, x, 0.2, z, smoothLegs);
    fluff(0.085, LEG_FUR, x + 0.04, 0.06, z, smoothLegs).scale.y = 0.06;
  }
}

// Huvud
const head = group(upper, 0.55, 1.05, 0);
fluff(0.33, FUR, 0, 0, 0, head);
const lugg = [
  fluff(0.17, FUR, 0.02, 0.27, 0, head),
  fluff(0.13, FUR, 0.1, 0.24, 0.13, head),
  fluff(0.13, FUR, 0.1, 0.24, -0.13, head),
];
const snout = group(head, 0.15, -0.1, 0); // nosen kan göras längre eller plattare
fluff(0.15, MUZZLE, 0.09, 0, 0.09, snout);
fluff(0.15, MUZZLE, 0.09, 0, -0.09, snout);
fluff(0.065, BLACK, 0.23, 0.06, 0, snout); // nostipp
fluff(1, PINK, 0.18, -0.1, 0, snout).scale.set(0.05, 0.07, 0.05); // tunga
const cheeks = [fluff(0.14, MUZZLE, 0.1, -0.2, 0.17, head), fluff(0.14, MUZZLE, 0.1, -0.2, -0.17, head)];
const eyes = [fluff(0.055, BLACK, 0.27, 0.07, 0.13, head), fluff(0.055, BLACK, 0.27, 0.07, -0.13, head)];

// Öron i tre sorter. Första örat i varje par sitter på hundens vänstra sida (z > 0).
const EARS = {
  fluffy: [1, -1].map((side) => {
    const ear = group(head, -0.02, 0.12, side * 0.3);
    fluff(1, EAR_FUR, 0, -0.1, 0, ear).scale.set(0.13, 0.2, 0.1);
    fluff(0.13, EAR_FUR, 0, -0.28, 0, ear);
    return ear;
  }),
  flap: [1, -1].map((side) => {
    const ear = group(head, -0.04, 0.2, side * 0.3);
    fluff(1, EAR_FUR, 0.02, -0.15, side * 0.035, ear).scale.set(0.13, 0.2, 0.045);
    return ear;
  }),
  pointy: [1, -1].map((side) => {
    const ear = group(head, -0.04, 0.24, side * 0.19);
    part(new THREE.ConeGeometry(0.12, 0.3, 10), EAR_FUR, 0, 0.12, 0, ear);
    part(new THREE.ConeGeometry(0.07, 0.2, 10), PINK, 0.045, 0.1, 0, ear); // rosa insida
    ear.rotation.x = side * 0.25;
    return ear;
  }),
};

// Svans i fyra sorter
const tail = group(upper, -0.5, 0.8, 0);
const TAILS = { pom: group(tail), long: group(tail), curl: group(tail), bushy: group(tail) };
fluff(0.09, FUR, -0.06, 0.1, 0, TAILS.pom);
fluff(0.15, FUR, -0.1, 0.26, 0, TAILS.pom);
part(new THREE.CylinderGeometry(0.03, 0.055, 0.55, 8), FUR, -0.2, 0.18, 0, TAILS.long).rotation.z = 0.8;
part(new THREE.TorusGeometry(0.09, 0.045, 8, 16), FUR, -0.06, 0.1, 0, TAILS.curl);
fluff(0.12, FUR, -0.1, 0.1, 0, TAILS.bushy);
fluff(0.13, FUR, -0.18, 0.26, 0, TAILS.bushy);
fluff(0.12, FUR, -0.16, 0.43, 0, TAILS.bushy);
fluff(0.09, MUZZLE, -0.08, 0.55, 0, TAILS.bushy); // vit svanstipp

// ---------- Kläder ----------
// Varje sorts klädsel har en lista med val. Knapparna längst ner bläddrar mellan dem.
function mat(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
}
function bow(parent, color, x, y, z, size = 1) {
  const m = mat(color);
  for (const side of [-1, 1]) {
    fluff(1, m, x, y, z + side * 0.1 * size, parent).scale.set(0.05 * size, 0.09 * size, 0.1 * size);
  }
  fluff(0.05 * size, m, x + 0.02, y, z, parent);
}
function glasses(parent, lensColor, frameColor) {
  const lens = new THREE.CylinderGeometry(0.085, 0.085, 0.03, 20);
  for (const z of [-0.13, 0.13]) {
    part(lens, mat(lensColor), 0.34, 0.09, z, parent).rotation.z = Math.PI / 2;
    part(new THREE.TorusGeometry(0.085, 0.015, 8, 20), mat(frameColor), 0.35, 0.09, z, parent).rotation.y = Math.PI / 2;
  }
  part(new THREE.BoxGeometry(0.02, 0.025, 0.1), mat(frameColor), 0.35, 0.1, 0, parent);
}
function collar(parent, color, thickness) {
  const neck = new THREE.Group();
  neck.position.set(0.42, 0.86, 0);
  neck.rotation.z = -0.6;
  parent.add(neck);
  part(new THREE.TorusGeometry(0.2, thickness, 10, 24), mat(color), 0, 0, 0, neck).rotation.x = Math.PI / 2;
  return neck;
}

function sweater(parent, color, stripeColor) {
  const knit = new THREE.MeshStandardMaterial({ color, roughness: 1 });
  const torso = part(new THREE.CapsuleGeometry(0.39, 0.4, 8, 16), knit, 0, 0.6, 0, parent);
  torso.rotation.z = Math.PI / 2; // lägg tröjan ner längs kroppen
  torso.scale.set(0.9, 1, 1);
  for (const z of [-0.17, 0.17]) {
    part(new THREE.CylinderGeometry(0.15, 0.15, 0.16, 12), knit, 0.3, 0.27, z, parent); // ärmar
  }
  if (stripeColor !== undefined) {
    for (const x of [-0.22, 0, 0.22]) {
      const stripe = part(new THREE.TorusGeometry(0.385, 0.025, 8, 28), mat(stripeColor), x, 0.6, 0, parent);
      stripe.rotation.y = Math.PI / 2;
      stripe.scale.set(1, 0.9, 1);
    }
  }
}

const wardrobe = [
  {
    label: '👕 Tröja',
    parent: upper,
    options: [
      ['Röd', (g) => sweater(g, 0xe63946)],
      ['Randig', (g) => sweater(g, 0x2a6bff, 0xffffff)],
      ['Rosa', (g) => sweater(g, 0xff8fc7, 0xffffff)],
      ['Grön', (g) => sweater(g, 0x2ecc71, 0xffd93d)],
    ],
  },
  {
    label: '🎩 Hatt',
    parent: head,
    options: [
      ['Partyhatt', (g) => {
        part(new THREE.ConeGeometry(0.17, 0.42, 16), mat(0xff5fa2), 0, 0.6, 0, g);
        fluff(0.06, mat(0xffd93d), 0, 0.83, 0, g);
      }],
      ['Krona', (g) => {
        const gold = new THREE.MeshStandardMaterial({ color: 0xffc933, roughness: 0.3, metalness: 0.5 });
        part(new THREE.CylinderGeometry(0.17, 0.15, 0.12, 16), gold, 0, 0.47, 0, g);
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2;
          part(new THREE.ConeGeometry(0.04, 0.12, 8), gold, Math.cos(a) * 0.14, 0.58, Math.sin(a) * 0.14, g);
        }
      }],
      ['Rosett', (g) => bow(g, 0xff5fa2, 0.12, 0.42, 0, 1.2)],
      ['Trollhatt', (g) => {
        part(new THREE.CylinderGeometry(0.32, 0.32, 0.03, 20), mat(0x7b3fd1), 0, 0.42, 0, g);
        part(new THREE.ConeGeometry(0.2, 0.5, 16), mat(0x7b3fd1), 0, 0.68, 0, g);
        fluff(0.05, mat(0xffd93d), 0, 0.94, 0, g);
      }],
    ],
  },
  {
    label: '🕶️ Glasögon',
    parent: head,
    options: [
      ['Solbrillor', (g) => glasses(g, 0x111111, 0x111111)],
      ['Rosa', (g) => glasses(g, 0xff9ecb, 0xff3d8b)],
      ['Blå', (g) => glasses(g, 0x9ee7ff, 0x2a6bff)],
    ],
  },
  {
    label: '🎀 Hals',
    parent: upper,
    options: [
      ['Halsband', (g) => {
        const neck = collar(g, 0x2a9dff, 0.04);
        fluff(0.06, mat(0xffc933), 0.24, -0.04, 0, neck);
      }],
      ['Halsduk', (g) => {
        const neck = collar(g, 0xe63946, 0.075);
        part(new THREE.BoxGeometry(0.06, 0.3, 0.12), mat(0xe63946), 0.24, -0.16, 0.06, neck);
      }],
      ['Fluga', (g) => {
        collar(g, 0x222222, 0.03);
        bow(g, 0x2ecc71, 0.66, 0.78, 0, 1);
      }],
    ],
  },
];

const buttonBar = document.getElementById('buttons');
for (const kind of wardrobe) {
  kind.items = kind.options.map(([, build]) => {
    const g = new THREE.Group();
    build(g);
    g.visible = false;
    kind.parent.add(g);
    return g;
  });
  kind.choice = -1; // -1 betyder ingenting på sig
  const button = document.createElement('button');
  const show = () => {
    kind.items.forEach((g, i) => (g.visible = i === kind.choice));
    const name = kind.choice < 0 ? 'ingen' : kind.options[kind.choice][0];
    button.innerHTML = `${t(kind.label)}<small>${t(name)}</small>`;
  };
  refreshers.push(show);
  button.addEventListener('click', () => {
    kind.choice = kind.choice + 1 >= kind.items.length ? -1 : kind.choice + 1;
    show();
    speedY = Math.max(speedY, 2.5); // ett litet glädjeskutt
  });
  show();
  buttonBar.appendChild(button);
}

// ---------- Hundtyper ----------
// Varje hundtyp har egen storlek, benlängd, nos, öron, svans och färger.
// Kläderna sitter fast på kroppen och huvudet, så de följer med och passar alla.
const spots = group(upper); // dalmatinerns prickar
const spotsOnHead = group(head);
function spotsOn(parent, cx, cy, cz, radius, directions, size) {
  for (const [dx, dy, dz] of directions) {
    const d = new THREE.Vector3(dx, dy, dz).normalize().multiplyScalar(radius - 0.02);
    fluff(size, BLACK, cx + d.x, cy + d.y, cz + d.z, parent);
  }
}
spotsOn(spots, 0.18, 0.57, 0, 0.35, [[0.1, 0.4, 1], [0.6, 0.1, 0.8], [0.2, 0.5, -1], [0.7, 0.3, -0.6], [0.3, -0.4, 1], [0.2, 1, 0.2]], 0.05);
spotsOn(spots, -0.2, 0.57, 0, 0.35, [[-0.2, 0.3, 1], [-0.7, 0.2, 0.6], [-0.1, 0.5, -1], [-0.8, 0.4, -0.3], [-0.3, -0.4, -1], [-0.2, 1, -0.2]], 0.05);
spotsOn(spotsOnHead, 0, 0, 0, 0.33, [[-0.2, 0.7, 0.6], [-0.6, 0.3, -0.7], [0.1, 0.9, -0.4], [-0.9, 0.2, 0.2], [0.5, 0.5, 0.75]], 0.05);

const BREEDS = [
  // size = hur stor hunden är, legs = hur långa benen är, snout = nosens längd, höjd och bredd
  { name: 'Maltipoo', size: 0.8, legs: 0.8, fluffy: true, lugg: true, cheeks: true, snout: [0.9, 1, 1],
    ears: 'fluffy', tail: 'pom', fur: 0xfbf1e0, legFur: 0xfbf1e0, earFur: 0xecc9a0, muzzle: 0xfbf1e0 },
  { name: 'Pudel', size: 1.05, legs: 1.5, fluffy: true, lugg: true, snout: [1.45, 0.8, 0.75],
    ears: 'fluffy', tail: 'pom', fur: 0x8a5a3a, legFur: 0x8a5a3a, earFur: 0x6e4429, muzzle: 0x8a5a3a },
  { name: 'Dalmatiner', size: 1.15, legs: 1.5, spots: true, snout: [1.5, 0.85, 0.8],
    ears: 'flap', tail: 'long', fur: 0xffffff, legFur: 0xffffff, earFur: 0x1a1a1a, muzzle: 0xffffff },
  { name: 'Mops', size: 0.72, legs: 0.7, cheeks: true, snout: [0.55, 1, 1.1], eyes: 1.35,
    ears: 'flap', earSize: 0.7, tail: 'curl', fur: 0xe8d2a6, legFur: 0xe8d2a6, earFur: 0x3a2a22, muzzle: 0x3a2a22 },
  { name: 'Husky', size: 1.15, legs: 1.3, cheeks: true, snout: [1.4, 0.9, 0.85],
    ears: 'pointy', tail: 'bushy', fur: 0x7f8b99, legFur: 0xffffff, earFur: 0x5f6b78, muzzle: 0xffffff },
];
let breedIndex = 0;
try { breedIndex = Number(localStorage.getItem('breed')) || 0; } catch {}
if (!BREEDS[breedIndex]) breedIndex = 0;
let breed = BREEDS[breedIndex];
const hats = wardrobe.find((kind) => kind.label === '🎩 Hatt');
const breedButton = document.createElement('button');
function showBreed() {
  breed = BREEDS[breedIndex];
  FUR.color.setHex(breed.fur);
  LEG_FUR.color.setHex(breed.legFur);
  EAR_FUR.color.setHex(breed.earFur);
  MUZZLE.color.setHex(breed.muzzle);

  dog.scale.setScalar(breed.size);
  legs.scale.y = breed.legs;
  upper.position.y = (breed.legs - 1) * 0.3; // längre ben lyfter kroppen

  fluffyBody.visible = fluffyLegs.visible = !!breed.fluffy;
  smoothBody.visible = smoothLegs.visible = !breed.fluffy;
  for (const tuft of lugg) tuft.visible = !!breed.lugg;
  for (const cheek of cheeks) cheek.visible = !!breed.cheeks;
  for (const eye of eyes) eye.scale.setScalar(0.055 * (breed.eyes || 1));
  snout.scale.set(...breed.snout);
  for (const [kind, pair] of Object.entries(EARS)) {
    for (const ear of pair) {
      ear.visible = kind === breed.ears;
      ear.scale.setScalar(breed.earSize || 1);
    }
  }
  for (const [kind, shape] of Object.entries(TAILS)) shape.visible = kind === breed.tail;
  spots.visible = spotsOnHead.visible = !!breed.spots;
  for (const hat of hats.items) hat.position.y = breed.lugg ? 0 : -0.1; // hatten sitter lägre utan lugg

  breedButton.innerHTML = `${t('🐶 Hund')}<small>${t(breed.name)}</small>`;
}
breedButton.addEventListener('click', () => {
  breedIndex = (breedIndex + 1) % BREEDS.length;
  try { localStorage.setItem('breed', breedIndex); } catch {}
  showBreed();
  speedY = Math.max(speedY, 2.5);
});
refreshers.push(showBreed);
showBreed();
buttonBar.prepend(breedButton);

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
  dragX = event.clientX;
});

// Dra med fingret eller musen för att snurra på hunden
let dragX = null;
window.addEventListener('pointermove', (event) => {
  if (dragX === null) return;
  dog.rotation.y += (event.clientX - dragX) * 0.012;
  dragX = event.clientX;
});
window.addEventListener('pointerup', () => (dragX = null));
window.addEventListener('pointercancel', () => (dragX = null));

// Hundens namn: skrivs i rutan överst och sparas bara på den här enheten
const info = document.getElementById('info');
const nameInput = document.getElementById('name');
function showName() {
  const name = nameInput.value.trim();
  info.textContent = name ? t('Klä ut {namn}!').replace('{namn}', name) : t('Klä ut hunden!');
  nameInput.placeholder = t('Skriv hundens namn');
  try { localStorage.setItem('dogName', name); } catch {}
}
try { nameInput.value = localStorage.getItem('dogName') || ''; } catch {}
nameInput.addEventListener('input', showName);
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') nameInput.blur(); // stäng tangentbordet på mobilen
});
showName();
refreshers.push(showName);

// Startskärmen: förklarar spelet. Man väljer språk och trycker sedan på Spela.
const startScreen = document.getElementById('start');
const langButtons = startScreen.querySelectorAll('#langs button');
refreshers.push(() => {
  for (const el of startScreen.querySelectorAll('[data-t]')) el.textContent = t(el.dataset.t);
  for (const button of langButtons) button.classList.toggle('chosen', button.dataset.lang === lang);
});
function setLanguage(newLang) {
  lang = newLang;
  document.documentElement.lang = lang;
  try { localStorage.setItem('lang', lang); } catch {}
  for (const refresh of refreshers) refresh();
}
for (const button of langButtons) {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
}
document.getElementById('play').addEventListener('click', () => {
  startScreen.hidden = true;
  speedY = TAP_SPEED; // hunden hoppar av glädje när spelet börjar
});
let savedLang = 'sv';
try { savedLang = localStorage.getItem('lang') || 'sv'; } catch {}
setLanguage(savedLang === 'sv' || TEXTS[savedLang] ? savedLang : 'sv');

// Jordglob-knappen öppnar språkvalet igen, mitt i spelet. Kläderna och namnet finns kvar.
document.getElementById('language').addEventListener('click', () => {
  startScreen.hidden = false;
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
  const flap = inAir ? -0.9 : Math.sin(t * 2) * 0.05; // öronen flaxar utåt i luften
  for (const pair of [EARS.fluffy, EARS.flap]) {
    pair[0].rotation.x = flap;
    pair[1].rotation.x = -flap;
  }

  // Kameran följer mjukt med hunden uppåt
  const targetY = Math.max(1, dog.position.y + DOG_CENTER);
  cameraY += (targetY - cameraY) * Math.min(1, dt * 5);
  camera.position.y = cameraY + 1;
  camera.lookAt(0, cameraY, 0);

  renderer.render(scene, camera);
});
