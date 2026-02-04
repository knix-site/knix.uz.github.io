/********************************
 * 0️⃣ RASCH TABLE
 ********************************/
const RASCH_TABLE = [
    { correct: 30, score: 75 },
    { correct: 29.54, score: 64 },
    { correct: 29.08, score: 63 },
    { correct: 28.62, score: 62 },
    { correct: 28.15, score: 61 },
    { correct: 27.69, score: 60 },
    { correct: 27.23, score: 59 },
    { correct: 26.77, score: 58 },
    { correct: 26.31, score: 57 },
    { correct: 25.85, score: 56 },
    { correct: 25.38, score: 55 },
    { correct: 24.92, score: 54 },
    { correct: 24.46, score: 53 },
    { correct: 24.00, score: 52 },
    { correct: 23.54, score: 51 },
    { correct: 23.08, score: 50 },
    { correct: 22.62, score: 49 },
    { correct: 22.15, score: 48 },
    { correct: 21.69, score: 47 },
    { correct: 21.23, score: 46 },
    { correct: 20.77, score: 45 }
];

function getRaschScore(correct) {
    for (let r of RASCH_TABLE) {
        if (correct >= r.correct) return r.score;
    }
    return 0;
}

/********************************
 * 1️⃣ TEST CONFIG
 ********************************/
const TEST_CONFIG = {
    id: "mock_39",
    name: "39-MOCK TEST",
    answers: {
        q1:"A",q2:"C",q3:"B",q4:"D",q5:"A",
        q6:"B",q7:"D",q8:"C",q9:"A",q10:"B",
        q11:"C",q12:"D",q13:"A",q14:"B",q15:"C",
        q16:"D",q17:"A",q18:"C",q19:"B",q20:"D",
        q21:"A",q22:"B",q23:"C",q24:"D",q25:"A",
        q26:"B",q27:"C",q28:"D",q29:"A",q30:"B",
        q31:"C",q32:"D",q33:"E",q34:"F",q35:"A"
    }
};

/********************************
 * 2️⃣ TELEGRAM ID (URL dan olish)
 ********************************/
const params = new URLSearchParams(window.location.search);
const tgId = params.get("tg_id");

if (tgId) localStorage.setItem("telegram_user_id", tgId);
const USER_ID = localStorage.getItem("telegram_user_id");

/********************************
 * 3️⃣ QAYTA TOPSHIRISHNI BLOKLASH
 ********************************/
let STORAGE_KEY = null;

if (USER_ID) {
    STORAGE_KEY = `test_${TEST_CONFIG.id}_${USER_ID}`;
    if (localStorage.getItem(STORAGE_KEY)) {
        document.body.innerHTML = `
            <div style="text-align:center;margin-top:120px">
                <h2 style="color:#0ff">❌ Siz bu testni allaqachon topshirgansiz</h2>
                <p>Natijalar Telegram bot orqali yuboriladi</p>
            </div>
        `;
    }
}

/********************************
 * 4️⃣ SAVOLLARNI YARATISH (1–35)
 ********************************/
const questionsDiv = document.getElementById("questions");

for (let i = 1; i <= 35; i++) {
    const q = document.createElement("div");
    q.className = "question";
    q.id = `q${i}`;
    q.tabIndex = 0;

    const opts = i >= 33 ? ["A","B","C","D","E","F"] : ["A","B","C","D"];

    q.innerHTML = `
        <p>${i}</p>
        <div class="options">
            ${opts.map(o => `
                <label>
                    <input type="radio" name="q${i}" value="${o}"> ${o}
                </label>
            `).join("")}
        </div>
    `;
    questionsDiv.appendChild(q);
}

/********************************
 * 5️⃣ TANLASH (CLICK + KEYBOARD)
 ********************************/
document.querySelectorAll(".question").forEach(q => {
    const radios = q.querySelectorAll("input[type=radio]");

    radios.forEach(r => {
        r.addEventListener("change", () => {
            q.querySelectorAll("label").forEach(l => l.classList.remove("selected"));
            r.parentElement.classList.add("selected");
        });
    });

    q.addEventListener("keydown", e => {
        const key = e.key.toUpperCase();
        radios.forEach(r => {
            if (r.value === key) {
                r.checked = true;
                r.dispatchEvent(new Event("change"));
            }
        });
    });
});

/********************************
 * 6️⃣ MATHLIVE INPUT (ochiq savollar bo‘lsa)
 ********************************/
document.querySelectorAll(".open-input").forEach(inp => {
    const mf = document.createElement("math-field");
    mf.className = "open-input";
    mf.setAttribute("virtual-keyboard-mode","onfocus");
    mf.placeholder = inp.placeholder;
    inp.replaceWith(mf);
});

/********************************
 * 7️⃣ TESTNI TOPSHIRISH + HISOBLASH
 ********************************/
const form = document.getElementById("testForm");

form.addEventListener("submit", e => {
    e.preventDefault();

    if (!USER_ID) {
        alert("Telegram bot orqali kiring!");
        window.location.href = "https://t.me/knix_uz_bot";
        return;
    }

    let correct = 0;
    const userAnswers = {};

    document.querySelectorAll("input[type=radio]:checked").forEach(r => {
        userAnswers[r.name] = r.value;
        if (TEST_CONFIG.answers[r.name] === r.value) correct++;
    });

    const raschScore = getRaschScore(correct);

    const result = {
        telegram_id: USER_ID,
        test_id: TEST_CONFIG.id,
        test_name: TEST_CONFIG.name,
        correct_answers: correct,
        rasch_score: raschScore,
        answers: userAnswers,
        submitted_at: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));

    // 🔥 BOTGA YUBORISH (admin chatga)
    fetch("https://api.telegram.org/bot7158741814:AAHg6vtyAP5xsokEoixfekpiLDjpCWSikSo/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        chat_id: 7581895473,
        text: JSON.stringify(result, null, 2)
    })
});
    document.getElementById("submitModal").style.display = "flex";
});

/********************************
 * 8️⃣ BOSH SAHIFA
 ********************************/
function goHome() {
    window.location.href = "/";
}
