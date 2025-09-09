// Store workers in memory
let workers = [];

/**
 * FORM HANDLING & VALIDATION
 */
document.getElementById("workerForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent refresh

  // Get input values
  const name = document.getElementById("name").value.trim();
  const job = document.getElementById("job").value;
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();
  const formMessage = document.getElementById("formMessage");

  // Custom validation
  if (name === "" || job === "" || phone === "" || location === "") {
    formMessage.textContent = " All fields are required!";
    formMessage.style.color = "red";
    return;
  }
  if (!/^[0-9]{10}$/.test(phone.replace(/\s+/g, ""))) {
    formMessage.textContent = " Enter a valid 10-digit phone number!";
    formMessage.style.color = "red";
    return;
  }

  // Save worker
  const worker = { name, job, phone, location };
  workers.push(worker);

  // Update worker list
  displayWorkers();

  // Success message
  formMessage.textContent = " Worker added successfully!";
  formMessage.style.color = "green";

  // Reset form
  document.getElementById("workerForm").reset();
});

/**
 * DISPLAY REGISTERED WORKERS
 */
function displayWorkers() {
  const list = document.getElementById("workerList");
  list.innerHTML = "";
  workers.forEach((w, index) => {
    const li = document.createElement("li");
    li.textContent = `${w.name} - ${w.job} (${w.phone}, ${w.location})`;

    // Add delete button
    const btn = document.createElement("button");
    btn.textContent = " Remove";
    btn.style.marginLeft = "10px";
    btn.addEventListener("click", () => {
      workers.splice(index, 1);
      displayWorkers();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

/**
 * SEARCH WORKERS BY JOB TYPE
 */
document.getElementById("searchInput").addEventListener("keyup", function () {
  const query = this.value.toLowerCase();
  const results = document.getElementById("searchResults");
  results.innerHTML = "";

  const filtered = workers.filter((w) => w.job.toLowerCase().includes(query));

  if (filtered.length === 0) {
    results.innerHTML = "<li>No workers found</li>";
  } else {
    filtered.forEach((w) => {
      const li = document.createElement("li");
      li.textContent = `${w.name} - ${w.job} (${w.phone}, ${w.location})`;
      results.appendChild(li);
    });
  }
});

/**
 * DARK/LIGHT MODE TOGGLE
 */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});
