import { supabase } from "./supabase.js";

// =========================
// TRANSLATIONS
// =========================
const translations = {
    en: {
        checkinCardTitle: "Daily Check-In",
        checkinCardDesc: "Already registered? Sign in here",
        signupCardTitle: "Family Registration",
        signupCardDesc: "New to our pantry? Register here",
        proxyCardTitle: "Proxy",
        proxyCardDesc: "Picking up for someone else?",

        checkinTitle: "Daily Check-In",
        checkinSearchLabel: "Family ID or Phone Number",
        checkinInputPlaceholder: "Family ID or Phone Number",
        checkinBtn: "Check In",
        notRegisteredText: "Not registered yet?",
        goSignupBtn: "Register your family →",

        signupTitle: "Family Registration",
        zipcodeInput: "Zip Code",
        adultsInput: "Number of Adults",
        kidsInput: "Number of Kids",
        seniorsInput: "Number of Seniors",
        phoneInput: "Phone",
        emailInput: "Email",
        languageInput: "Language",
        dietInput: "Dietary Requirements",
        tfapLabel: "TFAP Eligible?",
        dailyLabel: "Daily Visitor?",
        signupSubmitBtn: "Register Family",

        proxyTitle: "Proxy Pick-Up",
        proxySubtitle: "Picking up for someone else? Enter the family's ID or phone number.",
        proxySearchBtn: "Search",
        proxyListTitle: "Select a Proxy",
        addProxyHeading: "New Proxy",
        addProxySubmitBtn: "Add & Select",

        checkinSuccess: "You're all checked in for today! Thank you.",
        checkinNotFound: "No family found. Check your ID or phone number, or register below.",
        signupSuccess: "Registration complete! Your Family ID is: ",
        proxyNotFound: "No family found. Check the ID or phone number.",
        proxyCheckedIn: "Proxy check-in complete! Thank you.",
        proxyEmpty: "No proxies on file for this family.",
        searching: "Searching...",
    },
    es: {
        checkinCardTitle: "Registro Diario",
        checkinCardDesc: "¿Ya registrado? Ingrese aquí",
        signupCardTitle: "Registro Familiar",
        signupCardDesc: "¿Nuevo en nuestra despensa? Regístrese aquí",
        proxyCardTitle: "Proxy",
        proxyCardDesc: "¿Recogiendo para alguien más?",

        checkinTitle: "Registro Diario",
        checkinSearchLabel: "ID Familiar o Número de Teléfono",
        checkinInputPlaceholder: "ID Familiar o Número de Teléfono",
        checkinBtn: "Registrarse",
        notRegisteredText: "¿Aún no está registrado?",
        goSignupBtn: "Registre su familia →",

        signupTitle: "Registro Familiar",
        zipcodeInput: "Código Postal",
        adultsInput: "Número de Adultos",
        kidsInput: "Número de Niños",
        seniorsInput: "Número de Personas Mayores",
        phoneInput: "Teléfono",
        emailInput: "Correo Electrónico",
        languageInput: "Idioma",
        dietInput: "Requisitos Dietéticos",
        tfapLabel: "¿Elegible para TFAP?",
        dailyLabel: "¿Visitante Diario?",
        signupSubmitBtn: "Registrar Familia",

        proxyTitle: "Recogida por Proxy",
        proxySubtitle: "¿Recogiendo para alguien más? Ingrese el ID familiar o número de teléfono.",
        proxySearchBtn: "Buscar",
        proxyListTitle: "Seleccionar Proxy",
        addProxyHeading: "Nuevo Proxy",
        addProxySubmitBtn: "Agregar y Seleccionar",

        checkinSuccess: "¡Está registrado para hoy! Gracias.",
        checkinNotFound: "No se encontró ninguna familia. Verifique su ID o número de teléfono, o regístrese abajo.",
        signupSuccess: "¡Registro completo! Su ID Familiar es: ",
        proxyNotFound: "No se encontró ninguna familia. Verifique el ID o número de teléfono.",
        proxyCheckedIn: "¡Registro proxy completado! Gracias.",
        proxyEmpty: "No hay proxies registrados para esta familia.",
        searching: "Buscando...",
    },
    so: {
        checkinCardTitle: "Isdiiwaangelinta Maalinlaha",
        checkinCardDesc: "Ma hore u diiwaangelisay? Halkan gal",
        signupCardTitle: "Diiwaangelinta Qoyska",
        signupCardDesc: "Cusub miyaad tahay? Halkan isdiiwaangeli",
        proxyCardTitle: "Wakiil",
        proxyCardDesc: "Ma u qaadanaysaa qof kale?",

        checkinTitle: "Isdiiwaangelinta Maalinlaha",
        checkinSearchLabel: "Aqoonsiga Qoyska ama Telefoonka",
        checkinInputPlaceholder: "Aqoonsiga Qoyska ama Telefoonka",
        checkinBtn: "Gal",
        notRegisteredText: "Ma hore u diiwaangelisay?",
        goSignupBtn: "Diiwaangeli qoyskaaga →",

        signupTitle: "Diiwaangelinta Qoyska",
        zipcodeInput: "Lambarka Boostada",
        adultsInput: "Tirada Dadka Waaweyn",
        kidsInput: "Tirada Carruurta",
        seniorsInput: "Tirada Waayeelka",
        phoneInput: "Telefoon",
        emailInput: "Iimayl",
        languageInput: "Luqad",
        dietInput: "Baahiyaha Cuntada",
        tfapLabel: "Ma u qalmaa TFAP?",
        dailyLabel: "Booqde Maalinle ah?",
        signupSubmitBtn: "Diiwaangeli Qoyska",

        proxyTitle: "Qaadashada Wakiilka",
        proxySubtitle: "Ma u qaadanaysaa qof kale? Geli aqoonsiga qoyska ama lambarka telefoonka.",
        proxySearchBtn: "Raadi",
        proxyListTitle: "Dooro Wakiil",
        addProxyHeading: "Wakiil Cusub",
        addProxySubmitBtn: "Ku Dar oo Dooro",

        checkinSuccess: "Waad diiwaangelantahay maanta! Mahadsanid.",
        checkinNotFound: "Qoys lama helin. Hubi aqoonsigaaga ama lambarka telefoonka, ama hoosta isdiiwaangeli.",
        signupSuccess: "Diiwaangelinta waa la dhameeyay! Aqoonsigaaga Qoyska waa: ",
        proxyNotFound: "Qoys lama helin. Hubi aqoonsiga ama lambarka telefoonka.",
        proxyCheckedIn: "Diiwaangelinta wakiilka waa la dhameeyay! Mahadsanid.",
        proxyEmpty: "Wakiil laguma diiwaangelinin qoyskan.",
        searching: "Raadinaya...",
    }
};

let currentLanguage = "en";
function tr(key) { return translations[currentLanguage][key] || translations.en[key] || key; }

function applyTranslations() {
    const ids = [
        "checkinCardTitle","checkinCardDesc","signupCardTitle","signupCardDesc",
        "proxyCardTitle","proxyCardDesc","checkinTitle","checkinSearchLabel",
        "checkinBtn","notRegisteredText","goSignupBtn","signupTitle",
        "signupSubmitBtn","proxyTitle","proxySubtitle","proxySearchBtn",
        "proxyListTitle","addProxyHeading","addProxySubmitBtn"
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = tr(id);
    });
    const ci = document.getElementById("checkinInput");
    if (ci) ci.placeholder = tr("checkinInputPlaceholder");

    const placeholders = {
        zipcodeInput: "zipcodeInput", adultsInput: "adultsInput",
        kidsInput: "kidsInput", seniorsInput: "seniorsInput",
        phoneInput: "phoneInput", emailInput: "emailInput",
        languageInput: "languageInput", dietInput: "dietInput"
    };
    Object.entries(placeholders).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el) el.placeholder = tr(key);
    });

    const tfap = document.getElementById("tfapLabelText");
    if (tfap) tfap.textContent = tr("tfapLabel");
    const daily = document.getElementById("dailyLabelText");
    if (daily) daily.textContent = tr("dailyLabel");
}

document.getElementById("languageSelect")?.addEventListener("change", function () {
    currentLanguage = this.value;
    applyTranslations();
});
applyTranslations();

// =========================
// SCREEN NAVIGATION
// =========================
const SCREENS = ["homeScreen","checkinScreen","signupScreen","proxyScreen"];

window.showScreen = function (id) {
    SCREENS.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = "none";
    });
    const target = document.getElementById(id);
    if (target) target.style.display = "block";
    document.querySelectorAll(".screen-message").forEach(el => {
        el.textContent = "";
        el.className = "screen-message";
    });
};

// Proxy screen back button — resets proxy state before going home
document.querySelector(".proxy-back")?.addEventListener("click", () => {
    resetProxyState();
    showScreen("homeScreen");
});

// =========================
// HELPERS
// =========================
function generateFamilyID() { return Math.floor(10000000 + Math.random() * 90000000); }
function generateProxyID()  { return Math.floor(10000 + Math.random() * 90000); }
function generateVisitID()  { return Math.floor(1000000000 + Math.random() * 9000000000); }
function todayAsInt()       { return Number(new Date().toISOString().slice(0,10).replaceAll("-","")); }

function setMsg(id, text, type) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = "screen-message" + (type ? " " + type : "");
}

async function searchFamily(rawInput) {
    const digits = rawInput.replace(/\D/g, "");
    if (!digits) return null;

    // 8 digits or fewer → try as Family ID first
    if (digits.length <= 8) {
        const { data } = await supabase
            .from("family").select("*")
            .eq("familyid", Number(digits))
            .maybeSingle();
        if (data) return data;
    }

    // Try exact phone match (sanitized digits)
    const { data: exact } = await supabase
        .from("family").select("*")
        .eq("phone", digits)
        .limit(1);
    if (exact?.length) return exact[0];

    // Try phone stored in any format (contains the digit string)
    const { data: like } = await supabase
        .from("family").select("*")
        .ilike("phone", `%${digits}%`)
        .limit(1);
    return like?.[0] || null;
}

async function recordVisit(familyId, isProxy = false) {
    const { error } = await supabase.from("visit").insert([{
        visitid: generateVisitID(),
        familyid: familyId,
        date: todayAsInt(),
        totalweight_lbs: null,
        proxy: isProxy
    }]);
    return !error;
}

// =========================
// DAILY CHECK-IN
// =========================
document.getElementById("checkinForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg("checkinMessage", tr("searching"), "");

    const family = await searchFamily(e.target.SearchInput.value.trim());
    if (!family) {
        setMsg("checkinMessage", tr("checkinNotFound"), "error");
        return;
    }

    const ok = await recordVisit(family.familyid, false);
    if (ok) {
        setMsg("checkinMessage", tr("checkinSuccess"), "success");
        e.target.reset();
    } else {
        setMsg("checkinMessage", "Error recording visit. Please try again.", "error");
    }
});

// =========================
// FAMILY REGISTRATION
// =========================
document.getElementById("familyForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const newID = generateFamilyID();

    const { data, error } = await supabase
        .from("family")
        .insert([{
            familyid: newID,
            zipcode: Number(form.ZipCode.value),
            numadults: Number(form.NumAdults.value),
            numofkids: Number(form.NumOfKids.value),
            numseniors: Number(form.NumSeniors.value),
            eligibility_tfap: form.Eligibility_TFAP.checked,
            annualcertificationdate: todayAsInt(),
            phone: form.Phone.value,
            email: form.Email.value,
            language: form.Language.value,
            dietaryreq: form.DietaryReq.value,
            isdaily: form.IsDaily.checked
        }])
        .select()
        .single();

    if (error) {
        setMsg("signupMessage", "Registration error: " + error.message, "error");
        return;
    }

    // Auto check-in on first registration
    await recordVisit(data.familyid, false);

    setMsg("signupMessage", tr("signupSuccess") + data.familyid, "success");
    form.reset();

    // Redirect to check-in after 2 seconds with confirmation message
    setTimeout(() => {
        showScreen("checkinScreen");
        setMsg("checkinMessage", tr("signupSuccess") + data.familyid + "  —  " + tr("checkinSuccess"), "success");
    }, 2000);
});

// =========================
// PROXY FLOW
// =========================
let currentProxyFamilyId = null;

function resetProxyState() {
    currentProxyFamilyId = null;
    document.getElementById("proxyListSection").style.display = "none";
    document.getElementById("addProxySection").style.display = "none";
    document.getElementById("proxySearchForm")?.reset();
    document.getElementById("addProxyForm")?.reset();
}

document.getElementById("proxySearchForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg("proxyMessage", tr("searching"), "");
    document.getElementById("proxyListSection").style.display = "none";
    document.getElementById("addProxySection").style.display = "none";

    const family = await searchFamily(e.target.SearchInput.value.trim());
    if (!family) {
        setMsg("proxyMessage", tr("proxyNotFound"), "error");
        return;
    }

    currentProxyFamilyId = family.familyid;
    setMsg("proxyMessage", "", "");
    await renderProxyList(family.familyid);
});

async function renderProxyList(familyId) {
    const { data: proxies } = await supabase
        .from("proxy").select("*")
        .eq("familyid", familyId);

    const listEl = document.getElementById("proxyList");
    listEl.innerHTML = "";

    if (proxies?.length) {
        proxies.forEach(proxy => {
            const btn = document.createElement("button");
            btn.className = "proxy-select-btn";
            btn.textContent = proxy.proxyname;
            btn.onclick = () => completeProxyCheckin(proxy.proxyname);
            listEl.appendChild(btn);
        });
    } else {
        const note = document.createElement("p");
        note.className = "proxy-empty-note";
        note.textContent = tr("proxyEmpty");
        listEl.appendChild(note);
    }

    document.getElementById("proxyListTitle").textContent = tr("proxyListTitle");
    document.getElementById("proxyListSection").style.display = "block";
}

async function completeProxyCheckin(proxyName) {
    const ok = await recordVisit(currentProxyFamilyId, true);
    if (ok) {
        setMsg("proxyMessage", `${proxyName} — ` + tr("proxyCheckedIn"), "success");
        resetProxyState();
    } else {
        setMsg("proxyMessage", "Error recording visit. Please try again.", "error");
    }
}

window.toggleAddProxy = function () {
    const sec = document.getElementById("addProxySection");
    sec.style.display = sec.style.display === "none" ? "block" : "none";
};

document.getElementById("addProxyForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentProxyFamilyId) return;

    const name = e.target.ProxyName.value.trim();
    const { error } = await supabase.from("proxy").insert([{
        proxyid: generateProxyID(),
        familyid: currentProxyFamilyId,
        proxyname: name
    }]);

    if (error) {
        setMsg("proxyMessage", "Error adding proxy: " + error.message, "error");
        return;
    }

    await completeProxyCheckin(name);
});

// =========================
// INVENTORY FORM (shared across pages)
// =========================
const inventoryForm = document.getElementById("inventoryForm");
if (inventoryForm) {
    inventoryForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const { data, error } = await supabase
            .from("inventory")
            .insert([{
                itemid: Math.floor(100000 + Math.random() * 900000),
                itemtype: form["item-name"].value,
                itemquantity: Number(form.quantity.value),
                expirationdate: form["expiration-date"].value
            }])
            .select();

        if (error) {
            alert("Inventory error: " + error.message);
        } else {
            alert("Inventory item added! Item ID: " + data[0].itemid);
            form.reset();
        }
    });
}
