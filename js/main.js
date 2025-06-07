// Main JavaScript for Beyond the Label website

// Footnote Modal System
class FootnoteModal {
    constructor() {
        this.init();
    }

    init() {
        this.createModalContainer();
        this.bindEvents();
    }

    createModalContainer() {
        if (document.getElementById('footnote-modal')) return;
        
        const modalHTML = `
            <div id="footnote-modal" class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                    <div class="modal-header">
                        <h3 id="modal-title"></h3>
                    </div>
                    <div class="modal-body" id="modal-body">
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    bindEvents() {
        // Close modal events
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('footnote-modal');
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Footnote links
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('footnote-link')) {
                e.preventDefault();
                const footnoteId = e.target.getAttribute('data-footnote');
                this.openModal(footnoteId);
            }
        });
    }

    openModal(footnoteId) {
        const modal = document.getElementById('footnote-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        const footnoteData = this.getFootnoteData(footnoteId);
        
        title.textContent = footnoteData.title;
        body.innerHTML = footnoteData.content;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('footnote-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    getFootnoteData(id) {
        const footnotes = {
            'mary-douglas': {
                title: 'Mary Douglas: Anthropologist of Order and Meaning',
                content: `
                    <p>Mary Douglas (1921-2007) was a British anthropologist whose work fundamentally shaped our understanding of how societies create meaning through classification systems, purity concepts, and ritual practices.</p>
                    
                    <h4>Key Contributions:</h4>
                    <ul>
                        <li><strong>Purity and Danger (1966):</strong> Her seminal work exploring how societies define cleanliness, pollution, and taboo</li>
                        <li><strong>Classification Systems:</strong> How cultures organize the world through categories and boundaries</li>
                        <li><strong>Risk and Blame:</strong> How societies assign responsibility and meaning to misfortune</li>
                        <li><strong>Institutional Analysis:</strong> Understanding how institutions shape individual behavior</li>
                    </ul>
                    
                    <h4>Relevance to Fitness Culture:</h4>
                    <p>Douglas's framework helps us understand how bodybuilding communities create elaborate food classification systems. Just as traditional societies develop taboos around "unclean" foods, fitness subcultures establish their own purity codes where certain foods become "clean" or "dirty" based on their macronutrient profiles rather than cultural or religious significance.</p>
                    
                    <blockquote>
                        "Dirt is essentially disorder... eliminating it is not a negative movement, but a positive effort to organize the environment."
                    </blockquote>
                    
                    <p>In bodybuilding, "dirty" bulking or "cheat" meals represent this same concern with contamination and disorder that Douglas identified in traditional societies.</p>
                `
            },
            'cultural-fullness': {
                title: 'Cultural Fullness: Beyond Physical Satiation',
                content: `
                    <p>Cultural fullness represents a fundamental shift in how we understand satisfaction and completeness in eating practices. Unlike biological fullness, which signals adequate caloric intake, cultural fullness emerges from successful performance of identity and adherence to social norms.</p>
                    
                    <h4>Components of Cultural Fullness:</h4>
                    <ul>
                        <li><strong>Identity Performance:</strong> Eating behaviors that reinforce one's sense of self</li>
                        <li><strong>Social Validation:</strong> Recognition from community members for "correct" food choices</li>
                        <li><strong>Moral Satisfaction:</strong> The feeling of virtue from following dietary rules</li>
                        <li><strong>Ritual Completion:</strong> The sense of having properly executed eating ceremonies</li>
                    </ul>
                    
                    <h4>In Fitness Communities:</h4>
                    <p>Bodybuilders often report feeling "satisfied" not from the physical act of eating, but from successfully hitting their macro targets, timing their nutrients correctly, or maintaining their diet despite social pressure. This satisfaction persists even when they're physically hungry.</p>
                    
                    <h4>The Paradox:</h4>
                    <p>Cultural fullness can actually conflict with biological fullness. A bodybuilder might feel culturally "complete" after a precisely measured meal that leaves them physically hungry, while feeling culturally "empty" after a satisfying meal that exceeds their planned macros.</p>
                    
                    <blockquote>
                        "The body becomes a canvas on which cultural anxieties about control, purity, and achievement are written through dietary practice."
                    </blockquote>
                `
            },
            'protein-paradigm': {
                title: 'The Protein Paradigm: How One Macronutrient Became Sacred',
                content: `
                    <p>The elevation of protein to sacred status in fitness culture represents one of the most successful nutritional marketing campaigns in modern history, transforming a basic macronutrient into a moral imperative.</p>
                    
                    <h4>Historical Timeline:</h4>
                    <ul>
                        <li><strong>1950s-60s:</strong> Protein seen as one of three essential macronutrients</li>
                        <li><strong>1970s-80s:</strong> Bodybuilding magazines begin emphasizing protein for muscle growth</li>
                        <li><strong>1990s-2000s:</strong> Supplement industry develops protein powders and bars</li>
                        <li><strong>2010s:</strong> Protein enters mainstream health discourse</li>
                        <li><strong>2020s:</strong> Protein becomes default "healthy" food marker</li>
                    </ul>
                    
                    <h4>The Sacred Transformation:</h4>
                    <p>Through repeated marketing and community reinforcement, protein acquired quasi-religious properties:</p>
                    <ul>
                        <li><strong>Purifying Power:</strong> Adding protein powder to desserts makes them "clean"</li>
                        <li><strong>Moral Hierarchy:</strong> High-protein foods are "better" regardless of other factors</li>
                        <li><strong>Ritual Significance:</strong> Post-workout protein timing becomes sacred window</li>
                        <li><strong>Identity Marker:</strong> Protein consumption signals serious fitness commitment</li>
                    </ul>
                    
                    <h4>Market Impact:</h4>
                    <p>The protein industry has grown from $2 billion in 2010 to a projected $10.8 billion by 2025, with protein claims appearing on everything from ice cream to breakfast cereals.</p>
                    
                    <h4>Critical Analysis:</h4>
                    <p>While protein is essential for muscle synthesis, the cultural obsession has created food hierarchies that often ignore taste, cultural significance, cost, and environmental impact. Traditional protein sources from various cultures are dismissed if they don't fit the "lean, clean" aesthetic.</p>
                    
                    <blockquote>
                        "The protein paradigm reveals how scientific knowledge becomes cultural dogma, transforming nutritional recommendations into moral imperatives."
                    </blockquote>
                `
            }
        };

        return footnotes[id] || {
            title: 'Footnote Not Found',
            content: '<p>This footnote content has not been implemented yet.</p>'
        };
    }
}

// Read More System
class ReadMoreSystem {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more-btn')) {
                this.toggleReadMore(e.target);
            }
        });
    }

    toggleReadMore(button) {
        const container = button.closest('.read-more-container');
        const content = container.querySelector('.read-more-content');
        const fade = container.querySelector('.read-more-fade');
        
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            button.textContent = 'Read More';
            if (fade) fade.style.opacity = '1';
        } else {
            content.classList.add('expanded');
            button.textContent = 'Read Less';
            if (fade) fade.style.opacity = '0';
        }
    }
}

// Accordion System
class AccordionSystem {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('accordion-header')) {
                this.toggleAccordion(e.target);
            }
        });
    }

    toggleAccordion(header) {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.accordion-icon');
        
        // Close other accordions in the same group
        const accordion = header.closest('.accordion');
        accordion.querySelectorAll('.accordion-header').forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.classList.remove('active');
            }
        });
        
        // Toggle current accordion
        header.classList.toggle('active');
        content.classList.toggle('active');
    }
}

// Enhanced Navbar System
class NavbarSystem {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.heroSection = document.querySelector('.hero');
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleSmoothScrolling();
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.updateHeroHeight());
    }

    handleScroll() {
        if (!this.heroSection) return;
        
        const heroHeight = this.heroSection.offsetHeight;
        const scrolled = window.scrollY > heroHeight * 0.7;
        
        if (scrolled) {
            this.navbar.classList.add('visible');
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('visible');
            this.navbar.classList.remove('scrolled');
        }
    }

    updateHeroHeight() {
        this.handleScroll();
    }

    handleSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Scroll Animation System
class ScrollAnimationSystem {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section, .concept-card, .research-card, .anecdote-box, .analysis-box, .data-viz').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Interactive Context Test
class ContextTestSystem {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.context-item').forEach(item => {
            item.addEventListener('click', () => this.animateContextItem(item));
        });
    }

    animateContextItem(item) {
        item.style.transform = 'scale(1.05)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 300);
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FootnoteModal();
    new ReadMoreSystem();
    new AccordionSystem();
    new NavbarSystem();
    new ScrollAnimationSystem();
    new ContextTestSystem();
    
    // Add lazy loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});