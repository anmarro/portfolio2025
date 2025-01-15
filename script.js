//Mouse circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCircleFn = (x, y) => {
  mouseCircle.style.cssText = `top:${y}px; left:${x}px; opacity: 1`;
  mouseDot.style.cssText = `top:${y}px; left:${x}px; opacity: 1`;
};
//Fin mause circle
//Animated circles
// const circles = document.querySelectorAll(".circle");
// const mainImg = document.querySelector(".main-circle img");

// let mX = 0;
// let mY = 0;
// const z = 100;
// const animateCircles = (e, x, y) => {
//   if (x < mX) {
//     circles.forEach((circle) => {
//       circle.style.left = `${z}px`;
//     });
//     mainImg.style.left = `${z}px`;
//   } else if (x > mX) {
//     circles.forEach((circle) => {
//       circle.style.left = `-${z}px`;
//     });
//     mainImg.style.left = `-${z}px`;
//   }
//   if (y < mY) {
//     circles.forEach((circle) => {
//       circle.style.top = `${z}px`;
//     });
//     mainImg.style.top = `${z}px`;
//   } else if (y > mY) {
//     circles.forEach((circle) => {
//       circle.style.top = `-${z}px`;
//     });
//     mainImg.style.top = `-${z}px`;
//   }
//   mX = e.clientX;
//   mY = e.clientY;
// };
//Fin Animated circles
document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  // animateCircles(e, x, y);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});
//End mouse circle
// Variables para rastrear la posición del ratón
let prevMouseX = 0; // Posición previa del ratón en X
//main button
const mainBtns = document.querySelectorAll(".main-btn");
mainBtns.forEach((btn) => {
  let ripple;
  btn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;
    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });
  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

//end main button

//progress bar
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".progress-bar");
const halfCircles = document.querySelectorAll(".half-circle");
const halfCircleTop = document.querySelector(".half-circle-top");
const progressBarCircle = document.querySelector(".progress-bar-circle");

const progressBarFn = () => {
  const pageViewportHeight = window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const scrolledPortion = window.scrollY;

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;
  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;
    if (scrolledPortionDegree >= 180) {
      halfCircles[0].style.transform = "rotate(180deg)";
      halfCircleTop.style.opacity = "0";
    } else {
      halfCircleTop.style.opacity = "1";
    }
  });

  const scrollBool = scrolledPortion + pageViewportHeight === pageHeight;
  //Progress bar click
  progressBar.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionPositions = Array.from(sections).map((section) => {
      return scrolledPortion + section.getBoundingClientRect().top;
    });
    const position = sectionPositions.find((sectionPosition) => {
      return sectionPosition > scrolledPortion;
    });
    scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
  });
  //Fin Progress bar click
  //Arrow rotation
  if (scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0)";
  }
  //End arrow rotation
};
progressBarFn();

//end progress bar

//navigation
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

document.addEventListener("scroll", () => {
  menuIcon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");
  if (window.scrollY === 0) {
    menuIcon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }
  progressBarFn();
});

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
});
//end navigation

//About me text
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeTextContent =
  "Desarrollador web GIS con una sólida base en Sistemas de Información Geográfica. Combino mis 8 años de conocimiento en GIS con tecnologías web para ofrecer soluciones cartográficas eficientes. Contáctame :)";
Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);
  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 10s infinite";
    span.style.opacity = "0.7";
  });
});

//fin about me text
//Projects
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const projectHideBtn = document.querySelector(".project-hide-btn");

projects.forEach((project, i) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });
  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // //Big project images
  // project.addEventListener("click", () => {
  //   const bigImgWrapper = document.createElement("div");
  //   bigImgWrapper.className = "project-img-wrapper";
  //   container.appendChild(bigImgWrapper);

  //   const bigImg = document.createElement("img");
  //   bigImg.className = "project-img";
  //   const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
  //   bigImg.setAttribute("src", `${imgPath}-big.jpg`);
  //   bigImgWrapper.appendChild(bigImg);
  //   document.body.style.overflowY = "hidden";
  //   projectHideBtn.classList.add("change");
  //   projectHideBtn.onclick = () => {
  //     projectHideBtn.classList.remove("change");
  //     bigImgWrapper.remove();
  //     document.body.style.overflowY = "scroll";
  //   };
  // });
  // //End Big project images
  if (i >= 3) {
    project.style.cssText = "display:none; opacity:0";
  }
});
//project button
const section3 = document.querySelector(".section-3");
const projectsBtn = document.querySelector(".projects-btn");
const projectsBtnText = document.querySelector(".projects-btn span");
let showHideBol = true;

const showProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "flex";
    section3.scrollIntoView({ block: "end" });
  }, 600);

  setTimeout(() => {
    project.style.opacity = "1";
  }, i * 200);
};

const hideProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "none";
    section3.scrollIntoView({ block: "end" });
  }, 1200);
  setTimeout(() => {
    project.style.opacity = "0";
  }, i * 100);
};

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault(); //para no navegar por defecto al inicio
  projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

  projects.forEach((project, i) => {
    if (i >= 3) {
      if (showHideBol) {
        showProjects(project, i);
        projectsBtnText.textContent = "Ver menos";
      } else {
        hideProjects(project, i);
        projectsBtnText.textContent = "Ver más";
      }
    }
  });
  showHideBol = !showHideBol;
});
//fin project button
//End of projects

//Section4
document.querySelectorAll(".service-btn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();
    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change");

    const rightposition = serviceText.classList.contains("change");
  });
});
//Fin section4
//Seccion 5 - Formulario
const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Tu ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });

  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "¿Hablamos?";
      formHeading.style.opacity = "1";
    }, 300);
  });
});

//Form validation
const form = document.querySelector(".content-form");
const username = document.querySelector("#nombre");
const email = document.querySelector("#email");
const subject = document.querySelector("#asunto");
const message = document.querySelector("#mensaje");
const messages = document.querySelectorAll(".message");

const error = (input, message) => {
  input.nextElementSibling.classList.add("error");
  input.nextElementSibling.textContent = message;
};

const succes = (input) => {
  input.nextElementSibling.classList.remove("error");
};

const checkRequiredFileds = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      error(input, `${input.id} es obligatorio`);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.trim().length < min) {
    error(input, `${input.id} debe contener al menos ${min} caracteres`);
  } else {
    succes(input);
  }
};

const checkEmail = (input) => {
  const regEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (regEx.test(input.value.trim())) {
    succes(input);
  } else {
    error(input, "El email no es válido");
  }
};
form.addEventListener("submit", (e) => {
  checkLength(username, 2);

  checkLength(subject, 2);

  checkLength(message, 10);
  checkEmail(email);
  checkRequiredFileds([username, email, subject, message]);

  const notValid = Array.from(messages).find((message) => {
    return message.classList.contains("error");
  });
  notValid && e.preventDefault();
});
//End form validation
//Fin Seccion 5 - Formulario
