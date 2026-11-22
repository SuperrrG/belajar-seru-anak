let lang = "id";
let currentMode = "home";
let lastSpoken = { id: "Halo Adik Pintar!", en: "Hello Smart Kid!" };
let score = 0;
let currentAnswer = null;

const DATA = {
  huruf: [
    { k: "A", ico: "🍎", id: "Apel", en: "Apple" }, { k: "B", ico: "🦆", id: "Bebek", en: "Duck" },
    { k: "C", ico: "🦎", id: "Cicak", en: "Lizard" }, { k: "D", ico: "🐑", id: "Domba", en: "Sheep" },
    { k: "E", ico: "🦅", id: "Elang", en: "Eagle" }, { k: "F", ico: "🦩", id: "Flamingo", en: "Flamingo" },
    { k: "G", ico: "🐘", id: "Gajah", en: "Elephant" }, { k: "H", ico: "🐯", id: "Harimau", en: "Tiger" },
    { k: "I", ico: "🐟", id: "Ikan", en: "Fish" }, { k: "J", ico: "🦒", id: "Jerapah", en: "Giraffe" },
    { k: "K", ico: "🐱", id: "Kucing", en: "Cat" }, { k: "L", ico: "🐝", id: "Lebah", en: "Bee" },
    { k: "M", ico: "🐒", id: "Monyet", en: "Monkey" }, { k: "N", ico: "🍍", id: "Nanas", en: "Pineapple" },
    { k: "O", ico: "🦧", id: "Orangutan", en: "Orangutan" }, { k: "P", ico: "🐧", id: "Penguin", en: "Penguin" },
    { k: "Q", ico: "👑", id: "Ratu", en: "Queen" }, { k: "R", ico: "🦌", id: "Rusa", en: "Deer" },
    { k: "S", ico: "🐄", id: "Sapi", en: "Cow" }, { k: "T", ico: "🐢", id: "Kura-kura", en: "Turtle" },
    { k: "U", ico: "🐍", id: "Ular", en: "Snake" }, { k: "V", ico: "🌋", id: "Gunung Api", en: "Volcano" },
    { k: "W", ico: "🥕", id: "Wortel", en: "Carrot" }, { k: "X", ico: "🎹", id: "Xilofon", en: "Xylophone" },
    { k: "Y", ico: "🪀", id: "Yoyo", en: "Yoyo" }, { k: "Z", ico: "🦓", id: "Zebra", en: "Zebra" }
  ],
  angka: Array.from({ length: 20 }, (_, i) => {
    const n = i + 1;
    const namaId = ["Satu","Dua","Tiga","Empat","Lima","Enam","Tujuh","Delapan","Sembilan","Sepuluh","Sebelas","Dua Belas","Tiga Belas","Empat Belas","Lima Belas","Enam Belas","Tujuh Belas","Delapan Belas","Sembilan Belas","Dua Puluh"][i];
    const namaEn = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty"][i];
    return { k: String(n), ico: "⭐".repeat(n), isAngka: true, id: namaId, en: namaEn };
  }),
  hewan: [
    { k: "Kucing", ico: "🐱", id: "Kucing. Meong meong!", en: "Cat. Meow meow!", sfx: "Meong!" },
    { k: "Anjing", ico: "🐶", id: "Anjing. Guk guk!", en: "Dog. Woof woof!", sfx: "Guk guk!" },
    { k: "Sapi", ico: "🐄", id: "Sapi. Moooo!", en: "Cow. Moooo!", sfx: "Moooo!" },
    { k: "Singa", ico: "🦁", id: "Singa. Roaaaar!", en: "Lion. Roaaaar!", sfx: "Roaaar!" },
    { k: "Ayam", ico: "🐓", id: "Ayam. Kukuruyuk!", en: "Rooster. Cock-a-doodle-doo!", sfx: "Kukuruyuk!" },
    { k: "Katak", ico: "🐸", id: "Katak. Kwek kwek!", en: "Frog. Ribbit ribbit!", sfx: "Kwek kwek!" },
    { k: "Gajah", ico: "🐘", id: "Gajah. Pretttt!", en: "Elephant. Pawoooo!", sfx: "Pretttt!" },
    { k: "Bebek", ico: "🦆", id: "Bebek. Kwek kwek!", en: "Duck. Quack quack!", sfx: "Kwek!" },
    { k: "Kambing", ico: "🐐", id: "Kambing. Mbekkk!", en: "Goat. Baaaa!", sfx: "Mbekkk!" }
  ],
  warna: [
    { k: "Merah", ico: "🔴", hex: "#ef4444", id: "Warna Merah", en: "Red Color" },
    { k: "Biru", ico: "🔵", hex: "#3b82f6", id: "Warna Biru", en: "Blue Color" },
    { k: "Kuning", ico: "🟡", hex: "#eab308", id: "Warna Kuning", en: "Yellow Color" },
    { k: "Hijau", ico: "🟢", hex: "#22c55e", id: "Warna Hijau", en: "Green Color" },
    { k: "Oranye", ico: "🟠", hex: "#f97316", id: "Warna Oranye", en: "Orange Color" },
    { k: "Ungu", ico: "🟣", hex: "#a855f7", id: "Warna Ungu", en: "Purple Color" },
    { k: "Cokelat", ico: "🟤", hex: "#92400e", id: "Warna Cokelat", en: "Brown Color" },
    { k: "Hitam", ico: "⚫", hex: "#1e293b", id: "Warna Hitam", en: "Black Color" }
  ]
};

let sharedAudioCtx = null;
function playTone(freq = 520, type = "sine", dur = 0.15) {
  try {
    if (!sharedAudioCtx) sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (sharedAudioCtx.state === "suspended") sharedAudioCtx.resume();
    const osc = sharedAudioCtx.createOscillator();
    const gain = sharedAudioCtx.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.12, sharedAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, sharedAudioCtx.currentTime + dur);
    osc.connect(gain); gain.connect(sharedAudioCtx.destination);
    osc.start(); osc.stop(sharedAudioCtx.currentTime + dur);
  } catch (e) {}
}

async function speakText(textId, textEn, onDone) {
  lastSpoken = { id: textId, en: textEn || textId };
  const teks = lang === "id" ? textId : (textEn || textId);
  const kodeBahasa = lang === "id" ? "id-ID" : "en-US";
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(teks);
    u.lang = kodeBahasa;
    u.rate = 1.05;
    u.pitch = 1.48;
    u.onend = () => { if (onDone) setTimeout(onDone, 550); };
    window.speechSynthesis.speak(u);
  } else if (onDone) {
    setTimeout(onDone, 1800);
  }
}

function playWinMelody() {
  const nada = new Array(523, 659, 784, 1046);
  nada.forEach((f, idx) => {
    setTimeout(() => playTone(f, "triangle", 0.16), idx * 95);
  });
}

function showView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("view-" + name).classList.add("active");
  document.getElementById("btn-back").classList.toggle("hidden", name === "home");
}

function openLearn(mode) {
  currentMode = mode;
  const titles = { huruf: "🔤 Mengenal Huruf", angka: "🔢 Mengenal Angka", hewan: "🐘 Dunia Hewan", warna: "🎨 Mengenal Warna" };
  document.getElementById("header-title").innerText = titles[mode];
  const list = DATA[mode];
  const grid = document.getElementById("cards-grid");

  const setSpot = (item) => {
    playTone(620, "triangle", 0.14);
    const spotEl = document.getElementById("spot-visual");
    spotEl.style.fontSize = item.isAngka ? (Number(item.k) > 10 ? "24px" : (Number(item.k) > 5 ? "30px" : "42px")) : "62px";
    spotEl.innerText = item.ico;
    const judul = mode === "huruf" ? `${item.k} — ${lang === "id" ? item.id : item.en}` :
                  mode === "angka" ? `${item.k} (${lang === "id" ? item.id : item.en})` :
                  (lang === "id" ? item.id : item.en);
    document.getElementById("spot-title").innerText = judul;
    document.getElementById("spot-sub").innerText = item.sfx ? `Suara: ${item.sfx}` : "Ketuk kartu lain di bawah!";
    const ucapId = mode === "huruf" ? `${item.k}... ${item.id}` : mode === "angka" ? `${item.id}` : item.id;
    const ucapEn = mode === "huruf" ? `${item.k}... ${item.en}` : mode === "angka" ? `${item.en}` : item.en;
    speakText(ucapId, ucapEn);
  };

  grid.innerHTML = "";
  list.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "item-card";
    if (item.hex) btn.style.borderColor = item.hex;
    btn.innerHTML = `<span class="ic-top">${mode === "huruf" || mode === "angka" ? item.k : item.ico}</span><strong>${mode === "huruf" ? item.ico + " " + (lang === "id" ? item.id : item.en) : (lang === "id" ? item.id : item.en)}</strong>`;
    btn.onclick = () => setSpot(item);
    grid.appendChild(btn);
  });

  showView("learn");
  setSpot(list[0]);
}

function startQuiz() {
  currentMode = "kuis";
  document.getElementById("header-title").innerText = "⭐ Tebak Ceria";
  showView("quiz");
  nextQuestion();
}

function nextQuestion() {
  const pool = [...DATA.hewan, ...DATA.warna];
  const acak = pool.sort(() => Math.random() - 0.5).slice(0, 4);
  currentAnswer = acak[Math.floor(Math.random() * acak.length)];
  const namaTarget = lang === "id" ? currentAnswer.id : currentAnswer.en;
  document.getElementById("quiz-prompt").innerText = lang === "id" ? `Yang mana ${namaTarget}?` : `Which one is ${namaTarget}?`;
  speakText(`Yang mana ${currentAnswer.id}?`, `Which one is ${currentAnswer.en}?`);

  const optBox = document.getElementById("quiz-options");
  optBox.innerHTML = "";
  acak.forEach(item => {
    const b = document.createElement("button");
    b.className = "quiz-opt";
    b.innerHTML = `<span>${item.ico}</span><strong>${lang === "id" ? item.id : item.en}</strong>`;
    b.onclick = () => {
      if (item === currentAnswer) {
        document.querySelectorAll(".quiz-opt").forEach(el => el.style.pointerEvents = "none");
        b.style.background = "#dcfce7";
        b.style.borderColor = "#16a34a";
        score += 10;
        document.getElementById("quiz-score").innerText = score;
        playWinMelody();
        setTimeout(() => {
          speakText("Yeeey! Pintar sekali!", "Yay! You are so smart!", nextQuestion);
        }, 420);
      } else {
        playTone(220, "sawtooth", 0.22);
        speakText("Ups, coba lagi ya!", "Oops, try again!");
      }
    };
    optBox.appendChild(b);
  });
}

document.querySelectorAll(".menu-card").forEach(btn => {
  btn.onclick = () => openLearn(btn.dataset.mode);
});
document.querySelector(".quiz-banner").onclick = startQuiz;
document.getElementById("btn-back").onclick = () => {
  playTone(440);
  document.getElementById("header-title").innerText = "Belajar Seru Anak";
  showView("home");
};
document.getElementById("btn-speak-again").onclick = () => speakText(lastSpoken.id, lastSpoken.en);
document.getElementById("btn-quiz-sound").onclick = () => speakText(lastSpoken.id, lastSpoken.en);
document.getElementById("btn-lang").onclick = function() {
  lang = lang === "id" ? "en" : "id";
  this.innerText = lang === "id" ? "🇮🇩 ID" : "🇬🇧 EN";
  playTone(700);
  if (currentMode === "kuis") nextQuestion();
  else if (currentMode !== "home") openLearn(currentMode);
  else speakText("Bahasa Indonesia aktif", "English mode active");
};
