// ===== KERALA TRAVELS CAREERS ABROAD - JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeNavigation();
    initializeFormHandling();
    initializeScrollEffects();
    initializeAnimations();
    initializeMobileMenu();
    
    console.log('Kerala Travels Careers Abroad website loaded successfully!');
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', highlightActiveNavigation);
}

// Highlight active navigation based on scroll position
function highlightActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    navMenu.classList.toggle('mobile-active');
    mobileMenuBtn.classList.toggle('active');
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    navMenu.classList.remove('mobile-active');
    mobileMenuBtn.classList.remove('active');
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const formInputs = consultationForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('.submit-btn');
    
    // Validate all required fields
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Log form data (for development)
        console.log('Form submitted with data:', Object.fromEntries(formData));
        
        // Show success message
        showNotification('Thank you for your interest! We will contact you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = 'Book My Free Consultation';
        submitButton.disabled = false;
        
        // Optional: Send to actual endpoint
        // submitToServer(formData);
        
    }, 2000);
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    // Required field validation
    if (field.required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Specific validations
    switch (fieldName) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
            break;
            
        case 'name':
            if (value && value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
                return false;
            }
            break;
    }
    
    return true;
}

// Clear field error
function clearFieldError(field) {
    if (typeof field === 'object' && field.target) {
        field = field.target;
    }
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorElement);
}

// Validate entire form
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

// Format phone number
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Add country code if not present
    if (value.length > 0 && !value.startsWith('91')) {
        if (value.length === 10) {
            value = '91' + value;
        }
    }
    
    // Format the number
    if (value.length > 2) {
        value = '+' + value.substring(0, 2) + ' ' + value.substring(2);
    }
    
    e.target.value = value;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    handleScroll();
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header background change
    updateHeaderBackground(scrollTop);
    
    // Back to top button visibility
    updateBackToTopVisibility(scrollTop);
    
    // Parallax effect for hero section
    updateParallaxEffect(scrollTop);
    
    // Animate elements on scroll
    animateOnScroll();
}

// Update header background opacity based on scroll
function updateHeaderBackground(scrollTop) {
    const header = document.querySelector('.header');
    if (header) {
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }
}

// Update back to top button visibility
function updateBackToTopVisibility(scrollTop) {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (scrollTop > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

// Parallax effect for hero section
function updateParallaxEffect(scrollTop) {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
    }
}

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .feature-card,
        .service-item,
        .opportunity-card,
        .step,
        .section-title
    `);
    
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
    
    // Back to top functionality
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
}

// Handle intersection observer callbacks
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}

// Animate elements on scroll (for elements not using Intersection Observer)
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Scroll to top smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ENHANCED FORM FEATURES =====

// Auto-save form data to localStorage (optional)
function saveFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    localStorage.setItem('consultationFormData', JSON.stringify(data));
}

// Load saved form data (optional)
function loadFormData(form) {
    const savedData = localStorage.getItem('consultationFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field && data[key]) {
                field.value = data[key];
            }
        });
    }
}

// Clear saved form data
function clearSavedFormData() {
    localStorage.removeItem('consultationFormData');
}

// ===== API INTEGRATION (Template) =====

// Submit form data to server (replace with actual endpoint)
async function submitToServer(formData) {
    try {
        const response = await fetch('/api/consultation', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            showNotification('Form submitted successfully!', 'success');
            clearSavedFormData();
            return result;
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('There was an error submitting the form. Please try again.', 'error');
    }
}

// ===== ADVANCED FEATURES =====

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load dark mode preference
function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// ===== PERFORMANCE OPTIMIZATION =====

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(handleScroll, 16); // ~60fps
window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize events
const optimizedResizeHandler = debounce(function() {
    // Handle window resize
    updateMobileMenu();
    recalculateAnimations();
}, 250);
window.addEventListener('resize', optimizedResizeHandler);

function updateMobileMenu() {
    const isMobile = window.innerWidth <= 768;
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!isMobile) {
        navMenu.classList.remove('mobile-active');
        mobileMenuBtn.classList.remove('active');
    }
}

function recalculateAnimations() {
    // Recalculate any animations that depend on window size
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        // Reset parallax calculations
        element.style.transform = '';
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Enter key on custom elements
    if (e.key === 'Enter' && e.target.classList.contains('clickable')) {
        e.target.click();
    }
});

// Focus management for accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(`
        a[href],
        button:not([disabled]),
        textarea:not([disabled]),
        input:not([disabled]),
        select:not([disabled]),
        [tabindex]:not([tabindex="-1"])
    `);
    
    // Add focus indicators
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #ff8c00';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Optional: Send error to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.toString(),
            'fatal': false
        });
    }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault(); // Prevent the default browser behavior
});

// ===== ANALYTICS INTEGRATION (Google Analytics example) =====

// Track form submissions
function trackFormSubmission(formName, formData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'form_name': formName,
            'interested_field': formData.get('field'),
            'german_proficiency': formData.get('german')
        });
    }
}

// Track scroll depth
let maxScrollDepth = 0;
function trackScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);
    
    if (scrollPercentage > maxScrollDepth && scrollPercentage % 25 === 0) {
        maxScrollDepth = scrollPercentage;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                'event_category': 'engagement',
                'event_label': `${scrollPercentage}%`,
                'value': scrollPercentage
            });
        }
    }
}

// Add scroll depth tracking to scroll handler
const originalHandleScroll = handleScroll;
handleScroll = function() {
    originalHandleScroll();
    trackScrollDepth();
};

// ===== INITIALIZATION COMPLETE =====

// Additional initialization after DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features
    manageFocus();
    loadDarkModePreference();
    
    // Initialize lazy loading if images are present
    if (document.querySelectorAll('img[data-src]').length > 0) {
        initializeLazyLoading();
    }
    
    // Console message for developers
    console.log(`
    🚀 Kerala Travels Careers Abroad Website
    📧 Contact: +91 79948 73222
    🌐 Developed with modern web technologies
    
    Features loaded:
    ✅ Smooth scrolling navigation
    ✅ Form validation & submission
    ✅ Mobile responsive design  
    ✅ Scroll animations
    ✅ Performance optimizations
    ✅ Accessibility enhancements
    `);
});

// ===== EXPORT FUNCTIONS (if using modules) =====
// Uncomment if using ES6 modules

/*
export {
    initializeNavigation,
    initializeFormHandling,
    initializeScrollEffects,
    showNotification,
    validateForm,
    submitToServer
};
*/

// ===== SERVICE WORKER REGISTRATION (PWA Support) =====
// Uncomment to enable PWA features

/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('ServiceWorker registration failed: ', registrationError);
            });
    });
}
*/