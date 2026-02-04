// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Initialize all modules
    initMobileMenu();
    initSearch();
    initScrollEffects();
    initAnimations();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchBox = document.getElementById('searchBox');
    
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const searchableItems = document.querySelectorAll('.card, .update-card, .article-item');
            
            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show "no results" message if needed
            const visibleItems = Array.from(searchableItems).filter(item => item.style.display !== 'none');
            handleNoResults(visibleItems.length === 0, searchTerm);
        });
    }
}

function handleNoResults(noResults, searchTerm) {
    const existingMessage = document.getElementById('noResultsMessage');
    
    if (noResults && searchTerm.length > 0) {
        if (!existingMessage) {
            const message = document.createElement('div');
            message.id = 'noResultsMessage';
            message.className = 'no-results-message';
            message.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i data-lucide="search-x" style="width: 60px; height: 60px; margin-bottom: 1rem;"></i>
                    <h3>Tidak ada hasil untuk "${searchTerm}"</h3>
                    <p>Coba kata kunci lain atau hapus pencarian</p>
                </div>
            `;
            
            const container = document.querySelector('.card-grid, .updates-grid, .article-list');
            if (container) {
                container.parentNode.insertBefore(message, container.nextSibling);
                lucide.createIcons();
            }
        }
    } else if (existingMessage) {
        existingMessage.remove();
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 200, 255, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.card, .stat-card, .update-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add smooth hover effects
    const cards = document.querySelectorAll('.card, .update-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Stats counter animation
    animateStats();
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseInt(target));
        
        if (isNumber) {
            const finalValue = parseInt(target);
            let current = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 30);
        }
    });
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add back to top button
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        if (!backToTop) {
            const btn = document.createElement('button');
            btn.id = 'backToTop';
            btn.innerHTML = '<i data-lucide="arrow-up"></i>';
            btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(0, 200, 255, 0.4);
                transition: all 0.3s ease;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            btn.addEventListener('click', scrollToTop);
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 30px rgba(0, 200, 255, 0.6)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 20px rgba(0, 200, 255, 0.4)';
            });
            document.body.appendChild(btn);
            lucide.createIcons();
        }
    } else if (backToTop) {
        backToTop.remove();
    }
});

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Berhasil disalin ke clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'var(--secondary-color)' : '#ff4444'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);