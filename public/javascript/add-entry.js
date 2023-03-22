// logic
async function entryFormHandler(e) {
  e.preventDefault();

  const entry_date = document.getElementById("date").value.trim().replace(/-/g, ".");
  const entry_weight = document.getElementById("weight").value.trim();
  const entry_text = document.getElementById("text").value.trim();
  const journal_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ].split("?")[0]

  if (entry_text) {
    const response = await fetch("/api/entries", {
      method: "post",
      body: JSON.stringify({
        journal_id,
        entry_date,
        entry_weight,
        entry_text,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
      console.log("ok")
    } else {
      alert(response.statusText);
    }
  }
}

// calls
document
  .getElementById("entry-form")
  .addEventListener("submit", entryFormHandler);