import React, { useState } from 'react';
import './index.css';

const KITS_DATA = {
  bronce: {
    name: 'Bronce VIP',
    price: '4.99',
    originalPrice: '9.99',
    benefits: [
       { title: 'Multiplicador Monedas', value: 'x1.5', icon: '📈' },
       { title: 'Saltar Cola (Queue)', value: 'No Disponible', icon: '👤' },
       { title: 'Cooldown del Kit', value: '24h', icon: '⏱️' }
    ],
    items: [
      { shortname: 'pistol.semiauto', amount: 1 },
      { shortname: 'crossbow', amount: 1 },
      { shortname: 'ammo.pistol', amount: 128 },
      { shortname: 'arrow.wooden', amount: 60 },
      { shortname: 'grenade.f1', amount: 3 },
      { shortname: 'attire.hide.vest', amount: 1 },
      { shortname: 'wood', amount: 10000 },
      { shortname: 'stones', amount: 7500 },
      { shortname: 'metal.fragments', amount: 2500 },
      { shortname: 'syringe.medical', amount: 8 }
    ]
  },
  plata: {
    name: 'Plata VIP',
    price: '12.49',
    originalPrice: '24.99',
    benefits: [
       { title: 'Multiplicador Monedas', value: 'x2.0', icon: '📈' },
       { title: 'Saltar Cola (Queue)', value: 'Activado', icon: '👥' },
       { title: 'Cooldown del Kit', value: '24h', icon: '⏱️' }
    ],
    items: [
      { shortname: 'smg.thompson', amount: 1 },
      { shortname: 'shotgun.double', amount: 1 },
      { shortname: 'pistol.semiauto', amount: 1 },
      { shortname: 'ammo.rifle', amount: 256 },
      { shortname: 'ammo.pistol', amount: 256 },
      { shortname: 'explosive.satchel', amount: 2 },
      { shortname: 'metal.facemask', amount: 1 },
      { shortname: 'metal.plate.torso', amount: 1 },
      { shortname: 'wood', amount: 20000 },
      { shortname: 'stones', amount: 15000 },
      { shortname: 'metal.fragments', amount: 5000 },
      { shortname: 'syringe.medical', amount: 12 }
    ]
  },
  oro: {
    name: 'Oro VIP',
    price: '24.99',
    originalPrice: '49.99',
    benefits: [
       { title: 'Multiplicador Monedas', value: 'x3.0', icon: '📈' },
       { title: 'Saltar Cola (VIP+)', value: 'Prioridad Élite', icon: '👥' },
       { title: 'Cooldown del Kit', value: '24h', icon: '⏱️' }
    ],
    items: [
      { shortname: 'rifle.semiauto', amount: 1 },
      { shortname: 'smg.thompson', amount: 1 },
      { shortname: 'rocket.launcher', amount: 1 },
      { shortname: 'ammo.rifle.hv', amount: 256 },
      { shortname: 'ammo.rocket.basic', amount: 4 },
      { shortname: 'explosive.timed', amount: 3 },
      { shortname: 'metal.facemask', amount: 1 },
      { shortname: 'metal.plate.torso', amount: 1 },
      { shortname: 'wood', amount: 30000 },
      { shortname: 'stones', amount: 25000 },
      { shortname: 'metal.refined', amount: 200 },
      { shortname: 'syringe.medical', amount: 20 }
    ]
  }
};

function KitModal({ kitId, onClose }) {
  if (!kitId || !KITS_DATA[kitId]) return null;
  const kit = KITS_DATA[kitId];

  return (
    <div className="kit-modal-overlay" onClick={onClose}>
      <div className="kit-modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}>✕</button>
        
        <div className="kit-modal-header">
          <div className="kit-title-area">
            <img src={`/${kitId}.png`} alt={kit.name} className="modal-icon" />
            <div>
              <h2>{kit.name}</h2>
              <p>🌐 Se puede utilizar en todos los servidores de Zero-G.</p>
            </div>
          </div>
        </div>

        <h3 className="modal-section-title">⭐ Beneficios adicionales</h3>
        <div className="benefits-grid">
          {kit.benefits.map((b, i) => (
            <div key={i} className="benefit-card glass-panel">
              <span className="benefit-icon">{b.icon}</span>
              <div className="benefit-info">
                <span className="b-title">{b.title}</span>
                <span className={b.value.includes('No ') ? 'b-value red' : 'b-value green'}>{b.value}</span>
                <div className="b-included">✓ Incluido</div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="modal-section-title">📦 Detalles del kit</h3>
        <div className="inventory-section glass-panel">
          <div className="inventory-header">
            <span>🔴 Recursos y Armamento</span>
            <span>⏱️ Enfriarse: 24h</span>
          </div>
          <div className="inventory-grid">
            {kit.items.map((item, i) => (
              <div key={i} className="inv-slot">
                <img src={`/items/${item.shortname}.png`} alt={item.shortname} />
                <span className="inv-amount">{item.amount > 1 ? item.amount.toLocaleString('es-ES') : ''}</span>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 24 - kit.items.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="inv-slot empty"></div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-price">
            <span className="price-label">Precio total</span>
            <span className="new-price">{kit.price}€ <small className="old-price-modal">{kit.originalPrice}€</small></span>
          </div>
          <a href="https://tebex.io" target="_blank" rel="noreferrer" className="btn-add-cart">añadir a la cesta</a>
        </div>
      </div>
    </div>
  );
}

function Home({ setView }) {
  const [copied, setCopied] = useState(false);
  const serverIP = 'connect 51.38.11.22:28015';

  const handleCopyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="view-container">
      <section className="hero">
        <img src="/bg.png" alt="Rust Background" className="hero-bg" />
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="status-badge glass-panel">
            <span className="pulse-dot"></span>
            <strong>SERVIDORES ONLINE</strong> <span className="separator">|</span> 100/100 Jugadores (EU)
          </div>
          
          <h2 className="hero-subtitle">TU NUEVO SERVIDOR FAVORITO</h2>
          <h1 className="hero-title" translate="no">ZERO-G RUST</h1>
          <p className="hero-desc">
            Únete al servidor Vanilla+ más avanzado de Europa. Cero lag, servidores en la nube dedicados, economía in-game compensada y una administración implacable contra tramposos.
          </p>
          
          <div className="btn-group">
            <button className="btn btn-primary" onClick={handleCopyIP}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              {copied ? 'IP COPIADA AL PORTAPAPELES' : 'COPIAR IP PARA JUGAR'}
            </button>
            <button onClick={() => setView('store')} className="btn btn-secondary">
              🛒 ACCEDER A LA TIENDA VIP
            </button>
          </div>
        </div>
      </section>

      <section className="wipe-schedule-section" style={{ position: 'relative' }}>
        <div className="wipe-grid">
          <div className="wipe-card glass-panel">
            <div className="wipe-icon">🌍</div>
            <div>
              <h3>WIPE DE MAPA (BISEMANAL)</h3>
              <p>Cada <strong>2 Semanas (Jueves a las 20:00 CEST)</strong>. Se borran las construcciones y el mapa se regenera (Semilla Aleatoria de 3500).</p>
            </div>
          </div>
          <div className="wipe-card glass-panel">
            <div className="wipe-icon">📘</div>
            <div>
              <h3>WIPE DE PLANOS (BPs)</h3>
              <p>Cada <strong>Primer Jueves de Mes</strong> (Forzado por Facepunch). El progreso de tus recetas se borra mensualmente.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">CARACTERÍSTICAS <span>DEL SERVER</span></h2>
          <p className="section-desc">Diseñado milímetramente para equilibrar la experiencia competitiva de clanes con la jugabilidad gratificante para jugadores en solitario.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon">🛡️</div>
            <h3>Máximo Quad (4)</h3>
            <p>Alianzas de máximo 4 jugadores. Prohibido cooperar visual o temporalmente con otros equipos. Monitorización por AdminRadar.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon">⚡</div>
            <h3>Recolección X5</h3>
            <p>Farms globales multiplicados por 5 (Madera, Piedra, Scrap, Componentes). Hornos y recicladoras cinco veces más rápidas.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon">💰</div>
            <h3>Economía In-Game</h3>
            <p>Gana 100 Monedas virtuales por cada hora jugada. Úsalas en nuestro menú visual /shop para comprar kits de construcción y utilidades.</p>
          </div>
        </div>
      </section>

      <section className="staff-section">
        <div className="staff-container glass-panel">
          <div className="staff-info">
            <h2>NUESTRO COMPROMISO DE ADMINISTRACIÓN</h2>
            <p>El equipo fundador ('Zero-G Team') tiene una regla de oro inquebrantable: <strong>Los administradores no juegan en nuestros propios servidores.</strong></p>
            <p>De esta forma eliminamos por completo los conflictos de intereses, el abuso de comandos o el temido Admin-Abuse. Nos dedicamos 24/7 a procesar denuncias vía Discord, cazar tramposos desde las sombras gracias a herramientas imperceptibles (AdminRadar/Vanish) y a mantener el ecosistema equilibrado.</p>
          </div>
          <div className="staff-stats">
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Soporte Activo</span>
            </div>
            <div className="stat">
              <span className="stat-number">0</span>
              <span className="stat-label">Tolerancia Cheats</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Store({ onOpenKit }) {
  return (
    <div className="view-container store-view">
      <img src="/bg.png" alt="Rust Background" className="hero-bg" style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', objectFit:'cover', zIndex:-1}} />
      <div className="hero-overlay" style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', zIndex:-1}}></div>

      <div className="section-header">
        <h2 className="section-title">RANGOS <span>VIP</span></h2>
        <p className="section-desc">Apoya la manutención de los servidores alquilando un rango vitalicio o mensual. Todas las compras son definitivas y ayudan a prevenir el Pay2Win.</p>
        <div style={{ background: 'var(--primary-red)', display: 'inline-block', padding: '0.4rem 2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '1.5rem', boxShadow: '0 0 15px var(--primary-glow)', animation: 'pulseBadge 2s infinite' }}>
          🔥 ¡OFERTA DE LANZAMIENTO: -50% DESCUENTO 1º WIPE! 🔥
        </div>
      </div>

      <div className="store-grid">
        <div className="store-card glass-panel bronce">
          <img src="/bronce.png" alt="Bronce VIP" className="product-icon" />
          <div className="store-price">
            <span style={{ textDecoration: 'line-through', fontSize: '1.5rem', color: '#888', marginRight: '1rem' }}>9.99€</span>
            4.99<span>EUR / mes</span>
          </div>
          <h3>Bronce VIP</h3>
          <ul className="store-features">
            <li className="highlight-kit">Kit Diario Básico</li>
            <li>Multiplicador x1.5 Monedas de Playtime</li>
            <li>Sorteo mensual exclusivo en Discord</li>
            <li>Tag [Bronce] en el chat del juego</li>
          </ul>
          <button onClick={() => onOpenKit('bronce')} className="btn btn-buy bronce">INSPECCIONAR KIT</button>
        </div>

        <div className="store-card glass-panel plata">
          <div className="store-badge" style={{ letterSpacing: '1px', fontSize: '0.75rem', padding: '0.4rem 3.5rem' }}>🏆 MÁS VENDIDO</div>
          <img src="/plata.png" alt="Plata VIP" className="product-icon" />
          <div className="store-price">
            <span style={{ textDecoration: 'line-through', fontSize: '1.5rem', color: '#888', marginRight: '1rem' }}>24.99€</span>
            12.49<span>EUR / mes</span>
          </div>
          <h3>Plata VIP</h3>
          <ul className="store-features">
            <li className="highlight-kit">Kit Diario Armado</li>
            <li>Multiplicador x2.0 Monedas de Playtime</li>
            <li>Saltar la Cola del servidor (SkipQueue)</li>
            <li>Tag [Plata] en el chat del juego</li>
          </ul>
          <button onClick={() => onOpenKit('plata')} className="btn btn-buy plata">INSPECCIONAR KIT</button>
        </div>

        <div className="store-card glass-panel oro">
          <img src="/oro.png" alt="Oro VIP" className="product-icon" />
          <div className="store-price">
            <span style={{ textDecoration: 'line-through', fontSize: '1.5rem', color: '#888', marginRight: '1rem' }}>49.99€</span>
            24.99<span>EUR / mes</span>
          </div>
          <h3>Oro VIP</h3>
          <ul className="store-features">
            <li className="highlight-kit">Kit Diario Élite</li>
            <li>Multiplicador x3.0 Monedas de Playtime</li>
            <li>Saltar la Cola del servidor (SkipQueue)</li>
            <li>Tag [Oro] brillante en el chat</li>
          </ul>
          <button onClick={() => onOpenKit('oro')} className="btn btn-buy oro">INSPECCIONAR KIT</button>
        </div>
      </div>

      <h2 className="sub-title">ECONOMÍA DIGITAL (ONE-TIME)</h2>
      <div className="store-grid">
        <div className="store-card economy-card glass-panel">
          <img src="/coins.png" alt="Monedas" className="product-icon economy-img" />
          <h3>Paquete Iniciado</h3>
          <div className="store-price">2.00<span>EUR</span></div>
          <p className="hero-desc" style={{margin:'1rem 0 2rem'}}>Recibe instantáneamente 1.000 Monedas (Coins) en el comando /shop para comprar suministros básicos sin farmear.</p>
          <a href="https://tebex.io" target="_blank" rel="noreferrer" className="btn btn-buy eco">COMPRAR 1.000 MONEDAS</a>
        </div>

        <div className="store-card economy-card glass-panel">
          <div className="store-badge" style={{ letterSpacing: '1px', fontSize: '0.75rem', padding: '0.4rem 3.5rem' }}>🔥 MEJOR VALOR</div>
          <img src="/coins.png" alt="Monedas" className="product-icon economy-img" />
          <h3>Cofre de la Fortuna</h3>
          <div className="store-price">7.50<span>EUR</span></div>
          <p className="hero-desc" style={{margin:'1rem 0 2rem'}}>5.000 Monedas (Coins). Suficiente para establecer una base enorme y armas T2 nada más empezar el Wipe.</p>
          <a href="https://tebex.io" target="_blank" rel="noreferrer" className="btn btn-buy eco">COMPRAR 5.000 MONEDAS</a>
        </div>

        <div className="store-card economy-card glass-panel">
          <img src="/coins.png" alt="Monedas" className="product-icon economy-img" />
          <h3>Cámara del Rey</h3>
          <div className="store-price">12.00<span>EUR</span></div>
          <p className="hero-desc" style={{margin:'1rem 0 2rem'}}>10.000 Monedas (Coins). Poder adquisitivo masivo en /shop para explosivos, recursos blindados y dominio total.</p>
          <a href="https://tebex.io" target="_blank" rel="noreferrer" className="btn btn-buy eco">COMPRAR 10.000 MONEDAS</a>
        </div>
      </div>
    </div>
  );
}

function TOS() {
  return (
    <div className="view-container legal-view">
      <div className="legal-wrapper">
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>TÉRMINOS <span>DE SERVICIO</span></h2>
          <p className="section-desc">Reglamento vinculante para el uso de la plataforma interactiva y donaciones.</p>
        </div>
        
        <div className="legal-grid">
          <div className="legal-card glass-panel">
            <div className="legal-icon">🛒</div>
            <h3>1. Bienes Virtuales</h3>
            <p>Zero-G Rust ofrece bienes intangibles dentro del juego ("Rangos VIP", "Kits"). Al realizar un pago voluntario a través de Tebex, adquieres una licencia para usar estos bienes. Nunca los "posees" ni tienen valor real.</p>
          </div>
          
          <div className="legal-card glass-panel" style={{ borderLeft: '4px solid var(--primary-red)' }}>
            <div className="legal-icon">🚫</div>
            <h3>2. Estricto No-Reembolso</h3>
            <p>Dado que estos productos digitales son irrevocables, las compras son definitivas e indiscutibles. Si intentas un "Chargeback", serás baneado de forma incondicional y permanente de nuestra red.</p>
          </div>
          
          <div className="legal-card glass-panel">
            <div className="legal-icon">⚖️</div>
            <h3>3. Penalizaciones por Cheats</h3>
            <p>Adquirir bienes VIP NO te concede inmunidad. Si usas software de terceros (Hacks) o sobrepasas el límite del clan, tu cuenta será aniquilada y tus privilegios denegados sin derecho a objeción.</p>
          </div>
          
          <div className="legal-card glass-panel">
            <div className="legal-icon">🏢</div>
            <h3>4. Descargo Facepunch</h3>
            <p>La Administración de Zero-G Rust opera como ente independiente. No estamos auspiciados, autorizados ni conectados oficialmente con Basepunch Studios Ltd ni Rust.</p>
          </div>
        </div>
        
        <p className="legal-date glass-panel">Última actualización: Marzo 2026</p>
      </div>
    </div>
  );
}

function Privacy() {
  return (
    <div className="view-container legal-view">
      <div className="legal-wrapper">
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>POLÍTICA <span>DE PRIVACIDAD</span></h2>
          <p className="section-desc">Transparencia absoluta sobre la protección y recolección vital de datos.</p>
        </div>
        
        <div className="legal-grid">
          <div className="legal-card glass-panel">
            <div className="legal-icon">👁️</div>
            <h3>1. Datos Requeridos</h3>
            <p>Solo procesamos identificadores precisos: tu SteamID64 público, tu IP temporal de conexión al servidor y métricas vinculadas a Discord si las integras. Mínima recolección obligatoria.</p>
          </div>
          
          <div className="legal-card glass-panel">
            <div className="legal-icon">🛡️</div>
            <h3>2. Escudo Anti-Fraude</h3>
            <p>Analizamos el túnel de IPs de red a través de la infraestructura proxy de OVH exclusivamente para mitigar ciberataques DDoS y asaltar redes evasivas (Anti-VPN).</p>
          </div>
          
          <div className="legal-card glass-panel" style={{ borderLeft: '4px solid #00d2ff' }}>
            <div className="legal-icon">💳</div>
            <h3>3. Cifrado Financiero</h3>
            <p>Zero-G Rust no toca datos bancarios ni vislumbra tus tarjetas de crédito. Toda la pasarela fluye estrictamente a través de algoritmos inquebrantables de los sistemas legales de la entidad <strong>Tebex Limited</strong>.</p>
          </div>
          
          <div className="legal-card glass-panel">
            <div className="legal-icon">🔒</div>
            <h3>4. Cero Tráfico Comercial</h3>
            <p>Nos negamos por principio absoluto a traspasar, lucrar o vender tus pautas de actividad, credenciales biométricas u horarios de conexión en el juego hacia terceras partes o estudios de mercado.</p>
          </div>
        </div>
        
        <p className="legal-date glass-panel">Última actualización: Marzo 2026</p>
      </div>
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = useState('home');
  const [selectedKit, setSelectedKit] = useState(null);

  const navigateTo = (view) => {
    setActiveView(view);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigateTo('home')}>
          <img src="/logo.png" alt="Zero-G Logo" />
          <span className="brand-text" translate="no">ZERO-G RUST</span>
        </div>
        <div className="nav-links">
          <button className={activeView === 'home' ? 'active' : ''} onClick={() => navigateTo('home')}>INICIO</button>
          <button className={activeView === 'store' ? 'active' : ''} onClick={() => navigateTo('store')}>TIENDA VIP</button>
        </div>
      </nav>

      {selectedKit && <KitModal kitId={selectedKit} onClose={() => setSelectedKit(null)} />}

      <main style={{flexGrow: 1}}>
        {activeView === 'home' && <Home setView={navigateTo} />}
        {activeView === 'store' && <Store onOpenKit={setSelectedKit} />}
        {activeView === 'tos' && <TOS />}
        {activeView === 'privacy' && <Privacy />}
      </main>

      <footer className="footer">
        <div className="footer-links">
          <button onClick={() => navigateTo('home')}>Inicio</button>
          <span className="separator">|</span>
          <button onClick={() => navigateTo('store')}>Tienda VIP</button>
          <span className="separator">|</span>
          <button onClick={() => navigateTo('tos')}>Términos de Servicio</button>
          <span className="separator">|</span>
          <button onClick={() => navigateTo('privacy')}>Política de Privacidad</button>
        </div>
        <p className="footer-disclaimer">&copy; 2026 Zero-G Rust. Pagos asegurados externamente por Tebex.</p>
      </footer>
    </div>
  );
}

export default App;
