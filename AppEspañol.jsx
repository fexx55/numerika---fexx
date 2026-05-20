import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Code, Cpu, Zap, LineChart, Server, Layers, Database, Calculator, Brain, Clock } from 'lucide-react';

// --- DATOS DE LAS DIAPOSITIVAS ---
const slides = [
  {
    id: 1,
    type: 'hero',
    title: 'Numérika AI',
    subtitle: 'Métodos numéricos',
    accent: 'que se entienden.',
    content: 'Plataforma interactiva para el cálculo, visualización y comprensión de métodos numéricos en la ingeniería.',
    footer: 'Ezequiel Silvera Sandoval - Santiago Daniel Chocobar - Juan Ignacio Quinteros Navarro - Gonzalo Nahuel Luna - Lautaro Zahir Oliver '
  },
  {
    id: 2,
    type: 'cards',
    title: '¿Cómo surgió',
    accent: 'la idea?',
    cards: [
      { title: 'Abstracción', desc: 'La teoría matemática en el aula suele ser difícil de visualizar en la práctica.' },
      { title: 'Caja Negra', desc: 'Las calculadoras tradicionales dan el resultado, pero no explican el "por qué" ni muestran el error.' },
      { title: 'Unificación', desc: 'Necesidad de tener resolución, gráficos, iteraciones y teoría en una sola herramienta.' }
    ]
  },
    {
    id: 3,
    type: 'cards',
    title: 'Numérika AI optimiza el aprendizaje técnico',
    accent: 'de métodos numéricos',
    cards: [
      { icon: <Zap size={24}/>, title: 'Aprendizaje', desc: 'No solo entrega resultados; explica el "por qué" y visualiza el proceso de convergencia.' },
      { icon: <Cpu size={24}/>, title: 'Arquitectura', desc: 'Motor híbrido que combina la velocidad de JavaScript con el poder simbólico de Python.' },
      { icon: <Server size={24}/>, title: 'Aplicaciones', desc: 'Simuladores integrados para ingeniería eléctrica, térmica y civil en tiempo real.' }
    ]
  },
  {
    id: 4,
    type: 'split',
    title: 'Arquitectura',
    accent: 'Técnica',
    left: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-b border-[#82bdae]/30 pb-2">Frontend (React)</h3>
        <p className="text-gray-600">Visualización interactiva con Recharts y algoritmos rápidos en el navegador.</p>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>React.js & Tailwind CSS</li>
          <li>Recharts (Gráficos)</li>
          <li>Ejecución JS nativa (Trapecio, Gauss)</li>
        </ul>
      </div>
    ),

    right: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-b border-[#82bdae]/30 pb-2">Backend (Python)</h3>
        <p className="text-gray-600">Motor SymPy para EDOs y derivadas exactas con precisión científica.</p>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Python & FastAPI</li>
          <li>SymPy (EDOs, Derivadas)</li>
          <li>Microservicio IA (Explicaciones)</li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    type: 'grid',
    title: 'Solver y',
    accent: 'Métodos',
    items: [
      { icon: <LineChart size={24} />, title: 'Raíces de Ecuaciones', desc: 'Bisección, Newton-Raphson, Secante. Gráficos en tiempo real.' },
      { icon: <Layers size={24} />, title: 'Sistemas Lineales', desc: 'Métodos directos (Gauss) e iterativos (Jacobi, Seidel).' },
      { icon: <Calculator size={24} />, title: 'Integración', desc: 'Aproximación de áreas mediante Trapecio y métodos de Simpson.' },
    ]
  },
{
    id: 6,
    type: 'code',
    title: 'Motor',
    accent: 'Matemático',
    desc: 'Evaluación segura, validación del Teorema de Bolzano y recolección de métricas para gráficos 3D/2D.',
    code: `// src/utils/numericalMethods.js - Método de Bisección
import { evaluate } from 'mathjs';

export function bisectionMethod(expression, a, b, tol = 1e-4) {
  // 1. Evaluación dinámica de la función ingresada por el usuario
  const f = (x) => evaluate(expression, { x });

  // 2. Validación estricta: Teorema de Bolzano
  if (f(a) * f(b) >= 0) {
    throw new Error("Error de Dominio: La función debe cambiar de signo en el intervalo [a, b].");
  }

  let xr = a;
  let error = 100;
  let iteraciones = []; // Almacena el historial para Recharts y la Tabla

  // 3. Bucle de convergencia
  while (error > tol && iteraciones.length < 100) {
    let xr_old = xr;
    xr = (a + b) / 2;
    error = Math.abs((xr - xr_old) / xr) * 100;
    
    // Guardamos el estado exacto del paso a paso para la IA y los gráficos
    iteraciones.push({ a, b, xr, fxr: f(xr), error });

    if (f(a) * f(xr) < 0) b = xr;
    else a = xr;
  }
  
  return { raiz: xr, historial: iteraciones };
}`
  },
{
    id: 7,
    type: 'code',
    title: 'Calculadora: Renderizado',
    accent: 'LaTeX Dinámico',
    desc: 'Transpilación en tiempo real de texto plano a formato matemático mediante Árboles de Sintaxis Abstracta (AST).',
    code: `// src/components/MathComponents.jsx
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { parse } from 'mathjs';

export function FormulaLatex({ inputUsuario }) {
  try {
    // 1. Lexing y Parsing: Convierte el string en un AST (Abstract Syntax Tree)
    const nodoMatematico = parse(inputUsuario);
    
    // 2. Transpilación: Genera el código LaTeX nativo desde el árbol
    const codigoLatex = nodoMatematico.toTex({ parenthesis: 'keep' });
    
    // 3. Renderizado en el Virtual DOM (Alto rendimiento)
    return <BlockMath math={codigoLatex} />;
    
  } catch (error) {
    // Fallback silencioso mientras el usuario sigue tecleando
    return <div className="text-gray-400">Escribiendo expresión...</div>;
  }
}`
  },
{
    id: 8,
    type: 'code',
    title: 'Parseo',
    accent: 'Dinámico',
    desc: 'Custom Hook asíncrono para la preparación de datos y consumo de la API REST del motor científico.',
    code: `// src/hooks/useMathEngine.js - Abstracción de la API Científica
import { useState } from 'react';

export const useMathEngine = () => {
  const [loading, setLoading] = useState(false);

  const solveODESystem = async (equations, initialConditions) => {
    setLoading(true);
    try {
      // 1. Preprocesamiento: Normaliza la entrada del alumno (ej: y' a formato SymPy)
      const sanitizedEqs = equations.map(eq => prepareEquationForPython(eq));

      // 2. Consumo asíncrono del microservicio en Python (FastAPI)
      const response = await fetch('/api/math/ode/system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equations: sanitizedEqs, ics: initialConditions })
      });

      if (!response.ok) throw new Error("El motor matemático no pudo converger.");
      
      const data = await response.json();
      return data; // Retorna la solución exacta y el bloque LaTeX
    } catch (err) {
      handleFriendlyError(err.message);
    } finally {
      setLoading(false); // Liberación del estado de la UI
    }
  };

  return { solveODESystem, loading };
};`
  },
  {
    id: 9,
    type: 'cards',
    title: 'Aplicaciones',
    accent: 'Reales',
    cards: [
      { title: 'Ingeniería Eléctrica', desc: 'Análisis de Circuitos. Cálculo exacto de corrientes en sistemas de múltiples mallas utilizando Eliminación de Gauss.' },
      { title: 'Ingeniería Térmica', desc: 'Enfriamiento de Hardware. Predicción de umbrales críticos de temperatura (90°C) en CPUs utilizando Runge-Kutta 4.' },
      { title: 'Ingeniería Civil', desc: 'Análisis de vigas y riesgo urbano. Llevando la matemática abstracta al diseño físico.' }
    ]
  },
{
    id: 10,
    type: 'code',
    title: 'Simulación',
    accent: 'Termodinámica',
    desc: 'Inyección de constantes físicas en la Ecuación Diferencial para predecir el límite térmico.',
    code: `// src/utils/simulators/coolingModel.js
import { solveRK4 } from '../numericalMethods';

/**
 * Simula el perfil térmico de una CPU bajo estrés usando Runge-Kutta de 4to Orden.
 * Modelo: Ley de Enfriamiento de Newton + Generación de Calor (TDP).
 */
export function simulateCPUCooling(T_inicial, T_amb, coef_ventilacion, TDP, maxTime) {
  const masaTermica = 12.5; // Capacidad calórica del disipador (Joules/°C)

  // 1. Ecuación Diferencial Ordinaria: dT/dt = (Q_in - Q_out) / C
  const dT_dt = (t, T) => {
    const calorDisipado = coef_ventilacion * (T - T_amb);
    return (TDP - calorDisipado) / masaTermica;
  };

  // 2. Resolución numérica (Paso h = 0.5s)
  const paso = 0.5;
  const perfilTermico = solveRK4(dT_dt, 0, T_inicial, paso, maxTime);

  // 3. Análisis de datos: Detección de Thermal Throttling (Estrangulamiento Térmico a 90°C)
  const puntoCritico = perfilTermico.find(estado => estado.y >= 90.0);

  return {
    datosGrafico: perfilTermico,
    alertaThrottling: !!puntoCritico,
    segundosParaLimite: puntoCritico ? puntoCritico.t : null
  };
}`
  },
   {
  id: 11,
  type: 'metrics',
  title: 'La IA Generativa',
  accent: 'como tutor pedagógico',
  description: 'A diferencia de una IA genérica, Ika analiza los resultados exactos del motor numérico para explicar el comportamiento matemático real, evitando alucinaciones algebraicas.',
  items: [
    { value: '100%', label: 'Contextual' },
    { value: '24/7', label: 'Disponibilidad' }
  ]
},
  {
    id: 12,
    type: 'comparison',
    title: 'Numérika AI vs.',
    accent: 'Herramientas Genéricas',
    headers: ['Característica', 'Calculadoras Trad.', 'IA Genérica', 'Numérika AI'],
    rows: [
      ['Cálculo Simbólico', 'Limitado', 'Inconsistente', 'Precisión SymPy'],
      ['Visualización de Error', 'Nula', 'Nula', 'Gráficos Recharts'],
      ['Pedagogía / Paso a Paso', 'Pobre', 'Alucinaciones', 'Asistente IKA']
    ]
  },
  {
    id: 13,
    type: 'grid',
    title: 'Futuro',
    accent: 'Numérika',
    items: [
      { icon: <Database size={24} />, title: 'Base de Datos', desc: 'Implementación de PostgreSQL para guardar el historial y los cálculos de los usuarios.' },
      { icon: <Server size={24} />, title: 'Escalabilidad', desc: 'Gráficos 3D para funciones multivariables y exportación automática a PDF.' },
      { icon: <Zap size={24} />, title: 'IA Generativa', desc: 'Potenciar a "Ika" para que detecte errores algebraicos en los inputs del usuario en tiempo real.' },
    ]
  },
  {
    id: 14,
    type: 'hero',
    title: 'De la teoría a la herramienta',
    subtitle: 'Muchas gracias por su atención.',
    accent: '¿Preguntas?',
    footer: 'Numérika AI • Analisis Numerico • Ing. Informatica 2026'
  }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slides[currentIdx];
  const progress = ((currentIdx + 1) / slides.length) * 100;

  return (
    <div className="min-h-screen bg-[#f8f7f2] text-[#1a1c1a] font-sans flex flex-col relative overflow-hidden transition-colors duration-500">
      
      {/* HEADER TIPO NUMÉRIKA */}
      <header className="w-full px-8 py-5 flex justify-between items-center z-10">
        <div className="text-xl font-bold tracking-tight font-serif">
          Numérika<span className="italic text-[#82bdae]">AI</span>
        </div>
        <div className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          Slide {currentIdx + 1} / {slides.length}
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 w-full max-w-6xl mx-auto z-10 relative">
        <div className="w-full animate-fade-in-up transition-all duration-500 ease-out">
          
          {/* TÍTULOS GLOBALES (Ocultos en la vista Hero) */}
          {slide.type !== 'hero' && (
            <div className="mb-12 text-center">
              <h2 className="text-5xl md:text-6xl font-serif">
                {slide.title} <span className="italic text-[#82bdae]">{slide.accent}</span>
              </h2>
            </div>
          )}

          {/* RENDERIZADO POR TIPO DE DIAPOSITIVA */}
          
          {/* TIPO: HERO (Portada y Cierre) */}
          {slide.type === 'hero' && (
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-[#1a1c1a] mb-2">
                {slide.title}
              </h1>
              <h2 className="text-3xl md:text-5xl font-serif text-gray-700">
                {slide.subtitle} <span className="italic text-[#82bdae]">{slide.accent}</span>
              </h2>
              <div className="w-24 h-[1px] bg-gray-300 mx-auto my-8"></div>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                {slide.content}
              </p>
              {slide.footer && (
                <p className="mt-12 text-sm tracking-widest uppercase text-gray-400 font-semibold">
                  {slide.footer}
                </p>
              )}
            </div>
          )}

          {/* TIPO: CARDS (3 Tarjetas) */}
          {slide.type === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slide.cards.map((card, i) => (
                <div key={i} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#82bdae]"></div>
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-gray-500">{card.title}</h3>
                  </div>
                  <h4 className="text-xl font-serif font-semibold mb-3">{card.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{card.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TIPO: GRID (Iconos y texto) */}
          {slide.type === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {slide.items.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#82bdae] mb-6 shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-serif font-semibold mb-3">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TIPO: SPLIT (2 Columnas texto/gráfico) */}
          {slide.type === 'split' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
              <div>{slide.left}</div>
              <div className="h-full min-h-[200px] bg-[#f8f7f2] rounded-xl p-6 border border-gray-200">
                {slide.right}
              </div>
            </div>
          )}
          {/* TIPO: METRICS (Métricas destacadas con números gigantes) */}
          {slide.type === 'metrics' && (
            <div className="flex flex-col items-center justify-center space-y-16 w-full max-w-4xl mx-auto mt-8">
              
              {/* Contenedor de Números */}
              <div className="flex flex-col md:flex-row justify-around items-center w-full gap-12 md:gap-0">
                {slide.items.map((item, i) => (
                  <div key={i} className="text-center">
                    <h3 className="text-[100px] md:text-[130px] font-bold text-[#82bdae] leading-none mb-4 tracking-tighter">
                      {item.value}
                    </h3>
                    <p className="text-2xl font-bold text-[#1a1c1a] tracking-wide uppercase">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Descripción Inferior */}
              {slide.description && (
                <div className="w-full max-w-3xl mx-auto text-center mt-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              )}
            </div>
          )}
          {/* TIPO: COMPARISON (Tabla comparativa estilizada) */}
          {slide.type === 'comparison' && (
            <div className="w-full max-w-5xl mx-auto mt-4 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#82bdae]">
                    {slide.headers.map((header, i) => (
                      <th key={i} className="py-5 px-6 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slide.rows.map((row, i) => (
                    <tr key={i} className="group hover:bg-gray-50 transition-colors">
                      {row.map((cell, j) => (
                        <td 
                          key={j} 
                          className={`py-6 px-6 text-sm md:text-base border-b border-gray-100 ${
                            j === 3 ? 'font-bold text-[#1a1c1a] bg-emerald-50/30' : 'text-gray-500'
                          } ${
                            j === 0 ? 'font-semibold text-gray-700' : ''
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* TIPO: CODE (Muestra de código) */}
          {slide.type === 'code' && (
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-gray-600 mb-8 text-lg">{slide.desc}</p>
              <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl border border-gray-800">
                <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-4 text-xs font-mono text-gray-400 tracking-wider">src/utils/engine.js</span>
                </div>
                <pre className="p-6 text-sm md:text-base text-gray-300 font-mono overflow-x-auto">
                  <code>{slide.code}</code>
                </pre>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* CONTROLES FOOTER */}
      <footer className="w-full px-8 py-6 flex justify-between items-center z-10">
        <button 
          onClick={prevSlide}
          disabled={currentIdx === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${currentIdx === 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#82bdae] text-[#82bdae] hover:bg-[#82bdae] hover:text-white transition-colors'}`}
        >
          <ChevronLeft size={18} /> <span className="text-sm font-semibold tracking-wider uppercase">Anterior</span>
        </button>

        {/* INDICADOR DE PROGRESO */}
        <div className="hidden md:flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setCurrentIdx(i)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${i === currentIdx ? 'bg-[#82bdae] w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
            ></div>
          ))}
        </div>

        <button 
          onClick={nextSlide}
          disabled={currentIdx === slides.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${currentIdx === slides.length - 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#82bdae] text-[#82bdae] hover:bg-[#82bdae] hover:text-white transition-colors'}`}
        >
           <span className="text-sm font-semibold tracking-wider uppercase">Siguiente</span> <ChevronRight size={18} />
        </button>
      </footer>

      {/* BARRA DE PROGRESO SUPERIOR */}
      <div className="absolute top-0 left-0 h-1 bg-[#82bdae] transition-all duration-500 ease-out z-20" style={{ width: `${progress}%` }}></div>

      {/* ESTILOS EXTRA Y ANIMACIONES */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
