let lang = "id";
let currentMode = "home";
let lastSpoken = { id: "Halo Adik Pintar!", en: "Hello Smart Kid!" };
let score = 0;
let currentAnswer = null;

const DATA = {
  huruf: [
    { k: "A", ico: "🍎", icoEn: "🍎", id: "Apel", en: "Apple" },
    { k: "B", ico: "🦆", icoEn: "🐻", id: "Bebek", en: "Bear" },
    { k: "C", ico: "🦎", icoEn: "🐱", id: "Cicak", en: "Cat" },
    { k: "D", ico: "🐑", icoEn: "🐶", id: "Domba", en: "Dog" },
    { k: "E", ico: "🦅", icoEn: "🐘", id: "Elang", en: "Elephant" },
    { k: "F", ico: "🦩", icoEn: "🐟", id: "Flamingo", en: "Fish" },
    { k: "G", ico: "🐘", icoEn: "🦒", id: "Gajah", en: "Giraffe" },
    { k: "H", ico: "🐯", icoEn: "🐴", id: "Harimau", en: "Horse" },
    { k: "I", ico: "🐟", icoEn: "🍦", id: "Ikan", en: "Ice Cream" },
    { k: "J", ico: "🦒", icoEn: "🪼", id: "Jerapah", en: "Jellyfish" },
    { k: "K", ico: "🐱", icoEn: "🦘", id: "Kucing", en: "Kangaroo" },
    { k: "L", ico: "🐝", icoEn: "🦁", id: "Lebah", en: "Lion" },
    { k: "M", ico: "🐒", icoEn: "🐒", id: "Monyet", en: "Monkey" },
    { k: "N", ico: "🍍", icoEn: "🪺", id: "Nanas", en: "Nest" },
    { k: "O", ico: "🦧", icoEn: "🦉", id: "Orangutan", en: "Owl" },
    { k: "P", ico: "🐧", icoEn: "🐧", id: "Penguin", en: "Penguin" },
    { k: "Q", ico: "👑", icoEn: "👑", id: "Ratu", en: "Queen" },
    { k: "R", ico: "🦌", icoEn: "🐰", id: "Rusa", en: "Rabbit" },
    { k: "S", ico: "🐄", icoEn: "☀️", id: "Sapi", en: "Sun" },
    { k: "T", ico: "🐢", icoEn: "🐯", id: "Kura-kura", en: "Tiger" },
    { k: "U", ico: "🐍", icoEn: "☂️", id: "Ular", en: "Umbrella" },
    { k: "V", ico: "🌋", icoEn: "🌋", id: "Gunung Api", en: "Volcano" },
    { k: "W", ico: "🥕", icoEn: "🐳", id: "Wortel", en: "Whale" },
    { k: "X", ico: "🎹", icoEn: "🎹", id: "Xilofon", en: "Xylophone" },
    { k: "Y", ico: "🪀", icoEn: "🪀", id: "Yoyo", en: "Yoyo" },
    { k: "Z", ico: "🦓", icoEn: "🦓", id: "Zebra", en: "Zebra" }
  ],
  angka: Array.from({ length: 100 }, (_, i) => {
    const n = i + 1;
    const satId = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan"];
    const satEn = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const belasEn = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const puluhEn = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    let namaId = "";
    if (n < 10) namaId = satId[n];
    else if (n === 10) namaId = "Sepuluh";
    else if (n === 11) namaId = "Sebelas";
    else if (n < 20) namaId = satId[n - 10] + " Belas";
    else if (n === 100) namaId = "Seratus";
    else {
      const p = Math.floor(n / 10), s = n % 10;
      namaId = satId[p] + " Puluh" + (s ? " " + satId[s] : "");
    }

    let namaEn = "";
    if (n < 10) namaEn = satEn[n];
    else if (n < 20) namaEn = belasEn[n - 10];
    else if (n === 100) namaEn = "One Hundred";
    else {
      const p = Math.floor(n / 10), s = n % 10;
      namaEn = puluhEn[p] + (s ? "-" + satEn[s] : "");
    }

    const p = Math.floor(n / 10), s = n % 10;
    const subId = n <= 10 ? `Hitung ada ${n} apel!` : (n === 100 ? "1 Ratusan (10 Puluhan)" : `${p} Puluhan + ${s} Satuan`);
    const subEn = n <= 10 ? `Count ${n} apples!` : (n === 100 ? "1 Hundred (10 Tens)" : `${p} Tens + ${s} Ones`);
    return { k: String(n), num: n, isAngka: true, id: namaId, en: namaEn, subId, subEn };
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

function openLearn(mode, pageIdx = 0) {
  currentMode = mode;
  const titles = { huruf: "🔤 Mengenal Huruf", angka: "🔢 Mengenal Angka", hewan: "🐘 Dunia Hewan", warna: "🎨 Mengenal Warna" };
  document.getElementById("header-title").innerText = titles[mode];
  const allList = DATA[mode];
  const grid = document.getElementById("cards-grid");

  let oldPager = document.getElementById("angka-pager-bar");
  if (oldPager) oldPager.remove();

  let rangeWrap = document.getElementById("angka-range-tabs");
  if (!rangeWrap) {
    rangeWrap = document.createElement("div");
    rangeWrap.id = "angka-range-tabs";
    rangeWrap.className = "range-tabs";
    grid.parentNode.insertBefore(rangeWrap, grid);
  }
  rangeWrap.innerHTML = "";
  rangeWrap.style.display = "none";

  let list = allList;
  if (mode === "angka") {
    const ranges = [,,,,,,];
    rangeWrap.style.display = "flex";
    ranges.forEach((r, idx) => {
      const tb = document.createElement("button");
      tb.className = "range-btn" + (idx === pageIdx ? " active" : "");
      tb.innerText = `${r}–${r}`;
      tb.onclick = () => openLearn("angka", idx);
      rangeWrap.appendChild(tb);
    });
    const [awal, akhir] = ranges[pageIdx] || ranges;
    list = allList.slice(awal - 1, akhir);
  }

  const setSpot = (item, silent = false) => {
    if (!silent) playTone(620, "triangle", 0.14);
    const spotEl = document.getElementById("spot-visual");
    if (item.isAngka) {
      if (item.num <= 10) {
        spotEl.style.fontSize = item.num > 5 ? "28px" : "38px";
        spotEl.innerText = "🍎".repeat(item.num);
      } else {
        spotEl.style.fontSize = "56px";
        spotEl.innerHTML = `<span class="big-num-badge">${item.num}</span>`;
      }
    } else {
      spotEl.style.fontSize = "62px";
      const ikonAktif = (lang === "en" && item.icoEn) ? item.icoEn : item.ico;
      spotEl.innerText = ikonAktif;
    }

    const judul = mode === "huruf" ? `${item.k} — ${lang === "id" ? item.id : item.en}` :
                  mode === "angka" ? `${item.k} (${lang === "id" ? item.id : item.en})` :
                  (lang === "id" ? item.id : item.en);
    document.getElementById("spot-title").innerText = judul;
    const infoBawah = item.isAngka ? (lang === "id" ? item.subId : item.subEn) :
                      (item.sfx ? `Suara: ${item.sfx}` : (lang === "id" ? "Ketuk kartu di bawah!" : "Tap a card below!"));
    document.getElementById("spot-sub").innerText = infoBawah;
    const ucapId = mode === "huruf" ? `${item.k}... ${item.id}` : mode === "angka" ? `${item.id}` : item.id;
    const ucapEn = mode === "huruf" ? `${item.k}... ${item.en}` : mode === "angka" ? `${item.en}` : item.en;
    lastSpoken = { id: ucapId, en: ucapEn };
    if (!silent) speakText(ucapId, ucapEn);
  };

  grid.innerHTML = "";
  list.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "item-card";
    if (item.hex) btn.style.borderColor = item.hex;
    const ikonKartu = (lang === "en" && item.icoEn) ? item.icoEn : item.ico;
    btn.innerHTML = `<span class="ic-top">${mode === "huruf" || mode === "angka" ? item.k : ikonKartu}</span><strong>${mode === "huruf" ? ikonKartu + " " + (lang === "id" ? item.id : item.en) : (lang === "id" ? item.id : item.en)}</strong>`;
    btn.onclick = () => setSpot(item, false);
    grid.appendChild(btn);
  });

  showView("learn");
  setSpot(list, true);
}

function startQuiz() {
  currentMode = "kuis";
  document.getElementById("header-title").innerText = "⭐ Tebak Ceria";
  showView("quiz");
  nextQuestion(true);
}

function nextQuestion(silent = false) {
  const pool = [...DATA.hewan, ...DATA.warna];
  const acak = pool.sort(() => Math.random() - 0.5).slice(0, 4);
  currentAnswer = acak[Math.floor(Math.random() * acak.length)];
  const namaTarget = lang === "id" ? currentAnswer.id : currentAnswer.en;
  document.getElementById("quiz-prompt").innerText = lang === "id" ? `Yang mana ${namaTarget}?` : `Which one is ${namaTarget}?`;
  const soalId = `Yang mana ${currentAnswer.id}?`;
  const soalEn = `Which one is ${currentAnswer.en}?`;
  lastSpoken = { id: soalId, en: soalEn };
  if (!silent) speakText(soalId, soalEn);

  const optBox = document.getElementById("quiz-options");
  optBox.innerHTML = "";
  acak.forEach(item => {
    const b = document.createElement("button");
    b.className = "quiz-opt";
    b.innerHTML = `<span>${item.ico}</span><strong>${lang === "id" ? item.id : item.en}</strong>`;
    b.onclick = () => {
      if (item === currentAnswer) {
        document.querySelectorAll(".quiz-opt").forEach(el => el.style.pointerEvents = "none");
        b.classList.remove("opt-wrong");
        b.classList.add("opt-correct");
        score += 10;
        document.getElementById("quiz-score").innerText = score;
        playWinMelody();
        setTimeout(() => {
          speakText("Yeeey! Pintar sekali!", "Yay! You are so smart!", () => nextQuestion(false));
        }, 420);
      } else {
        b.classList.remove("opt-wrong");
        void b.offsetWidth;
        b.classList.add("opt-wrong");
        playTone(220, "sawtooth", 0.22);
        speakText("Ups, coba lagi ya!", "Oops, try again!");
        setTimeout(() => b.classList.remove("opt-wrong"), 850);
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
  if (currentMode === "kuis") nextQuestion(false);
  else if (currentMode !== "home") openLearn(currentMode);
  else speakText("Bahasa Indonesia aktif", "English mode active");
};
