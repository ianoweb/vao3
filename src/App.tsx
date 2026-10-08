import { useState, type FormEvent, type ReactNode } from 'react';
import { ErrorBoundary } from './components/error-boundary';
import NotFound from './pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowDownRight, ArrowRight, BarChart3, Calculator, Clock3, Coins, Compass, Landmark, LayoutDashboard, Menu, MessageCircle, Phone, PiggyBank, Scale, Target, Telescope, TrendingUp, X, type LucideIcon } from 'lucide-react';

// Public-folder files must respect the site's base path (needed on GitHub Pages).
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

const whatsapp = 'https://wa.me/254142066857';
const waLink = (text?: string) => (text ? `${whatsapp}?text=${encodeURIComponent(text)}` : whatsapp);
const phone = 'tel:+254142066857';

const advisoryServices: [string, string][] = [
  ['Finance Readiness and Access to Suitable Finance', 'We help businesses strengthen their financial position, define their funding requirements and prepare the documentation and projections needed to pursue suitable financing opportunities with confidence.'],
  ['Cash-flow planning and management', 'We help you track the in/outflow (movement of cash) and plan your cash so you can meet your obligations and avoid unexpected shortages.'],
  ['Financial planning', 'We help you create a clear financial plan that connects your business goals with the money and resources needed to achieve them.'],
  ['Budget preparation and management', 'We help you plan your expected income and expenses so you can spend wisely and stay aligned with your goals.'],
  ['Forecasting and scenario analysis', 'We help you estimate what may happen in the future and compare different options before making important decisions.'],
  ['Financial modelling', 'We use practical financial models to help you test ideas such as expansion, new pricing, investment or borrowing.'],
  ['Profitability and performance analysis', 'We help you understand what is driving your revenue, costs and profit so you can improve business performance.'],
  ['Variance analysis', 'We compare your actual results with your budget or forecast and explain what changed and what action may be needed.'],
  ['Management reporting and dashboards', 'We turn your financial information into simple reports and dashboards so you can quickly see how your business is performing.'],
];

const serviceIcons: LucideIcon[] = [Landmark, Coins, Target, PiggyBank, Telescope, Calculator, TrendingUp, Scale, LayoutDashboard];

const literacyTopics = [
  'Understanding financial statements.',
  'Managing cash flow and working capital.',
  'Pricing and profitability.',
  'Budgeting and financial controls.',
  'Financial metrics and key performance indicators.',
  'Using financial information to guide business decisions.',
];

const pillars = [
  ['Growth', 'Sustainable growth is intentional, not accidental.'],
  ['Clarity', 'Financial clarity is the foundation of every strong business decision.'],
  ['Numbers', 'Numbers should not just be reported, they should guide strategy.'],
];

const impacts = [
  'Built integrated 3-statement financial models, improving investor readiness',
  'Developed multi-year forecasts that strengthened funding confidence',
  'Designed capital structures that reduced the cost of capital (WACC)',
  'Improved liquidity through better revenue and financing frameworks',
  'Strengthened compliance across VAT, PAYE, withholding tax, and corporate tax',
  'Transformed financial reporting into actionable decision-making tools',
];

const clients = [
  'Startups preparing for growth or funding',
  'SMEs seeking structure and financial clarity',
  'MSMEs transitioning from informal to structured operations',
  'Growing nonprofits needing financial sustainability',
  'Finance teams looking to strengthen FP&A capabilities',
];

const builtAround = ['Business Model', 'Growth Stage', 'Financial Realities', 'Long-term Vision'];

const promises = [
  'Supports your key business decisions',
  'Improves financial visibility and control',
  'Strengthens your ability to scale',
  'Secures your long-term financial health',
];

const values = [
  ['Transformation', 'We drive meaningful, measurable change'],
  ['Integrity', 'We uphold accuracy, transparency, and trust'],
  ['Sustainability', 'We build for long-term impact, not short-term wins'],
  ['Professional Excellence', 'We deliver with precision and expertise'],
  ['Love', 'We care deeply about the businesses we serve and their success'],
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function sendToWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get('name') || '').trim();
    const focus = String(form.get('focus') || '').trim();
    const message = `Hello Vao Cornerstone, my name is ${name}. I would like to discuss ${focus}.`;
    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    formElement.reset();
    setSent(true);
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-wrap">
      <header className="nav-shell">
        <div className="container navbar">
          <a href="#top" aria-label="Vao Cornerstone home" data-testid="link-home">
            <img className="brand-logo" src={asset('vao-logo-navbar-cropped.jpeg')} alt="Vao Cornerstone Financial Advisor" data-testid="img-navbar-logo" />
          </a>
          <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu} data-testid="link-nav-about">About us</a>
            <a href="#services" onClick={closeMenu} data-testid="link-nav-services">What we do</a>
            <a href="#impact" onClick={closeMenu} data-testid="link-nav-impact">Our impact</a>
            <a href="#approach" onClick={closeMenu} data-testid="link-nav-approach">Our approach</a>
            <a href="#stand-for" onClick={closeMenu} data-testid="link-nav-stand-for">What we stand for</a>
            <a href={waLink('Hello Vao Cornerstone, I would like to start a conversation.')} target="_blank" rel="noreferrer" onClick={closeMenu} className="button button-gold nav-cta" data-testid="link-nav-contact">Start a conversation <ArrowRight /></a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top" data-testid="section-hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <h1 className="sr-only">Vao Cornerstone Financial Advisory</h1>
            <p className="hero-copy reveal">We are a financial advisory firm committed to transforming organizations and businesses through financial planning and analysis insights that drive real business transformation. We exist because many businesses generate revenue, but far fewer build the financial systems required to sustain, scale and attract opportunities.</p>
            <p className="hero-copy reveal-delay">We build financial infrastructure that supports confident decision-making, resilience, and long-term success.</p>
            <div className="hero-actions reveal-delay">
              <a className="button button-gold" href={`${whatsapp}?text=${encodeURIComponent('Hello Vao Cornerstone, I would like to start a conversation about financial clarity for my business.')}`} target="_blank" rel="noreferrer" data-testid="link-hero-whatsapp">Talk to an advisor <ArrowRight /></a>
              <a className="button button-outline" href="#services" data-testid="link-explore-services">Explore our work <ArrowDownRight /></a>
            </div>
          </div>
          <div className="hero-visual reveal-delay">
            <img src={asset('hero-finance.jpg')} width={1200} height={655} alt="Financial advisor presenting an investment portfolio to two clients in a bright office" fetchPriority="high" data-testid="img-hero" />
          </div>
        </div>
      </section>

      <section className="section about-section" id="about" data-testid="section-about">
        <div className="container">
          <div className="section-heading"><div><h2 className="display">About Us</h2></div></div>
          <div className="about-grid">
            <div className="about-copy">
              <p>VAO Cornerstone is a financial advisory firm providing practical financial management and advisory services to small and growing businesses, entrepreneurs and scale-ups globally. We strengthen cash flow, planning, reporting and financial systems, and help you prepare for funding, so you can scale sustainably and build lasting value.</p>
              <div className="mv-grid">
                <article className="stand-block" data-testid="card-mission"><h3>Our Mission</h3><p>To transform businesses with strategic Financial Planning &amp; Analysis structures that build a firm financial foundation, unlocking sustainable growth and lasting financial health.</p></article>
                <article className="stand-block" data-testid="card-vision"><h3>Our Vision</h3><p>A system where every organization undergoes true financial transformation, weaving sustainability into every decision and growing confidently in any economic climate.</p></article>
              </div>
            </div>
            <div className="philosophy" data-testid="list-philosophy">
              <h3>Our Philosophy</h3>
              <p className="philosophy-lead">Growth without a financial structure is fragile. <strong>We believe:</strong></p>
              <div className="pillars">
                {pillars.map(([title, text], i) => (
                  <article className="pillar" key={title} data-testid={`card-pillar-${i + 1}`}>
                    <span className="pillar-icon">{i === 0 ? <TrendingUp /> : i === 1 ? <Compass /> : <BarChart3 />}</span>
                    <h4>{title}</h4><p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services" data-testid="section-services">
        <div className="container">
          <div className="about-grid wwd-grid">
            <div className="about-copy wwd-copy">
              <div className="eyebrow eyebrow-after">What we do</div>
              <p className="wwd-intro">We partner with you to bring clarity, build confidence, resilience and sustainable growth by offering the following services;</p>
              <article className="wwd-block" data-testid="card-service-2">
                <h3>Business Financial Literacy Trainings</h3>
                <p>We help business owners and teams develop the knowledge and confidence to understand and use financial information effectively. Our finance literacy training services cover:</p>
                <ul className="wwd-list">
                  {literacyTopics.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article className="wwd-block" data-testid="card-service-3">
                <h3>Coaching and Capacity Building</h3>
                <p>Our coaching services support founders, managers and finance teams in building practical financial management capabilities. We provide guidance, accountability and tools that help clients apply financial knowledge to their day-to-day business operations.</p>
              </article>
              <a className="button button-outline wwd-cta" href={waLink('Hello Vao Cornerstone, I would like to discuss your services.')} target="_blank" rel="noreferrer" data-testid="link-services-contact">Discuss what you need <ArrowRight /></a>
            </div>
            <div className="philosophy wwd-services" data-testid="card-service-1">
              <div className="eyebrow eyebrow-after">Our services</div>
              <h2 className="wwd-title">What We Do</h2>
              <p className="philosophy-lead"><strong>Financial Advisory and FPA Services</strong></p>
              <div className="pillars wwd-cards">
                {advisoryServices.map(([title, text], i) => {
                  const Icon = serviceIcons[i];
                  return (
                    <article className="pillar" key={title} data-testid={`card-advisory-${i + 1}`}>
                      <span className="pillar-icon"><Icon /></span>
                      <h4>{title}</h4><p>{text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section impact-section" id="impact" data-testid="section-impact">
        <div className="container">
          <div className="section-heading"><div><h2 className="display">Our Impact</h2></div></div>
          <div className="values-card impact-card" data-testid="list-impact">
            <h3 className="values-card-title impact-card-title" data-testid="text-impact-intro">Our work goes beyond theory; we deliver measurable transformation:</h3>
            <ol className="impact-card-list">
              {impacts.map((item, i) => <li key={item} data-testid={`text-impact-${i + 1}`}>{item}</li>)}
            </ol>
          </div>
          <div className="who-section" data-testid="section-who-we-work-with">
            <h3>Who We Work With</h3>
            <p>We partner with:</p>
            <div className="who-grid">
              {clients.map((item) => <div className="who-card" key={item}>{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section approach-section" id="approach" data-testid="section-approach">
        <div className="container">
          <div className="section-heading">
            <div><h2 className="display">Our Approach</h2></div>
            <p>We don’t take a one-size-fits-all approach.</p>
          </div>
          <p className="engage-label">Every engagement is built around:</p>
          <div className="approach-grid engage-grid">
            {builtAround.map((item, i) => <article className="approach-step" key={item} data-testid={`card-approach-${i + 1}`}><span className="step-number">Your</span><h3>{item}</h3></article>)}
          </div>
          <p className="approach-closing">We combine technical expertise with practical execution to ensure strategies are not just designed but implemented.</p>
          <div className="promise" data-testid="section-promise">
            <h3>Our Promise</h3>
            <p>We ensure that every financial system, plan and model we build:</p>
            <ol className="promise-list">{promises.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section stand-section" id="stand-for" data-testid="section-stand-for">
        <div className="container">
          <div className="section-heading"><div><h2 className="display">What We Stand For</h2></div></div>
          <div className="values-card" data-testid="list-values">
            <h3 className="values-card-title">Our<br />Core Values</h3>
            <ul className="values-card-list">
              {values.map(([name, text]) => <li key={name}><strong>{name}:</strong> {text}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" data-testid="section-contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <div className="eyebrow">Start a conversation</div>
            <h2 className="display">Let's get a<br /><em>clearer picture.</em></h2>
            <p>Tell us what you are working through. Your note will open in WhatsApp, where you can review it and send it directly to our team.</p>
            <form onSubmit={sendToWhatsApp} data-testid="form-contact">
              <label htmlFor="contact-name" className="sr-only">Your name</label>
              <input id="contact-name" name="name" type="text" placeholder="Your name" required aria-label="Your name" data-testid="input-contact-name" />
              <label htmlFor="contact-focus" className="sr-only">What would you like to discuss?</label>
              <textarea id="contact-focus" name="focus" placeholder="What would you like to discuss?" rows={3} required aria-label="What would you like to discuss?" data-testid="input-contact-message" />
              <button className="button button-gold" type="submit" data-testid="button-contact-whatsapp">Continue to WhatsApp <ArrowRight /></button>
              {sent && <p className="form-feedback" role="status" data-testid="status-contact">WhatsApp opened with your message. Send it there to reach us.</p>}
            </form>
          </div>
          <aside className="contact-card" data-testid="card-contact-details">
            <div className="eyebrow">Reach us directly</div>
            <h3>We are ready to listen.</h3>
            <a className="contact-detail" href={phone} data-testid="link-contact-phone"><Phone /><span><strong>+254 142 066 857</strong><small>Call us directly</small></span></a>
            <a className="contact-detail" href={whatsapp} target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><MessageCircle /><span><strong>WhatsApp</strong><small>Message Vao Cornerstone</small></span></a>
            <div className="contact-detail"><Clock3 /><span><strong>Business hours</strong><small>9–5</small></span></div>
            <a className="button button-gold" href={`${whatsapp}?text=${encodeURIComponent('Hello Vao Cornerstone, I would like to start a conversation.')}`} target="_blank" rel="noreferrer" data-testid="link-card-whatsapp">Message us on WhatsApp <ArrowRight /></a>
            <p className="hours-note">Our contact form prepares a message for WhatsApp. It is not sent to a website server.</p>
          </aside>
        </div>
      </section>

      <footer className="footer" data-testid="section-footer">
        <div className="container">
          <div className="footer-main">
            <img className="footer-logo" src={asset('vao-logo-footer.jpeg')} alt="Vao Cornerstone Financial Advisor" data-testid="img-footer-logo" />
            <p className="footer-note">Practical financial clarity for businesses building what comes next.</p>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#about" data-testid="link-footer-about">About</a><a href="#services" data-testid="link-footer-services">Services</a><a href="#impact" data-testid="link-footer-impact">Impact</a><a href="#approach" data-testid="link-footer-approach">Approach</a><a href="#stand-for" data-testid="link-footer-stand-for">Values</a><a href={waLink()} target="_blank" rel="noreferrer" data-testid="link-footer-contact">WhatsApp</a>
            </nav>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Vao Cornerstone Financial Advisory</span><span>Thoughtful finance. Practical action.</span></div>
        </div>
      </footer>
      <a className="wa-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Message Vao Cornerstone on WhatsApp" data-testid="link-floating-whatsapp"><MessageCircle /></a>
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>;
}
export default App;