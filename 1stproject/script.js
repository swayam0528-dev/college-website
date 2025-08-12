/**
 * =========================================
 * STELLAR UNIVERSITY JAVASCRIPT FILE
 * =========================================
 * 
 * This file contains all the interactive functionality
 * for the Stellar University website including:
 * - Mobile navigation
 * - Scroll effects
 * - Form handling
 * - Animations
 * - User interactions
 * 
 * Author: College Website Development Team
 * Version: 1.0
 * =========================================
 */

// =========================================
// DOCUMENT READY & INITIALIZATION
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Stellar University website loaded successfully!');
    
    // Initialize all functions
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeFormHandling();
    initializeInteractiveElements();
    initializeUtilityFeatures();
});

// =========================================
// MOBILE NAVIGATION FUNCTIONALITY
// =========================================

function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    // Mobile Menu Toggle
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change hamburger icon when menu is open
            if (nav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '✕';
                mobileMenuBtn.style.transform = 'rotate(90deg)';
            } else {
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Calculate offset for fixed header
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                if (nav) {
                    nav.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '☰';
                        mobileMenuBtn.style.transform = 'rotate(0deg)';
                    }
                }
                
                // Update active navigation state
                updateActiveNavigation(this);
            }
        });
    });
}

// Update active navigation item
function updateActiveNavigation(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
}

// =========================================
// SCROLL EFFECTS & HEADER FUNCTIONALITY
// =========================================

function initializeScrollEffects() {
    const header = document.getElementById('header');
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Update navigation based on scroll position
        updateNavigationOnScroll();
    });
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const speed = scrolled * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        });
    }
}

// Update navigation based on current section in view
function updateNavigationOnScroll() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// =========================================
// INTERSECTION OBSERVER ANIMATIONS
// =========================================

function initializeAnimations() {
    // Intersection Observer for Section Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on section
                const sectionId = entry.target.getAttribute('id');
                triggerSectionSpecificAnimations(sectionId);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Counter Animation for Statistics
    initializeCounterAnimations();
}

// Trigger specific animations for different sections
function triggerSectionSpecificAnimations(sectionId) {
    switch(sectionId) {
        case 'courses':
            animateCoursesCards();
            break;
        case 'faculty':
            animateFacultyCards();
            break;
        case 'gallery':
            animateGalleryItems();
            break;
        case 'admissions':
            animateAdmissionSteps();
            break;
    }
}

// Animate course cards with staggered effect
function animateCoursesCards() {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Animate faculty cards
function animateFacultyCards() {
    const facultyCards = document.querySelectorAll('.faculty-card');
    facultyCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });
}

// Animate gallery items
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// Animate admission steps
function animateAdmissionSteps() {
    const steps = document.querySelectorAll('.admission-steps li');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Counter Animation for Statistics
function initializeCounterAnimations() {
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(function() {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                clearInterval(timer);
                element.textContent = target;
            }
        }, 16);
    }
    
    // Example usage - can be added to stats if needed
    const statsElements = document.querySelectorAll('[data-counter]');
    statsElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-counter'));
        animateCounter(element, target);
    });
}

// =========================================
// FORM HANDLING & VALIDATION
// =========================================

function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Handle contact form submission
function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Clear previous errors
    clearAllErrors(form);
    
    // Validation
    let isValid = true;
    
    if (!name) {
        showFieldError('name', 'Please enter your full name');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!email) {
        showFieldError('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message) {
        showFieldError('message', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        showFormLoading(form);
        
        // Simulate form submission
        setTimeout(() => {
            hideFormLoading(form);
            showSuccessMessage();
            form.reset();
        }, 2000);
    } else {
        // Focus on first error field
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
    }
}

// Validation helper functions
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch(fieldName) {
        case 'name':
            if (!value) {
                showFieldError(fieldName, 'Name is required');
            } else if (value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters');
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(fieldName, 'Email is required');
            } else if (!isValidEmail(value)) {
                showFieldError(fieldName, 'Please enter a valid email');
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(fieldName, 'Message is required');
            } else if (value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters');
            }
            break;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = 'color: #e74c3c; font-size: 0.9rem; margin-top: 0.5rem;';
        
        field.parentElement.appendChild(errorElement);
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearAllErrors(form) {
    form.querySelectorAll('.error').forEach(field => {
        clearFieldError(field);
    });
}

function showFormLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
    }
}

function hideFormLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = 'Thank you! Your message has been sent successfully.';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #4facfe, #00f2fe);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// =========================================
// INTERACTIVE ELEMENTS
// =========================================

function initializeInteractiveElements() {
    // Gallery Item Click Handler
    initializeGallery();
    
    // Course Card Interactions
    initializeCourseCards();
    
    // Faculty Card Interactions
    initializeFacultyCards();
    
    // Scroll to Top Button
    initializeScrollToTop();
    
    // Search Functionality
    initializeSearch();
}

// Gallery functionality
function initializeGallery() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            showGalleryModal(title);
        });
    });
}

function showGalleryModal(title) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        margin: 0 1rem;
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: #1e3c72; margin-bottom: 1rem;">${title}</h3>
        <p style="color: #666; margin-bottom: 2rem;">In a full implementation, this would display the actual image gallery with navigation controls.</p>
        <button onclick="this.closest('.gallery-modal').remove()" style="background: linear-gradient(45deg, #4facfe, #00f2fe); color: white; border: none; padding: 0.5rem 2rem; border-radius: 25px; cursor: pointer;">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Course card interactions
function initializeCourseCards() {
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = '#00f2fe';
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = '#4facfe';
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            const courseName = this.querySelector('h3').textContent;
            showCourseDetails(courseName);
        });
    });
}

function showCourseDetails(courseName) {
    alert(`Course Details: ${courseName}\n\nIn a real implementation, this would open a detailed course information page with:\n- Complete curriculum\n- Prerequisites\n- Faculty information\n- Career prospects\n- Application process`);
}

// Faculty card interactions
function initializeFacultyCards() {
    document.querySelectorAll('.faculty-card').forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            const position = this.querySelector('p').textContent;
            const degree = this.querySelector('.degree').textContent;
            
            showFacultyDetails(name, position, degree);
        });
    });
}

function showFacultyDetails(name, position, degree) {
    const modal = document.createElement('div');
    modal.className = 'faculty-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; margin: 0 1rem; text-align: center;">
            <h3 style="color: #1e3c72; margin-bottom: 0.5rem;">${name}</h3>
            <p style="color: #666; margin-bottom: 0.5rem;">${position}</p>
            <p style="color: #4facfe; margin-bottom: 2rem; font-style: italic;">${degree}</p>
            <p style="color: #666; margin-bottom: 2rem;">In a full implementation, this would show detailed faculty information including research interests, publications, office hours, and contact information.</p>
            <button onclick="this.closest('.faculty-modal').remove()" style="background: linear-gradient(45deg, #4facfe, #00f2fe); color: white; border: none; padding: 0.5rem 2rem; border-radius: 25px; cursor: pointer;">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #4facfe, #00f2fe);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(100px)';
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchBtn = document.createElement('button');
    searchBtn.innerHTML = '🔍';
    searchBtn.setAttribute('aria-label', 'Search website');
    searchBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;
    
    searchBtn.addEventListener('click', function() {
        showSearchModal();
    });
    
    searchBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255,255,255,0.1)';
        this.style.transform = 'scale(1.1)';
    });
    
    searchBtn.addEventListener('mouseleave', function() {
        this.style.background = 'none';
        this.style.transform = 'scale(1)';
    });
    
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        headerContent.appendChild(searchBtn);
    }
}

function showSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 15px; width: 90%; max-width: 500px;">
            <h3 style="color: #1e3c72; margin-bottom: 1rem; text-align: center;">Search Our Website</h3>
            <input type="text" placeholder="Enter your search query..." style="width: 100%; padding: 1rem; border: 2px solid #e9ecef; border-radius: 10px; font-size: 1rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="performSearch(this)" style="background: linear-gradient(45deg, #4facfe, #00f2fe); color: white; border: none; padding: 0.5rem 2rem; border-radius: 25px; cursor: pointer;">Search</button>
                <button onclick="this.closest('.search-modal').remove()" style="background: #ccc; color: #333; border: none; padding: 0.5rem 2rem; border-radius: 25px; cursor: pointer;">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('input').focus();
    }, 10);
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Search on Enter key
    modal.querySelector('input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this);
        }
    });
}

function performSearch(element) {
    const modal = element.closest('.search-modal');
    const query = modal.querySelector('input').value.trim();
    
    if (query) {
        // In a real implementation, this would perform actual search
        alert(`Searching for: "${query}"\n\nIn a real implementation, this would:\n- Search through all website content\n- Display relevant results\n- Highlight matching text\n- Provide filtering options`);
    } else {
        alert('Please enter a search term');
    }
    
    modal.remove();
}

// =========================================
// UTILITY FEATURES
// =========================================

function initializeUtilityFeatures() {
    // Loading animation
    initializeLoadingAnimation();
    
    // Dynamic copyright year
    updateCopyrightYear();
    
    // Performance monitoring
    initializePerformanceMonitoring();
    
    // Error handling
    initializeErrorHandling();
}

// Loading animation
function initializeLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Update copyright year dynamically
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, currentYear);
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`Page loaded in ${loadTime}ms`);
            
            // You can send this data to analytics
            if (loadTime > 3000) {
                console.warn('Page load time is slower than expected');
            }
        }, 0);
    });
}

// Error handling
function initializeErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error occurred:', e.error);
        
        // In production, you might want to send errors to a logging service
        // Example: sendErrorToService(e.error);
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// =========================================
// ADDITIONAL CSS ANIMATIONS VIA JS
// =========================================

// Add CSS for JavaScript-generated elements
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .error {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3) !important;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles when DOM is loaded
document.addEventListener('DOMContentLoaded', addDynamicStyles);

// =========================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// =========================================

// Make functions available globally if needed
window.StellarUniversity = {
    updateActiveNavigation,
    showSuccessMessage,
    showGalleryModal,
    showCourseDetails,
    showFacultyDetails,
    performSearch
};

// =========================================
// CLEANUP AND OPTIMIZATION
// =========================================

// Clean up event listeners when page unloads
window.addEventListener('beforeunload', function() {
    // Remove any event listeners that might cause memory leaks
    // This is automatically handled by the browser in most cases
    console.log('Cleaning up Stellar University website...');
});