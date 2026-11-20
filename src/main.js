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
    'Spring bana {n}!': 'Juokse rata {n}!', 'Bana {n}': 'Rata {n}', 'Tryck för att hoppa, svep för att byta fil': 'Napauta hypätäksesi, pyyhkäise vaihtaaksesi kaistaa', 'Hoppa': 'Hyppää',
    'Oj då!': 'Hups!', 'Hunden snubblade. Försök igen!': 'Koira kompastui. Yritä uudelleen!',
    'Försök igen': 'Yritä uudelleen', 'Garderoben': 'Vaatekaappi',
    'Bra sprunget!': 'Hyvin juostu!', 'Samla ben och köp hundar, kläder och leksaker': 'Kerää luita ja osta koiria, vaatteita ja leluja',
    'Golden': 'Kultainennoutaja', 'Terrier': 'Terrieri',
    'Börja om från bana 1': 'Aloita alusta radalta 1', 'Säker? Tryck igen för att börja om': 'Varmasti? Paina uudelleen',
    'Matta': 'Matto', 'Blommor': 'Kukat', 'Ballonger': 'Ilmapallot', 'Korg': 'Kori', 'Träd': 'Puu', 'Hundkoja': 'Koirankoppi',
    'Lär': 'Opeta', 'Sitt': 'Istu', 'Snurra': 'Pyöri', 'Tass': 'Tassu', 'Dansa': 'Tanssi', 'Rulla': 'Kieri', 'Volt': 'Voltti',
    'Medaljer': 'Mitalit', 'Stäng': 'Sulje', 'Ny medalj': 'Uusi mitali',
    'Första målet': 'Ensimmäinen maali', 'Klara en bana': 'Läpäise rata',
    'Felfri': 'Virheetön', 'Klara en bana utan att krocka': 'Läpäise rata törmäämättä',
    'Bensamlare': 'Luunkerääjä', 'Samla 100 ben totalt': 'Kerää yhteensä 100 luuta',
    'Första köpet': 'Ensimmäinen ostos', 'Köp något för hundben': 'Osta jotain luilla',
    'Ny kompis': 'Uusi kaveri', 'Köp en ny hund': 'Osta uusi koira',
    'Trickmästare': 'Temppumestari', 'Lär hunden tre trick': 'Opeta koiralle kolme temppua',
    'Promenadproffs': 'Kävelymestari', 'Gå på promenad': 'Käy kävelyllä',
    'Hemmafixare': 'Kodinlaittaja', 'Ha tre saker i trädgården': 'Laita puutarhaan kolme tavaraa',
    'Sjusovare': 'Unikeko', 'Låt hunden sova i korgen': 'Anna koiran nukkua korissa',
    'Mästare': 'Mestari', 'Kom till bana 6': 'Pääse radalle 6',
    'Sova': 'Nuku', 'Promenad': 'Kävely', 'Gå på promenad som belöning': 'Palkinnoksi pääset kävelylle',
    'Köp': 'Osta', 'spring fler banor!': 'juokse lisää ratoja!', 'Boll': 'Pallo', 'Leka': 'Leiki', 'Nu behöver hunden lite omsorg': 'Nyt koira tarvitsee hoivaa',
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
    'Spring bana {n}!': 'Run level {n}!', 'Bana {n}': 'Level {n}', 'Tryck för att hoppa, svep för att byta fil': 'Tap to jump, swipe to change lane', 'Hoppa': 'Jump',
    'Oj då!': 'Oops!', 'Hunden snubblade. Försök igen!': 'The dog tripped. Try again!',
    'Försök igen': 'Try again', 'Garderoben': 'Wardrobe',
    'Bra sprunget!': 'Well run!', 'Samla ben och köp hundar, kläder och leksaker': 'Collect bones and buy dogs, clothes and toys',
    'Golden': 'Golden retriever',
    'Börja om från bana 1': 'Start over from level 1', 'Säker? Tryck igen för att börja om': 'Sure? Tap again to start over',
    'Matta': 'Rug', 'Blommor': 'Flowers', 'Ballonger': 'Balloons', 'Korg': 'Basket', 'Träd': 'Tree', 'Hundkoja': 'Dog house',
    'Lär': 'Teach', 'Sitt': 'Sit', 'Snurra': 'Spin', 'Tass': 'Paw', 'Dansa': 'Dance', 'Rulla': 'Roll', 'Volt': 'Flip',
    'Medaljer': 'Medals', 'Stäng': 'Close', 'Ny medalj': 'New medal',
    'Första målet': 'First finish', 'Klara en bana': 'Finish a level',
    'Felfri': 'Flawless', 'Klara en bana utan att krocka': 'Finish a level without crashing',
    'Bensamlare': 'Bone collector', 'Samla 100 ben totalt': 'Collect 100 bones in total',
    'Första köpet': 'First purchase', 'Köp något för hundben': 'Buy something with bones',
    'Ny kompis': 'New friend', 'Köp en ny hund': 'Buy a new dog',
    'Trickmästare': 'Trick master', 'Lär hunden tre trick': 'Teach the dog three tricks',
    'Promenadproffs': 'Walk pro', 'Gå på promenad': 'Go for a walk',
    'Hemmafixare': 'Home maker', 'Ha tre saker i trädgården': 'Have three things in the garden',
    'Sjusovare': 'Sleepyhead', 'Låt hunden sova i korgen': 'Let the dog sleep in the basket',
    'Mästare': 'Champion', 'Kom till bana 6': 'Reach level 6',
    'Sova': 'Sleep', 'Promenad': 'Walk', 'Gå på promenad som belöning': 'Go for a walk as a reward',
    'Köp': 'Buy', 'spring fler banor!': 'run more levels!', 'Boll': 'Ball', 'Nalle': 'Teddy', 'Leka': 'Play', 'Nu behöver hunden lite omsorg': 'Now the dog needs some care',
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
  Leka: () => tone(500, 900, 0.1, 'sine', 0.1), // studs
  happy: () => melody([659, 880, 1319], 0.1),
};

// Scen, kamera och renderare
const scene = new THREE.Scene();
const HOME_SKY = 0x9fdcff; // ljusblå himmel hemma i trädgården
scene.background = new THREE.Color(HOME_SKY);

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
  new THREE.CircleGeometry(40, 48),
  new THREE.MeshStandardMaterial({ color: 0x7fd36b, roughness: 1 }) // gräsmatta
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Stjärnor, så att man ser hur högt hunden kommer
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xfff3b0 });
const starGeometry = new THREE.SphereGeometry(0.06, 6, 6);
const stars = new THREE.Group();
stars.visible = false; // stjärnorna syns bara på rymdbanan
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
// Leksaker ligger på marken bredvid hunden (inte på hunden)
const toyGroup = group(scene);

// Priser i hundben. Det som inte står här är gratis.
const PRICE = {
  Randig: 15, Tutu: 30,
  Rosett: 10, Keps: 15, 'Mössa': 15, Trollhatt: 25, Krona: 40,
  Runda: 10, 'Färgade': 15,
  Halsduk: 10, Fluga: 15,
  Strumpor: 10, 'Stövlar': 20,
  'Ryggsäck': 20, Mantel: 30, Vingar: 40,
  Boll: 10, Frisbee: 15, Nalle: 30,
  Matta: 15, Blommor: 10, Ballonger: 20, Korg: 25, 'Träd': 30, Hundkoja: 60, // saker till hemmet
  Sitt: 5, Snurra: 10, Tass: 15, Dansa: 20, Rulla: 25, Volt: 40, // trick som hunden kan lära sig
  Mops: 30, Pudel: 40, Golden: 50, Chihuahua: 50, Dalmatiner: 60, Husky: 80, // hundar
};
let bones = 0; // alla ben man har tjänat
try { bones = Math.max(0, Number(localStorage.getItem('bones')) || 0); } catch {}
const owned = new Set(); // det man har köpt
try { for (const name of JSON.parse(localStorage.getItem('owned')) || []) owned.add(name); } catch {}
function have(name) {
  return !PRICE[name] || owned.has(name);
}
let tryOn = null; // ett plagg man provar men inte har köpt än

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
  {
    id: 'toy', icon: '🧸', parent: toyGroup,
    options: [
      ['Boll', 0xc6e034, (g, m) => {
        fluff(0.17, m, 1.15, 0.17, -0.95, g);
        part(new THREE.TorusGeometry(0.165, 0.02, 8, 24), mat(0xffffff), 1.15, 0.17, -0.95, g).rotation.x = 0.6;
      }],
      ['Frisbee', 0xff9f1c, (g, m) => {
        part(new THREE.CylinderGeometry(0.24, 0.26, 0.05, 24), m, 1.15, 0.03, -0.95, g);
        part(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24), mat(0xffffff), 1.15, 0.03, -0.95, g);
      }],
      ['Nalle', 0xb5793f, (g, m) => {
        const teddy = group(g, 1.15, 0, -0.95);
        teddy.rotation.y = -1.0; // nallen tittar mot kameran
        fluff(0.17, m, 0, 0.17, 0, teddy); // mage
        fluff(0.13, m, 0, 0.42, 0, teddy); // huvud
        fluff(0.06, mat(0xf2d6a8), 0.11, 0.39, 0, teddy); // nos
        fluff(0.025, BLACK, 0.16, 0.4, 0, teddy);
        for (const side of [-1, 1]) {
          fluff(0.05, m, 0, 0.54, side * 0.1, teddy); // öron
          fluff(0.02, BLACK, 0.11, 0.46, side * 0.05, teddy); // ögon
          fluff(0.07, m, 0.06, 0.24, side * 0.17, teddy); // armar
          fluff(0.08, m, 0.13, 0.07, side * 0.11, teddy); // ben
        }
      }],
    ],
  },
];
const toyKind = wardrobe[wardrobe.length - 1];

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
function stopTrying() {
  if (tryOn) wear(tryOn.kind, -1); // ta av det man bara provade
  tryOn = null;
  tryHome = null;
  tryTrick = null;
  showHome();
  if (breedIndex !== myBreed) { // byt tillbaka från en hund man bara tittade på
    breedIndex = myBreed;
    showBreed();
  }
}
function pay(name) {
  bones -= PRICE[name];
  owned.add(name);
  try {
    localStorage.setItem('bones', bones);
    localStorage.setItem('owned', JSON.stringify([...owned]));
  } catch {}
  document.getElementById('boneCount').textContent = '🦴 ' + bones;
  SOUND.happy();
  speedY = TAP_SPEED;
  checkMedals();
}
function saveOutfit() {
  const outfit = {};
  for (const kind of wardrobe) outfit[kind.id] = [tryOn && tryOn.kind === kind ? -1 : kind.choice, kind.color]; // provade plagg sparas inte
  try { localStorage.setItem('outfit', JSON.stringify(outfit)); } catch {}
}
try {
  const outfit = JSON.parse(localStorage.getItem('outfit')) || {};
  for (const kind of wardrobe) {
    const [choice, color] = outfit[kind.id] || [];
    if (kind.items[choice] && have(kind.options[choice][0]) && Number.isFinite(color)) wear(kind, choice, color);
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
  { name: 'Golden', size: 1.1, legs: 1.25, cheeks: true, snout: [1.3, 0.95, 0.9],
    ears: 'flap', tail: 'bushy', fur: 0xe2a94f, legFur: 0xe2a94f, earFur: 0xc98a3a, muzzle: 0xf0c880 },
  { name: 'Chihuahua', size: 0.62, legs: 0.85, snout: [0.8, 0.85, 0.85], eyes: 1.4,
    ears: 'pointy', earSize: 1.3, tail: 'long', fur: 0xd9a066, legFur: 0xd9a066, earFur: 0xc48a52, muzzle: 0xf3dcc0 },
  // Terriern är gratis (den har inget pris i PRICE): liten, vit med bruna öron och lurvigt skägg
  { name: 'Terrier', size: 0.78, legs: 0.9, cheeks: true, snout: [1.15, 0.95, 0.9],
    ears: 'flap', earSize: 0.8, tail: 'long', fur: 0xffffff, legFur: 0xffffff, earFur: 0xa5672f, muzzle: 0xf4e7d3 },
];
let breedIndex = 0;
try { breedIndex = Number(localStorage.getItem('breed')) || 0; } catch {}
if (!BREEDS[breedIndex] || !have(BREEDS[breedIndex].name)) breedIndex = 0;
let myBreed = breedIndex; // den hund man äger och har valt (breedIndex kan vara en man bara tittar på)
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

// ---------- Hemmet ----------
// Hunden bor i en trädgård med staket. Sakerna i HOME köper man för hundben och ställer ut.
const homeGroup = group(scene);
const WHITE = mat(0xffffff);
for (let x = -9; x <= 9; x += 0.5) part(new THREE.BoxGeometry(0.16, 0.8, 0.05), WHITE, x, 0.4, -2.9, homeGroup); // staket
for (const y of [0.25, 0.58]) part(new THREE.BoxGeometry(18.5, 0.08, 0.04), WHITE, 0, y, -2.93, homeGroup);

// Dynan i korgen kan byta färg
let bedColor = 0xff8fc7;
try { bedColor = Number(localStorage.getItem('bedColor')) || bedColor; } catch {}
const BED = mat(bedColor);

const HOME = [
  ['Matta', (g) => {
    for (const [radius, color, y] of [[1.3, 0xff8fc7, 0.01], [1.05, 0xffd93d, 0.015], [0.8, 0xff8fc7, 0.02]]) {
      const rug = part(new THREE.CylinderGeometry(radius, radius, 0.02, 32), mat(color), 0, y, 0, g);
      rug.scale.z = 0.7;
      rug.castShadow = false;
      rug.receiveShadow = true;
    }
  }],
  ['Blommor', (g) => {
    const colors = [0xe63946, 0xffd93d, 0xff8fc7, 0x7b3fd1, 0xffffff, 0xff9f1c];
    [-2.7, -2.2, -0.35, 0.2, 0.8, 2.4, 2.9, 3.4].forEach((x, i) => {
      const height = 0.35 + (i % 3) * 0.08;
      part(new THREE.CylinderGeometry(0.02, 0.02, height, 6), mat(0x2e9e4f), x, height / 2, -2.55, g);
      fluff(0.11, mat(colors[i % colors.length]), x, height, -2.55, g);
      fluff(0.05, mat(0xffd93d), x, height, -2.46, g);
    });
  }],
  ['Ballonger', (g) => {
    [[-0.3, 1.75, 0xe63946], [0, 2.1, 0xffd93d], [0.3, 1.8, 0x2a9dff]].forEach(([dx, y, color]) => {
      const from = new THREE.Vector3(0.55, 0.8, -2.9);
      const to = new THREE.Vector3(0.55 + dx, y, -2.9);
      const string = part(new THREE.CylinderGeometry(0.01, 0.01, 1, 5), WHITE, 0, 0, 0, g);
      string.position.copy(from).lerp(to, 0.5);
      string.scale.y = from.distanceTo(to);
      string.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
      fluff(0.22, mat(color), to.x, to.y + 0.22, to.z, g).scale.y = 0.27;
    });
  }],
  ['Korg', (g) => { // en mjuk hundkorg att sova i
    const basket = group(g, 1.3, 0, -1.4);
    part(new THREE.TorusGeometry(0.42, 0.13, 10, 24), mat(0xb5793f), 0, 0.13, 0, basket).rotation.x = Math.PI / 2;
    fluff(1, BED, 0, 0.1, 0, basket).scale.set(0.4, 0.1, 0.4);
  }],
  ['Träd', (g) => {
    const tree = group(g, 2.0, 0, -3.6);
    part(new THREE.CylinderGeometry(0.16, 0.22, 1.6, 8), mat(0x7a4a2a), 0, 0.8, 0, tree);
    fluff(0.85, mat(0x2e9e4f), 0, 2.1, 0, tree);
    fluff(0.6, mat(0x3fb95f), 0.2, 2.9, 0.1, tree);
    for (const [x, y, z] of [[-0.5, 2.0, 0.6], [0.4, 2.4, 0.6], [0, 1.7, 0.75]]) fluff(0.09, mat(0xe63946), x, y, z, tree); // äpplen
  }],
  ['Hundkoja', (g) => {
    const house = group(g, -1.4, 0, -2.0);
    house.rotation.y = 0.3;
    part(new THREE.BoxGeometry(1.0, 0.8, 1.0), mat(0xe63946), 0, 0.4, 0, house);
    part(new THREE.ConeGeometry(0.88, 0.6, 4), mat(0x2a4a8a), 0, 1.1, 0, house).rotation.y = Math.PI / 4;
    part(new THREE.CylinderGeometry(0.26, 0.26, 0.02, 20), BLACK, 0, 0.36, 0.5, house).rotation.x = Math.PI / 2; // dörr
    part(new THREE.BoxGeometry(0.52, 0.36, 0.02), BLACK, 0, 0.18, 0.5, house);
    fluff(0.06, mat(0xffd93d), 0, 0.72, 0.5, house); // liten skylt
  }],
];
const homeItems = {};
for (const [name, build] of HOME) {
  homeItems[name] = group(homeGroup);
  build(homeItems[name]);
}
const placed = new Set(); // sakerna som står framme
try { for (const name of JSON.parse(localStorage.getItem('home')) || []) if (have(name)) placed.add(name); } catch {}
let tryHome = null; // en sak man tittar på men inte har köpt än
let tryTrick = null; // ett trick man har tryckt på men inte betalat för än
function showHome() {
  for (const [name] of HOME) homeItems[name].visible = placed.has(name) || tryHome === name;
}
showHome();

// ---------- Trick ----------
// Hunden kan lära sig trick för hundben. Siffran är hur många sekunder tricket tar.
const TRICKS = { Sitt: 2, Snurra: 1.2, Tass: 2.2, Dansa: 2.6, Rulla: 1.05, Volt: 1.05 };
let trick = null; // tricket hunden gör just nu
function startTrick(name) {
  if (trick || sleep) return;
  trick = { name, time: 0, length: TRICKS[name], baseY: dog.rotation.y };
  SOUND.bark();
  if (name === 'Rulla' || name === 'Volt') speedY = 6.3; // de här tricken görs i ett högt hopp
}
function updateTrick(dt) {
  if (!trick) return;
  trick.time += dt;
  const p = Math.min(1, trick.time / trick.length); // går från 0 till 1 under tricket
  const hold = Math.min(1, Math.sin(p * Math.PI) * 4); // mjuk start och mjukt slut
  if (trick.name === 'Sitt') {
    upper.rotation.z = 0.45 * hold; // rumpan ner, nosen upp
    for (const i of [0, 1]) for (const h of hips[i]) h.rotation.z = 1.3 * hold; // bakbenen viks in
  } else if (trick.name === 'Snurra') {
    dog.rotation.y = trick.baseY + p * Math.PI * 4; // två varv
  } else if (trick.name === 'Tass') {
    for (const h of hips[3]) h.rotation.z = hold * (1.3 + Math.sin(trick.time * 14) * 0.3); // tassen vinkar
    head.rotation.x = 0.15 * hold;
  } else if (trick.name === 'Dansa') {
    dog.rotation.y = trick.baseY + Math.sin(trick.time * 8) * 0.6;
    if (dog.position.y <= 0.01) speedY = 3.2;
  } else if (trick.name === 'Rulla') {
    dog.rotation.x = p * Math.PI * 2; // snurrar runt som en korv i luften
  } else if (trick.name === 'Volt') {
    dog.rotation.z = p * Math.PI * 2; // bakåtvolt
  }
  if (p >= 1 || mode !== 'dress') {
    dog.rotation.set(0, mode === 'run' ? 0 : trick.baseY, 0);
    trick = null;
    if (mode === 'dress') {
      SOUND.happy();
      burst('⭐');
    }
  }
}

// ---------- Sova ----------
// Har man köpt korgen kan hunden gå dit, lägga sig och ta en paus.
const SLEEP_TIME = 7; // sekunder, inklusive att gå dit och tillbaka
let sleep = null;
function startSleep() {
  if (sleep || trick || careAction || !placed.has('Korg')) return;
  sleep = { time: 0, x: dog.position.x, z: dog.position.z, turn: dog.rotation.y, nextZ: 1 };
}
function stopSleep() {
  if (!sleep) return;
  dog.position.set(sleep.x, 0, sleep.z);
  dog.rotation.set(0, sleep.turn, 0);
  sleep = null;
  showBreed(); // öppnar ögonen igen
}
function updateSleep(dt, time) {
  if (!sleep) return;
  if (mode !== 'dress' && mode !== 'care') return stopSleep();
  sleep.time += dt;
  // down går från 0 (står vid sin plats) till 1 (ligger i korgen) och tillbaka till 0
  const down = Math.min(1, sleep.time / 0.8, (SLEEP_TIME - sleep.time) / 0.8);
  const hipHeight = HIP * breed.legs * breed.size;
  dog.position.set(sleep.x + (1.3 - sleep.x) * down, -(hipHeight - 0.22) * down, sleep.z + (-1.4 - sleep.z) * down);
  dog.rotation.y = sleep.turn + (-1.0 - sleep.turn) * down;
  hips.forEach((sameLeg, i) => {
    for (const h of sameLeg) h.rotation.z = (i >= 2 ? 1.45 : -1.45) * down; // benen sträcks ut längs marken
  });
  head.rotation.z = -0.45 * down; // huvudet vilar
  upper.scale.setScalar(1 + (down === 1 ? Math.sin(time * 2) * 0.015 : 0)); // andas lugnt
  for (const eye of eyes) eye.scale.y = down === 1 ? 0.008 : 0.055 * (breed.eyes || 1); // blundar
  tail.rotation.x = 0;
  if (down === 1 && sleep.time > sleep.nextZ) {
    sleep.nextZ = sleep.time + 1.3;
    burst('💤');
    tone(130, 95, 0.6, 'sine', 0.05); // en liten snarkning
  }
  if (sleep.time >= SLEEP_TIME) {
    upper.scale.setScalar(1);
    stopSleep();
    stats.sleeps += 1;
    checkMedals();
    SOUND.bark();
    speedY = TAP_SPEED; // pigg och glad igen
    if (mode === 'care') showMode();
    else showWardrobe();
  }
}

// ---------- Medaljer ----------
// Varje medalj: [bild, namn, vad man ska göra, och ett test som säger om man har klarat det]
const stats = { perfect: 0, totalBones: 0, walks: 0, sleeps: 0 };
try { Object.assign(stats, JSON.parse(localStorage.getItem('stats')) || {}); } catch {}
const ownedOf = (names) => names.filter((name) => PRICE[name] && owned.has(name)).length;
const MEDALS = [
  ['🥇', 'Första målet', 'Klara en bana', () => level > 1],
  ['⭐', 'Felfri', 'Klara en bana utan att krocka', () => stats.perfect > 0],
  ['🦴', 'Bensamlare', 'Samla 100 ben totalt', () => stats.totalBones >= 100],
  ['🛍️', 'Första köpet', 'Köp något för hundben', () => owned.size > 0],
  ['🐕', 'Ny kompis', 'Köp en ny hund', () => ownedOf(BREEDS.map((b) => b.name)) > 0],
  ['🎪', 'Trickmästare', 'Lär hunden tre trick', () => ownedOf(Object.keys(TRICKS)) >= 3],
  ['🦮', 'Promenadproffs', 'Gå på promenad', () => stats.walks > 0],
  ['🏠', 'Hemmafixare', 'Ha tre saker i trädgården', () => placed.size >= 3],
  ['😴', 'Sjusovare', 'Låt hunden sova i korgen', () => stats.sleeps > 0],
  ['🏆', 'Mästare', 'Kom till bana 6', () => level >= 6],
];
const medals = new Set(); // namnen på medaljerna man har fått
try { for (const name of JSON.parse(localStorage.getItem('medals')) || []) medals.add(name); } catch {}
const medalButton = document.getElementById('medalButton');
const toast = document.getElementById('toast');
let toastTimer = 0;
function showMedals() {
  medalButton.textContent = `🏅 ${medals.size}/${MEDALS.length}`;
  document.getElementById('medalTitle').textContent = '🏅 ' + t('Medaljer');
  document.getElementById('medalClose').textContent = t('Stäng');
  const list = document.getElementById('medalList');
  list.textContent = '';
  for (const [emoji, name, how] of MEDALS) {
    const row = document.createElement('div');
    row.className = 'medal' + (medals.has(name) ? '' : ' missing');
    row.innerHTML = `<span>${medals.has(name) ? emoji : '🔒'}</span><div><b>${t(name)}</b>${t(how)}</div>`;
    list.appendChild(row);
  }
}
function checkMedals(quiet) {
  try { localStorage.setItem('stats', JSON.stringify(stats)); } catch {}
  for (const [emoji, name, , test] of MEDALS) {
    if (medals.has(name) || !test()) continue;
    medals.add(name);
    if (quiet) continue;
    // Visa en liten skylt överst en stund
    toast.textContent = `${emoji} ${t('Ny medalj')}: ${t(name)}!`;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast.hidden = true), 3200);
    melody([784, 988, 1175, 1568], 0.1);
  }
  try { localStorage.setItem('medals', JSON.stringify([...medals])); } catch {}
  showMedals();
}
medalButton.addEventListener('click', () => {
  SOUND.pop();
  showMedals();
  document.getElementById('medals').hidden = false;
});
document.getElementById('medalClose').addEventListener('click', () => (document.getElementById('medals').hidden = true));
refreshers.push(showMedals);

// ---------- Garderoben ----------
// Flikarna längst ner väljer vad man klär på. Ovanför visas alla plagg och färger.
const COLORS = [0xe63946, 0xff8fc7, 0xff9f1c, 0xffd93d, 0x2ecc71, 0x2a9dff, 0x7b3fd1, 0xffffff];
const chipsBar = document.getElementById('chips');
const colorsBar = document.getElementById('colors');
const tabsBar = document.getElementById('tabs');
const tabs = [{ icon: '🐶' }, ...wardrobe, { icon: '🏠', home: true }, { icon: '🎪', tricks: true }]; // första fliken är hundtyp, sista är hemmet
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
  if ((tryOn && tryOn.kind !== kind) || (activeTab !== 0 && breedIndex !== myBreed) || (tryHome && !kind.home) || (tryTrick && !kind.tricks)) stopTrying();
  if (activeTab === 0) {
    // Visa hundarna man har först, sedan de som kostar ben (numren i BREEDS ändras inte)
    const order = BREEDS.map((b, i) => i).sort((a, b) => have(BREEDS[b].name) - have(BREEDS[a].name));
    order.forEach((i) => {
      const b = BREEDS[i];
      const price = PRICE[b.name];
      const choose = () => {
        breedIndex = myBreed = i;
        try { localStorage.setItem('breed', i); } catch {}
        showBreed();
      };
      if (have(b.name)) {
        button(chipsBar, 'chip', t(b.name), i === breedIndex, choose);
      } else if (i !== breedIndex) {
        // Första trycket: titta på hunden
        button(chipsBar, 'chip locked', `🔒 ${t(b.name)} 🦴${price}`, false, () => { stopTrying(); breedIndex = i; showBreed(); });
      } else if (bones >= price) {
        // Andra trycket: köp den
        button(chipsBar, 'chip buy', `${t('Köp')} ${t(b.name)}? 🦴${price}`, false, () => { pay(b.name); choose(); });
      } else {
        button(chipsBar, 'chip poor', `🦴${price} – ${t('spring fler banor!')}`, false, () => SOUND.hit());
      }
    });
  } else if (kind.tricks) {
    for (const name of Object.keys(TRICKS)) {
      const price = PRICE[name];
      if (have(name)) {
        button(chipsBar, 'chip', t(name), false, () => startTrick(name)); // hunden gör tricket
      } else if (tryTrick !== name) {
        button(chipsBar, 'chip locked', `🔒 ${t(name)} 🦴${price}`, false, () => { stopTrying(); tryTrick = name; });
      } else if (bones >= price) {
        button(chipsBar, 'chip buy', `${t('Lär')} ${t(name)}? 🦴${price}`, false, () => {
          tryTrick = null;
          pay(name);
          startTrick(name); // visa direkt vad hunden har lärt sig
        });
      } else {
        button(chipsBar, 'chip poor', `🦴${price} – ${t('spring fler banor!')}`, false, () => SOUND.hit());
      }
    }
  } else if (kind.home) {
    if (placed.has('Korg')) button(chipsBar, 'chip buy', '😴 ' + t('Sova'), false, startSleep);
    for (const [name] of HOME) {
      const price = PRICE[name];
      if (have(name)) {
        // Saker man äger kan man ställa fram eller plocka undan
        button(chipsBar, 'chip', t(name), placed.has(name), () => {
          stopTrying();
          placed.has(name) ? placed.delete(name) : placed.add(name);
          try { localStorage.setItem('home', JSON.stringify([...placed])); } catch {}
          showHome();
          checkMedals();
        });
      } else if (tryHome !== name) {
        button(chipsBar, 'chip locked', `🔒 ${t(name)} 🦴${price}`, false, () => { stopTrying(); tryHome = name; showHome(); });
      } else if (bones >= price) {
        button(chipsBar, 'chip buy', `${t('Köp')} ${t(name)}? 🦴${price}`, false, () => {
          tryHome = null;
          pay(name);
          placed.add(name);
          try { localStorage.setItem('home', JSON.stringify([...placed])); } catch {}
          showHome();
          checkMedals();
        });
      } else {
        button(chipsBar, 'chip poor', `🦴${price} – ${t('spring fler banor!')}`, false, () => SOUND.hit());
      }
    }
    // Färgprickarna byter färg på dynan i korgen
    if (placed.has('Korg') || tryHome === 'Korg') {
      for (const color of COLORS) {
        const dot = button(colorsBar, 'dot', '', color === bedColor, () => {
          bedColor = color;
          BED.color.setHex(color);
          try { localStorage.setItem('bedColor', color); } catch {}
        });
        dot.style.background = '#' + color.toString(16).padStart(6, '0');
      }
    }
  } else {
    button(chipsBar, 'chip', '✖ ' + t('ingen'), kind.choice < 0, () => { stopTrying(); wear(kind, -1); saveOutfit(); });
    kind.options.forEach(([name], i) => {
      const price = PRICE[name];
      const trying = tryOn && tryOn.kind === kind && tryOn.i === i;
      if (have(name)) {
        button(chipsBar, 'chip', t(name), i === kind.choice, () => { stopTrying(); wear(kind, i); saveOutfit(); });
      } else if (!trying) {
        // Första trycket: prova plagget på hunden
        button(chipsBar, 'chip locked', `🔒 ${t(name)} 🦴${price}`, false, () => { stopTrying(); wear(kind, i); tryOn = { kind, i }; });
      } else if (bones >= price) {
        // Andra trycket: köp det
        button(chipsBar, 'chip buy', `${t('Köp')} ${t(name)}? 🦴${price}`, false, () => {
          tryOn = null;
          pay(name);
          saveOutfit();
        });
      } else {
        button(chipsBar, 'chip poor', `🦴${price} – ${t('spring fler banor!')}`, false, () => SOUND.hit());
      }
    });
    if (kind.choice >= 0) {
      for (const color of COLORS) {
        const dot = button(colorsBar, 'dot', '', color === kind.color, () => { wear(kind, kind.choice, color); saveOutfit(); });
        dot.style.background = '#' + color.toString(16).padStart(6, '0');
      }
    }
  }
  colorsBar.style.visibility = colorsBar.children.length ? 'visible' : 'hidden';
  // Rulla fram den knapp man håller på med, så att den inte hamnar utanför skärmen
  const current = chipsBar.querySelector('.buy, .poor, .chosen');
  if (current) chipsBar.scrollLeft = current.offsetLeft - chipsBar.offsetLeft - (chipsBar.clientWidth - current.offsetWidth) / 2;
}
tabs.forEach((tab, i) => {
  const el = document.createElement('button');
  el.className = 'tab';
  el.textContent = tab.icon;
  el.addEventListener('click', () => {
    activeTab = i;
    showWardrobe();
  });
  tabsBar.appendChild(el);
});
// Tärningen klär hunden i slumpade kläder och färger
const dice = document.createElement('button');
dice.className = 'tab';
dice.textContent = '🎲';
dice.addEventListener('click', () => {
  stopTrying();
  for (const kind of wardrobe) {
    // bara sådant man äger, eller ingenting (-1)
    const mine = [-1, ...kind.options.map((option, i) => i).filter((i) => have(kind.options[i][0]))];
    wear(kind, mine[Math.floor(Math.random() * mine.length)], COLORS[Math.floor(Math.random() * COLORS.length)]);
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
  if (mode === 'run') {
    // På banan: vänta och se om det blir ett svep (byt fil) eller ett vanligt tryck (hoppa)
    swipe = { x: event.clientX, y: event.clientY, used: false };
    return;
  }
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

// Svep på banan: åt sidan byter fil, uppåt hoppar. Ett tryck utan svep hoppar också.
let swipe = null;
const SWIPE = 16; // så många pixlar måste fingret flytta sig för att det ska räknas som ett svep
function readSwipe(event, limit) {
  if (!swipe || mode !== 'run') return false;
  const dx = event.clientX - swipe.x;
  const dy = event.clientY - swipe.y;
  if (Math.abs(dx) > limit && Math.abs(dx) > Math.abs(dy)) {
    changeLane(Math.sign(dx));
  } else if (dy < -limit && Math.abs(dy) > Math.abs(dx)) {
    jump();
  } else {
    return false;
  }
  return true;
}
window.addEventListener('pointermove', (event) => {
  // Ett finger kan bara göra en sak per svep, så att hunden inte byter två filer av misstag
  if (swipe && !swipe.used && readSwipe(event, SWIPE)) swipe.used = true;
});
window.addEventListener('pointerup', (event) => {
  // Ett snabbt litet svep hinner ibland inte märkas förrän fingret släpper, så kolla en gång till här.
  // Rörde sig fingret nästan inte alls var det ett vanligt tryck: hoppa.
  if (swipe && !swipe.used && !readSwipe(event, 8)) jump();
  swipe = null;
});
window.addEventListener('pointercancel', () => (swipe = null));

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
let walking = false; // sant när man är ute på promenad i stället för att springa en bana
const WALK_THEME = { sky: 0xffc7dd, ground: 0x8ad66f, track: 0xead2a4, bush: 0xff7fb6, obstacle: 0x8a5a3a }; // rosa kvällshimmel
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
// Banan har tre filer: vänster, mitten och höger
const LANE = 1.5; // avståndet mellan två filer
const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });
for (const z of [-LANE / 2, LANE / 2]) {
  const line = part(new THREE.PlaneGeometry(2600, 0.06), lineMat, 1250, 0.01, z, runWorld);
  line.rotation.x = -Math.PI / 2;
  line.castShadow = false;
}
for (const [material, width, y] of [[runGroundMat, 120, -0.02], [trackMat, 4.8, 0]]) {
  const plane = part(new THREE.PlaneGeometry(2600, width), material, 1250, y, 0, runWorld);
  plane.rotation.x = -Math.PI / 2;
  plane.castShadow = false;
  plane.receiveShadow = true;
}
const roadside = []; // buskar som flyttas fram när hunden har sprungit förbi dem
for (let i = 0; i < 16; i++) {
  const bush = fluff(0.3 + (i % 3) * 0.12, bushMat, 0, 0.25, i % 2 ? 3.5 : -3.5, runWorld);
  bush.castShadow = false;
  roadside.push(bush);
}
for (let i = 0; i < 8; i++) { // träd längre ut, så att det känns som en park
  const tree = group(runWorld, 0, 0, i % 2 ? 5.6 : -5.6);
  part(new THREE.CylinderGeometry(0.16, 0.22, 1.6, 8), new THREE.MeshStandardMaterial({ color: 0x7a4a2a, roughness: 1 }), 0, 0.8, 0, tree);
  fluff(0.8, bushMat, 0, 2.1, 0, tree);
  fluff(0.55, bushMat, 0.2, 2.9, 0.1, tree);
  roadside.push(tree);
}
const obstacleGroup = group(runWorld);
const goal = group(runWorld);
for (const z of [-2.6, 2.6]) part(new THREE.CylinderGeometry(0.07, 0.07, 2.6, 8), mat(0xffffff), 0, 1.3, z, goal);
part(new THREE.BoxGeometry(0.08, 0.45, 5.3), mat(0xffd93d), 0, 2.5, 0, goal);
for (let i = 0; i < 9; i++) part(new THREE.BoxGeometry(0.1, 0.2, 0.3), mat(0x2a1458), 0, 2.5 + (i % 2 ? 0.1 : -0.1), -2.4 + i * 0.6, goal);

// Hindren. Varje hinder står i en fil. half = halva längden, top = hur högt man måste hoppa,
// fromLevel = första banan de finns på, roll = rullar mot hunden,
// bottom = svävar i luften (hoppa inte där), tall = för högt att hoppa över (byt fil).
const WATER = new THREE.MeshStandardMaterial({ color: 0x4ab8ff, roughness: 0.2 });
const ROCK = new THREE.MeshStandardMaterial({ color: 0x8f8f9c, roughness: 1 });
const TRUNK = new THREE.MeshStandardMaterial({ color: 0x7a4a2a, roughness: 1 });
const OBSTACLES = [
  { fromLevel: 1, half: 0.22, top: 0.44, build: (g) => { // stock
    part(new THREE.CylinderGeometry(0.22, 0.22, 1.35, 12), obstacleMat, 0, 0.22, 0, g).rotation.x = Math.PI / 2;
  } },
  { fromLevel: 1, half: 0.6, top: 0.27, build: (g) => { // vattenpöl
    const puddle = part(new THREE.CylinderGeometry(1, 1, 0.03, 24), WATER, 0, 0.02, 0, g);
    puddle.scale.set(0.65, 1, 0.66);
    puddle.castShadow = false;
  } },
  { fromLevel: 1, half: 0.3, top: 9, tall: true, build: (g) => { // träd, för högt att hoppa över
    part(new THREE.CylinderGeometry(0.14, 0.18, 1.3, 10), TRUNK, 0, 0.65, 0, g);
    fluff(0.55, bushMat, 0, 1.7, 0, g);
    fluff(0.4, bushMat, 0.1, 2.25, 0.1, g);
  } },
  { fromLevel: 2, half: 0.2, top: 0.62, build: (g) => { // häck
    part(new THREE.BoxGeometry(0.36, 0.5, 1.35), obstacleMat, 0, 0.25, 0, g);
    for (const z of [-0.42, 0, 0.42]) fluff(0.26, bushMat, 0, 0.48, z, g).scale.y = 0.16;
  } },
  { fromLevel: 2, half: 0.32, top: 0.66, build: (g) => { // stenar
    for (const [z, size] of [[-0.4, 0.28], [0.1, 0.36], [0.5, 0.2]]) {
      fluff(size, ROCK, z * 0.2, size * 0.8, z, g).scale.y = size * 0.9;
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
  { fromLevel: 4, half: 0.3, bottom: 2.0, build: (g) => { // fågel som flyger lågt: hoppa inte här
    const bird = group(g, 0, 2.3, 0);
    bird.scale.setScalar(1.5);
    fluff(0.17, mat(0xffd93d), 0, 0, 0, bird).scale.x = 0.24;
    part(new THREE.ConeGeometry(0.05, 0.14, 8), mat(0xff9f1c), -0.26, 0, 0, bird).rotation.z = Math.PI / 2;
    fluff(0.03, BLACK, -0.15, 0.07, 0.1, bird);
    fluff(0.03, BLACK, -0.15, 0.07, -0.1, bird);
    const wings = [-1, 1].map((side) => {
      const wing = group(bird, 0, 0.05, side * 0.1);
      fluff(1, mat(0xffb703), 0, 0, side * 0.2, wing).scale.set(0.14, 0.025, 0.22);
      return [wing, side];
    });
    return (time) => {
      for (const [wing, side] of wings) wing.rotation.x = side * Math.sin(time * 14) * 0.7;
      bird.position.y = 2.3 + Math.sin(time * 3) * 0.08;
    };
  } },
];

// Hundben att samla på banan. Man får också ben för varje hjärta man har kvar i mål.
let runBones = 0; // ben man har plockat på den här banan
let lastStars = 0;
let lastReward = 0;
let pickups = [];
const boneGroup = group(runWorld);
const BONE = new THREE.MeshStandardMaterial({ color: 0xfff6e0, roughness: 0.5, emissive: 0x665522 });
const BONE_STICK = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
function addBone(x, y, z) {
  const g = group(boneGroup, x, y, z);
  part(BONE_STICK, BONE, 0, 0, 0, g).rotation.z = Math.PI / 2;
  for (const [dx, dy] of [[-0.16, 0.05], [-0.16, -0.05], [0.16, 0.05], [0.16, -0.05]]) fluff(0.07, BONE, dx, dy, 0, g);
  g.scale.setScalar(1.6); // stora nog att synas på håll
  pickups.push({ x, y, z, group: g });
}

// Farten ökar hela tiden under banan: ju längre man har sprungit, desto fortare går det
let startSpeed = 5;
function speedAt(x) {
  if (walking) return 4.8; // promenadtakt
  return Math.min(startSpeed + x * 0.02, startSpeed * 1.6, 12.5);
}

function addObstacle(kind, x, z) {
  const g = group(obstacleGroup, x, 0, z);
  const animate = kind.build(g);
  obstacles.push({ ...kind, x, z, group: g, animate, hit: false });
}

function startRun() {
  walking = false;
  beginRun();
}
function startWalk() {
  walking = true;
  beginRun();
  SOUND.happy();
}
function beginRun() {
  stopSleep();
  upper.scale.setScalar(1);
  stopTrying();
  showWardrobe();
  mode = 'run';
  const theme = walking ? WALK_THEME : THEMES[(level - 1) % THEMES.length];
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
  // Varje bana är längre, snabbare och har tätare mellan hindren än den förra
  startSpeed = Math.min(4.6 + level * 0.5, 10.5);
  runSpeed = startSpeed;
  const count = walking ? 0 : Math.min(8 + level * 4, 60); // antal hinder (inga alls på promenaden)
  const shortest = Math.max(0.9, 1.35 - level * 0.05); // kortaste tiden mellan två hinder, i sekunder
  const extra = Math.max(0.3, 0.9 - level * 0.06); // hur mycket längre det kan vara ibland
  const kinds = OBSTACLES.filter((kind) => level >= kind.fromLevel);
  boneGroup.clear();
  pickups = [];
  runBones = 0;
  let x = 10;
  for (let i = 0; i < count; i++) {
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const before = x;
    x += speedAt(x) * (shortest + Math.random() * extra) + (kind.roll ? 7 : 0); // rullande hinder får extra plats

    // Välj vilka filer hindret står i. Det finns alltid en väg förbi:
    // antingen en fri fil, eller så går hindret att hoppa över.
    const jumpable = !kind.tall && !kind.bottom && !kind.roll;
    let blocked = Math.random() < 0.5 ? 1 : 2;
    if (jumpable && level >= 2 && Math.random() < 0.2) blocked = 3; // hela banan: man måste hoppa
    const lanes = [-1, 0, 1].sort(() => Math.random() - 0.5);
    lanes.forEach((lane, n) => {
      if (n < blocked) {
        addObstacle(kind, x, lane * LANE);
        if (jumpable && Math.random() < 0.5) addBone(x, kind.top + 0.9, lane * LANE); // ben ovanför hindret
      } else if (Math.random() < 0.5) {
        addBone(x, 0.5, lane * LANE); // ben i den fria filen
      }
    });
    addBone((before + x) / 2, 0.5, lanes[0] * LANE); // ben på vägen dit
  }
  if (walking) {
    // På promenaden ligger benen i en slingrande rad, och några hänger högt så att man får hoppa
    let n = 0;
    for (x = 7; x < 86; x += 2.6) addBone(x, n++ % 6 === 5 ? 1.7 : 0.5, Math.round(Math.sin(x * 0.22)) * LANE);
  }
  goalX = x + 9;
  goal.position.x = goalX;

  dog.position.set(0, 0, 0);
  dog.rotation.set(0, 0, 0); // nosen pekar framåt längs banan
  lane = 0; // börja i mittenfilen
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
let lane = 0; // -1 = vänster, 0 = mitten, 1 = höger
function changeLane(step) {
  if (mode !== 'run') return;
  const next = Math.max(-1, Math.min(1, lane + step));
  if (next !== lane) SOUND.pop();
  lane = next;
}
window.addEventListener('keydown', (event) => {
  if (mode !== 'run') return;
  if (['Space', 'ArrowUp', 'KeyW'].includes(event.code)) jump();
  else if (['ArrowLeft', 'KeyA'].includes(event.code)) changeLane(-1);
  else if (['ArrowRight', 'KeyD'].includes(event.code)) changeLane(1);
  else return;
  event.preventDefault();
});
// Pilknapparna på skärmen (pointerdown i stället för click, så att det går fort)
document.getElementById('left').addEventListener('pointerdown', () => changeLane(-1));
document.getElementById('right').addEventListener('pointerdown', () => changeLane(1));

function updateRun(dt, time) {
  runSpeed = speedAt(dog.position.x);
  dog.position.x += runSpeed * dt;
  // Glid mjukt över till den fil man har valt
  const sideways = lane * LANE - dog.position.z;
  dog.position.z += Math.sign(sideways) * Math.min(Math.abs(sideways), 9 * dt);
  dog.rotation.y = -sideways * 0.35; // nosen vrids lite åt det håll hunden är på väg
  safeTime -= dt;
  const dogTop = dog.position.y + (1.3 + upperBase) * breed.size; // hundens huvud
  for (const ob of obstacles) {
    if (ob.roll && !ob.hit && ob.x - dog.position.x < 22) ob.x -= (ob.roll + level * 0.1) * dt; // bollen rullar fortare på högre banor
    ob.group.position.x = ob.x;
    if (ob.animate && !ob.hit) ob.animate(time);
    const close = Math.abs(dog.position.x - ob.x) < 0.4 * breed.size + ob.half && Math.abs(dog.position.z - ob.z) < 0.7;
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
    const near = Math.abs(dog.position.x - bone.x) < 0.3 + 0.4 * breed.size && Math.abs(dog.position.z - bone.z) < 0.75;
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
  if (dog.position.x >= goalX) walking ? endWalk() : endRun(true);
}

function goHome() {
  scene.background.setHex(HOME_SKY);
  ground.visible = true;
  stars.visible = false;
  runWorld.visible = false;
  dog.visible = true;
  dog.position.set(0, 0, 0);
  dog.rotation.set(0, -0.5, 0);
}
function endWalk() {
  // Hem igen efter promenaden. Benen man hittade får man behålla.
  bones += runBones;
  try { localStorage.setItem('bones', bones); } catch {}
  lastReward += runBones;
  walked = true;
  stats.walks += 1;
  stats.totalBones += runBones;
  mode = 'care';
  goHome();
  speedY = TAP_SPEED;
  burst('🦴');
  SOUND.win();
  showMode();
  checkMedals();
}
let walked = false; // om man redan har gått promenaden efter den här banan
function endRun(won) {
  dog.visible = true;
  if (won) {
    // Belöning: fler hjärtan kvar ger fler stjärnor och fler ben
    lastStars = hearts;
    lastReward = 5 + hearts * 5 + runBones;
    stats.totalBones += lastReward;
    if (hearts === 3) stats.perfect += 1;
    bones += lastReward;
    try { localStorage.setItem('bones', bones); } catch {}
    level += 1;
    try { localStorage.setItem('level', level); } catch {}
    mode = 'care';
    caredFor.clear();
    walked = false;
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
  if (won) checkMedals();
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

const SKIN = mat(0xffcc4d); // gul som en emoji-hand
function makeHand(parent) {
  const hand = group(parent);
  fluff(1, SKIN, 0, 0, 0, hand).scale.set(0.17, 0.06, 0.15); // handflata
  for (let i = 0; i < 4; i++) {
    const finger = part(new THREE.CapsuleGeometry(0.035, 0.14, 4, 8), SKIN, 0.2, -0.02, -0.105 + i * 0.07, hand);
    finger.rotation.z = Math.PI / 2 + 0.25; // fingrarna pekar framåt och lite nedåt
  }
  part(new THREE.CapsuleGeometry(0.035, 0.1, 4, 8), SKIN, 0.05, -0.01, 0.17, hand).rotation.x = Math.PI / 2 - 0.5; // tumme
  part(new THREE.CylinderGeometry(0.09, 0.1, 0.3, 12), mat(0x2a9dff), -0.27, 0.03, 0, hand).rotation.z = Math.PI / 2 - 0.2; // ärm
  hand.visible = false;
  return hand;
}
const hand = makeHand(careProps);

// Promenaden: en hand som håller i ett koppel
const walkHand = makeHand(scene);
walkHand.scale.setScalar(1.15);
const leash = part(new THREE.CylinderGeometry(0.02, 0.02, 1, 6), mat(0xe63946), 0, 0, 0, scene);
leash.visible = false;
const UP = new THREE.Vector3(0, 1, 0);
const leashFrom = new THREE.Vector3();
const leashTo = new THREE.Vector3();
function updateLeash() {
  walkHand.visible = leash.visible = mode === 'run' && walking;
  if (!leash.visible) return;
  leashFrom.set(dog.position.x + 0.4 * breed.size, dog.position.y + (0.92 + upperBase) * breed.size, dog.position.z); // halsen
  leashTo.set(dog.position.x - 1.5, 2.2, dog.position.z * 0.6 + 0.9); // handen, snett bakom hunden
  walkHand.position.copy(leashTo);
  walkHand.rotation.z = -0.5;
  const along = leashFrom.clone().sub(leashTo);
  leash.position.copy(leashTo).addScaledVector(along, 0.5);
  leash.scale.y = along.length();
  leash.quaternion.setFromUnitVectors(UP, along.normalize());
}

function updateCare(dt, time) {
  careProps.rotation.y = dog.rotation.y;
  const reach = 0.9 * breed.size + 0.1; // så långt fram når nosen
  for (const { bowl } of Object.values(BOWLS)) bowl.position.x = reach;
  hand.visible = false;
  if (!careAction) return;
  if (careAction.time === 0 && dog.position.y > 0.01) return; // vänta tills hunden har landat

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
  } else if (careAction.name === 'Leka') {
    // Leksaken studsar och hunden hoppar glatt efter den
    const toy = toyKind.items[toyKind.choice];
    if (toy) toy.position.y = done < 1 ? Math.abs(Math.sin(time * 6)) * 0.7 : 0;
    if (dog.position.y <= 0.01) speedY = 4;
    head.rotation.z = 0.2;
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
  el('levelName').textContent = walking ? '🦮 ' + t('Promenad') : t('Bana {n}').replace('{n}', level);
  if (walking) el('hearts').textContent = '';
  el('runBones').textContent = '🦴 ' + runBones;
}
function showMode() {
  el('top').hidden = mode !== 'dress';
  el('wardrobe').hidden = mode !== 'dress';
  el('hud').hidden = mode !== 'run' && mode !== 'lost';
  el('controls').hidden = mode !== 'run';
  el('lost').hidden = mode !== 'lost';
  el('care').hidden = mode !== 'care';
  showHud();
  el('hint').textContent = t('Tryck för att hoppa, svep för att byta fil');
  el('runButton').textContent = '🏃 ' + t('Spring bana {n}!').replace('{n}', level);
  el('lostTitle').textContent = t('Oj då!');
  el('lostText').textContent = t('Hunden snubblade. Försök igen!');
  el('retry').textContent = '🏃 ' + t('Försök igen');
  el('lostHome').textContent = '👗 ' + t('Garderoben');

  const allDone = CARE.every(([, name]) => caredFor.has(name));
  const actions = toyKind.choice >= 0 ? [...CARE, ['🎾', 'Leka']] : CARE; // har hunden en leksak kan man leka också
  el('careTitle').textContent = t('Bra sprunget!') + ' ' + '⭐'.repeat(lastStars);
  el('careReward').textContent = `+${lastReward} 🦴`;
  el('boneCount').textContent = '🦴 ' + bones;
  el('careText').textContent = allDone ? t('Hunden är glad igen!') : t('Nu behöver hunden lite omsorg');
  careProps.visible = mode === 'care';
  const careButtons = el('careButtons');
  careButtons.textContent = '';
  for (const [emoji, name] of actions) {
    const b = document.createElement('button');
    b.className = 'chip' + (caredFor.has(name) ? ' chosen' : '');
    b.textContent = `${emoji} ${t(name)}${caredFor.has(name) ? ' ✓' : ''}`;
    b.disabled = !!careAction || !!sleep || caredFor.has(name); // en sak i taget
    b.addEventListener('click', () => {
      SOUND.pop();
      careAction = { name, emoji, time: 0 };
      showMode();
    });
    careButtons.appendChild(b);
  }
  // Promenaden är belöningen: den låses upp när hunden har fått mat, vatten och klappar
  const walkButton = document.createElement('button');
  walkButton.className = 'chip' + (walked ? ' chosen' : allDone ? ' buy' : ' locked');
  walkButton.textContent = (allDone ? '🦮 ' : '🔒 ') + t('Promenad') + (walked ? ' ✓' : '');
  walkButton.disabled = !allDone || walked || !!careAction;
  walkButton.addEventListener('click', startWalk);
  careButtons.appendChild(walkButton);
  // Sova i korgen, om man har köpt den och ställt fram den
  const sleepButton = document.createElement('button');
  sleepButton.className = 'chip' + (placed.has('Korg') ? '' : ' locked');
  sleepButton.textContent = (placed.has('Korg') ? '😴 ' : '🔒 ') + t('Sova');
  sleepButton.disabled = !placed.has('Korg') || !!careAction || !!sleep;
  sleepButton.addEventListener('click', () => {
    startSleep();
    showMode();
  });
  careButtons.appendChild(sleepButton);
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
checkMedals(true); // medaljer man redan har förtjänat delas ut tyst när spelet startar

// Testläge för utvecklaren: adressen #test21 visar hund nummer 2 med plagg nummer 1, utan startsida
const test = location.hash.match(/^#test(\d)(\d?)/);
if (test) {
  startScreen.hidden = true;
  breedIndex = Number(test[1]) % BREEDS.length;
  showBreed();
  if (test[2]) activeTab = 1;
  if (test[2]) for (const [name] of HOME) placed.add(name);
  showHome();
  if (test[2]) for (const kind of wardrobe) wear(kind, Math.min(Number(test[2]), kind.items.length - 1));
  showWardrobe();
}

if (['#run', '#walk'].includes(location.hash) || location.hash.startsWith('#care')) {
  startScreen.hidden = true;
  startRun();
  if (location.hash === '#run') { // visa en av varje sorts hinder på rad
    obstacleGroup.clear();
    obstacles = [];
    startSpeed = 0.01;
    OBSTACLES.forEach((kind, i) => addObstacle({ ...kind, roll: 0 }, 3 + i * 2.2, ((i % 3) - 1) * LANE));
  }
  if (location.hash === '#walk') startWalk();
  if (location.hash.startsWith('#care')) {
    endRun(true);
    breedIndex = Number(location.hash[6] || 0) % BREEDS.length; // #care12 = sak 1, hund 2
    showBreed();
    careAction = { name: CARE[Number(location.hash[5] || 0) % 3][1], emoji: '🦴', time: 1.5 };
    speedY = 0;
    showMode();
  }
}

// Börja om: tillbaka till bana 1 utan ben och utan köpta saker. Hunden, namnet och språket finns kvar.
// Man måste trycka två gånger, så att det inte händer av misstag.
const resetButton = document.getElementById('reset');
let resetSure = false;
function showReset() {
  resetButton.textContent = resetSure ? '⚠️ ' + t('Säker? Tryck igen för att börja om') : '🔄 ' + t('Börja om från bana 1');
}
resetButton.addEventListener('click', () => {
  if (!resetSure) {
    resetSure = true;
    showReset();
    return;
  }
  try {
    for (const key of ['level', 'bones', 'owned', 'outfit', 'home', 'breed', 'stats', 'medals']) localStorage.removeItem(key);
  } catch {}
  location.hash = '';
  location.reload();
});
refreshers.push(showReset);
showReset();

// Högtalar-knappen stänger av och sätter på ljudet
const soundButton = document.getElementById('sound');
soundButton.textContent = soundOn ? '🔊' : '🔇';
soundButton.addEventListener('click', () => {
  soundOn = !soundOn;
  soundButton.textContent = soundOn ? '🔊' : '🔇';
  try { localStorage.setItem('sound', soundOn ? 'on' : 'off'); } catch {}
  SOUND.pop();
});

if (location.hash === '#medals') { // testläge: visa medaljlistan
  startScreen.hidden = true;
  medalButton.click();
  toast.textContent = '🥇 Ny medalj: Första målet!';
  toast.hidden = false;
}
if (location.hash === '#sleep') { // testläge: visa hunden sovande i korgen
  startScreen.hidden = true;
  for (const [name] of HOME) placed.add(name);
  showHome();
  startSleep();
  sleep.time = 2;
}
if (location.hash.startsWith('#trick')) { // testläge: visa ett trick mitt i rörelsen
  startScreen.hidden = true;
  startTrick(Object.keys(TRICKS)[Number(location.hash[6]) || 0]);
  trick.time = trick.length * 0.4;
  if (trick.name === 'Rulla' || trick.name === 'Volt') { dog.position.y = 1.5; speedY = 1; }
}

// Jordglob-knappen öppnar språkvalet igen, mitt i spelet. Kläderna och namnet finns kvar.
document.getElementById('language').addEventListener('click', () => {
  resetSure = false;
  showReset();
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
let stridePhase = 0; // var i springsteget hunden är
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

  // (tricken läggs på längre ner, efter att kroppen och benen har fått sina vanliga lägen)
  // Springsteg: kroppen guppar och gungar
  if (running) stridePhase += runSpeed * 2.4 * dt; // stegen går fortare när farten ökar
  const stride = running ? Math.sin(stridePhase) : 0;
  upper.position.y = upperBase + (inAir ? 0 : Math.abs(stride) * 0.06);
  dog.rotation.z = running ? (inAir ? 0.18 : stride * 0.07) : 0;

  // Omsorg: huvudet och kroppen står rakt om hunden inte äter, dricker eller blir klappad
  upper.rotation.z = 0;
  head.rotation.set(0, 0, 0);
  if (mode === 'care') updateCare(dt, time);

  // Benen svänger: bakbenen och frambenen i otakt, som en galopp. I luften sträcker hunden ut sig.
  const phase = stridePhase;
  hips.forEach((sameLeg, i) => {
    const front = i >= 2;
    let swing = 0;
    if (running) swing = inAir ? (front ? 0.9 : -0.9) : Math.sin(phase + (front ? Math.PI : 0) + (i % 2) * 0.6) * 0.75;
    for (const h of sameLeg) h.rotation.z = swing;
  });
  updateTrick(dt);
  updateSleep(dt, time);

  if (mode === 'run' || mode === 'lost') {
    // Kameran springer med rakt bakom hunden, så att man ser kroppen och alla tre filerna
    const narrow = camera.aspect < 1;
    camera.position.set(dog.position.x - (narrow ? 5.2 : 4.2), narrow ? 4.2 : 3.1, dog.position.z * 0.4);
    camera.lookAt(dog.position.x + (narrow ? 4 : 4.5), 0.4, dog.position.z * 0.4);
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
  updateLeash();
  homeGroup.visible = mode === 'dress' || mode === 'care';
  toyGroup.visible = mode === 'dress' || mode === 'care';
  toyGroup.rotation.y = dog.rotation.y;
  stars.position.x = camera.position.x;
  sun.position.x = dog.position.x + 3;
  sun.target.position.x = dog.position.x;

  renderer.render(scene, camera);
});
