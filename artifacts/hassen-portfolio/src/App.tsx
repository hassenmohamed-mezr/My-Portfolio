import { type ReactNode, useEffect, useState } from 'react';
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import portrait from '@assets/hassen-mohamed-portrait.jpeg';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { projects } from './data/projects';

const queryClient = new QueryClient();

const jump = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (id: string) => { setOpen(false); jump(id); };
  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} data-testid="navigation-header">
        <div className="container nav-inner">
          <a className="brand" href="#top" data-testid="link-brand">HASSEN MOHAMED</a>
          <nav className="nav-links" aria-label="Primary navigation">
            {['work', 'about', 'skills', 'contact'].map((item) => (
              <a key={item} className="nav-link" href={`#${item}`} onClick={() => setOpen(false)} data-testid={`link-nav-${item}`}>
                {item.toUpperCase()}
              </a>
            ))}
          </nav>
          <button className="menu-trigger" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
            {open ? <X size={15} aria-hidden="true" /> : <Menu size={15} aria-hidden="true" />} {open ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>
      <nav id="mobile-navigation" className={`mobile-menu ${open ? 'open' : ''}`} aria-label="Mobile navigation">
        {['work', 'about', 'skills', 'contact'].map((item) => (
          <a key={item} className="nav-link" href={`#${item}`} onClick={() => setOpen(false)} data-testid={`link-mobile-nav-${item}`}>{item.toUpperCase()}</a>
        ))}
      </nav>
    </>
  );
}

function SystemVisualization() {
  return (
    <div className="system-visual" aria-label="System visualization showing a problem moving through AI engineering to legal, healthcare, and vision systems">
      <div className="system-frame">
        <div className="frame-top"><span>SYS / 001 — SYSTEM MAP</span><span className="status">● ACTIVE</span></div>
        <div className="system-flow">
          <div className="node problem">PROBLEM</div>
          <div className="connector span" />
          <div className="node core">AI ENGINEERING<small>RAG · ML · APIs · RETRIEVAL</small></div>
          <div className="branch">
            <div className="connector" /><div className="connector" /><div className="connector" />
          </div>
          <div className="node output">LEGAL<br />AI</div>
          <div className="node output">HEALTHCARE<br />AI</div>
          <div className="node output">VISION<br />ML</div>
        </div>
        <p className="system-note">UNDERSTAND → DESIGN → EVALUATE</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">AI ENGINEER</div>
          <h1>I engineer AI systems <span>around real problems.</span></h1>
          <p className="hero-description">I build practical systems that combine AI models, retrieval pipelines, software architecture, and real-world workflows.</p>
          <div className="hero-tags" aria-label="Specializations">
            {['GENERATIVE AI', 'RAG SYSTEMS', 'MACHINE LEARNING', 'AI INTEGRATION'].map((tag) => <span className="hero-tag" key={tag}>{tag}</span>)}
          </div>
          <div className="actions">
            <a className="button" href="#work" data-testid="button-view-work">VIEW MY WORK <ChevronRight size={14} aria-hidden="true" /></a>
            <a className="button secondary" href={projects[0].github} target="_blank" rel="noreferrer" data-testid="link-hero-github">GITHUB <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
        <SystemVisualization />
      </div>
    </section>
  );
}

function Approach() {
  const items = [
    ['01', 'UNDERSTAND', 'Break the problem down and understand how it actually works.'],
    ['02', 'ENGINEER', 'Design the architecture, pipeline, and components around the requirements.'],
    ['03', 'EVALUATE', 'Test the system, inspect failures, and improve what actually matters.'],
  ];
  return (
    <section className="section" id="approach">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">01 / APPROACH</div>
          <div><h2>From problem to system.</h2><p>I don't choose the technology first. I understand the problem first.</p></div>
        </div>
        <div className="approach-grid">
          {items.map(([number, title, copy]) => <article className="approach-item" key={number} data-testid={`approach-${number}`}><span className="approach-number mono">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function LexArchitecture() {
  const steps = ['USER INPUT', 'NARRATIVE DETECTION', 'QUERY REWRITING', 'LEGAL SUB-QUESTIONS', 'HYBRID RETRIEVAL', 'FAISS + BM25', 'DYNAMIC SCORE FUSION', 'ARTICLE-LEVEL MERGE', 'PRE-RERANK FILTER', 'CROSS-ENCODER', 'QWEN 2.5 7B', 'GROUNDED ANSWER'];
  return <div className="project-architecture" aria-label="Lex AI retrieval pipeline"><div className="arch-label">ARCHITECTURE / RETRIEVAL PIPELINE</div><div className="pipeline">{steps.map((step, index) => <div key={step}><div className={`pipeline-step ${index === 4 || index === 5 || index === 9 ? 'emphasis' : ''} ${index === steps.length - 1 ? 'output' : ''}`}>{step}</div>{index < steps.length - 1 && <div className="pipeline-line" />}</div>)}</div></div>;
}

function HospitalArchitecture() {
  return <div className="project-architecture compact-arch" aria-label="Hospital information system architecture"><div className="arch-label">ARCHITECTURE / SYSTEM MAP</div><div className="branch-arch"><div className="center-node">HOSPITAL SYSTEM</div><div className="arch-node">ADMIN</div><div className="arch-node">DOCTOR</div><div className="arch-node">RECEPTION</div><div className="wide-node">HOSPITAL OPERATIONS</div><div className="arch-node">PATIENTS</div><div className="arch-node">APPOINTMENTS</div><div className="arch-node">VISITS</div><div className="center-node">AI ASSISTANT → FastAPI → SentenceTransformers → FAISS → Gemini</div></div></div>;
}

function MedicalArchitecture() {
  const steps = ['IMAGE', 'GRAYSCALE', 'RESIZE 32×32', 'FLATTEN', 'NORMALIZATION', 'TRAIN / VALIDATION / TEST', 'HYPERPARAMETER TUNING', 'KNN + LOGISTIC REGRESSION', 'EVALUATION', 'ACCURACY / CONFUSION MATRIX'];
  return <div className="project-architecture compact-arch" aria-label="Medical image classification pipeline"><div className="arch-label">ARCHITECTURE / IMAGE PIPELINE</div><div className="medical-visual" aria-hidden="true">{Array.from({ length: 64 }, (_, index) => <span key={index} />)}</div><div className="pipeline" style={{ marginTop: 16 }}>{steps.map((step, index) => <div key={step}><div className={`pipeline-step ${index === 7 ? 'emphasis' : ''}`}>{step}</div>{index < steps.length - 1 && <div className="pipeline-line" />}</div>)}</div></div>;
}

function ProjectActions({ project }: { project: typeof projects[number] }) {
  return <div className="project-actions"><button className="text-link" type="button" onClick={() => jump(project.id)} data-testid={`button-case-study-${project.id}`}>{project.cta} <ChevronRight size={13} style={{ verticalAlign: 'middle' }} aria-hidden="true" /></button><a className="text-link" href={project.github} target="_blank" rel="noreferrer" data-testid={`link-github-${project.id}`}>GITHUB <ArrowUpRight size={13} style={{ verticalAlign: 'middle' }} aria-hidden="true" /></a></div>;
}

function ProjectTags({ tags }: { tags: string[] }) {
  return <div className="tags" aria-label="Technologies">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>;
}

function Projects() {
  const lex = projects[0];
  const hospital = projects[1];
  const breast = projects[2];
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-header projects-intro">
          <div className="eyebrow">02 / SELECTED WORK</div>
          <div><h2>AI &amp; Software Systems</h2><p>Three projects spanning Generative AI, AI-powered software integration, and Machine Learning.</p></div>
        </div>
        <article className="project primary-project" id={lex.id} data-testid="project-lex-ai">
          <div className="project-head"><div><div className="project-label">{lex.label}</div><h3>{lex.title}</h3><p className="project-desc">{lex.description}</p></div><div className="project-index">{lex.index}</div></div>
          <div className="project-body"><LexArchitecture /><div className="project-side"><div className="highlight-grid"><div className="highlight"><strong>HYBRID RETRIEVAL</strong><span>FAISS + BM25</span></div><div className="highlight"><strong>QUERY INTELLIGENCE</strong><span>Narrative → Legal Questions</span></div><div className="highlight"><strong>CONTEXT INTEGRITY</strong><span>Article-Level Merging</span></div></div><p className="subtle-note">Lex AI is a retrieval-heavy AI system — not a simple chatbot.</p><ProjectTags tags={lex.tags} /><ProjectActions project={lex} /></div></div>
        </article>
        <div className="project-row">
          <article className="project project-secondary" id={hospital.id} data-testid="project-hospital">
            <div className="project-head"><div><div className="project-label">{hospital.label}</div><h3>{hospital.title}</h3><p className="project-desc">{hospital.description}</p></div><div className="project-index">{hospital.index}</div></div>
            <div className="project-body"><HospitalArchitecture /><div className="project-side"><p className="subtle-note">The AI layer is implemented as a dedicated FastAPI service separated from the ASP.NET MVC application.</p><ProjectTags tags={hospital.tags} /><ProjectActions project={hospital} /></div></div>
          </article>
          <article className="project project-secondary" id={breast.id} data-testid="project-breast-cancer">
            <div className="project-head"><div><div className="project-label">{breast.label}</div><h3>{breast.title}</h3><p className="project-desc">{breast.description}</p></div><div className="project-index">{breast.index}</div></div>
            <div className="project-body"><MedicalArchitecture /><div className="project-side"><p className="subtle-note">Classical machine learning applied to medical image classification.</p><ProjectTags tags={breast.tags} /><ProjectActions project={breast} /></div></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const groups: Array<[string, string[]]> = [
    ['GENERATIVE AI', ['RAG', 'LLMs', 'Prompt Engineering', 'Query Rewriting', 'Embeddings', 'Reranking']],
    ['RETRIEVAL', ['FAISS', 'BM25', 'Semantic Search', 'Hybrid Retrieval', 'Vector Search']],
    ['MACHINE LEARNING', ['Scikit-learn', 'KNN', 'Logistic Regression', 'Model Evaluation', 'Hyperparameter Tuning']],
    ['AI BACKEND', ['Python', 'FastAPI', 'REST APIs', 'AI Microservices']],
    ['SOFTWARE ENGINEERING', ['C#', 'ASP.NET Core', 'MVC', 'Entity Framework Core', 'SQLite']],
    ['AI INTEGRATION', ['SentenceTransformers', 'Ollama', 'Qwen', 'Gemini']],
  ];
  return <section className="section" id="skills"><div className="container"><div className="section-header"><div className="eyebrow">03 / ENGINEERING STACK</div><div><h2>Tools I build with.</h2><p>Technologies organized around the systems they help make possible.</p></div></div><div className="stack-grid">{groups.map(([title, items]) => <div className="stack-group" key={title}><h3>{title}</h3><div className="stack-list">{(items as string[]).map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></div></section>;
}

function Mindset() {
  const steps = ['PROBLEM', 'UNDERSTAND', 'TRACE THE FLOW', 'IDENTIFY THE CAUSE', 'FORM HYPOTHESES', 'TEST', 'ENGINEER', 'EVALUATE', 'ITERATE'];
  return <section className="section mindset"><div className="container mindset-grid"><div><div className="eyebrow">04 / ENGINEERING MINDSET</div><h2>I don't start with the model.<span>I start with the problem.</span></h2></div><div><p className="mindset-copy">I prefer understanding why a system fails over simply fixing the visible error.<br /><br />I trace the path that led to the problem, test possible causes, compare approaches, and choose the one that fits the actual constraints.</p><div className="mindset-flow">{steps.map((step) => <div className="mindset-step" key={step}>{step}</div>)}</div></div></div></section>;
}

function About() {
  return <section className="section" id="about"><div className="container"><div className="about-grid"><div className="about-copy"><div className="eyebrow">05 / ABOUT</div><h2>About Me</h2><p>I'm an AI Engineer focused on building practical AI systems across Generative AI, RAG, Machine Learning, and AI-powered software applications.</p><p>My approach starts with understanding the problem before choosing the technology. I like breaking complex systems into smaller components, tracing failures to their source, and engineering solutions around real constraints.</p><p>My work ranges from retrieval-heavy RAG systems for Egyptian legal text, to integrating AI into a full hospital information system, to applying classical machine learning to medical image classification.</p></div><div className="portrait-wrap"><img className="portrait" src={portrait} alt="Hassen Mohamed" loading="lazy" data-testid="img-hassen-portrait" /></div><div className="education"><div className="eyebrow">EDUCATION</div><h3>Learning the foundations.</h3><div className="timeline"><div className="timeline-item"><strong>Assiut National University</strong><span>B.Sc. Computers &amp; Artificial Intelligence<br />AI Program</span></div><div className="timeline-item"><strong>Digital Egypt Pioneers Initiative</strong><span>AI &amp; Data Science</span></div><div className="timeline-item"><strong>Microsoft Machine Learning Engineer</strong></div></div></div></div></div></section>;
}

function Contact() {
  return <section className="contact" id="contact"><div className="container contact-inner"><div className="eyebrow">06 / CONTACT</div><h2>Have a problem worth <span>solving?</span></h2><p className="contact-subtitle">Let's build the right system for it.</p><div className="actions"><a className="button" href={projects[0].github} target="_blank" rel="noreferrer" data-testid="link-contact-github">GITHUB <ArrowUpRight size={14} aria-hidden="true" /></a><a className="button secondary" href="https://www.linkedin.com/in/hassen-mohamed-91539835b" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin">LINKEDIN <ArrowUpRight size={14} aria-hidden="true" /></a><a className="button secondary" href="mailto:marwanmezr@gmal.com" data-testid="link-contact-email">EMAIL <ArrowUpRight size={14} aria-hidden="true" /></a></div><div className="contact-details" aria-label="Direct contact details"><a href="mailto:marwanmezr@gmal.com">marwanmezr@gmal.com</a><span aria-hidden="true">/</span><a href="tel:+2010198888950">01019888950</a><a href="tel:+201101760668">01101760668</a></div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><div><div className="footer-brand">HASSEN MOHAMED</div><div className="footer-copy">AI ENGINEER<br />Generative AI · RAG · Machine Learning · AI Integration</div></div><div className="footer-copy">© 2026</div><button className="back-top" type="button" onClick={() => jump('top')} data-testid="button-back-to-top">BACK TO TOP ↑</button></div></footer>;
}

function Home() {
  return <div className="site-shell"><Navbar /><main><Hero /><About /><Approach /><Projects /><Stack /><Mindset /><Contact /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;