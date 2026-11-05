// Interactive Terminal for Swadhin's Portfolio

const TERMINAL_COMMANDS = {
  help: () => `
Available commands:
  <span class="text-cyan-400">about</span>          - Brief bio and current focus
  <span class="text-cyan-400">skills</span>         - Core technologies and tools
  <span class="text-cyan-400">projects</span>       - Production projects & architectures
  <span class="text-cyan-400">experience</span>     - Industry roles & internships
  <span class="text-cyan-400">certs</span>          - Verified certifications & credentials
  <span class="text-cyan-400">socials</span>        - Links to LinkedIn, GitHub, Google Dev, etc.
  <span class="text-cyan-400">contact</span>        - Email, WhatsApp, and phone details
  <span class="text-cyan-400">sudo hire</span>      - Special message for recruiters & founders
  <span class="text-cyan-400">clear</span>          - Clear terminal history
  <span class="text-cyan-400">time</span>           - Current Indian Standard Time (IST)
`,

  about: () => `
<span class="text-emerald-400 font-bold">Swadhin Ghosh</span>
Role: Full-Stack Developer & Founder at Superx Corporation
Education: BTech in Computer Science & Engineering (CEMK / MAKAUT, 2023-2028)
Location: Purba Bardhaman, West Bengal, India
Status: Available for Software Roles, High-Impact Internships & Collaborations.
`,

  skills: () => `
<span class="text-blue-400 font-bold">[Frontend]</span>      React, JavaScript (ES6+), HTML5, Tailwind CSS
<span class="text-blue-400 font-bold">[Backend]</span>       Node.js, Express, Python, REST APIs
<span class="text-blue-400 font-bold">[Databases]</span>     MongoDB, MySQL, Firebase Firestore
<span class="text-blue-400 font-bold">[Cloud & Ops]</span>   AWS, GCP, Azure, VPS Deployment, Web/App Hosting
<span class="text-blue-400 font-bold">[AI & ML]</span>       Gemini API, OpenCV, Face Recognition, Jupyter
<span class="text-blue-400 font-bold">[Security]</span>      Network Sniffing, NIDS, HMAC/SHA-256, Digital Forensics
`,

  projects: () => `
1. <span class="text-amber-400 font-semibold">Superx Shop</span>: Multi-tenant e-commerce web & app platform (React, Node, Express, MongoDB, Razorpay/UPI)
2. <span class="text-amber-400 font-semibold">Superx Mailer</span>: Automated high-deliverability email outreach platform (Express, Nodemailer, APIs)
3. <span class="text-amber-400 font-semibold">Attendance SC</span>: Biometric facial recognition attendance & workforce system (Python, OpenCV, MongoDB)
4. <span class="text-amber-400 font-semibold">Verify SC</span>: Cryptographically signed QR document & product anti-counterfeit system (Node, HMAC/SHA-256)
5. <span class="text-amber-400 font-semibold">UNCL World</span>: Global real-time P2P networking hub (React, WebSockets, Firebase, Cloudflare CDN)

Type <span class="text-cyan-400">project &lt;name&gt;</span> or scroll to the Projects section to explore architectures.
`,

  experience: () => `
- <span class="text-indigo-400 font-bold">Eastern Coalfields Limited</span>: Software Developer Intern (Aug 2026 – Present)
- <span class="text-indigo-400 font-bold">Superx Corporation Pvt Ltd</span>: Founder & Dev (Jan 2026 – Present)
- <span class="text-indigo-400 font-bold">Google</span>: Student Ambassador (Sep 2025 – Jul 2026)
- <span class="text-indigo-400 font-bold">CodeAlpha</span>: Cyber Security Intern (Aug 2025 – Nov 2025)
`,

  certs: () => `
- <span class="text-green-400">ISRO (IIRS)</span>: AI/ML for Geo Data Analysis
- <span class="text-green-400">Cisco</span>: Introduction to Cybersecurity
- <span class="text-green-400">Coursera</span>: Google AI Essentials
- <span class="text-green-400">I4C</span>: Forensic Track (Digital forensics & cybercrime analysis)
- <span class="text-green-400">Hacktoberfest 2025</span>: 6 Accepted Open-Source PRs
- <span class="text-green-400">Google</span>: Ads Measurement Certification
- <span class="text-green-400">Wayspire</span>: Full Stack Web Development
`,

  socials: () => `
LinkedIn:         <a href="https://linkedin.com/in/swadhin-ind" target="_blank" class="text-cyan-300 underline">linkedin.com/in/swadhin-ind</a>
GitHub:           <a href="https://github.com/swadhin-in" target="_blank" class="text-cyan-300 underline">github.com/swadhin-in</a>
Google Developer: <a href="https://me.developers.google.com/u/Swadhin-india" target="_blank" class="text-cyan-300 underline">me.developers.google.com/u/Swadhin-india</a>
Salesforce:       <a href="https://www.salesforce.com/trailblazer/swadhin-india" target="_blank" class="text-cyan-300 underline">salesforce.com/trailblazer/swadhin-india</a>
Credly:           <a href="https://www.credly.com/users/swadhin.india" target="_blank" class="text-cyan-300 underline">credly.com/users/swadhin.india</a>
`,

  contact: () => `
Email:    <a href="mailto:swadhin0031@gmail.com" class="text-cyan-300 underline">swadhin0031@gmail.com</a>
Phone:    <a href="tel:+918327412357" class="text-cyan-300 underline">+91 83274 12357</a>
WhatsApp: <a href="https://wa.me/918327412357" target="_blank" class="text-cyan-300 underline">Chat on WhatsApp</a>
Location: Purba Bardhaman, WB, India (713128)
`,

  "sudo hire": () => `
<span class="text-emerald-400 font-bold">Access Granted: [HIRING PROTOCOL ACTIVATED]</span>
Thank you for your interest! Swadhin brings a rare blend of full-stack engineering,
entrepreneurial drive (founder of Superx Corporation), AI integration, and cybersecurity acumen.
Let's build something exceptional together!

👉 Direct Email: <a href="mailto:swadhin0031@gmail.com?subject=Opportunity%20Discussion" class="text-cyan-300 underline">swadhin0031@gmail.com</a>
👉 Direct Call/WhatsApp: <a href="https://wa.me/918327412357" target="_blank" class="text-cyan-300 underline">+91 83274 12357</a>
`,

  sudo: () => `<span class="text-rose-400">Permission denied: try 'sudo hire' 😉</span>`,

  time: () => {
    const ist = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    return `<span class="text-amber-300">Current IST (India):</span> ${ist}`;
  },

  whoami: () => `<span class="text-cyan-400">visitor@swadhin-portfolio</span>`
};

document.addEventListener("DOMContentLoaded", () => {
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalInput = document.getElementById("terminalInput");
  const history = [];
  let historyIndex = -1;

  if (!terminalInput || !terminalOutput) return;

  function appendOutput(content) {
    const div = document.createElement("div");
    div.innerHTML = content;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawVal = terminalInput.value.trim();
      const command = rawVal.toLowerCase();

      if (rawVal) {
        history.push(rawVal);
        historyIndex = history.length;
      }

      appendOutput(`<div class="text-slate-400 mt-2"><span class="text-emerald-400">swadhin@guest:~$</span> ${rawVal}</div>`);
      terminalInput.value = "";

      if (command === "clear") {
        terminalOutput.innerHTML = "";
        return;
      }

      if (TERMINAL_COMMANDS[command]) {
        appendOutput(TERMINAL_COMMANDS[command]());
      } else if (command.startsWith("project ")) {
        const projName = command.replace("project ", "").trim();
        appendOutput(`<div class="text-slate-300">Searching details for <span class="text-cyan-400">${projName}</span>... Scroll down to the Projects section to see full interactive breakdown.</div>`);
      } else if (command === "") {
        // empty enter
      } else {
        appendOutput(`<div class="text-rose-400">Command not found: "${rawVal}". Type <span class="text-cyan-300 font-bold">help</span> to view all commands.</div>`);
      }
    } else if (e.key === "ArrowUp") {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = "";
      }
    }
  });

  // Focus terminal when clicked on terminal body
  const termBody = document.querySelector(".terminal-body");
  if (termBody) {
    termBody.addEventListener("click", () => {
      terminalInput.focus();
    });
  }
});
