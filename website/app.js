import { supabase } from "./supabase.js";

const message = document.getElementById("message");

// =========================
// TRANSLATIONS
// =========================
const translations = {
    en: {
        chooseLanguage: "Choose Language:",
        siteTitle: "NourishDB",

        signupTabBtn: "Family Sign Up",
        proxyTabBtn: "Add Proxy",
        signinTabBtn: "Daily Sign In",

        signupTitle: "Family Sign Up",
        proxyTitle: "Add Proxy",
        signinTitle: "Daily Sign In",

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
        proxyPickupLabel: "Proxy Pickup?",

        proxyFamilyInput: "Family ID",
        proxyNameInput: "Proxy Name",

        visitFamilyInput: "Family ID",
        dateInput: "Date ex: 20260506",
        weightInput: "Total Weight lbs",

        signupSubmitBtn: "Sign Up Family",
        proxySubmitBtn: "Add Proxy",
        visitSubmitBtn: "Submit Daily Visit",

        familySuccess: "Family signed up successfully! Your Family ID is: ",
        proxySuccess: "Proxy added successfully! Proxy ID: ",
        visitSuccess: "Visit submitted successfully! Visit ID: ",

        familyError: "Family signup error: ",
        proxyError: "Proxy error: ",
        visitError: "Visit error: "
    },

    es: {
        chooseLanguage: "Elegir idioma:",
        siteTitle: "NourishDB",

        signupTabBtn: "Registro Familiar",
        proxyTabBtn: "Agregar Proxy",
        signinTabBtn: "Registro Diario",

        signupTitle: "Registro Familiar",
        proxyTitle: "Agregar Proxy",
        signinTitle: "Registro Diario",

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
        proxyPickupLabel: "¿Recogida por Proxy?",

        proxyFamilyInput: "ID Familiar",
        proxyNameInput: "Nombre del Proxy",

        visitFamilyInput: "ID Familiar",
        dateInput: "Fecha ej: 20260506",
        weightInput: "Peso Total en lbs",

        signupSubmitBtn: "Registrar Familia",
        proxySubmitBtn: "Agregar Proxy",
        visitSubmitBtn: "Enviar Visita Diaria",

        familySuccess: "¡Familia registrada exitosamente! Su ID Familiar es: ",
        proxySuccess: "¡Proxy agregado exitosamente! ID del Proxy: ",
        visitSuccess: "¡Visita registrada exitosamente! ID de Visita: ",

        familyError: "Error en registro familiar: ",
        proxyError: "Error de proxy: ",
        visitError: "Error de visita: "
    },

    so: {
        chooseLanguage: "Dooro Luqadda:",
        siteTitle: "NourishDB",

        signupTabBtn: "Diiwaangelinta Qoyska",
        proxyTabBtn: "Ku Dar Wakiil",
        signinTabBtn: "Isdiiwaangelinta Maalinlaha",

        signupTitle: "Diiwaangelinta Qoyska",
        proxyTitle: "Ku Dar Wakiil",
        signinTitle: "Isdiiwaangelinta Maalinlaha",

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
        proxyPickupLabel: "Ma Wakiil baa qaadaya?",

        proxyFamilyInput: "Aqoonsiga Qoyska",
        proxyNameInput: "Magaca Wakiilka",

        visitFamilyInput: "Aqoonsiga Qoyska",
        dateInput: "Taariikh tusaale: 20260506",
        weightInput: "Miisaanka Guud lbs",

        signupSubmitBtn: "Diiwaangeli Qoyska",
        proxySubmitBtn: "Ku Dar Wakiil",
        visitSubmitBtn: "Gudbi Booqashada Maalinlaha",

        familySuccess: "Qoyska si guul leh ayaa loo diiwaangeliyay! Aqoonsiga Qoyska waa: ",
        proxySuccess: "Wakiilka si guul leh ayaa loogu daray! Aqoonsiga Wakiilka: ",
        visitSuccess: "Booqashada si guul leh ayaa loo diiwaangeliyay! Aqoonsiga Booqashada: ",

        familyError: "Khalad diiwaangelinta qoyska: ",
        proxyError: "Khalad wakiilka: ",
        visitError: "Khalad booqashada: "
    }
};

let currentLanguage = "en";

function changeLanguage(language) {
    currentLanguage = language;
    const t = translations[language];

    document.querySelector("label[for='languageSelect']").textContent = t.chooseLanguage;

    document.getElementById("siteTitle").textContent = t.siteTitle;

    document.getElementById("signupTabBtn").textContent = t.signupTabBtn;
    document.getElementById("proxyTabBtn").textContent = t.proxyTabBtn;
    document.getElementById("signinTabBtn").textContent = t.signinTabBtn;

    document.getElementById("signupTitle").textContent = t.signupTitle;
    document.getElementById("proxyTitle").textContent = t.proxyTitle;
    document.getElementById("signinTitle").textContent = t.signinTitle;

    document.getElementById("zipcodeInput").placeholder = t.zipcodeInput;
    document.getElementById("adultsInput").placeholder = t.adultsInput;
    document.getElementById("kidsInput").placeholder = t.kidsInput;
    document.getElementById("seniorsInput").placeholder = t.seniorsInput;
    document.getElementById("phoneInput").placeholder = t.phoneInput;
    document.getElementById("emailInput").placeholder = t.emailInput;
    document.getElementById("languageInput").placeholder = t.languageInput;
    document.getElementById("dietInput").placeholder = t.dietInput;

    document.getElementById("proxyFamilyInput").placeholder = t.proxyFamilyInput;
    document.getElementById("proxyNameInput").placeholder = t.proxyNameInput;

    document.getElementById("visitFamilyInput").placeholder = t.visitFamilyInput;
    document.getElementById("dateInput").placeholder = t.dateInput;
    document.getElementById("weightInput").placeholder = t.weightInput;

    document.getElementById("signupSubmitBtn").textContent = t.signupSubmitBtn;
    document.getElementById("proxySubmitBtn").textContent = t.proxySubmitBtn;
    document.getElementById("visitSubmitBtn").textContent = t.visitSubmitBtn;

    document.getElementById("tfapLabel").childNodes[0].nodeValue = t.tfapLabel + " ";
    document.getElementById("dailyLabel").childNodes[0].nodeValue = t.dailyLabel + " ";
    document.getElementById("proxyPickupLabel").childNodes[0].nodeValue = t.proxyPickupLabel + " ";
}

document.getElementById("languageSelect").addEventListener("change", function () {
    changeLanguage(this.value);
});

// =========================
// TAB SWITCHING
// =========================
window.showTab = function(tabName) {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(tabName).classList.add("active");
};

showTab("signup");
changeLanguage("en");

// =========================
// RANDOM ID GENERATORS
// =========================
function generateFamilyID() {
    return Math.floor(10000000 + Math.random() * 90000000);
}

function generateProxyID() {
    return Math.floor(10000 + Math.random() * 90000);
}

function generateVisitID() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

// =========================
// FAMILY SIGNUP
// 8 DIGIT FAMILY ID
// =========================
document.getElementById("familyForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const generatedFamilyID = generateFamilyID();

    const familyData = {
        familyid: generatedFamilyID,
        zipcode: Number(form.ZipCode.value),
        numadults: Number(form.NumAdults.value),
        numofkids: Number(form.NumOfKids.value),
        numseniors: Number(form.NumSeniors.value),
        eligibility_tfap: form.Eligibility_TFAP.checked,
        annualcertificationdate: Number(
            new Date().toISOString().slice(0, 10).replaceAll("-", "")
        ),
        phone: form.Phone.value,
        email: form.Email.value,
        language: form.Language.value,
        dietaryreq: form.DietaryReq.value,
        isdaily: form.IsDaily.checked
    };

    const { data, error } = await supabase
        .from("family")
        .insert([familyData])
        .select();

    if (error) {
        console.error(error);
        message.textContent = translations[currentLanguage].familyError + error.message;
    } else {
        const familyID = data[0].familyid;

        message.textContent =
            translations[currentLanguage].familySuccess + familyID;

        form.reset();
    }
});

// =========================
// ADD PROXY
// 5 DIGIT PROXY ID
// =========================
document.getElementById("proxyForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const generatedProxyID = generateProxyID();

    const proxyData = {
        proxyid: generatedProxyID,
        familyid: Number(form.FamilyID.value),
        proxyname: form.ProxyName.value
    };

    const { data, error } = await supabase
        .from("proxy")
        .insert([proxyData])
        .select();

    if (error) {
        console.error(error);
        message.textContent = translations[currentLanguage].proxyError + error.message;
    } else {
        const proxyID = data[0].proxyid;

        message.textContent =
            translations[currentLanguage].proxySuccess + proxyID;

        form.reset();
    }
});

// =========================
// DAILY VISIT SIGN-IN
// 10 DIGIT VISIT ID
// =========================
document.getElementById("visitForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const generatedVisitID = generateVisitID();

    const visitData = {
        visitid: generatedVisitID,
        familyid: Number(form.FamilyID.value),
        date: Number(form.Date.value),
        totalweight_lbs: Number(form.TotalWeight_lbs.value),
        proxy: form.Proxy.checked
    };

    const { data, error } = await supabase
        .from("visit")
        .insert([visitData])
        .select();

    if (error) {
        console.error(error);
        message.textContent = translations[currentLanguage].visitError + error.message;
    } else {
        const visitID = data[0].visitid;

        message.textContent =
            translations[currentLanguage].visitSuccess + visitID;

        form.reset();
    }
});

const inventoryForm = document.getElementById("inventoryForm");

if (inventoryForm) {
    console.log("Inventory form found");

    inventoryForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("Inventory form submitted");

        const form = e.target;

        const generatedItemID = Math.floor(100000 + Math.random() * 900000);

        const inventoryData = {
            itemid: generatedItemID,
            itemtype: form["item-name"].value,
            itemquantity: Number(form.quantity.value),
            expirationdate: form["expiration-date"].value
        };

        console.log("Sending inventory data:", inventoryData);

        const { data, error } = await supabase
            .from("inventory")
            .insert([inventoryData])
            .select();

        if (error) {
            console.error("Inventory error:", error);
            alert("Inventory error: " + error.message);
        } else {
            console.log("Inserted inventory row:", data);
            alert("Inventory item added successfully! Item ID: " + data[0].itemid);
            form.reset();
        }
    });
}