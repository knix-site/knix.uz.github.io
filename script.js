/* ===== USER TEKSHIRUV ===== */
const user = JSON.parse(localStorage.getItem("user"));

if (!user && !location.pathname.includes("register")) {
    location.href = "register.html";
}

/* ===== ASOSIY SAHIFA ===== */
const main = document.getElementById("mainContent");
const welcome = document.getElementById("welcomeText");

if (user && main) {
    main.style.display = "block";
    welcome.textContent =
        `Xush kelibsiz, ${user.ism} ${user.familiya} (${user.viloyat})`;
}

/* ===== DARK MODE ===== */
const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (toggle) toggle.textContent = "☀️";
}

if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            toggle.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            toggle.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
}

/* ===== RO‘YXATDAN O‘TISH ===== */
function register() {
    const ism = document.getElementById("ism").value.trim();
    const familiya = document.getElementById("familiya").value.trim();
    const viloyat = document.getElementById("viloyat").value.trim();

    if (!ism || !familiya || !viloyat) {
        alert("Iltimos barcha maydonlarni to‘ldiring!");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ ism, familiya, viloyat }));
    location.href = "index.html";
}
/* === KIRISH / MALUMOT YANGILASH === */
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        // localStorage'dagi eski ma'lumot qoladi, lekin foydalanuvchi ularni o'zgartirishi mumkin
        location.href = "register.html";
    });
}

/* ===== YULDUZLAR (ANIMATSIYA) ===== */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const stars = [];
const STAR_COUNT = 150;

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25
    });
}

function drawStars() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";
    for (let s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;
    }
    requestAnimationFrame(drawStars);
}

drawStars();
window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

/* ===== BUTTON RIPPLE ===== */
document.querySelectorAll(".btn.primary").forEach(btn => {
    btn.addEventListener("click", e => {
        const span = document.createElement("span");
        span.style.left = e.offsetX + "px";
        span.style.top = e.offsetY + "px";
        btn.appendChild(span);
        setTimeout(() => span.remove(), 600);
    });
});

// DARK MODE – faqat tungi
document.body.classList.add("dark");

/* Foydalanuvchi ma’lumotlarini olish */
const userData = JSON.parse(localStorage.getItem("user"));

if (userData) {
    // avatarni bosh harflari bilan to‘ldirish
    const avatar = document.getElementById("userAvatar");
    if (avatar) {
        const ismBosh = userData.ism.charAt(0);
        const famBosh = userData.familiya.charAt(0);
        avatar.textContent = ismBosh + famBosh;
        avatar.title = `${userData.ism} ${userData.familiya}`;
    }

    // welcome textni yangilash
    const welcome = document.getElementById("welcomeText");
    if (welcome) {
        welcome.textContent = `Xush kelibsiz, ${userData.ism} ${userData.familiya} (${userData.viloyat})`;
    }
}

const startTestBtn = document.getElementById("startTestBtn");
if(startTestBtn){
    startTestBtn.addEventListener("click", (e)=>{
        e.preventDefault(); // brauzer default actionni to‘xtatadi
        // foydalanuvchi ro‘yxatdan o‘tganmi tekshirish mumkin
        const userData = JSON.parse(localStorage.getItem("user"));
        if(!userData){
            alert("Iltimos avval ro‘yxatdan o‘ting!");
            location.href = "register.html";
            return;
        }
        // test.html ga o‘tish
        location.href = "test.html";
    });
}


//ro'yxatdan o'tish ID
