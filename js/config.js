/**
 * Central Configuration File for Syed's Portfolio
 * Edit this file to update personal links, email, or profile details easily.
 */

const PORTFOLIO_CONFIG = {
  name: "Syed",
  title: "Student Developer",
  status: "Second-year College Student",
  focus: "Python, FastAPI, PostgreSQL & Automation",
  
  // Social & Contact Placeholders (Easily replace these with your actual URLs/handles)
  social: {
    github: "https://github.com/Syxd0", // Syed's GitHub Profile
    linkedin: "https://linkedin.com/in/syed", // Update with your actual LinkedIn profile
    email: "technajju@gmail.com" // Syed's Contact Email
  },

  // Project Repositories
  projects: {
    productManagement: {
      githubUrl: "https://github.com/syed/product-management-system",
      hasLiveDemo: false, // Set to true and provide liveUrl when deployed
      liveUrl: ""
    },
    slotBooking: {
      githubUrl: "https://github.com/syed/college-slot-booking-bot",
      hasLiveDemo: false,
      liveUrl: ""
    }
  }
};
