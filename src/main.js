import '@fontsource/luckiest-guy';
import '@fontsource/fredoka/600.css';
import '@fontsource/fredoka/700.css';
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
    'Hundens namn': 'Koiran nimi',
    ingen: 'ei mitään',
    'Tryck på knapparna för att byta kläder': 'Vaihda vaatteita painamalla nappeja',
    'Dra för att snurra på hunden': 'Pyöritä koiraa vetämällä',
    'Tryck på hunden så hoppar den': 'Paina koiraa, niin se hyppää',
    'Ge hunden ett namn': 'Anna koiralle nimi',
    'Spela!': 'Pelaa!',
    '🐶 Hund': '🐶 Koira',
    'Pudel': 'Villakoira', 'Dalmatiner': 'Dalmatiankoira', 'Mops': 'Mopsi',
    'Välj hund och kläder längst ner': 'Valitse koira ja vaatteet alhaalta',
    'Spring banor och hoppa över hinder': 'Juokse ratoja ja hyppää esteiden yli',
    'Ta hand om hunden efter varje bana': 'Hoida koiraa jokaisen radan jälkeen',
    'Spring bana {n}!': 'Juokse rata {n}!', 'Bana {n}': 'Rata {n}', 'Tryck för att hoppa!': 'Hyppää napauttamalla!',
    'Oj då!': 'Hups!', 'Hunden snubblade. Försök igen!': 'Koira kompastui. Yritä uudelleen!',
    'Försök igen': 'Yritä uudelleen', 'Garderoben': 'Vaatekaappi',
    'Bra sprunget!': 'Hyvin juostu!', 'Samla ben på banorna': 'Kerää luita radoilta', 'Nu behöver hunden lite omsorg': 'Nyt koira tarvitsee hoivaa',
    'Hunden är glad igen!': 'Koira on taas iloinen!',
    'Mat': 'Ruoka', 'Vatten': 'Vesi', 'Klappa': 'Silitä',
    'Välj färg på kläderna': 'Valitse vaatteiden väri',
    'Enfärgad': 'Yksivärinen', 'Keps': 'Lippis', 'Mössa': 'Pipo', 'Färgade': 'Värilliset', 'Runda': 'Pyöreät',
    'Stövlar': 'Saappaat', 'Strumpor': 'Sukat', 'Mantel': 'Viitta', 'Vingar': 'Siivet', 'Ryggsäck': 'Reppu',
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
    'Hundens namn': "Dog's name",
    ingen: 'none',
    'Tryck på knapparna för att byta kläder': 'Tap the buttons to change clothes',
    'Dra för att snurra på hunden': 'Drag to spin the dog',
    'Tryck på hunden så hoppar den': 'Tap the dog to make it jump',
    'Ge hunden ett namn': 'Give the dog a name',
    'Spela!': 'Play!',
    '🐶 Hund': '🐶 Dog',
    'Pudel': 'Poodle', 'Dalmatiner': 'Dalmatian', 'Mops': 'Pug',
    'Välj hund och kläder längst ner': 'Choose a dog and clothes at the bottom',
    'Spring banor och hoppa över hinder': 'Run levels and jump over obstacles',
    'Ta hand om hunden efter varje bana': 'Take care of the dog after each level',
    'Spring bana {n}!': 'Run level {n}!', 'Bana {n}': 'Level {n}', 'Tryck för att hoppa!': 'Tap to jump!',
    'Oj då!': 'Oops!', 'Hunden snubblade. Försök igen!': 'The dog tripped. Try again!',
    'Försök igen': 'Try again', 'Garderoben': 'Wardrobe',
    'Bra sprunget!': 'Well run!', 'Samla ben på banorna': 'Collect bones on the levels', 'Nu behöver hunden lite omsorg': 'Now the dog needs some care',
    'Hunden är glad igen!': 'The dog is happy again!',
    'Mat': 'Food', 'Vatten': 'Water', 'Klappa': 'Pet',
    'Välj färg på kläderna': 'Pick colours for the clothes',
    'Enfärgad': 'Plain', 'Keps': 'Cap', 'Mössa': 'Beanie', 'Färgade': 'Tinted', 'Runda': 'Round',
    'Stövlar': 'Boots', 'Strumpor': 'Socks', 'Mantel': 'Cape', 'Vingar': 'Wings', 'Ryggsäck': 'Backpack',
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

// ---------- Ljud ----------
// Alla ljud görs direkt i webbläsaren av enkla toner, inga ljudfiler behövs.
let audio = null;
let soundOn = true;
try { soundOn = localStorage.getItem('sound') !== 'off'; } catch {}
function tone(from, to, seconds, type = 'sine', volume = 0.15, delay = 0) {
  if (!soundOn) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    const start = audio.currentTime + delay;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, start);
    osc.frequency.exponentialRampToValueAtTime(to, start + seconds);
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + seconds);
    osc.connect(gain).connect(audio.destination);
    osc.start(start);
    osc.stop(start + seconds + 0.02);
  } catch {}
}
function melody(notes, step, seconds = 0.22) {
  notes.forEach((note, i) => tone(note, note, seconds, 'triangle', 0.18, i * step));
}
const SOUND = {
  jump: () => tone(320, 720, 0.18, 'square', 0.06),
  bark: () => { tone(540, 250, 0.09, 'sawtooth', 0.14); tone(500, 220, 0.12, 'sawtooth', 0.14, 0.14); }, // voff voff
  pop: () => tone(600, 950, 0.07, 'sine', 0.14),
  hit: () => tone(210, 70, 0.3, 'triangle', 0.3),
  win: () => melody([523, 659, 784, 1047, 784, 1047], 0.12),
  lose: () => melody([392, 330, 262], 0.2, 0.3),
  Mat: () => tone(190, 90, 0.06, 'square', 0.08), // knaprar
  Vatten: () => tone(480, 820, 0.08, 'sine', 0.12), // lapar
  Klappa: () => tone(330, 440, 0.2, 'sine', 0.08), // myser
  happy: () => melody([659, 880, 1319], 0.1),
};

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
scene.add(new THREE.AmbientLight(0xffffff, 2.2));
const sun = new THREE.DirectionalLight(0xffffff, 2.0);
sun.position.set(3, 8, 4);
sun.castShadow = true;
scene.add(sun);
scene.add(sun.target); // så att solen kan följa med hunden på banan

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
const stars = new THREE.Group();
scene.add(stars);
for (let i = 0; i < 80; i++) {
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.set((Math.random() - 0.5) * 16, 2 + Math.random() * 60, -3 - Math.random() * 6);
  stars.add(star);
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
let upperBase = 0; // hur högt kroppen sitter för den valda hundtypen

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
// Varje ben sitter i en "höft" som kan svänga fram och tillbaka när hunden springer.
// Skorna får egna höfter på samma ställe, så de följer med benen.
const PAWS = [[-0.3, -0.17], [-0.3, 0.17], [0.3, -0.17], [0.3, 0.17]]; // två bakben, två framben
const HIP = 0.36; // höftens höjd över marken
const hips = [[], [], [], []];
function hip(parent, i) {
  const g = group(parent, PAWS[i][0], HIP, PAWS[i][1]);
  hips[i].push(g);
  return g;
}
for (let i = 0; i < 4; i++) {
  const fluffyLeg = hip(fluffyLegs, i);
  fluff(0.13, LEG_FUR, 0, 0.26 - HIP, 0, fluffyLeg);
  fluff(0.12, LEG_FUR, 0.03, 0.1 - HIP, 0, fluffyLeg);
  const smoothLeg = hip(smoothLegs, i);
  part(new THREE.CylinderGeometry(0.08, 0.065, 0.32, 10), LEG_FUR, 0, 0.2 - HIP, 0, smoothLeg);
  fluff(0.085, LEG_FUR, 0.04, 0.06 - HIP, 0, smoothLeg).scale.y = 0.06;
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
// Varje sorts klädsel har en lista med plagg: [namn, startfärg, hur plagget byggs].
// "m" är plaggets huvudfärg, den som färgknapparna i garderoben ändrar.
function mat(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
}
function bow(parent, m, x, y, z, size = 1) {
  for (const side of [-1, 1]) {
    fluff(1, m, x, y, z + side * 0.1 * size, parent).scale.set(0.05 * size, 0.09 * size, 0.1 * size);
  }
  fluff(0.05 * size, m, x + 0.02, y, z, parent);
}
function glasses(parent, lensMat, frameMat) {
  const lens = new THREE.CylinderGeometry(0.085, 0.085, 0.03, 20);
  for (const z of [-0.13, 0.13]) {
    part(lens, lensMat, 0.34, 0.09, z, parent).rotation.z = Math.PI / 2;
    part(new THREE.TorusGeometry(0.085, 0.015, 8, 20), frameMat, 0.35, 0.09, z, parent).rotation.y = Math.PI / 2;
  }
  part(new THREE.BoxGeometry(0.02, 0.025, 0.1), frameMat, 0.35, 0.1, 0, parent);
}
function collar(parent, m, thickness) {
  const neck = group(parent, 0.42, 0.86, 0);
  neck.rotation.z = -0.6;
  part(new THREE.TorusGeometry(0.2, thickness, 10, 24), m, 0, 0, 0, neck).rotation.x = Math.PI / 2;
  return neck;
}
function sweater(parent, m, stripeColor) {
  const torso = part(new THREE.CapsuleGeometry(0.39, 0.4, 8, 16), m, 0, 0.6, 0, parent);
  torso.rotation.z = Math.PI / 2; // lägg tröjan ner längs kroppen
  torso.scale.set(0.9, 1, 1);
  for (const z of [-0.17, 0.17]) {
    part(new THREE.CylinderGeometry(0.15, 0.15, 0.16, 12), m, 0.3, 0.27, z, parent); // ärmar
  }
  if (stripeColor !== undefined) {
    for (const x of [-0.22, 0, 0.22]) {
      const stripe = part(new THREE.TorusGeometry(0.385, 0.025, 8, 28), mat(stripeColor), x, 0.6, 0, parent);
      stripe.rotation.y = Math.PI / 2;
      stripe.scale.set(1, 0.9, 1);
    }
  }
}
function dome(parent, m, radius, y) {
  return part(new THREE.SphereGeometry(radius, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), m, 0, y, 0, parent);
}
const wardrobe = [
  {
    id: 'sweater', icon: '👕', parent: upper,
    options: [
      ['Enfärgad', 0xe63946, (g, m) => sweater(g, m)],
      ['Randig', 0x2a9dff, (g, m) => sweater(g, m, 0xffffff)],
      ['Tutu', 0xff8fc7, (g, m) => {
        sweater(g, m);
        for (const [x, radius, color] of [[-0.3, 0.4, m], [-0.36, 0.46, mat(0xffffff)]]) {
          const frill = part(new THREE.TorusGeometry(radius, 0.09, 8, 28), color, x, 0.6, 0, g);
          frill.rotation.y = Math.PI / 2;
          frill.scale.set(1, 0.95, 0.45);
        }
      }],
    ],
  },
  {
    id: 'hat', icon: '🎩', parent: head,
    options: [
      ['Partyhatt', 0xff5fa2, (g, m) => {
        part(new THREE.ConeGeometry(0.17, 0.42, 16), m, 0, 0.6, 0, g);
        fluff(0.06, mat(0xffd93d), 0, 0.83, 0, g);
      }],
      ['Krona', 0xffc933, (g, m) => {
        part(new THREE.CylinderGeometry(0.17, 0.15, 0.12, 16), m, 0, 0.47, 0, g);
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2;
          part(new THREE.ConeGeometry(0.04, 0.12, 8), m, Math.cos(a) * 0.14, 0.58, Math.sin(a) * 0.14, g);
          fluff(0.025, mat(0xe63946), Math.cos(a) * 0.14, 0.65, Math.sin(a) * 0.14, g);
        }
      }],
      ['Rosett', 0xff5fa2, (g, m) => bow(g, m, 0.12, 0.42, 0, 1.2)],
      ['Trollhatt', 0x7b3fd1, (g, m) => {
        part(new THREE.CylinderGeometry(0.32, 0.32, 0.03, 20), m, 0, 0.42, 0, g);
        part(new THREE.ConeGeometry(0.2, 0.5, 16), m, 0, 0.68, 0, g);
        fluff(0.05, mat(0xffd93d), 0, 0.94, 0, g);
      }],
      ['Keps', 0x2a9dff, (g, m) => {
        dome(g, m, 0.34, 0.14);
        fluff(1, m, 0.36, 0.17, 0, g).scale.set(0.2, 0.025, 0.22); // skärm
      }],
      ['Mössa', 0x2ecc71, (g, m) => {
        dome(g, m, 0.35, 0.13);
        part(new THREE.TorusGeometry(0.34, 0.05, 8, 24), mat(0xffffff), 0, 0.15, 0, g).rotation.x = Math.PI / 2;
        fluff(0.09, mat(0xffffff), 0, 0.52, 0, g);
      }],
    ],
  },
  {
    id: 'glasses', icon: '🕶️', parent: head,
    options: [
      ['Solbrillor', 0x222222, (g, m) => glasses(g, mat(0x111111), m)],
      ['Färgade', 0xff8fc7, (g, m) => glasses(g, m, m)],
      ['Runda', 0xe63946, (g, m) => glasses(g, mat(0xdff6ff), m)],
    ],
  },
  {
    id: 'neck', icon: '🎀', parent: upper,
    options: [
      ['Halsband', 0x2a9dff, (g, m) => {
        const neck = collar(g, m, 0.04);
        fluff(0.06, mat(0xffc933), 0.24, -0.04, 0, neck);
      }],
      ['Halsduk', 0xe63946, (g, m) => {
        const neck = collar(g, m, 0.075);
        part(new THREE.BoxGeometry(0.06, 0.3, 0.12), m, 0.24, -0.16, 0.06, neck);
      }],
      ['Fluga', 0x2ecc71, (g, m) => {
        collar(g, mat(0x222222), 0.03);
        bow(g, m, 0.66, 0.78, 0, 1);
      }],
    ],
  },
  {
    id: 'shoes', icon: '👟', parent: legs,
    options: [
      ['Stövlar', 0xffd93d, (g, m) => {
        for (let i = 0; i < 4; i++) {
          const leg = hip(g, i);
          part(new THREE.CylinderGeometry(0.145, 0.145, 0.2, 12), m, 0, 0.12 - HIP, 0, leg);
          fluff(1, m, 0.08, 0.07 - HIP, 0, leg).scale.set(0.14, 0.07, 0.14);
        }
      }],
      ['Strumpor', 0xff8fc7, (g, m) => {
        for (let i = 0; i < 4; i++) {
          const leg = hip(g, i);
          part(new THREE.CylinderGeometry(0.145, 0.145, 0.22, 12), m, 0, 0.16 - HIP, 0, leg);
          part(new THREE.CylinderGeometry(0.15, 0.15, 0.04, 12), mat(0xffffff), 0, 0.26 - HIP, 0, leg);
        }
      }],
    ],
  },
  {
    id: 'back', icon: '🦋', parent: upper,
    options: [
      ['Mantel', 0xe63946, (g, m) => {
        // en halv tratt som ligger över ryggen och blir bredare bakåt
        m.side = THREE.DoubleSide;
        const cape = part(new THREE.CylinderGeometry(0.56, 0.4, 1.0, 20, 1, true, 0, Math.PI), m, -0.28, 0.64, 0, g);
        cape.rotation.z = Math.PI / 2;
        fluff(0.06, mat(0xffd93d), 0.3, 1.0, 0, g); // guldknapp vid halsen
      }],
      ['Vingar', 0xffffff, (g, m) => {
        for (const side of [-1, 1]) {
          const wing = fluff(1, m, -0.05, 1.18, side * 0.24, g);
          wing.scale.set(0.2, 0.34, 0.04);
          wing.rotation.x = side * 0.6;
        }
      }],
      ['Ryggsäck', 0x7b3fd1, (g, m) => {
        part(new THREE.BoxGeometry(0.34, 0.26, 0.36), m, -0.08, 1.05, 0, g);
        part(new THREE.BoxGeometry(0.04, 0.14, 0.22), mat(0xffd93d), -0.26, 1.02, 0, g);
      }],
    ],
  },
];

// Bygg alla plagg en gång och göm dem. wear() visar det plagg man har valt.
for (const kind of wardrobe) {
  kind.main = mat(0xffffff);
  kind.items = kind.options.map(([, , build]) => {
    const g = group(kind.parent);
    build(g, kind.main);
    g.visible = false;
    return g;
  });
  kind.choice = -1; // -1 betyder ingenting på sig
  kind.color = 0xffffff;
}
function wear(kind, choice, color) {
  kind.choice = choice;
  if (color !== undefined) kind.color = color;
  else if (choice >= 0) kind.color = kind.options[choice][1]; // nytt plagg börjar med sin egen färg
  kind.items.forEach((g, i) => (g.visible = i === choice));
  kind.main.color.setHex(kind.color);
}
function saveOutfit() {
  const outfit = {};
  for (const kind of wardrobe) outfit[kind.id] = [kind.choice, kind.color];
  try { localStorage.setItem('outfit', JSON.stringify(outfit)); } catch {}
}
try {
  const outfit = JSON.parse(localStorage.getItem('outfit')) || {};
  for (const kind of wardrobe) {
    const [choice, color] = outfit[kind.id] || [];
    if (kind.items[choice] && Number.isFinite(color)) wear(kind, choice, color);
  }
} catch {}

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
const hats = wardrobe.find((kind) => kind.id === 'hat');
function showBreed() {
  breed = BREEDS[breedIndex];
  FUR.color.setHex(breed.fur);
  LEG_FUR.color.setHex(breed.legFur);
  EAR_FUR.color.setHex(breed.earFur);
  MUZZLE.color.setHex(breed.muzzle);

  dog.scale.setScalar(breed.size);
  legs.scale.y = breed.legs;
  upperBase = (breed.legs - 1) * 0.3; // längre ben lyfter kroppen
  upper.position.y = upperBase;

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
}
showBreed();

// ---------- Garderoben ----------
// Flikarna längst ner väljer vad man klär på. Ovanför visas alla plagg och färger.
const COLORS = [0xe63946, 0xff8fc7, 0xff9f1c, 0xffd93d, 0x2ecc71, 0x2a9dff, 0x7b3fd1, 0xffffff];
const chipsBar = document.getElementById('chips');
const colorsBar = document.getElementById('colors');
const tabsBar = document.getElementById('tabs');
const tabs = [{ icon: '🐶' }, ...wardrobe]; // första fliken är hundtyp
let activeTab = 0;

function hop() {
  SOUND.pop();
  speedY = Math.max(speedY, 2.5); // ett litet glädjeskutt
}
function button(parent, className, label, chosen, onClick) {
  const el = document.createElement('button');
  el.className = className + (chosen ? ' chosen' : '');
  el.textContent = label;
  el.addEventListener('click', () => {
    onClick();
    hop();
    showWardrobe();
  });
  parent.appendChild(el);
  return el;
}
function showWardrobe() {
  [...tabsBar.children].forEach((el, i) => el.classList.toggle('chosen', i === activeTab));
  chipsBar.textContent = '';
  colorsBar.textContent = '';
  const kind = tabs[activeTab];
  if (activeTab === 0) {
    BREEDS.forEach((b, i) => {
      button(chipsBar, 'chip', t(b.name), i === breedIndex, () => {
        breedIndex = i;
        try { localStorage.setItem('breed', i); } catch {}
        showBreed();
      });
    });
  } else {
    button(chipsBar, 'chip', '✖ ' + t('ingen'), kind.choice < 0, () => { wear(kind, -1); saveOutfit(); });
    kind.options.forEach(([name], i) => {
      button(chipsBar, 'chip', t(name), i === kind.choice, () => { wear(kind, i); saveOutfit(); });
    });
    if (kind.choice >= 0) {
      for (const color of COLORS) {
        const dot = button(colorsBar, 'dot', '', color === kind.color, () => { wear(kind, kind.choice, color); saveOutfit(); });
        dot.style.background = '#' + color.toString(16).padStart(6, '0');
      }
    }
  }
  colorsBar.style.visibility = colorsBar.children.length ? 'visible' : 'hidden';
}
tabs.forEach((tab, i) => {
  const el = document.createElement('button');
  el.className = 'tab';
  el.textContent = tab.icon;
  el.addEventListener('click', () => {
    activeTab = i;
    chipsBar.scrollLeft = 0;
    showWardrobe();
  });
  tabsBar.appendChild(el);
});
// Tärningen klär hunden i slumpade kläder och färger
const dice = document.createElement('button');
dice.className = 'tab';
dice.textContent = '🎲';
dice.addEventListener('click', () => {
  for (const kind of wardrobe) {
    const choice = Math.floor(Math.random() * (kind.items.length + 1)) - 1;
    wear(kind, choice, COLORS[Math.floor(Math.random() * COLORS.length)]);
  }
  saveOutfit();
  speedY = TAP_SPEED;
  SOUND.happy();
  showWardrobe();
});
tabsBar.appendChild(dice);
refreshers.push(showWardrobe);
showWardrobe();

dog.rotation.y = -0.5; // vrid hunden lite mot kameran
scene.add(dog);

const DOG_CENTER = 0.7; // ungefär mitt på hunden, för att träffa med fingret
const dogCenter = new THREE.Vector3();
let speedY = 0; // hundens fart uppåt (minus betyder nedåt)

// Tryck eller klick på hunden får den att hoppa
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (event) => {
  if (mode === 'run') return jump(); // på banan hoppar hunden var man än trycker
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  dogCenter.set(dog.position.x, dog.position.y + DOG_CENTER, dog.position.z);
  if (raycaster.ray.distanceToPoint(dogCenter) < BALL_RADIUS * HIT_MARGIN) {
    speedY = TAP_SPEED;
    SOUND.bark();
  }
  dragX = event.clientX;
});

// Dra med fingret eller musen för att snurra på hunden
let dragX = null;
window.addEventListener('pointermove', (event) => {
  if (dragX === null || mode === 'run') return;
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
  nameInput.placeholder = t('Hundens namn');
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
  SOUND.bark();
  startScreen.hidden = true;
  speedY = TAP_SPEED; // hunden hoppar av glädje när spelet börjar
});
let savedLang = 'sv';
try { savedLang = localStorage.getItem('lang') || 'sv'; } catch {}
setLanguage(savedLang === 'sv' || TEXTS[savedLang] ? savedLang : 'sv');

// ---------- Springa banor ----------
// Hunden springer framåt av sig själv. Tryck för att hoppa över hindren.
// Efter målet får man ta hand om hunden, och sedan väntar nästa bana.
const RUN_GRAVITY = 18;
const RUN_JUMP = 7; // hur högt hunden hoppar på banan
const NIGHT = 0x1b1035;
const THEMES = [
  { sky: 0x8fd3ff, ground: 0x6cc24a, track: 0xd9b382, bush: 0x2e9e4f, obstacle: 0x8a5a3a }, // parken
  { sky: 0xffd9a0, ground: 0xf0d48f, track: 0xcfa25e, bush: 0xff8fc7, obstacle: 0xe63946 }, // stranden
  { sky: 0xcfe8ff, ground: 0xeef6ff, track: 0xb9d6f2, bush: 0x9ed8ff, obstacle: 0x2a9dff }, // snön
  { sky: NIGHT, ground: 0x3b2a6b, track: 0x5b3bb0, bush: 0xffd93d, obstacle: 0xff5fa2 }, // rymden
];
let mode = 'dress'; // 'dress' = garderoben, 'run' = springa, 'lost' = snubblat, 'care' = ta hand om hunden
let level = 1;
try { level = Math.max(1, Number(localStorage.getItem('level')) || 1); } catch {}
let hearts = 3;
let runSpeed = 5;
let goalX = 100;
let safeTime = 0; // en kort stund efter en krock kan man inte tappa fler hjärtan
let obstacles = [];

const runWorld = group(scene);
runWorld.visible = false;
const runGroundMat = new THREE.MeshStandardMaterial({ roughness: 1 });
const trackMat = new THREE.MeshStandardMaterial({ roughness: 1 });
const bushMat = new THREE.MeshStandardMaterial({ roughness: 1 });
const obstacleMat = new THREE.MeshStandardMaterial({ roughness: 0.8 });
for (const [material, width, y] of [[runGroundMat, 120, -0.02], [trackMat, 3.4, 0]]) {
  const plane = part(new THREE.PlaneGeometry(900, width), material, 400, y, 0, runWorld);
  plane.rotation.x = -Math.PI / 2;
  plane.castShadow = false;
  plane.receiveShadow = true;
}
const roadside = []; // buskar som flyttas fram när hunden har sprungit förbi dem
for (let i = 0; i < 16; i++) {
  const bush = fluff(0.3 + (i % 3) * 0.12, bushMat, 0, 0.25, i % 2 ? 2.7 : -2.7, runWorld);
  bush.castShadow = false;
  roadside.push(bush);
}
const obstacleGroup = group(runWorld);
const goal = group(runWorld);
for (const z of [-1.8, 1.8]) part(new THREE.CylinderGeometry(0.07, 0.07, 2.6, 8), mat(0xffffff), 0, 1.3, z, goal);
part(new THREE.BoxGeometry(0.08, 0.45, 3.7), mat(0xffd93d), 0, 2.5, 0, goal);
for (let i = 0; i < 6; i++) part(new THREE.BoxGeometry(0.1, 0.2, 0.3), mat(0x2a1458), 0, 2.5 + (i % 2 ? 0.1 : -0.1), -1.5 + i * 0.6, goal);

// Hindren. half = halva längden, top = hur högt man måste hoppa, fromLevel = första banan de finns på.
// roll = rullar mot hunden, bottom = svävar i luften (då ska man INTE hoppa).
const WATER = new THREE.MeshStandardMaterial({ color: 0x4ab8ff, roughness: 0.2 });
const ROCK = new THREE.MeshStandardMaterial({ color: 0x8f8f9c, roughness: 1 });
const OBSTACLES = [
  { fromLevel: 1, half: 0.22, top: 0.44, build: (g) => { // stock
    part(new THREE.CylinderGeometry(0.22, 0.22, 2.4, 12), obstacleMat, 0, 0.22, 0, g).rotation.x = Math.PI / 2;
  } },
  { fromLevel: 1, half: 0.6, top: 0.27, build: (g) => { // vattenpöl
    const puddle = part(new THREE.CylinderGeometry(1, 1, 0.03, 24), WATER, 0, 0.02, 0, g);
    puddle.scale.set(0.65, 1, 1.25);
    puddle.castShadow = false;
  } },
  { fromLevel: 2, half: 0.2, top: 0.62, build: (g) => { // häck
    part(new THREE.BoxGeometry(0.36, 0.5, 2.4), obstacleMat, 0, 0.25, 0, g);
    for (const z of [-0.9, -0.3, 0.3, 0.9]) fluff(0.26, bushMat, 0, 0.48, z, g).scale.y = 0.16;
  } },
  { fromLevel: 2, half: 0.32, top: 0.66, build: (g) => { // stenar
    for (const [z, size] of [[-0.85, 0.3], [-0.15, 0.36], [0.6, 0.28], [1.05, 0.2]]) {
      fluff(size, ROCK, (z * 7 % 1) * 0.1, size * 0.8, z, g).scale.y = size * 0.9;
    }
  } },
  { fromLevel: 3, half: 0.4, top: 0.8, roll: 2.5, build: (g) => { // boll som rullar mot hunden
    const ball = group(g, 0, 0.4, 0);
    fluff(0.4, mat(0xffffff), 0, 0, 0, ball);
    for (const [turn, color] of [[0, 0xe63946], [Math.PI / 3, 0xffd93d], [(2 * Math.PI) / 3, 0x2a9dff]]) {
      part(new THREE.TorusGeometry(0.385, 0.05, 8, 24), mat(color), 0, 0, 0, ball).rotation.y = turn;
    }
    return (time) => (ball.rotation.z = time * 6);
  } },
  { fromLevel: 4, half: 0.3, bottom: 2.0, build: (g) => { // fåglar som flyger lågt, spring under dem
    const wings = [];
    for (const z of [-0.9, 0, 0.9]) {
      const bird = group(g, 0, 2.3, z);
      fluff(0.17, mat(0xffd93d), 0, 0, 0, bird).scale.x = 0.24;
      part(new THREE.ConeGeometry(0.05, 0.14, 8), mat(0xff9f1c), -0.26, 0, 0, bird).rotation.z = Math.PI / 2;
      fluff(0.03, BLACK, -0.15, 0.07, 0.1, bird);
      fluff(0.03, BLACK, -0.15, 0.07, -0.1, bird);
      for (const side of [-1, 1]) {
        const wing = group(bird, 0, 0.05, side * 0.1);
        fluff(1, mat(0xffb703), 0, 0, side * 0.2, wing).scale.set(0.14, 0.025, 0.22);
        wings.push([wing, side]);
      }
    }
    return (time) => {
      for (const [wing, side] of wings) wing.rotation.x = side * Math.sin(time * 14) * 0.7;
      g.position.y = Math.sin(time * 3) * 0.08;
    };
  } },
];

// Hundben att samla på banan. Man får också ben för varje hjärta man har kvar i mål.
let bones = 0; // alla ben man har tjänat
try { bones = Math.max(0, Number(localStorage.getItem('bones')) || 0); } catch {}
let runBones = 0; // ben man har plockat på den här banan
let lastStars = 0;
let lastReward = 0;
let pickups = [];
const boneGroup = group(runWorld);
const BONE = new THREE.MeshStandardMaterial({ color: 0xfff6e0, roughness: 0.5, emissive: 0x665522 });
const BONE_STICK = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
function addBone(x, y) {
  const g = group(boneGroup, x, y, 0);
  part(BONE_STICK, BONE, 0, 0, 0, g).rotation.z = Math.PI / 2;
  for (const [dx, dy] of [[-0.16, 0.05], [-0.16, -0.05], [0.16, 0.05], [0.16, -0.05]]) fluff(0.07, BONE, dx, dy, 0, g);
  g.scale.setScalar(1.6); // stora nog att synas på håll
  pickups.push({ x, y, group: g });
}

function addObstacle(kind, x) {
  const g = group(obstacleGroup, x, 0, 0);
  const animate = kind.build(g);
  obstacles.push({ ...kind, x, group: g, animate, hit: false });
}

function startRun() {
  mode = 'run';
  const theme = THEMES[(level - 1) % THEMES.length];
  scene.background.setHex(theme.sky);
  runGroundMat.color.setHex(theme.ground);
  trackMat.color.setHex(theme.track);
  bushMat.color.setHex(theme.bush);
  obstacleMat.color.setHex(theme.obstacle);
  ground.visible = false;
  stars.visible = theme.sky === NIGHT;
  runWorld.visible = true;

  // Lägg ut hindren. Högre banor är snabbare och har fler hinder.
  obstacleGroup.clear();
  obstacles = [];
  runSpeed = Math.min(4.6 + level * 0.5, 9);
  const kinds = OBSTACLES.filter((kind) => level >= kind.fromLevel);
  let x = 10;
  for (let i = 0; i < 5 + level * 2; i++) {
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    x += runSpeed * (1.3 + Math.random() * 0.9) + (kind.roll ? 7 : 0); // rullande hinder får extra plats
    addObstacle(kind, x);
  }
  // Lägg ut ben: på marken mellan hindren och i luften ovanför en del hinder
  boneGroup.clear();
  pickups = [];
  runBones = 0;
  let before = 4;
  for (const ob of obstacles) {
    addBone((before + ob.x) / 2, 0.5);
    if (!ob.bottom && !ob.roll && Math.random() < 0.6) addBone(ob.x, ob.top + 0.9);
    before = ob.x;
  }
  goalX = x + 9;
  goal.position.x = goalX;

  dog.position.set(0, 0, 0);
  dog.rotation.set(0, 0, 0); // nosen pekar framåt längs banan
  speedY = 0;
  hearts = 3;
  safeTime = 0;
  showMode();
}

function jump() {
  if (mode === 'run' && dog.position.y < 0.02) {
    speedY = RUN_JUMP;
    SOUND.jump();
  }
}
window.addEventListener('keydown', (event) => {
  if (mode !== 'run' || !['Space', 'ArrowUp', 'KeyW'].includes(event.code)) return;
  event.preventDefault();
  jump();
});

function updateRun(dt, time) {
  dog.position.x += runSpeed * dt;
  safeTime -= dt;
  const dogTop = dog.position.y + (1.3 + upperBase) * breed.size; // hundens huvud
  for (const ob of obstacles) {
    if (ob.roll && !ob.hit && ob.x - dog.position.x < 22) ob.x -= ob.roll * dt;
    ob.group.position.x = ob.x;
    if (ob.animate && !ob.hit) ob.animate(time);
    const close = Math.abs(dog.position.x - ob.x) < 0.4 * breed.size + ob.half;
    const touching = ob.bottom ? dogTop > ob.bottom + 0.1 : dog.position.y < ob.top - 0.12;
    if (!ob.hit && close && touching) {
      ob.hit = true;
      if (safeTime <= 0) {
        hearts -= 1;
        safeTime = 1;
        SOUND.hit();
        showHud();
        if (hearts <= 0) return endRun(false);
      }
    }
    // Ett hinder man har slagit i försvinner: ner i marken, eller upp i luften om det flyger
    if (ob.hit && Math.abs(ob.group.position.y) < 4) ob.group.position.y += (ob.bottom ? 4 : -2.5) * dt;
  }
  for (const bone of pickups) {
    bone.group.rotation.y = time * 3;
    const near = Math.abs(dog.position.x - bone.x) < 0.3 + 0.4 * breed.size;
    if (bone.group.visible && near && bone.y > dog.position.y - 0.1 && bone.y < dogTop + 0.25) {
      bone.group.visible = false;
      runBones += 1;
      SOUND.pop();
      showHud();
    }
  }
  const start = dog.position.x - 12;
  roadside.forEach((bush, i) => {
    bush.position.x = start + ((((i * 5 - start) % 80) + 80) % 80);
  });
  dog.visible = safeTime <= 0 || Math.floor(safeTime * 12) % 2 === 0; // blinkar efter en krock
  progressBar.style.width = Math.min(100, (dog.position.x / goalX) * 100) + '%';
  if (dog.position.x >= goalX) endRun(true);
}

function goHome() {
  scene.background.setHex(NIGHT);
  ground.visible = true;
  stars.visible = true;
  runWorld.visible = false;
  dog.visible = true;
  dog.position.set(0, 0, 0);
  dog.rotation.set(0, -0.5, 0);
}
function endRun(won) {
  dog.visible = true;
  if (won) {
    // Belöning: fler hjärtan kvar ger fler stjärnor och fler ben
    lastStars = hearts;
    lastReward = 5 + hearts * 5 + runBones;
    bones += lastReward;
    try { localStorage.setItem('bones', bones); } catch {}
    level += 1;
    try { localStorage.setItem('level', level); } catch {}
    mode = 'care';
    caredFor.clear();
    careAction = null;
    fillBowls();
    goHome();
    speedY = TAP_SPEED;
    burst('⭐');
    SOUND.win();
  } else {
    mode = 'lost';
    SOUND.lose();
  }
  showMode();
}

// Ta hand om hunden efter loppet
const CARE = [['🦴', 'Mat'], ['💧', 'Vatten'], ['💗', 'Klappa']];
const caredFor = new Set();
const CARE_TIME = 3.5; // så många sekunder tar det att äta, dricka eller bli klappad
let careAction = null; // det hunden gör just nu, till exempel äter

// Sakerna som behövs: matskål, vattenskål och en hand som klappar.
// De ligger i en egen grupp som vrids likadant som hunden, så att skålarna alltid står framför nosen.
const careProps = group(scene);
careProps.visible = false;
function makeBowl(bowlColor, contentColor, side) {
  const bowl = group(careProps, 1, 0, side * 0.36);
  part(new THREE.CylinderGeometry(0.27, 0.2, 0.15, 20), mat(bowlColor), 0, 0.075, 0, bowl);
  part(new THREE.TorusGeometry(0.265, 0.025, 8, 24), mat(bowlColor), 0, 0.15, 0, bowl).rotation.x = Math.PI / 2;
  const content = group(bowl);
  part(new THREE.CylinderGeometry(0.235, 0.235, 0.03, 20), mat(contentColor), 0, 0, 0, content);
  return { bowl, content, side };
}
const BOWLS = { Mat: makeBowl(0xe63946, 0x8a5a3a, 1), Vatten: makeBowl(0x2a9dff, 0x9ee7ff, -1) };
for (let i = 0; i < 9; i++) { // matkulor som ligger i en liten hög
  const a = i * 2.4;
  const r = i === 0 ? 0 : 0.07 + (i % 3) * 0.05;
  fluff(0.055, mat(i % 2 ? 0x6e4429 : 0xa0683c), Math.cos(a) * r, 0.04, Math.sin(a) * r, BOWLS.Mat.content);
}
function fillBowls() {
  for (const { content } of Object.values(BOWLS)) {
    content.position.y = 0.15;
    content.scale.setScalar(1);
  }
}
fillBowls();

const hand = group(careProps);
const SKIN = mat(0xffcc4d); // gul som en emoji-hand
fluff(1, SKIN, 0, 0, 0, hand).scale.set(0.17, 0.06, 0.15); // handflata
for (let i = 0; i < 4; i++) {
  const finger = part(new THREE.CapsuleGeometry(0.035, 0.14, 4, 8), SKIN, 0.2, -0.02, -0.105 + i * 0.07, hand);
  finger.rotation.z = Math.PI / 2 + 0.25; // fingrarna pekar framåt och lite nedåt
}
part(new THREE.CapsuleGeometry(0.035, 0.1, 4, 8), SKIN, 0.05, -0.01, 0.17, hand).rotation.x = Math.PI / 2 - 0.5; // tumme
part(new THREE.CylinderGeometry(0.09, 0.1, 0.3, 12), mat(0x2a9dff), -0.27, 0.03, 0, hand).rotation.z = Math.PI / 2 - 0.2; // ärm
hand.visible = false;

function updateCare(dt, time) {
  careProps.rotation.y = dog.rotation.y;
  const reach = 0.9 * breed.size + 0.1; // så långt fram når nosen
  for (const { bowl } of Object.values(BOWLS)) bowl.position.x = reach;
  hand.visible = false;
  if (!careAction || dog.position.y > 0.01) return; // vänta tills hunden har landat

  if (Math.floor((careAction.time + dt) / 0.3) > Math.floor(careAction.time / 0.3)) SOUND[careAction.name]();
  careAction.time += dt;
  const done = Math.min(1, careAction.time / CARE_TIME);
  const bowl = BOWLS[careAction.name];
  if (bowl) {
    // Hunden böjer sig ner mot skålen och äter eller dricker. Skålen töms sakta.
    const down = Math.min(1, careAction.time * 3);
    upper.rotation.z = (-0.5 - upperBase) * down;
    head.rotation.z = (-0.95 + Math.sin(time * 11) * 0.12) * down;
    head.rotation.y = -bowl.side * 0.4 * down;
    bowl.content.position.y = 0.15 - done * 0.1;
    bowl.content.scale.setScalar(1 - done * 0.2);
  } else {
    // Handen stryker fram och tillbaka över huvudet
    const hatHeight = wardrobe.find((kind) => kind.id === 'hat').choice >= 0 ? 0.4 : 0.1;
    const stroke = Math.sin(time * 5);
    hand.visible = true;
    hand.position.set(
      (0.5 + stroke * 0.2) * breed.size,
      (1.05 + upperBase + 0.36 + hatHeight) * breed.size + Math.abs(stroke) * 0.05,
      0,
    );
    hand.rotation.z = -0.15 + stroke * 0.15;
    head.rotation.x = stroke * 0.12; // hunden myser och vickar på huvudet
    head.rotation.z = 0.12;
  }
  if (done >= 1) {
    caredFor.add(careAction.name);
    burst(careAction.emoji);
    SOUND.happy();
    careAction = null;
    speedY = Math.max(speedY, 3.5);
    showMode();
  }
}
function burst(emoji) {
  for (let i = 0; i < 7; i++) {
    const el = document.createElement('span');
    el.className = 'float';
    el.textContent = emoji;
    el.style.left = 50 + (Math.random() - 0.5) * 40 + 'vw';
    el.style.animationDelay = i * 0.07 + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

// Visa rätt knappar och texter för det läge spelet är i
const el = (id) => document.getElementById(id);
const progressBar = el('progressBar');
function dogName() {
  return nameInput.value.trim();
}
function showHud() {
  el('hearts').textContent = '❤️'.repeat(hearts) + '🤍'.repeat(3 - hearts);
  el('levelName').textContent = t('Bana {n}').replace('{n}', level);
  el('runBones').textContent = '🦴 ' + runBones;
}
function showMode() {
  el('top').hidden = mode !== 'dress';
  el('wardrobe').hidden = mode !== 'dress';
  el('hud').hidden = mode !== 'run' && mode !== 'lost';
  el('lost').hidden = mode !== 'lost';
  el('care').hidden = mode !== 'care';
  showHud();
  el('hint').textContent = t('Tryck för att hoppa!');
  el('runButton').textContent = '🏃 ' + t('Spring bana {n}!').replace('{n}', level);
  el('lostTitle').textContent = t('Oj då!');
  el('lostText').textContent = t('Hunden snubblade. Försök igen!');
  el('retry').textContent = '🏃 ' + t('Försök igen');
  el('lostHome').textContent = '👗 ' + t('Garderoben');

  const allDone = caredFor.size === CARE.length;
  el('careTitle').textContent = t('Bra sprunget!') + ' ' + '⭐'.repeat(lastStars);
  el('careReward').textContent = `+${lastReward} 🦴`;
  el('boneCount').textContent = '🦴 ' + bones;
  el('careText').textContent = allDone ? t('Hunden är glad igen!') : t('Nu behöver hunden lite omsorg');
  careProps.visible = mode === 'care';
  const careButtons = el('careButtons');
  careButtons.textContent = '';
  for (const [emoji, name] of CARE) {
    const b = document.createElement('button');
    b.className = 'chip' + (caredFor.has(name) ? ' chosen' : '');
    b.textContent = `${emoji} ${t(name)}${caredFor.has(name) ? ' ✓' : ''}`;
    b.disabled = !!careAction || caredFor.has(name); // en sak i taget
    b.addEventListener('click', () => {
      SOUND.pop();
      careAction = { name, emoji, time: 0 };
      showMode();
    });
    careButtons.appendChild(b);
  }
  el('nextLevel').textContent = '▶ ' + t('Bana {n}').replace('{n}', level);
  el('nextLevel').disabled = !allDone;
  el('careHome').textContent = '👗 ' + t('Garderoben');
}
el('runButton').addEventListener('click', startRun);
el('retry').addEventListener('click', startRun);
el('nextLevel').addEventListener('click', startRun);
for (const id of ['lostHome', 'careHome']) {
  el(id).addEventListener('click', () => {
    mode = 'dress';
    goHome();
    showMode();
  });
}
refreshers.push(showMode);
showMode();

// Testläge för utvecklaren: adressen #test21 visar hund nummer 2 med plagg nummer 1, utan startsida
const test = location.hash.match(/^#test(\d)(\d?)/);
if (test) {
  startScreen.hidden = true;
  breedIndex = Number(test[1]) % BREEDS.length;
  showBreed();
  if (test[2]) activeTab = 1;
  if (test[2]) for (const kind of wardrobe) wear(kind, Math.min(Number(test[2]), kind.items.length - 1));
  showWardrobe();
}

if (location.hash === '#run' || location.hash.startsWith('#care')) {
  startScreen.hidden = true;
  startRun();
  if (location.hash === '#run') { // visa en av varje sorts hinder på rad
    obstacleGroup.clear();
    obstacles = [];
    runSpeed = 0.01;
    OBSTACLES.forEach((kind, i) => addObstacle({ ...kind, roll: 0 }, 2.5 + i * 2.6));
  }
  if (location.hash.startsWith('#care')) {
    endRun(true);
    breedIndex = Number(location.hash[6] || 0) % BREEDS.length; // #care12 = sak 1, hund 2
    showBreed();
    careAction = { name: CARE[Number(location.hash[5] || 0) % 3][1], emoji: '🦴', time: 1.5 };
    speedY = 0;
    showMode();
  }
}

// Högtalar-knappen stänger av och sätter på ljudet
const soundButton = document.getElementById('sound');
soundButton.textContent = soundOn ? '🔊' : '🔇';
soundButton.addEventListener('click', () => {
  soundOn = !soundOn;
  soundButton.textContent = soundOn ? '🔊' : '🔇';
  try { localStorage.setItem('sound', soundOn ? 'on' : 'off'); } catch {}
  SOUND.pop();
});

// Jordglob-knappen öppnar språkvalet igen, mitt i spelet. Kläderna och namnet finns kvar.
document.getElementById('language').addEventListener('click', () => {
  startScreen.hidden = false;
});

// Anpassa till skärmens storlek, både stående och liggande
function resize() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;
  dressZ = aspect < 1 ? 5.4 : 4.3; // lite längre bort på stående mobil
  lift = window.innerHeight < 520 ? 0.4 : 0.15; // flytta upp hunden så att garderoben inte skymmer den
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
let lift = 0;
let dressZ = 5;
window.addEventListener('resize', resize);
resize();

// Spelloopen
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  const time = clock.elapsedTime;
  const running = mode === 'run';

  if (running) updateRun(dt, time);

  // Tyngdkraft. I garderoben studsar hunden lite, på banan landar den direkt.
  speedY -= (running ? RUN_GRAVITY : GRAVITY) * dt;
  dog.position.y += speedY * dt;
  if (dog.position.y < 0) {
    dog.position.y = 0;
    speedY = !running && Math.abs(speedY) > 1 ? -speedY * BOUNCE : 0;
  }
  const inAir = dog.position.y > 0.01;

  // Svansen viftar, snabbare när hunden är i luften
  tail.rotation.x = Math.sin(time * (inAir || careAction ? 22 : 9)) * 0.6;
  const flap = inAir ? -0.9 : running ? -0.4 + Math.sin(time * 12) * 0.2 : Math.sin(time * 2) * 0.05;
  for (const pair of [EARS.fluffy, EARS.flap]) {
    pair[0].rotation.x = flap; // öronen flaxar utåt
    pair[1].rotation.x = -flap;
  }

  // Springsteg: kroppen guppar och gungar
  const stride = running ? Math.sin(time * runSpeed * 2.4) : 0;
  upper.position.y = upperBase + (inAir ? 0 : Math.abs(stride) * 0.06);
  dog.rotation.z = running ? (inAir ? 0.18 : stride * 0.07) : 0;

  // Omsorg: huvudet och kroppen står rakt om hunden inte äter, dricker eller blir klappad
  upper.rotation.z = 0;
  head.rotation.set(0, 0, 0);
  if (mode === 'care') updateCare(dt, time);

  // Benen svänger: bakbenen och frambenen i otakt, som en galopp. I luften sträcker hunden ut sig.
  const phase = time * runSpeed * 2.4;
  hips.forEach((sameLeg, i) => {
    const front = i >= 2;
    let swing = 0;
    if (running) swing = inAir ? (front ? 0.9 : -0.9) : Math.sin(phase + (front ? Math.PI : 0) + (i % 2) * 0.6) * 0.75;
    for (const h of sameLeg) h.rotation.z = swing;
  });

  if (mode === 'run' || mode === 'lost') {
    // Kameran springer med snett bakom hunden, så att man ser kroppen och hindren framför
    const narrow = camera.aspect < 1;
    // (på stående mobil nästan rakt bakifrån, annars syns inte hindren)
    camera.position.set(dog.position.x - (narrow ? 5 : 3.2), narrow ? 3.6 : 2.6, narrow ? 1.7 : 4.6);
    camera.lookAt(dog.position.x + (narrow ? 4 : 2.6), narrow ? 0.4 : 0.7, 0);
  } else {
    // Kameran följer mjukt med hunden uppåt
    const targetY = Math.max(1, dog.position.y + DOG_CENTER);
    cameraY += (targetY - cameraY) * Math.min(1, dt * 5);
    // När man tar hand om hunden backar kameran och tittar lite lägre, så att skålarna syns
    const caring = mode === 'care';
    const low = lift + (caring ? 0.55 : 0);
    camera.position.set(caring ? 0.4 : 0, cameraY + 1 - low, dressZ + (caring ? 1.3 : 0));
    camera.lookAt(caring ? 0.4 : 0, cameraY - low, 0);
  }
  stars.position.x = camera.position.x;
  sun.position.x = dog.position.x + 3;
  sun.target.position.x = dog.position.x;

  renderer.render(scene, camera);
});
