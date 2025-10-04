// ADM Answer Bank - Interactive JavaScript

class ADMAnswerBank {
    constructor() {
        this.currentSection = '4marks';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupScrollEffects();
        this.initializeQuestionCards();
    }

    setupEventListeners() {
        // Navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.switchSection(section);
            });
        });

        // Floating Action Button
        const fab = document.getElementById('fab');
        if (fab) {
            fab.addEventListener('click', () => {
                this.scrollToTop();
            });
        }

        // Question card interactions
        const questionCards = document.querySelectorAll('.question-card');
        questionCards.forEach(card => {
            card.addEventListener('click', () => {
                this.toggleAnswer(card);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    switchSection(section) {
        if (this.currentSection === section) return;

        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Hide current section
        const currentSectionElement = document.getElementById(this.currentSection);
        if (currentSectionElement) {
            currentSectionElement.classList.remove('active');
        }

        // Show new section
        const newSectionElement = document.getElementById(section);
        if (newSectionElement) {
            setTimeout(() => {
                newSectionElement.classList.add('active');
                this.currentSection = section;
                this.animateQuestionCards();
            }, 100);
        }
    }

    toggleAnswer(card) {
        const answer = card.querySelector('.answer');
        if (!answer) return;

        // Toggle answer visibility
        const isVisible = answer.style.display === 'block';
        answer.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            // Animate answer appearance
            answer.style.opacity = '0';
            answer.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                answer.style.transition = 'all 0.3s ease';
                answer.style.opacity = '1';
                answer.style.transform = 'translateY(0)';
            }, 10);
        }

        // Add visual feedback
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }

    initializeAnimations() {
        // Animate elements on page load
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);

        // Observe question cards
        document.querySelectorAll('.question-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
    }

    animateQuestionCards() {
        const cards = document.querySelectorAll(`#${this.currentSection} .question-card`);
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        });
    }

    initializeQuestionCards() {
        // Add click animations to question cards
        const cards = document.querySelectorAll('.question-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlowEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });
        });
    }

    addGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.3)';
        element.style.borderColor = '#00d4ff';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = 'var(--shadow-card)';
        element.style.borderColor = 'var(--border-color)';
    }

    setupScrollEffects() {
        // Parallax effect for background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('body::before');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    handleScroll() {
        // Show/hide FAB based on scroll position
        const fab = document.getElementById('fab');
        if (fab) {
            if (window.scrollY > 300) {
                fab.style.opacity = '1';
                fab.style.transform = 'scale(1)';
            } else {
                fab.style.opacity = '0';
                fab.style.transform = 'scale(0.8)';
            }
        }

        // Update header background opacity
        const header = document.querySelector('.header');
        if (header) {
            const opacity = Math.min(0.95, 0.8 + (window.scrollY / 1000));
            header.style.background = `rgba(26, 26, 26, ${opacity})`;
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    handleKeyboardNavigation(e) {
        // ESC to close any open answers
        if (e.key === 'Escape') {
            document.querySelectorAll('.answer').forEach(answer => {
                answer.style.display = 'none';
            });
        }

        // Tab navigation between sections
        if (e.key === 'Tab' && e.shiftKey === false) {
            e.preventDefault();
            const sections = ['4marks', '2marks'];
            const currentIndex = sections.indexOf(this.currentSection);
            const nextIndex = (currentIndex + 1) % sections.length;
            this.switchSection(sections[nextIndex]);
        }
    }

    // Utility methods for dynamic content
    addLoadingAnimation(element) {
        element.innerHTML = '<div class="loading"></div>';
    }

    removeLoadingAnimation(element, content) {
        element.innerHTML = content;
    }

    // Search functionality (for future enhancement)
    searchQuestions(query) {
        const questions = document.querySelectorAll('.question-card');
        const searchTerm = query.toLowerCase();

        questions.forEach(card => {
            const questionText = card.querySelector('h3').textContent.toLowerCase();
            const isVisible = questionText.includes(searchTerm);
            
            card.style.display = isVisible ? 'block' : 'none';
            
            if (isVisible) {
                card.style.animation = 'fadeInUp 0.3s ease forwards';
            }
        });
    }

    // Print functionality
    printSection() {
        const currentSection = document.getElementById(this.currentSection);
        if (currentSection) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>ADM Answer Bank - ${this.currentSection}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            .question-card { border: 1px solid #ccc; margin: 20px 0; padding: 20px; border-radius: 10px; }
                            .question-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
                            .answer { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 15px; }
                            .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                            code { background: #f0f0f0; padding: 5px; border-radius: 3px; }
                        </style>
                    </head>
                    <body>
                        ${currentSection.innerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new ADMAnswerBank();
    
    // Add global methods for external access
    window.ADMApp = app;
    
    // Add some extra interactive features
    addExtraFeatures();
});

function addExtraFeatures() {
    // Add copy-to-clipboard functionality for code blocks
    const codeBlocks = document.querySelectorAll('code');
    codeBlocks.forEach(code => {
        code.addEventListener('click', () => {
            navigator.clipboard.writeText(code.textContent).then(() => {
                showNotification('Code copied to clipboard!', 'success');
            });
        });
        
        // Add visual hint
        code.style.cursor = 'pointer';
        code.title = 'Click to copy';
    });

    // Add notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-primary);
            color: var(--bg-dark);
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: 600;
            box-shadow: var(--shadow-glow);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll handler
const optimizedScrollHandler = debounce(() => {
    window.ADMApp.handleScroll();
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);
