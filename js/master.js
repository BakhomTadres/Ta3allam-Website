// Check If there is local storage option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColors) {
      el.classList.add("active");
    }
  });
}

// Get Gear
let gear = document.querySelector(".fa-gear");
gear.onclick = () => {
  // Toggle class fa-spin for rotation itself
  gear.classList.toggle("fa-spin");

  // Toggle class open on setting box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const ColorsLi = document.querySelectorAll(".colors-list li");

ColorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color,
    );
    //set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    // Remove active class from all children
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

let backgroundOption = true;
let backgroundInterval;
let backgroundLocalEl = localStorage.getItem("background_option");
if (backgroundLocalEl !== null) {
  if (backgroundLocalEl === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-backgrounds span").forEach((el) => {
    el.classList.remove("active");
  });
  if (backgroundLocalEl === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}
// switch random background
const randomBackSpan = document.querySelectorAll(".random-backgrounds span");

randomBackSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Remove active class from all children
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });

    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImages();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imagesArray = ["background1.webp", "background2.jpg", "background3.jpg"];

// Change Background Image URL
landingPage.style.backgroundImage = 'url("../images/background1.webp")';

// Set
function randomizeImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
      landingPage.style.backgroundImage = `url("../images/${imagesArray[randomNumber]}")`;
    }, 10000);
  }
}
randomizeImages();

//Set Bars
let bars = document.querySelector(".icon");
let ul = document.querySelector("header ul.not-wide");
bars.onclick = () => {
  if (bars.innerHTML === `<i class="fa-solid fa-xmark"></i>`) {
    bars.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    ul.style.display = "none";
  } else {
    bars.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    ul.style.display = "flex";
  }
};

// Select Skills Progress
let ourSkills = document.querySelector(".our-skills");

window.onscroll = () => {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = window.innerHeight;
  let windowScrollTop = window.scrollY;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".our-skills .skill-box .skill-progress span",
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup For The Image

let ourCourses = document.querySelectorAll(".course-box img");

ourCourses.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overLay = document.createElement("div");

    overLay.classList.add("popup-overlay");

    document.body.appendChild(overLay);

    let popupBox = document.createElement("div");

    popupBox.classList.add("popup-box");
    let popupImage = document.createElement("img");
    popupImage.src = e.target.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    if (e.target.alt !== null) {
      let imageP = document.createElement("p");
      let pText = document.createTextNode(e.target.dataset.paragragh);
      imageP.appendChild(pText);
      imageP.classList.add("popup-text");
      popupBox.appendChild(imageP);
      document.body.appendChild(popupBox);
    }
    // Create Close Button
    let closeButton = document.createElement("span");
    let closeText = document.createTextNode("X");
    closeButton.appendChild(closeText);
    closeButton.classList.add("close");
    popupBox.appendChild(closeButton);
    // Create Add To Cart Button
    let addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-button");
    addToCartButton.textContent = "Add to cart";
    popupBox.appendChild(addToCartButton);
  });
});
// close Button Function
document.addEventListener("click", (e) => {
  if (e.target.className === "close") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Function Links
const allLinksWide = document.querySelectorAll(".wide li a");
const allLinksNotWide = document.querySelectorAll(".not-wide li a");
function intoView(element) {
  element.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
intoView(allLinksNotWide);
intoView(allLinksWide);
