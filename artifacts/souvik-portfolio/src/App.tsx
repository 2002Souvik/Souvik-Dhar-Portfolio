import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clipboard,
  ExternalLink,
  Github,
  Linkedin,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { portfolio } from './data/portfolio';

type Project = (typeof portfolio.projects)[number];
type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem('souvik-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('souvik-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null);
      if (event.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(
          '.project-dialog button, .project-dialog a[href], .project-dialog [tabindex]:not([tabindex="-1"])',
        ));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.setTimeout(() => document.querySelector<HTMLButtonElement>('.dialog-close')?.focus(), 0);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      previous?.focus();
    };
  }, [activeProject]);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark');
  const closeMobileNav = () => setMobileOpen(false);
  const onProjectKeyDown = (event: KeyboardEvent<HTMLElement>, project: Project) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveProject(project);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${portfolio.email}`;
    }
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormSubmitted(false);
    const { name, email, message } = formState;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please complete all three fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Enter a valid email address.');
      return;
    }
    setFormSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <main className="portfolio">
      <header className="topbar">
        <div className="shell topbar-inner">
          <a className="brand" href="#top" aria-label="Souvik Dhar, home" onClick={closeMobileNav}>
            <span className="brand-mark">SD</span>
            <span>Souvik Dhar</span>
          </a>
          <nav className={`navlinks ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <a href="#about" onClick={closeMobileNav}>About</a>
            <a href="#work" onClick={closeMobileNav}>Projects</a>
            <a href="#skills" onClick={closeMobileNav}>Skills</a>
            <a href="#experience" onClick={closeMobileNav}>Experience</a>
            <a href="#education" onClick={closeMobileNav}>Education</a>
            <a href="#certifications" onClick={closeMobileNav}>Certifications</a>
            <a href="#profiles" onClick={closeMobileNav}>Profiles &amp; proof</a>
            <a href="#contact" onClick={closeMobileNav}>Contact</a>
          </nav>
          <div className="header-actions">
            <a className="button-quiet resume-link" href={portfolio.links.resumeDownload} target="_blank" rel="noreferrer" aria-label="Download resume">
              Download resume <ArrowUpRight size={14} />
            </a>
            <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="menu-button" type="button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-grid">
          <div>
            <div className="eyebrow mono">{portfolio.name} · {portfolio.subheadline} · {portfolio.location}</div>
            <h1>Building with<br /><span>curiosity.</span></h1>
            <p className="hero-copy">{portfolio.introduction} Interested in thoughtful backend systems and useful full-stack products.</p>
            <div className="hero-cta">
              <a className="button-primary" href="#work">Explore selected work <ArrowDownRight size={15} /></a>
              <a className="button-quiet" href={portfolio.links.resumeDownload} target="_blank" rel="noreferrer">Download resume <ArrowUpRight size={13} /></a>
              <a className="button-quiet" href={portfolio.links.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract orbit illustration">
            <span className="side-note">Currently learning by building</span>
            <div className="orbit">
              <div className="orbit-inner">
                <span className="glyph">S.</span>
                <small>Java · JavaScript</small>
              </div>
              <span className="orbit-label mono">Ideas in motion / 01</span>
            </div>
          </div>
        </div>
        <div className="scroll-cue"><span /> Keep reading <span /></div>
      </section>

      <div className="ticker" aria-label="Technical interests">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1}>
              JAVA <b>·</b> BACKEND ENGINEERING <b>·</b> REST APIS <b>·</b> DATABASE SYSTEMS <b>·</b> FULL-STACK DEVELOPMENT <b>·</b> COMPUTER SCIENCE <b>·</b>
            </span>
          ))}
        </div>
      </div>

      <section className="section shell" id="about">
        <div className="section-heading reveal">
          <div><div className="section-index">01 / A little context</div><h2>Engineer by study.<br /><em>Builder by nature.</em></h2></div>
          <p className="section-intro">A computer science student interested in making software work well, from the data model to the last interaction.</p>
        </div>
        <div className="about-layout">
          <p className="about-statement reveal">“Good software starts with <em>clear thinking</em> and gets better with careful iteration.”</p>
          <div className="about-detail reveal reveal-delay">
            <p>{portfolio.summary}</p>
            <p>Alongside project work, I keep strengthening the fundamentals: object-oriented design, data structures, operating systems, networking, and databases.</p>
            <div className="interest-list" aria-label="Areas of interest">
              {portfolio.interests.map((interest) => <span key={interest}>{interest}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section project-section" id="work">
        <div className="shell">
          <div className="section-heading reveal">
            <div><div className="section-index">02 / Selected work</div><h2>Projects with<br /><em>purpose.</em></h2></div>
            <p className="section-intro">A few things I have built while exploring APIs, persistence, and practical product workflows. Select a project for the details.</p>
          </div>
          <div className="project-list">
            {portfolio.projects.map((project) => (
              <article
                className="project-row reveal"
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                onClick={() => setActiveProject(project)}
                onKeyDown={(event) => onProjectKeyDown(event, project)}
              >
                <span className="project-no">{project.number}</span>
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-sub">{project.description}</p>
                </div>
                <div className="project-stack" aria-label="Technology stack">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
                <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
              </article>
            ))}
          </div>
          <p className="project-foot">Only verified source links are shown. Project work is presented without unverified live demos.</p>
        </div>
      </section>

      <section className="section shell" id="skills">
        <div className="section-heading reveal">
          <div><div className="section-index">03 / Technical toolkit</div><h2>Tools I reach for.<br /><em>Things I know.</em></h2></div>
          <p className="section-intro">A practical toolkit grounded in core concepts, with room to keep learning.</p>
        </div>
        <div className="skills-layout">
          <div className="skills-aside reveal">Strong foundations.<br /><span>Curious practice.</span></div>
          <div className="skill-groups reveal reveal-delay">
            {portfolio.skills.map((group) => (
              <div className="skill-group" key={group.category}>
                <h3>{group.category}</h3>
                <p>{group.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="shell">
          <div className="section-heading reveal">
            <div><div className="section-index">04 / Experience &amp; activities</div><h2>Learning by<br /><em>building.</em></h2></div>
            <p className="section-intro">{portfolio.experience.intro}</p>
          </div>
          <div className="experience-grid">
            {portfolio.experience.items.map((item) => (
              <article className="experience-card reveal" key={item.title}>
                <span className="date">{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section education-section" id="education">
        <div className="shell">
          <div className="section-heading reveal">
            <div><div className="section-index">04 / Learning so far</div><h2>Built on a<br /><em>strong base.</em></h2></div>
            <p className="section-intro">Formal study in computer science, balanced with hands-on projects and continued practice.</p>
          </div>
          <div className="education-layout">
            {portfolio.education.map((item) => (
              <article className="education-card reveal" key={item.degree}>
                <span className="date">{item.period}</span>
                <span className="grade">{item.result}</span>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell certification-section" id="certifications">
        <div className="section-heading reveal">
          <div><div className="section-index">05 / Certification</div><h2>Learning,<br /><em>recognized.</em></h2></div>
          <p className="section-intro">View my certification below.</p>
        </div>
        <div className="certification-preview reveal">
          <iframe
            src="https://drive.google.com/file/d/1ChQhKXhXlaEGHcuYK9i5ReqNnUvJ8dkf/preview"
            title="Certification preview"
            loading="lazy"
            allow="autoplay"
            allowFullScreen
          />
        </div>
      </section>

      <section className="section shell" id="profiles">
        <div className="section-heading reveal">
          <div><div className="section-index">06 / Achievements &amp; profiles</div><h2>Practice,<br /><em>made visible.</em></h2></div>
          <p className="section-intro">Verified learning milestones and public coding profiles. No unverified rankings or live statistics.</p>
        </div>
        <div className="profiles-layout">
          <article className="achievement-card reveal">
            <span className="achievement-number">{portfolio.achievements.problemSolving}</span>
            <span className="achievement-label">{portfolio.achievements.problemSolvingLabel}</span>
            <p>{portfolio.achievements.problemSolvingNote}</p>
            <div className="achievement-cert">
              <span className="date">2024</span>
              <strong>{portfolio.achievements.certification}</strong>
              <span>{portfolio.achievements.certificationNote}</span>
            </div>
          </article>
          <div className="coding-profiles reveal reveal-delay">
            {portfolio.codingProfiles.map((profile) => (
              <a className="profile-card" href={profile.url} target="_blank" rel="noreferrer" key={profile.name}>
                <span className="profile-name">{profile.name}</span>
                <span className="profile-handle">{profile.handle}</span>
                <span className="profile-description">{profile.description}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell contact-section" id="contact">
        <div className="section-heading reveal">
          <div><div className="section-index">05 / Start a conversation</div></div>
          <p className="section-intro">Interested in my work or want to talk about an opportunity? I would be glad to hear from you.</p>
        </div>
        <div className="contact-layout">
          <div className="reveal">
            <h2 className="contact-headline">Let’s make<br /><em>something useful.</em></h2>
            <p className="contact-copy">For opportunities, project conversations, or a good discussion about backend engineering, reach me directly.</p>
            <button className="email-button" type="button" onClick={copyEmail} aria-live="polite">
              {copied ? <Check size={15} /> : <Clipboard size={15} />}
              {copied ? 'Email copied to clipboard' : portfolio.email}
            </button>
          </div>
          <form className="contact-form reveal reveal-delay" onSubmit={submitContact} noValidate>
            <div className="form-field">
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" autoComplete="name" value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} required />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">Your email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} required />
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">A note</label>
              <textarea id="contact-message" name="message" value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} required />
            </div>
            {formError && <p className="form-error" role="alert">{formError}</p>}
            <button className="button-primary" type="submit">Check message <ArrowRight size={15} /></button>
            <p className="demo-note">Demo form only — it validates your details in this browser and does not send or store messages. Please use the email link to contact me.</p>
            {formSubmitted && <div className="form-success" role="status">Looks good. This demo does not send the message; use the email address above instead.</div>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <span>© {new Date().getFullYear()} {portfolio.name}</span>
          <span>Made with care · {portfolio.location}</span>
          <div className="social-links" aria-label="Social profiles">
            <a href={portfolio.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /></a>
            <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a>
            <a href={portfolio.links.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">LeetCode <ExternalLink size={11} /></a>
            <a href="#top" aria-label="Back to top">Back to top ↑</a>
          </div>
        </div>
      </footer>

      {activeProject && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveProject(null);
        }}>
          <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
            <button className="dialog-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close project details"><X size={17} /></button>
            <span className="dialog-date">{activeProject.number} / {activeProject.date}</span>
            <h2 id="project-dialog-title">{activeProject.title}</h2>
            <p>{activeProject.description}</p>
            <ul className="dialog-list">{activeProject.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            <div className="dialog-stack">{activeProject.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            <div className="dialog-links">
              {activeProject.repo
                ? <a className="button-primary" href={activeProject.repo} target="_blank" rel="noreferrer">View verified repository <ArrowUpRight size={14} /></a>
                : <span className="demo-note">{activeProject.linkNote}</span>}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
