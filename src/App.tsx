import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Users, Castle, Shield, PartyPopper, Scroll, Quote } from 'lucide-react';

export default function App() {
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <div className="flex justify-center min-h-screen bg-black/90 p-4 font-serif text-[#e5cc98]">
      {/* Sidebar Container */}
      <motion.div
        whileHover={{ scale: 1.02, rotate: [0, 1, -1, 0], boxShadow: "inset 0 0 40px #000, 0 0 30px rgba(255,215,0,0.4)" }}
        transition={{ type: "tween", bounce: 0.5 }}
        className="relative w-[300px] bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] border-l-2 border-r-2 border-[#b8860b] shadow-[inset_0_0_20px_#000] overflow-hidden rounded-md pb-6"
      >
        
        {/* Gate Sequence */}
        <AnimatePresence>
          {!gateOpen && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#141414]"
            >
              <motion.div
                initial={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#2a221b] to-[#3e3228] border-r-2 border-black shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] z-[-1]"
              />
              <motion.div
                initial={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2a221b] to-[#3e3228] border-l-2 border-black shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] z-[-1]"
              />

              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, type: "tween" }}
                className="text-5xl drop-shadow-[0_0_10px_#ffcf54] mb-4"
              >
                👑
              </motion.div>
              <h1 className="text-2xl font-bold text-center text-[#ffcf54] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                PEOPLE OF<br />THE KINGDOM
              </h1>
              <p className="text-[#c7a76c] text-sm mt-2 italic">Enter the Kingdom</p>
              
              <motion.button
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], textShadow: "0px 0px 12px rgb(255,215,0)" }}
                whileTap={{ scale: 0.8, rotate: 10 }}
                onClick={() => setGateOpen(true)}
                className="mt-8 px-6 py-2 bg-gradient-to-b from-[#b8860b] to-[#8b6508] border-2 border-[#ffd700] text-white font-bold text-sm rounded shadow-[0_4px_10px_rgba(0,0,0,0.6)] hover:from-[#daa520] hover:to-[#b8860b] hover:shadow-[0_0_15px_#ffd700] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Castle size={18} /> OPEN THE GATES
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar Content */}
        <div className="p-4 flex flex-col gap-5 relative z-10">
          
          {/* Header */}
          <div className="text-center border-b-2 border-[#5a4629] pb-4">
            <h1 className="text-xl text-[#ffd700] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] m-0 leading-tight flex items-center justify-center gap-2">
              <Crown className="text-[#ffd700]" size={24} />
              PEOPLE OF<br />THE KINGDOM
            </h1>
            <p className="text-[#a89472] text-xs italic mt-1 mb-3">Strength • Unity • Loyalty</p>
            <div className="flex flex-col gap-2">
              <motion.div whileHover={{ scale: 1.1, rotate: 3, y: -2 }} transition={{ type: "tween", bounce: 0.7 }} className="bg-black/50 border border-[#8b6508] p-1.5 text-xs rounded text-[#e5cc98] flex items-center justify-center gap-2 cursor-default">
                <Users size={14} /> Kingdom Members
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -3, y: -2 }} transition={{ type: "tween", bounce: 0.7 }} className="bg-black/50 border border-[#8b6508] p-1.5 text-xs rounded text-[#e5cc98] flex items-center justify-center gap-2 cursor-default">
                <Castle size={14} /> Active Kingdom
              </motion.div>
            </div>
          </div>

          {/* New Members (Codex Style) */}
          <Section title="👥 NEW MEMBERS">
            <div className="bg-black/40 border border-[#4a3c2b] p-3 rounded text-center">
              <div className="text-xs text-[#a89472] mb-2 italic">Welcome our newest allies</div>
              <div className="w-full bg-black border border-[#5a4629] h-[100px] flex items-center justify-center text-[10px] text-gray-500 rounded relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                <iframe className="w-full h-full border-none relative z-0 opacity-50 group-hover:opacity-100 transition-opacity" src="about:blank" title="New Members Placeholder" />
                <span className="absolute z-20 text-[#ffd700] drop-shadow-md font-bold tracking-wider pointer-events-none">[LOREM_IPSUM]</span>
              </div>
              <motion.button whileHover={{ scale: 1.1, rotate: 2, backgroundColor: "#4a3c2b" }} whileTap={{ scale: 0.8, rotate: -5 }} className="mt-3 w-full bg-gradient-to-b from-[#3a2e24] to-[#201812] border border-[#8b6508] hover:border-[#ffd700] text-[#ffd700] text-xs py-1.5 rounded transition-colors flex justify-center items-center gap-2 cursor-pointer">
                Join the Ranks
              </motion.button>
            </div>
          </Section>

          {/* Titled Members */}
          <Section title="♟ TITLED MEMBERS">
            <div className="flex flex-col gap-2">
              <TitledMember badge="GM" name="Grandmaster_Name" color="bg-[#b22222]" />
              <TitledMember badge="IM" name="IntlMaster_Name" color="bg-[#8b4513]" />
              <TitledMember badge="FM" name="FideMaster_Name" color="bg-[#d2691e]" />
              <TitledMember badge="CM" name="CandMaster_Name" color="bg-[#cd853f]" />
            </div>
          </Section>

          {/* Kingdom Anthem */}
          <Section title="🎵 KINGDOM ANTHEM">
            <div className="w-full bg-black border border-[#5a4629] h-[80px] flex items-center justify-center text-[10px] text-gray-500 rounded relative overflow-hidden group">
               <iframe className="w-full h-full border-none opacity-40 group-hover:opacity-100 transition-opacity relative z-0" src="about:blank" title="Anthem Placeholder" />
               <span className="absolute z-10 text-[#c7a76c] drop-shadow-md italic pointer-events-none">[Music Player Iframe]</span>
            </div>
          </Section>

          {/* King's Court */}
          <Section title="🏛 KING'S COURT">
            <div className="flex flex-col gap-3">
              <CourtMember role="Kingdom Founder" name="IKS-13308" />
              <CourtMember role="Royal Advisor" name="Codex_s1" />
              <CourtMember role="Kingdom Administrator" name="AakashIyer" />
            </div>
          </Section>

          {/* Birthdays (Codex Style) */}
          <Section title="🎂 ROYAL BIRTHDAYS">
             <div className="bg-gradient-to-b from-[#2a241f] to-[#1f1b18] border border-[#5a4629] p-4 rounded-md shadow-inner text-center relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <PartyPopper size={64} />
               </div>
               <div className="text-3xl mb-2 drop-shadow-[0_0_8px_#ffd700]">🎁</div>
               <h3 className="text-[#ffd700] text-sm font-bold mb-1 tracking-wider drop-shadow-sm">Celebrate With Us</h3>
               <p className="text-xs text-[#a89472] mb-4 relative z-10">Register your day of birth to be honored by the Kingdom.</p>
               <motion.button whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }} whileTap={{ scale: 0.8 }} transition={{ type: "tween", bounce: 0.6 }} className="relative z-10 w-full bg-gradient-to-b from-[#b8860b] to-[#8b6508] border border-[#ffd700] text-white text-xs font-bold py-2 rounded shadow-md hover:from-[#daa520] hover:to-[#b8860b] hover:shadow-[0_0_15px_rgba(255,215,0,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer">
                 <PartyPopper size={14} /> REGISTER BIRTHDAY
               </motion.button>
             </div>
          </Section>

          {/* Milestones */}
          <Section title="🏆 MILESTONES">
            <div className="flex flex-col text-xs">
              <Milestone text="50 Members" achieved={true} />
              <Milestone text="100 Members" achieved={true} />
              <Milestone text="150 Members" achieved={true} />
              <Milestone text="200 Members" achieved={false} />
              <Milestone text="250 Members" achieved={false} />
              <Milestone text="300 Members" achieved={false} />
              <Milestone text="400 Members" achieved={false} />
              <Milestone text="500 Members" achieved={false} />
            </div>
          </Section>

          {/* Partnerships */}
          <Section title="🤝 PARTNERSHIPS">
            <div className="flex flex-col gap-2">
              <motion.div whileHover={{ scale: 1.1, rotate: -3, borderColor: "#ffd700" }} transition={{ type: "tween", bounce: 0.7 }} className="bg-black/40 border border-[#4a3c2b] p-2 text-center text-xs rounded hover:border-[#8b6508] transition-colors cursor-pointer text-[#d1bfae] hover:text-[#ffd700]">Alliance Hall</motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 3, borderColor: "#ffd700" }} transition={{ type: "tween", bounce: 0.7 }} className="bg-black/40 border border-[#4a3c2b] p-2 text-center text-xs rounded hover:border-[#8b6508] transition-colors cursor-pointer text-[#d1bfae] hover:text-[#ffd700]">Partner Kingdom Alpha</motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -3, borderColor: "#ffd700" }} transition={{ type: "tween", bounce: 0.7 }} className="bg-black/40 border border-[#4a3c2b] p-2 text-center text-xs rounded hover:border-[#8b6508] transition-colors cursor-pointer text-[#d1bfae] hover:text-[#ffd700]">Partner Kingdom Beta</motion.div>
            </div>
          </Section>

          {/* Quick Links */}
          <Section title="⚡ QUICK LINKS">
            <motion.a whileHover={{ scale: 1.1, rotate: 3, y: -5 }} transition={{ type: "tween", bounce: 0.6 }} href="#" className="block text-center bg-gradient-to-b from-[#3a2e24] to-[#201812] border border-[#8b6508] text-[#ffd700] text-xs py-2 px-3 rounded hover:bg-gradient-to-b hover:from-[#4a3c2b] hover:to-[#2a2018] hover:shadow-[0_0_12px_rgba(184,134,11,0.8)] transition-all mb-2 flex items-center justify-center gap-2">
              <Castle size={14} /> Invitation Link
            </motion.a>
            <motion.a whileHover={{ scale: 1.1, rotate: -3, y: -5 }} transition={{ type: "tween", bounce: 0.6 }} href="#" className="block text-center bg-gradient-to-b from-[#3a2e24] to-[#201812] border border-[#8b6508] text-[#ffd700] text-xs py-2 px-3 rounded hover:bg-gradient-to-b hover:from-[#4a3c2b] hover:to-[#2a2018] hover:shadow-[0_0_12px_rgba(184,134,11,0.8)] transition-all flex items-center justify-center gap-2">
              <Scroll size={14} /> Advertising Forum
            </motion.a>
          </Section>

          {/* Kingdom Rules */}
          <Section title="📜 KINGDOM RULES">
            <motion.div whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0], y: -5 }} transition={{ type: "tween", bounce: 0.6 }} className="bg-[#dfc9a5] text-[#3b2a1a] p-3 rounded-sm text-xs shadow-[inset_0_0_15px_rgba(139,69,19,0.4)] border border-[#8b4513] relative font-serif cursor-default">
              <h4 className="text-center font-bold border-b border-[#8b4513] pb-1 mb-2 tracking-wide text-[13px]">The Royal Decree</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Respect all members.</li>
                <li>No cheating or engine use.</li>
                <li>Participate in kingdom battles.</li>
                <li>Honor the King's Court.</li>
              </ul>
            </motion.div>
          </Section>

          {/* Inspiration */}
          <Section title="🕯 INSPIRATION">
            <motion.div whileHover={{ scale: 1.1, rotate: 2 }} transition={{ type: "tween", bounce: 0.7 }} className="italic text-xs text-center text-[#d1bfae] py-3 border-y border-[#4a3c2b] relative cursor-default">
               <Quote className="absolute -top-2 left-2 text-[#4a3c2b]/30" size={24} />
              "Even the darkest night will end and the sun will rise upon the Kingdom."
            </motion.div>
          </Section>

          {/* Footer */}
          <div className="text-center text-[10px] text-[#6a5e4d] mt-4 pt-4 border-t border-[#3a2e24]">
            Designed & Developed by<br />
            <span className="text-[#b8860b] font-bold text-xs mt-1 inline-block">👑 Codex_s1</span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// Subcomponents

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -8, rotate: [0, 1, -1, 0], scale: 1.03, boxShadow: "0 12px 20px rgba(0,0,0,0.8), inset 0 0 15px rgba(184,134,11,0.4)" }}
      transition={{ type: "tween", bounce: 0.6 }}
      className="bg-gradient-to-br from-[#1f1b18] to-[#2a241f] border border-[#4a3c2b] rounded-md p-3 shadow-[0_4px_6px_rgba(0,0,0,0.4)] relative"
    >
      <div className="absolute inset-0 rounded-md shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] pointer-events-none" />
      <h2 className="text-[#e5cc98] text-xs text-center border-b border-[#5a4629] pb-1.5 mb-3 tracking-wider font-bold relative z-10">
        {title}
      </h2>
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

function TitledMember({ badge, name, color }: { badge: string, name: string, color: string }) {
  return (
    <motion.div
      whileHover={{ x: 10, scale: 1.1, rotate: 2, backgroundColor: "rgba(40,30,20,0.9)" }}
      transition={{ type: "tween", stiffness: 400 }}
      className="flex items-center gap-2 p-1.5 bg-black/30 rounded border-l-2 border-transparent hover:bg-[#281e14]/80 hover:border-[#ffd700] transition-all cursor-pointer group"
    >
      <span className={`${color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm`}>
        {badge}
      </span>
      <span className="text-xs text-[#d1bfae] group-hover:text-[#ffd700] transition-colors">{name}</span>
    </motion.div>
  );
}

function CourtMember({ role, name }: { role: string, name: string }) {
  return (
    <motion.div whileHover={{ x: 10, scale: 1.1, rotate: -2 }} transition={{ type: "tween", stiffness: 400 }} className="cursor-pointer">
      <div className="text-[10px] text-[#b8860b] uppercase font-bold mb-0.5">{role}</div>
      <div className="text-xs text-[#e5cc98] flex items-center gap-1">
        <Shield size={12} className="text-[#8b6508]" /> {name}
      </div>
    </motion.div>
  );
}

function Milestone({ text, achieved }: { text: string, achieved: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, x: achieved ? 10 : -10, rotate: achieved ? 2 : -2 }}
      transition={{ type: "tween", stiffness: 400 }}
      className={`flex justify-between py-1 border-b border-dashed border-[#4a3c2b] last:border-b-0 ${achieved ? 'text-[#ffd700]' : 'text-[#6a5e4d]'}`}
    >
      <span>{text}</span>
      {achieved && <span>✓</span>}
    </motion.div>
  );
}
