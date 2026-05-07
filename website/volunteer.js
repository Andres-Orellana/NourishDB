import { supabase } from "./supabase.js";

let currentVolunteer = null;

const authSection = document.getElementById("authSection");
const dashboardSection = document.getElementById("dashboardSection");
const messageEl = document.getElementById("message");

function generateVolID() {
    return Math.floor(100000 + Math.random() * 900000);
}

function generateLogID() {
    return Math.floor(10000000 + Math.random() * 90000000);
}

function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = type;
}

// =========================
// TAB SWITCHING (AUTH)
// =========================
window.showAuthTab = function(tabName) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");
};

showAuthTab("signinTab");

// =========================
// VOLUNTEER SIGN IN
// =========================
document.getElementById("volSigninForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const volID = Number(e.target.VolID.value);

    const { data, error } = await supabase
        .from("volunteers")
        .select("*")
        .eq("volid", volID)
        .single();

    if (error || !data) {
        showMessage("Volunteer ID not found. Check your ID or sign up for a new account.", "error");
    } else {
        currentVolunteer = data;
        showDashboard();
    }
});

// =========================
// VOLUNTEER SIGN UP
// =========================
document.getElementById("volSignupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const volID = generateVolID();

    const volunteerData = {
        volid: volID,
        name: form.Name.value,
        totalhours: 0,
        phone: form.Phone.value,
        email: form.Email.value
    };

    const { data, error } = await supabase
        .from("volunteers")
        .insert([volunteerData])
        .select()
        .single();

    if (error) {
        showMessage("Sign up error: " + error.message, "error");
    } else {
        currentVolunteer = data;
        showDashboard();
        document.getElementById("message").textContent =
            "Welcome, " + currentVolunteer.name + "! Your Volunteer ID is: " + currentVolunteer.volid + " — write this down to sign in next time.";
        document.getElementById("message").className = "success";
    }
});

// =========================
// ADD HOURS
// =========================
document.getElementById("hoursForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const hours = Number(form.Hours.value);
    const logID = generateLogID();

    const { error: logError } = await supabase
        .from("volunteerwork")
        .insert([{
            logid: logID,
            volid: currentVolunteer.volid,
            workdate: form.WorkDate.value,
            hours: hours
        }]);

    if (logError) {
        document.getElementById("message").textContent = "Error logging hours: " + logError.message;
        document.getElementById("message").className = "error";
        return;
    }

    const newTotal = (currentVolunteer.totalhours || 0) + hours;

    const { data: updatedVol, error: updateError } = await supabase
        .from("volunteers")
        .update({ totalhours: newTotal })
        .eq("volid", currentVolunteer.volid)
        .select()
        .single();

    if (updateError) {
        document.getElementById("message").textContent = "Hours logged but total not updated: " + updateError.message;
        document.getElementById("message").className = "error";
    } else {
        currentVolunteer = updatedVol;
        document.getElementById("totalhoursDisplay").textContent = currentVolunteer.totalhours;
        document.getElementById("message").textContent = "Hours added successfully!";
        document.getElementById("message").className = "success";
        form.reset();
        loadHoursLog();
    }
});

// =========================
// LOAD HOURS LOG
// =========================
async function loadHoursLog() {
    const { data, error } = await supabase
        .from("volunteerwork")
        .select("*")
        .eq("volid", currentVolunteer.volid)
        .order("workdate", { ascending: false })
        .limit(10);

    const tbody = document.getElementById("hoursLogBody");
    tbody.innerHTML = "";

    if (error || !data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2" style="color:#aaa; text-align:center;">No hours logged yet.</td></tr>';
        return;
    }

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row.workdate}</td><td>${row.hours}</td>`;
        tbody.appendChild(tr);
    });
}

// =========================
// SHOW DASHBOARD
// =========================
function showDashboard() {
    authSection.style.display = "none";
    dashboardSection.style.display = "block";
    document.getElementById("volName").textContent = currentVolunteer.name;
    document.getElementById("volIDDisplay").textContent = currentVolunteer.volid;
    document.getElementById("totalhoursDisplay").textContent = currentVolunteer.totalhours || 0;
    loadHoursLog();
}

// =========================
// SIGN OUT
// =========================
window.signOut = function() {
    currentVolunteer = null;
    dashboardSection.style.display = "none";
    authSection.style.display = "block";
    document.getElementById("message").textContent = "";
    document.getElementById("volSigninForm").reset();
    document.getElementById("volSignupForm").reset();
    showAuthTab("signinTab");
};
