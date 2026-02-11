// Theme switching logic
const THEME_KEY = 'theme-preference';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_AUTO = 'auto';

function getCurrentTheme() {
    return localStorage.getItem(THEME_KEY) || THEME_AUTO;
}

function getEffectiveTheme() {
    const preference = getCurrentTheme();
    if (preference === THEME_AUTO) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
    }
    return preference;
}

function applyTheme() {
    const effectiveTheme = getEffectiveTheme();
    const html = document.documentElement;
    
    // Remove both possible classes
    html.classList.remove('dark', 'light', 'dark-theme');
    
    // Add the appropriate class
    if (effectiveTheme === THEME_DARK) {
        html.classList.add('dark-theme');
    } else {
        html.classList.add('light');
    }
    
    html.style.colorScheme = effectiveTheme;
}

function setTheme(theme) {
    if (![THEME_LIGHT, THEME_DARK, THEME_AUTO].includes(theme)) {
        return;
    }
    
    localStorage.setItem(THEME_KEY, theme);
    applyTheme();
    updateThemeButtons();
}

function updateThemeButtons() {
    const currentTheme = getCurrentTheme();
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === currentTheme) {
            btn.classList.add('active');
        }
    });
}

function initTheme() {
    applyTheme();
    updateThemeButtons();
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getCurrentTheme() === THEME_AUTO) {
            applyTheme();
        }
    });
}

document.addEventListener('DOMContentLoaded', initTheme);
