        feather.replace();

        // Generic filter functionality
        function setupFilter(sectionSelector) {
            const section = document.querySelector(sectionSelector);
            if (!section) return;

            const filterButtons = section.querySelectorAll('.filter-btn');
            const cards = section.querySelectorAll('.grid > .card');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const filter = button.getAttribute('data-filter');
                    cards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }

        setupFilter('#projects');
        setupFilter('#certificates');

        // Scroll animations
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(section => observer.observe(section));

        // Nav link active state on scroll
        const navLinks = document.querySelectorAll('.nav-link');
        const sectionsForNav = document.querySelectorAll('main section[id]');

        function changeNavOnScroll() {
            let scrollY = window.pageYOffset;

            sectionsForNav.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 150;
                let sectionId = current.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
             // Handle edge case for bottom of page
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) { // small buffer
                 navLinks.forEach(link => link.classList.remove('active'));
                 document.querySelector('.nav-link[href="#contact"]').classList.add('active');
            } else if (window.pageYOffset < sectionsForNav[0].offsetTop - 150) {
                 // Handle edge case for top of page
                 navLinks.forEach(link => link.classList.remove('active'));
                 document.querySelector('.nav-link[href="#home"]').classList.add('active');
            }
        }

        window.addEventListener('scroll', changeNavOnScroll);
        // Set initial state on load
        document.addEventListener('DOMContentLoaded', () => {
             feather.replace();
             changeNavOnScroll();
        });