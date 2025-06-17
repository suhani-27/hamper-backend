document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded Successfully!");

    // Delay Function
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Smooth Scrolling for Navigation
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", async (event) => {
            const targetId = link.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                event.preventDefault();
                await delay(300);
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // FAQ Toggle
    document.querySelectorAll("#faqs h3").forEach(q => {
        q.addEventListener("click", async () => {
            const ans = q.nextElementSibling;
            await delay(200);
            ans.style.display = (ans.style.display === "none" || !ans.style.display) ? "block" : "none";
        });
    });

    // Custom Order Form Validation
    const customForm = document.querySelector("#customForm");
    if (customForm) {
        customForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const budget = document.querySelector("#budget").value.trim();
            const occasion = document.querySelector("#occasion").value.trim();
            const preferences = document.querySelector("#preferences").value.trim();

            if (!name || !budget || !occasion || !preferences) {
                alert("Please fill in all fields.");
                return;
            }

            const response = await fetch("http://localhost:5000/custom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, budget, occasion, preferences })
            });

            const result = await response.json();
            console.log("Server response:", result);
            if (response.ok) 
            {
                alert(result.message || "Submitted successfully!");
                customForm.reset();
            } 
            else 
            {
                alert(result.error || "Something went wrong!");
            }

        });
    }

    // Contact Form Validation
    const contactForm = document.querySelector("#contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inquiry = document.querySelector("#inquiry").value.trim();
            if (!inquiry) {
                alert("Please enter your inquiry.");
                return;
            }

            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inquiry })
            });

            const result = await response.json();
            console.log("Server response:", result);
            if (response.ok) 
            {
                alert(result.message || "Message sent successfully!");
                contactForm.reset();
            } 
            else 
            {
                alert(result.error || "Something went wrong!");
            }
        });
    }

    // Image Zoom
    document.querySelectorAll("img").forEach(image => {
        image.addEventListener("mouseover", async () => {
            await delay(100);
            image.style.transform = "scale(1.1)";
            image.style.transition = "0.3s ease-in-out";
        });
        image.addEventListener("mouseleave", async () => {
            await delay(100);
            image.style.transform = "scale(1)";
        });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "🌙 Dark Mode";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.top = "10px";
    darkModeToggle.style.right = "10px";
    darkModeToggle.style.padding = "10px";
    darkModeToggle.style.cursor = "pointer";
    document.body.appendChild(darkModeToggle);

    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Inject Dark Mode CSS
    const style = document.createElement("style");
    style.innerHTML = `
        .dark-mode {
            background-color: #222;
            color: #fff;
        }
        .dark-mode header, .dark-mode footer {
            background-color: #111;
        }
        .dark-mode a {
            color: #f8c471;
        }
    `;
    document.head.appendChild(style);
});
