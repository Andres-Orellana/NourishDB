import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jsojlyeytbbloivlappf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb2pseWV5dGJibG9pdmxhcHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NjA0NzIsImV4cCI6MjA5MzIzNjQ3Mn0.zUGdfz12ZobVxDNEcbL_JXt85_lIecVVAI-AE-ILBNU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const inventoryForm = document.getElementById("inventoryForm");

inventoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;

    const generatedItemID = Math.floor(100000 + Math.random() * 900000);

    const inventoryData = {
        itemid: generatedItemID,
        itemtype: form["item-name"].value,
        itemquantity: Number(form.quantity.value),
        expirationdate: form["expiration-date"].value
    };

    const { data, error } = await supabase
        .from("inventory")
        .insert([inventoryData])
        .select();

    if (error) {
        console.error(error);
        alert("Inventory error: " + error.message);
    } else {
        alert("Inventory item added! Item ID: " + data[0].itemid);
        form.reset();
    }
});