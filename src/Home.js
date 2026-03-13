import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   ALL STYLES
───────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&family=Fredoka+One&display=swap');

:root{
  --coral:#FF6B6B;
  --orange:#FF8C42;
  --yellow:#FFD93D;
  --pink:#FF6BB5;
  --pink-light:#FFB3D9;
  --purple:#C77DFF;
  --sky:#48CAE4;
  --mint:#52D9A0;
  --peach:#FFDAB9;
  --cream:#FFFBF5;
  --white:#FFFFFF;
}

*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Nunito',sans-serif;background:var(--cream);overflow-x:hidden;}

@keyframes drift{
  0%  {transform:translateY(110vh) rotate(0deg) scale(1);}
  50% {transform:translateY(50vh)  rotate(180deg) scale(1.1);}
  100%{transform:translateY(-140px) rotate(360deg) scale(1);}
}
@keyframes float{
  0%,100%{transform:translateY(0px) rotate(-2deg);}
  50%    {transform:translateY(-18px) rotate(2deg);}
}
@keyframes floatSlow{
  0%,100%{transform:translateY(0px);}
  50%    {transform:translateY(-10px);}
}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes spinReverse{to{transform:rotate(-360deg);}}
@keyframes twinkle{
  0%,100%{opacity:0.2;transform:scale(0.8);}
  50%    {opacity:0.9;transform:scale(1.4);}
}
@keyframes slideDown{
  from{opacity:0;transform:translateY(-20px);}
  to  {opacity:1;transform:translateY(0);}
}
@keyframes fadeUp{
  from{opacity:0;transform:translateY(36px);}
  to  {opacity:1;transform:translateY(0);}
}
@keyframes popIn{
  0%  {opacity:0;transform:scale(0.5) rotate(-10deg);}
  70% {transform:scale(1.1) rotate(3deg);}
  100%{opacity:1;transform:scale(1) rotate(0deg);}
}
@keyframes shimmer{
  0%  {background-position:0% 50%;}
  50% {background-position:100% 50%;}
  100%{background-position:0% 50%;}
}
@keyframes bounce{
  0%,100%{transform:translateY(0);}
  40%    {transform:translateY(-8px);}
  60%    {transform:translateY(-4px);}
}
@keyframes ringPulse{
  0%  {transform:scale(1);opacity:0.6;}
  50% {transform:scale(1.12);opacity:0.3;}
  100%{transform:scale(1);opacity:0.6;}
}
@keyframes textGlow{
  0%,100%{text-shadow:0 0 20px rgba(255,107,107,0.3);}
  50%    {text-shadow:0 0 40px rgba(255,107,107,0.7),0 0 80px rgba(255,140,66,0.4);}
}

/* ── BACKGROUND SHAPES ── */
.bg-shapes{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
.shape{position:absolute;border-radius:50%;animation:drift linear infinite;}
.sh1{width:70px;height:70px;background:radial-gradient(circle,#FF6BB5,#FF6B6B);opacity:0.22;left:5%;animation-duration:13s;}
.sh2{width:50px;height:50px;background:radial-gradient(circle,#FFD93D,#FF8C42);opacity:0.28;left:18%;animation-duration:17s;animation-delay:2s;}
.sh3{width:90px;height:90px;background:radial-gradient(circle,#48CAE4,#C77DFF);opacity:0.18;left:42%;animation-duration:11s;animation-delay:0.5s;}
.sh4{width:55px;height:55px;background:radial-gradient(circle,#52D9A0,#48CAE4);opacity:0.25;left:67%;animation-duration:15s;animation-delay:4s;}
.sh5{width:40px;height:40px;background:radial-gradient(circle,#C77DFF,#FF6BB5);opacity:0.3;left:85%;animation-duration:19s;animation-delay:1.5s;}
.sh6{width:65px;height:65px;background:radial-gradient(circle,#FFDAB9,#FFD93D);opacity:0.2;left:32%;animation-duration:14s;animation-delay:6s;}
.sh7{width:45px;height:45px;background:radial-gradient(circle,#FF6B6B,#C77DFF);opacity:0.22;left:58%;animation-duration:16s;animation-delay:3s;}
.sh8{width:30px;height:30px;background:radial-gradient(circle,#FFD93D,#52D9A0);opacity:0.3;left:78%;animation-duration:12s;animation-delay:8s;}

.star{position:absolute;animation:twinkle ease-in-out infinite;font-size:20px;}

/* ── NAVBAR ── */
nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  padding:0 32px;height:64px;
  display:flex;align-items:center;justify-content:space-between;
  background:linear-gradient(90deg,#FF6B6B,#FF8C42,#FFD93D,#FF6BB5);
  background-size:300% 300%;
  animation:shimmer 6s ease infinite, slideDown 0.6s ease;
  box-shadow:0 4px 24px rgba(255,107,107,0.4);
}
.nav-logo{
  font-family:'Fredoka One',cursive;font-size:26px;color:white;
  text-shadow:0 2px 8px rgba(0,0,0,0.2);
  animation:bounce 2.5s ease-in-out infinite;
}
.nav-logo span{font-size:22px;margin-left:4px;}
.nav-links{display:flex;gap:6px;}
.nav-links a{
  text-decoration:none;font-size:13px;font-weight:800;
  color:rgba(255,255,255,0.9);letter-spacing:0.4px;text-transform:uppercase;
  padding:8px 14px;border-radius:20px;
  transition:background 0.25s,color 0.25s,transform 0.2s;
}
.nav-links a:hover{background:rgba(255,255,255,0.3);color:white;transform:scale(1.08);}

/* ── HERO ── */
.hero{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  position:relative;z-index:1;padding:100px 24px 80px;
  background:linear-gradient(135deg,#FFE5EC 0%,#FFF3CD 30%,#E8F8FF 60%,#F3E8FF 100%);
  overflow:hidden;
}
.hero-blob{position:absolute;border-radius:50%;pointer-events:none;}
.hb1{width:380px;height:380px;background:radial-gradient(circle,rgba(255,107,107,0.18),transparent 70%);top:-100px;left:-100px;animation:floatSlow 8s ease-in-out infinite;}
.hb2{width:460px;height:460px;background:radial-gradient(circle,rgba(255,140,66,0.14),transparent 70%);bottom:-140px;right:-120px;animation:floatSlow 10s ease-in-out infinite reverse;}
.hb3{width:300px;height:300px;background:radial-gradient(circle,rgba(199,125,255,0.14),transparent 70%);top:40%;left:40%;animation:floatSlow 12s ease-in-out infinite 3s;}

.hero-inner{
  display:flex;align-items:center;gap:64px;max-width:1000px;width:100%;
  flex-wrap:wrap;justify-content:center;position:relative;z-index:2;
}

/* ── PHOTO ── */
.hero-photo-wrap{position:relative;flex-shrink:0;}
.ring1{position:absolute;inset:-22px;border-radius:50%;border:3px dashed #FF6BB5;opacity:0.5;animation:spin 18s linear infinite;}
.ring2{position:absolute;inset:-38px;border-radius:50%;border:2px dotted #FFD93D;opacity:0.4;animation:spinReverse 24s linear infinite;}
.ring3{position:absolute;inset:-54px;border-radius:50%;border:1.5px dashed rgba(72,202,228,0.5);animation:spin 32s linear infinite;}
.pulse-ring{position:absolute;inset:-8px;border-radius:50%;border:4px solid rgba(255,107,107,0.3);animation:ringPulse 2s ease-in-out infinite;}

.profile-photo{
  width:230px;height:230px;border-radius:50%;object-fit:cover;
  border:6px solid white;
  box-shadow:0 20px 60px rgba(255,107,107,0.35),0 0 0 8px rgba(255,107,107,0.08);
  animation:float 5s ease-in-out infinite;
}
.photo-fallback{
  width:230px;height:230px;border-radius:50%;
  background:linear-gradient(135deg,#FF6B6B,#FF8C42,#FFD93D);
  background-size:200% 200%;
  animation:shimmer 4s ease infinite, float 5s ease-in-out infinite;
  display:flex;align-items:center;justify-content:center;font-size:76px;
  border:6px solid white;
  box-shadow:0 20px 60px rgba(255,107,107,0.35),0 0 0 8px rgba(255,107,107,0.08);
}
.badge-avail{
  position:absolute;bottom:14px;right:-18px;
  background:linear-gradient(135deg,#52D9A0,#48CAE4);
  color:white;font-size:11px;font-weight:800;padding:7px 16px;border-radius:20px;
  box-shadow:0 4px 16px rgba(82,217,160,0.4);white-space:nowrap;border:2px solid white;
  animation:bounce 2s ease-in-out infinite;
}
.badge-avail2{
  position:absolute;top:14px;left:-22px;
  background:linear-gradient(135deg,#C77DFF,#FF6BB5);
  color:white;font-size:11px;font-weight:800;padding:7px 14px;border-radius:20px;
  box-shadow:0 4px 16px rgba(199,125,255,0.4);white-space:nowrap;border:2px solid white;
  animation:bounce 2.5s ease-in-out infinite 0.4s;
}

/* ── HERO TEXT ── */
.hero-text{max-width:500px;}
.hero-hi{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,#FF6B6B,#FF8C42);color:white;
  font-size:14px;font-weight:800;padding:7px 20px;border-radius:30px;margin-bottom:18px;
  box-shadow:0 6px 20px rgba(255,107,107,0.35);
  animation:popIn 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
}
.hero-name{
  font-family:'Fredoka One',cursive;font-size:58px;line-height:1.05;
  background:linear-gradient(135deg,#FF6B6B,#FF8C42,#FF6BB5);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  background-size:200% 200%;
  animation:shimmer 5s ease infinite, fadeUp 0.8s 0.3s ease both, textGlow 3s ease-in-out infinite;
  margin-bottom:6px;
}
.hero-role{
  font-size:18px;font-weight:700;
  background:linear-gradient(90deg,#C77DFF,#48CAE4);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:6px;animation:fadeUp 0.8s 0.45s ease both;
}
.hero-location{font-size:14px;color:#999;margin-bottom:24px;font-weight:600;animation:fadeUp 0.8s 0.55s ease both;}
.hero-quote{
  background:white;border-left:5px solid;
  border-image:linear-gradient(180deg,#FF6B6B,#FF6BB5) 1;
  padding:16px 20px;border-radius:0 16px 16px 0;
  font-size:15px;color:#555;font-style:italic;margin-bottom:30px;
  box-shadow:0 6px 24px rgba(255,107,107,0.1);
  animation:fadeUp 0.8s 0.65s ease both;line-height:1.7;
}
.hero-contacts{display:flex;flex-direction:column;gap:12px;animation:fadeUp 0.8s 0.8s ease both;}
.contact-chip{
  display:inline-flex;align-items:center;gap:12px;
  padding:12px 22px;border-radius:30px;font-size:14px;font-weight:700;
  text-decoration:none;border:none;cursor:pointer;
  transition:transform 0.25s,box-shadow 0.25s;
}
.chip-phone{background:linear-gradient(135deg,#FF6B6B,#FF8C42);color:white;box-shadow:0 6px 20px rgba(255,107,107,0.35);}
.chip-email{background:linear-gradient(135deg,#C77DFF,#FF6BB5);color:white;box-shadow:0 6px 20px rgba(199,125,255,0.35);}
.contact-chip:hover{transform:translateY(-4px) scale(1.03);box-shadow:0 12px 32px rgba(255,107,107,0.4);}
.chip-icon{font-size:20px;}

/* ── WAVE ── */
.wave-wrap{height:70px;overflow:hidden;position:relative;z-index:2;margin-top:-2px;}
.wave-wrap svg{display:block;}

/* ── SECTIONS ── */
.page-sec{position:relative;z-index:1;padding:80px 24px;}
.sec-inner{max-width:980px;margin:0 auto;}
.sec-badge{
  display:inline-flex;align-items:center;gap:8px;
  font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;
  padding:7px 18px;border-radius:30px;margin-bottom:16px;
  color:white;box-shadow:0 4px 16px rgba(0,0,0,0.15);
}
.sec-title{font-family:'Fredoka One',cursive;font-size:40px;color:#2C2C2C;margin-bottom:10px;line-height:1.2;}
.sec-sub{font-size:16px;color:#888;max-width:560px;line-height:1.8;margin-bottom:44px;}

/* ── ABOUT ── */
.about-section{background:linear-gradient(160deg,#FFF0F5 0%,#FFFDE7 50%,#F0F9FF 100%);}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
.about-card{
  border-radius:24px;padding:32px 28px;opacity:0;transform:translateY(32px);
  transition:opacity 0.65s ease,transform 0.65s ease,box-shadow 0.3s;
  position:relative;overflow:hidden;
}
.about-card.visible{opacity:1;transform:translateY(0);}
.about-card:hover{transform:translateY(-8px) scale(1.01) !important;box-shadow:0 24px 60px rgba(0,0,0,0.12);}
.ac1{background:linear-gradient(135deg,#FFE5EC,#FFC8DD);border:2px solid #FF6BB5;box-shadow:0 8px 32px rgba(255,107,181,0.15);}
.ac2{background:linear-gradient(135deg,#FFF3CD,#FFE066);border:2px solid #FFD93D;box-shadow:0 8px 32px rgba(255,217,61,0.2);}
.ac3{background:linear-gradient(135deg,#E0FBFC,#C8F5FA);border:2px solid #48CAE4;box-shadow:0 8px 32px rgba(72,202,228,0.15);}
.ac4{background:linear-gradient(135deg,#EDE7F6,#D9B8FF);border:2px solid #C77DFF;box-shadow:0 8px 32px rgba(199,125,255,0.15);}
.about-card .card-icon-wrap{
  width:60px;height:60px;border-radius:18px;display:flex;align-items:center;
  justify-content:center;font-size:30px;margin-bottom:16px;
  background:rgba(255,255,255,0.7);box-shadow:0 4px 14px rgba(0,0,0,0.08);
}
.about-card h3{font-family:'Fredoka One',cursive;font-size:22px;color:#2C2C2C;margin-bottom:10px;}
.about-card p{font-size:14px;color:#555;line-height:1.75;}

/* ── QUOTE BANNER ── */
.quote-banner{
  background:linear-gradient(135deg,#FF6B6B,#FF8C42,#FFD93D);
  background-size:200% 200%;animation:shimmer 6s ease infinite;
  padding:70px 24px;text-align:center;position:relative;overflow:hidden;z-index:1;
}
.qb-bubbles{position:absolute;inset:0;pointer-events:none;}
.qb-bubble{position:absolute;border-radius:50%;background:rgba(255,255,255,0.12);animation:floatSlow ease-in-out infinite;}
.qb-text{font-family:'Fredoka One',cursive;font-size:34px;color:white;max-width:740px;margin:0 auto 16px;line-height:1.4;text-shadow:0 3px 16px rgba(0,0,0,0.15);}
.qb-sub{font-size:17px;color:rgba(255,255,255,0.9);max-width:520px;margin:0 auto;font-weight:600;}

/* ── EXP ── */
.exp-section{background:linear-gradient(160deg,#F8F0FF 0%,#FFF5F5 50%,#F0FFFE 100%);}
.exp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.exp-card{
  border-radius:24px;padding:32px 24px;text-align:center;
  opacity:0;transform:translateY(32px);
  transition:opacity 0.65s ease,transform 0.65s ease;position:relative;overflow:hidden;
}
.exp-card.visible{opacity:1;transform:translateY(0);}
.exp-card:hover{transform:translateY(-10px) !important;}
.ec1{background:linear-gradient(160deg,#FFE5EC,#FFC8DD);border:2px solid #FF6BB5;box-shadow:0 8px 32px rgba(255,107,181,0.18);}
.ec2{background:linear-gradient(160deg,#FFF3CD,#FFE599);border:2px solid #FFD93D;box-shadow:0 8px 32px rgba(255,217,61,0.2);}
.ec3{background:linear-gradient(160deg,#E3F9F0,#B5EAD7);border:2px solid #52D9A0;box-shadow:0 8px 32px rgba(82,217,160,0.18);}
.exp-card .emo{font-size:50px;margin-bottom:14px;display:block;animation:bounce 2.5s ease-in-out infinite;}
.exp-card:nth-child(2) .emo{animation-delay:0.3s;}
.exp-card:nth-child(3) .emo{animation-delay:0.6s;}
.exp-card .age{
  font-family:'Fredoka One',cursive;font-size:26px;
  background:linear-gradient(135deg,#FF6B6B,#C77DFF);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:8px;
}
.exp-card h3{font-size:17px;font-weight:800;color:#2C2C2C;margin-bottom:10px;}
.exp-card p{font-size:13px;color:#666;line-height:1.7;}

/* ── GALLERY ── */
.gallery-section{background:linear-gradient(160deg,#E8F8FF 0%,#FFF0F5 50%,#FFFDE7 100%);}
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.gallery-item{
  border-radius:24px;overflow:hidden;aspect-ratio:1/1;cursor:pointer;
  box-shadow:0 8px 28px rgba(0,0,0,0.1);
  transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.35s,opacity 0.5s;
  opacity:0;
}
.gallery-item.visible{opacity:1;}
.gallery-item:hover{transform:scale(1.06) rotate(1.5deg);box-shadow:0 20px 50px rgba(0,0,0,0.18);}
/* real image fills the card */
.gallery-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s;}
.gallery-item:hover .gallery-img{transform:scale(1.08);}
/* fallback colored placeholder */
.gallery-placeholder{
  width:100%;height:100%;min-height:170px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:12px;font-size:14px;font-weight:800;color:white;
  text-shadow:0 2px 8px rgba(0,0,0,0.2);
}
.gp1{background:linear-gradient(135deg,#FF6BB5,#FF6B6B);}
.gp2{background:linear-gradient(135deg,#FFD93D,#FF8C42);}
.gp3{background:linear-gradient(135deg,#52D9A0,#48CAE4);}
.gp4{background:linear-gradient(135deg,#48CAE4,#C77DFF);}
.gp5{background:linear-gradient(135deg,#C77DFF,#FF6BB5);}
.gp6{background:linear-gradient(135deg,#FF8C42,#FFD93D);}
.g-icon{font-size:52px;animation:bounce 3s ease-in-out infinite;}
.gallery-item:nth-child(2) .g-icon{animation-delay:0.4s;}
.gallery-item:nth-child(3) .g-icon{animation-delay:0.8s;}
.gallery-item:nth-child(4) .g-icon{animation-delay:0.2s;}
.gallery-item:nth-child(5) .g-icon{animation-delay:0.6s;}
.gallery-item:nth-child(6) .g-icon{animation-delay:1s;}

/* ── STUDENT ── */
.student-section{background:linear-gradient(160deg,#F3E8FF 0%,#E8F8FF 60%,#FFF3CD 100%);}
.student-inner{display:flex;align-items:center;gap:64px;flex-wrap:wrap;}
.student-visual{
  flex-shrink:0;width:290px;height:290px;border-radius:36px;
  background:linear-gradient(135deg,#667eea,#C77DFF,#FF6BB5);background-size:200% 200%;
  animation:shimmer 5s ease infinite, floatSlow 5s ease-in-out infinite;
  display:flex;align-items:center;justify-content:center;font-size:96px;
  box-shadow:0 24px 70px rgba(199,125,255,0.35);border:4px solid white;
}
.student-content{flex:1;min-width:280px;}
.student-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px;}
.stu-chip{font-size:12px;font-weight:800;padding:7px 16px;border-radius:20px;color:white;box-shadow:0 4px 14px rgba(0,0,0,0.12);}
.sc1{background:linear-gradient(135deg,#667eea,#C77DFF);}
.sc2{background:linear-gradient(135deg,#FF6B6B,#FF8C42);}
.sc3{background:linear-gradient(135deg,#52D9A0,#48CAE4);}
.sc4{background:linear-gradient(135deg,#FFD93D,#FF8C42);}
.sc5{background:linear-gradient(135deg,#FF6BB5,#C77DFF);}

/* ── QUOTE 2 ── */
.quote2{
  background:linear-gradient(135deg,#48CAE4,#52D9A0,#C77DFF);
  background-size:200% 200%;animation:shimmer 7s ease infinite;
  padding:70px 24px;text-align:center;z-index:1;position:relative;
}
.q2-text{font-family:'Fredoka One',cursive;font-size:30px;color:white;max-width:700px;margin:0 auto 14px;line-height:1.45;text-shadow:0 3px 16px rgba(0,0,0,0.15);}
.q2-sub{font-size:16px;color:rgba(255,255,255,0.92);max-width:480px;margin:0 auto;font-weight:600;}

/* ── FOOTER ── */
.page-footer{
  background:linear-gradient(135deg,#2C2C2C,#1a1a1a);
  padding:48px 24px;text-align:center;position:relative;z-index:1;overflow:hidden;
}
.page-footer::before{
  content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#FF6B6B,#FFD93D,#52D9A0,#C77DFF,#FF6BB5);
}
.footer-name{
  font-family:'Fredoka One',cursive;font-size:28px;
  background:linear-gradient(135deg,#FF6BB5,#FFD93D);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:10px;
}
.footer-links{display:flex;justify-content:center;gap:24px;margin-bottom:16px;flex-wrap:wrap;}
.footer-links a{color:#bbb;text-decoration:none;font-size:13px;font-weight:700;transition:color 0.3s;}
.footer-links a:hover{color:#FF6BB5;}
.footer-copy{font-size:12px;color:#555;}

.reveal{opacity:0;transform:translateY(30px);transition:opacity 0.65s ease,transform 0.65s ease;}
.reveal.visible{opacity:1;transform:translateY(0);}

@media(max-width:700px){
  .hero-inner{flex-direction:column;text-align:center;}
  .hero-contacts{align-items:center;}
  .about-grid{grid-template-columns:1fr;}
  .exp-grid{grid-template-columns:1fr 1fr;}
  .gallery-grid{grid-template-columns:1fr 1fr;}
  .student-inner{flex-direction:column;text-align:center;}
  .student-visual{margin:0 auto;}
  .hero-name{font-size:42px;}
  .qb-text,.q2-text{font-size:22px;}
  .sec-title{font-size:30px;}
  nav{padding:0 16px;}
  .nav-links a{padding:6px 10px;font-size:11px;}
}
`;

/* ─── DATI IN ITALIANO ─── */

const aboutCards = [
  {
    cls: "ac1", icon: "🤍",
    title: "Responsabile & Affidabile",
    text: "Prendo molto sul serio la sicurezza e il benessere dei bambini. I genitori possono fidarsi completamente di me — sono puntuale, seria e sempre disponibile.",
  },
  {
    cls: "ac2", icon: "🌸",
    title: "Paziente & Dolce",
    text: "Ho una pazienza naturale con i bambini. So adattarmi a ogni bambino, rispettare i suoi ritmi e creare un ambiente caldo e rassicurante.",
  },
  {
    cls: "ac3", icon: "🎨",
    title: "Creativa & Giocosa",
    text: "Giochi educativi, disegno, lavoretti, attività creative… so rendere ogni momento divertente e arricchente per stimolare la fantasia dei bambini.",
  },
  {
    cls: "ac4", icon: "📖",
    title: "Aiuto con i compiti",
    text: "Grazie ai miei studi in informatica e sviluppo, aiuto anche i bambini con i compiti con pazienza e un metodo pedagogico adatto.",
  },
];

const expCards = [
  {
    cls: "ec1", emo: "🍼", age: "0 – 3 anni",
    title: "Neonati",
    text: "Cura, biberon, giochi sensoriali, ninne nanne, passeggiate. Dolcezza e massima attenzione per i più piccoli.",
  },
  {
    cls: "ec2", emo: "🧸", age: "3 – 7 anni",
    title: "Bambini piccoli",
    text: "Giochi di ruolo, disegno, favole, attività motorie. L'età magica della curiosità e dell'immaginazione.",
  },
  {
    cls: "ec3", emo: "🎒", age: "7 – 12 anni",
    title: "Bambini in età scolare",
    text: "Aiuto compiti, giochi da tavolo, attività digitali educative, sport e uscite culturali.",
  },
];

/*
  GALLERIA — percorsi immagini nella cartella /assets/
  Rinomina i tuoi file come indicato oppure cambia i nomi src qui sotto.
  Se un'immagine non viene trovata, viene mostrata la card colorata di fallback.
*/
const galleryItems = [
  { src: "/assets/gallery1.jpg", cls: "gp1", icon: "🎨", label: "Disegno & Pittura" },
  { src: "/assets/gallery2.jpg", cls: "gp2", icon: "🧩", label: "Puzzle & Giochi" },
  { src: "/assets/gallery3.jpg", cls: "gp3", icon: "📚", label: "Lettura & Favole" },
  { src: "/assets/gallery4.jpg", cls: "gp4", icon: "🌿", label: "Attività all'Aperto" },
  { src: "/assets/gallery5.jpg", cls: "gp5", icon: "🍪", label: "Cucina per Bambini" },
  { src: "/assets/gallery6.jpg", cls: "gp6", icon: "🎭", label: "Giochi di Ruolo" },
];

const studentChips = [
  { cls: "sc1", label: "💻 Sviluppo Web" },
  { cls: "sc2", label: "🔥 Appassionata" },
  { cls: "sc3", label: "🌱 In crescita" },
  { cls: "sc4", label: "⚡ Motivata" },
  { cls: "sc5", label: "🎓 Studentessa" },
];

/* ─── WAVE DIVIDER ─── */
function Wave({ fill, bg }) {
  return (
    <div className="wave-wrap" style={{ background: bg }}>
      <svg viewBox="0 0 1200 70" preserveAspectRatio="none" style={{ width: "100%", height: "70px" }}>
        <path d="M0,35 C200,70 400,0 600,35 C800,70 1000,0 1200,35 L1200,70 L0,70 Z" fill={fill} />
      </svg>
    </div>
  );
}

/* ─── GALLERY CARD — mostra immagine o fallback colorato ─── */
function GalleryCard({ src, cls, icon, label }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="gallery-item">
      {imgOk ? (
        <img
          className="gallery-img"
          src={src}
          alt={label}
          onError={() => setImgOk(false)}
        />
      ) : (
        <div className={`gallery-placeholder ${cls}`}>
          <div className="g-icon">{icon}</div>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            e.target
              .querySelectorAll(".about-card, .exp-card, .gallery-item")
              .forEach((c, i) => setTimeout(() => c.classList.add("visible"), i * 120));
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".reveal, .about-grid, .exp-grid, .gallery-grid")
      .forEach((el) => obs.observe(el));

    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* ── SFONDO ANIMATO ── */}
      <div className="bg-shapes">
        {["sh1","sh2","sh3","sh4","sh5","sh6","sh7","sh8"].map((c) => (
          <div key={c} className={`shape ${c}`} />
        ))}
        {[
          { top:"8%",  left:"12%", delay:"0s",   dur:"2.5s" },
          { top:"20%", left:"75%", delay:"0.8s",  dur:"2.9s" },
          { top:"55%", left:"6%",  delay:"1.6s",  dur:"3.3s" },
          { top:"70%", left:"88%", delay:"0.4s",  dur:"2.7s" },
          { top:"40%", left:"48%", delay:"1.2s",  dur:"3.1s" },
          { top:"88%", left:"35%", delay:"2s",    dur:"3.5s" },
        ].map((s, i) => (
          <div
            key={i} className="star"
            style={{ top:s.top, left:s.left, animationDelay:s.delay, animationDuration:s.dur }}
          >
            {["⭐","🌟","✨","💫","🌸","🎀"][i]}
          </div>
        ))}
      </div>

      {/* ── NAVBAR (in italiano) ── */}
      <nav style={navScrolled ? { boxShadow:"0 6px 30px rgba(255,107,107,0.5)" } : {}}>
        <div className="nav-logo">Ahlem <span>🌸</span></div>
        <div className="nav-links">
          <a href="#about">Chi sono</a>
          <a href="#experience">Esperienza</a>
          <a href="#gallery">Galleria</a>
          <a href="#contact">Contatti</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="hero" id="contact">
        <div className="hero-blob hb1" />
        <div className="hero-blob hb2" />
        <div className="hero-blob hb3" />
        <div className="hero-inner">

          {/* Foto profilo — metti il tuo file in /assets/photo.jpg */}
          <div className="hero-photo-wrap">
            <div className="ring3" /><div className="ring2" /><div className="ring1" />
            <div className="pulse-ring" />
            <ProfilePhoto />
            <div className="badge-avail">✅ Disponibile</div>
            <div className="badge-avail2">🎓 Studentessa</div>
          </div>

          {/* Testo hero */}
          <div className="hero-text">
            <div className="hero-hi">👋 Ciao, sono</div>
            <h1 className="hero-name">Ahlem Briki</h1>
            <p className="hero-role">Babysitter Appassionata</p>
            <p className="hero-location">📍 Milano, Italia</p>
            <div className="hero-quote">
              "Sono la babysitter perfetta per il vostro bambino — pazienza, sicurezza e tanto amore! 🌸"
            </div>
            <div className="hero-contacts">
              <a className="contact-chip chip-phone" href="tel:+21693416030">
                <span className="chip-icon">📞</span> +216 93 416 030
              </a>
              <a className="contact-chip chip-email" href="mailto:ahlembriki4@gmail.com">
                <span className="chip-icon">✉️</span> ahlembriki4@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <Wave fill="#FFF0F5" bg="linear-gradient(160deg,#FFE5EC,#FFF3CD)" />

      {/* ── CHI SONO ── */}
      <section className="page-sec about-section" id="about">
        <div className="sec-inner">
          <div className="reveal">
            <div className="sec-badge" style={{ background:"linear-gradient(135deg,#FF6BB5,#FF6B6B)" }}>
              💜 Chi sono
            </div>
            <h2 className="sec-title">Chi sono io?</h2>
            <p className="sec-sub">
              Una giovane donna responsabile, dolce e appassionata del benessere dei bambini.
              Ogni bambino merita le migliori cure, ed è quello che offro.
            </p>
          </div>
          <div className="about-grid">
            {aboutCards.map((c) => (
              <div className={`about-card ${c.cls}`} key={c.title}>
                <div className="card-icon-wrap">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER 1 ── */}
      <div className="quote-banner">
        <div className="qb-bubbles">
          {[
            {w:80,  t:"10%", l:"5%",  dur:"7s"},
            {w:120, t:"30%", l:"80%", dur:"9s"},
            {w:60,  t:"70%", l:"20%", dur:"6s"},
            {w:100, t:"60%", l:"60%", dur:"11s"},
          ].map((b, i) => (
            <div key={i} className="qb-bubble" style={{width:b.w, height:b.w, top:b.t, left:b.l, animationDuration:b.dur}} />
          ))}
        </div>
        <p className="qb-text">
          "Mi prendo cura dei vostri bambini con pazienza, sicurezza e tanto affetto." 💛
        </p>
        <p className="qb-sub">
          Ogni bambino è unico — mi adatto alla sua personalità, ai suoi bisogni e al suo ritmo.
        </p>
      </div>

      {/* ── ESPERIENZA ── */}
      <section className="page-sec exp-section" id="experience">
        <div className="sec-inner">
          <div className="reveal">
            <div className="sec-badge" style={{ background:"linear-gradient(135deg,#FFD93D,#FF8C42)" }}>
              🌟 Esperienza
            </div>
            <h2 className="sec-title">Mi occupo di tutte le età</h2>
            <p className="sec-sub">
              Dai neonati ai bambini più grandi, adatto le mie attività e la mia attenzione a ogni fascia d'età.
            </p>
          </div>
          <div className="exp-grid">
            {expCards.map((c) => (
              <div className={`exp-card ${c.cls}`} key={c.age}>
                <span className="emo">{c.emo}</span>
                <div className="age">{c.age}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERIA ── */}
      <section className="page-sec gallery-section" id="gallery">
        <div className="sec-inner">
          <div className="reveal">
            <div className="sec-badge" style={{ background:"linear-gradient(135deg,#48CAE4,#52D9A0)" }}>
              📸 Galleria
            </div>
            <h2 className="sec-title">Attività con i bambini</h2>
            <p className="sec-sub">
              Momenti di gioia, apprendimento e creatività condivisi insieme.
            </p>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((g) => (
              <GalleryCard key={g.label} {...g} />
            ))}
          </div>
          <p style={{ textAlign:"center", marginTop:"20px", fontSize:"13px", color:"#aaa", fontWeight:600 }}>
            📁 Inserisci le tue foto nella cartella <code style={{background:"#f5f0ff",padding:"2px 8px",borderRadius:"6px",color:"#764ba2"}}>/assets/</code> con i nomi: gallery1.jpg … gallery6.jpg
          </p>
        </div>
      </section>

      {/* ── STUDENTESSA ── */}
      <section className="page-sec student-section">
        <div className="sec-inner">
          <div className="student-inner">
            <div className="student-visual">💻</div>
            <div className="student-content">
              <div className="reveal">
                <div className="sec-badge" style={{ background:"linear-gradient(135deg,#C77DFF,#667eea)" }}>
                  🎓 Studentessa
                </div>
                <h2 className="sec-title">Studentessa di Informatica</h2>
                <p style={{ fontSize:"15px", color:"#555", lineHeight:1.85, marginBottom:"16px" }}>
                  Sto attualmente frequentando un corso di studi in <strong>sviluppo informatico</strong>.
                  Sono appassionata di tecnologia e apprendimento continuo.
                </p>
                <p style={{ fontSize:"15px", color:"#555", lineHeight:1.85, marginBottom:"16px" }}>
                  Desidero lavorare come babysitter per <strong>finanziare i miei studi</strong> e acquisire
                  una preziosa esperienza umana. Lavorare con i bambini mi porta gioia e soddisfazione.
                </p>
                <p style={{ fontSize:"15px", color:"#555", lineHeight:1.85 }}>
                  Sono una persona <strong>seria, ambiziosa e organizzata</strong> — le stesse qualità che
                  porto nella mia vita professionale di babysitter.
                </p>
                <div className="student-chips">
                  {studentChips.map((ch) => (
                    <span className={`stu-chip ${ch.cls}`} key={ch.label}>{ch.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE 2 ── */}
      <div className="quote2">
        <p className="q2-text">
          "Il vostro bambino merita cure attente — me ne prendo cura con tutto il cuore." 🌿
        </p>
        <p className="q2-sub">
          Disponibile nei giorni feriali e nel weekend · Orari flessibili · Milano e dintorni
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer className="page-footer">
        <div className="footer-name">Ahlem Briki ✨</div>
        <div className="footer-links">
          <a href="tel:+21693416030">📞 +216 93 416 030</a>
          <a href="mailto:ahlembriki4@gmail.com">✉️ ahlembriki4@gmail.com</a>
        </div>
        <p className="footer-copy">© 2025 Ahlem Briki · Babysitter & Studentessa di Informatica · Milano, Italia</p>
      </footer>
    </>
  );
}

/* ─── FOTO PROFILO con fallback emoji ─── */
function ProfilePhoto() {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      className="profile-photo"
      src="/photo.jpg"
      alt="Ahlem Briki"
      onError={() => setOk(false)}
    />
  ) : (
    <div className="photo-fallback">👩‍💻</div>
  );
}