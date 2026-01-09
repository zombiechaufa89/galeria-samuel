const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const buttons = document.querySelectorAll(".filters button");
const countAll = document.getElementById("count-all");
const countNormal = document.getElementById("count-normal");
const countMeme = document.getElementById("count-meme");

let totalNormal = 0;
let totalMeme = 0;

let photos = [];

async function loadImages(prefix, type) {
  let index = 1;

  while (true) {
    const src = `images/${index}${prefix}.png`;
    const img = new Image();

    try {
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = src;
      });

      const div = document.createElement("div");
      div.className = "photo";
      div.dataset.type = type;

      const image = document.createElement("img");
      image.src = src;

      image.onclick = () => {
        scale = 1;
        lightboxImg.src = src;
        lightboxImg.style.transform = "scale(1)";
        lightbox.style.display = "flex";
      };

      div.appendChild(image);
      gallery.appendChild(div);

      photos.push(div);
      index++;

      if (type === "normal") totalNormal++;
      if (type === "meme") totalMeme++;

      countNormal.textContent = `Fotos: ${totalNormal}`;
      countMeme.textContent = `Memes: ${totalMeme}`;
      countAll.textContent = `Total: ${totalNormal + totalMeme}`;
    } catch {
      break;
    }
  }
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    photos.forEach(p => {
      if (filter === "all" || p.dataset.type === filter) {
        p.classList.remove("hidden");
        requestAnimationFrame(() => p.classList.remove("hide"));
      } else {
        p.classList.add("hide");
        setTimeout(() => p.classList.add("hidden"), 300);
      }
    });
  });
});

lightbox.onclick = () => {
  lightbox.style.display = "none";
};

let zoomLevel = 1;
let isZoomed = false;
const MAX_ZOOM = 5;

lightboxImg.addEventListener("click", e => {
  e.stopPropagation();

  if (!isZoomed) {
    zoomLevel = 2;
    isZoomed = true;
    lightboxImg.style.cursor = "zoom-out";
  } else {
    zoomLevel++;
    if (zoomLevel > MAX_ZOOM) {
      zoomLevel = 1;
      isZoomed = false;
      lightboxImg.style.cursor = "zoom-in";
      lightboxImg.style.transformOrigin = "center center";
    }
  }

  lightboxImg.style.transform = `scale(${zoomLevel})`;
});

lightboxImg.addEventListener("mousemove", e => {
  if (!isZoomed) return;

  const rect = lightboxImg.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  lightboxImg.style.transformOrigin = `${x}% ${y}%`;
});

lightbox.addEventListener("click", e => {
  if (e.target !== lightboxImg) {
    zoomLevel = 1;
    isZoomed = false;
    lightboxImg.style.transform = "scale(1)";
    lightboxImg.style.transformOrigin = "center center";
    lightboxImg.style.cursor = "zoom-in";
    lightbox.style.display = "none";
  }
});


const audio = new Audio();
const panel = document.getElementById("music-panel");
const list = document.getElementById("music-list");

const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const volume = document.getElementById("volume");
const progress = document.getElementById("progress");
const trackName = document.getElementById("track-name");

let tracks = [];
let currentIndex = 0;

document.getElementById("music-btn").onclick = (e) => {
  e.stopPropagation();
  panel.style.display = panel.style.display === "block" ? "none" : "block";
};

document.addEventListener("click", () => {
  panel.style.display = "none";
});

async function loadMusic() {
  const res = await fetch("music/music.json");
  tracks = await res.json();

  tracks.forEach((file, i) => {
    const div = document.createElement("div");
    div.textContent = file
      .replace(".mp3", "")
      .replace(/_/g, " ");

    div.onclick = () => playTrack(i);
    list.appendChild(div);
  });
}

function playTrack(index) {
  currentIndex = index;
  audio.src = `music/${tracks[index]}`;
  audio.play();
  playPauseBtn.textContent = "⏸️";

  trackName.textContent = tracks[index]
    .replace(".mp3", "")
    .replace(/_/g, " ");
}

playPauseBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  playTrack(currentIndex);
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  playTrack(currentIndex);
};

volume.oninput = e => audio.volume = e.target.value;

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.oninput = e => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
};

audio.addEventListener("ended", () => {
  nextBtn.click();
});

loadMusic();

(async function init() {
  await loadImages("", "normal");
  await loadImages("m", "meme");
})();


let typedBuffer = "";
const secretWord = "bansamuel";

let banPoints = 0;

const chat = document.getElementById("konami-chat");
const chatBody = document.getElementById("chat-body");
const banCounter = document.getElementById("ban-counter");

const users = [
  "GordoDeCoreaN",
  "AbueloDeSamuel",
  "PDiddy",
  "DinaBoluarte",
  "Machin",
  "PaisanaJacinta",
  "Putin_en_Pijama",
  "TrumpCapsLock",
  "PedroCastilloAFK",
  "PetroGustavo",
  "PabloEscobar",
  "ElTíoIncómodo",
  "JosePajerí",
  "Nelo",
  "Lisa",
  "Mozo",
  "ElonMusK",
  "MarkZuckerberg",
  "Eminem",
  "Chabelo",
  "JequeArabe",
  "RusoMafioso",
  "NarcoMachete",
  "Kaatie",
  "NicolasMaduro",
  "Dayanita69",
  "ElRubius",
  "IbaisLlanos",
  "TheGrefg",
  "AntoniCra"
];

const textosl4d2meme = [
  "c samuel F1 y una noche de pasión con Dayanita",
  "JAJAJA",
  "c samuel F1 y un bombaso por el culo",
  "c samuel p xd",
  "c samuel F1 y 10 noches encerrado en la sala",
  "Samuel fucking idiot",
  "c samuel F1 y beso francés con zombie",
  "c samuel me llega al huevo",
  "c samuel F1 y obligado a ser la pantera del callao pero en el cuarto de sus abuelos",
  "jaajajjaj",
  "c samuel F1 y obligado a ver a su abuela bañar y cagar",
  "agg c samuel",
  "c samuel F1 y servicio militar",
  "alguien sabe dónde está samuel???",
  "c samuel F1 y lavar los calzoncillos de su abuelo y tios",
  "The Samuel's mon is sooo... good",
  "c samuel F1 y baneado en todos los servers de discord",
  "samuel y zombie por siempre!!",
  "c samuel F1 y lamer la barandilla del microbus después de trabajar 7 horas sin parar'",
  "zzz",
  "c samuel F1 y jugar solamente en su pc antigua por 1 año",
  "ayuden pe, me endeudé",
  "c samuel F1 y leer 20 documentales de wikipedia",
  "Aqui los iluminatis presente y apoyando al #BanSamuel",
  "c samuel F1 y expulsión del país",
  "C comentario de arriba p xd",
  "c samuel F1 y dormir en cucharita con el vagabundo que vive debajo del puente",
  "el comentario de abajo se coje a c samuel",
  "c samuel F1 y que duerma en la caseta de perro que está afuera de su casa",
  "Alguien sabe cuándo sale lacras??",
  "c samuel F1 y una corbata al estilo de corte de franela",
  "Alguien conoce dónde vive Eskay para mandarle una pc gaming?",
  "c samuel F1 y directo al pedro paulet",
  "c toxix 5 años nomas dire",
  "c samuel F1 y 5noche de pasión con didi y petro",
  "Alguien sabe cuándo saldrá nuevas músicas anti-samuel??",
  "c samuel F1 y una ducha con su abuelo en una tina",
  "Alguien está en Colombia para meterle su golpe??",
  "c samuel F1 y que le corten el cable de wifi",
  "mmm delicious the Samuel's grandmother...",
  "c samuel F1 y directo a la celda donde tenía a Mike tyson con 3 viagras encima",
  "C Braulio emo, F1 y que le lancen ladrillo en la boca de una vez pa que se le caiga todos sus dientes",
  "c samuel F1 y cambio de cerebro",
  "c zombie F1 y beso apasionado con samuel",
  "yo te apollo zamuel",
  "c samuel F1 y que dayanita le comparta su jabon íntimo pa que use",
  "una vez vi la cara de samuel y me dio arcadas",
  "c samuel F1 y bañada en vomito de boomer",
  "venezuela libre!! ahora que Colombia sea libre de samuel!!",
  "c samuel F1 y senton del boomer hombre",
  "jaaaa",
  "c samuel F1 y que sea el penúltimo en el cienpies humano y el último es Chiquinho Domingo",
  "quiero ver stream de eskay caaaarajoo",
  "c samuel F1 pero de su casa",
  "pa cuando pagina del nero asi como el de aqui?",
  "c samuel F1 y que coma la sobra que se acumula en el lavadero después de lavar los platos",
  "por fin me descargué una foto de samuel y reemplacé mi espantapájaros, ni perros se acercan",
  "c samuel F1 y entrar a una reunión calato",
  "Samuel y zombie",
  "c samuel F1 y una noche de pasión con maduro y petro",
  "Samuel y jengibre",
  "c samuel F1 pero de su colegio",
  "jsjsjs",
  "c samuel F1 y que sea actor de la película Tonto y Retonto",
  "cómo odio a samuel",
  "c samuel F1 y que la witch le haga examen de la próstata",
  "da rabia c samuel",
  "c samuel F1 y metida de jabón con cloro en la boca para limpiar lo grosero que es",
  "qué asco esas fotos de samuel",
  "c samuel F1 y una lobotomía sin anestesia",
  "suban más memes plssss",
  "c samuel F1 y apareamiento con la paisana jacinta",
  "gracias por las fotos, ahora mi hija si come obligada después de amenazarle con esa foto",
  "c samuel F1 y que Jeff Dabe le haga una revisión de prostata ",
  "mi hijo era gay y vio a ese individuo y ahora es instructor militar macho",
  "c samuel F1 y penetrada de pinocho mitómano",
  "mi hija vio esa foto y ahora es lesbiana, te detesto samuel",
  "c samuel F1 y dormir como óreo con sus 2 tíos",
  "mi cabra vio esa foto y ayer lo ví caminando en 2 patas mientras hablaba algo raro",
  "c samuel F1 y vandalizar su casa de parte de los LGBT",
  "me pedí comida gourmet, vi sus fotos de samuel y mi comida sabe a kk"
];


document.addEventListener("keydown", (e) => {
  if (e.key.length !== 1) return;

  typedBuffer += e.key.toLowerCase();

  if (typedBuffer.length > secretWord.length) {
    typedBuffer = typedBuffer.slice(-secretWord.length);
  }

  if (typedBuffer === secretWord) {
    activarBanSamuel();
    typedBuffer = "";
  }
});

function activarBanSamuel() {
  if (chat.style.display === "flex") return;

  chat.style.display = "flex";
  banPoints++;
  banCounter.textContent = `#BanSamuel: ${banPoints}`;

  lanzarMensajes();
}

function lanzarMensajes() {
  let count = 0;

  const interval = setInterval(() => {
    const user = users[Math.floor(Math.random() * users.length)];
    const texto = textosl4d2meme[Math.floor(Math.random() * textosl4d2meme.length)];

    const msg = document.createElement("div");
    msg.className = "chat-msg";
    msg.innerHTML = `<span class="chat-user">${user}:</span> ${texto}`;

    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;

    count++;
    if (count >= 20) clearInterval(interval);
  }, 2500);
}

document.getElementById("unban-btn").addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
      background:black;
      color:#ff4d4d;
      font-size:1.5rem;
      text-align:center;
      font-family:monospace;
    ">
      ❌ ERROR CRÍTICO<br><br>
      Intentar desbanear a Samuel<br>
      provocó un fallo irreversible.
    </div>
  `;

  // Congelar la página
  while (true) {}
});
