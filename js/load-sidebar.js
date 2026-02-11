// Load sidebar from external file
async function loadSidebar() {
    try {
        const mainElement = document.querySelector('main');
        
        // Prevent duplicate sidebar loading
        if (mainElement && !mainElement.querySelector('.sidebar')) {
            const response = await fetch('../components/sidebar.html');
            const sidebarHTML = await response.text();
            
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
