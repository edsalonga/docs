// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Beta form handling
    const betaForm = document.getElementById('betaForm');
    const successMessage = document.getElementById('successMessage');
    
    if (betaForm) {
        betaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission('beta');
        });

        // Handle "Learn More" button
        const learnMoreBtn = betaForm.querySelector('[data-action="learn"]');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function() {
                handleFormSubmission('learn');
            });
        }
    }

    function handleFormSubmission(action) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        // Basic validation
        if (!nameInput.value.trim() || !emailInput.value.trim()) {
            alert('Please fill in both name and email fields.');
            return;
        }

        if (!isValidEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            action: action,
            timestamp: new Date().toISOString()
        };

        // Log to console for demo purposes
        console.log('Form submitted:', formData);

        // Show success message
        betaForm.style.display = 'none';
        successMessage.style.display = 'block';

        // In a real implementation, you would send this data to a server
        // fetch('/api/beta-signup', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Add animation to tool cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe tool cards and feature items
    const animatedElements = document.querySelectorAll('.tool-card, .feature-item, .overview-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any open modals/messages
    if (e.key === 'Escape') {
        const successMessage = document.getElementById('successMessage');
        const betaForm = document.getElementById('betaForm');
        
        if (successMessage && successMessage.style.display !== 'none') {
            successMessage.style.display = 'none';
            betaForm.style.display = 'block';
        }
    }
});