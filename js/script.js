// Language switching
function initLanguage() {
    const currentLang = getCurrentLanguage();
    document.documentElement.lang = currentLang;
    updateLanguageButtons(currentLang);
    updatePageContent();
}

function updateLanguageButtons(lang) {
    const buttons = document.querySelectorAll('.language-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if ((lang === 'en' && btn.textContent === 'EN') || (lang === 'de' && btn.textContent === 'DE')) {
            btn.classList.add('active');
        }
    });
}

function updatePageContent() {
    const lang = getCurrentLanguage();
    
    // Update navbar links
    document.querySelectorAll('.navbar-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes('index.html') || href.includes('about.html')) {
            link.textContent = getTranslation(lang, 'navbar.about');
        } else if (href.includes('experience.html')) {
            link.textContent = getTranslation(lang, 'navbar.experience');
        } else if (href.includes('skills.html')) {
            link.textContent = getTranslation(lang, 'navbar.skills');
        } else if (href.includes('certificates.html')) {
            link.textContent = getTranslation(lang, 'navbar.certificates');
        }
    });
    
    // Get current page from data-page attribute
    const currentPage = document.querySelector('article[data-page]')?.getAttribute('data-page');
    const articleTitle = document.querySelector('.article-title');
    const footer = document.querySelector('footer p');
    
    // Update page content based on data-page attribute
    if (currentPage === 'about') {
        updateAboutPage(lang);
    } else if (currentPage === 'experience') {
        updateExperiencePage(lang);
    } else if (currentPage === 'skills') {
        updateSkillsPage(lang);
    } else if (currentPage === 'certificates') {
        updateCertificatesPage(lang);
    }
    
    // Update footer
    if (footer) {
        footer.textContent = getTranslation(lang, 'footer');
    }
}

function updateAboutPage(lang) {
    const aboutText = document.querySelector('.about-text');
    const articleTitle = document.querySelector('.article-title');

    if (articleTitle) articleTitle.textContent = getTranslation(lang, 'about.title');

    if (aboutText) {
        const container = document.getElementById('about-paragraphs');
        if (!container) return;
        // clear existing
        container.innerHTML = '';
        const aboutObj = getTranslation(lang, 'about');
        if (aboutObj && typeof aboutObj === 'object') {
            const keys = Object.keys(aboutObj).filter(k => k.startsWith('p')).sort();
            keys.forEach(k => {
                const p = document.createElement('p');
                p.innerHTML = aboutObj[k];
                container.appendChild(p);
            });
        }
    }
}

function updateExperiencePage(lang) {
    const timelineList = document.querySelector('.timeline-list');
    
    if (timelineList) {
        const jobs = getTranslation(lang, 'experience.jobs');
        const items = timelineList.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            if (jobs[index]) {
                const title = item.querySelector('.timeline-item-title');
                const span = item.querySelector('span');
                const desc = item.querySelector('.timeline-text');
                if (title) title.textContent = jobs[index].title;
                if (span) span.textContent = jobs[index].period;
                if (desc) desc.innerHTML = jobs[index].description;
            }
        });
    }
}

function updateSkillsPage(lang) {
    const skillsList = document.querySelector('.skills-list');
    
    if (skillsList) {
        const items = getTranslation(lang, 'skills.items');
        const skillItems = skillsList.querySelectorAll('.skills-item');
        skillItems.forEach((item, index) => {
            if (items[index]) {
                const h5 = item.querySelector('h5');
                if (h5) h5.textContent = items[index];
            }
        });
        
        // Sort by A-Z by default
        sortSkills('alpha');
    }
}

function updateCertificatesPage(lang) {
    const certificatesList = document.querySelector('.certificates-list');
    
    if (certificatesList) {
        const items = getTranslation(lang, 'certificates.items');
        const certItems = certificatesList.querySelectorAll('.certificate-item');
        certItems.forEach((item, index) => {
            if (items[index]) {
                const name = item.querySelector('.certificate-name');
                const issuer = item.querySelector('.certificate-issuer');
                if (name) name.innerHTML = items[index].name;
                if (issuer) issuer.textContent = items[index].issuer;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initLanguage);

// Skills sorting
function sortSkills(sortType) {
    const skillsList = document.querySelector('.skills-list');
    if (!skillsList) return;
    
    const items = Array.from(skillsList.querySelectorAll('.skills-item'));
    
    if (sortType === 'alpha') {
        items.sort((a, b) => {
            const textA = a.querySelector('h5').textContent.toLowerCase();
            const textB = b.querySelector('h5').textContent.toLowerCase();
            return textA.localeCompare(textB);
        });
    } else if (sortType === 'level') {
        items.sort((a, b) => {
            return parseInt(b.dataset.level) - parseInt(a.dataset.level);
        });
    }
    
    items.forEach(item => skillsList.appendChild(item));
    
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-sort="${sortType}"]`).classList.add('active');
}

// Toggle sidebar contact info
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
const sidebarInfoMore = document.querySelector('.sidebar-info_more');

if (sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
        sidebarInfoMore.classList.toggle('active');
        
        if (sidebarInfoMore.classList.contains('active')) {
            sidebarBtn.innerHTML = '<span>Hide Contacts</span><ion-icon name="chevron-up"></ion-icon>';
        } else {
            sidebarBtn.innerHTML = '<span>Show Contacts</span><ion-icon name="chevron-down"></ion-icon>';
        }
    });
}

// Close sidebar on mobile when clicking a link
const navbarLinks = document.querySelectorAll('.navbar-link');
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Smooth scroll behavior is handled by HTML scroll-behavior: smooth
    });
});
