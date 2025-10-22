document.addEventListener('DOMContentLoaded', function() {
            // Header scroll effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Form validation and flash message handling
            const form = document.querySelector('.registration-form');
            const flashMessages = document.getElementById('flash-messages');
            
            // Check for URL parameters to show success/error messages
            const urlParams = new URLSearchParams(window.location.search);
            const status = urlParams.get('status');
            const message = urlParams.get('message');
            
            if (status && message) {
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert alert-${status}`;
                alertDiv.innerHTML = `
                    <i class="fas fa-${status === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                    ${decodeURIComponent(message)}
                `;
                flashMessages.appendChild(alertDiv);
                
                // Remove the parameters from URL without reloading
                window.history.replaceState({}, document.title, window.location.pathname);
            }
            
            form.addEventListener('submit', function(e) {
                // Basic form validation
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const course = document.getElementById('course').value;
                
                if (!name || !email || !phone || !course) {
                    e.preventDefault();
                    
                    // Remove any existing alerts
                    while (flashMessages.firstChild) {
                        flashMessages.removeChild(flashMessages.firstChild);
                    }
                    
                    // Show error message
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-error';
                    alertDiv.innerHTML = `
                        <i class="fas fa-exclamation-circle"></i>
                        Please fill out all required fields.
                    `;
                    flashMessages.appendChild(alertDiv);
                    
                    // Scroll to the alert
                    alertDiv.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });