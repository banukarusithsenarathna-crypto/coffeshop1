// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length && navMenu && navToggle) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function() {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.scrollY >= (sectionTop - 200) && window.scrollY < (sectionTop + sectionHeight - 200)) {
                    current = section.getAttribute('id') || '';
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Gallery image modal (enhanced functionality)
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length) {
        galleryItems.forEach(item => {
            // guard for images inside item
            const img = item.querySelector('img');
            if (!img) return;
            item.addEventListener('click', function() {
                const imgSrc = img.src;
                const imgAlt = img.alt || '';
                openImageModal(imgSrc, imgAlt);
            });
        });
    }
});

// Image Modal Function
function openImageModal(src, alt) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
    `;

    const modalImg = document.createElement('img');
    modalImg.src = src;
    modalImg.alt = alt;
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
    `;

    // Append elements
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    // Close modal functions
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    function closeModal() {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.removeEventListener('keydown', handleKeydown);
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', handleKeydown);
}

// Enhanced Welcome Function
function showWelcome() {
    const welcomeModal = document.createElement('div');
    welcomeModal.className = 'welcome-modal';
    welcomeModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        padding: 40px;
        border-radius: 12px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.5s ease;
    `;

    modalContent.innerHTML = `
        <i class="fas fa-coffee" style="font-size: 50px; color: #d4a762; margin-bottom: 20px;"></i>
        <h2 style="color: #4b2c20; margin-bottom: 15px;">Welcome to Coffee House ☕</h2>
        <p style="margin-bottom: 25px; color: #666; line-height: 1.6;">Enjoy our special drinks! We're delighted to have you here. As a special welcome, use code <strong>WELCOME10</strong> for 10% off your first order.</p>
        <div style="background-color: #f9f5f0; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 0; color: #8b4513;"><i class="fas fa-gift" style="margin-right: 8px;"></i> Today's Special: Caramel Macchiato - 20% off until 5 PM</p>
        </div>
        <button id="closeWelcome" style="background-color: #d4a762; color: #4b2c20; border: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
            Start Exploring
        </button>
    `;

    welcomeModal.appendChild(modalContent);
    document.body.appendChild(welcomeModal);

    // Close button functionality
    const closeBtn = document.getElementById('closeWelcome');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (welcomeModal && welcomeModal.parentNode) {
                welcomeModal.parentNode.removeChild(welcomeModal);
            }
        });
    }

    // Close modal when clicking outside
    welcomeModal.addEventListener('click', function(e) {
        if (e.target === welcomeModal) {
            if (welcomeModal && welcomeModal.parentNode) {
                welcomeModal.parentNode.removeChild(welcomeModal);
            }
        }
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .image-modal img { max-width: 100%; height: auto; }
        .welcome-modal { animation: fadeIn 0.35s ease; }
    `;
    document.head.appendChild(style);
}
