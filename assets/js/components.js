// ===== REUSABLE COMPONENTS =====

// Component: Loading Spinner
function createLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
        <div class="spinner-container">
            <div class="spinner"></div>
            <p>Memuat...</p>
        </div>
    `;
    return spinner;
}

// Component: Modal
class Modal {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.modal = null;
    }
    
    show() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal-overlay';
        this.modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.content}
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
        lucide.createIcons();
        
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }
    
    close() {
        if (this.modal) {
            this.modal.remove();
        }
    }
}

// Component: Card Generator
function createCard(data) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-icon">
            <i data-lucide="${data.icon}"></i>
        </div>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        ${data.link ? `<a href="${data.link}" class="card-link">Selengkapnya <i data-lucide="arrow-right"></i></a>` : ''}
    `;
    lucide.createIcons();
    return card;
}

// Component: Update Card Generator
function createUpdateCard(data) {
    const card = document.createElement('article');
    card.className = 'update-card';
    card.innerHTML = `
        <span class="update-badge ${data.type}">${data.category}</span>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <div class="update-meta">
            <span><i data-lucide="calendar"></i> ${data.time}</span>
            <span><i data-lucide="eye"></i> ${data.views} views</span>
        </div>
    `;
    lucide.createIcons();
    return card;
}

// Component: Badge Generator
function createBadge(text, type = 'default') {
    const badge = document.createElement('span');
    badge.className = `badge badge-${type}`;
    badge.textContent = text;
    return badge;
}

// Component: Tooltip
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                z-index: 9999;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            
            e.target.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Component: Accordion
class Accordion {
    constructor(element) {
        this.element = element;
        this.header = element.querySelector('.accordion-header');
        this.content = element.querySelector('.accordion-content');
        this.init();
    }
    
    init() {
        this.header.addEventListener('click', () => {
            this.toggle();
        });
    }
    
    toggle() {
        const isOpen = this.element.classList.contains('active');
        
        if (isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.element.classList.add('active');
        this.content.style.maxHeight = this.content.scrollHeight + 'px';
    }
    
    close() {
        this.element.classList.remove('active');
        this.content.style.maxHeight = '0';
    }
}

// Component: Tabs
class Tabs {
    constructor(container) {
        this.container = container;
        this.tabs = container.querySelectorAll('.tab-button');
        this.panels = container.querySelectorAll('.tab-panel');
        this.init();
    }
    
    init() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.switchTab(index);
            });
        });
    }
    
    switchTab(index) {
        // Remove active class from all
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.panels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to selected
        this.tabs[index].classList.add('active');
        this.panels[index].classList.add('active');
    }
}

// Component: Progress Bar
function createProgressBar(percentage) {
    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    progress.innerHTML = `
        <div class="progress-fill" style="width: ${percentage}%">
            <span class="progress-text">${percentage}%</span>
        </div>
    `;
    return progress;
}

// Component: Alert/Toast
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
    };
    
    alert.innerHTML = `
        <i data-lucide="${icons[type]}"></i>
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i data-lucide="x"></i>
        </button>
    `;
    
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--card-bg);
        border: 2px solid ${type === 'success' ? 'var(--secondary-color)' : type === 'error' ? '#ff4444' : '#ffa500'};
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(alert);
    lucide.createIcons();
    
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Component: Pagination
class Pagination {
    constructor(container, itemsPerPage = 10) {
        this.container = container;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.items = Array.from(container.children);
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        this.init();
    }
    
    init() {
        this.render();
        this.createPaginationControls();
    }
    
    render() {
        this.items.forEach((item, index) => {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            
            if (index >= start && index < end) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    createPaginationControls() {
        const controls = document.createElement('div');
        controls.className = 'pagination-controls';
        controls.innerHTML = `
            <button class="pagination-btn" data-action="prev">
                <i data-lucide="chevron-left"></i> Sebelumnya
            </button>
            <span class="pagination-info">Halaman ${this.currentPage} dari ${this.totalPages}</span>
            <button class="pagination-btn" data-action="next">
                Selanjutnya <i data-lucide="chevron-right"></i>
            </button>
        `;
        
        this.container.parentNode.appendChild(controls);
        lucide.createIcons();
        
        controls.querySelector('[data-action="prev"]').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
                this.updateControls();
            }
        });
        
        controls.querySelector('[data-action="next"]').addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.render();
                this.updateControls();
            }
        });
    }
    
    updateControls() {
        const info = document.querySelector('.pagination-info');
        if (info) {
            info.textContent = `Halaman ${this.currentPage} dari ${this.totalPages}`;
        }
    }
}

// Add component styles
const componentStyles = document.createElement('style');
componentStyles.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--card-border);
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: var(--transition);
    }
    
    .modal-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .spinner-container {
        text-align: center;
        padding: 3rem;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        margin: 0 auto 1rem;
        border: 3px solid rgba(0, 245, 255, 0.3);
        border-top-color: var(--secondary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .progress-bar {
        width: 100%;
        height: 30px;
        background: rgba(30, 30, 46, 0.6);
        border-radius: 15px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        display: flex;
        align-items: center;
        justify-content: center;
        transition: width 0.3s ease;
    }
    
    .progress-text {
        color: #000;
        font-weight: 600;
        font-size: 0.875rem;
    }
    
    .alert {
        color: var(--text-primary);
    }
    
    .alert-close {
        background: none;
        border: none;
        color: var(--text-primary);
        cursor: pointer;
        padding: 0;
        transition: var(--transition);
    }
    
    .alert-close:hover {
        transform: scale(1.1);
    }
    
    .pagination-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2rem;
        padding: 1rem;
        background: var(--card-bg);
        border-radius: 15px;
    }
    
    .pagination-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: transparent;
        border: 2px solid var(--card-border);
        color: var(--text-primary);
        border-radius: 10px;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .pagination-btn:hover {
        border-color: var(--secondary-color);
        background: rgba(0, 245, 255, 0.1);
    }
    
    .pagination-info {
        color: var(--text-secondary);
    }
`;
document.head.appendChild(componentStyles);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Modal,
        Accordion,
        Tabs,
        Pagination,
        createCard,
        createUpdateCard,
        createBadge,
        createProgressBar,
        showAlert,
        initTooltips
    };
}