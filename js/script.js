// Main Interactive Script for Swadhin Ghosh Portfolio

const PROJECT_DETAILS = {
  "superx-shop": {
    title: "Superx Shop",
    subtitle: "Enterprise-Ready Multi-Tenant E-Commerce Platform",
    category: "Full Stack & SaaS",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Razorpay / UPI"],
    summary: "Architected a multi-tenant e-commerce platform supporting thousands of concurrent shoppers and local seller panels with seamless switching.",
    points: [
      "Built multi-tenant database partitioning ensuring data isolation across local merchant stores while retaining unified catalog search.",
      "Engineered secure end-to-end checkout pipeline with webhook-validated Razorpay, UPI QR, and NetBanking transactions.",
      "Integrated real-time live order tracking and WebSocket delivery alerts for buyers and dispatch managers.",
      "Delivered real-time sales reporting, revenue forecasts, and automated low-stock alerting dashboards for sellers."
    ],
    architecture: "React SPA -> Express REST Gateway -> MongoDB Sharded Collections -> Razorpay Webhook Worker -> Cloud CDN",
    github: "https://github.com/swadhin-in"
  },
  "superx-mailer": {
    title: "Superx Mailer",
    subtitle: "Automated Cold Outreach & High-Deliverability Platform",
    category: "Full Stack & Systems",
    stack: ["Express.js", "Nodemailer", "REST APIs", "Node.js", "React"],
    summary: "Engineered an automated email outreach platform designed to scale multi-recipient campaigns directly into primary inboxes.",
    points: [
      "Configured advanced SPF, DKIM, DMARC alignment, and dynamic rate-limiting algorithms to achieve 100% inbox placement and eliminate spam flagging.",
      "Constructed queue-driven sending engine with retry logic, exponential backoff, and bounce-rate monitoring.",
      "Integrated dynamic API connectors with custom Express and Nodemailer backends allowing mobile campaign monitoring and programmatic triggers.",
      "Implemented open-rate tracking, link click forensics, and automated recipient list deduplication."
    ],
    architecture: "React UI -> Express Worker API -> Node Mail Queue (Worker) -> SMTP Relays / Custom DNS -> Analytics Engine",
    github: "https://github.com/swadhin-in"
  },
  "attendance-sc": {
    title: "Attendance SC",
    subtitle: "Biometric Facial Recognition & Workforce Management",
    category: "AI & Computer Vision",
    stack: ["Python", "OpenCV", "Face Recognition", "Node.js", "MongoDB"],
    summary: "Developed facial biometric verification models eliminating proxy attendance and boosting enterprise workforce operational accuracy.",
    points: [
      "Trained multi-point 128-dimensional facial embedding models capable of sub-second identity verification even in low-light environments.",
      "Constructed anti-spoofing liveness detection to prevent 2D photo and video screen replay attacks.",
      "Unified real-time biometric check-ins with an integrated workforce task management system and automated timesheet generation.",
      "Synchronized edge verification nodes with centralized MongoDB instance using fault-tolerant sync queues."
    ],
    architecture: "Camera Sensor -> Python / OpenCV Embedding Extractor -> Distance Matcher -> Node.js API Gateway -> MongoDB Timesheets",
    github: "https://github.com/swadhin-in"
  },
  "verify-sc": {
    title: "Verify SC",
    subtitle: "Cryptographic Anti-Counterfeiting & QR Document Verification",
    category: "Cybersecurity & Cryptography",
    stack: ["Node.js", "HMAC / SHA-256", "QR Code APIs", "MySQL"],
    summary: "Implemented cryptographically signed QR code validation preventing document forgery and anti-counterfeiting across distributed client devices.",
    points: [
      "Utilized HMAC-SHA256 asymmetric payload signatures embedded directly into high-density QR matrices for tamper-proof offline & online verification.",
      "Engineered ultra-low-latency verification endpoints capable of instant authentication under 20ms.",
      "Implemented single-use token invalidation to protect against credential cloning and certificate unauthorized transfers.",
      "Built tamper-evident audit logs within MySQL to record every verification attempt and scan location metadata."
    ],
    architecture: "Issuing Authority -> HMAC-SHA256 Generator -> Encoded QR Matrix -> Client Scanner -> High-Speed Node Auth Endpoint -> MySQL Ledger",
    github: "https://github.com/swadhin-in"
  },
  "uncl-world": {
    title: "UNCL World",
    subtitle: "Global Peer-to-Peer Real-Time Networking Hub",
    category: "Full Stack & WebSockets",
    stack: ["React", "WebSockets", "Firebase", "Cloudflare CDN"],
    summary: "Constructed a scalable peer-to-peer networking platform enabling real-time content sharing and community interactions.",
    points: [
      "Designed full-duplex WebSocket channels with automatic fallback to Firebase Realtime listeners to guarantee zero dropouts during network handshakes.",
      "Engineered peer discovery and mesh state sync for instantaneous media streaming and collaborative workspaces.",
      "Deployed global edge-caching strategies via Cloudflare CDN ensuring sub-50ms latency across international users.",
      "Implemented client-side end-to-end data encryption for private community communication channels."
    ],
    architecture: "React Client -> Cloudflare Edge -> WebSockets Mesh / WebRTC Signaling -> Firebase Realtime Store",
    github: "https://github.com/swadhin-in"
  }
};

// Initialize features
document.addEventListener("DOMContentLoaded", () => {
  initProjectFilter();
  initModal();
  initTimeClock();
  initCopyActions();
  initVCardDownload();
  initNavScroll();
  initMobileMenu();
});

// Real-time IST Clock
function initTimeClock() {
  const clockEl = document.getElementById("istClock");
  if (!clockEl) return;

  function update() {
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    const now = new Date().toLocaleTimeString("en-IN", options);
    clockEl.textContent = `${now} IST (Kolkata, India)`;
  }
  update();
  setInterval(update, 1000);
}

// Project Category Filtering
function initProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active state
      buttons.forEach(b => {
        b.classList.remove("bg-blue-600", "text-white", "shadow-md");
        b.classList.add("bg-white", "text-slate-600", "border", "border-slate-200");
      });
      btn.classList.add("bg-blue-600", "text-white", "shadow-md");
      btn.classList.remove("bg-white", "text-slate-600", "border-slate-200");

      const filter = btn.getAttribute("data-filter");

      cards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category.includes(filter)) {
          card.classList.remove("hidden");
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 50);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Project Details Modal
function initModal() {
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const detailButtons = document.querySelectorAll(".open-project-modal");

  if (!modal) return;

  detailButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projId = btn.getAttribute("data-project-id");
      const proj = PROJECT_DETAILS[projId];
      if (!proj) return;

      document.getElementById("modalTitle").textContent = proj.title;
      document.getElementById("modalSubtitle").textContent = proj.subtitle;
      document.getElementById("modalCategory").textContent = proj.category;
      document.getElementById("modalSummary").textContent = proj.summary;
      document.getElementById("modalArchitecture").textContent = proj.architecture;

      // Stack
      const stackContainer = document.getElementById("modalStack");
      stackContainer.innerHTML = proj.stack.map(s => 
        `<span class="badge-pill bg-blue-50 text-blue-700 border-blue-200 font-mono text-xs">${s}</span>`
      ).join(" ");

      // Highlights
      const pointsContainer = document.getElementById("modalPoints");
      pointsContainer.innerHTML = proj.points.map(p => 
        `<li class="flex items-start gap-2.5">
          <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
          <span class="text-slate-700 text-sm leading-relaxed">${p}</span>
        </li>`
      ).join("");

      document.getElementById("modalGithub").href = proj.github;

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// 1-Click Copy Actions
function initCopyActions() {
  const copyEmailBtns = document.querySelectorAll(".copy-email-btn");
  const copyPhoneBtns = document.querySelectorAll(".copy-phone-btn");

  copyEmailBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText("swadhin0031@gmail.com").then(() => {
        showToast("Email copied to clipboard: swadhin0031@gmail.com");
      });
    });
  });

  copyPhoneBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText("+918327412357").then(() => {
        showToast("Phone copied to clipboard: +918327412357");
      });
    });
  });
}

// Generate & Download vCard (.vcf)
function generateVCardString() {
  const photoB64 = (window.PROFILE_PHOTO_BASE64 || "").trim();

  // Prepare folded lines for vCard 3.0 photo
  const photoLines = [];
  if (photoB64) {
    const prefix = "PHOTO;ENCODING=BASE64;TYPE=JPEG:";
    for (let i = 0; i < photoB64.length; i += 72) {
      const chunk = photoB64.substring(i, Math.min(i + 72, photoB64.length));
      if (i === 0) {
        photoLines.push(prefix + chunk);
      } else {
        photoLines.push(" " + chunk);
      }
    }
  }

  const vCardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Swadhin Ghosh",
    "N:Ghosh;Swadhin;;;",
    "TITLE:Founder & Software Development Engineer",
    "ORG:Superx Corporation Pvt Ltd",
    "EMAIL;TYPE=INTERNET,WORK:swadhin0031@gmail.com",
    "TEL;TYPE=WORK,VOICE:+918327412357",
    "TEL;TYPE=HOME,VOICE:+918327412357",
    "URL;TYPE=WORK:https://superxcorporation.in",
    "URL;TYPE=HOME:https://swadhin-in.github.io",
    "item1.URL:https://swadhin-in.github.io",
    "item1.X-ABLabel:Portfolio",
    "X-PORTFOLIO:https://swadhin-in.github.io",
    "ADR;TYPE=WORK:;;;Kolkata;WB;;India",
    "ADR;TYPE=HOME:;;;Kolkata;WB;;India",
    "LABEL;TYPE=WORK:Kolkata, WB, India",
    "LABEL;TYPE=HOME:Kolkata, WB, India",
    "X-SOCIALPROFILE;type=linkedin:https://linkedin.com/in/swadhin-ind",
    "X-SOCIALPROFILE;type=github:https://github.com/swadhin-in",
    "NOTE:Founder & Software Development Engineer | Superx Corporation | Google Student Ambassador"
  ];

  if (photoLines.length > 0) {
    vCardLines.push(...photoLines);
  }

  vCardLines.push("END:VCARD");
  return vCardLines.join("\r\n");
}

function initVCardDownload() {
  const vcardBtns = document.querySelectorAll(".download-vcard-action");
  const mainBtn = document.getElementById("downloadVCardBtn");

  function triggerDownload() {
    const vCardContent = generateVCardString();
    const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Swadhin_Ghosh_Contact.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Contact card (vCard) with photo downloaded!");
  }

  if (mainBtn) {
    mainBtn.addEventListener("click", triggerDownload);
  }

  vcardBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      triggerDownload();
    });
  });
}

// Navigation scroll spy & smooth jump
function initNavScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-blue-600", "font-bold");
      link.classList.add("text-slate-600");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("text-blue-600", "font-bold");
        link.classList.remove("text-slate-600");
      }
    });
  });
}

// Mobile Menu
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}
