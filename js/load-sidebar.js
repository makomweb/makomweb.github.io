// Load sidebar from external file
async function loadSidebar() {
    try {
        const response = await fetch('../components/sidebar.html');
        const sidebarHTML = await response.text();
        const mainElement = document.querySelector('main');
        
        if (mainElement) {
            mainElement.insertAdjacentHTML('afterbegin', sidebarHTML);
            
            // Reinitialize ionicons after sidebar is loaded
            if (window.Ionicons) {
                window.Ionicons.build();
            }
        }
    } catch (error) {
        console.error('Error loading sidebar:', error);
    }
}

// Load sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSidebar);
} else {
    loadSidebar();
}
