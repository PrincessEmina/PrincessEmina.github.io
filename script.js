document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")

    // Update ARIA attributes
    const expanded = mobileMenu.getAttribute("aria-expanded") === "true" || false
    mobileMenu.setAttribute("aria-expanded", !expanded)
  })

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
      mobileMenu.setAttribute("aria-expanded", "false")
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const navbarHeight = document.getElementById("navbar").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate skill bars when in viewport
  const skillLevels = document.querySelectorAll(".skill-level")

  function animateSkillBars() {
    skillLevels.forEach((skill) => {
      const level = skill.getAttribute("data-level")
      skill.style.width = level
    })
  }

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll(".fade-in")
  const skillSection = document.getElementById("skills")

  const appearOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  }

  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return
      } else {
        entry.target.classList.add("appear")
        appearOnScroll.unobserve(entry.target)
      }
    })
  }, appearOptions)

  fadeElements.forEach((element) => {
    appearOnScroll.observe(element)
  })

  // Animate skill bars when skills section is in viewport
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars()
          skillsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillsObserver.observe(skillSection)

  // // Video placeholder click handler
  // const videoPlaceholder = document.querySelector(".video-placeholder")
  // videoPlaceholder.addEventListener("click", () => {
  //   alert("Video player would open here in a real implementation.")
  //   // In a real implementation, you would replace the placeholder with an actual video player
  //   // videoPlaceholder.innerHTML = '<video controls autoplay><source src="your-video.mp4" type="video/mp4">Your browser does not support the video tag.</video>';
  // })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar")
    if (window.scrollY > 50) {
      navbar.style.padding = "0"
      navbar.style.backgroundColor = "rgba(26, 26, 26, 0.98)"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)"
    } else {
      navbar.style.padding = "0"
      navbar.style.backgroundColor = "rgba(26, 26, 26, 0.95)"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }
  })

  // Initialize animations on page load
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((element) => {
      element.classList.add("appear")
    })
  }, 300)

  // Add sparkling effect to the hero section
  function createSparkle() {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle"

    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100

    // Random size
    const size = Math.random() * 5 + 2

    // Apply styles
    sparkle.style.left = posX + "%"
    sparkle.style.top = posY + "%"
    sparkle.style.width = size + "px"
    sparkle.style.height = size + "px"

    // Add to hero section
    document.getElementById("home").appendChild(sparkle)

    // Remove after animation
    setTimeout(() => {
      sparkle.remove()
    }, 1500)
  }

  // Create sparkles at intervals
  setInterval(createSparkle, 300)
})


function playVideo() {
    const videoContainer = document.querySelector('.video-container');
    videoContainer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/sPPukcEo5v0?si=6TWp7m-dJTiAN-O4&amp;start=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
}

