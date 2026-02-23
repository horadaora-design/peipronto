import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Star, 
  Pencil, 
  Brain, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  CircleCheckBig, 
  CircleHelp, 
  Dna, 
  Lock, 
  PackageCheck, 
  Pin, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Type,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v5/xi498KPqTw2NpUI0Apzh";

const WHATSAPP_PROOFS = [
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-16-at-22.30.23.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/1.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-04-at-19.28.56.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-04-at-11.36.58-1.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-04-at-11.36.58.jpeg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/whatsapp-image-2026-01-04-at-11.36.58-2.jpeg"
];

const SAMPLE_IMAGES = [
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/amostra.png",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/1.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/2.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/3.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/4.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/5.jpg",
  "https://digitallfp.wordpress.com/wp-content/uploads/2026/01/6.jpg"
];

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const Section = ({ children, className = "", id = "", tight = false }: { children: React.ReactNode, className?: string, id?: string, tight?: boolean }) => (
  <motion.section 
    id={id} 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`${tight ? "py-12 md:py-20" : "py-16 md:py-32"} px-4 md:px-6 ${className}`}
  >
    <div className="max-w-4xl mx-auto">
      {children}
    </div>
  </motion.section>
);

const Button = ({ children, onClick, href, className = "" }: { children: React.ReactNode, onClick?: () => void, href?: string, className?: string }) => {
  const content = (
    <button 
      onClick={onClick}
      className={`w-full py-5 md:py-7 px-8 md:px-12 rounded-2xl font-black text-lg md:text-2xl transition-all active:scale-95 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 ${className}`}
    >
      {children}
    </button>
  );
  
  if (href) return <a href={href} className="block w-full">{content}</a>;
  return content;
};

const StickyNote = ({ children, color = "yellow", rotation = "rotate-1", value = "" }: { children: React.ReactNode, color?: 'yellow' | 'pink' | 'blue', rotation?: string, value?: string }) => {
  const colors = {
    yellow: "bg-yellow-100 border-yellow-200 text-yellow-900",
    pink: "bg-pink-100 border-pink-200 text-pink-900",
    blue: "bg-blue-100 border-blue-200 text-blue-900"
  };
  
  return (
    <div className={`p-6 md:p-8 border-b-4 shadow-md ${rotation} ${colors[color]} relative rounded-sm h-full flex flex-col`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-4 bg-white/50 blur-sm rounded-full" />
      {value && (
        <span className="absolute -top-3 -right-2 bg-red-600 text-white text-[10px] md:text-xs font-black px-2 py-1 rounded-lg rotate-6 shadow-md z-10">
          VALIA R$ {value}
        </span>
      )}
      {children}
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 border-slate-100 rounded-2xl overflow-hidden bg-white mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left font-bold text-slate-800 gap-4 transition-colors hover:bg-slate-50"
      >
        <span className="text-sm md:text-base leading-tight">{question}</span>
        <CircleHelp size={18} className={`shrink-0 transition-transform ${isOpen ? "rotate-180 text-blue-600" : "text-slate-300"}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-sm md:text-base text-slate-600 border-t-2 border-slate-50 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageCarousel = ({ images, aspectClass = "aspect-[3/4] md:aspect-[4/3]" }: { images: string[], aspectClass?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="relative group">
        <div className={`bg-white p-2 md:p-4 rounded-[2rem] shadow-2xl border-4 md:border-8 border-blue-500 overflow-hidden relative ${aspectClass} flex items-center justify-center`}>
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex + 1}`} 
            className="w-full h-full object-contain select-none transition-all duration-300"
          />
        </div>
        <button onClick={prev} className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white p-2 md:p-4 rounded-full shadow-xl hover:bg-blue-500 hover:text-white transition-all z-20">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white p-2 md:p-4 rounded-full shadow-xl hover:bg-blue-500 hover:text-white transition-all z-20">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="mt-8 flex justify-center flex-wrap gap-2">
        {images.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${currentIndex === idx ? "bg-blue-600 w-6 md:w-8" : "bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

const PhoneCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => setCurrentIndex((prev) => (prev + 1) % WHATSAPP_PROOFS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + WHATSAPP_PROOFS.length) % WHATSAPP_PROOFS.length);

  return (
    <div className="relative max-w-lg mx-auto px-4">
      <div className="relative">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 md:border-[12px] border-white overflow-hidden relative aspect-[9/18.5] flex items-center justify-center bg-slate-100">
          <img 
            src={WHATSAPP_PROOFS[currentIndex]} 
            alt={`WhatsApp Proof ${currentIndex + 1}`} 
            className="w-full h-full object-cover select-none transition-opacity duration-300"
          />
        </div>
        <button onClick={prev} className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-blue-500 hover:text-white transition-all z-20 text-slate-800">
          <ChevronLeft size={28} />
        </button>
        <button onClick={next} className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-blue-500 hover:text-white transition-all z-20 text-slate-800">
          <ChevronRight size={28} />
        </button>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {WHATSAPP_PROOFS.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${currentIndex === idx ? "bg-blue-600 w-8" : "bg-slate-300 w-2"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(3599);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToOffer = () => {
    const element = document.getElementById('oferta');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-grid text-[#1e293b]">
      {/* Countdown Bar */}
      <div className="bg-red-600 text-white py-2.5 px-4 text-center font-bold text-[10px] md:text-sm sticky top-0 z-[60] flex justify-center items-center gap-2 shadow-lg">
        <Zap size={14} className="animate-pulse" />
        PROMOÇÃO TERMINA EM:
        <span className="font-black text-yellow-300 ml-1">{formatTime(timeLeft)}</span>
      </div>

      {/* Header */}
      <header className="pt-6 md:pt-10 pb-12 md:pb-24 px-4 text-center bg-white border-b-8 border-brand-gold relative overflow-hidden">
        <div className="absolute top-10 left-10 opacity-10 pointer-events-none hidden md:block">
          <Star size={48} className="text-brand-gold rotate-12" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none hidden md:block">
          <Pencil size={48} className="text-brand-blue -rotate-12" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h1 className="text-[2.2rem] sm:text-[3.5rem] md:text-[5.5rem] font-black text-brand-blue leading-[1] md:leading-[1.1] tracking-tight mb-4 text-balance">
            Recupere seu tempo e tenha <span className="relative inline-block">segurança técnica:<span className="absolute left-0 bottom-2 md:bottom-4 w-full h-1.5 md:h-3 bg-brand-blue/10 -z-10 rounded-full" /></span>
            <br className="md:block" />
            Seus PEIs prontos em <span className="relative inline-block text-brand-orange">15 minutos.<span className="absolute left-0 bottom-2 md:bottom-4 w-full h-1.5 md:h-3 bg-brand-gold/40 -z-10 rounded-full" /></span>
          </h1>
          
          <p className="text-slate-600 font-bold text-sm md:text-base uppercase tracking-widest mb-8">Monte seus planos com quem entende a sua rotina na sala de aula</p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center mb-8 md:mb-14"
          >
            <div className="w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-15px_rgba(27,58,107,0.3)] border-4 md:border-8 border-slate-50 bg-black aspect-video flex items-center justify-center relative">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/o7XQBKbekok?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0" 
                title="MATERIAL PEIS" 
                frameBorder="0" 
                allow="autoplay; encrypted-media; picture-in-picture" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-brand-gold border-2 border-brand-dark rounded-2xl px-6 md:px-12 py-5 md:py-10 inline-block shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] mb-10 -rotate-1 hover:rotate-0 transition-transform duration-300 max-w-4xl"
          >
            <h2 className="text-base sm:text-xl md:text-3xl font-black text-brand-dark leading-tight text-balance">
              Receba +150 modelos de PEIs prontos, completos e editáveis para Educação Infantil, Fundamental e Ensino Médio. Você edita, adapta e entrega.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10"
          >
            {[
              { label: "Autismo (TEA)", color: "bg-[#7c3aed]", icon: <Brain size={16} /> },
              { label: "TDAH", color: "bg-[#f59e0b]", icon: <Zap size={16} /> },
              { label: "Dislexia", color: "bg-brand-blue", icon: <Type size={16} /> },
              { label: "Intelectual", color: "bg-[#f472b6]", icon: <Dna size={16} /> }
            ].map((tag, i) => (
              <div key={i} className={`${tag.color} text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-black text-[11px] md:text-sm flex items-center gap-2 shadow-md uppercase tracking-wide`}>
                {tag.icon} {tag.label}
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative inline-block w-full max-w-md"
          >
            <Button onClick={scrollToOffer} className="bg-brand-green text-white border-b-8 border-green-900 hover:bg-green-600">
              QUERO MEUS PEIS PRONTOS AGORA
            </Button>
            <div className="mt-5 flex flex-col items-center gap-1.5">
              <p className="text-brand-green font-black text-xl md:text-3xl">Apenas R$ 19,90</p>
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-brand-green" /> Compra Segura | Acesso Imediato
              </div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Pain Section */}
      <Section className="bg-brand-gray border-b border-slate-200" tight>
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-black text-brand-dark uppercase tracking-tight leading-none text-balance">
            Se você monta PEI do zero, está pagando com o seu tempo e sua saúde mental.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {[
            { text: "PEI não deveria levar horas", color: "border-brand-blue" },
            { text: "Você não precisa reinventar tudo", color: "border-brand-orange" },
            { text: "Seu tempo vale muito mais", color: "border-brand-green" }
          ].map((item, i) => (
            <div key={i} className={`bg-white border-2 ${item.color} p-8 md:p-12 rounded-[2.5rem] shadow-sm flex items-center gap-4 transition-transform hover:scale-105`}>
              <CircleCheckBig className="text-brand-green shrink-0" size={32} />
              <span className="text-lg md:text-xl font-black text-brand-dark leading-tight">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-16 md:mt-24 text-center max-w-3xl mx-auto space-y-8">
          <p className="text-xl md:text-3xl font-black text-brand-dark leading-tight">
            Por isso, eu reuni mais de 150 modelos de PEIs, PDIs e PAEE prontos para usar.
          </p>
          <p className="text-lg md:text-2xl font-bold text-slate-600 leading-relaxed">
            São modelos pensados de professora para professora, para você modelar, editar e entregar em poucos minutos, sem insegurança e sem retrabalho.
          </p>
          <div className="w-24 h-2 bg-brand-blue mx-auto rounded-full opacity-30" />
        </div>
      </Section>

      {/* What You Get Section */}
      <Section className="bg-white">
        <div className="text-center mb-16 md:mb-24">
          <Badge className="bg-brand-blue text-white mb-6 !text-xs md:!text-lg py-3 px-8 shadow-lg">
            O que você recebe ao adquirir o kit
          </Badge>
          <h2 className="text-3xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter leading-[1] mb-8">
            Tudo o que você precisa para montar PEIs sem sofrimento em 2026
          </h2>
          <p className="text-xl md:text-2xl font-bold text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Não é só um modelo. É um kit completo para você nunca mais travar na hora de montar PEI, PDI ou PAEE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
          {[
            {
              num: "1️⃣",
              title: "+150 MODELOS DE PEIs PRONTOS (EDITÁVEIS)",
              list: ["Modelos completos", "Estrutura já validada", "Linguagem técnica aceita por coordenação", "Prontos para adaptar em poucos minutos"],
              footer: "Você só ajusta para a realidade do aluno e entrega."
            },
            {
              num: "2️⃣",
              title: "MODELOS DE PEI POR NECESSIDADE EDUCACIONAL",
              list: ["Autismo (TEA)", "TDAH", "Dislexia", "Deficiência Intelectual", "Educação Infantil", "Ensino Fundamental"],
              footer: "Nada genérico. Modelos pensados para a sala de aula real."
            },
            {
              num: "3️⃣",
              title: "MODELOS DE PDI (PLANO DE DESENVOLVIMENTO INDIVIDUAL)",
              list: ["Estrutura pronta", "Campos organizados", "Fácil de preencher", "Alinhado ao PEI"],
              footer: "Ideal para relatórios e acompanhamento individual."
            },
            {
              num: "4️⃣",
              title: "MODELO DE PAEE (ATENDIMENTO EDUCACIONAL ESPECIALIZADO)",
              list: ["Estrutura completa", "Objetivos claros", "Estratégias organizadas", "Pronto para editar"],
              footer: "Você não precisa mais procurar modelo na internet."
            }
          ].map((item, i) => (
            <div key={i} className="bg-brand-gray border-2 border-slate-100 p-8 md:p-12 rounded-[2.5rem] hover:border-brand-blue transition-all group shadow-sm hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-black text-brand-dark uppercase leading-tight mb-6">
                {item.num} {item.title}
              </h3>
              <ul className="space-y-4 mb-8">
                {item.list.map((li, j) => (
                  <li key={j} className="flex items-start gap-3 font-bold text-slate-600">
                    <Check className="text-brand-green shrink-0 mt-1" size={20} /> {li}
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Pin className="text-brand-blue shrink-0 rotate-12" size={22} />
                <p className="text-sm md:text-base font-black text-brand-dark">{item.footer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={scrollToOffer} className="bg-brand-green text-white border-b-8 border-green-900 hover:bg-green-600 max-w-2xl mx-auto shadow-2xl">
            👉 Quero meu kit completo agora
          </Button>
        </div>
      </Section>

      {/* Sample Section */}
      <Section className="bg-brand-gray border-y border-slate-200">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-5xl font-black text-brand-dark uppercase px-4">Amostra do Material</h2>
          <p className="text-sm md:text-xl text-slate-600 mt-4 font-medium px-4">
            Confira a qualidade técnica do conteúdo: <span className="text-brand-blue font-black italic">Material em Word e 100% editável.</span>
          </p>
        </div>
        <ImageCarousel images={SAMPLE_IMAGES} />
      </Section>

      {/* Bonus Section */}
      <Section className="bg-white relative overflow-hidden">
        <div className="text-center mb-16">
          <h3 className="text-[1.75rem] sm:text-[2.5rem] md:text-[3.5rem] font-extrabold text-[#1e293b] mb-4 uppercase leading-[1.1] tracking-tighter text-balance">
            ALÉM DOS PEIS PRONTOS, VOCÊ RECEBE FERRAMENTAS PARA NÃO ERRAR
          </h3>
          <p className="text-lg md:text-[1.75rem] font-medium text-slate-500 mb-16 px-4 leading-relaxed">
            Tudo pensado para você montar, revisar e entregar com segurança.
          </p>
          
          <div className="space-y-4">
            <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[6.5rem] font-black text-[#1e293b] uppercase leading-none tracking-tighter">
              PRESENTES EXCLUSIVOS
            </h2>
            <p className="text-base md:text-[1.5rem] font-extrabold text-[#1e293b] px-4 uppercase tracking-[0.15em]">
              VÁLIDOS APENAS PARA AS COMPRAS DE HOJE!
            </p>
          </div>
        </div>

        <div className="mb-20 flex justify-center">
          <img 
            src="https://digitallfp.wordpress.com/wp-content/uploads/2026/02/bonusne-1.png" 
            alt="Mockup Bônus" 
            className="w-full max-w-4xl h-auto transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              num: "01",
              title: "Banco de Objetivos Prontos",
              desc: "Nunca mais trave na hora de escrever objetivos. Centenas de objetivos técnicos prontos para copiar.",
              tags: ["TEA", "TDAH", "DI", "Dislexia"],
              value: "97,00",
              color: "blue"
            },
            {
              num: "02",
              title: "Frases Prontas (Copia e Cola)",
              desc: "Justificativas, avaliações e acompanhamentos prontos. É só escolher a que melhor se adapta ao seu aluno.",
              tags: ["Justificativas", "Avaliações"],
              value: "67,00",
              color: "pink"
            },
            {
              num: "03",
              title: "Checklist de PEI Aprovado",
              desc: "O guia de revisão para garantir que seu PEI não seja devolvido pela coordenação ou secretaria.",
              tags: ["Revisão", "Segurança"],
              value: "47,00",
              color: "yellow"
            },
            {
              num: "04",
              title: "+100 Atividades para Autismo",
              desc: "Material pronto para aplicar no AEE e sala regular, focado em desenvolvimento cognitivo e motor.",
              tags: ["Prático", "AEE"],
              value: "57,00",
              color: "blue"
            },
            {
              num: "05",
              title: "+240 Relatórios Descritivos",
              desc: "Modelos de relatórios para diversas situações. Economize dias de trabalho na escrita.",
              tags: ["Relatórios", "Agilidade"],
              value: "77,00",
              color: "pink"
            },
            {
              num: "06",
              title: "Guia Prático do PEI",
              desc: "Do zero ao avançado. O passo a passo definitivo para você dominar a técnica de elaboração.",
              tags: ["Curso", "Domínio"],
              value: "147,00",
              color: "yellow",
              highlight: true
            }
          ].map((bonus, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-3xl border-2 transition-all shadow-sm flex flex-col h-full bg-white ${bonus.highlight ? 'border-brand-blue ring-4 ring-brand-blue/5' : 'border-slate-100 hover:border-brand-blue'}`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl font-black text-slate-100 absolute top-4 right-6 select-none">{bonus.num}</span>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  bonus.color === 'blue' ? 'bg-brand-blue/10 text-brand-blue' : 
                  bonus.color === 'pink' ? 'bg-pink-100 text-pink-600' : 
                  'bg-brand-gold/10 text-brand-gold'
                }`}>
                  {bonus.num === "01" && <Brain size={24} />}
                  {bonus.num === "02" && <Type size={24} />}
                  {bonus.num === "03" && <ShieldCheck size={24} />}
                  {bonus.num === "04" && <Sparkles size={24} />}
                  {bonus.num === "05" && <Pencil size={24} />}
                  {bonus.num === "06" && <Star size={24} />}
                </div>
              </div>

              <h4 className="text-xl font-black text-brand-dark mb-3 leading-tight">{bonus.title}</h4>
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-6 flex-1">{bonus.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {bonus.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-black uppercase tracking-wider bg-slate-50 text-slate-400 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Individual</span>
                <span className="text-red-500 font-black text-sm line-through">R$ {bonus.value}</span>
              </div>
              
              {bonus.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[10px] font-black px-4 py-1 rounded-full shadow-lg uppercase tracking-widest whitespace-nowrap">
                  Novo Bônus Exclusivo
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Social Proof Section */}
      <Section className="bg-brand-gray border-t border-slate-200">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-black text-brand-dark uppercase px-4 leading-tight">ENTREGA DO MATERIAL VIA WHATSAPP:</h2>
          <p className="text-sm md:text-xl text-slate-600 mt-4 font-bold px-4 italic">
            Resultados reais de quem já adquiriu e aprovou!
          </p>
        </div>
        <PhoneCarousel />
      </Section>

      {/* Offer Section */}
      <Section id="oferta" className="bg-blue-50 pt-16 md:pt-24 pb-32 md:pb-48">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Tablet/Phone Top Detail */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-24 md:w-40 h-10 md:h-16 bg-slate-200 border-x-4 border-t-4 border-slate-300 rounded-t-3xl z-20 flex items-center justify-center">
              <div className="w-12 md:w-20 h-2 md:h-3 bg-slate-400 rounded-full" />
            </div>
            
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_100px_rgba(27,58,107,0.1)] border-4 border-brand-dark overflow-hidden relative z-10">
              <div className="bg-brand-blue py-10 md:py-16 px-8 text-center text-white">
                <Badge className="bg-white/20 text-white mb-6 border border-white/30 py-2 px-6">Oportunidade Única</Badge>
                <h3 className="text-3xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight">OFERTA DE LANÇAMENTO</h3>
              </div>
              
              <div className="p-8 md:p-16">
                <div className="mb-12 md:mb-16 space-y-6">
                  <h4 className="text-brand-dark font-black text-xl md:text-3xl uppercase tracking-tight flex items-center gap-3 mb-8">
                    <Sparkles className="text-brand-gold" fill="currentColor" /> O que você vai receber:
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { text: "+150 PEIs, PDIs, PAEE e Estudo de Caso Editáveis", bold: true },
                      { text: "Totalmente editáveis no Word e Canva", bold: false },
                      { text: "Alinhados à BNCC com foco em educação regular e especial", bold: false },
                      { text: "BÔNUS 1: Banco de Objetivos Prontos", bold: true },
                      { text: "BÔNUS 2: Frases Prontas (Copia e Cola)", bold: true },
                      { text: "BÔNUS 3: Checklist de PEI Aprovado", bold: true },
                      { text: "BÔNUS 4: +100 Atividades para autismo", bold: true },
                      { text: "BÔNUS 5: +240 Relatórios Descritivos Prontos", bold: true },
                      { text: "BÔNUS 6: Guia Prático do PEI (Zero ao Avançado)", bold: true },
                      { text: "Acesso Vitalício e atualizações mensais", bold: true }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-brand-gray rounded-2xl border border-slate-100 group hover:border-brand-blue/30 transition-colors">
                        <CircleCheckBig className="text-brand-green shrink-0 mt-0.5" size={24} />
                        <span className={`text-base md:text-lg text-slate-700 leading-tight ${item.bold ? "font-black" : "font-bold"}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center bg-brand-green/5 rounded-[2.5rem] p-8 md:p-14 border-4 border-brand-green mb-12">
                  <p className="text-xl md:text-4xl text-slate-400 line-through font-bold mb-2">De R$ 79,90</p>
                  <div className="flex flex-col md:flex-row justify-center items-center md:items-baseline gap-2 md:gap-5 mb-6">
                    <span className="text-2xl md:text-5xl font-black text-brand-dark uppercase italic">Por</span>
                    <span className="text-7xl md:text-[10rem] font-black text-brand-green tracking-tighter leading-none">R$ 19,90</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm text-brand-blue font-black py-3 md:py-4 px-8 md:px-12 rounded-full inline-block text-xs md:text-xl border-2 border-brand-blue/10 uppercase tracking-widest">
                    PAGAMENTO ÚNICO NO PIX E NO CARTÃO
                  </div>
                </div>

                <Button href={CHECKOUT_URL} className="bg-brand-green text-white border-b-8 border-green-950 hover:bg-green-600 text-xl md:text-4xl py-8 md:py-12 shadow-2xl">
                  QUERO MEU KIT AGORA <ArrowRight className="inline-block ml-2 w-8 h-8 md:w-12 md:h-12" />
                </Button>

                <div className="mt-12 pt-12 border-t border-slate-100 grid grid-cols-3 gap-4 md:gap-8 text-[9px] md:text-sm font-black text-slate-400 uppercase tracking-widest text-center">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck size={24} className="text-brand-blue" /> COMPRA 100% SEGURA
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Zap size={24} className="text-brand-gold" /> ACESSO IMEDIATO
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <PackageCheck size={24} className="text-brand-green" /> VITALÍCIO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Guarantee Section */}
      <Section className="bg-white">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="relative shrink-0">
            <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center">
              <ShieldAlert size={160} className="text-brand-green w-full h-full stroke-[1.5]" />
              <div className="absolute bottom-6 -right-4 bg-brand-gold text-brand-dark font-black px-5 py-2 rounded-xl rotate-[-12deg] shadow-xl border-2 border-white text-sm md:text-xl whitespace-nowrap">
                7 DIAS
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-2xl md:text-5xl font-black text-brand-dark leading-[1.1] uppercase tracking-tighter">
              SUA SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA
            </h2>
            <p className="text-lg md:text-2xl font-medium text-slate-600 leading-relaxed">
              Fique tranquila! Você tem <strong>7 dias de garantia incondicional</strong>. Se por qualquer motivo você achar que o material não é para você, basta nos enviar um e-mail e devolvemos 100% do seu investimento. Sem perguntas e sem letras miúdas.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-6 py-3 border-2 border-slate-100 rounded-full text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest">
                <Lock size={16} /> SSL CRYPTOGRAPHY
              </div>
              <div className="flex items-center gap-3 px-6 py-3 border-2 border-slate-100 rounded-full text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={16} /> SAFE ENVIRONMENT
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white border-t border-slate-100">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-2xl md:text-5xl font-black text-brand-dark leading-tight max-w-4xl mx-auto">
            Dúvidas que professores costumam ter antes de comprar
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <FAQItem 
            question="O material é personalizado ou genérico?" 
            answer="O material é composto por modelos técnicos e validados, mas 100% editáveis. Você recebe a estrutura pronta e profissional, e apenas adapta os detalhes específicos para a realidade do seu aluno. É o equilíbrio perfeito entre agilidade e personalização."
          />
          <FAQItem 
            question="Funciona para qualquer tipo de deficiência?" 
            answer="Sim! O kit inclui modelos específicos para TEA (Autismo), TDAH, Deficiência Intelectual, Dislexia e Deficiência Física, além de modelos gerais que podem ser adaptados para qualquer necessidade educacional especial."
          />
          <FAQItem 
            question="Está de acordo com a legislação atual (BNCC, LBI)?" 
            answer="Sim. Todos os modelos foram desenvolvidos respeitando as diretrizes da BNCC (Base Nacional Comum Curricular) e da LBI (Lei Brasileira de Inclusão), garantindo que você entregue um documento com total respaldo legal e técnico."
          />
          <FAQItem 
            question="Preciso ter conhecimento técnico para usar?" 
            answer="Não. O material foi feito justamente para facilitar a vida de quem tem dúvidas na hora de escrever. Os modelos são intuitivos e fáceis de editar no Word ou Canva, mesmo que você não tenha muita familiaridade com tecnologia."
          />
          <FAQItem 
            question="Como recebo o material?" 
            answer="O acesso é imediato! Assim que o seu pagamento for aprovado, você receberá automaticamente um e-mail com o link para acessar e baixar todo o material do kit."
          />
          <FAQItem 
            question="E se eu não gostar?" 
            answer="Você tem 7 dias de garantia incondicional. Se por qualquer motivo você achar que o material não é o que você esperava, basta nos enviar um e-mail e devolvemos 100% do seu dinheiro, sem burocracia."
          />
          <FAQItem 
            question="Posso usar para mais de um aluno?" 
            answer="Com certeza! Uma vez que você adquire o kit, os modelos são seus para usar com quantos alunos precisar, durante toda a sua carreira docente."
          />
          <FAQItem 
            question="Tenho acesso para sempre?" 
            answer="Sim! O acesso ao Super Kit PEI 2026 é vitalício. Você paga uma única vez e terá o material disponível para sempre, inclusive com direito a todas as atualizações futuras que fizermos no kit."
          />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-brand-gray border-t border-slate-200" tight>
        <div className="max-w-2xl mx-auto text-center">
          <Button onClick={scrollToOffer} className="bg-brand-green text-white border-b-8 border-green-950 hover:bg-green-600">
            QUERO MEU ACESSO AGORA <ArrowRight className="ml-2" />
          </Button>
          <p className="mt-6 text-xs font-black text-slate-400 uppercase tracking-widest">Aproveite o preço de lançamento por tempo limitado</p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-24 px-6 text-center border-t-8 border-brand-orange">
        <div className="max-w-3xl mx-auto space-y-10">
          <Pencil size={48} className="mx-auto text-brand-gold" />
          <p className="text-xl md:text-3xl font-medium text-slate-300 leading-relaxed italic px-4">
            "Este material foi criado para <span className="text-white font-black">facilitar sua rotina</span>, te dar segurança técnica e <span className="text-white font-black">devolver o seu tempo livre</span>. Você merece trabalhar com tranquilidade."
          </p>
          <div className="pt-16 border-t border-white/10 text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-slate-500">
            © 2026 SUPER KIT PEI PREMIUM • AEE E EDUCAÇÃO ESPECIAL
          </div>
        </div>
      </footer>
    </div>
  );
}
