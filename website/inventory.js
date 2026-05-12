import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jsojlyeytbbloivlappf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb2pseWV5dGJibG9pdmxhcHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NjA0NzIsImV4cCI6MjA5MzIzNjQ3Mn0.zUGdfz12ZobVxDNEcbL_JXt85_lIecVVAI-AE-ILBNU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CATEGORIES = {
    "Cereal":        ["Corn Flakes", "Cheerios", "Oatmeal", "Granola", "Rice Krispies", "Other Cereal"],
    "Meat":          ["Chicken", "Ground Beef", "Pork", "Turkey", "Canned Fish", "Other Meat"],
    "Fruit":         ["Apples", "Bananas", "Oranges", "Mixed Fruit", "Canned Fruit", "Other Fruit"],
    "Vegetables":    ["Carrots", "Broccoli", "Potatoes", "Leafy Greens", "Canned Vegetables", "Other Vegetables"],
    "Dairy":         ["Milk", "Cheese", "Yogurt", "Eggs", "Other Dairy"],
    "Bread & Grains":["White Bread", "Wheat Bread", "Rice", "Pasta", "Tortillas", "Other Grains"],
    "Canned Goods":  ["Canned Beans", "Canned Soup", "Canned Tomatoes", "Canned Corn", "Other Canned"],
    "Snacks":        ["Chips", "Crackers", "Cookies", "Granola Bars", "Other Snacks"]
};

// ── Tab switching ──────────────────────────────────────────────
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        const tab = document.getElementById(btn.dataset.tab);
        tab.classList.add("active");
        if (btn.dataset.tab === "add-item")          loadSourcesIntoSelect("source");
        if (btn.dataset.tab === "log-rescue")        loadSourcesIntoDropdown();
        if (btn.dataset.tab === "view-rescues")      loadRescueLog();
        if (btn.dataset.tab === "daily-log")         loadDailyLog();
        if (btn.dataset.tab === "current-inventory") loadCurrentInventory();
    });
});

async function loadSourcesIntoSelect(selectId) {
    const sel = document.getElementById(selectId);
    const { data, error } = await supabase.from("source").select("sourceid, sourcename").order("sourcename");
    if (error || !data?.length) { sel.innerHTML = "<option value=''>No sources found</option>"; return; }
    sel.innerHTML = "<option value=''>Select a source...</option>" +
        data.map(s => `<option value="${s.sourceid}">${s.sourcename}</option>`).join("");
}

loadSourcesIntoSelect("source");

// ── Add Item ───────────────────────────────────────────────────
document.getElementById("inventoryForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const generatedItemID = Math.floor(100000 + Math.random() * 900000);
    const { data, error } = await supabase.from("inventory").insert([{
        itemid: generatedItemID,
        itemtype: form["item-name"].value,
        itemquantity: 0
    }]).select();
    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Item added! ID: " + data[0].itemid);
        form.reset();
    }
});

// ── Daily Count ────────────────────────────────────────────────
const today = new Date().toISOString().split("T")[0];
document.getElementById("countDateLabel").textContent = "Date: " + today;

let dailyMode = "start";

document.getElementById("startOfDayBtn").addEventListener("click", () => {
    dailyMode = "start";
    document.getElementById("startOfDayBtn").classList.add("active");
    document.getElementById("endOfDayBtn").classList.remove("active");
    document.getElementById("countModeLabel").textContent = "Enter quantities at the beginning of the day.";
});

document.getElementById("endOfDayBtn").addEventListener("click", () => {
    dailyMode = "end";
    document.getElementById("endOfDayBtn").classList.add("active");
    document.getElementById("startOfDayBtn").classList.remove("active");
    document.getElementById("countModeLabel").textContent = "Enter quantities remaining at the end of the day.";
});

const categoryGrid    = document.getElementById("categoryGrid");
const categoryView    = document.getElementById("category-view");
const itemView        = document.getElementById("item-view");
const itemList        = document.getElementById("itemList");
const selectedCatTitle = document.getElementById("selectedCategoryTitle");

Object.keys(CATEGORIES).forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = cat;
    btn.addEventListener("click", () => openDailyCategory(cat));
    categoryGrid.appendChild(btn);
});

const newItemsDailyBtn = document.createElement("button");
newItemsDailyBtn.className = "category-btn new-items-btn";
newItemsDailyBtn.textContent = "New Items";
newItemsDailyBtn.addEventListener("click", () => openDailyCategory("New Items"));
categoryGrid.appendChild(newItemsDailyBtn);

const ALL_PRESET_ITEMS = new Set(Object.values(CATEGORIES).flat());
let currentDailyCategory = null;

async function fetchNewInventoryItems() {
    const { data, error } = await supabase.from("inventory").select("itemid, itemtype");
    if (error || !data) return [];
    return data.filter(i => !ALL_PRESET_ITEMS.has(i.itemtype));
}

async function openDailyCategory(category) {
    currentDailyCategory = category;
    selectedCatTitle.textContent = category;
    itemList.innerHTML = "";

    if (category === "New Items") {
        itemList.innerHTML = "<p class='loading-msg'>Loading items...</p>";
        categoryView.classList.add("hidden");
        itemView.classList.remove("hidden");
        const newItems = await fetchNewInventoryItems();
        itemList.innerHTML = "";
        if (!newItems.length) {
            itemList.innerHTML = "<p class='empty-msg'>No new items yet. Add items using the Add Item tab.</p>";
            return;
        }
        newItems.forEach(({ itemtype }) => {
            const row = document.createElement("div");
            row.className = "item-row";
            row.innerHTML = `<label>${itemtype}</label>
                <input type="number" min="0" placeholder="0" data-item="${itemtype}" data-category="New Items" />`;
            itemList.appendChild(row);
        });
    } else {
        CATEGORIES[category].forEach(item => {
            const row = document.createElement("div");
            row.className = "item-row";
            row.innerHTML = `<label>${item}</label>
                <input type="number" min="0" placeholder="0" data-item="${item}" data-category="${category}" />`;
            itemList.appendChild(row);
        });
        categoryView.classList.add("hidden");
        itemView.classList.remove("hidden");
    }
}

document.getElementById("backToCategories").addEventListener("click", () => {
    itemView.classList.add("hidden");
    categoryView.classList.remove("hidden");
});

document.getElementById("submitCount").addEventListener("click", async () => {
    const updates = [];
    itemList.querySelectorAll("input[type=number]").forEach(input => {
        if (input.value === "") return;
        const qty = parseInt(input.value);
        if (!isNaN(qty) && qty >= 0) updates.push({ item_name: input.dataset.item, quantity: qty });
    });
    if (updates.length === 0) { alert("Please enter at least one quantity."); return; }

    const todayInt = parseInt(today.replace(/-/g, ""));
    let failed = false;

    for (const u of updates) {
        // Get or create inventory item
        const { data: existing, error: fetchErr } = await supabase
            .from("inventory").select("itemid, itemquantity").eq("itemtype", u.item_name).maybeSingle();
        if (fetchErr) { alert("Error: " + fetchErr.message); failed = true; break; }

        let itemId;
        if (existing) {
            itemId = existing.itemid;
            const { error: upErr } = await supabase.from("inventory")
                .update({ itemquantity: u.quantity }).eq("itemid", itemId);
            if (upErr) { alert("Error: " + upErr.message); failed = true; break; }
        } else {
            itemId = Math.floor(100000 + Math.random() * 900000);
            const { error: inErr } = await supabase.from("inventory")
                .insert([{ itemid: itemId, itemtype: u.item_name, itemquantity: u.quantity }]);
            if (inErr) { alert("Error: " + inErr.message); failed = true; break; }
        }

        // Find today's DailyStock entry for this item
        const { data: stockEntry, error: stockFetchErr } = await supabase
            .from("dailystock")
            .select("logid, totalquantitystart")
            .eq("itemid", itemId)
            .eq("date", todayInt)
            .maybeSingle();
        if (stockFetchErr) { alert("Error: " + stockFetchErr.message); failed = true; break; }

        if (dailyMode === "start") {
            if (stockEntry) {
                const { error: stockUpErr } = await supabase.from("dailystock")
                    .update({ totalquantitystart: u.quantity })
                    .eq("logid", stockEntry.logid);
                if (stockUpErr) { alert("Error: " + stockUpErr.message); failed = true; break; }
            } else {
                const { error: stockInErr } = await supabase.from("dailystock")
                    .insert([{ logid: Math.floor(100000 + Math.random() * 900000), itemid: itemId, date: todayInt, totalquantitystart: u.quantity }]);
                if (stockInErr) { alert("Error: " + stockInErr.message); failed = true; break; }
            }
        } else {
            // End of day: calculate taken = start - end (null if no start was recorded)
            const startQty = stockEntry?.totalquantitystart ?? null;
            const taken = startQty !== null ? Math.max(0, startQty - u.quantity) : null;
            if (stockEntry) {
                const { error: stockUpErr } = await supabase.from("dailystock")
                    .update({ totalquantityend: u.quantity, dailytotaltaken: taken })
                    .eq("logid", stockEntry.logid);
                if (stockUpErr) { alert("Error: " + stockUpErr.message); failed = true; break; }
            } else {
                const { error: stockInErr } = await supabase.from("dailystock")
                    .insert([{ logid: Math.floor(100000 + Math.random() * 900000), itemid: itemId, date: todayInt, totalquantityend: u.quantity }]);
                if (stockInErr) { alert("Error: " + stockInErr.message); failed = true; break; }
            }
        }
    }

    if (!failed) {
        const modeLabel = dailyMode === "start" ? "Start of Day" : "End of Day";
        alert(`${modeLabel} count saved!`);
        itemList.querySelectorAll("input").forEach(i => i.value = "");
        itemView.classList.add("hidden");
        categoryView.classList.remove("hidden");
    }
});

// ── Add Source ─────────────────────────────────────────────────
document.getElementById("sourceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("source-name").value.trim();
    const isRescue = document.getElementById("is-rescue-source").checked;
    const newId = Math.floor(100000 + Math.random() * 900000);
    const { error } = await supabase.from("source").insert([{ sourceid: newId, sourcename: name, isrescue: isRescue }]);
    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Source \"" + name + "\" added!");
        e.target.reset();
    }
});

// ── Log Rescue ─────────────────────────────────────────────────
let currentRescue = { sourceId: null, sourceName: null, date: null };

async function loadSourcesIntoDropdown() {
    const sel = document.getElementById("rescue-source");
    const { data, error } = await supabase.from("source").select("sourceid, sourcename").order("sourcename");
    if (error || !data?.length) {
        sel.innerHTML = "<option value=''>No sources found</option>";
        return;
    }
    sel.innerHTML = "<option value=''>Select a source...</option>" +
        data.map(s => `<option value="${s.sourceid}" data-name="${s.sourcename}">${s.sourcename}</option>`).join("");
}

document.getElementById("rescue-date").value = today;

document.getElementById("rescueNext").addEventListener("click", () => {
    const sel = document.getElementById("rescue-source");
    const date = document.getElementById("rescue-date").value;
    if (!sel.value || !date) { alert("Please select a source and date."); return; }
    const opt = sel.options[sel.selectedIndex];
    currentRescue = { sourceId: sel.value, sourceName: opt.dataset.name, date };
    document.getElementById("rescueSourceLabel").textContent = opt.dataset.name;
    document.getElementById("rescueDateLabel").textContent = date;
    buildRescueCategoryGrid();
    document.getElementById("rescue-step1").classList.add("hidden");
    document.getElementById("rescue-step2").classList.remove("hidden");
});

let currentRescueCategory = null;

function buildRescueCategoryGrid() {
    const grid = document.getElementById("rescueCategoryGrid");
    grid.innerHTML = "";
    Object.keys(CATEGORIES).forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "category-btn";
        btn.textContent = cat;
        btn.addEventListener("click", () => openRescueCategory(cat));
        grid.appendChild(btn);
    });
    const newBtn = document.createElement("button");
    newBtn.className = "category-btn new-items-btn";
    newBtn.textContent = "New Items";
    newBtn.addEventListener("click", () => openRescueCategory("New Items"));
    grid.appendChild(newBtn);
}

async function openRescueCategory(category) {
    currentRescueCategory = category;
    document.getElementById("rescueCategoryTitle").textContent = category;
    const list = document.getElementById("rescueItemList");
    list.innerHTML = "";

    if (category === "New Items") {
        list.innerHTML = "<p class='loading-msg'>Loading items...</p>";
        document.getElementById("rescue-step2").classList.add("hidden");
        document.getElementById("rescue-step3").classList.remove("hidden");
        const newItems = await fetchNewInventoryItems();
        list.innerHTML = "";
        if (!newItems.length) {
            list.innerHTML = "<p class='empty-msg'>No new items yet. Add items using the Add Item tab.</p>";
            return;
        }
        newItems.forEach(({ itemtype }) => {
            const row = document.createElement("div");
            row.className = "item-row rescue-row";
            row.innerHTML = `
                <label>${itemtype}</label>
                <input type="number" min="0" placeholder="0" data-item="${itemtype}" data-category="New Items" data-field="qty" />
                <input type="number" min="0" step="0.1" placeholder="0.0" data-item="${itemtype}" data-category="New Items" data-field="weight" />`;
            list.appendChild(row);
        });
    } else {
        CATEGORIES[category].forEach(item => {
            const row = document.createElement("div");
            row.className = "item-row rescue-row";
            row.innerHTML = `
                <label>${item}</label>
                <input type="number" min="0" placeholder="0" data-item="${item}" data-category="${category}" data-field="qty" />
                <input type="number" min="0" step="0.1" placeholder="0.0" data-item="${item}" data-category="${category}" data-field="weight" />`;
            list.appendChild(row);
        });
        document.getElementById("rescue-step2").classList.add("hidden");
        document.getElementById("rescue-step3").classList.remove("hidden");
    }
}

document.getElementById("backToRescueCategories").addEventListener("click", () => {
    document.getElementById("rescue-step3").classList.add("hidden");
    document.getElementById("rescue-step2").classList.remove("hidden");
});

document.getElementById("startNewRescue").addEventListener("click", () => {
    currentRescue = { sourceId: null, sourceName: null, date: null };
    currentRescueCategory = null;
    document.getElementById("rescue-source").value = "";
    document.getElementById("rescue-date").value = today;
    document.getElementById("rescue-step2").classList.add("hidden");
    document.getElementById("rescue-step1").classList.remove("hidden");
});

document.getElementById("submitRescueCategory").addEventListener("click", async () => {
    const list = document.getElementById("rescueItemList");
    const entries = [];

    list.querySelectorAll(".rescue-row").forEach(row => {
        const qtyInput    = row.querySelector("[data-field='qty']");
        const weightInput = row.querySelector("[data-field='weight']");
        if (!qtyInput) return;
        const qty    = parseInt(qtyInput.value);
        const weight = parseFloat(weightInput.value);
        if ((!isNaN(qty) && qty > 0) || (!isNaN(weight) && weight > 0)) {
            entries.push({ item: qtyInput.dataset.item, category: qtyInput.dataset.category, qty: isNaN(qty) ? 0 : qty, weight: isNaN(weight) ? 0 : weight });
        }
    });

    let failed = false;
    for (const entry of entries) {
        // Update inventory
        const { data: existing, error: fetchErr } = await supabase
            .from("inventory").select("itemid, itemquantity").eq("itemtype", entry.item).maybeSingle();
        if (fetchErr) { alert("Error: " + fetchErr.message); failed = true; break; }

        let itemId;
        if (existing) {
            itemId = existing.itemid;
            const { error: upErr } = await supabase.from("inventory")
                .update({ itemquantity: existing.itemquantity + entry.qty }).eq("itemid", itemId);
            if (upErr) { alert("Error updating inventory: " + upErr.message); failed = true; break; }
        } else {
            itemId = Math.floor(100000 + Math.random() * 900000);
            const { error: inErr } = await supabase.from("inventory")
                .insert([{ itemid: itemId, itemtype: entry.item, itemquantity: entry.qty }]);
            if (inErr) { alert("Error inserting inventory: " + inErr.message); failed = true; break; }
        }

        // Log rescue entry
        const rescueId = Math.floor(100000 + Math.random() * 900000);
        const dateInt = parseInt(currentRescue.date.replace(/-/g, ""));
        const { error: rescueErr } = await supabase.from("foodrescueentry").insert([{
            rescueid: rescueId,
            sourceid: parseInt(currentRescue.sourceId),
            date:     dateInt,
            category: entry.category,
            weight:   entry.weight,
            itemid:   itemId
        }]);
        if (rescueErr) { alert("Error logging rescue: " + rescueErr.message); failed = true; break; }
    }

    if (!failed) {
        alert("Rescue entries saved and inventory updated!");
        list.querySelectorAll("input").forEach(i => i.value = "");
        document.getElementById("rescue-step3").classList.add("hidden");
        document.getElementById("rescue-step2").classList.remove("hidden");
    }
});

// ── View Rescues ───────────────────────────────────────────────
async function loadRescueLog() {
    const container = document.getElementById("rescueLog");
    container.innerHTML = "<p class='count-instructions'>Loading...</p>";

    const { data: entries, error } = await supabase
        .from("foodrescueentry")
        .select("rescueid, sourceid, date, category, weight, itemid")
        .order("date", { ascending: false });

    if (error) { container.innerHTML = "<p>Error loading rescues: " + error.message + "</p>"; return; }
    if (!entries?.length) { container.innerHTML = "<p class='count-instructions'>No rescues logged yet.</p>"; return; }

    // Load source names + item names
    const { data: sources } = await supabase.from("source").select("sourceid, sourcename");
    const { data: items }   = await supabase.from("inventory").select("itemid, itemtype");

    const sourceMap = Object.fromEntries((sources || []).map(s => [s.sourceid, s.sourcename]));
    const itemMap   = Object.fromEntries((items   || []).map(i => [i.itemid,   i.itemtype]));

    // Group by sourceid + date
    const grouped = {};
    entries.forEach(e => {
        const key = `${e.sourceid}__${e.date}`;
        if (!grouped[key]) grouped[key] = { sourceid: e.sourceid, date: e.date, totalWeight: 0, items: [] };
        grouped[key].totalWeight += e.weight || 0;
        grouped[key].items.push(e);
    });

    container.innerHTML = "";
    Object.values(grouped).forEach(session => {
        const card = document.createElement("div");
        card.className = "rescue-card";

        const d = String(session.date);
        const displayDate = d.length === 8 ? `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}` : d;

        const itemRows = session.items.map(e => `
            <tr>
                <td>${e.category}</td>
                <td>${itemMap[e.itemid] || "—"}</td>
                <td>${e.weight != null ? e.weight.toFixed(1) + " lbs" : "—"}</td>
            </tr>`).join("");

        card.innerHTML = `
            <div class="rescue-card-header">
                <div>
                    <span class="rescue-source-name">${sourceMap[session.sourceid] || "Unknown Source"}</span>
                    <span class="rescue-card-date">${displayDate}</span>
                </div>
                <div class="rescue-card-right">
                    <span class="rescue-total-weight">${session.totalWeight.toFixed(1)} lbs total</span>
                    <button class="toggle-btn">Show Items</button>
                </div>
            </div>
            <div class="rescue-card-items hidden">
                <table class="rescue-table">
                    <thead><tr><th>Category</th><th>Item</th><th>Weight</th></tr></thead>
                    <tbody>${itemRows}</tbody>
                </table>
            </div>`;

        card.querySelector(".toggle-btn").addEventListener("click", (e) => {
            const detail = card.querySelector(".rescue-card-items");
            const btn = e.target;
            detail.classList.toggle("hidden");
            btn.textContent = detail.classList.contains("hidden") ? "Show Items" : "Hide Items";
        });

        container.appendChild(card);
    });
}

document.getElementById("refreshRescues").addEventListener("click", loadRescueLog);

// ── Daily Log ──────────────────────────────────────────────────
async function loadDailyLog() {
    const container = document.getElementById("dailyLogContent");
    container.innerHTML = "<p class='count-instructions'>Loading...</p>";

    const { data: logs, error } = await supabase
        .from("dailystock")
        .select("logid, itemid, date, totalquantitystart, totalquantityend, dailytotaltaken")
        .order("date", { ascending: false });

    if (error) { container.innerHTML = "<p>Error loading log: " + error.message + "</p>"; return; }
    if (!logs?.length) { container.innerHTML = "<p class='count-instructions'>No daily logs recorded yet.</p>"; return; }

    const { data: items } = await supabase.from("inventory").select("itemid, itemtype");
    const itemMap = Object.fromEntries((items || []).map(i => [i.itemid, i.itemtype]));

    const grouped = {};
    logs.forEach(log => {
        if (!grouped[log.date]) grouped[log.date] = [];
        grouped[log.date].push(log);
    });

    container.innerHTML = "";
    Object.entries(grouped).sort((a, b) => Number(b[0]) - Number(a[0])).forEach(([date, entries]) => {
        const d = String(date);
        const displayDate = d.length === 8 ? `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}` : d;

        const rows = entries.map(e => `
            <tr>
                <td>${itemMap[e.itemid] || "—"}</td>
                <td>${e.totalquantitystart ?? "—"}</td>
                <td>${e.totalquantityend ?? "—"}</td>
                <td>${e.dailytotaltaken ?? "—"}</td>
            </tr>`).join("");

        const card = document.createElement("div");
        card.className = "rescue-card";
        card.innerHTML = `
            <div class="rescue-card-header">
                <span class="rescue-source-name">${displayDate}</span>
                <button class="toggle-btn">Show Items</button>
            </div>
            <div class="rescue-card-items hidden">
                <table class="rescue-table">
                    <thead><tr><th>Item</th><th>Start Qty</th><th>End Qty</th><th>Taken</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>`;

        card.querySelector(".toggle-btn").addEventListener("click", (e) => {
            const detail = card.querySelector(".rescue-card-items");
            const btn = e.target;
            detail.classList.toggle("hidden");
            btn.textContent = detail.classList.contains("hidden") ? "Show Items" : "Hide Items";
        });

        container.appendChild(card);
    });
}

document.getElementById("refreshDailyLog").addEventListener("click", loadDailyLog);

// ── Current Inventory ──────────────────────────────────────────
async function loadCurrentInventory() {
    const container = document.getElementById("currentInventoryContent");
    container.innerHTML = "<p class='count-instructions'>Loading...</p>";

    const { data: items, error } = await supabase
        .from("inventory")
        .select("itemid, itemtype, itemquantity")
        .order("itemtype");

    if (error) { container.innerHTML = "<p>Error loading inventory: " + error.message + "</p>"; return; }
    if (!items?.length) { container.innerHTML = "<p class='count-instructions'>No items in inventory yet.</p>"; return; }

    const rows = items.map(item => `
        <tr>
            <td>${item.itemtype}</td>
            <td class="${(item.itemquantity ?? 0) <= 0 ? 'qty-zero' : ''}">${item.itemquantity ?? 0}</td>
        </tr>`).join("");

    container.innerHTML = `
        <table class="rescue-table inventory-table">
            <thead><tr><th>Item</th><th>Current Quantity</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

document.getElementById("refreshInventory").addEventListener("click", loadCurrentInventory);
