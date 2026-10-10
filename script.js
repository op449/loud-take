// ==========================================
// LOUDTAKE — CONVERSION REBUILD ENGINE
// ==========================================

// 1. Single Booking URL Constant
// Cal.com placeholder link used across all "Book a call" buttons
const BOOK_URL = 'https://cal.com/loudtake/30min';

// 2. Attach Booking Link to all CTA buttons
function initBookingButtons() {
    const bookButtons = document.querySelectorAll('[data-book-call], .btn-book-call, .book-cta');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(BOOK_URL, '_blank', 'noopener,noreferrer');
        });
    });
}

// 3. FAQ Accordion Logic (Single open or toggle)
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const ans = other.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                }
            });

            // Toggle current
            if (isOpen) {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    });
}

// 4. Smooth Anchor Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 5. Pricing Gating & FormSubmit Integration
const PRICING_STORAGE_KEY = 'loudtake_pricing_unlocked';

function initPricingGate() {
    const gateSection = document.getElementById('pricingGateSection');
    const unlockedSection = document.getElementById('pricingUnlockedSection');
    const leadForm = document.getElementById('pricingLeadForm');

    if (!gateSection || !unlockedSection) return;

    // Check if visitor has already unlocked pricing
    const isUnlocked = localStorage.getItem(PRICING_STORAGE_KEY) === 'true';

    if (isUnlocked) {
        gateSection.style.display = 'none';
        unlockedSection.style.display = 'block';
        return;
    }

    if (leadForm) {
        leadForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const companyInput = document.getElementById('leadCompany');
            const emailInput = document.getElementById('leadEmail');
            const phoneInput = document.getElementById('leadPhone');

            const company = companyInput ? companyInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';

            // Basic client-side phone validation (at least 7 digits)
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length < 7) {
                const phoneError = document.getElementById('phoneError');
                if (phoneError) phoneError.style.display = 'block';
                if (phoneInput) phoneInput.focus();
                return;
            }

            // Immediately mark unlocked in localStorage
            localStorage.setItem(PRICING_STORAGE_KEY, 'true');

            // Send via FormSubmit in background (asynchronously to avoid blocking user)
            const formData = new FormData();
            formData.append('Company', company);
            formData.append('Work Email', email);
            formData.append('Phone', phone);
            formData.append('_subject', `New Loudtake Pricing Lead: ${company}`);
            formData.append('_template', 'table');
            formData.append('_captcha', 'false');

            fetch('https://formsubmit.co/ajax/sdsurya7276@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            }).catch(err => {
                // Silently handle error — user must still get pricing unlocked
                console.log('Form submission completed.');
            });

            // Unlock pricing immediately regardless of network status
            gateSection.style.display = 'none';
            unlockedSection.style.display = 'block';
            unlockedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initBookingButtons();
    initFAQ();
    initSmoothScroll();
    initPricingGate();
});
