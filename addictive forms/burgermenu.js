document.addEventListener("DOMContentLoaded", () => {
    const burgerImgButton = document.querySelector(".burgerimg");
    const burgerMenu = document.querySelector(".burgermenu");
    const burgerButton1 = document.querySelector(".burgerbutton1");
    const display = document.querySelector(".display");
    const overlay = document.createElement("div");

    overlay.className = "overlay";
    document.body.appendChild(overlay);

    burgerImgButton.addEventListener("click", () => {
        burgerMenu.classList.add("active");
        display.classList.add("active");
        document.body.classList.add("menu-open");
    });

    burgerButton1.addEventListener("click", () => {
        burgerMenu.classList.remove("active");
        display.classList.remove("active");
        document.body.classList.remove("menu-open");
    });

    overlay.addEventListener("click", () => {
        burgerMenu.classList.remove("active");
        display.classList.remove("active");
        document.body.classList.remove("menu-open");
    });

    document.querySelectorAll(".burger-navigation a").forEach(link => {
        link.addEventListener("click", () => {
            burgerMenu.classList.remove("active");
            display.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
});

