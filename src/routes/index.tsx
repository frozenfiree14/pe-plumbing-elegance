import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight, Award, Check, CircleCheck, Droplets, Flame, House, Mail,
  MapPin, Menu, Pipe, ShieldCheck, Sparkles, Star, Wrench, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@/assets/pe-plumbing-hero.jpg";
import aboutImage from "@/assets/pe-plumbing-about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P&E Plumbing | Clean, Reliable Plumbing in Wilkes-Barre" },
      { name: "description", content: "Female-owned, licensed and insured plumbing in Wilkes-Barre, PA. Request a free estimate for clean, dependable residential plumbing service." },
      { property: "og:title", content: "P&E Plumbing | Wilkes-Barre, PA" },
      { property: "og:description", content: "Clean work. Clear communication. Quality that lasts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const navItems = [
  ["Home", "home"], ["About", "about"], ["Services", "services"],
  ["Why P&E", "why"], ["Contact", "contact"],
] as const;

const services = [
  { title: "Leak Detection & Repair", text: "Find and fix plumbing leaks before they become bigger problems.", icon: Droplets },
  { title: "Faucet & Fixture Repair", text: "Professional repair and replacement for faucets, sinks and fixtures.", icon: Wrench },
  { title: "Drain Cleaning", text: "Reliable solutions for clogged and slow drains.", icon: Sparkles },
  { title: "Toilet Repair & Replacement", text: "Professional toilet repair, maintenance and replacement.", icon: House },
  { title: "Water Heater Services", text: "Reliable water heater troubleshooting, repair and service.", icon: Flame },
  { title: "Pipe Repair", text: "Professional solutions for damaged or leaking pipes.", icon: Pipe },
  { title: "Emergency Plumbing", text: "Fast assistance when unexpected plumbing problems happen.", icon: ShieldCheck },
  { title: "General Plumbing", text: "Reliable plumbing support for everyday residential needs.", icon: Wrench },
];

const testimonials = [
  { quote: "Professional, friendly and incredibly clean. Everything was explained clearly and the work was done perfectly.", name: "Happy Customer" },
  { quote: "Thoughtful service from start to finish. The pricing was clear, the space was respected, and the repair felt built to last.", name: "Local Homeowner" },
  { quote: "Responsive, knowledgeable and refreshingly easy to work with. Exactly the kind of care you want in your home.", name: "Wilkes-Barre Resident" },
];

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.65 } };

function SectionHeading({ eyebrow, title, light = false, center = false }: { eyebrow: string; title: string; light?: boolean; center?: boolean }) {
  return <motion.div {...reveal} className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    <p className={`mb-4 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-copper" : "text-copper-emphasis"}`}>{eyebrow}</p>
    <h2 className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${light ? "text-hero-foreground" : "text-primary"}`}>{title}</h2>
  </motion.div>;
}

function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [testimonial, setTestimonial] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const current = [...navItems].reverse().find(([, id]) => document.getElementById(id)?.getBoundingClientRect().top! <= 180);
      if (current) setActive(current[1]);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setTestimonial((value) => (value + 1) % testimonials.length), 5200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitEstimate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Estimate request: ${data.get("service")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nService: ${data.get("service")}\n\n${data.get("message")}`);
    window.location.href = `mailto:peplumbingnepa@gmail.com?subject=${subject}&body=${body}`;
  };

  return <main className="overflow-hidden bg-background">
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border/70 bg-background/90 py-2 shadow-sm backdrop-blur-xl" : "bg-primary/20 py-4 backdrop-blur-sm"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <button aria-label="Go to home" onClick={() => scrollTo("home")} className={`group flex items-center gap-3 ${scrolled ? "text-primary" : "text-hero-foreground"}`}>
          <span className="flex size-10 items-center justify-center rounded-full border border-copper/60 font-display text-sm font-extrabold text-copper">P&E</span>
          <span className="font-display text-lg font-bold">P&E Plumbing</span>
        </button>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-copper after:transition-transform ${scrolled ? "text-foreground hover:text-copper-emphasis" : "text-hero-foreground/85 hover:text-hero-foreground"} ${active === id ? "after:scale-x-100" : "after:scale-x-0"}`}>{label}</button>)}
        </nav>
        <div className="hidden lg:block"><Button variant="copper" onClick={() => scrollTo("contact")}>Get a Free Estimate <ArrowRight /></Button></div>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} className={`flex size-11 items-center justify-center rounded-md lg:hidden ${scrolled ? "text-primary" : "text-hero-foreground"}`}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mx-4 mt-2 border border-border bg-background p-4 shadow-xl lg:hidden">
        {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="block w-full border-b border-border px-2 py-4 text-left font-semibold text-primary last:border-0">{label}</button>)}
        <Button variant="copper" size="lg" className="mt-4 w-full" onClick={() => scrollTo("contact")}>Get a Free Estimate</Button>
      </motion.nav>}
    </header>

    <section id="home" className="relative flex min-h-[92svh] items-end overflow-hidden bg-primary pt-28">
      <motion.img initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.4 }} src={heroImage} alt="Professional female plumber working on copper pipes in a modern kitchen" width={1920} height={1200} fetchPriority="high" className="absolute inset-0 size-full object-cover object-[68%_center]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/25" />
      <div className="absolute right-[7%] top-[25%] hidden size-32 rounded-full border border-hero-foreground/20 lg:block animate-float-soft" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:pb-20 lg:px-8 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-copper"><span className="h-px w-10 bg-copper" /> Female-owned • Licensed & insured</div>
          <h1 className="text-4xl font-extrabold leading-[1.08] text-hero-foreground sm:text-6xl lg:text-7xl">Plumbing Done Right.<br/><span className="text-copper">Clean. Clear. Reliable.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-hero-foreground/80 sm:text-lg">P&E Plumbing is a female-owned, licensed & insured plumbing company bringing a fresh standard to plumbing — clean work, clear communication, and quality that lasts.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button variant="copper" size="lg" onClick={() => scrollTo("contact")}>Get a Free Estimate <ArrowRight /></Button><Button variant="heroOutline" size="lg" onClick={() => scrollTo("services")}>Explore Our Services</Button></div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0 hidden bg-background/95 px-9 py-6 text-primary backdrop-blur lg:block"><p className="text-xs font-bold uppercase tracking-[0.18em] text-copper-emphasis">Proudly serving</p><p className="mt-1 font-display text-lg font-bold">Wilkes-Barre, Pennsylvania</p></div>
    </section>

    <section aria-label="Credentials" className="border-b border-border bg-background"><div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
      {[{t:"Female-Owned",d:"Modern leadership with a personal touch.",i:Sparkles},{t:"Licensed & Insured",d:"Professional service you can trust.",i:ShieldCheck},{t:"Quality That Lasts",d:"Durable, reliable plumbing solutions.",i:Award},{t:"Clean & Professional",d:"Respectful service and clean workmanship.",i:CircleCheck}].map(({t,d,i:Icon}) => <div key={t} className="group flex gap-4 px-4 py-8 sm:px-7"><Icon className="size-6 shrink-0 text-copper-emphasis transition-transform group-hover:-translate-y-1"/><div><h3 className="font-display font-bold text-primary">{t}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{d}</p></div></div>)}
    </div></section>

    <section id="about" className="scroll-mt-24 py-20 sm:py-28"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
      <motion.div {...reveal} className="relative"><div className="overflow-hidden rounded-lg"><img src={aboutImage} alt="P&E plumber carefully installing a bathroom fixture" width={1200} height={1408} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" /></div><div className="absolute -bottom-6 -right-3 max-w-[230px] rounded-md bg-primary p-6 text-hero-foreground shadow-2xl sm:-right-8"><p className="font-display text-2xl font-bold">Care in every detail.</p><p className="mt-2 text-sm text-hero-foreground/70">From first conversation to final cleanup.</p></div></motion.div>
      <div><SectionHeading eyebrow="About P&E Plumbing" title="A Fresh Standard in Plumbing"/><motion.div {...reveal} transition={{duration:.65,delay:.1}} className="mt-7 space-y-5 text-base leading-8 text-muted-foreground"><p>P&E Plumbing is built around a simple idea: plumbing service should be professional, transparent, clean, and dependable.</p><p>As a female-owned plumbing company, we bring a fresh perspective to the industry — combining skilled workmanship with clear communication and genuine care for every customer.</p><p>From small repairs to larger plumbing needs, our goal is simple: do the job right and leave every space cleaner and every customer confident.</p></motion.div>
        <motion.div {...reveal} className="mt-9 grid grid-cols-3 gap-3 border-t border-border pt-7">{["Licensed & Insured","Quality Focused","Customer First"].map((item,i)=><div key={item}><p className="font-display text-2xl font-extrabold text-copper-emphasis">0{i+1}</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-primary sm:text-sm">{item}</p></div>)}</motion.div>
      </div>
    </div></section>

    <section id="services" className="scroll-mt-20 bg-primary py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="What We Do" title="Plumbing Services You Can Count On" light/><div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-hero-foreground/15 sm:grid-cols-2 lg:grid-cols-4">{services.map(({title,text,icon:Icon},i)=><motion.article key={title} {...reveal} transition={{duration:.5,delay:(i%4)*.06}} className="group bg-primary p-7 transition-colors hover:bg-ink-soft"><div className="flex size-12 items-center justify-center rounded-full bg-copper/15 text-copper transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3"><Icon/></div><h3 className="mt-8 min-h-14 font-display text-lg font-bold leading-snug text-hero-foreground">{title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-hero-foreground/65">{text}</p><button onClick={()=>scrollTo("contact")} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-copper">Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></button></motion.article>)}</div></div></section>

    <section id="why" className="scroll-mt-20 bg-ivory py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="The P&E Difference" title="Why Homeowners Choose P&E" center/><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{["Female-Owned","Licensed & Insured","Clear Communication","Clean Workmanship","Quality Materials","Reliable Service","Transparent Approach","Customer-Focused Care"].map((item,i)=><motion.div key={item} {...reveal} transition={{duration:.45,delay:(i%4)*.06}} className="flex items-center gap-4 rounded-md border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-copper/50 hover:shadow-lg"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-copper/12 text-copper-emphasis"><Check className="size-4"/></span><span className="font-display text-sm font-bold text-primary">{item}</span></motion.div>)}</div></div></section>

    <section className="py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="Simple & Transparent" title="Quality Service, Step by Step"/><div className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6"><div className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block"/>{[{n:"01",t:"Contact Us",d:"Tell us what plumbing issue you're experiencing."},{n:"02",t:"Get an Estimate",d:"We'll discuss the problem and provide clear pricing information."},{n:"03",t:"Professional Service",d:"Our team completes the work carefully and professionally."},{n:"04",t:"Done Right",d:"We leave you with quality work you can rely on."}].map((step,i)=><motion.div key={step.n} {...reveal} transition={{duration:.55,delay:i*.1}} className="relative"><span className="relative z-10 flex size-14 items-center justify-center rounded-full border border-copper bg-background font-display text-sm font-extrabold text-copper-emphasis">{step.n}</span><h3 className="mt-6 font-display text-xl font-bold text-primary">{step.t}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.d}</p></motion.div>)}</div></div></section>

    <section className="bg-powder/45 py-20 sm:py-28"><div className="mx-auto max-w-5xl px-5 text-center lg:px-8"><SectionHeading eyebrow="Customer Care" title="The Experience We Aim For" center/><p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">Sample testimonials shown for layout preview. Replace with verified customer feedback before publishing.</p><motion.div key={testimonial} initial={{opacity:0,x:25}} animate={{opacity:1,x:0}} transition={{duration:.5}} className="mx-auto mt-10 max-w-3xl rounded-lg border border-border bg-background px-7 py-10 shadow-lg sm:px-14"><div className="flex justify-center gap-1 text-copper-emphasis">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-4 fill-current"/>)}</div><blockquote className="mt-6 font-display text-xl font-semibold leading-relaxed text-primary sm:text-2xl">“{testimonials[testimonial].quote}”</blockquote><p className="mt-6 text-sm font-bold text-copper-emphasis">— {testimonials[testimonial].name}</p></motion.div><div className="mt-6 flex justify-center gap-2">{testimonials.map((_,i)=><button key={i} aria-label={`Show testimonial ${i+1}`} onClick={()=>setTestimonial(i)} className={`h-1.5 rounded-full transition-all ${i===testimonial?"w-8 bg-copper":"w-2 bg-primary/20"}`}/>)}</div></div></section>

    <section className="py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8"><div><SectionHeading eyebrow="Service Area" title="P&E Plumbing — Wilkes-Barre, PA"/><a href="https://www.google.com/maps/search/?api=1&query=Wilkes-Barre%2C+PA+18705" target="_blank" rel="noreferrer" className="mt-7 flex items-start gap-3 text-foreground hover:text-copper-emphasis"><MapPin className="mt-1 size-5 shrink-0 text-copper-emphasis"/><span className="font-semibold">Wilkes-Barre, PA, United States, 18705</span></a><Button variant="nav" size="lg" className="mt-8" asChild><a href="https://www.google.com/maps/dir/?api=1&destination=Wilkes-Barre%2C+PA+18705" target="_blank" rel="noreferrer">Get Directions <ArrowRight/></a></Button></div><a aria-label="Open Wilkes-Barre in Google Maps" href="https://www.google.com/maps/search/?api=1&query=Wilkes-Barre%2C+PA+18705" target="_blank" rel="noreferrer" className="group relative min-h-[360px] overflow-hidden rounded-lg border border-border bg-primary"><div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-hero-foreground)_1px,transparent_1px),linear-gradient(90deg,var(--color-hero-foreground)_1px,transparent_1px)] [background-size:44px_44px] transition-transform duration-700 group-hover:scale-105"/><div className="absolute left-[20%] top-[20%] h-px w-[65%] rotate-12 bg-copper/70"/><div className="absolute left-[15%] top-[63%] h-px w-[70%] -rotate-6 bg-hero-foreground/40"/><div className="absolute inset-0 flex items-center justify-center"><span className="flex size-20 items-center justify-center rounded-full bg-copper text-copper-foreground shadow-copper-lg"><MapPin className="size-8"/></span></div><p className="absolute bottom-7 left-7 text-sm font-bold uppercase tracking-[0.18em] text-hero-foreground">Serving Wilkes-Barre & nearby communities</p></a></div></section>

    <section id="contact" className="scroll-mt-16 bg-ivory py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8"><div><SectionHeading eyebrow="Get in Touch" title="Let's Get Your Plumbing Sorted."/><p className="mt-6 max-w-md leading-7 text-muted-foreground">Have a plumbing issue or need a professional estimate? Get in touch with P&E Plumbing today.</p><div className="mt-9 space-y-6"><a href="mailto:peplumbingnepa@gmail.com" className="flex items-center gap-4 font-semibold text-primary hover:text-copper-emphasis"><span className="flex size-11 items-center justify-center rounded-full bg-copper/12 text-copper-emphasis"><Mail/></span><span><small className="block text-xs uppercase text-muted-foreground">Email</small>peplumbingnepa@gmail.com</span></a><a href="https://www.google.com/maps/search/?api=1&query=Wilkes-Barre%2C+PA+18705" target="_blank" rel="noreferrer" className="flex items-center gap-4 font-semibold text-primary hover:text-copper-emphasis"><span className="flex size-11 items-center justify-center rounded-full bg-copper/12 text-copper-emphasis"><MapPin/></span><span><small className="block text-xs uppercase text-muted-foreground">Location</small>Wilkes-Barre, PA 18705</span></a></div></div>
      <motion.form {...reveal} onSubmit={submitEstimate} className="rounded-lg border border-border bg-background p-6 shadow-xl sm:p-9"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">Full Name<Input required name="name" autoComplete="name" placeholder="Your name" className="mt-2 h-12 bg-background focus-visible:ring-copper"/></label><label className="text-sm font-semibold text-primary">Email<Input required name="email" type="email" autoComplete="email" placeholder="you@email.com" className="mt-2 h-12 bg-background focus-visible:ring-copper"/></label><label className="text-sm font-semibold text-primary">Phone Number<Input required name="phone" type="tel" autoComplete="tel" placeholder="(570) 000-0000" className="mt-2 h-12 bg-background focus-visible:ring-copper"/></label><label className="text-sm font-semibold text-primary">Service Needed<select required name="service" defaultValue="" className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-copper"><option value="" disabled>Select a service</option>{services.map(s=><option key={s.title}>{s.title}</option>)}</select></label></div><label className="mt-5 block text-sm font-semibold text-primary">Message<Textarea required name="message" placeholder="Tell us what’s happening..." className="mt-2 min-h-32 bg-background focus-visible:ring-copper"/></label><Button type="submit" variant="copper" size="lg" className="mt-6 w-full sm:w-auto">Request a Free Estimate <ArrowRight/></Button><p className="mt-4 text-xs text-muted-foreground">Submitting opens your email app with your request ready to send.</p></motion.form>
    </div></section>

    <footer className="bg-primary py-12 text-hero-foreground"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-10 border-b border-hero-foreground/15 pb-10 md:grid-cols-[1.2fr_0.8fr_1fr]"><div><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-copper font-display text-sm font-extrabold text-copper">P&E</span><span className="font-display text-xl font-bold">P&E Plumbing</span></div><p className="mt-4 max-w-sm text-sm text-hero-foreground/65">Clean work. Clear communication. Quality that lasts.</p></div><nav className="grid grid-cols-2 gap-3 text-sm">{navItems.map(([label,id])=><button key={id} onClick={()=>scrollTo(id)} className="text-left text-hero-foreground/70 hover:text-copper">{label}</button>)}</nav><div className="text-sm leading-7 text-hero-foreground/70"><p>Wilkes-Barre, PA, United States, 18705</p><a href="mailto:peplumbingnepa@gmail.com" className="hover:text-copper">peplumbingnepa@gmail.com</a></div></div><p className="pt-7 text-xs text-hero-foreground/50">© 2026 P&E Plumbing. All Rights Reserved.</p></div></footer>
  </main>;
}