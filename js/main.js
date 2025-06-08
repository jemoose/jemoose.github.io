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
        
        // Handle image loading in modal content
        const modalImages = body.querySelectorAll('img');
        modalImages.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
            } else {
                img.onload = () => {
                    img.classList.add('loaded');
                };
                img.onerror = () => {
                    img.classList.add('loaded'); // Still fade in even if error
                };
            }
        });
        
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
            'james-park': {
                title: 'James Park: Author Profile',
                content: `
                    <p>James is a Computer Science major at Dartmouth College with a deep personal interest in bodybuilding and fitness culture.</p>
                    
                    <div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
                        <img src="images/james-race.JPG" alt="James Park" class="footnote-image" style="max-width: 50%; height: auto;">
                        <p class="footnote-image-caption" style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">2024 Chad Hero Half Marathon, Oct 20</p>
                    </div>

                    <h4>Personal Experience:</h4>
                    <p>As an avid bodybuilder, James brings embodied knowledge to his anthropological analysis. His personal experience with macro tracking, meal prep, and gym culture provides authentic insights that purely academic approaches might miss.</p>
                    
                    <h4>Research Approach:</h4>
                    <p>James conducted ethnographic interviews with fellow Dartmouth students and gym-goers. He hopes to bridge the gap between academic theory and lived experience in fitness communities.</p>
                `
            },
            'mary-douglas': {
                title: 'Mary Douglas: Anthropologist of Order and Meaning',
                content: `
                    <p>Mary Douglas (1921-2007) was a British anthropologist whose work fundamentally shaped our understanding of how societies create meaning through classification systems, purity concepts, and ritual practices.</p>
                    
                    <div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
                        <img src="images/mary-douglas.jpg" alt="Mary Douglas" class="footnote-image" style="max-width: 50%; height: auto;">
                        <p class="footnote-image-caption" style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Mary Douglas, 1976</p>
                    </div>

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
                        "A well built physique is a status symbol. It reflects you worked hard for it, no money can buy it. You cannot borrow it, you cannot inherit it, you cannot steal it. You cannot hold onto it without constant work. It shows discipline, it shows self-respect, it shows patience…" - Arnold Schwarzenegger
                    </blockquote>
                `
            },
            'protein-paradigm': {
                title: 'The 1g Per Pound Rule: Sacred Metrics in Bodybuilding Culture',
                content: `
                    <p>The "1 gram of protein per pound of bodyweight" metric has become the holy grail of bodybuilding nutrition, representing one of the most pervasive and unquestioned beliefs in fitness culture. This single number has transformed from a rough guideline into an inflexible commandment that governs millions of daily food decisions.</p>
                    
                    <h4>The Metric and Its Origins:</h4>
                    <p>The 1g/lb rule suggests that someone weighing 180 pounds should consume 180 grams of protein daily for "optimal" muscle protein synthesis and recovery. This metric originated from:</p>
                    <ul>
                        <li><strong>Early Bodybuilding Studies (1970s-80s):</strong> Research on nitrogen balance in strength athletes suggested higher protein needs than sedentary individuals</li>
                        <li><strong>Supplement Industry Marketing:</strong> Companies needed simple, memorable numbers to sell protein products</li>
                        <li><strong>Bodybuilding Magazines:</strong> Publications like Muscle & Fitness popularized the metric through celebrity endorsements</li>
                        <li><strong>Gym Culture Transmission:</strong> The rule spread through gym communities as "insider knowledge"</li>
                    </ul>
                    
                    <h4>The Perceived Importance in Muscle Synthesis:</h4>
                    <p>Bodybuilders believe this metric ensures:</p>
                    <ul>
                        <li><strong>Muscle Protein Synthesis (MPS):</strong> Maintaining elevated MPS throughout the day for continuous muscle building</li>
                        <li><strong>Recovery Optimization:</strong> Faster repair of muscle damage from intense training</li>
                        <li><strong>Nitrogen Balance:</strong> Staying in positive nitrogen balance to prevent muscle catabolism</li>
                        <li><strong>Performance Insurance:</strong> "Better safe than sorry" approach to protein intake</li>
                    </ul>
                    
                    <h4>The Complete Macro Framework:</h4>
                    <p>The protein obsession is part of a larger macro percentage belief system that varies by goal:</p>
                    
                    <h5>Cutting (Fat Loss):</h5>
                    <ul>
                        <li>Protein: 35-40% (1-1.2g/lb bodyweight)</li>
                        <li>Carbs: 25-35% (mostly post-workout)</li>
                        <li>Fats: 25-30% (essential fatty acids)</li>
                        <li>Sugar: <5% (often eliminated entirely)</li>
                    </ul>
                    
                    <h5>Bulking (Muscle Gain):</h5>
                    <ul>
                        <li>Protein: 25-30% (0.8-1g/lb bodyweight)</li>
                        <li>Carbs: 40-50% (fuel for intense training)</li>
                        <li>Fats: 20-25% (hormone production)</li>
                        <li>Sugar: 10-15% (acceptable if post-workout)</li>
                    </ul>
                    
                    <h4>Authority Figures Supporting These Metrics:</h4>
                    <ul>
                        <li><strong>Arnold Schwarzenegger:</strong> Popularized the "more protein = more muscle" mentality in the 1970s, often consuming 200+ grams daily</li>
                        <li><strong>Dorian Yates:</strong> 6-time Mr. Olympia who preached precise macro tracking and high protein intake</li>
                        <li><strong>Modern Influencers:</strong> Greg Doucette, Jeff Nippard, and AthleanX promote scientific approaches to these ratios</li>
                        <li><strong>Supplement Companies:</strong> Optimum Nutrition, Dymatize, and others fund studies supporting higher protein needs</li>
                    </ul>
                    
                    <h4>Foundations: Truth vs. Belief Systems:</h4>
                    <p><strong>Scientific Foundation:</strong> Research shows athletes need 1.6-2.2g/kg bodyweight (0.7-1g/lb), making the 1g/lb rule on the higher end but not unreasonable.</p>
                    
                    <p><strong>Belief System Extensions:</strong> The culture has extrapolated this into beliefs that:</p>
                    <ul>
                        <li>More protein is always better (diminishing returns ignored)</li>
                        <li>Missing daily targets causes immediate muscle loss</li>
                        <li>Protein timing windows are critical (largely debunked)</li>
                        <li>Plant proteins are inferior (amino acid profiles matter, but combinations work)</li>
                    </ul>
                    
                    <h4>Cultural Impact:</h4>
                    <p>These metrics have created a mathematical approach to eating that transforms food from cultural expression into optimization equations. A 200-pound bodybuilder's daily concern about hitting 200g of protein can override considerations of taste, cost, environmental impact, or social connection.</p>
                    
                    <blockquote>
                        "The protein paradigm reveals how scientific knowledge becomes cultural dogma, transforming nutritional recommendations into moral imperatives that govern daily life."
                    </blockquote>
                `
            },
            'therese-andrews': {
                title: 'Therese Andrews: Scholar of Modern Food Taboos',
                content: `
                    <p>Therese Andrews is a contemporary anthropologist whose work on modern taboos and moral regulations provides crucial insights into how symbolic meanings around food and bodily substances evolve in contemporary society.</p>
                    
                    <h4>Key Contribution:</h4>
                    <p>Andrews' 2021 paper "Modern Taboos and Moral Regulations: Mother's Milk in the Symbolic Order" demonstrates how even the most "natural" foods can become sites of moral anxiety and cultural classification.</p>
                    
                    <h4>Theoretical Framework:</h4>
                    <ul>
                        <li><strong>Symbolic Value:</strong> How bodily substances acquire cultural meaning beyond their biological function</li>
                        <li><strong>Modern Taboos:</strong> The creation of new prohibition systems in secular societies</li>
                        <li><strong>Moral Regulation:</strong> How societies enforce behavioral norms through shame and virtue</li>
                    </ul>
                    
                    <h4>Relevance to Fitness Culture:</h4>
                    <p>Just as breast milk can be "pure" or "polluted"(improper) depending on the recipient's age, protein powder can be "clean fuel" post-workout or "unnecessary supplementation" at other times.</p>
                    
                    <blockquote>
                        I agree with Andrews' assertion that context determines purity. A cultural fullness refers to a sense of completeness that stems from conformity to social norms, the successful performance of said valued identity, and the feeling of belonging achieved through shared practices.
                    </blockquote>
                `
            },
            'benedict-anderson': {
                title: 'Benedict Anderson: Imagined Communities in Digital Spaces',
                content: `
                    <p>Benedict Anderson (1936-2015) was a political scientist whose concept of "imagined communities" has become foundational for understanding how groups create shared identity without direct personal contact.</p>
                    
                    <h4>Core Concept: Imagined Communities</h4>
                    <p>Anderson argued that nations are "imagined political communities" - imagined because members will never know most of their fellow members, yet they maintain a sense of communion and shared identity.</p>
                    
                    <h4>Key Elements:</h4>
                    <ul>
                        <li><strong>Print Capitalism:</strong> How shared media creates collective consciousness</li>
                        <li><strong>Simultaneous Consumption:</strong> Reading the same content at the same time creates belonging</li>
                        <li><strong>Horizontal Comradeship:</strong> Feeling connected to unknown others through shared practices</li>
                    </ul>
                    
                    <h4>Digital Age Application:</h4>
                    <p>Anderson's framework perfectly explains how Instagram fitness communities function. Fitness influencers create imagined communities where followers feel connected through shared dietary practices, workout routines, and transformation goals, despite never meeting in person.</p>
                    
                    <h4>Fitness Community Parallels:</h4>
                    <ul>
                        <li><strong>Shared Rituals:</strong> Daily "What I Eat in a Day" posts create simultaneous consumption</li>
                        <li><strong>Common Language:</strong> Terms like "macro-friendly," "anabolic," and "clean eating" create in-group vocabulary</li>
                        <li><strong>Collective Identity:</strong> Members feel part of a global fitness community through digital participation</li>
                    </ul>
                    
                    <blockquote>
                        "The nation is imagined as a community, because, regardless of the actual inequality and exploitation that may prevail in each, the nation is always conceived as a deep, horizontal comradeship."
                    </blockquote>
                `
            },
            'embodied-knowledge': {
                title: 'Embodied Knowledge in Anthropological Research',
                content: `
                    <p>Embodied knowledge refers to understanding gained through direct physical and emotional experience rather than purely intellectual analysis. In anthropological research, this represents a shift from detached observation to participatory engagement.</p>
                    
                    <h4>Theoretical Background:</h4>
                    <ul>
                        <li><strong>Phenomenology:</strong> How lived experience shapes understanding</li>
                        <li><strong>Participant-Observation:</strong> Anthropologists immersing themselves in the communities they study</li>
                        <li><strong>Auto-Ethnography:</strong> Using personal experience as data</li>
                    </ul>
                    
                    <h4>In Fitness Culture Research:</h4>
                    <p>Understanding bodybuilding culture requires more than reading about it - it requires experiencing the daily discipline, the social pressures, and the physical sensations of extreme dietary control. This embodied knowledge reveals insights that purely academic approaches might miss.</p>
                    
                    <h4>Methodological Advantages:</h4>
                    <ul>
                        <li><strong>Insider Access:</strong> Trust and authenticity from shared experience</li>
                        <li><strong>Nuanced Understanding:</strong> Appreciation for subtleties that outsiders might miss</li>
                        <li><strong>Emotional Resonance:</strong> Understanding the feelings behind the practices</li>
                    </ul>
                    
                    <h4>Challenges:</h4>
                    <ul>
                        <li><strong>Objectivity Concerns:</strong> Balancing personal involvement with analytical distance</li>
                        <li><strong>Generalizability:</strong> Ensuring personal experience reflects broader patterns</li>
                        <li><strong>Ethical Considerations:</strong> Studying communities you belong to</li>
                    </ul>
                    
                    <blockquote>
                        "As both a computer science major and avid bodybuilder, I bring an embodied understanding to this project."
                    </blockquote>
                `
            },
            'muscle-dysmorphia': {
                title: 'Muscle Dysmorphia: When Fitness Becomes Pathological',
                content: `
                    <p>Muscle dysmorphia is a form of body dysmorphic disorder where individuals become obsessively concerned with being insufficiently muscular, despite often having above-average muscle mass.</p>
                    
                    <h4>Clinical Definition:</h4>
                    <p>First described by Pope et al. in 1997, muscle dysmorphia involves persistent preoccupation with the idea that one's body is too small or insufficiently muscular, leading to significant distress and functional impairment.</p>
                    
                    <h4>Key Symptoms:</h4>
                    <ul>
                        <li><strong>Dietary Obsession:</strong> Extreme adherence to specific eating patterns</li>
                        <li><strong>Social Isolation:</strong> Avoiding activities that interfere with workout/diet schedules</li>
                        <li><strong>Mirror Checking:</strong> Compulsive body checking behaviors</li>
                        <li><strong>Supplement Dependence:</strong> Excessive reliance on protein and other supplements</li>
                    </ul>
                    
                    <p>Muscle dysmorphia represents an extreme version of cultural fullness where the pursuit of community belonging and identity performance becomes pathological. The "cultural satisfaction" from perfect adherence to fitness norms can mask underlying psychological distress.</p>
                    
                    <h4>Sociocultural Factors:</h4>
                    <ul>
                        <li><strong>Media Influence:</strong> Unrealistic body standards in fitness media</li>
                        <li><strong>Gym Culture:</strong> Competitive environments that reinforce size and strength obsession</li>
                    </ul>
                `
            },
            'social-media-platforms': {
                title: 'Social Media Platforms: Digital Echo Chambers of Fitness Culture',
                content: `
                    <p>YouTube, Instagram, and TikTok have fundamentally transformed how fitness knowledge is created, shared, and validated, creating powerful echo chambers that reinforce specific dietary practices and physique standards.</p>
                    
                    <h4>Platform-Specific Dynamics:</h4>
                    <ul>
                        <li><strong>YouTube:</strong> Long-form content featuring detailed recipe tutorials, "What I Eat in a Day" vlogs, and transformation documentaries that provide comprehensive lifestyle blueprints</li>
                        <li><strong>Instagram:</strong> Curated aesthetic content emphasizing visual transformation, macro-friendly recipes, and lifestyle aspirations through carefully staged food photography</li>
                        <li><strong>TikTok:</strong> Algorithm-driven short-form content that rapidly spreads "healthy" recipe hacks, protein optimization tips, and quick physique comparison videos</li>
                    </ul>
                    
                    <h4>Echo Chamber Effects:</h4>
                    <p>These platforms create self-reinforcing cycles where users are primarily exposed to content that validates their existing beliefs about nutrition and fitness. The algorithm learns user preferences and continues serving similar content, creating the illusion that extreme dietary practices are mainstream and normal.</p>
                    
                    <ul>
                        <li><strong>Recipe-Making Culture:</strong> Endless variations of "macro-friendly" versions of traditional foods, often prioritizing protein content over taste or cultural significance</li>
                        <li><strong>Health Definitions:</strong> Narrow definitions of "healthy" foods based on macronutrient profiles rather than cultural, environmental, or social factors</li>
                        <li><strong>Physique Standards:</strong> Constant exposure to highly edited bodies and transformation photos that normalize extreme dietary restriction</li>
                        <li><strong>Protein Obsession:</strong> Algorithmic promotion of high-protein content regardless of actual nutritional needs or context</li>
                    </ul>
                    
                    <h4>Personal Reflection:</h4>
                    <p>As someone deeply embedded in fitness culture, I've experienced firsthand how these platforms can be both informational and isolating. While I've learned valuable cooking techniques and nutrition principles, I've also found myself trapped in feedback loops where my entire feed becomes saturated with transformation content and macro-optimized recipes. The algorithm creates imagined communities where everyone seems to eat the same protein-heavy meals and pursue similar physique goals, making it easy to forget that this represents a tiny fraction of how most people actually eat and live.</p>
                    
                    <blockquote>
                        "The most dangerous aspect isn't the individual posts, but the cumulative effect of seeing hundreds of similar messages daily, creating the sense that this extreme approach to food is not just normal, but necessary."
                    </blockquote>
                `
            },
            'imagined-communities-bodybuilding': {
                title: 'Imagined Communities in Digital Fitness Spaces',
                content: `
                    <p>Benedict Anderson's concept of "imagined communities" finds powerful application in contemporary fitness culture, where social media platforms create virtual tribes bound by shared dietary practices and physique goals - despite members never meeting in person.</p>
                    
                    <h4>Anderson's Original Definition:</h4>
                    <p>Imagined communities are socially constructed communities where members share a sense of belonging and identity without direct contact. These communities are "imagined" because members will never know most fellow members, yet they maintain strong feelings of communion and shared purpose.</p>
                    
                    <h4>Digital Fitness Communities:</h4>
                    <p>Modern fitness influencers are talented at creating imagined communities through strategic use of inclusive language, shared rituals, and common identity markers.</p>
                    <p>How do they do this? </p>
                    <ul>
                        <li><strong>Shared Language:</strong> Terms like "macro-friendly," "anabolic," "clean eating," and "gains" create in-group vocabulary that signals membership</li>
                        <li><strong>Simultaneous Consumption:</strong> Daily "What I Eat in a Day" posts create synchronized experiences where followers feel connected through shared meal timing and food choices</li>
                        <li><strong>Collective Rituals:</strong> Morning workout posts, meal prep Sundays, and progress photo uploads become shared ceremonies that reinforce community bonds</li>
                    </ul>
                    
                    <h4>Examples in Food/Fitness Scenes:</h4>
                    <ul>
                        <li><strong>Greg Doucette's Community:</strong> Followers identify as part of the "Team" through shared catchphrases ("harder than last time"), recipe preferences (anabolic French toast), and training philosophies</li>
                        <li><strong>Sports communities like Strava: </strong>Upvoting and commenting on each other's fitness progress posts creates a sense of community and shared purpose</li>
                        <li><strong>Cutting Season Communities:</strong> Temporary but intense bonds formed during contest prep or summer cut cycles, sharing hunger struggles and progress photos</li>
                    </ul>
                    
                    <h4>Digital Mechanisms:</h4>
                    <p>Unlike Anderson's print capitalism, fitness imagined communities rely on visual and algorithmic mechanisms:</p>
                    <ul>
                        <li><strong>Before/After Photos:</strong> Create shared narratives of transformation and possibility</li>
                        <li><strong>Recipe Videos:</strong> Standardize food preparation rituals across the community</li>
                        <li><strong>Algorithm Reinforcement:</strong> Platforms show users similar content, creating the illusion of consensus and normalizing extreme practices</li>
                        <li><strong>Hashtag Movements:</strong> #FlexibleDieting, #TeamNeverLean, #AnabolicCooking create searchable community boundaries</li>
                    </ul>
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
        this.initializeSections();
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.updateHeroHeight());
    }

    initializeSections() {
        // Hide all sections initially
        const sections = document.querySelectorAll('.intro-section, .protein-section, .social-media-section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });
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

        // Handle section visibility
        this.handleSectionVisibility();
    }

    handleSectionVisibility() {
        const sections = document.querySelectorAll('.intro-section, .protein-section, .social-media-section');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
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

// Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.updateProgress();
        window.addEventListener('scroll', () => this.updateProgress());
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-indicator';
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.createButton();
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    createButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.setAttribute('aria-label', 'Back to top');
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(button);
        this.button = button;
    }

    handleScroll() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
}

// Enhanced Animation System
class EnhancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.addStaggeredAnimations();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                    
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe different elements with different animations
        document.querySelectorAll('.concept-card, .anecdote-box, .analysis-box').forEach(el => {
            this.observer.observe(el);
        });

        document.querySelectorAll('.timeline-item').forEach((el, index) => {
            const delay = index * 200;
            el.style.animationDelay = `${delay}ms`;
            this.observer.observe(el);
        });
    }

    addStaggeredAnimations() {
        // Stagger context grid items
        const contextItems = document.querySelectorAll('.context-item');
        contextItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 150}ms`;
        });

        // Stagger comparison items
        const comparisonItems = document.querySelectorAll('.comparison-item');
        comparisonItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 200}ms`;
        });
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const speed = scrolled * 0.3;
            hero.style.transform = `translate3d(0, ${speed}px, 0)`;
        }

        // Add subtle parallax to cards
        const cards = document.querySelectorAll('.concept-card, .anecdote-box, .analysis-box');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const speed = (scrolled - card.offsetTop) * 0.05;
                card.style.transform = `translate3d(0, ${speed}px, 0)`;
            }
        });
    }
}

// Image Lazy Loading with Fade Effect
class LazyImageLoader {
    constructor() {
        this.init();
    }

    init() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // If image is already loaded
                    if (img.complete && img.naturalHeight !== 0) {
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                        return;
                    }
                    
                    img.onload = () => {
                        img.classList.add('loaded');
                    };
                    
                    img.onerror = () => {
                        img.classList.add('loaded'); // Still fade in even if error
                    };
                    
                    // Set loading attribute if not already set
                    if (!img.hasAttribute('loading')) {
                        img.setAttribute('loading', 'lazy');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => {
            // If image is already loaded when page loads
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
            } else {
                imageObserver.observe(img);
            }
        });
    }
}

// Smooth Hover Effects
class SmoothHoverEffects {
    constructor() {
        this.init();
    }

    init() {
        // Add magnetic effect to buttons
        const buttons = document.querySelectorAll('.cta-button, .read-more-btn');
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });

        // Add tilt effect to cards
        const cards = document.querySelectorAll('.concept-card, .anecdote-box, .analysis-box, .research-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
}

// Type Writer Effect for Hero
class TypeWriterEffect {
    constructor() {
        this.init();
    }

    init() {
        const tagline = document.querySelector('.tagline');
        if (tagline) {
            const text = tagline.textContent;
            tagline.textContent = '';
            tagline.style.opacity = '1';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    tagline.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 30);
        }
    }
}

// Hero Animation System
class HeroAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createAnimationColumns();
    }

    createAnimationColumns() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create left column (food items) - Create enough icons for seamless loop
        const leftColumn = document.createElement('div');
        leftColumn.className = 'hero-animation-left';
        
        const foodIcons = [
            'food-apple', 'food-banana', 'food-burger', 'food-chicken', 
            'food-eggs', 'food-protein'
        ];

        // Create multiple sets for seamless scrolling
        for (let i = 0; i < 8; i++) {
            foodIcons.forEach(iconClass => {
                const icon = document.createElement('div');
                icon.className = `pixel-icon ${iconClass}`;
                leftColumn.appendChild(icon);
            });
        }

        // Create right column (gym items) - Create enough icons for seamless loop
        const rightColumn = document.createElement('div');
        rightColumn.className = 'hero-animation-right';
        
        const gymIcons = [
            'gym-dumbbell', 'gym-bicep', 'gym-barbell', 'gym-kettlebell',
            'gym-scale', 'gym-timer'
        ];

        // Create multiple sets for seamless scrolling
        for (let i = 0; i < 8; i++) {
            gymIcons.forEach(iconClass => {
                const icon = document.createElement('div');
                icon.className = `pixel-icon ${iconClass}`;
                rightColumn.appendChild(icon);
            });
        }

        hero.appendChild(leftColumn);
        hero.appendChild(rightColumn);
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
    new ScrollProgress();
    new BackToTop();
    new EnhancedAnimations();
    new ParallaxEffects();
    new LazyImageLoader();
    new SmoothHoverEffects();
    new HeroAnimations();
    
    // Add typewriter effect with delay
    setTimeout(() => {
        new TypeWriterEffect();
    }, 1000);
});
