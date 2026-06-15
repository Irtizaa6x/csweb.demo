/**
 * ============================================================================
 * GUCC CYBER SECURITY SOCIETY - CENTRAL DATA MODULE
 * Version: 6.0.0 (Professional, Clean Syntax, Fully Compatible)
 * Last Updated: 2026-06-14
 * 
 * HOW TO EDIT SAFELY:
 * 1. Follow the exact structure shown below (don't change property names)
 * 2. All arrays can be empty: `events: []`
 * 3. Strings must be in quotes: "example"
 * 4. Numbers don't need quotes: 120
 * 5. No trailing commas inside objects (valid JSON-like syntax)
 * 6. After editing, save and refresh the page
 * 
 * SCHEMA REFERENCE:
 * - pageHeaders: object with page keys { title, subtitle }
 * - activeEvent: { name, date, location, status, ctaLink, ctaText, description }
 * - countdownTarget: ISO string with timezone (Asia/Dhaka UTC+6)
 * - features: array of { icon, title, description }
 * - stats: array of { label, value } (value must be number)
 * - activities: array of { icon, title, description }
 * - events: array of event objects (see example below)
 * - blogs: array of blog objects (see example below)
 * - aboutContent: object with all about page fields
 * - committeeGroups: array of groups with members (email/phone)
 * - contactInfo: array of contact cards
 * - socialLinks: array of { platform, url, icon }
 * - faq: array of { icon, title, answer }
 * ============================================================================
 */

const siteData = {
    // Metadata
    version: "6.0.0",
    lastUpdated: "2026-06-14",

    // ==================== PAGE HEADERS ====================
    pageHeaders: {
        events: {
            title: "// EVENTS.EXE",
            subtitle: "Past and upcoming cybersecurity events, workshops, and competitions"
        },
        blogs: {
            title: "// BLOGS.SYS",
            subtitle: "Insights, stories, and technical writeups from the world of cybersecurity"
        },
        about: {
            title: "// ABOUT.INF",
            subtitle: "Who we are, what we do, and why cybersecurity matters"
        },
        committee: {
            title: "// COMMITTEE.KEY",
            subtitle: "GUCC Cyber Security Society – Leading the digital defense"
        },
        contact: {
            title: "// CONTACT.INI",
            subtitle: "Start the conversation — we're here to help and collaborate"
        }
    },

    // ==================== ACTIVE EVENT (for homepage countdown & banner) ====================
    activeEvent: {
        name: "Cyber Security Engineers Level -3",
        date: "June 30, 2026",
        location: "Online + GU Campus",
        status: "upcoming",
        ctaLink: "https://docs.google.com/forms/d/e/1FAIpQLSfaBgxnLsi4BUT7UNR5Grfwc9ZMIDsuSr81iChkLQ5sw0WLEw/viewform?usp=dialog",
        ctaText: "Register Now",
        description: "More details coming."
    },

    // ==================== COUNTDOWN TARGET (Asia/Dhaka UTC+6) ====================
    countdownTarget: "2026-06-20T00:00:00+06:00",

    // ==================== FEATURES (Homepage) ====================
    features: [
        {
            icon: "fa-laptop-code",
            title: "Hands-on Training",
            description: "Practical sessions on ethical hacking, Linux, and cybersecurity tools."
        },
        {
            icon: "fa-flag-checkered",
            title: "CTF Competitions",
            description: "Regular Capture The Flag challenges to test your skills."
        },
        {
            icon: "fa-users",
            title: "Professional Network",
            description: "Connect with industry experts and build your career."
        }
    ],

    // ==================== STATISTICS ====================
    stats: [
        { label: "Workshops", value: 2 },
        { label: "CTF Events", value: 3 },
        { label: "Active Members", value: 120 },
        { label: "Seminars", value: 1 }
    ],

    // ==================== ACTIVITIES ====================
    activities: [
        {
            icon: "fa-chalkboard-user",
            title: "Workshops & Training",
            description: "Hands-on ethical hacking, Linux, and security tools."
        },
        {
            icon: "fa-boot",
            title: "Bootcamp",
            description: "Intensive training on penetration testing and defense."
        },
        {
            icon: "fa-flag-checkered",
            title: "CTF Competitions",
            description: "Regular Capture The Flag challenges – from beginner to advanced."
        },
        {
            icon: "fa-microphone-alt",
            title: "Seminars",
            description: "Industry experts share insights on cyber threats."
        },
        {
            icon: "fa-handshake",
            title: "Community Support",
            description: "Learn real-world techniques in a collaborative environment."
        },
        {
            icon: "fa-share-alt",
            title: "Knowledge Sharing",
            description: "Member-led tech talks and problem-solving sessions."
        }
    ],

    // ==================== EVENTS (Past & Upcoming) ====================
    events: [
        {
            title: "Beginner to Intermediate CS Training Level -2",
            date: { day: "08", month: "Feb", year: 2026 },
            description: "Introduction to Cybersecurity & CTF, Linux for CTF, Cryptography, Web Hacking for CTF, Digital Forensics, OSINT and Stegography.",
            speakers: ["Md. Abu Saied", "Mahfuzur Rahman", "Asadujjaman Noor", "Samiul Kureshi Sourav", "Tarikul Islam", "Md. Emon Mia"],
            location: "Online",
            status: "completed",
            badge: "✅ Completed",
            extra: ""
        },
        {
            title: "Introduction to Cyber Security Level -1",
            date: { day: "24", month: "Oct", year: 2025 },
            description: "Internal Training, Web Technology, Operating System Linux, Networking Fundamentals.",
            speakers: ["Mahady Hasan Fahim", "Md Robiul Islam", "Ashrafun Nahar Arifa"],
            location: "Online",
            status: "completed",
            badge: "✅ Completed",
            extra: ""
        }
    ],

    // ==================== BLOGS ====================
    blogs: [
        {
            id: 1,
            title: "Cybersecurity Threats to Futuristic AI",
            category: "Artificial Intelligence",
            summary: "Exploring the new battleground of AI-driven cyber threats. How adversarial attacks and model poisoning are reshaping security.",
            imageUrl: "https://placehold.co/600x400/0a0a1a/00ffcc?text=AI+HACK",
            readMoreLink: "#"
        },
        {
            id: 2,
            title: "'Zero Trust': New Horizons in Security",
            category: "Security Model",
            summary: "Why traditional perimeter-based security is failing. Learn how Zero Trust architecture works and why it's becoming essential.",
            imageUrl: "https://placehold.co/600x400/0a0a1a/ff00cc?text=ZERO+TRUST",
            readMoreLink: "#"
        },
        {
            id: 3,
            title: "Know Your Enemy: Understanding Footprinting",
            category: "Ethical Hacking",
            summary: "The first step of any cyber attack – footprinting. Learn how ethical hackers gather intelligence and protect your digital footprint.",
            imageUrl: "https://placehold.co/600x400/0a0a1a/00ffcc?text=FOOTPRINT",
            readMoreLink: "#"
        },
        {
            id: 4,
            title: "CTF 101: Beginner's Guide to Capture The Flag",
            category: "CTF Walkthrough",
            summary: "Essential tools, techniques, and mindset for succeeding in your first CTF competition.",
            imageUrl: "https://placehold.co/600x400/0a0a1a/ff00cc?text=CTF+GUIDE",
            readMoreLink: "#"
        },
        {
            id: 5,
            title: "Spot the Hook: How to Detect Phishing Emails",
            category: "Awareness",
            summary: "Real-world examples of phishing attacks and how to identify them before it's too late.",
            imageUrl: "https://placehold.co/600x400/0a0a1a/00ffcc?text=PHISHING",
            readMoreLink: "#"
        },
        {
            id: 6,
            title: "Basics of Cryptography: From Caesar to AES",
            category: "Cryptography",
            summary: "A gentle introduction to encryption, hashing, and digital signatures.",
            imageUrl: "https://placehold.co/600x400/0a0a1a/ff00cc?text=CRYPTO",
            readMoreLink: "#"
        }
    ],

    // ==================== ABOUT PAGE CONTENT ====================
    aboutContent: {
        tag: "> whoami",
        heading: "Empowering the Next Generation of Cyber Defenders",
        description: "<strong>GUCC Cyber Security Society</strong> is a student-led organization dedicated to promoting cybersecurity awareness, ethical hacking skills, and professional development. We bring industry experts to train students through our exclusive bootcamp programs, workshops, and CTF competitions.",
        description2: "Our mission is to create a community where students can learn, practice, and excel in the field of cybersecurity – regardless of their starting level. We believe that a secure digital future begins with educated and empowered defenders.",
        highlights: [
            "Cybersecurity Fundamentals",
            "Defense Mechanisms",
            "CTF Competitions",
            "Strong Community",
            "Career Guidance",
            "Ethical Hacking Skills"
        ],
        buttonText: "Join Our Community",
        buttonUrl: "contact.html",
        buttonIcon: "fa-arrow-right",
        imageUrl: "https://placehold.co/600x450/0a0a1a/00ffcc?text=GUCC+TEAM",
        imageAlt: "Cyber Security Team"
    },

    // ==================== COMMITTEE GROUPS ====================
committeeGroups: [
    {
        groupName: "Moderator Team",
        icon: "fa-gavel",
        members: [
            { name: "Md. Monirul Islam", role: "Moderator", imageUrl: "" },
            { name: "Montaser Abdul Quader", role: "Deputy Moderator", imageUrl: "" },
            { name: "Feroza Nazin", role: "Deputy Moderator", imageUrl: "" }
        ]
    },
    {
        groupName: "Executive Committee",
        icon: "fa-crown",
        members: [
            { name: "Mahady Hasan Fahim", role: "Chair", imageUrl: "" },
            { name: "Md. Robiul Islam", role: "Vice Chair", imageUrl: "" },
            { name: "Ashrafun Nahar Arifa", role: "General Secretary", imageUrl: "" },
            { name: "Thiaba Rahman Methi", role: "Treasurer", imageUrl: "" }
        ]
    },
    {
        groupName: "Secretaries",
        icon: "fa-tasks",
        members: [
            { name: "Nuren Abreshum Anonta", role: "Red Team Secretary", imageUrl: "" },
            { name: "Md. Tanvir Hasan Abokash", role: "Organizing Secretary", imageUrl: "" },
            { name: "Shoaib", role: "CTF Secretary", imageUrl: "" },
            { name: "Abdullah", role: "Blue Team Secretary", imageUrl: "" }
        ]
    },
    {
        groupName: "Multimedia Specialists",
        icon: "fa-video",
        members: [
            { name: "Rezanur Rahman Anan", role: "Multimedia Specialist", imageUrl: "" },
            { name: "Md. Tarikul Islam Tuhen", role: "Multimedia Specialist", imageUrl: "" },
            { name: "Shahta Jarab", role: "Multimedia Specialist", imageUrl: "" }
        ]
    },
    {
        groupName: "Executive Members",
        icon: "fa-users",
        members: [
            { name: "Romana Zaman", role: "Executive Member", imageUrl: "" },
            { name: "Md. Arman Hossain Rifat", role: "Executive Member", imageUrl: "" }
        ]
    }
],
    // ==================== CONTACT INFO ====================
    contactInfo: [
        {
            icon: "fa-map-marker-alt",
            title: "Our Address",
            details: "Green University of Bangladesh<br>Purbachal American City, Kanchan, Rupganj, Narayanganj-1461, Dhaka<br>Bangladesh"
        },
        {
            icon: "fa-envelope",
            title: "Email Us",
            details: "gucc.css.gub@gmail.com"
        },
        {
            icon: "fa-phone-alt",
            title: "Call Us",
            details: ""
        }
    ],

    // ==================== SOCIAL LINKS ====================
    socialLinks: [
        { platform: "Facebook", url: "https://www.facebook.com/share/1SPjmR4Rud/", icon: "fab fa-facebook-f" },
        { platform: "WhatsApp", url: "https://chat.whatsapp.com/HrT836SLXMlDaeKJR9AGmx", icon: "fab fa-whatsapp" },
        { platform: "Messenger", url: "https://m.me/j/AbYb911ubVITnupU/", icon: "fab fa-facebook-messenger" },
        { platform: "Website", url: "https://gucc.green.edu.bd/", icon: "fas fa-globe" },
        { platform: "GitHub", url: "https://github.com/gucc-cyber", icon: "fab fa-github" }
    ],

    // ==================== FAQ ====================
    faq: [
        {
            icon: "fa-question-circle",
            title: "How can I join?",
            answer: "Fill out the membership form during our recruitment drive or contact us via email."
        },
        {
            icon: "fa-calendar-alt",
            title: "When are meetings?",
            answer: "Weekly meetups every Thursday at 4 PM in the CSE department seminar room."
        },
        {
            icon: "fa-laptop-code",
            title: "Do I need prior experience?",
            answer: "Not at all! Beginners are welcome. We have sessions for all skill levels."
        },
        {
            icon: "fa-trophy",
            title: "How do I participate in CTFs?",
            answer: "We announce CTF competitions via social media and email. Just register and join."
        }
    ]
};

// Make it globally available
if (typeof window !== 'undefined') {
    window.siteData = siteData;
}

// For module compatibility (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteData;
}