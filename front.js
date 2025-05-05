// Splash screen handling
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded, initializing...");

  // Fallback function in case of errors
  function showMainContent() {
    console.log("Showing main content (fallback)");
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");

    if (splashScreen) splashScreen.style.display = "none";
    if (mainContent) {
      mainContent.style.display = "block";
      mainContent.style.opacity = "1";
    }

    // Initialize the rest of the page
    try {
      initializeMainPage();
    } catch (error) {
      console.error("Error initializing main page:", error);
    }
  }

  // Set a timeout to ensure content shows even if animations fail
  const fallbackTimer = setTimeout(showMainContent, 3000);

  try {
    // Show splash screen with HC letters
    setTimeout(() => {
      console.log("Starting splash animation");
      const splashScreen = document.getElementById("splash-screen");
      const splashContent = document.querySelector(".splash-content");
      const mainContent = document.getElementById("main-content");

      if (!splashScreen || !splashContent || !mainContent) {
        console.error("Required elements not found. Showing main content directly.");
        clearTimeout(fallbackTimer);
        showMainContent();
        return;
      }

      // Start the split animation
      splashContent.classList.add("reveal-animation");

      // After animation completes, fade out splash screen and show main content
      setTimeout(() => {
        console.log("Fading out splash screen");
        // Fade out splash screen
        splashScreen.style.transition = "opacity 0.8s ease-out";
        splashScreen.style.opacity = "0";

        // Show main content
        mainContent.style.display = "block";
        mainContent.style.opacity = "0";

        // Fade in main content after splash screen fades out
        setTimeout(() => {
          console.log("Showing main content");
          clearTimeout(fallbackTimer); // Clear the fallback timer
          splashScreen.style.display = "none";
          mainContent.style.transition = "opacity 0.8s ease-in";
          mainContent.style.opacity = "1";

          // Initialize the rest of the page
          initializeMainPage();
        }, 800);
      }, 1200); // Wait for the split animation to complete
    }, 300); // Reduced delay before starting animation (was 500)
  } catch (error) {
    console.error("Error in splash screen animation:", error);
    clearTimeout(fallbackTimer);
    showMainContent();
  }
});

// Main page initialization
function initializeMainPage() {
  console.log("Initializing main page");

  // Initialize particles.js with error handling
  try {
    console.log("Initializing particles.js");
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#00eaff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00eaff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    } else {
      console.warn("particlesJS is not defined. Skipping particle initialization.");
    }
  } catch (error) {
    console.error("Error initializing particles:", error);
  }

  try {
    console.log("Initializing text rotation");
    // Text rotation animation
    var TxtRotate = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = Number.parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = this.txt;

      var delta = 150 - Math.random() * 75; // Faster typing (was 200 - Math.random() * 100)

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 300; // Reduced delay between phrases (was 500)
      }

      setTimeout(() => {
        this.tick();
      }, delta);
    };

    // Initialize text rotation
    var elements = document.getElementsByClassName("txt-rotate");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-rotate");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
  } catch (error) {
    console.error("Error in text rotation:", error);
  }

  try {
    console.log("Initializing terminal animation");
    // Terminal typing effect
    const commands = document.querySelectorAll(".command:not(.blink)");
    const outputs = document.querySelectorAll(".output");

    // Hide all commands and outputs initially
    commands.forEach((cmd) => {
      cmd.style.visibility = "hidden";
      cmd.style.opacity = "0";
    });

    outputs.forEach((output) => {
      output.style.visibility = "hidden";
      output.style.opacity = "0";
    });

    // Function to simulate typing
    function typeCommand(element, text, i, callback) {
      element.style.visibility = "visible";
      element.style.opacity = "1";

      if (i < text.length) {
        element.textContent = text.substring(0, i + 1);
        setTimeout(
          () => {
            typeCommand(element, text, i + 1, callback);
          },
          25 + Math.random() * 15, // Much faster typing (was 50 + Math.random() * 30)
        );
      } else {
        callback();
      }
    }

    // Function to show output
    function showOutput(output, callback) {
      setTimeout(() => {
        output.style.visibility = "visible";
        output.style.opacity = "0";
        let opacity = 0;
        const fadeIn = setInterval(() => {
          opacity += 0.2; // Faster fade in (was 0.1)
          output.style.opacity = opacity;
          if (opacity >= 1) {
            clearInterval(fadeIn);
            if (callback) callback();
          }
        }, 30); // Faster interval (was 50)
      }, 150); // Reduced delay (was 300)
    }

    // Execute commands in sequence
    function executeCommands(index) {
      if (index >= commands.length) return;

      const command = commands[index];
      const output = outputs[index];
      const originalText = command.textContent;

      command.textContent = "";

      setTimeout(
        () => {
          typeCommand(command, originalText, 0, () => {
            if (output) {
              showOutput(output, () => {
                executeCommands(index + 1);
              });
            } else {
              executeCommands(index + 1);
            }
          });
        },
        index === 0 ? 300 : 500, // Reduced delays (were 500 and 1000)
      );
    }

    // Start the terminal animation
    setTimeout(() => {
      executeCommands(0);
    }, 500); // Reduced delay (was 1000)
  } catch (error) {
    console.error("Error in terminal animation:", error);
  }
}

// Declare particlesJS to avoid undefined variable error. This assumes particlesJS is loaded globally.
var particlesJS;
