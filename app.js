// Minimal JavaScript for the landing page

// Open email modal
function openEmailModal() {
    document.getElementById('email-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-email').focus();
}

// Close email modal
function closeEmailModal() {
    document.getElementById('email-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = 64;
        const sectionTop = section.offsetTop - navHeight;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Simple email validation
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

// Show simple notification
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : '#dc2626'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.75rem;
        font-weight: 600;
        z-index: 3000;
        box-shadow: 0 10px 15px -3px rgba(30, 64, 175, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Submit email from modal
function submitEmail() {
    const emailInput = document.getElementById('modal-email');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        emailInput.focus();
        return;
    }
    
    const emails = JSON.parse(localStorage.getItem('debatehub_emails') || '[]');
    if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('debatehub_emails', JSON.stringify(emails));
    }
    
    showNotification('Thanks! You\'re on the early access list.', 'success');
    emailInput.value = '';
    closeEmailModal();
}

// Submit email from final CTA
function submitFinalEmail() {
    const emailInput = document.getElementById('final-email');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        emailInput.focus();
        return;
    }
    
    const emails = JSON.parse(localStorage.getItem('debatehub_emails') || '[]');
    if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('debatehub_emails', JSON.stringify(emails));
    }
    
    showNotification('Thanks! You\'re on the early access list.', 'success');
    emailInput.value = '';
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll reveal animation
function handleScrollReveal() {
    const sections = document.querySelectorAll('.section-reveal');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('visible');
        }
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('email-modal');
    if (event.target === modal) {
        closeEmailModal();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Handle Enter key in email inputs
    const modalEmail = document.getElementById('modal-email');
    const finalEmail = document.getElementById('final-email');
    
    if (modalEmail) {
        modalEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitEmail();
            }
        });
    }
    
    if (finalEmail) {
        finalEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitFinalEmail();
            }
        });
    }
    
    // Initial scroll reveal check
    handleScrollReveal();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollReveal);
});
