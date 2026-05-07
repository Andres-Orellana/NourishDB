import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jsojlyeytbbloivlappf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb2pseWV5dGJibG9pdmxhcHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NjA0NzIsImV4cCI6MjA5MzIzNjQ3Mn0.zUGdfz12ZobVxDNEcbL_JXt85_lIecVVAI-AE-ILBNU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const inventoryForm = document.getElementById("inventoryForm");



//Inventory
inventoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;

    const generatedItemID = Math.floor(100000 + Math.random() * 900000);
    const generatedResID = Math.floor(100000 + Math.random() * 900000);

    const inventoryData = {
        itemid: generatedItemID,
        itemtype: form["item-name"].value,
        itemquantity: Number(form.quantity.value),
        expirationdate: form["expiration-date"].value
    };

    const foodRescueData = {
        rescueid: generatedResID,
        sourceid: Number(form.source.value),
        date: Number(new Date().toISOString().slice(0, 10).replaceAll("-", "")),
        category: form["item-name"].value,
        weight: Number(form["weight"].value),
        itemid: generatedItemID
    };

    const { data: inventoryResult, error: inventoryError } = await supabase
        .from("inventory")
        .insert([inventoryData])
        .select();

    if (inventoryError) {
        console.error(inventoryError);
        alert("Inventory error: " + inventoryError.message);
        return;
    }

    const { data: rescueResult, error: rescueError } = await supabase
        .from("foodrescueentry")
        .insert([foodRescueData])
        .select();

    if (rescueError) {
        console.error(rescueError);
        alert("Food rescue error: " + rescueError.message);
        return;
    }

    alert("Inventory item added! Item ID: " + inventoryResult[0].itemid);
    form.reset();
});


//source
async function loadSources() {
    const sourceDropdown = document.getElementById("source");

    const { data, error } = await supabase
        .from("source")
        .select("*")
        .order("sourcename");

    if (error) {
        console.error(error);
        alert("Source dropdown error: " + error.message);
        return;
    }

    data.forEach(source => {
        const option = document.createElement("option");

        option.value = source.sourceid;
        option.textContent = source.sourcename;

        sourceDropdown.appendChild(option);
    });
}

loadSources();