/**
 * ============================================================================
 * GUCC CYBER SECURITY SOCIETY - MAIN APPLICATION SCRIPT
 * Version: 6.0.0 (Professional, Self-Contained, No External Dependencies)
 * Last Updated: 2026-06-14
 * 
 * FEATURES:
 * - Safe data access with fallbacks (no validator.js needed)
 * - Full page rendering (home, events, blogs, about, committee, contact)
 * - Countdown timer, stats counter, typing animation
 * - Responsive mobile menu with toggle
 * - Navbar hide/show on scroll + mouse proximity
 * - Scroll reveal animations
 * - Contact form validation with success message
 * - Error-resistant – partial failures don't break the whole page
 * ============================================================================
 */

(function() {
    'use strict';

    // ==================== GLOBAL VARIABLES ====================
    let siteData = null;
    let currentPage = '';

    // ==================== UTILITY FUNCTIONS ====================
    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    function safeString(value, defaultValue = '') {
        return (typeof value === 'string') ? value : defaultValue;
    }

    function safeNumber(value, defaultValue = 0) {
        return (typeof value === 'number' && !isNaN(value)) ? value : defaultValue;
    }

    function safeArray(value, defaultValue = []) {
        return Array.isArray(value) ? value : defaultValue;
    }

    function getSafeData(path, defaultValue = null) {
        if (!siteData) return defaultValue;
        const parts = path.split('.');
        let current = siteData;
        for (const part of parts) {
            if (current === null || typeof current !== 'object' || !(part in current)) {
                return defaultValue;
            }
            current = current[part];
        }
        return (current === undefined || current === null) ? defaultValue : current;
    }

    // ==================== PAGE DETECTION ====================
    function getCurrentPage() {
        const bodyId = document.body.id;
        if (bodyId) return bodyId;
        const path = window.location.pathname.split('/').pop();
        if (path === '' || path === '/' || path === 'index.html') return 'index';
        return path.replace('.html', '');
    }

    // ==================== LOAD DATA ====================
    function loadData() {
        if (typeof window.siteData !== 'undefined' && window.siteData) {
            siteData = window.siteData;
            console.log('[GUCC] Data loaded successfully');
            return true;
        } else {
            console.error('[GUCC] siteData not found! Check data.js loading order.');
            showCriticalError();
            return false;
        }
    }

    function showCriticalError() {
        const containers = ['featuresGrid', 'statsGrid', 'activitiesGrid', 'eventsGrid', 'blogsGrid', 'aboutGrid', 'committeeContainer', 'contactInfo', 'faqGrid'];
        containers.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '<div class="error-message" style="color:#ff6666; text-align:center; padding:2rem;">⚠️ Failed to load data. Please refresh or try again later.</div>';
        });
    }

    // ==================== SHARED COMPONENTS ====================
    async function loadSharedComponents() {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (navbarPlaceholder && !navbarPlaceholder.innerHTML.trim()) {
            try {
                const response = await fetch('navbar.html');
                if (response.ok) navbarPlaceholder.innerHTML = await response.text();
                else navbarPlaceholder.innerHTML = '<div class="navbar-error">⚠️ Navigation unavailable</div>';
            } catch(e) {
                navbarPlaceholder.innerHTML = '<div class="navbar-error">⚠️ Navigation unavailable</div>';
            }
        }
        
        if (footerPlaceholder && !footerPlaceholder.innerHTML.trim()) {
            try {
                const response = await fetch('footer.html');
                if (response.ok) footerPlaceholder.innerHTML = await response.text();
                else footerPlaceholder.innerHTML = '<div class="footer-error">⚠️ Footer unavailable</div>';
            } catch(e) {
                footerPlaceholder.innerHTML = '<div class="footer-error">⚠️ Footer unavailable</div>';
            }
        }
    }

    // ==================== PAGE HEADER ====================
    function setPageHeader() {
        const titleEl = document.getElementById('page-title');
        const subtitleEl = document.getElementById('page-subtitle');
        if (!titleEl) return;
        
        const headers = getSafeData('pageHeaders', {});
        const header = headers[currentPage];
        
        if (header && header.title) {
            const newTitle = safeString(header.title);
            titleEl.innerText = newTitle;
            const layers = titleEl.querySelectorAll('.glitch-layer');
            layers.forEach(layer => { if (layer) layer.innerText = newTitle; });
        }
        if (subtitleEl && header && header.subtitle) {
            subtitleEl.innerText = safeString(header.subtitle);
        }
    }

    // ==================== HOMEPAGE RENDERERS ====================
    function renderFeatures() {
        const grid = document.getElementById('featuresGrid');
        if (!grid) return;
        const features = safeArray(getSafeData('features', []));
        if (features.length === 0) {
            grid.innerHTML = '<div class="placeholder-card">Features coming soon.</div>';
            return;
        }
        grid.innerHTML = features.map(f => `
            <div class="feature-card reveal">
                <div class="feature-icon"><i class="fas ${safeString(f.icon, 'fa-shield-alt')}"></i></div>
                <h3>${escapeHtml(safeString(f.title, 'Feature'))}</h3>
                <p>${escapeHtml(safeString(f.description, 'Description coming soon.'))}</p>
            </div>
        `).join('');
    }

    function renderStats() {
        const grid = document.getElementById('statsGrid');
        if (!grid) return;
        const stats = safeArray(getSafeData('stats', []));
        if (stats.length === 0) {
            grid.innerHTML = '<div class="placeholder-card">Statistics loading...</div>';
            return;
        }
        grid.innerHTML = stats.map(s => `
            <div class="stat-card reveal">
                <span class="stat-number" data-target="${safeNumber(s.value, 0)}">0</span>
                <span class="stat-label">${escapeHtml(safeString(s.label, 'Stat'))}</span>
            </div>
        `).join('');
        initStatsCounter();
    }

    function renderActivities(gridId = 'activitiesGrid') {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        const activities = safeArray(getSafeData('activities', []));
        if (activities.length === 0) {
            grid.innerHTML = '<div class="placeholder-card">Activities coming soon.</div>';
            return;
        }
        grid.innerHTML = activities.map(a => `
            <div class="activity-card reveal">
                <div class="activity-icon"><i class="fas ${safeString(a.icon, 'fa-cogs')}"></i></div>
                <h3>${escapeHtml(safeString(a.title, 'Activity'))}</h3>
                <p>${escapeHtml(safeString(a.description, 'Description pending.'))}</p>
            </div>
        `).join('');
    }

    function initCountdown() {
        const daysEl = document.getElementById('days');
        if (!daysEl) return;
        
        let targetStr = getSafeData('countdownTarget', '2026-12-31T23:59:59+06:00');
        if (!targetStr.includes('Z') && !targetStr.includes('+') && !targetStr.includes('-')) {
            targetStr = targetStr + 'T00:00:00+06:00';
        }
        const targetDate = new Date(targetStr);
        if (isNaN(targetDate.getTime())) {
            targetDate.setFullYear(new Date().getFullYear() + 1);
        }
        
        const promoName = document.getElementById('promoEventName');
        const promoDesc = document.getElementById('promoEventDesc');
        const promoLink = document.getElementById('promoEventLink');
        const active = getSafeData('activeEvent', null);
        if (active) {
            if (promoName) promoName.innerText = safeString(active.name, 'DeenSec CTF 2026');
            if (promoDesc) promoDesc.innerText = safeString(active.description || active.name, 'Intra-University Capture The Flag');
            if (promoLink) promoLink.href = safeString(active.ctaLink, 'contact.html');
        }
        
        function update() {
            const diff = targetDate - new Date();
            if (diff <= 0) {
                daysEl.innerText = '00';
                document.getElementById('hours').innerText = '00';
                document.getElementById('minutes').innerText = '00';
                document.getElementById('seconds').innerText = '00';
                return;
            }
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            daysEl.innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        }
        update();
        setInterval(update, 1000);
    }

    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (!statNumbers.length) return;
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            if (animated) return;
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    statNumbers.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'), 10);
                        if (isNaN(target)) return;
                        let current = 0;
                        const increment = target / 50;
                        function updateCounter() {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.floor(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target;
                            }
                        }
                        updateCounter();
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        const statsSection = document.querySelector('.stats');
        if (statsSection) observer.observe(statsSection);
    }

    function initTypingAnimation() {
        const typedElement = document.getElementById('typed-text');
        if (!typedElement) return;
        const phrases = [
            '$ nmap -sV gucc.cyber',
            '$ exploit --target campus',
            '$ flag{you_are_in}',
            '$ whoami → cyber_defender',
            '$ join_ctf --level expert'
        ];
        let phraseIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, 50);
                }
            } else {
                typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, 2000);
                } else {
                    setTimeout(type, 100);
                }
            }
        }
        type();
    }

    // ==================== EVENTS PAGE ====================
    function renderEvents() {
        const grid = document.getElementById('eventsGrid');
        if (!grid) return;
        const events = safeArray(getSafeData('events', []));
        if (events.length === 0) {
            grid.innerHTML = '<div class="placeholder-card">No events scheduled at this time. Check back soon!</div>';
            return;
        }
        grid.innerHTML = events.map(event => {
            const date = event.date || {};
            let dateHtml = '';
            if (date.day === 'Ongoing') dateHtml = `<div class="event-date"><span class="event-day">ONGOING</span></div>`;
            else if (date.day === 'Completed') dateHtml = `<div class="event-date"><span class="event-day">COMPLETED</span></div>`;
            else if (date.day && date.month && date.year) dateHtml = `<div class="event-date"><span class="event-day">${escapeHtml(String(date.day))}</span><span class="event-month">${escapeHtml(date.month)}</span><span class="event-year">${escapeHtml(String(date.year))}</span></div>`;
            else dateHtml = `<div class="event-date"><span class="event-day">TBA</span></div>`;
            
            const speakersHtml = event.speakers && event.speakers.length ? `<div class="event-speakers"><i class="fas fa-users"></i> ${event.speakers.map(s => escapeHtml(s)).join(', ')}</div>` : '';
            const locationHtml = event.location ? `<div class="event-location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(event.location)}</div>` : '';
            const extraHtml = event.extra ? `<div class="event-extra">${escapeHtml(event.extra)}</div>` : '';
            const badgeHtml = event.badge ? `<span class="event-badge">${escapeHtml(event.badge)}</span>` : '';
            
            return `<div class="event-card reveal">${dateHtml}<div class="event-details"><h3>${escapeHtml(event.title || 'Untitled Event')} ${badgeHtml}</h3><p>${escapeHtml(event.description || 'No description available.')}</p>${speakersHtml}${locationHtml}${extraHtml}</div></div>`;
        }).join('');
    }

    function renderEventBanner() {
    const container = document.getElementById('eventBannerContainer');
    if (!container) return;
    const active = getSafeData('activeEvent', null);
    if (!active || !active.name) {
        container.innerHTML = '';
        return;
    }
    const statusText = active.status === 'upcoming' ? 'UPCOMING' : (active.status === 'ongoing' ? 'LIVE NOW' : 'ACTIVE');
    const statusClass = active.status === 'upcoming' ? 'status-upcoming' : (active.status === 'ongoing' ? 'status-live' : 'status-active');
    container.innerHTML = `
        <section class="event-banner reveal">
            <div class="container">
                <div class="banner-content">
                    <div class="banner-status ${statusClass}">
                        <span class="status-dot"></span>
                        <span class="status-text">${escapeHtml(statusText)}</span>
                    </div>
                    <div class="banner-event-info">
                        <h2>${escapeHtml(active.name)}</h2>
                        <div class="banner-meta">
                            <div><i class="fas fa-calendar-alt"></i> ${escapeHtml(active.date || 'TBA')}</div>
                            <div><i class="fas fa-map-marker-alt"></i> ${escapeHtml(active.location || 'Online')}</div>
                        </div>
                        ${active.description ? `<p class="banner-desc">${escapeHtml(active.description)}</p>` : ''}
                    </div>
                    <div class="banner-action">
                        <a href="${escapeHtml(active.ctaLink || '#')}" class="btn btn-primary" target="_blank">${escapeHtml(active.ctaText || 'Learn More')} <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

    // ==================== BLOGS PAGE ====================
    function renderBlogs() {
        const grid = document.getElementById('blogsGrid');
        if (!grid) return;
        const blogs = safeArray(getSafeData('blogs', []));
        if (blogs.length === 0) {
            grid.innerHTML = '<div class="placeholder-card">Blog posts coming soon. Stay tuned!</div>';
            return;
        }
        grid.innerHTML = blogs.map(blog => `
            <div class="blog-card reveal">
                <div class="blog-image"><img src="${escapeHtml(blog.imageUrl || 'https://placehold.co/600x400/0a0a1a/00ffcc?text=NO+IMAGE')}" alt="${escapeHtml(blog.title || 'Blog post')}" loading="lazy" onerror="this.src='https://placehold.co/600x400/0a0a1a/00ffcc?text=IMAGE+MISSING'"></div>
                <div class="blog-content"><span class="blog-category">${escapeHtml(blog.category || 'General')}</span><h3>${escapeHtml(blog.title || 'Untitled')}</h3><p>${escapeHtml(blog.summary || 'No summary available.')}</p><a href="${escapeHtml(blog.readMoreLink || '#')}" class="read-more">Read More <i class="fas fa-chevron-right"></i></a></div>
            </div>
        `).join('');
    }

    // ==================== ABOUT PAGE ====================
    function renderAbout() {
        const grid = document.getElementById('aboutGrid');
        if (!grid) return;
        const ac = getSafeData('aboutContent', null);
        if (!ac) {
            grid.innerHTML = '<div class="placeholder-card">About content loading...</div>';
            return;
        }
        grid.innerHTML = `
            <div class="about-content reveal">
                <span class="section-tag">${escapeHtml(ac.tag || '> whoami')}</span>
                <h2>${escapeHtml(ac.heading || 'About Us')}</h2>
                <p>${safeString(ac.description, 'Information coming soon.')}</p>
                <p>${safeString(ac.description2, '')}</p>
                <ul class="about-list">${safeArray(ac.highlights, []).map(h => `<li><i class="fas fa-skull"></i> ${escapeHtml(h)}</li>`).join('')}</ul>
                <a href="${escapeHtml(ac.buttonUrl || 'contact.html')}" class="btn btn-primary">${escapeHtml(ac.buttonText || 'Join Us')} <i class="fas ${escapeHtml(ac.buttonIcon || 'fa-arrow-right')}"></i></a>
            </div>
            <div class="about-image reveal"><img src="${escapeHtml(ac.imageUrl || 'https://placehold.co/600x450/0a0a1a/00ffcc?text=GUCC+TEAM')}" alt="${escapeHtml(ac.imageAlt || 'GUCC Team')}" loading="lazy" onerror="this.src='https://placehold.co/600x450/0a0a1a/00ffcc?text=IMAGE+MISSING'"></div>
        `;
        renderActivities('aboutActivitiesGrid');
    }

    // ==================== COMMITTEE PAGE ====================
  function renderCommittee() {
    const container = document.getElementById('committeeContainer');
    if (!container) return;
    const groups = safeArray(getSafeData('committeeGroups', []));
    if (groups.length === 0) {
        container.innerHTML = '<div class="placeholder-card">Committee information coming soon.</div>';
        return;
    }
    let html = '';
    groups.forEach(group => {
        const members = safeArray(group.members, []);
        const memberCount = members.length;
        // ডায়নামিক কলাম তৈরি – মেম্বার সংখ্যা অনুযায়ী
        const gridStyle = `style="grid-template-columns: repeat(${memberCount}, 1fr);"`;
        
        html += `<div class="committee-group reveal">
                    <h3 class="group-title">
                        <i class="fas ${safeString(group.icon, 'fa-users')}"></i> 
                        ${escapeHtml(group.groupName || 'Team')}
                    </h3>
                    <div class="committee-grid" ${gridStyle}>`;
        
        members.forEach(m => {
            const imageHtml = m.imageUrl ? 
                `<img src="${escapeHtml(m.imageUrl)}" alt="${escapeHtml(m.name)}" class="member-img" onerror="this.src='https://placehold.co/80x80/0a0a1a/00ffcc?text=NO+IMG'">` : 
                `<div class="member-image"><i class="fas fa-user-secret"></i></div>`;
            
            html += `<div class="member-card">
                        ${imageHtml}
                        <h4>${escapeHtml(m.name || 'Member')}</h4>
                        <p class="member-role">${escapeHtml(m.role || 'Team Member')}</p>
                    </div>`;
        });
        html += `</div></div>`;
    });
    container.innerHTML = html;
}

    // ==================== CONTACT PAGE ====================
    function renderContactInfo() {
        const container = document.getElementById('contactInfo');
        if (!container) return;
        const contactInfo = safeArray(getSafeData('contactInfo', []));
        let html = contactInfo.map(info => `
            <div class="contact-card reveal">
                <i class="fas ${safeString(info.icon, 'fa-info-circle')}"></i>
                <h3>${escapeHtml(info.title || 'Contact')}</h3>
                <p>${safeString(info.details, 'No details available.')}</p>
            </div>
        `).join('');
        const socialLinks = safeArray(getSafeData('socialLinks', []));
        if (socialLinks.length > 0) {
            html += `<div class="social-links reveal">${socialLinks.map(link => `<a href="${escapeHtml(link.url || '#')}" target="_blank" rel="noopener" aria-label="${escapeHtml(link.platform || 'Social')}"><i class="${link.icon || 'fas fa-link'}"></i></a>`).join('')}</div>`;
        }
        container.innerHTML = html || '<div class="placeholder-card">Contact information coming soon.</div>';
    }

    function renderFAQ() {
        const grid = document.getElementById('faqGrid');
        if (!grid) return;
        const faq = safeArray(getSafeData('faq', []));
        if (faq.length === 0) {
            grid.innerHTML = '<div class="placeholder-card">FAQ coming soon.</div>';
            return;
        }
        grid.innerHTML = faq.map(q => `
            <div class="faq-card reveal">
                <i class="fas ${safeString(q.icon, 'fa-question-circle')}"></i>
                <h3>${escapeHtml(q.title || 'Question')}</h3>
                <p>${escapeHtml(q.answer || 'Answer pending.')}</p>
            </div>
        `).join('');
    }

    function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // ফর্মের মান নেওয়া
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        
        // ভ্যালিডেশন
        if (!name) {
            alert('❌ Please enter your name.');
            return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('❌ Please enter a valid email address.');
            return;
        }
        if (!message) {
            alert('❌ Please write your message.');
            return;
        }
        
        // ইমেইল বডি তৈরি
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailSubject = subject ? subject : 'Contact from GUCC website';
        
        // mailto লিংক
        const mailtoLink = `mailto:gucc.css.gub@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
        
        // ব্রাউজারের ডিফল্ট ইমেইল ক্লায়েন্ট ওপেন করা
        window.location.href = mailtoLink;
        
        // সাফল্য মেসেজ
        const successDiv = document.getElementById('formSuccess');
        if (successDiv) {
            successDiv.classList.add('show');
            form.reset();
            setTimeout(() => successDiv.classList.remove('show'), 5000);
        } else {
            alert('✅ Your email client has opened. Please click Send to complete.');
            form.reset();
        }
    });
}
    // ==================== FOOTER SOCIAL ====================
    function renderFooterSocial() {
        const footerSocial = document.getElementById('footerSocialLinks');
        if (footerSocial) {
            const socialLinks = safeArray(getSafeData('socialLinks', []));
            if (socialLinks.length > 0) {
                footerSocial.innerHTML = socialLinks.map(link => `<a href="${escapeHtml(link.url || '#')}" target="_blank" rel="noopener" aria-label="${escapeHtml(link.platform || 'Social')}"><i class="${link.icon || 'fas fa-link'}"></i></a>`).join('');
            } else {
                footerSocial.innerHTML = '';
            }
        }
    }

    // ==================== UI INTERACTIONS ====================
    function setupMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        if (!navToggle || !navMenu) return;
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                    document.body.style.overflow = '';
                }
            });
        });
    }

    function setActiveNavLink() {
        const page = getCurrentPage();
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(page)) link.classList.add('active');
            else link.classList.remove('active');
        });
    }

    function initNavbarHideOnScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        let lastScrollY = window.scrollY;
        let hideTimeout = null;
        function showNavbar() { navbar.classList.remove('hide'); }
        function hideNavbar() { if (window.scrollY > 50) navbar.classList.add('hide'); }
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) hideNavbar();
            else if (window.scrollY < lastScrollY) showNavbar();
            lastScrollY = window.scrollY;
        });
        document.addEventListener('mousemove', (e) => {
            if (e.clientY <= 50) {
                showNavbar();
                if (hideTimeout) clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => { if (window.scrollY > 100) hideNavbar(); }, 1500);
            }
        });
        showNavbar();
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const hash = this.getAttribute('href');
                if (hash === '#') return;
                const target = document.querySelector(hash);
                if (target) {
                    e.preventDefault();
                    const offset = document.querySelector('.navbar')?.offsetHeight || 70;
                    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
                }
            });
        });
    }

    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); } });
        }, { threshold: 0.1 });
        reveals.forEach(el => observer.observe(el));
    }

    // ==================== PAGE DISPATCHER ====================
    function renderPage() {
        switch(currentPage) {
            case 'index':
                renderFeatures();
                renderStats();
                renderActivities('activitiesGrid');
                initCountdown();
                initTypingAnimation();
                break;
            case 'events':
                renderEvents();
                renderEventBanner();
                break;
            case 'blogs':
                renderBlogs();
                break;
            case 'about':
                renderAbout();
                break;
            case 'committee':
                renderCommittee();
                break;
            case 'contact':
                renderContactInfo();
                renderFAQ();
                initContactForm();
                break;
            default:
                console.warn(`[GUCC] Unknown page: ${currentPage}`);
        }
    }

    // ==================== INITIALIZATION ====================
    async function init() {
        console.log('[GUCC] Initializing...');
        await loadSharedComponents();
        if (!loadData()) return;
        currentPage = getCurrentPage();
        setPageHeader();
        renderPage();
        renderFooterSocial();
        setupMobileMenu();
        setActiveNavLink();
        initNavbarHideOnScroll();
        initSmoothScroll();
        initScrollReveal();
        console.log('[GUCC] Initialization complete');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();