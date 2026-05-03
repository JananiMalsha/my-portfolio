import { useState, useEffect } from "react";

const styles = `
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

  * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
  html { scroll-behavior: smooth; }
  body { background: #0f172a; color: #fff; }

  nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 80px; }
  nav h2 { font-size: 24px; }
  nav ul { display: flex; list-style: none; }
  nav ul li { margin-left: 25px; }
  nav ul li a { text-decoration: none; color: #ccc; transition: .3s; cursor: pointer; }
  nav ul li a:hover { color: #00e5ff; }

  .hero { display: flex; align-items: center; justify-content: space-between; padding: 50px 80px; min-height: 85vh; gap: 60px; }
  .hero-text h4 { font-size: 20px; color: #ccc; }
  .hero-text h1 { font-size: 55px; margin: 10px 0; }
  .hero-text h2 { font-size: 30px; }
  .highlight { color: #00e5ff; }
  .hero-text p { margin: 20px 0; color: #aaa; max-width: 500px; line-height: 1.6; }

  .btn { display: inline-block; margin-top: 20px; padding: 12px 25px; border-radius: 30px; background: #00e5ff; color: #000; text-decoration: none; font-weight: bold; box-shadow: 0 0 20px #00e5ff; transition: .3s; cursor: pointer; border: none; }
  .btn:hover { transform: translateY(-3px); box-shadow: 0 0 30px #00e5ff; }

  .hexagon { width: 380px; height: 430px; background: linear-gradient(135deg, #00e5ff, #4ef3ff, #00bcd4); clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px #00e5ff, 0 0 40px #00e5ff, 0 0 70px rgba(0,229,255,0.6); animation: glowPulse 3s infinite ease-in-out; }
  .hexagon img { width: 350px; height: auto; object-fit: cover; border-radius: 12px; }

  @keyframes glowPulse {
    0% { box-shadow: 0 0 20px #00e5ff, 0 0 40px #00e5ff; }
    50% { box-shadow: 0 0 35px #00e5ff, 0 0 70px #00e5ff; }
    100% { box-shadow: 0 0 20px #00e5ff, 0 0 40px #00e5ff; }
  }

  .about { display: flex; align-items: center; justify-content: space-between; padding: 80px; background: #1e293b; gap: 50px; }
  .about-img { flex: 1; display: flex; justify-content: center; }
  .hexagon-border { width: 350px; height: 380px; border: 6px solid #00e5ff; clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 25px #00e5ff; }
  .hexagon-border img { width: 300px; height: auto; object-fit: cover; }
  .about-text { flex: 1; padding-left: 30px; }
  .about-text h1 { font-size: 45px; }
  .about-text h1 span { color: #00e5ff; }
  .about-text h3 { margin: 10px 0; font-size: 22px; color: #ccc; }
  .about-text p { color: #ccc; margin: 20px 0; line-height: 1.6; }
  .education { margin-top: 25px; }
  .education h2 { color: #00e5ff; margin-bottom: 15px; }
  .edu-item { background: #0f172a; padding: 15px; border-radius: 10px; margin-bottom: 10px; transition: .3s; }
  .edu-item:hover { box-shadow: 0 0 15px #00e5ff; transform: translateY(-3px); }

  .section-title { font-size: 45px; font-weight: 700; text-align: center; margin-bottom: 60px; }
  .section-title span { color: #00e5ff; text-shadow: 0 0 10px #00e5ff; }

  .skills { padding: 80px; background: #0f172a; text-align: center; }
  .skills-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; }
  .skill { width: 130px; height: 130px; border-radius: 50%; background: #1e293b; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: .3s; box-shadow: 0 0 10px rgba(0,229,255,.1); }
  .skill i { font-size: 40px; color: #00e5ff; margin-bottom: 10px; }
  .skill:hover { transform: translateY(-5px); box-shadow: 0 0 25px #00e5ff; }

  .projects { padding: 80px; background: #0f172a; text-align: center; }
  .projects-container { display: flex; justify-content: center; }
  .project-card { width: 320px; background: #1e293b; border-radius: 15px; overflow: hidden; transition: .3s; box-shadow: 0 0 10px rgba(0,229,255,.1); }
  .project-card:hover { transform: translateY(-5px); box-shadow: 0 0 25px #00e5ff; }
  .project-card img { width: 100%; height: 180px; object-fit: cover; }
  .project-info { padding: 20px; }
  .project-info p { color: #aaa; margin: 15px 0; }

  .contact { padding: 80px; background: #0f172a; text-align: center; }
  .contact-container { display: flex; justify-content: space-between; gap: 50px; max-width: 1000px; margin: auto; }
  .contact-info { flex: 1; }
  .info-box { background: #1e293b; padding: 20px; margin-bottom: 20px; border-radius: 10px; display: flex; align-items: center; gap: 15px; transition: .3s; }
  .info-box i { color: #00e5ff; font-size: 20px; }
  .info-box:hover { box-shadow: 0 0 20px #00e5ff; transform: translateY(-3px); }
  .contact-form { flex: 1; display: flex; flex-direction: column; gap: 15px; }
  .contact-form input, .contact-form textarea { padding: 12px; border: none; outline: none; background: #1e293b; color: #fff; border-radius: 8px; }
  .contact-form button { padding: 12px; border: none; background: #00e5ff; color: #000; font-weight: bold; border-radius: 8px; cursor: pointer; transition: .3s; }
  .contact-form button:hover { box-shadow: 0 0 20px #00e5ff; transform: translateY(-2px); }
`;

// ─── Typing animation hook ───────────────────────────────────────────────────
function useTyping(words) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const delay = deleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.substring(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1000);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayed(current.substring(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words]);

  return displayed;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav>
      <h2>Portfolio.</h2>
      <ul>
        {["home", "about", "techstack", "myprojects", "contact"].map((id) => (
          <li key={id}>
            <a onClick={() => scrollTo(id)}>
              {id === "techstack" ? "Tech stack" : id === "myprojects" ? "My Projects" : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const typed = useTyping(["Undergraduate Software Engineer"]);
  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <h4>Hello, It's Me</h4>
        <h1>Janani Malsha</h1>
        <h2>And I'm a <span className="highlight">{typed}</span></h2>
        <p>
          <b>I am a dedicated Software Engineering student who enjoys creating modern web
          applications and learning new technologies every day.</b>
        </p>
        <a href="/cv.pdf" download className="btn">Download CV</a>
      </div>
      <div className="hero-img">
        <div className="hexagon">
          <img src="Images/background6.jpeg" alt="profile" />
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="about" id="about">
      <div className="about-img">
        <div className="hexagon-border">
          <img src="Images/background6.jpeg" alt="about" />
        </div>
      </div>
      <div className="about-text">
        <h1>About <span>Me</span></h1>
        <h3>Undergraduate</h3>
        <p>
          I am a passionate Software Engineering undergraduate who enjoys building modern,
          responsive, and user-friendly web applications. I am continuously learning new
          technologies and improving my skills to become a skilled full-stack developer.
        </p>
        <div className="education">
          <h2>🎓 Education</h2>
          <div className="edu-item">
            <h4>Bachelor's Degree in Software Engineering</h4>
            <p>University of Kelaniya (Ongoing)</p>
          </div>
          <div className="edu-item">
            <h4>Advanced Level (A/L) - Physical Science</h4>
            <p>2022 | Sujatha Vidyalaya</p>
          </div>
        </div>
      
      <a href="#myprojects" className="btn">Read More</a>
      </div>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────
const skillsList = [
  { icon: "fab fa-html5", label: "HTML" },
  { icon: "fab fa-css3-alt", label: "CSS" },
  { icon: "fab fa-js", label: "JavaScript" },
  { icon: "fab fa-java", label: "Java" },
  { icon: "fas fa-code", label: "C" },
  { icon: "fas fa-database", label: "SQL" },
];

function Skills() {
  return (
    <section className="skills" id="techstack">
      <h2 className="section-title">Tech<span> Stack</span></h2>
      <div className="skills-container">
        {skillsList.map(({ icon, label }) => (
          <div className="skill" key={label}>
            <i className={icon}></i>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────
const projectsList = [
  {
    img: "Images/Youtube clone.png",
    title: "YouTube Clone",
    desc: "A responsive YouTube clone UI built using HTML and CSS.",
    link: "https://github.com/JananiMalsha/Youtube-Clone",
  },
];

function Projects() {
  return (
    <section className="projects" id="myprojects">
      <h2 className="section-title">My <span>Projects</span></h2>
      <div className="projects-container">
        {projectsList.map(({ img, title, desc, link }) => (
          <div className="project-card" key={title}>
            <img src={img} alt={title} />
            <div className="project-info">
              <h3>{title}</h3>
              <p>{desc}</p>
              <a href={link} className="btn">View Project</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent! Thanks, ${form.name}`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Contact <span>Me</span></h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-box"><i className="fas fa-envelope"></i><p>sewminiwak@gmail.com</p></div>
          <div className="info-box"><i className="fas fa-phone"></i><p>+94 762527442</p></div>
          <div className="info-box"><i className="fas fa-map-marker-alt"></i><p>Sri Lanka</p></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your Name" required />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Your Email" required />
          <textarea name="message" value={form.message} onChange={handleChange} rows="6" placeholder="Your Message" />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <>
      <style>{styles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
