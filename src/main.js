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
    'Svampar': 'Sienet', 'Lykta': 'Lyhty', 'Sandlåda': 'Hiekkalaatikko', 'Vimplar': 'Viirit', 'Regnbåge': 'Sateenkaari',
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
    'Voff!': 'Hau!', 'Hej!': 'Hei!', 'Ska vi springa?': 'Mennäänkö juoksemaan?', 'Jag gillar dig!': 'Tykkään sinusta!',
    'Vad fin jag blir!': 'Olenpa hieno!', 'Jag är hungrig!': 'Minulla on nälkä!', 'Mums!': 'Nam!', 'Ahh, gott!': 'Ahh, hyvää!',
    'Mer klappar!': 'Lisää silityksiä!', 'Vad kul!': 'Onpa hauskaa!', 'Tack!': 'Kiitos!', 'Vad skönt!': 'Olipa ihanaa!',
    'Titta på mig!': 'Katso minua!',
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
    'Hundparken': 'Koirapuisto', 'Titta, där kommer en hund!': 'Katso, sieltä tulee koira!', 'Hundkompisar': 'Koirakaverit',
    'Hälsa': 'Tervehdi', 'Nästa hund': 'Seuraava koira', 'Gå hem': 'Mene kotiin', 'Hej! Jag heter {n}': 'Hei! Olen {n}',
    'Vi är kompisar nu!': 'Nyt ollaan kavereita!', 'Vill du leka?': 'Leikitäänkö?', 'Hej kompis!': 'Hei kaveri!', 'Voff voff!': 'Hau hau!',
    'Simma': 'Ui', 'Håll in pilarna för att svänga': 'Käänny pitämällä nuolia pohjassa', 'Plask!': 'Loiskis!', 'Vad skönt det var!': 'Olipa ihanaa!', 'Simmare': 'Uimari', 'Simma i havet': 'Ui meressä',
    'Ge godis': 'Anna herkku', 'Mums! Tack!': 'Nam! Kiitos!', 'Så gott!': 'Tosi hyvää!', 'Du är snäll!': 'Olet kiltti!', 'Varsågod!': 'Ole hyvä!', 'Godisgivare': 'Herkkujen antaja', 'Ge godis till tre hundar': 'Anna herkku kolmelle koiralle',
    'Tofs': 'Töyhtö', 'Tuppkam': 'Irokeesi', 'Lockar': 'Kiharat', 'Flätor': 'Letit',
    'Kalas': 'Juhlat', 'Hurra, jag fyller år!': 'Hurraa, minulla on synttärit!', 'Tack för kalaset!': 'Kiitos juhlista!', 'Vilken bana!': 'Mikä rata!', 'Agilitystjärna': 'Agilitytähti', 'Spring agilitybanan i parken': 'Juokse agilityrata puistossa',
    'Gå med piltangenterna eller tryck i gräset': 'Kävele nuolinäppäimillä tai napauta ruohoa',
    'Nu åker jag!': 'Nyt mennään!', 'Högre!': 'Korkeammalle!', 'Wiii!': 'Jiihaa!', 'Lekplatsproffs': 'Leikkipuiston mestari', 'Åk något på lekplatsen i parken': 'Kokeile jotain leikkipuistossa', 'Hopp hopp!': 'Hyppy hyppy!', 'Snurr snurr!': 'Pyöri pyöri!', 'Min tur!': 'Minun vuoro!', 'Köp glass': 'Osta jäätelö', 'Mums, glass!': 'Nam, jäätelöä!', 'Jag vill också ha!': 'Minäkin haluan!', 'Glassälskare': 'Jäätelön ystävä', 'Köp en glass i kiosken': 'Osta jäätelö kioskista', 'Dykare': 'Sukeltaja', 'Dyk ner i havet': 'Sukella mereen', 'Dyk': 'Sukella', 'Upp': 'Ylös', 'Blubb blubb!': 'Pulp pulp!', 'Ahh, luft!': 'Ahh, ilmaa!',
    'Jag tog den!': 'Sain sen!', 'Hundkompis': 'Koirakaveri', 'Hälsa på fem hundar i parken': 'Tervehdi viittä koiraa puistossa',
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
    'Svampar': 'Mushrooms', 'Lykta': 'Lantern', 'Sandlåda': 'Sandbox', 'Vimplar': 'Bunting', 'Regnbåge': 'Rainbow',
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
    'Voff!': 'Woof!', 'Hej!': 'Hi!', 'Ska vi springa?': 'Shall we run?', 'Jag gillar dig!': 'I like you!',
    'Vad fin jag blir!': 'I look so nice!', 'Jag är hungrig!': "I'm hungry!", 'Mums!': 'Yum!', 'Ahh, gott!': 'Ahh, tasty!',
    'Mer klappar!': 'More pets!', 'Vad kul!': 'So fun!', 'Tack!': 'Thanks!', 'Vad skönt!': 'That was nice!',
    'Titta på mig!': 'Look at me!',
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
    'Hundparken': 'Dog park', 'Titta, där kommer en hund!': 'Look, here comes a dog!', 'Hundkompisar': 'Dog friends',
    'Hälsa': 'Say hi', 'Nästa hund': 'Next dog', 'Gå hem': 'Go home', 'Hej! Jag heter {n}': "Hi! I'm {n}",
    'Vi är kompisar nu!': 'We are friends now!', 'Vill du leka?': 'Want to play?', 'Hej kompis!': 'Hi friend!', 'Voff voff!': 'Woof woof!',
    'Simma': 'Swim', 'Håll in pilarna för att svänga': 'Hold the arrows to turn', 'Plask!': 'Splash!', 'Vad skönt det var!': 'That was lovely!', 'Simmare': 'Swimmer', 'Simma i havet': 'Swim in the sea',
    'Ge godis': 'Give a treat', 'Mums! Tack!': 'Yum! Thanks!', 'Så gott!': 'So tasty!', 'Du är snäll!': 'You are kind!', 'Varsågod!': 'Here you go!', 'Godisgivare': 'Treat giver', 'Ge godis till tre hundar': 'Give treats to three dogs',
    'Tofs': 'Ponytail', 'Tuppkam': 'Mohawk', 'Lockar': 'Curls', 'Flätor': 'Braids',
    'Kalas': 'Party', 'Hurra, jag fyller år!': "Hooray, it's my birthday!", 'Tack för kalaset!': 'Thanks for the party!', 'Vilken bana!': 'What a course!', 'Agilitystjärna': 'Agility star', 'Spring agilitybanan i parken': 'Run the agility course in the park',
    'Gå med piltangenterna eller tryck i gräset': 'Walk with the arrow keys or tap the grass',
    'Nu åker jag!': 'Here I go!', 'Högre!': 'Higher!', 'Wiii!': 'Wheee!', 'Lekplatsproffs': 'Playground pro', 'Åk något på lekplatsen i parken': 'Try something at the playground', 'Hopp hopp!': 'Boing boing!', 'Snurr snurr!': 'Round and round!', 'Min tur!': 'My turn!', 'Köp glass': 'Buy ice cream', 'Mums, glass!': 'Yum, ice cream!', 'Jag vill också ha!': 'I want one too!', 'Glassälskare': 'Ice cream lover', 'Köp en glass i kiosken': 'Buy an ice cream at the kiosk', 'Dykare': 'Diver', 'Dyk ner i havet': 'Dive down in the sea', 'Dyk': 'Dive', 'Upp': 'Up', 'Blubb blubb!': 'Glub glub!', 'Ahh, luft!': 'Ahh, air!',
    'Jag tog den!': 'I got it!', 'Hundkompis': 'Dog friend', 'Hälsa på fem hundar i parken': 'Say hi to five dogs in the park',
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
tail.name = 'tail'; // namnet gör att man hittar svansen på en kopia av hunden
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
  Svampar: 10, Lykta: 15, 'Sandlåda': 20, Vimplar: 20, 'Regnbåge': 50,
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
    // Frisören: frisyrer som man kan färga i vilken färg man vill
    id: 'hair', icon: '✂️', parent: head,
    options: [
      ['Tofs', 0xff8fc7, (g, m) => {
        part(new THREE.CylinderGeometry(0.06, 0.06, 0.07, 10), mat(0xffffff), 0, 0.4, 0, g); // snodd
        fluff(0.1, m, 0, 0.5, 0, g);
        for (const [x, z] of [[0.1, 0], [-0.1, 0], [0, 0.1], [0, -0.1]]) fluff(0.08, m, x, 0.56, z, g);
      }],
      ['Tuppkam', 0x7b3fd1, (g, m) => {
        for (let i = 0; i < 6; i++) fluff(0.09 - Math.abs(i - 2) * 0.008, m, 0.2 - i * 0.09, 0.34 + Math.sin((i / 5) * Math.PI) * 0.1, 0, g).scale.y = 0.15;
      }],
      ['Lockar', 0xffd93d, (g, m) => {
        for (let i = 0; i < 9; i++) fluff(0.085, m, Math.cos(i * 0.7) * 0.17 - 0.03, 0.3 + (i % 2) * 0.05, Math.sin(i * 0.7) * 0.19, g);
        fluff(0.1, m, -0.02, 0.38, 0, g);
      }],
      ['Flätor', 0x2a9dff, (g, m) => {
        for (const side of [-1, 1]) {
          for (let i = 0; i < 4; i++) fluff(0.085 - i * 0.006, m, -0.2 - i * 0.03, 0.2 - i * 0.13, side * (0.25 + i * 0.03), g);
          bow(g, mat(0xffffff), -0.3, -0.28, side * 0.36, 0.6);
        }
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
  say('Tack!');
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
  // Terriern är gratis (den har inget pris i PRICE). Den liknar en borderterrier:
  // ljusbrun sträv päls, mörkare nos och små mörka vikta öron
  { name: 'Terrier', size: 0.8, legs: 1.0, cheeks: true, snout: [0.95, 0.95, 0.95],
    ears: 'flap', earSize: 0.7, tail: 'long', fur: 0xc99a62, legFur: 0xd6ad7a, earFur: 0x5e4330, muzzle: 0x54402f },
];
let breedIndex = 0;
try { breedIndex = Number(localStorage.getItem('breed')) || 0; } catch {}
if (!BREEDS[breedIndex] || !have(BREEDS[breedIndex].name)) breedIndex = 0;
let myBreed = breedIndex; // den hund man äger och har valt (breedIndex kan vara en man bara tittar på)
let breed = BREEDS[breedIndex];
const hats = wardrobe.find((kind) => kind.id === 'hat');
let furColor = null; // färgad päls från frisören (null = hundens egen färg)
try { furColor = JSON.parse(localStorage.getItem('fur')); } catch {}
function showBreed(natural) {
  breed = BREEDS[breedIndex];
  const dyed = furColor !== null && !natural && breedIndex === myBreed;
  FUR.color.setHex(dyed ? furColor : breed.fur);
  LEG_FUR.color.setHex(dyed ? furColor : breed.legFur);
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

// Fjärilar som flyger runt i trädgården. De är gratis och finns alltid där.
const butterflies = [[0xff8fc7, -1.3, -1.2], [0xffd93d, 1.2, -0.9], [0x2a9dff, 0.1, -2.1]].map(([color, x, z], i) => {
  const body = group(homeGroup);
  body.scale.setScalar(1.6);
  part(new THREE.CapsuleGeometry(0.025, 0.12, 4, 6), BLACK, 0, 0, 0, body).rotation.z = Math.PI / 2;
  const wings = [-1, 1].map((side) => {
    const wing = group(body);
    fluff(1, mat(color), 0.02, 0, side * 0.13, wing).scale.set(0.1, 0.012, 0.13);
    fluff(1, mat(color), -0.07, 0, side * 0.09, wing).scale.set(0.07, 0.012, 0.09);
    return [wing, side];
  });
  return { body, wings, x, z, offset: i * 2.1 };
});
// Moln på himlen, också gratis. De driver sakta fram och tillbaka.
const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const clouds = [[-7, 8.5, 1], [2, 9.5, 0.8], [9, 8, 1.1]].map(([x, y, size]) => {
  const cloud = group(homeGroup, x, y, -18);
  cloud.scale.setScalar(size);
  for (const [dx, dy, r] of [[-1, 0, 0.8], [0, 0.3, 1.1], [1.1, 0, 0.85], [0.2, -0.2, 0.9]]) {
    fluff(r, cloudMat, dx, dy, 0, cloud).castShadow = false;
  }
  return { cloud, x };
});
function updateButterflies(time) {
  for (const c of clouds) c.cloud.position.x = c.x + Math.sin(time * 0.08 + c.x) * 2;
  for (const b of butterflies) {
    const a = time * 0.7 + b.offset;
    // Flyger i mjuka åttor och guppar upp och ner
    b.body.position.set(b.x + Math.sin(a) * 0.9, 1.3 + Math.sin(a * 2.3) * 0.35, b.z + Math.sin(a * 2) * 0.45);
    b.body.rotation.y = -Math.atan2(Math.cos(a * 2) * 0.9, Math.cos(a) * 0.9); // nosen åt det håll den flyger
    for (const [wing, side] of b.wings) wing.rotation.x = side * (0.3 + Math.sin(time * 16 + b.offset) * 0.8);
  }
}

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
  ['Svampar', (g) => {
    for (const [x, z, size] of [[-1.55, -0.95, 1], [-1.3, -0.75, 0.7], [-1.75, -0.7, 0.8]]) {
      const shroom = group(g, x, 0, z);
      shroom.scale.setScalar(size);
      // Karljohansvamp: tjock ljus fot och brun hatt utan prickar. Den är ätlig, inte giftig.
      part(new THREE.CylinderGeometry(0.06, 0.09, 0.2, 10), mat(0xf4e7d3), 0, 0.1, 0, shroom);
      dome(shroom, mat(0x9a5b2e), 0.16, 0.17);
    }
  }],
  ['Lykta', (g) => {
    const lamp = group(g, -0.45, 0, -2.75);
    part(new THREE.CylinderGeometry(0.035, 0.055, 1.5, 8), mat(0x2a1458), 0, 0.75, 0, lamp);
    fluff(0.15, new THREE.MeshStandardMaterial({ color: 0xfff3b0, emissive: 0xffd93d }), 0, 1.6, 0, lamp);
    part(new THREE.ConeGeometry(0.2, 0.14, 8), mat(0x2a1458), 0, 1.78, 0, lamp);
  }],
  ['Sandlåda', (g) => {
    const box = group(g, 0.15, 0, -2.0);
    part(new THREE.BoxGeometry(1.15, 0.16, 1.0), mat(0xb5793f), 0, 0.08, 0, box);
    part(new THREE.BoxGeometry(1.0, 0.17, 0.85), mat(0xf2d28a), 0, 0.09, 0, box); // sand
    fluff(1, mat(0xf2d28a), -0.2, 0.17, -0.1, box).scale.set(0.2, 0.12, 0.2); // sandhög
    part(new THREE.CylinderGeometry(0.1, 0.075, 0.16, 10), mat(0xe63946), 0.28, 0.25, 0.15, box); // hink
    part(new THREE.BoxGeometry(0.05, 0.03, 0.28), mat(0x2a9dff), -0.1, 0.19, 0.25, box); // spade
  }],
  ['Vimplar', (g) => {
    const colors = [0xe63946, 0xffd93d, 0x2ecc71, 0x2a9dff, 0xff8fc7, 0x7b3fd1];
    for (const x of [-3.4, 3.4]) part(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 6), WHITE, x, 0.75, -2.95, g);
    part(new THREE.BoxGeometry(6.8, 0.02, 0.02), WHITE, 0, 1.48, -2.95, g); // snöret
    for (let i = 0; i < 17; i++) {
      const flag = part(new THREE.ConeGeometry(0.13, 0.26, 3), mat(colors[i % colors.length]), -3.2 + i * 0.4, 1.34, -2.95, g);
      flag.rotation.x = Math.PI; // spetsen nedåt
      flag.scale.z = 0.15;
    }
  }],
  ['Regnbåge', (g) => {
    [0xe63946, 0xff9f1c, 0xffd93d, 0x2ecc71, 0x2a9dff, 0x7b3fd1].forEach((color, i) => {
      const arc = new THREE.Mesh(new THREE.TorusGeometry(7 - i * 0.32, 0.17, 6, 40, Math.PI), new THREE.MeshBasicMaterial({ color }));
      arc.position.set(-1, -0.3, -16);
      g.add(arc);
    });
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

// ---------- Kalas ----------
// Hundens födelsedag: tårta med ljus, ballonger och en glad hund
const partyGroup = group(scene);
partyGroup.visible = false;
const cake = group(partyGroup, 0.95, 0, 0.75);
part(new THREE.CylinderGeometry(0.34, 0.34, 0.2, 24), mat(0xff8fc7), 0, 0.1, 0, cake);
part(new THREE.CylinderGeometry(0.35, 0.35, 0.05, 24), WHITE, 0, 0.22, 0, cake);
part(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 24), mat(0xff8fc7), 0, 0.32, 0, cake);
part(new THREE.CylinderGeometry(0.23, 0.23, 0.04, 24), WHITE, 0, 0.41, 0, cake);
for (let i = 0; i < 8; i++) fluff(0.035, mat(0xe63946), Math.cos(i * 0.785) * 0.29, 0.26, Math.sin(i * 0.785) * 0.29, cake);
const flames = [-0.1, 0, 0.1].map((x, i) => {
  part(new THREE.CylinderGeometry(0.014, 0.014, 0.16, 6), mat([0x2a9dff, 0xffd93d, 0x2ecc71][i]), x, 0.5, i === 1 ? 0.06 : -0.03, cake);
  return fluff(0.03, new THREE.MeshBasicMaterial({ color: 0xffb703 }), x, 0.61, i === 1 ? 0.06 : -0.03, cake);
});
const partyBalloons = [0xe63946, 0xffd93d, 0x2a9dff, 0x2ecc71, 0xff8fc7, 0x7b3fd1].map((color, i) => {
  const balloon = group(partyGroup, -2.2 + i * 0.9, 0, -1.2 - (i % 2) * 0.6);
  fluff(0.24, mat(color), 0, 0, 0, balloon).scale.y = 0.29;
  part(new THREE.CylinderGeometry(0.006, 0.006, 0.6, 4), WHITE, 0, -0.55, 0, balloon);
  return balloon;
});
const PARTY_TIME = 10;
let party = null; // { time, blown }
function startParty() {
  stopSleep();
  party = { time: 0, blown: false };
  for (const flame of flames) flame.visible = true;
  burst('🎉');
  melody([523, 587, 659, 784, 659, 784, 1047], 0.16);
  say('Hurra, jag fyller år!');
  stats.parties = (stats.parties || 0) + 1;
}
function updateParty(dt, time) {
  partyGroup.visible = !!party && mode === 'dress';
  if (!party) return;
  party.time += dt;
  partyBalloons.forEach((balloon, i) => {
    balloon.position.y = Math.min(0.9 + party.time * 0.9, 2.6 + (i % 3) * 0.35) + Math.sin(time * 2 + i) * 0.06; // ballongerna stiger och gungar
    balloon.rotation.z = Math.sin(time * 1.5 + i) * 0.1;
  });
  for (const flame of flames) flame.scale.setScalar(0.03 * (1 + Math.sin(time * 20 + flame.position.x * 40) * 0.2));
  if (dog.position.y === 0 && party.time < PARTY_TIME - 1) speedY = 3.2; // hunden skuttar av glädje
  if (!party.blown && party.time > 5) {
    // Hunden blåser ut ljusen
    party.blown = true;
    for (const flame of flames) flame.visible = false;
    burst('🎈');
    SOUND.happy();
    say('Tack för kalaset!');
  }
  if (party.time > PARTY_TIME || mode !== 'dress') party = null;
}

// ---------- Trick ----------
// Hunden kan lära sig trick för hundben. Siffran är hur många sekunder tricket tar.
const TRICKS = { Sitt: 2, Snurra: 1.2, Tass: 2.2, Dansa: 2.6, Rulla: 1.05, Volt: 1.05 };
let trick = null; // tricket hunden gör just nu
function startTrick(name) {
  if (trick || sleep) return;
  trick = { name, time: 0, length: TRICKS[name], baseY: dog.rotation.y };
  SOUND.bark();
  say('Titta på mig!');
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
    say('Vad skönt!');
    speedY = TAP_SPEED; // pigg och glad igen
    if (mode === 'care') showMode();
    else showWardrobe();
  }
}

// ---------- Medaljer ----------
// Varje medalj: [bild, namn, vad man ska göra, och ett test som säger om man har klarat det]
const stats = { perfect: 0, totalBones: 0, walks: 0, sleeps: 0, friends: 0 };
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
  ['🛝', 'Lekplatsproffs', 'Åk något på lekplatsen i parken', () => stats.rides > 0],
  ['🍦', 'Glassälskare', 'Köp en glass i kiosken', () => stats.ices > 0],
  ['🤿', 'Dykare', 'Dyk ner i havet', () => stats.dives > 0],
  ['🏅', 'Agilitystjärna', 'Spring agilitybanan i parken', () => stats.agility > 0],
  ['🏊', 'Simmare', 'Simma i havet', () => stats.swims > 0],
  ['🍪', 'Godisgivare', 'Ge godis till tre hundar', () => stats.treats >= 3],
  ['💗', 'Hundkompis', 'Hälsa på fem hundar i parken', () => stats.friends >= 5],
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

// ---------- Pratbubbla ----------
// Hunden säger korta saker i en bubbla ovanför huvudet.
const bubble = document.getElementById('bubble');
const bubblePoint = new THREE.Vector3();
let bubbleTime = 0; // sekunder som bubblan ska synas till
function say(text) {
  bubble.textContent = t(text);
  bubbleTime = 2.6;
}
function sayOneOf(...texts) {
  say(texts[Math.floor(Math.random() * texts.length)]);
}
function updateBubble(dt) {
  bubbleTime -= dt;
  bubble.hidden = bubbleTime <= 0 || (mode !== 'dress' && mode !== 'care' && mode !== 'park' && mode !== 'swim');
  if (bubble.hidden) return;
  // Räkna ut var på skärmen hundens huvud är, och lägg bubblan strax ovanför
  head.getWorldPosition(bubblePoint);
  bubblePoint.y += 0.75 * breed.size;
  bubblePoint.project(camera);
  bubble.style.left = Math.min(Math.max(((bubblePoint.x + 1) / 2) * window.innerWidth, 90), window.innerWidth - 90) + 'px';
  bubble.style.top = Math.max(((1 - bubblePoint.y) / 2) * window.innerHeight, 60) + 'px';
}

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
    // Färgprickarna färgar pälsen på den hund man har. Krysset ger tillbaka hundens egen färg.
    const dye = (color) => {
      stopTrying();
      furColor = color;
      try { localStorage.setItem('fur', JSON.stringify(color)); } catch {}
      showBreed();
      if (color !== null) say('Vad fin jag blir!');
    };
    button(colorsBar, 'dot', '✖', furColor === null, () => dye(null)).style.background = '#fff';
    for (const color of COLORS) {
      button(colorsBar, 'dot', '', color === furColor, () => dye(color)).style.background = '#' + color.toString(16).padStart(6, '0');
    }
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
    button(chipsBar, 'chip buy', '🎂 ' + t('Kalas'), false, startParty);
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
        button(chipsBar, 'chip', t(name), i === kind.choice, () => { stopTrying(); wear(kind, i); saveOutfit(); if (kind !== toyKind) say('Vad fin jag blir!'); });
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
const GRASS = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // marken, för att se var i gräset man trycker
let strollTo = null; // dit hunden är på väg i parken
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
    sayOneOf('Voff!', 'Hej!', 'Ska vi springa?', 'Jag gillar dig!');
  } else if (mode === 'park') {
    // I parken: tryck i gräset så går hunden dit
    const hit = raycaster.ray.intersectPlane(GRASS, new THREE.Vector3());
    if (hit) strollTo = { x: hit.x, z: hit.z };
  }
  if (mode === 'park') return; // i parken snurrar man inte på hunden
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
let agility = false; // sant när hunden springer agilitybanan
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

// ---------- Havet ----------
// Här simmar hunden fritt. En genomskinlig vattenyta gör att bara halva hunden sticker upp.
const seaWorld = group(scene);
seaWorld.visible = false;
const SEA_FLOOR = -4.2; // så djupt ner ligger botten
const seabed = part(new THREE.PlaneGeometry(400, 400), mat(0xd9c58f), 0, SEA_FLOOR, 0, seaWorld);
seabed.rotation.x = -Math.PI / 2;
seabed.castShadow = false;
const seaGroup = group(seaWorld); // allt som ligger på vattenytan
const seaSurface = part(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ color: 0x3fb4f0, roughness: 0.25, transparent: true, opacity: 0.8, side: THREE.DoubleSide }), 0, 0, 0, seaGroup);
seaSurface.rotation.x = -Math.PI / 2;
seaSurface.castShadow = false;
const SAND = mat(0xf2d79b);
const PALM = mat(0x2fa35a);
const RED = mat(0xe63946);
const seaThings = []; // sådant man inte kan simma igenom: [x, z, hur stort]
const SEA_EDGE = 24; // så långt ut kan man simma
for (const [x, z] of [[9, -5], [-8, 7], [3, 14], [-13, -9], [16, 9], [-3, -16], [20, -12], [-19, 2]]) { // öar med en palm
  const island = group(seaGroup, x, 0, z);
  dome(island, SAND, 1.6, -0.5);
  part(new THREE.CylinderGeometry(1.6, 2.4, 5, 16), SAND, 0, -3, 0, island); // ön går hela vägen ner till botten
  part(new THREE.CylinderGeometry(0.1, 0.14, 1.6, 8), TRUNK, 0, 1.4, 0, island).rotation.z = 0.15;
  for (let k = 0; k < 5; k++) {
    const leaf = fluff(1, PALM, -0.1 + Math.cos(k * 1.26) * 0.5, 2.15, Math.sin(k * 1.26) * 0.5, island);
    leaf.scale.set(0.5, 0.07, 0.2);
    leaf.rotation.y = -k * 1.26;
  }
  seaThings.push([x, z, 1.75]);
}
const FOAM = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
for (let i = 0; i < 40; i++) { // vita vågskvalp på ytan
  const wave = part(new THREE.BoxGeometry(0.7, 0.02, 0.08), FOAM, Math.sin(i * 12.9) * 26, 0.02, Math.cos(i * 7.3) * 26, seaGroup);
  wave.castShadow = false;
}
// Saker som flyter i havet
const SEA_TOYS = [
  (g) => { // boj
    fluff(0.36, RED, 0, 0.1, 0, g);
    part(new THREE.CylinderGeometry(0.37, 0.37, 0.12, 16), WHITE, 0, 0.12, 0, g);
    part(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8), WHITE, 0, 0.75, 0, g);
    fluff(0.09, mat(0xffd93d), 0, 1.15, 0, g);
  },
  (g) => { // klippor
    for (const [z, size] of [[-0.3, 0.42], [0.25, 0.55], [0.05, 0.3]]) fluff(size, ROCK, z * 0.4, size * 0.35, z, g).scale.y = size * 1.1;
  },
  (g) => { // badring
    part(new THREE.TorusGeometry(0.4, 0.16, 10, 24), mat(0xff8fc7), 0, 0.08, 0, g).rotation.x = Math.PI / 2;
    for (let k = 0; k < 4; k++) part(new THREE.TorusGeometry(0.4, 0.165, 10, 6, 0.35), WHITE, 0, 0.08, 0, g).rotation.set(Math.PI / 2, 0, k * (Math.PI / 2));
  },
  (g) => { // liten segelbåt
    const hull = part(new THREE.CylinderGeometry(0.3, 0.2, 0.9, 12, 1), mat(0x9a5b2e), 0, 0.12, 0, g);
    hull.rotation.z = Math.PI / 2;
    hull.scale.set(0.7, 1, 1);
    part(new THREE.CylinderGeometry(0.03, 0.03, 1.3, 8), WHITE, 0, 0.9, 0, g);
    part(new THREE.ConeGeometry(0.5, 1, 3), mat(0xffd93d), -0.02, 1, 0, g).scale.z = 0.08;
  },
];
const floaters = [[5, 2, 0], [4, -9, 3], [-5, -3, 2], [-2, 6, 0], [11, 5, 1], [-10, -2, 3], [8, -13, 2], [-14, 12, 0], [14, -2, 1], [1, -8, 2], [-7, 14, 3], [18, 2, 0]].map(([x, z, n]) => {
  const g = group(seaGroup, x, 0, z);
  SEA_TOYS[n](g);
  seaThings.push([x, z, 0.75]);
  return g;
});
function makeFish(color, parent) {
  const fish = group(parent);
  fluff(0.2, mat(color), 0, 0, 0, fish).scale.set(0.22, 0.12, 0.07);
  part(new THREE.ConeGeometry(0.1, 0.16, 4), mat(color), -0.24, 0, 0, fish).rotation.z = -Math.PI / 2;
  fluff(0.02, BLACK, 0.12, 0.03, 0.06, fish);
  fluff(0.02, BLACK, 0.12, 0.03, -0.06, fish);
  return fish;
}
// Fiskar som hoppar upp ur vattnet nära hunden
const fishes = [0xff9f1c, 0xffd93d, 0xff8fc7].map((color) => ({ fish: makeFish(color, seaGroup), start: 0, x: 0, z: 0, turn: 0 }));
// Under ytan: sjögräs, koraller, snäckor, sjöstjärnor, en skattkista och fiskar som simmar runt
const spread = (i, a, b) => [Math.sin(i * a) * 21, Math.cos(i * b) * 21]; // utspritt över botten, likadant varje gång
const WEED = mat(0x1f9d6b);
const seaweed = [];
for (let i = 0; i < 34; i++) {
  const [x, z] = spread(i, 12.9, 7.3);
  const tall = 0.7 + (i % 4) * 0.3;
  const weed = group(seaWorld, x, SEA_FLOOR, z);
  fluff(1, WEED, 0, tall, 0, weed).scale.set(0.09, tall, 0.09);
  fluff(1, WEED, 0.22, tall * 0.7, 0.1, weed).scale.set(0.07, tall * 0.7, 0.07);
  seaweed.push(weed);
}
for (let i = 0; i < 16; i++) { // koraller
  const [x, z] = spread(i, 5.1, 9.7);
  const coral = group(seaWorld, x, SEA_FLOOR, z);
  const m = mat([0xff8fc7, 0xff9f1c, 0x7b3fd1, 0xe63946][i % 4]);
  for (let k = 0; k < 4; k++) fluff(0.2 + (k % 2) * 0.1, m, Math.cos(k * 1.9) * 0.28, 0.25 + k * 0.17, Math.sin(k * 1.9) * 0.28, coral);
}
for (let i = 0; i < 22; i++) { // snäckor
  const [x, z] = spread(i, 3.7, 11.3);
  dome(seaWorld, mat(i % 2 ? 0xffffff : 0xffc7dd), 0.16, SEA_FLOOR).position.set(x, SEA_FLOOR, z);
}
for (let i = 0; i < 12; i++) { // sjöstjärnor
  const [x, z] = spread(i, 8.3, 2.9);
  const star = group(seaWorld, x, SEA_FLOOR + 0.04, z);
  for (let k = 0; k < 5; k++) fluff(1, mat(0xff9f1c), Math.cos(k * 1.257) * 0.14, 0, Math.sin(k * 1.257) * 0.14, star).scale.set(0.16, 0.05, 0.07);
  star.children.forEach((arm, k) => (arm.rotation.y = -k * 1.257));
}
const chest = group(seaWorld, 6, SEA_FLOOR, 4); // en skattkista på botten
part(new THREE.BoxGeometry(0.9, 0.5, 0.6), TRUNK, 0, 0.25, 0, chest);
part(new THREE.CylinderGeometry(0.3, 0.3, 0.9, 12, 1, false, 0, Math.PI), TRUNK, 0, 0.5, 0, chest).rotation.set(0, 0, Math.PI / 2);
for (const x of [-0.3, 0.3]) part(new THREE.BoxGeometry(0.08, 0.52, 0.62), mat(0xffd93d), x, 0.26, 0, chest);
for (let k = 0; k < 5; k++) fluff(0.07, mat(0xffd93d), -0.3 + k * 0.15, 0.56 + (k % 2) * 0.05, 0.25, chest); // guldet tittar fram
const deepFish = [0xff9f1c, 0x2a9dff, 0xffd93d, 0xff8fc7, 0x2ecc71, 0xe63946, 0xffffff, 0x7b3fd1, 0xff9f1c, 0x2a9dff].map((color, i) => {
  const fish = makeFish(color, seaWorld);
  fish.scale.setScalar(1 + (i % 3) * 0.4);
  return fish;
});
const airBubbles = [0, 1, 2, 3, 4].map(() => fluff(0.05, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }), 0, 0, 0, seaWorld));
const seaFog = new THREE.Fog(0x1c78b8, 2, 26); // under vattnet blir det blått och disigt längre bort
const DIVE_DEPTH = -3; // så djupt simmar hunden när den dyker
let diving = false;
let depth = 0;
function toggleDive(down = !diving) {
  if (mode !== 'swim' || down === diving) return;
  diving = down;
  SOUND.Vatten();
  say(diving ? 'Blubb blubb!' : 'Ahh, luft!');
  if (diving) {
    stats.dives = (stats.dives || 0) + 1;
    checkMedals();
  }
  showDive();
}
function showDive() {
  el('diveButton').textContent = diving ? '⬆️ ' + t('Upp') : '🤿 ' + t('Dyk');
}
window.addEventListener('keydown', (event) => {
  if (mode !== 'swim') return;
  if (event.code === 'Space') toggleDive();
  else if (['ArrowDown', 'KeyS'].includes(event.code)) toggleDive(true);
  else if (['ArrowUp', 'KeyW'].includes(event.code)) toggleDive(false);
  else return;
  event.preventDefault();
});
let surface = 0.5; // hur högt vattnet står (ändras efter hur stor hunden är)
let heading = 0; // åt vilket håll hunden simmar
let cameraHeading = 0;
let steer = 0; // -1 = sväng vänster, 1 = sväng höger
let swimTime = 0;
function startSwim() {
  stopSleep();
  stopTrying();
  showWardrobe();
  mode = 'swim';
  surface = (0.5 + upperBase) * breed.size; // vattnet når halvvägs upp på hunden
  seaGroup.position.y = surface;
  ground.visible = false;
  dog.position.set(0, 0, 0);
  heading = cameraHeading = 0;
  steer = 0;
  speedY = 0;
  swimTime = 0;
  diving = false;
  depth = 0;
  SOUND.Vatten();
  showMode();
  say('Plask!');
}
function endSwim() {
  scene.fog = null;
  stats.swims = (stats.swims || 0) + 1;
  mode = 'dress';
  goHome();
  speedY = TAP_SPEED;
  burst('💦');
  SOUND.happy();
  showMode();
  checkMedals();
  say('Vad skönt det var!');
}
function updateSwim(dt, time) {
  swimTime += dt;
  heading -= steer * 1.9 * dt;
  // Vid havets kant vänder hunden mjukt tillbaka mot mitten
  const far = Math.hypot(dog.position.x, dog.position.z);
  if (far > SEA_EDGE) {
    const home = Math.atan2(dog.position.z, -dog.position.x);
    heading += Math.sin(home - heading) * 2.5 * dt;
  }
  dog.position.x += Math.cos(heading) * 2.7 * dt;
  dog.position.z -= Math.sin(heading) * 2.7 * dt;
  // Man kan inte simma rakt igenom öar och flytande saker, man glider runt dem
  for (const [x, z, size] of seaThings) {
    const dx = dog.position.x - x;
    const dz = dog.position.z - z;
    const d = Math.hypot(dx, dz) || 0.01;
    const reach = size + 0.4 * breed.size;
    if (d < reach) {
      dog.position.x = x + (dx / d) * reach;
      dog.position.z = z + (dz / d) * reach;
    }
  }
  // Dyka: hunden glider mjukt ner mot botten, eller upp till ytan igen
  const goal = diving ? DIVE_DEPTH : 0;
  depth += (goal - depth) * Math.min(1, dt * 2.2);
  dog.position.y = depth;
  dog.rotation.set(0, heading, Math.sin(time * 3) * 0.05 + (goal - depth) * 0.25); // nosen pekar dit hunden är på väg
  seaweed.forEach((weed, i) => (weed.rotation.z = Math.sin(time * 1.3 + i) * 0.18)); // sjögräset vajar
  deepFish.forEach((fish, i) => {
    const a = time * (0.25 + (i % 3) * 0.08) * (i % 2 ? 1 : -1) + i * 2; // fiskarna simmar runt i stora cirklar
    const far = 4 + i * 1.7;
    fish.position.set(Math.cos(a) * far, SEA_FLOOR + 0.8 + (i % 4) * 0.6 + Math.sin(time + i) * 0.15, -Math.sin(a) * far);
    fish.rotation.y = a + (i % 2 ? Math.PI / 2 : -Math.PI / 2);
  });
  airBubbles.forEach((bubble, i) => {
    const k = (time * 0.7 + i / 5) % 1; // luftbubblor stiger från nosen när hunden är under ytan
    bubble.visible = depth < -0.6;
    bubble.position.set(dog.position.x + Math.cos(heading) * 0.5 + Math.sin(i * 2.1) * 0.12, depth + 0.9 * breed.size + k * 1.6, dog.position.z - Math.sin(heading) * 0.5 + Math.cos(i * 1.7) * 0.12);
  });
  floaters.forEach((g, i) => {
    g.rotation.z = Math.sin(time * 1.6 + i) * 0.1; // allt som flyter guppar
    g.position.y = Math.sin(time * 2 + i * 2) * 0.04;
  });
  fishes.forEach((f, i) => {
    const age = time - f.start;
    if (age > 1.1) {
      // Dags för ett nytt hopp, någonstans framför hunden
      f.start = time + 0.6 + i * 0.9 + Math.random() * 2;
      const side = heading + (Math.random() - 0.5) * 1.6;
      const away = 3 + Math.random() * 3;
      f.x = dog.position.x + Math.cos(side) * away;
      f.z = dog.position.z - Math.sin(side) * away;
      f.turn = Math.random() * 6.3;
    }
    const k = Math.max(0, Math.min(1, age / 1.1));
    f.fish.visible = age > 0;
    f.fish.position.set(f.x + Math.cos(f.turn) * (k - 0.5) * 1.4, Math.sin(k * Math.PI) * 0.9 - 0.15, f.z - Math.sin(f.turn) * (k - 0.5) * 1.4);
    f.fish.rotation.set(0, f.turn, Math.cos(k * Math.PI) * 1.1);
  });
  // Kameran simmar med bakom hunden och svänger mjukt efter
  cameraHeading += (heading - cameraHeading) * Math.min(1, dt * 2.5);
  const narrow = camera.aspect < 1;
  const back = narrow ? 5.4 : 4.4;
  camera.position.set(dog.position.x - Math.cos(cameraHeading) * back, (narrow ? 4.4 : 3.3) + depth * 1.25, dog.position.z + Math.sin(cameraHeading) * back);
  camera.lookAt(dog.position.x + Math.cos(cameraHeading) * 3.5, 0.5 + depth, dog.position.z - Math.sin(cameraHeading) * 3.5);
  const under = camera.position.y < surface; // är kameran under ytan blir allt blått
  scene.fog = under ? seaFog : null;
  scene.background.setHex(under ? 0x1c78b8 : HOME_SKY);
}
// Pilknapparna svänger så länge man håller in dem. Piltangenterna och A/D fungerar också.
for (const [id, way] of [['left', -1], ['right', 1]]) {
  const b = document.getElementById(id);
  b.addEventListener('pointerdown', () => { if (mode === 'swim') steer = way; });
  for (const type of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(type, () => { if (steer === way) steer = 0; });
}
const steerKey = (code) => (['ArrowLeft', 'KeyA'].includes(code) ? -1 : ['ArrowRight', 'KeyD'].includes(code) ? 1 : 0);
window.addEventListener('keydown', (event) => { if (mode === 'swim' && steerKey(event.code)) steer = steerKey(event.code); });
window.addEventListener('keyup', (event) => { if (steerKey(event.code) === steer) steer = 0; });

// ---------- Agility ----------
// En bana med hopphinder, tunnlar och slalompinnar. Här tappar man inga hjärtan.
const AGILITY_THEME = { sky: 0x9fdcff, ground: 0x7fd96a, track: 0xf0dca8, bush: 0x2fa35a, obstacle: 0x8a5a3a };
const AGILITY_OBSTACLES = [
  { half: 0.12, top: 0.55, build: (g) => { // hopphinder: hoppa över ribban
    for (const z of [-0.62, 0.62]) part(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8), mat(0x2a9dff), 0, 0.45, z, g);
    const bar = part(new THREE.CylinderGeometry(0.045, 0.045, 1.24, 8), WHITE, 0, 0.45, 0, g);
    bar.rotation.x = Math.PI / 2;
    for (const z of [-0.3, 0.3]) part(new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8), RED, 0, 0.45, z, g).rotation.x = Math.PI / 2;
  } },
  { half: 0.7, bottom: 1.35, build: (g) => { // tunnel: spring rakt igenom, hoppa inte
    [0xffd93d, 0x2a9dff, 0xff8fc7, 0x2ecc71].forEach((color, i) => {
      const hoop = part(new THREE.TorusGeometry(0.72, 0.1, 8, 20, Math.PI), mat(color), -0.6 + i * 0.4, 0, 0, g);
      hoop.rotation.y = Math.PI / 2;
      hoop.scale.set(0.95, 1.9, 1);
    });
  } },
  { half: 0.15, top: 9, tall: true, build: (g) => { // slalompinne: byt fil
    part(new THREE.CylinderGeometry(0.07, 0.07, 1.5, 10), WHITE, 0, 0.75, 0, g);
    for (const y of [0.45, 0.95]) part(new THREE.CylinderGeometry(0.075, 0.075, 0.22, 10), RED, 0, y, 0, g);
    fluff(0.1, mat(0xffd93d), 0, 1.55, 0, g);
  } },
  { half: 0.14, top: 0.7, build: (g) => { // däck att hoppa över
    const tire = part(new THREE.TorusGeometry(0.33, 0.13, 10, 20), mat(0x3a3a48), 0, 0.33, 0, g);
    tire.rotation.y = Math.PI / 2;
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
  if (agility) return 5.6;
  return Math.min(startSpeed + x * 0.02, startSpeed * 1.6, 12.5);
}

function addObstacle(kind, x, z) {
  const g = group(obstacleGroup, x, 0, z);
  const animate = kind.build(g);
  // Det man springer under (tunneln, fågeln) växer så att även de största hundarna får plats
  const standing = (1.3 + upperBase) * breed.size; // så hög är hunden när den står
  const grow = kind.bottom ? Math.max(1, (standing + 0.3) / kind.bottom) : 1;
  g.scale.setScalar(grow);
  obstacles.push({ ...kind, half: kind.half * grow, bottom: kind.bottom && kind.bottom * grow, x, z, group: g, animate, hit: false });
}

function startRun() {
  walking = agility = false;
  beginRun();
}
function startAgility() {
  removeFriend(); // lämna hundparken
  friendBubbleTime = 0;
  walking = false;
  agility = true;
  beginRun();
  SOUND.happy();
}
function startWalk() {
  agility = false;
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
  const theme = agility ? AGILITY_THEME : walking ? WALK_THEME : THEMES[(level - 1) % THEMES.length];
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
  const count = walking ? 0 : agility ? 20 : Math.min(8 + level * 4, 60); // antal hinder (inga alls på promenaden)
  const shortest = agility ? 1.3 : Math.max(0.9, 1.35 - level * 0.05); // kortaste tiden mellan två hinder, i sekunder
  const extra = agility ? 0.8 : Math.max(0.3, 0.9 - level * 0.06); // hur mycket längre det kan vara ibland
  const kinds = agility ? AGILITY_OBSTACLES : OBSTACLES.filter((kind) => level >= kind.fromLevel);
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
        if (!agility) hearts -= 1; // på agilitybanan tappar man inga hjärtan
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
  if (dog.position.x >= goalX) walking ? endWalk() : agility ? endAgility() : endRun(true);
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
function endAgility() {
  bones += runBones;
  try { localStorage.setItem('bones', bones); } catch {}
  stats.totalBones += runBones;
  stats.agility = (stats.agility || 0) + 1;
  agility = false;
  mode = 'dress';
  goHome();
  speedY = TAP_SPEED;
  burst('🏅');
  SOUND.win();
  showMode();
  checkMedals();
  say('Vilken bana!');
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
  if (won) say('Jag är hungrig!');
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
    say({ Mat: 'Mums!', Vatten: 'Ahh, gott!', Klappa: 'Mer klappar!', Leka: 'Vad kul!' }[careAction.name]);
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
  el('levelName').textContent = agility ? '🏅 Agility' : walking ? '🦮 ' + t('Promenad') : t('Bana {n}').replace('{n}', level);
  if (walking || agility) el('hearts').textContent = '';
  el('runBones').textContent = '🦴 ' + runBones;
}
function showMode() {
  el('top').hidden = mode !== 'dress';
  el('wardrobe').hidden = mode !== 'dress';
  el('hud').hidden = mode !== 'run' && mode !== 'lost';
  el('controls').hidden = mode !== 'run' && mode !== 'swim';
  el('swim').hidden = mode !== 'swim';
  el('lost').hidden = mode !== 'lost';
  el('care').hidden = mode !== 'care';
  el('park').hidden = mode !== 'park';
  el('dpad').hidden = mode !== 'park';
  showPark();
  showHud();
  el('hint').textContent = t('Tryck för att hoppa, svep för att byta fil');
  el('swimHint').textContent = t('Håll in pilarna för att svänga');
  el('swimTitle').textContent = '🏊 ' + t('Simma');
  el('swimHome').textContent = '🏠 ' + t('Gå hem');
  showDive();
  el('swimButton').textContent = '🏊 ' + t('Simma');
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
// ---------- Hundparken ----------
// I parken träffar man andra hundar. De styrs av spelet, inte av andra spelare.
const FRIEND_NAMES = ['Bella', 'Molly', 'Charlie', 'Ludde', 'Sigge', 'Doris', 'Morris', 'Wilma', 'Zorro', 'Nala', 'Tusse', 'Ronja', 'Milo', 'Bosse', 'Lova', 'Stina'];
const MY_SPOT = -0.95; // här står min hund
const parkGroup = group(scene);
parkGroup.visible = false;
const LEAVES = mat(0x2fa35a);
const WOOD = mat(0xb5793f);
// Parken är stor: man kan gå långt åt alla håll, fram till staketet
const PARK_X = 15; // så långt åt vänster och höger
const PARK_BACK = -11;
const PARK_FRONT = 5;
const parkSolids = []; // sådant man inte kan gå igenom: [x, z, hur stort]
for (const [x, z, size] of [[-4.2, -3.6, 1.2], [3.6, -4.2, 1.4], [0.2, -5.5, 1.1], [-7.5, -8.5, 1.3], [7.5, -4.6, 1.2], [-11.5, -2.5, 1.3], [2.2, -9.2, 1.2],
  [-13, -8.5, 1.4], [14.3, -10.3, 1.3], [5, -9.3, 1.3], [-3.5, -9.6, 1.2], [0.8, -10.2, 1.1], [-13.6, -5.4, 1.1], [10, -9.8, 1.0]]) {
  part(new THREE.CylinderGeometry(0.16 * size, 0.22 * size, 1.4 * size, 8), TRUNK, x, 0.7 * size, z, parkGroup);
  fluff(0.95 * size, LEAVES, x, 1.9 * size, z, parkGroup);
  fluff(0.65 * size, LEAVES, x + 0.6 * size, 1.5 * size, z + 0.2, parkGroup);
  parkSolids.push([x, z, 0.4 * size]);
}
for (const [x, z] of [[-2.2, -2.6], [2.4, -2.9], [5.2, -2.4], [-5.6, -2.7], [-9.5, 3.2], [9, 3.6], [13.5, 1], [-13.8, 0.5], [3, -7], [-10.5, -9.8], [8.2, -8]]) {
  fluff(0.45, LEAVES, x, 0.3, z, parkGroup);
  parkSolids.push([x, z, 0.5]);
}
for (const [x, z] of [[-2.9, -2.1], [6.2, -6.6], [-10.8, -6.4], [10.1, -3.2]]) { // parkbänkar
  const bench = group(parkGroup, x, 0, z);
  part(new THREE.BoxGeometry(1.5, 0.08, 0.45), WOOD, 0, 0.45, 0, bench);
  part(new THREE.BoxGeometry(1.5, 0.4, 0.07), WOOD, 0, 0.8, -0.2, bench);
  for (const side of [-0.6, 0.6]) part(new THREE.BoxGeometry(0.08, 0.45, 0.4), TRUNK, side, 0.22, 0, bench);
  parkSolids.push([x - 0.4, z, 0.5], [x + 0.4, z, 0.5]);
}
// Gångar av sand
const PATH = mat(0xead2a4);
for (const [x, z, width, depth] of [[0, -0.9, 2 * PARK_X, 1.3], [-6.5, -3, 1.3, PARK_FRONT - PARK_BACK], [8.5, -6, 1.3, 9]]) {
  const path = part(new THREE.PlaneGeometry(width, depth), PATH, x, 0.012, z, parkGroup);
  path.rotation.x = -Math.PI / 2;
  path.castShadow = false;
  path.receiveShadow = true;
}
// Blommor här och där
const STEM = mat(0x2fa35a);
[[-4, 2.6], [4.5, 2.2], [-11, 1.6], [11.5, 3.4], [2, -3.4], [-9, -4], [6, -2.2], [-1.5, -7.5], [12.5, -6.8], [-12.5, 4]].forEach(([x, z], n) => {
  for (let i = 0; i < 4; i++) {
    const fx = x + Math.cos(i * 1.7 + n) * 0.45;
    const fz = z + Math.sin(i * 2.3 + n) * 0.35;
    part(new THREE.CylinderGeometry(0.015, 0.015, 0.26, 5), STEM, fx, 0.13, fz, parkGroup).castShadow = false;
    fluff(0.07, mat([0xe63946, 0xff8fc7, 0xff9f1c, 0xffd93d][(i + n) % 4]), fx, 0.29, fz, parkGroup).castShadow = false;
  }
});
// En fontän
const fountain = group(parkGroup, -9, 0, -5.6);
part(new THREE.CylinderGeometry(1.15, 1.25, 0.35, 24), ROCK, 0, 0.17, 0, fountain);
part(new THREE.CylinderGeometry(1.0, 1.0, 0.04, 24), WATER, 0, 0.36, 0, fountain);
part(new THREE.CylinderGeometry(0.14, 0.2, 1.0, 12), ROCK, 0, 0.7, 0, fountain);
part(new THREE.CylinderGeometry(0.45, 0.2, 0.14, 16), ROCK, 0, 1.22, 0, fountain);
const drops = [0, 1, 2, 3, 4, 5].map(() => fluff(0.06, WATER, 0, 0, 0, fountain));
parkSolids.push([-9, -5.6, 1.35]);
// En filt med picknickkorg
const picnic = group(parkGroup, 10.6, 0, 0.9);
part(new THREE.BoxGeometry(1.7, 0.03, 1.2), mat(0xe63946), 0, 0.02, 0, picnic).castShadow = false;
for (const x of [-0.56, 0, 0.56]) part(new THREE.BoxGeometry(0.2, 0.034, 1.2), WHITE, x, 0.02, 0, picnic).castShadow = false;
part(new THREE.BoxGeometry(0.45, 0.28, 0.32), WOOD, 0.35, 0.17, -0.2, picnic);
part(new THREE.TorusGeometry(0.17, 0.025, 6, 14, Math.PI), WOOD, 0.35, 0.3, -0.2, picnic);
fluff(0.09, mat(0xe63946), -0.35, 0.1, 0.2, picnic); // ett äpple
parkSolids.push([10.95, 0.7, 0.4]);
// Lyktor längs gången
for (const x of [-12, -3.3, 4.8, 9.4]) {
  part(new THREE.CylinderGeometry(0.05, 0.07, 1.9, 8), mat(0x3a3a48), x, 0.95, -1.9, parkGroup);
  fluff(0.17, new THREE.MeshBasicMaterial({ color: 0xfff1a8 }), x, 2.0, -1.9, parkGroup);
  parkSolids.push([x, -1.9, 0.2]);
}
// Vitt staket runt hela parken
for (const z of [PARK_BACK - 0.9, PARK_FRONT + 0.9]) {
  for (const y of [0.25, 0.58]) part(new THREE.BoxGeometry(2 * PARK_X + 2, 0.08, 0.05), WHITE, 0, y, z, parkGroup);
  for (let x = -PARK_X - 1; x <= PARK_X + 1; x += 1) part(new THREE.BoxGeometry(0.16, 0.8, 0.06), WHITE, x, 0.4, z, parkGroup);
}
for (const x of [-PARK_X - 1, PARK_X + 1]) {
  for (const y of [0.25, 0.58]) part(new THREE.BoxGeometry(0.05, 0.08, PARK_FRONT - PARK_BACK + 1.8), WHITE, x, y, (PARK_FRONT + PARK_BACK) / 2, parkGroup);
  for (let z = PARK_BACK - 0.9; z <= PARK_FRONT + 0.9; z += 1) part(new THREE.BoxGeometry(0.06, 0.8, 0.16), WHITE, x, 0.4, z, parkGroup);
}
// Lekplatsen: en rutschkana och en gunga som hunden kan åka på
const SLIDE = { x: 11, z: -5.9 };
const SWING = { x: 13.2, z: -3.9 };
const BLUE = mat(0x2a9dff);
const YELLOW = mat(0xffd93d);
const slide = group(parkGroup, SLIDE.x, 0, SLIDE.z);
part(new THREE.BoxGeometry(0.75, 0.08, 0.8), YELLOW, -0.6, 1.3, 0, slide); // plattformen högst upp
for (const x of [-0.93, -0.27]) for (const z of [-0.36, 0.36]) part(new THREE.CylinderGeometry(0.05, 0.05, 1.75, 8), RED, x, 0.87, z, slide);
for (let i = 0; i < 4; i++) part(new THREE.BoxGeometry(0.07, 0.05, 0.72), BLUE, -1.08 - (3 - i) * 0.12, 0.28 * (i + 1), 0, slide); // stegen
const chute = part(new THREE.BoxGeometry(2.3, 0.06, 0.66), BLUE, 0.7, 0.7, 0, slide);
chute.rotation.z = -0.563;
for (const z of [-0.36, 0.36]) part(new THREE.BoxGeometry(2.3, 0.2, 0.06), RED, 0.7, 0.78, z, slide).rotation.z = -0.563;
parkSolids.push([SLIDE.x - 0.7, SLIDE.z, 0.6], [SLIDE.x + 0.3, SLIDE.z, 0.5], [SLIDE.x + 1.2, SLIDE.z, 0.45]);
const swing = group(parkGroup, SWING.x, 0, SWING.z);
for (const x of [-1, 1]) part(new THREE.CylinderGeometry(0.06, 0.07, 2.05, 8), RED, x, 1.02, 0, swing);
part(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 8), RED, 0, 2.05, 0, swing).rotation.z = Math.PI / 2;
const swingSeat = group(swing, 0, 2.05, 0); // den här gruppen gungar fram och tillbaka
for (const x of [-0.3, 0.3]) part(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 6), WHITE, x, -0.75, 0, swingSeat);
part(new THREE.BoxGeometry(0.75, 0.06, 0.34), YELLOW, 0, -1.5, 0, swingSeat);
parkSolids.push([SWING.x - 1, SWING.z, 0.2], [SWING.x + 1, SWING.z, 0.2]);
// En skylt vid gången som visar vägen till lekplatsen
const sign = group(parkGroup, 7.4, 0, -2.1);
part(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), TRUNK, 0, 0.55, 0, sign);
part(new THREE.BoxGeometry(0.8, 0.36, 0.05), YELLOW, 0.1, 1.05, 0, sign);
part(new THREE.ConeGeometry(0.22, 0.28, 3), YELLOW, 0.62, 1.05, 0, sign).rotation.z = -Math.PI / 2;
parkSolids.push([7.4, -2.1, 0.2]);

// Studsmatta
const TRAMP = { x: 11.6, z: -8.3 };
const tramp = group(parkGroup, TRAMP.x, 0, TRAMP.z);
part(new THREE.TorusGeometry(0.85, 0.09, 8, 24), BLUE, 0, 0.32, 0, tramp).rotation.x = Math.PI / 2;
part(new THREE.CylinderGeometry(0.82, 0.82, 0.03, 24), mat(0x3a3a48), 0, 0.3, 0, tramp);
for (let k = 0; k < 6; k++) part(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 6), WHITE, Math.cos(k * 1.047) * 0.85, 0.15, Math.sin(k * 1.047) * 0.85, tramp);
// Karusell: hela den här gruppen snurrar
const CAROUSEL = { x: 14, z: -7.6 };
const carousel = group(parkGroup, CAROUSEL.x, 0, CAROUSEL.z);
part(new THREE.CylinderGeometry(0.9, 0.9, 0.12, 24), YELLOW, 0, 0.12, 0, carousel);
part(new THREE.CylinderGeometry(0.07, 0.07, 1.1, 8), RED, 0, 0.7, 0, carousel);
part(new THREE.ConeGeometry(0.3, 0.25, 12), RED, 0, 1.36, 0, carousel);
[0xe63946, 0x2a9dff, 0x2ecc71, 0xff8fc7].forEach((color, k) => {
  part(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 6), mat(color), Math.cos(k * 1.571) * 0.78, 0.5, Math.sin(k * 1.571) * 0.78, carousel);
});

// Varje sak på lekplatsen: var man kliver på, hur länge man åker och var man hamnar efteråt
const RIDES = {
  slide: { x: SLIDE.x - 1.85, z: SLIDE.z, reach: 0.8, time: 2, out: [SLIDE.x + 2.3, SLIDE.z], says: 'Nu åker jag!' },
  swing: { x: SWING.x, z: SWING.z + 0.35, reach: 0.75, time: 6, out: [SWING.x, SWING.z + 1.3], says: 'Högre!' },
  tramp: { x: TRAMP.x, z: TRAMP.z, reach: 0.6, time: 5, out: [TRAMP.x, TRAMP.z + 1.5], says: 'Hopp hopp!' },
  carousel: { x: CAROUSEL.x, z: CAROUSEL.z, reach: 0.65, time: 6, out: [CAROUSEL.x - 1.6, CAROUSEL.z + 0.5], says: 'Snurr snurr!' },
};
// Ställer en hund på rätt plats när den har åkt i t sekunder. Fungerar för både min hund och kompisen.
function rideMove(d, kind, t) {
  if (kind === 'slide') {
    const up = Math.min(1, t / 0.8); // först klättrar hunden upp för stegen
    const down = Math.max(0, Math.min(1, (t - 1.1) / 0.9)); // sedan åker den ner
    if (down === 0) {
      d.position.set(SLIDE.x - 1.7 + up * 1.1, up * 1.36, SLIDE.z);
      d.rotation.set(0, 0, up < 1 ? 0.6 : 0);
    } else {
      d.position.set(SLIDE.x - 0.3 + down * 2.1, 1.38 - down * 1.25, SLIDE.z);
      d.rotation.set(0, 0, -0.5);
    }
  } else if (kind === 'swing') {
    const strength = Math.min(1, t) * Math.min(1, RIDES.swing.time - t); // börjar mjukt och slutar mjukt
    const a = Math.sin(t * 2.8) * 0.75 * strength;
    swingSeat.rotation.x = -a;
    d.position.set(SWING.x, 2.05 - Math.cos(a) * 1.47, SWING.z + Math.sin(a) * 1.47);
    d.rotation.set(-a, -Math.PI / 2, 0); // nosen mot kameran
  } else if (kind === 'tramp') {
    const height = 0.5 + Math.min(t, 4) * 0.4; // högre och högre för varje hopp
    d.position.set(TRAMP.x, 0.32 + Math.abs(Math.sin((t / 0.8) * Math.PI)) * height, TRAMP.z);
    d.rotation.set(0, -0.3 + (t > 4 ? (t - 4) * Math.PI * 2 : 0), 0); // en snurr i sista hoppet
  } else {
    const a = (1 - Math.cos((Math.PI * t) / RIDES.carousel.time)) * 6; // snurrar igång mjukt och stannar mjukt
    carousel.rotation.y = a;
    d.position.set(CAROUSEL.x + Math.cos(a) * 0.55, 0.19, CAROUSEL.z - Math.sin(a) * 0.55);
    d.rotation.set(0, a + Math.PI / 2, 0);
  }
}
let ride = null; // { kind, time } medan min hund åker
let friendRide = null; // samma sak för kompisen, som åker efter min hund
let rideReady = true; // man måste gå en bit bort innan man kan åka igen
function updateRide(dt) {
  if (mode !== 'park') { ride = friendRide = null; return; }
  if (friendRide && friend) {
    // Kompisens tur
    friendRide.time += dt;
    rideMove(friend.dog, friendRide.kind, friendRide.time);
    if (friendRide.time > RIDES[friendRide.kind].time) {
      const [x, z] = RIDES[friendRide.kind].out;
      friend.dog.position.set(x + 0.9, 0, z);
      friend.dog.rotation.set(0, Math.PI + 0.45, 0);
      friend.hop = 1;
      friendSays(t('Wiii!'));
      friendRide = null;
    }
  }
  const near = (spot) => Math.hypot(dog.position.x - spot.x, dog.position.z - spot.z);
  if (!ride) {
    if (!friendRide) swingSeat.rotation.x *= 1 - Math.min(1, dt * 3); // gungan stannar av sig själv
    if (Object.values(RIDES).every((spot) => near(spot) > 1.5)) rideReady = true;
    if (!rideReady || play || friendRide) return;
    const kind = Object.keys(RIDES).find((name) => near(RIDES[name]) < RIDES[name].reach);
    if (!kind) return;
    ride = { kind, time: 0 };
    rideReady = false;
    strollTo = null;
    SOUND.jump();
    say(RIDES[kind].says);
  }
  ride.time += dt;
  speedY = 0;
  rideMove(dog, ride.kind, ride.time);
  if (ride.kind === 'slide' && ride.time > 1.1 && !ride.whee) {
    ride.whee = true;
    tone(950, 320, 0.85, 'sine', 0.1);
    say('Wiii!');
  }
  if (ride.kind === 'tramp' && Math.floor(ride.time / 0.8) !== ride.hops) {
    ride.hops = Math.floor(ride.time / 0.8);
    SOUND.Leka(); // ett studsljud för varje hopp
  }
  if (ride.time > RIDES[ride.kind].time) {
    const [x, z] = RIDES[ride.kind].out;
    dog.position.set(x, 0, z);
    dog.rotation.set(0, -0.3, 0);
    speedY = TAP_SPEED * 0.7;
    SOUND.happy();
    burst('⭐');
    stats.rides = (stats.rides || 0) + 1;
    if (friend && friend.arrived) {
      friendRide = { kind: ride.kind, time: 0 }; // nu vill kompisen också åka
      friendSays(t('Min tur!'));
    }
    ride = null;
    checkMedals();
  }
}

// Glasskiosken
const KIOSK = { x: 0.6, z: -3.1 };
const kiosk = group(parkGroup, KIOSK.x, 0, KIOSK.z);
part(new THREE.BoxGeometry(1.5, 1.0, 1.0), mat(0xff8fc7), 0, 0.5, 0, kiosk);
part(new THREE.BoxGeometry(1.62, 0.08, 1.12), WHITE, 0, 1.03, 0, kiosk); // disken
for (const x of [-0.7, 0.7]) for (const z of [-0.45, 0.45]) part(new THREE.CylinderGeometry(0.03, 0.03, 0.85, 6), WHITE, x, 1.48, z, kiosk);
part(new THREE.BoxGeometry(1.9, 0.1, 1.4), WHITE, 0, 1.94, 0.05, kiosk); // randigt tak
for (const x of [-0.72, -0.24, 0.24, 0.72]) part(new THREE.BoxGeometry(0.24, 0.11, 1.41), RED, x, 1.94, 0.05, kiosk);
part(new THREE.ConeGeometry(0.2, 0.5, 12), mat(0xe0a458), 0, 2.25, 0, kiosk).rotation.x = Math.PI; // en stor glass på taket
fluff(0.24, mat(0xfff1c9), 0, 2.62, 0, kiosk);
fluff(0.2, mat(0xff8fc7), 0, 2.9, 0, kiosk);
fluff(0.07, RED, 0, 3.12, 0, kiosk);
parkSolids.push([KIOSK.x - 0.4, KIOSK.z, 0.7], [KIOSK.x + 0.4, KIOSK.z, 0.7]);
// Glassen som hunden får sitter framför nosen en stund
const iceCream = group(head, 0.47, -0.12, 0);
part(new THREE.ConeGeometry(0.06, 0.2, 10), mat(0xe0a458), 0, -0.08, 0, iceCream).rotation.x = Math.PI;
fluff(0.08, mat(0xff8fc7), 0, 0.06, 0, iceCream);
fluff(0.06, mat(0xfff1c9), 0, 0.16, 0, iceCream);
iceCream.visible = false;
const ICE_PRICE = 3;
let iceTime = 0; // så länge har hunden glassen kvar
let nearKiosk = false;
function buyIce() {
  if (!nearKiosk || bones < ICE_PRICE || ride) return;
  bones -= ICE_PRICE;
  try { localStorage.setItem('bones', bones); } catch {}
  stats.ices = (stats.ices || 0) + 1;
  iceTime = 6;
  SOUND.Mat();
  burst('🍦');
  say('Mums, glass!');
  if (friend && friend.arrived) friendSays(t('Jag vill också ha!'));
  checkMedals();
  showPark();
}
function updateKiosk(dt) {
  iceTime -= dt;
  iceCream.visible = iceTime > 0 && mode === 'park';
  const near = mode === 'park' && Math.hypot(dog.position.x - KIOSK.x, dog.position.z - (KIOSK.z + 1.2)) < 1.4;
  if (near !== nearKiosk) {
    nearKiosk = near;
    showPark(); // knappen för att köpa glass syns bara vid kiosken
  }
}

// Håller en hund utanför träd, bänkar och annat som står i vägen
function keepOut(position, size) {
  for (const [x, z, radius] of parkSolids) {
    const dx = position.x - x;
    const dz = position.z - z;
    const d = Math.hypot(dx, dz) || 0.01;
    if (d < radius + size) {
      position.x = x + (dx / d) * (radius + size);
      position.z = z + (dz / d) * (radius + size);
    }
  }
  // Dammen är avlång, så den räknas för sig
  const px = (position.x - 0.1) / (1.25 + size);
  const pz = (position.z - 1.75) / (0.55 + size);
  const inside = Math.hypot(px, pz) || 0.01;
  if (inside < 1) {
    position.x = 0.1 + (px / inside) * (1.25 + size);
    position.z = 1.75 + (pz / inside) * (0.55 + size);
  }
  position.x = Math.max(-PARK_X, Math.min(PARK_X, position.x));
  position.z = Math.max(PARK_BACK, Math.min(PARK_FRONT, position.z));
}

// Djuren i parken: ankor i en damm, en ekorre i trädet och en liten fågel
const pond = part(new THREE.CylinderGeometry(1, 1, 0.03, 28), WATER, 0.1, 0.02, 1.75, parkGroup);
pond.scale.set(1.25, 1, 0.55);
pond.castShadow = false;
function makeDuck(color) {
  const duck = group(parkGroup);
  const m = mat(color);
  fluff(0.16, m, 0, 0.12, 0, duck).scale.set(0.2, 0.13, 0.14);
  fluff(0.09, m, 0.14, 0.26, 0, duck);
  part(new THREE.ConeGeometry(0.04, 0.1, 8), mat(0xff9f1c), 0.25, 0.25, 0, duck).rotation.z = -Math.PI / 2;
  fluff(0.018, BLACK, 0.19, 0.3, 0.06, duck);
  fluff(0.018, BLACK, 0.19, 0.3, -0.06, duck);
  return duck;
}
const ducks = [makeDuck(0xffffff), makeDuck(0xffd93d), makeDuck(0xffd93d)];
ducks[1].scale.setScalar(0.6); // två små ankungar följer efter
ducks[2].scale.setScalar(0.6);
const squirrel = group(parkGroup);
const SQUIRREL = mat(0xf07f2e);
fluff(0.11, SQUIRREL, 0, 0, 0, squirrel).scale.set(0.09, 0.15, 0.09);
fluff(0.075, SQUIRREL, 0, 0.17, 0.03, squirrel);
fluff(0.1, SQUIRREL, 0, -0.12, 0.13, squirrel).scale.set(0.07, 0.16, 0.08); // yvig svans
for (const x of [-0.04, 0.04]) {
  part(new THREE.ConeGeometry(0.02, 0.06, 6), SQUIRREL, x, 0.26, 0.03, squirrel);
  fluff(0.014, BLACK, x * 0.8, 0.19, 0.095, squirrel);
}
squirrel.scale.setScalar(2.4);
const parkBird = group(parkGroup);
fluff(0.1, RED, 0, 0.12, 0, parkBird).scale.set(0.12, 0.1, 0.09);
fluff(0.06, RED, 0.09, 0.22, 0, parkBird);
part(new THREE.ConeGeometry(0.025, 0.07, 6), mat(0xffd93d), 0.16, 0.21, 0, parkBird).rotation.z = -Math.PI / 2;
fluff(0.012, BLACK, 0.12, 0.25, 0.04, parkBird);
function updateParkAnimals(time) {
  ducks.forEach((duck, i) => {
    const a = time * 0.5 - i * 0.55; // ankorna simmar runt i dammen på rad
    duck.position.set(0.1 + Math.cos(a) * 0.85, 0.02 + Math.sin(time * 3 + i) * 0.01, 1.75 + Math.sin(a) * 0.3);
    duck.rotation.y = a + Math.PI / 2 + Math.PI;
  });
  // Ekorren kilar upp och ner på stammen på det bortre trädet
  squirrel.position.set(0.2, 0.75 + (Math.sin(time * 0.9) * 0.5 + 0.5) * 0.75, -5.5 + 0.26);
  squirrel.rotation.z = Math.cos(time * 0.9) < 0 ? Math.PI : 0; // huvudet först åt det håll den springer
  // Fågeln hoppar omkring i gräset vid bänken
  parkBird.position.set(-2.0 + Math.sin(time * 0.4) * 0.5, Math.abs(Math.sin(time * 5)) * 0.07, -1.2);
  parkBird.rotation.y = Math.cos(time * 0.4) > 0 ? 0 : Math.PI;
  drops.forEach((drop, i) => {
    const k = (time * 0.9 + i / 6) % 1; // vattnet i fontänen sprutar upp och faller ner
    drop.position.set(Math.cos(i * 1.05) * k * 0.7, 1.35 + Math.sin(k * Math.PI) * 0.5 - k * 0.9, Math.sin(i * 1.05) * k * 0.7);
  });
}

let friend = null; // den andra hunden: { dog, tail, name, breed, greeted, time }
const friendBubble = el('friendBubble');
let friendBubbleTime = 0;
function friendSays(text) {
  friendBubble.textContent = text;
  friendBubbleTime = 2.8;
}
function removeFriend() {
  play = null;
  friendRide = null;
  playBall.visible = false;
  if (!friend) return;
  scene.remove(friend.dog);
  for (const m of friend.materials) m.dispose();
  friend = null;
}
function newFriend() {
  removeFriend();
  // Klä om min hund till en annan hund en kort stund, ta en kopia, och byt sedan tillbaka
  const mine = { breed: breedIndex, outfit: wardrobe.map((kind) => [kind.choice, kind.color]) };
  const others = BREEDS.map((b, i) => i).filter((i) => i !== myBreed && i !== lastFriendBreed);
  breedIndex = lastFriendBreed = others[Math.floor(Math.random() * others.length)];
  showBreed(true);
  for (const kind of wardrobe) {
    const choice = Math.random() < 0.5 ? -1 : Math.floor(Math.random() * kind.options.length);
    wear(kind, choice, COLORS[Math.floor(Math.random() * COLORS.length)]);
  }
  const copy = dog.clone();
  const copies = new Map(); // kopian får egna färger, annars byter den färg när min hund gör det
  copy.traverse((o) => {
    if (!o.material) return;
    if (!copies.has(o.material)) copies.set(o.material, o.material.clone());
    o.material = copies.get(o.material);
  });
  const friendBreed = breed;
  breedIndex = mine.breed;
  showBreed();
  wardrobe.forEach((kind, i) => wear(kind, ...mine.outfit[i]));

  let name = FRIEND_NAMES[Math.floor(Math.random() * FRIEND_NAMES.length)];
  if (name === dogName()) name = 'Kompis';
  const from = dog.position.x > 8 ? -1 : 1; // kommer från höger, eller från vänster om min hund står långt till höger
  const spot = { x: dog.position.x + from * 2, z: Math.min(PARK_FRONT, dog.position.z + 0.2) };
  copy.position.set(spot.x + from * 6, 0, spot.z);
  copy.rotation.set(0, from > 0 ? Math.PI + 0.45 : -0.3, 0);
  scene.add(copy);
  friend = { dog: copy, tail: copy.getObjectByName('tail'), materials: [...copies.values()], name, breed: friendBreed, greeted: false, arrived: false, spot, time: 0, hop: 0 };
  showPark();
}
let lastFriendBreed = -1;
function startPark() {
  ride = friendRide = null;
  iceTime = 0;
  rideReady = true;
  strollTo = null;
  parkCameraX = MY_SPOT + 0.8;
  parkCameraZ = 0;
  stopTrying();
  SOUND.pop();
  mode = 'park';
  dog.position.set(MY_SPOT, 0, 0);
  dog.rotation.set(0, -0.3, 0);
  speedY = 0;
  newFriend();
  showMode();
}
function leavePark() {
  removeFriend();
  friendBubbleTime = 0;
  mode = 'dress';
  goHome();
  showMode();
}
function greet() {
  if (!friend || friend.greeted || !friend.arrived) return;
  friend.greeted = true;
  friend.hop = 1;
  speedY = TAP_SPEED;
  SOUND.bark();
  SOUND.happy();
  burst('💗');
  // Min hund säger vad den heter, om man har gett den ett namn
  if (dogName()) say(t('Hej! Jag heter {n}').replace('{n}', dogName()));
  else sayOneOf('Voff voff!', 'Vill du leka?', 'Hej kompis!');
  friendSays(t('Vi är kompisar nu!'));
  stats.friends = (stats.friends || 0) + 1;
  checkMedals();
  showPark();
}
// Leka: en boll kastas in i parken och båda hundarna springer efter den
const playBall = fluff(0.14, mat(0xd8f03c), 0, 0.14, 0, parkGroup);
playBall.visible = false;
let play = null; // { phase: 'fly' | 'chase' | 'back', time, x, z, friendSpeed }
const TOWARD_RIGHT = -0.3; // hunden tittar åt höger, lite mot kameran
const TOWARD_LEFT = Math.PI + 0.3;
function startPlay() {
  if (!friend || !friend.greeted || play || ride || friendRide) return;
  SOUND.Leka();
  const reach = Math.min(2.2, 1.1 + camera.aspect); // på smal skärm kastas bollen inte lika långt åt sidan
  const x = Math.max(-PARK_X + 1, Math.min(PARK_X - 1, dog.position.x + (Math.random() * 2 - 1) * reach));
  play = { phase: 'fly', time: 0, from: dog.position.x, x, z: dog.position.z + 0.3, friendSpeed: 2.3 + Math.random() * 1.5 };
  playBall.visible = true;
  showPark();
}
// Flytta en hund mot x med små skutt. Säger sant när hunden är framme.
function trot(d, x, speed, dt, time) {
  const step = x - d.position.x;
  if (Math.abs(step) < 0.02) return true;
  d.rotation.y = step > 0 ? TOWARD_RIGHT : TOWARD_LEFT;
  d.position.x += Math.sign(step) * Math.min(Math.abs(step), speed * dt);
  if (d !== dog) d.position.y = Math.abs(Math.sin(time * 11)) * 0.2;
  else if (d.position.y === 0) speedY = 2.2; // min hund skuttar med hjälp av tyngdkraften i spelloopen
  return false;
}
function updatePlay(dt, time) {
  if (!play || !friend) return;
  play.time += dt;
  const f = friend.dog;
  if (play.phase === 'fly') {
    // Bollen flyger i en båge från kameran och landar i gräset
    const k = Math.min(1, play.time / 0.8);
    playBall.position.set(play.from + (play.x - play.from) * k, 0.14 + Math.sin(k * Math.PI) * 1.8 + (1 - k) * 0.6, play.z + 3.2 * (1 - k));
    if (k === 1) play.phase = 'chase';
  } else if (play.phase === 'chase') {
    const mine = trot(dog, play.x - 0.65, 3, dt, time);
    const theirs = trot(f, play.x + 0.65, play.friendSpeed, dt, time);
    f.position.z += (play.z - 0.2 - f.position.z) * Math.min(1, dt * 3); // kompisen springer in på samma rad som bollen
    if (mine || theirs) {
      // Den som kom först tog bollen
      play.phase = 'back';
      play.time = 0;
      play.mine = mine;
      SOUND.happy();
      burst('🎾');
      if (mine) say('Jag tog den!');
      else friendSays(t('Jag tog den!'));
      if (mine) speedY = TAP_SPEED;
      else friend.hop = 1;
    }
  } else {
    // Bollen studsar upp, och sedan är leken slut
    playBall.position.y = 0.14 + Math.abs(Math.sin(play.time * 6)) * Math.max(0, 0.9 - play.time);
    if (play.time < 0.9) {
      if (!play.mine) f.position.y = Math.sin(Math.min(1, play.time / 0.6) * Math.PI) * 0.7;
      return;
    }
    playBall.visible = false;
    f.position.y = 0;
    play = null;
    showPark();
  }
}
// Promenera i parken: piltangenterna (eller W A S D) styr hunden, eller så trycker man i gräset
const keysDown = new Set();
window.addEventListener('keydown', (event) => {
  if (mode !== 'park' || event.target === nameInput) return;
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyA', 'KeyD', 'KeyW', 'KeyS'].includes(event.code)) return;
  keysDown.add(event.code);
  event.preventDefault();
});
window.addEventListener('keyup', (event) => keysDown.delete(event.code));
window.addEventListener('blur', () => keysDown.clear());
const held = (...codes) => (codes.some((code) => keysDown.has(code)) ? 1 : 0);
let strolling = false; // sant medan hunden går, så att benen rör sig
let parkCameraX = 0;
let parkCameraZ = 0;
// Pilknapparna på skärmen fungerar som piltangenterna: håll in för att gå
for (const b of document.querySelectorAll('#dpad button')) {
  b.addEventListener('pointerdown', () => { if (mode === 'park') keysDown.add(b.dataset.code); });
  for (const type of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(type, () => keysDown.delete(b.dataset.code));
}
function updateStroll(dt) {
  strolling = false;
  if (ride) return; // på rutschkanan och gungan åker hunden av sig själv
  if (mode !== 'park' || play) {
    keysDown.clear();
    strollTo = null;
    return;
  }
  let dx = held('ArrowRight', 'KeyD') - held('ArrowLeft', 'KeyA');
  let dz = held('ArrowDown', 'KeyS') - held('ArrowUp', 'KeyW');
  if (dx || dz) strollTo = null; // tangenterna bestämmer över tryck i gräset
  else if (strollTo) {
    dx = strollTo.x - dog.position.x;
    dz = strollTo.z - dog.position.z;
    if (Math.hypot(dx, dz) < 0.08) { strollTo = null; return; }
  } else return;
  const length = Math.hypot(dx, dz);
  const step = Math.min(3.2 * dt, strollTo ? length : 9);
  dog.position.x += (dx / length) * step;
  dog.position.z += (dz / length) * step;
  keepOut(dog.position, 0.4 * breed.size); // inte in i träd, bänkar, dammen eller staketet
  dog.rotation.y = Math.atan2(-dz, dx);
  strolling = true;
  if (friend) {
    // Gå inte rakt igenom den andra hunden
    const fx = dog.position.x - friend.dog.position.x;
    const fz = dog.position.z - friend.dog.position.z;
    const d = Math.hypot(fx, fz) || 0.01;
    const reach = 0.55 * (breed.size + friend.breed.size);
    if (d < reach) {
      dog.position.x = friend.dog.position.x + (fx / d) * reach;
      dog.position.z = friend.dog.position.z + (fz / d) * reach;
    }
  }
}

// Hundgodis: kostar hundben, och kompisen blir jätteglad
const TREAT_PRICE = 2;
function giveTreat() {
  if (!friend || play || bones < TREAT_PRICE || !friend.arrived) return;
  bones -= TREAT_PRICE;
  try { localStorage.setItem('bones', bones); } catch {}
  stats.treats = (stats.treats || 0) + 1;
  friend.hop = 1;
  friend.treat = 1.2; // så länge tuggar hunden
  SOUND.Mat();
  burst('🍪');
  friendSays(t(['Mums! Tack!', 'Så gott!', 'Du är snäll!'][Math.floor(Math.random() * 3)]));
  say('Varsågod!');
  checkMedals();
  showPark();
}
function showPark() {
  el('parkButton').textContent = '🌳 ' + t('Hundparken');
  el('agilityButton').textContent = '🏅 Agility';
  el('iceButton').hidden = !nearKiosk;
  el('iceButton').textContent = `🍦 ${t('Köp glass')} 🦴${ICE_PRICE}`;
  el('iceButton').disabled = bones < ICE_PRICE;
  if (!friend) return;
  const here = friend.arrived;
  el('dpad').style.bottom = el('park').offsetHeight + 10 + 'px'; // pilknapparna sitter precis ovanför panelen
  el('parkText').textContent = !here ? t('Titta, där kommer en hund!') : `${friend.name} · ${t(friend.breed.name)}`;
  el('parkCount').textContent = '💗 ' + t('Hundkompisar') + ': ' + (stats.friends || 0);
  el('greet').textContent = (friend.greeted ? '✓ ' : '👋 ') + t('Hälsa');
  el('greet').disabled = !here || friend.greeted;
  el('greet').hidden = friend.greeted; // när man har hälsat byts knappen mot Leka
  el('playButton').hidden = !friend.greeted;
  el('playButton').textContent = '🎾 ' + t('Leka');
  el('playButton').disabled = !!play;
  el('nextFriend').disabled = !!play;
  el('treatButton').textContent = `🍪 ${t('Ge godis')} 🦴${TREAT_PRICE}`;
  el('treatButton').disabled = !here || !!play || bones < TREAT_PRICE;
  el('parkBones').textContent = '🦴 ' + bones;
  el('nextFriend').textContent = '🐶 ' + t('Nästa hund');
  el('parkHome').textContent = '🏠 ' + t('Gå hem');
  el('agilityButton').disabled = !!play;
}
function updatePark(dt, time) {
  updateStroll(dt);
  updateRide(dt);
  updateKiosk(dt);
  if (mode === 'park') updateParkAnimals(time);
  friendBubbleTime -= dt;
  friendBubble.hidden = friendBubbleTime <= 0 || !friend;
  if (!friend) return;
  const d = friend.dog;
  friend.time += dt;
  if (!friend.arrived) {
    // Hunden skuttar in i parken
    const left = friend.spot.x - d.position.x;
    d.position.x += Math.sign(left) * Math.min(Math.abs(left), 3.2 * dt);
    d.position.y = Math.abs(Math.sin(friend.time * 9)) * 0.22;
    if (Math.abs(left) < 0.02) {
      friend.arrived = true;
      d.position.y = 0;
      SOUND.bark();
      friendSays(t('Hej! Jag heter {n}').replace('{n}', friend.name));
      showPark();
    }
  } else if (friendRide) {
    // kompisen åker på lekplatsen, se updateRide
  } else if (play) {
    updatePlay(dt, time);
  } else {
    // Ett glatt hopp när man hälsar
    friend.hop = Math.max(0, friend.hop - dt * 1.6);
    d.position.y = Math.sin((1 - friend.hop) * Math.PI) * (friend.hop > 0 ? 0.7 : 0);
    // Den andra hunden följer med på promenaden
    const dx = dog.position.x - d.position.x;
    const dz = dog.position.z - d.position.z;
    const away = Math.hypot(dx, dz);
    if (away > 1.9) {
      const step = Math.min(away - 1.9, 3 * dt);
      d.position.x += (dx / away) * step;
      d.position.z += (dz / away) * step;
      keepOut(d.position, 0.4 * friend.breed.size);
      d.rotation.y = Math.atan2(-dz, dx);
      if (friend.hop === 0) d.position.y = Math.abs(Math.sin(time * 11)) * 0.18;
    }
  }
  if (friend.tail) friend.tail.rotation.x = Math.sin(time * (friend.greeted ? 22 : 11) + 1) * 0.6;
  if (friendBubble.hidden) return;
  bubblePoint.set(d.position.x, d.position.y + 1.75 * friend.breed.size, d.position.z).project(camera);
  friendBubble.style.left = Math.min(Math.max(((bubblePoint.x + 1) / 2) * window.innerWidth, 90), window.innerWidth - 90) + 'px';
  friendBubble.style.top = Math.max(((1 - bubblePoint.y) / 2) * window.innerHeight, 60) + 'px';
}

el('runButton').addEventListener('click', startRun);
el('parkButton').addEventListener('click', startPark);
el('swimButton').addEventListener('click', startSwim);
el('swimHome').addEventListener('click', endSwim);
el('diveButton').addEventListener('click', () => toggleDive());
el('agilityButton').addEventListener('click', startAgility);
el('greet').addEventListener('click', greet);
el('playButton').addEventListener('click', startPlay);
el('treatButton').addEventListener('click', giveTreat);
el('iceButton').addEventListener('click', buyIce);
el('nextFriend').addEventListener('click', () => { SOUND.pop(); newFriend(); });
el('parkHome').addEventListener('click', leavePark);
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

if (['#run', '#walk'].includes(location.hash) || location.hash.startsWith('#agility') || location.hash.startsWith('#care')) {
  startScreen.hidden = true;
  startRun();
  if (location.hash === '#run') { // visa en av varje sorts hinder på rad
    obstacleGroup.clear();
    obstacles = [];
    startSpeed = 0.01;
    OBSTACLES.forEach((kind, i) => addObstacle({ ...kind, roll: 0 }, 3 + i * 2.2, ((i % 3) - 1) * LANE));
  }
  if (location.hash === '#walk') startWalk();
  if (location.hash.startsWith('#agility')) { breedIndex = myBreed = Number(location.hash[8] || 0); showBreed(); startAgility(); obstacleGroup.clear(); obstacles = []; AGILITY_OBSTACLES.forEach((kind, i) => addObstacle(kind, 5 + i * 3.2, ((i % 3) - 1) * LANE)); dog.position.x = 6.6; lane = 0; }
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
    for (const key of ['level', 'bones', 'owned', 'outfit', 'home', 'breed', 'stats', 'medals', 'fur']) localStorage.removeItem(key);
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

if (location.hash.startsWith('#park')) { // testläge: hundparken, #park2 = efter att man har hälsat
  startScreen.hidden = true;
  startPark();
  friend.dog.position.x = friend.spot.x + 0.001;
  if (location.hash.startsWith('#park:')) { // lekplatsen: #park:tramp:25 = studsmattan efter 25 små tidssteg, #park:kiosk = vid glasskiosken
    const [, kind, steps] = location.hash.split(':');
    if (kind === 'kiosk') { dog.position.set(KIOSK.x - 0.6, 0, KIOSK.z + 1.3); updateKiosk(0); buyIce(); }
    else {
      dog.position.set(RIDES[kind].x, 0, RIDES[kind].z);
      friend.arrived = true;
      for (let i = 0; i < Number(steps); i++) updateRide(0.1);
    }
    parkCameraX = dog.position.x + 0.8;
    parkCameraZ = Math.min(dog.position.z, RIDES[kind] ? RIDES[kind].z + 1 : 0);
  }
  if (location.hash === '#park5') { strollTo = { x: -7, z: -3.5 }; friend.arrived = true; friend.dog.position.x = friend.spot.x; for (let i = 0; i < 60; i++) { updateStroll(0.05); updatePark(0.05, i * 0.05); } parkCameraX = dog.position.x + 0.8; parkCameraZ = dog.position.z; }
  else if (location.hash !== '#park') setTimeout(greet, 300);
  if (location.hash.startsWith('#park3')) { // #park34 = leken efter 40 små tidssteg
    setTimeout(() => {
      startPlay();
      for (let i = 0; i < Number(location.hash[6] || 0) * 10; i++) updatePlay(0.05, i * 0.05);
    }, 400);
  }
}
if (location.hash.startsWith('#swim')) { // testläge: simma, #swim2 = lite längre ut och svängd
  startScreen.hidden = true;
  startSwim();
  if (location.hash === '#swim2') { dog.position.set(2, 0, -3); heading = cameraHeading = 0.9; }
  if (location.hash === '#swim3') { toggleDive(true); depth = DIVE_DEPTH; dog.position.set(1.5, 0, 3.2); heading = cameraHeading = 0.15; } // under vattnet
}
if (location.hash === '#party') { // testläge: kalaset
  startScreen.hidden = true;
  activeTab = tabs.findIndex((tab) => tab.home);
  showWardrobe();
  startParty();
  party.time = 2;
}
if (location.hash.startsWith('#hair')) { // testläge: bara en frisyr, #hair2 = frisyr nummer 2
  startScreen.hidden = true;
  for (const kind of wardrobe) wear(kind, kind.id === 'hair' ? Number(location.hash[5]) || 0 : -1);
  if (location.hash[6]) { furColor = COLORS[Number(location.hash[6])]; showBreed(); } // #hair25 = färgad päls också
}
if (location.hash === '#say') { // testläge: visa pratbubblan
  startScreen.hidden = true;
  say('Ska vi springa?');
  bubbleTime = 99;
}
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
  const swims = mode === 'swim';
  if (swims) stridePhase += 7 * dt; // benen paddlar i vattnet
  if (strolling) stridePhase += 10 * dt; // benen går i parken
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
    if (strolling) swing = Math.sin(phase + (front ? Math.PI : 0) + (i % 2) * Math.PI) * 0.5;
    if (swims) swing = Math.sin(phase + (front ? Math.PI : 0) + (i % 2) * Math.PI) * 0.6;
    if (running) swing = inAir ? (front ? 0.9 : -0.9) : Math.sin(phase + (front ? Math.PI : 0) + (i % 2) * 0.6) * 0.75;
    for (const h of sameLeg) h.rotation.z = swing;
  });
  updateTrick(dt);
  updateSleep(dt, time);

  seaWorld.visible = swims;
  if (swims) {
    updateSwim(dt, time);
  } else if (mode === 'run' || mode === 'lost') {
    // Kameran springer med rakt bakom hunden, så att man ser kroppen och alla tre filerna
    const narrow = camera.aspect < 1;
    camera.position.set(dog.position.x - (narrow ? 5.2 : 4.2), narrow ? 4.2 : 3.1, dog.position.z * 0.4);
    camera.lookAt(dog.position.x + (narrow ? 4 : 4.5), 0.4, dog.position.z * 0.4);
  } else {
    // Kameran följer mjukt med hunden uppåt
    const targetY = Math.max(1, dog.position.y + DOG_CENTER);
    cameraY += (targetY - cameraY) * Math.min(1, dt * 5);
    // När man tar hand om hunden backar kameran och tittar lite lägre, så att skålarna syns
    const caring = mode === 'care' || mode === 'park';
    const low = lift + (caring ? 0.55 : 0);
    // I parken följer kameran med lite åt sidan när hunden går
    if (mode === 'park') {
      parkCameraX += (dog.position.x + 0.8 - parkCameraX) * Math.min(1, dt * 3);
      parkCameraZ += (dog.position.z - parkCameraZ) * Math.min(1, dt * 3);
    } else {
      parkCameraX = parkCameraZ = 0;
    }
    const side = mode === 'care' ? 0.4 : parkCameraX;
    camera.position.set(side, cameraY + 1 - low, parkCameraZ + dressZ + (caring ? 1.3 : 0));
    camera.lookAt(side, cameraY - low, parkCameraZ);
  }
  updateLeash();
  updateBubble(dt);
  updateParty(dt, time);
  updatePark(dt, time);
  parkGroup.visible = mode === 'park';
  homeGroup.visible = mode === 'dress' || mode === 'care';
  if (homeGroup.visible) updateButterflies(time);
  toyGroup.visible = mode === 'dress' || mode === 'care';
  toyGroup.rotation.y = -0.5; // leksaken ligger still på sin plats, även när hunden snurrar eller vänder sig
  stars.position.x = camera.position.x;
  sun.position.x = dog.position.x + 3;
  sun.target.position.x = dog.position.x;

  renderer.render(scene, camera);
});
