document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
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

  // Video placeholder click handler
  const videoPlaceholder = document.querySelector(".video-placeholder")
  videoPlaceholder.addEventListener("click", () => {
    alert("Video player would open here in a real implementation.")
    // In a real implementation, you would replace the placeholder with an actual video player
    // videoPlaceholder.innerHTML = '<video controls autoplay><source src="your-video.mp4" type="video/mp4">Your browser does not support the video tag.</video>';
  })

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
})

