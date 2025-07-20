// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const contactForm = document.getElementById("contact-form")
const skillBars = document.querySelectorAll(".skill-progress")

// Theme Management
let currentTheme = localStorage.getItem("theme") || "light"

function setTheme(theme) {
  currentTheme = theme
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)

  const themeIcon = themeToggle.querySelector("i")
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
  } else {
    themeIcon.className = "fas fa-moon"
  }
}

// Initialize theme
setTheme(currentTheme)

// Theme toggle event
themeToggle.addEventListener("click", () => {
  const newTheme = currentTheme === "light" ? "dark" : "light"
  setTheme(newTheme)
})

// Mobile Menu Toggle
mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  const icon = mobileMenuToggle.querySelector("i")

  if (navMenu.classList.contains("active")) {
    icon.className = "fas fa-times"
  } else {
    icon.className = "fas fa-bars"
  }
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    mobileMenuToggle.querySelector("i").className = "fas fa-bars"
  })
})

// Smooth Scrolling
function smoothScroll(target) {
  const element = document.querySelector(target)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Navigation link clicks
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const target = link.getAttribute("href")
    smoothScroll(target)
  })
})

// Active Navigation Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Scroll event listener
window.addEventListener("scroll", () => {
  updateActiveNavLink()
  animateOnScroll()
  animateSkillBars()
})

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

// Animate skill bars
function animateSkillBars() {
  const skillsSection = document.getElementById("skills")
  const skillsSectionTop = skillsSection.getBoundingClientRect().top

  if (skillsSectionTop < window.innerHeight / 2) {
    skillBars.forEach((bar) => {
      if (!bar.classList.contains("animated")) {
        const width = bar.getAttribute("data-width")
        bar.style.width = width + "%"
        bar.classList.add("animated")
      }
    })
  }
}

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  setTimeout(() => {
    alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`)
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Add animation classes to elements
function addAnimationClasses() {
  // About cards
  const aboutCards = document.querySelectorAll(".about-card")
  aboutCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.animationDelay = `${index * 0.2}s`
  })

  // Experience cards
  const experienceCards = document.querySelectorAll(".experience-card")
  experienceCards.forEach((card, index) => {
    if (index % 2 === 0) {
      card.classList.add("slide-in-left")
    } else {
      card.classList.add("slide-in-right")
    }
  })

  // Skill cards
  const skillCards = document.querySelectorAll(".skill-card")
  skillCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Certification cards
  const certCards = document.querySelectorAll(".cert-card")
  certCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.animationDelay = `${index * 0.15}s`
  })

  // Project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.animationDelay = `${index * 0.2}s`
  })
}

// Navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar")

  if (window.scrollY > 50) {
    navbar.style.backgroundColor = currentTheme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(15px)"
  } else {
    navbar.style.backgroundColor = currentTheme === "dark" ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.9)"
    navbar.style.backdropFilter = "blur(10px)"
  }
}

window.addEventListener("scroll", handleNavbarScroll)

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize animations and effects
document.addEventListener("DOMContentLoaded", () => {
  addAnimationClasses()

  // Initial scroll animations
  setTimeout(() => {
    animateOnScroll()
  }, 100)

  // Typing effect for hero title (optional)
  // const heroTitle = document.querySelector('.hero-title');
  // typeWriter(heroTitle, 'Network Engineer', 150);
})

// Smooth scroll for hero buttons
document.querySelectorAll(".hero-buttons .btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    const target = btn.getAttribute("href")
    if (target.startsWith("#")) {
      smoothScroll(target)
    }
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all animated elements
document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach((el) => {
  observer.observe(el)
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add click effect to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    this.appendChild(ripple)

    const x = e.clientX - e.target.offsetLeft
    const y = e.clientY - e.target.offsetTop

    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect CSS
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`

// Inject ripple CSS
const style = document.createElement("style")
style.textContent = rippleCSS
document.head.appendChild(style)

// Preloader (optional)
function showPreloader() {
  const preloader = document.createElement("div")
  preloader.id = "preloader"
  preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <i class="fas fa-network-wired"></i>
                <span>NetworkPro</span>
            </div>
            <div class="preloader-spinner"></div>
        </div>
    `

  const preloaderCSS = `
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .preloader-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 2rem;
        }
        
        .preloader-logo i {
            color: var(--primary-color);
            font-size: 2rem;
        }
        
        .preloader-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--border-color);
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        body.loaded #preloader {
            opacity: 0;
            pointer-events: none;
        }
    `

  const preloaderStyle = document.createElement("style")
  preloaderStyle.textContent = preloaderCSS
  document.head.appendChild(preloaderStyle)
  document.body.appendChild(preloader)

  // Remove preloader after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.remove()
      }, 500)
    }, 1000)
  })
}

// Initialize preloader
// showPreloader();

// Add scroll to top functionality
function addScrollToTop() {
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.id = "scroll-to-top"
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top")

  const scrollToTopCSS = `
        #scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        }
        
        #scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        #scroll-to-top:hover {
            background-color: var(--primary-hover);
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            #scroll-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 45px;
                height: 45px;
            }
        }
    `

  const scrollStyle = document.createElement("style")
  scrollStyle.textContent = scrollToTopCSS
  document.head.appendChild(scrollStyle)
  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Initialize scroll to top
addScrollToTop()

// Add custom cursor effect (optional)
function addCustomCursor() {
  const cursor = document.createElement("div")
  cursor.id = "custom-cursor"

  const cursorCSS = `
        #custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background-color: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        }
        
        @media (hover: hover) {
            #custom-cursor {
                opacity: 0.6;
            }
        }
        
        @media (max-width: 768px) {
            #custom-cursor {
                display: none;
            }
        }
    `

  const cursorStyle = document.createElement("style")
  cursorStyle.textContent = cursorCSS
  document.head.appendChild(cursorStyle)
  document.body.appendChild(cursor)

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px"
    cursor.style.top = e.clientY - 10 + "px"
  })

  // Scale cursor on hover
  document.querySelectorAll("a, button, .btn").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
    })
  })
}

// Initialize custom cursor (uncomment to enable)
// addCustomCursor();

console.log("Network Engineer Portfolio loaded successfully! ")
