import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Heart, Apple, Moon, Coins, Activity, 
  Briefcase, Gamepad2, Plus, Download, Upload, Languages,
  CheckCircle2, Circle, Star, Watch, Crown, Glasses, Shirt,
  LayoutDashboard, Calendar as CalendarIcon, Settings,
  Clock, AlertCircle, CheckSquare, BarChart2, ListTodo,
  ChevronLeft, ChevronRight, Menu, Trash2, Edit2, RotateCcw, Image as ImageIcon,
  ZoomIn, Move, Map, Lock, Zap, Play, Square, ArrowLeft, Lightbulb, Unlock, UserCog,
  Store, Shield, FileText, Headphones, Crosshair, Minimize2, Maximize2, TrendingUp, PieChart, CalendarDays,
  Sun, BookOpen, Archive, GraduationCap, Check, Home, Users, Network, Award
} from 'lucide-react';

// --- IDIOMAS ---
const translations = {
  es: {
    appTitle: "SuperYoHabito",
    appDesc: "Tu centro de evolución personal. Completa tareas, gana Puntos de Evolución (PE) y mejora en el mundo real y digital.",
    skillMap: "NIVELES DE HABILIDAD",
    habitsList: "TAREAS DEL DÍA",
    shop: "MERCADO DE RECOMPENSAS",
    calendar: "CALENDARIO Y MÉTRICAS",
    learning: "APRENDIZAJE",
    health: "SALUD",
    nutrition: "ALIMENTACIÓN",
    rest: "DESCANSO",
    economy: "RECURSOS",
    psychology: "MENTE",
    work: "TRABAJO",
    leisure: "OCIO",
    addHabit: "NUEVO",
    export: "Exportar Datos",
    import: "Importar Backup",
    settings: "Configuración",
    dashboard: "Panel Principal",
    level: "LVL",
    xp: "XP",
    priority: "Prioridad",
    points: "PE",
    buy: "Comprar",
    equipped: "Equipado",
    equip: "Equipar",
    download: "Descargar",
    cancel: "Cancelar",
    save: "Guardar",
    habitName: "Nombre de la tarea...",
    pending: "Pendientes",
    urgent: "Urgentes",
    estimatedTime: "Tiempo Est.",
    completed: "Completadas",
    weeklyPerf: "Rendimiento",
    changeAvatar: "Subir Imagen",
    editTask: "Editar Tarea",
    date: "Fecha",
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    masc: "Masculino",
    fem: "Femenino",
    robot: "Cyborg",
    pet: "Mascota",
    alien: "Alien",
    dino: "Dinosaurio",
    ogre: "Ogro",
    achievementsMap: "MAPA DE EVOLUCIÓN",
    locked: "Bloqueado",
    focusMode: "HYPER-FOCUS",
    backToDash: "Volver al Panel",
    tips: "Consejo del Sistema",
    categoryTasks: "Misiones",
    unlockables: "Próximos Desbloqueos",
    enterSection: "Ingresar a la Sección",
    detailedMetrics: "Métricas Detalladas",
    dailyProgress: "Progreso Diario",
    xpDistribution: "Distribución de XP",
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
    importSuccess: "Datos cargados correctamente",
    academy: "Academia",
    vault: "La Bóveda",
    startLesson: "Comenzar Lección",
    next: "Siguiente",
    finish: "Completar Módulo"
  },
  en: {
    appTitle: "SUPER HABITS",
    appDesc: "Your personal command center. Complete daily tasks to earn XP, level up, and unlock equipment.",
    skillMap: "SKILL LEVELS",
    habitsList: "DAILY TASKS",
    shop: "NEO SHOP",
    calendar: "CALENDAR",
    learning: "LEARNING",
    health: "HEALTH",
    nutrition: "NUTRITION",
    rest: "REST",
    economy: "ECONOMY",
    psychology: "PSYCHOLOGY",
    work: "WORK",
    leisure: "LEISURE",
    addHabit: "NEW",
    export: "Export Data",
    import: "Import Backup",
    settings: "Settings",
    dashboard: "Dashboard",
    level: "LVL",
    xp: "XP",
    priority: "Priority",
    points: "Pts",
    buy: "Buy",
    equipped: "Equipped",
    equip: "Equip",
    download: "Download",
    cancel: "Cancel",
    save: "Save",
    habitName: "Task name...",
    pending: "Pending",
    urgent: "Urgent",
    estimatedTime: "Est. Time",
    completed: "Completed",
    weeklyPerf: "Performance",
    changeAvatar: "Upload Image",
    editTask: "Edit Task",
    date: "Date",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    masc: "Male",
    fem: "Female",
    robot: "Cyborg",
    pet: "Pet",
    alien: "Alien",
    dino: "Dinosaur",
    ogre: "Ogre",
    achievementsMap: "ACHIEVEMENT MAP",
    locked: "Locked",
    focusMode: "HYPER-FOCUS",
    backToDash: "Back to Dashboard",
    tips: "System Tip",
    categoryTasks: "Category Tasks",
    unlockables: "Next Unlockables",
    enterSection: "Enter Section",
    detailedMetrics: "Detailed Metrics",
    dailyProgress: "Daily Progress",
    xpDistribution: "XP Distribution",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    importSuccess: "Data successfully loaded",
    academy: "Academy",
    vault: "The Vault",
    startLesson: "Start Lesson",
    next: "Next",
    finish: "Complete Module"
  }
};

const getTodayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

// --- DATOS INICIALES Y CONFIGURACIÓN ---
const initialStats = {
  learning: { level: 1, xp: 20, maxXp: 100, icon: Brain, color: '#22d3ee' },
  health: { level: 1, xp: 50, maxXp: 100, icon: Heart, color: '#ec4899' },
  nutrition: { level: 1, xp: 80, maxXp: 100, icon: Apple, color: '#4ade80' },
  rest: { level: 1, xp: 10, maxXp: 100, icon: Moon, color: '#a78bfa' },
  economy: { level: 1, xp: 40, maxXp: 100, icon: Coins, color: '#eab308' },
  psychology: { level: 1, xp: 0, maxXp: 100, icon: Activity, color: '#c084fc' },
  work: { level: 1, xp: 90, maxXp: 100, icon: Briefcase, color: '#fb923c' },
  leisure: { level: 1, xp: 30, maxXp: 100, icon: Gamepad2, color: '#f472b6' }
};

const categoryData = {
  learning: { 
    banner: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=2000&q=80", 
    desc: "Expande tu mente. Cada nuevo conocimiento es una mejora permanente a tu código fuente.", 
    tips: ["Usa la técnica Feynman: explica lo que aprendes a un niño imaginario.", "Estudia en bloques de 25 minutos (Pomodoro).", "Repasar antes de dormir ayuda a consolidar la memoria."], 
    achievements: [{ name: "Políglota Básico", reqLvl: 5, icon: Languages }, { name: "Lector Voraz", reqLvl: 10, icon: Brain }, { name: "Maestro de Habilidades", reqLvl: 25, icon: Crown }],
    academy: [
      { id: 'mod_1', title: 'La Regla del 1%', desc: 'Micro-cambios, macro-resultados.', reqLvl: 1, slides: ["Mejorar un 1% cada día no parece mucho.", "Pero las matemáticas de la mejora continua son asombrosas.", "Si logras ser un 1% mejor cada día durante un año, serás 37 veces mejor."], quiz: { q: "Si mejoras 1% al día durante un año, ¿cuánto mejoras al final?", options: ["Un 365%", "No hay diferencia", "37 veces más"], correct: 2 }, challenge: { name: "Leer 1 página hoy", priority: "Alta", points: 50, timeEst: 5 }, rewardCoins: 20 },
      { id: 'mod_2', title: 'Técnica Feynman', desc: 'Aprender enseñando.', reqLvl: 2, slides: ["Albert Einstein dijo: 'Si no puedes explicárselo a un niño de 6 años, no lo entiendes tú mismo'.", "1. Elige un tema. 2. Explícalo de forma sencilla. 3. Identifica lagunas. 4. Simplifica."], quiz: { q: "¿Cuál es el núcleo de la técnica Feynman?", options: ["Memorizar", "Explicar de forma sencilla", "Leer 10 veces"], correct: 1 }, challenge: { name: "Explicar un concepto nuevo", priority: "Media", points: 40, timeEst: 10 }, rewardCoins: 30 },
      { id: 'mod_3', title: 'Lectura Rápida', desc: 'Optimiza tu input de datos.', reqLvl: 5, slides: ["Próximamente... Desbloquea el Nivel 5 para acceder."] }
    ]
  },
  health: { banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80", desc: "Tu cuerpo es tu vehículo principal. Mantenlo en óptimas condiciones.", tips: ["15 minutos de calistenia son suficientes para empezar.", "La postura frente al escritorio es crucial.", "El estiramiento previene lesiones."], achievements: [{ name: "Primeros 5K", reqLvl: 5, icon: Activity }, { name: "Rutina de Acero", reqLvl: 12, icon: Heart }, { name: "Atleta de Élite", reqLvl: 30, icon: Crown }], academy: [] },
  nutrition: { banner: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=2000&q=80", desc: "El combustible correcto determina el rendimiento de la máquina.", tips: ["La hidratación afecta directamente tu enfoque.", "Añade color a tus platos: más vegetales.", "Evita el azúcar procesado."], achievements: [{ name: "Hidratación Óptima", reqLvl: 4, icon: Apple }, { name: "Chef Saludable", reqLvl: 15, icon: Heart }, { name: "Ayuno Dominado", reqLvl: 20, icon: Activity }], academy: [] },
  rest: { banner: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=2000&q=80", desc: "En el silencio y el reposo es donde el cuerpo y la mente se actualizan.", tips: ["Reduce la luz azul 1 hora antes de dormir.", "Mantén tu habitación fría (18-20°C).", "Acuéstate y levántate a la misma hora."], achievements: [{ name: "Ciclo REM Perfecto", reqLvl: 5, icon: Moon }, { name: "Madrugador", reqLvl: 10, icon: Zap }, { name: "Maestro Zen", reqLvl: 20, icon: Crown }], academy: [] },
  economy: { banner: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80", desc: "La gestión de recursos es vital para la supervivencia a largo plazo.", tips: ["Aplica la regla 50/30/20.", "Automatiza tus ahorros.", "Registra cada gasto durante 30 días."], achievements: [{ name: "Fondo de Emergencia", reqLvl: 6, icon: Coins }, { name: "Inversor Novato", reqLvl: 15, icon: Briefcase }, { name: "Libertad Financiera", reqLvl: 50, icon: Crown }], academy: [] },
  psychology: { banner: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80", desc: "Domina tus pensamientos y dominarás tus acciones. La fortaleza mental es la base.", tips: ["Meditar 5 minutos al día reconfigura el cerebro.", "Escribe un diario (journaling).", "Practica la gratitud matutina."], achievements: [{ name: "Mente Clara", reqLvl: 5, icon: Brain }, { name: "Control de Estrés", reqLvl: 15, icon: Activity }, { name: "Estoicismo", reqLvl: 30, icon: Crown }], academy: [] },
  work: { banner: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80", desc: "El trabajo profundo y la disciplina construyen imperios. Concéntrate y ejecuta.", tips: ["Cómete la rana primero: haz la tarea más difícil.", "Desactiva las notificaciones.", "Divide los proyectos grandes."], achievements: [{ name: "Focus Master", reqLvl: 8, icon: Zap }, { name: "Eficiencia X2", reqLvl: 18, icon: Briefcase }, { name: "Líder de Proyectos", reqLvl: 35, icon: Crown }], academy: [] },
  leisure: { banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2000&q=80", desc: "Desconectar es necesario. Recompénsate y disfruta el viaje.", tips: ["El ocio sin culpa recarga tu creatividad.", "Alterna ocio pasivo y activo.", "Planifica tu tiempo libre."], achievements: [{ name: "Equilibrio Vida/Trabajo", reqLvl: 5, icon: Gamepad2 }, { name: "Explorador de Hobbies", reqLvl: 15, icon: Star }, { name: "Alma Creativa", reqLvl: 25, icon: Crown }], academy: [] }
};

const categoryBackgrounds = {
  learning: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
  health: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  nutrition: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
  rest: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=800&q=80",
  economy: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  psychology: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
  work: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
  leisure: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
};

const defaultHabits = [
  { id: 1, name: "Beber 2L de agua", category: "nutrition", priority: "Alta", points: 15, completed: false, timeEst: 5, date: getTodayStr(), isQuest: false },
  { id: 2, name: "Leer 20 páginas", category: "learning", priority: "Media", points: 20, completed: false, timeEst: 30, date: getTodayStr(), isQuest: false },
  { id: 3, name: "Dormir 8 horas", category: "rest", priority: "Alta", points: 25, completed: false, timeEst: 480, date: getTodayStr(), isQuest: false },
  { id: 4, name: "Ahorrar $5", category: "economy", priority: "Baja", points: 10, completed: false, timeEst: 5, date: getTodayStr(), isQuest: false },
  { id: 5, name: "30 min de ejercicio", category: "health", priority: "Alta", points: 30, completed: true, timeEst: 30, date: getTodayStr(), isQuest: false },
];

const avatarPaths = {
  male: { head: "135,100 165,100 175,60 150,30 125,60", chest: "M120 150 L180 150 L170 240 L130 240 Z", stomach: "M130 245 L170 245 L160 320 L140 320 Z", leftArm: "M110 165 L85 240 L70 340 L85 350 L100 240 L120 180 Z", rightArm: "M190 165 L215 240 L230 340 L215 350 L200 240 L180 180 Z", shoulders: "M135 110 L165 110 L180 140 L220 160 L220 180 L190 160 L180 220 L120 220 L110 160 L80 180 L80 160 L120 140 Z" },
  female: { head: "135,100 165,100 170,60 150,25 130,60", chest: "M125 150 L175 150 L160 230 L140 230 Z", stomach: "M140 235 L160 235 L175 320 L125 320 Z", leftArm: "M115 165 L95 240 L80 340 L95 350 L105 240 L125 180 Z", rightArm: "M185 165 L205 240 L220 340 L215 350 L195 240 L175 180 Z", shoulders: "M135 110 L165 110 L175 135 L205 160 L205 180 L185 165 L175 220 L125 220 L115 165 L95 180 L95 160 L125 135 Z" },
  robot: { head: "130,100 170,100 170,60 130,60", chest: "M125 150 L175 150 L170 230 L130 230 Z", stomach: "M130 235 L170 235 L165 320 L135 320 Z", leftArm: "M115 160 L100 160 L100 280 L115 280 Z", rightArm: "M185 160 L200 160 L200 280 L185 280 Z", shoulders: "M125 110 L175 110 L185 140 L115 140 Z" },
  pet: { head: "140,140 160,140 165,110 150,100 135,110", chest: "M135 150 L165 150 L175 220 L125 220 Z", stomach: "M125 225 L175 225 L185 300 L115 300 Z", leftArm: "M115 220 L100 240 L105 320 L120 320 Z", rightArm: "M185 220 L200 240 L195 320 L180 320 Z", shoulders: "M135 140 L165 140 L175 150 L125 150 Z" },
  alien: { head: "135,100 165,100 180,40 150,10 120,40", chest: "M135 150 L165 150 L160 240 L140 240 Z", stomach: "M140 245 L160 245 L155 320 L145 320 Z", leftArm: "M125 165 L100 250 L90 360 L100 360 L110 250 L135 180 Z", rightArm: "M175 165 L200 250 L210 360 L200 360 L190 250 L165 180 Z", shoulders: "M135 110 L165 110 L170 140 L190 160 L190 180 L175 165 L165 220 L135 220 L125 165 L110 180 L110 160 L130 140 Z" },
  dino: { head: "130,110 170,110 180,60 150,30 120,60", chest: "M110 150 L190 150 L180 250 L120 250 Z", stomach: "M120 255 L180 255 L190 350 L110 350 Z", leftArm: "M105 170 L90 200 L85 220 L95 220 L100 200 L115 185 Z", rightArm: "M195 170 L210 200 L215 220 L205 220 L200 200 L185 185 Z", shoulders: "M130 115 L170 115 L200 150 L200 170 L190 170 L190 220 L110 220 L110 170 L100 170 L100 150 Z" },
  ogre: { head: "140,110 160,110 160,85 150,75 140,85", chest: "M100 150 L200 150 L185 250 L115 250 Z", stomach: "M115 255 L185 255 L195 340 L105 340 Z", leftArm: "M90 160 L60 250 L50 350 L70 350 L80 250 L105 180 Z", rightArm: "M210 160 L240 250 L250 350 L230 350 L220 250 L195 180 Z", shoulders: "M130 110 L170 110 L220 130 L230 160 L210 160 L190 250 L110 250 L90 160 L70 160 L80 130 Z" }
};

// --- BASE DE DATOS DE LA TIENDA ---
const storeItems = {
  aesthetics: [
    { id: 'title_novato', name: 'Novato del Ahorro', type: 'title', category: 'economy', desc: 'Título flotante. Demuestra tu disciplina.', price: 50, icon: Crown, isEquipable: true },
    { id: 'title_titan', name: 'Titán del Madrugón', type: 'title', category: 'rest', desc: 'Título flotante. El rey de las mañanas.', price: 50, icon: Crown, isEquipable: true },
    { id: 'aura_focus', name: 'Aura de Concentración', type: 'aura', category: 'work', desc: 'Efecto azul brillante alrededor de ti.', price: 150, icon: Zap, color: '#3b82f6', isEquipable: true },
    { id: 'aura_vit', name: 'Aura de Vitalidad', type: 'aura', category: 'health', desc: 'Efecto esmeralda sanador.', price: 150, icon: Heart, color: '#10b981', isEquipable: true },
    { id: 'bg_dojo', name: 'Dojo Zen', type: 'bg', category: 'psychology', desc: 'Cambia tu fondo a un santuario mental.', price: 300, icon: ImageIcon, url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80', isEquipable: true },
    { id: 'bg_cyber', name: 'Rascacielos Cyberpunk', type: 'bg', category: 'work', desc: 'Fondo distópico para el máximo rendimiento.', price: 300, icon: ImageIcon, url: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=800&q=80', isEquipable: true },
    { id: 'drone_orbe', name: 'Drone Orbe', type: 'drone', category: 'learning', desc: 'Acompañante flotante holográfico.', price: 400, icon: Crosshair, isEquipable: true }
  ],
  downloads: [
    { id: 'dl_tracker', name: 'Tracker de Gastos Hormiga', category: 'economy', format: 'Excel/PDF', desc: 'Plantilla para identificar fugas de capital.', price: 100, icon: FileText },
    { id: 'dl_fondo', name: 'Guía Fondo Emergencia', category: 'economy', format: 'Audio', desc: 'Cómo armar tu primer colchón de seguridad.', price: 150, icon: Headphones },
    { id: 'dl_snacks', name: 'Snacks en 5 Minutos', category: 'nutrition', format: 'PDF', desc: 'Recetario de bocadillos sanos y rápidos.', price: 100, icon: FileText },
    { id: 'dl_estira', name: 'Rutina Estiramiento', category: 'health', format: 'Guía', desc: 'Ideal para personas que trabajan sentadas.', price: 100, icon: FileText },
    { id: 'dl_journal', name: 'Plantillas Journaling', category: 'psychology', format: 'PDF', desc: 'Para vaciar la mente antes de dormir.', price: 100, icon: FileText },
    { id: 'dl_respira', name: 'Técnicas de Respiración', category: 'psychology', format: 'Guía Visual', desc: 'Técnica de la caja y método 4-7-8.', price: 100, icon: FileText },
    { id: 'dl_ruido', name: 'Frecuencias Hyper-Focus', category: 'rest', format: 'Playlist', desc: 'Ruido blanco para enfoque profundo.', price: 150, icon: Headphones },
    { id: 'dl_sueno', name: 'Higiene del Sueño', category: 'rest', format: 'Checklist', desc: 'Mejora la calidad de tu descanso nocturno.', price: 100, icon: FileText }
  ]
};

const banners = [
  { id: 1, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80", title: "Forja tu Destino", desc: "Sube de nivel en la vida real. Organiza tu día como un RPG." },
  { id: 2, image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=2000&q=80", title: "Métricas Reales", desc: "Analiza tu progreso, desbloquea logros y mantén tus rachas activas." },
  { id: 3, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80", title: "Energía y Enfoque", desc: "Optimiza tu salud mental y física usando el modo Hyper-Focus." }
];

// --- ÁRBOL DE HABILIDADES DATA ---
const skillTreeNodes = [
  { id: 'root', label: 'Despertar', category: 'learning', x: 50, y: 85, icon: Zap, desc: 'El inicio de tu evolución consciente.', reqLvl: 1 },
  { id: 'mind_1', label: 'Foco Profundo', category: 'psychology', x: 50, y: 55, icon: Brain, desc: 'Aumenta tu capacidad de concentración sin distracciones.', reqLvl: 3, reqNode: 'root' },
  { id: 'mind_2', label: 'Resiliencia Estóica', category: 'psychology', x: 50, y: 25, icon: Shield, desc: 'Mantén la calma bajo presión extrema.', reqLvl: 10, reqNode: 'mind_1' },
  { id: 'body_1', label: 'Vitalidad Base', category: 'health', x: 20, y: 65, icon: Heart, desc: 'Mejora la recuperación de energía y resistencia celular.', reqLvl: 2, reqNode: 'root' },
  { id: 'body_2', label: 'Biohacking', category: 'nutrition', x: 15, y: 35, icon: Activity, desc: 'Optimización nutricional para máximo rendimiento físico.', reqLvl: 8, reqNode: 'body_1' },
  { id: 'social_1', label: 'Empatía Táctica', category: 'leisure', x: 80, y: 65, icon: Users, desc: 'Mejora interacciones sociales y lectura emocional.', reqLvl: 2, reqNode: 'root' },
  { id: 'social_2', label: 'Oratoria de Impacto', category: 'work', x: 85, y: 35, icon: Network, desc: 'Habilidad para persuadir y liderar grupos.', reqLvl: 8, reqNode: 'social_1' }
];

export default function App() {
  // --- REFERENCIAS Y ESTADOS ---
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const mainScrollRef = useRef(null);
  const habitsPanelRef = useRef(null);
  const avatarContainerRef = useRef(null); 

  const [lang, setLang] = useState('es');
  const t = translations[lang] || translations['es'];
  const [isLightMode, setIsLightMode] = useState(false);

  const [currentView, setCurrentView] = useState('dashboard');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePopover, setActivePopover] = useState(null);
  const [categoryTab, setCategoryTab] = useState('tasks');

  const [stats, setStats] = useState(initialStats);
  const [habits, setHabits] = useState(defaultHabits);
  const [coins, setCoins] = useState(250); 
  const [streak, setStreak] = useState(5); 
  const [inventory, setInventory] = useState([]); 
  const [equipped, setEquipped] = useState({ aura: null, bg: null, title: null, drone: null }); 
  const [hoveredPart, setHoveredPart] = useState(null);
  const [unlockedSkills, setUnlockedSkills] = useState(['root']); 
  const [selectedSkillNode, setSelectedSkillNode] = useState(null); 

  const [completedCapsules, setCompletedCapsules] = useState([]); 
  const [currentBanner, setCurrentBanner] = useState(0);

  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false); // NUEVO ESTADO CALENDARIO EXPANDIBLE

  const FOCUS_TIME_MINUTES = 25;
  const [focusTimeLeft, setFocusTimeLeft] = useState(FOCUS_TIME_MINUTES * 60);
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [isFocusMinimized, setIsFocusMinimized] = useState(false); 

  // Avatar 
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarScale, setAvatarScale] = useState(1);
  const [avatarOffsetX, setAvatarOffsetX] = useState(0);
  const [avatarOffsetY, setAvatarOffsetY] = useState(0);
  const [avatarGender, setAvatarGender] = useState('male');
  const [avatarBg, setAvatarBg] = useState('auto');
  const [isAvatarControlsOpen, setIsAvatarControlsOpen] = useState(false);
  const currentPaths = avatarPaths[avatarGender];
  
  // Calendario
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dashboardFilter, setDashboardFilter] = useState('all'); 
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  
  // Modales
  const initialHabitState = { id: null, name: '', category: 'health', priority: 'Media', points: 10, timeEst: 15, date: selectedDate, isQuest: false };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState(initialHabitState);
  const [isSkillTreeOpen, setIsSkillTreeOpen] = useState(false);
  
  // Modal de Story (Academia)
  const [activeCapsule, setActiveCapsule] = useState(null);
  const [capsuleStep, setCapsuleStep] = useState(0);
  const [feynmanText, setFeynmanText] = useState('');
  const [quizSelected, setQuizSelected] = useState(null);
  const [tipIndex, setTipIndex] = useState(0); 

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 

  const th = {
    bgApp: isLightMode ? 'bg-slate-50 text-slate-800' : 'bg-[#030712] text-white',
    bgSidebar: isLightMode ? 'bg-white/95 border-slate-200' : 'bg-slate-950/90 border-slate-800/80',
    bgCard: isLightMode ? 'bg-white/80 border-slate-200' : 'bg-slate-900/60 border-slate-800',
    bgInner: isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800',
    bgHover: isLightMode ? 'hover:bg-slate-100' : 'hover:bg-slate-800',
    textMain: isLightMode ? 'text-slate-800' : 'text-white',
    textMuted: isLightMode ? 'text-slate-500' : 'text-gray-400',
    textMutedLight: isLightMode ? 'text-slate-400' : 'text-gray-500',
    border: isLightMode ? 'border-slate-200' : 'border-slate-800',
    modalOverlay: isLightMode ? 'bg-slate-900/40' : 'bg-black/80',
    modalBg: isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-cyan-900/50',
    avatarStroke: isLightMode ? '#94a3b8' : '#334155'
  };

  // --- EFECTOS ---
  useEffect(() => {
    if (currentView !== 'dashboard') return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentView]);

  useEffect(() => {
    let interval = null;
    if (isFocusActive && focusTimeLeft > 0) {
      interval = setInterval(() => { setFocusTimeLeft((prev) => prev - 1); }, 1000);
    } else if (focusTimeLeft === 0 && isFocusActive) {
      setIsFocusActive(false);
      setCoins(prev => prev + 50);
      addXp(activeCategory || 'work', 30);
      setFocusTimeLeft(FOCUS_TIME_MINUTES * 60);
      alert("¡Sesión de Enfoque Completada! +50 PE y +30 XP.");
    }
    return () => clearInterval(interval);
  }, [isFocusActive, focusTimeLeft, activeCategory]);

  useEffect(() => {
    setCategoryTab('tasks');
    setTipIndex(0); 
  }, [activeCategory]);

  useEffect(() => {
    if (currentView !== 'category') return;
    const interval = setInterval(() => {
      setTipIndex(prev => prev + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, [currentView, activeCategory]);

  useEffect(() => {
    if (activePopover && avatarContainerRef.current) {
      avatarContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activePopover]);

  // --- LÓGICA EXPORTACIÓN/IMPORTACIÓN CSV ---
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "TIPO,ID,NOMBRE,CATEGORIA,PRIORIDAD,PUNTOS,COMPLETADO,TIEMPO_EST,FECHA\n";
    habits.forEach(h => {
      csvContent += `HABITO,${h.id},"${h.name}",${h.category},${h.priority},${h.points},${h.completed},${h.timeEst},${h.date}\n`;
    });
    csvContent += "\nTIPO,CATEGORIA,NIVEL,XP,MAXXP\n";
    Object.entries(stats).forEach(([k, s]) => {
      csvContent += `STAT,${k},${s.level},${s.xp},${s.maxXp}\n`;
    });
    csvContent += `\nTIPO,MONEDAS,RACHA\nGLOBAL,${coins},${streak}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `YoHabito_Data_${getTodayStr()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      let newHabits = [];
      let newStats = { ...initialStats };
      let newCoins = coins;
      let newStreak = streak;

      lines.forEach(line => {
        if (!line.trim()) return;
        const parts = line.split(',');
        if (parts[0] === 'HABITO' && parts.length >= 9) {
           newHabits.push({ id: parseInt(parts[1]), name: parts[2].replace(/"/g, ''), category: parts[3], priority: parts[4], points: parseInt(parts[5]), completed: parts[6] === 'true', timeEst: parseInt(parts[7]), date: parts[8].trim() });
        } else if (parts[0] === 'STAT' && parts.length >= 5) {
           if (newStats[parts[1]]) { newStats[parts[1]] = { ...newStats[parts[1]], level: parseInt(parts[2]), xp: parseInt(parts[3]), maxXp: parseInt(parts[4]) }; }
        } else if (parts[0] === 'GLOBAL' && parts.length >= 3) {
           newCoins = parseInt(parts[1]) || 0; newStreak = parseInt(parts[2]) || 0;
        }
      });
      
      setHabits(newHabits); setStats(newStats); setCoins(newCoins); setStreak(newStreak);
      alert(t.importSuccess);
    };
    reader.readAsText(file);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- NAVEGACIÓN ---
  const scrollToTop = () => { mainScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToCategory = (categoryId) => { setActiveCategory(categoryId); setCurrentView('category'); setActivePopover(null); scrollToTop(); };
  const navigateToDashboard = () => { setCurrentView('dashboard'); setActiveCategory(null); setActivePopover(null); scrollToTop(); };
  const navigateToStore = () => { setCurrentView('store'); setActivePopover(null); scrollToTop(); };
  const navigateToCalendar = () => { setCurrentView('calendar'); setActivePopover(null); scrollToTop(); };
  const navigateToSkillMap = () => { setCurrentView('skillMap'); setActivePopover(null); scrollToTop(); };

  // --- FUNCIONES SECUNDARIAS ---
  const toggleFocus = () => setIsFocusActive(!isFocusActive);
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60); const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } else { setCurrentMonth(currentMonth - 1); } };
  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } else { setCurrentMonth(currentMonth + 1); } };
  const handleDayClick = (day) => {
    const newDateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    setSelectedDate(newDateStr); setDashboardFilter('all'); 
  };

  const addXp = (category, amount) => {
    setStats(prevStats => {
      const stat = prevStats[category];
      let newXp = stat.xp + amount;
      let newLevel = stat.level;
      let newMaxXp = stat.maxXp;
      if (newXp >= newMaxXp) {
        newLevel += 1; newXp = newXp - newMaxXp; newMaxXp = Math.floor(newMaxXp * 1.5);
      }
      return { ...prevStats, [category]: { ...stat, level: newLevel, xp: newXp, maxXp: newMaxXp } };
    });
  };

  const completeHabit = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id && !habit.completed) {
        addXp(habit.category, habit.points);
        setCoins(prev => prev + Math.floor(habit.points / 2));
        return { ...habit, completed: true };
      }
      return habit;
    }));
  };

  const handleBuyItem = (item) => {
    if (coins >= item.price && !inventory.includes(item.id)) {
      setCoins(prev => prev - item.price); setInventory([...inventory, item.id]);
    }
  };

  const handleEquipItem = (item) => {
    setEquipped(prev => ({ ...prev, [item.type]: prev[item.type]?.id === item.id ? null : item }));
  };

  const handleSaveHabit = () => {
    if (newHabit.name.trim() === '') return;
    if (newHabit.id) {
      setHabits(habits.map(h => h.id === newHabit.id ? newHabit : h));
    } else {
      setHabits([...habits, { ...newHabit, id: Date.now(), completed: false }]);
    }
    setIsModalOpen(false);
    setNewHabit({ ...initialHabitState, date: selectedDate });
  };

  const editHabit = (habit) => { setNewHabit(habit); setIsModalOpen(true); };
  const deleteHabit = (id) => { setHabits(habits.filter(h => h.id !== id)); };
  const resetHabit = (id) => { setHabits(habits.map(h => h.id === id ? { ...h, completed: false } : h)); };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url); setAvatarOffsetX(0); setAvatarOffsetY(0); setAvatarScale(1);
    }
  };
  const removeAvatar = () => { setAvatarUrl(null); };

  // --- ACADEMY STORY LOGIC ---
  const openCapsule = (capsule) => {
    setActiveCapsule(capsule); setCapsuleStep(0); setQuizSelected(null); setFeynmanText('');
  };
  const closeCapsule = () => { setActiveCapsule(null); };
  const nextCapsuleStep = () => { if (capsuleStep < activeCapsule.slides.length + 1) setCapsuleStep(prev => prev + 1); };
  const prevCapsuleStep = () => { if (capsuleStep > 0) setCapsuleStep(prev => prev - 1); };

  const completeCapsule = () => {
    if (!completedCapsules.includes(activeCapsule.id)) {
      setCompletedCapsules([...completedCapsules, activeCapsule.id]);
      if (activeCapsule.challenge) {
        const newQuest = {
          id: Date.now(), name: `[RETO] ${activeCapsule.challenge.name}`, category: activeCategory || 'learning',
          priority: activeCapsule.challenge.priority || 'Alta', points: activeCapsule.challenge.points || 30,
          completed: false, timeEst: activeCapsule.challenge.timeEst || 10, date: getTodayStr(), isQuest: true
        };
        setHabits([...habits, newQuest]);
      }
      addXp(activeCategory || 'learning', 50);
      setCoins(prev => prev + (activeCapsule.rewardCoins || 20));
      alert(`¡Cápsula Completada!\nHas ganado 50 XP, ${activeCapsule.rewardCoins || 20} PE y se ha añadido un Reto a tus tareas.`);
    }
    closeCapsule();
  };

  // --- SKILL MAP LOGIC ---
  const unlockSkill = (nodeId) => {
    if (!unlockedSkills.includes(nodeId)) {
       setUnlockedSkills([...unlockedSkills, nodeId]);
       setCoins(prev => prev - 100); 
       alert("¡Habilidad Desbloqueada! Efectos pasivos activos.");
    }
  };

  // --- COMPONENTES RENDERIZADORES COMPARTIDOS (INLINE) ---
  const renderStatCard = ({ icon: Icon, value, label, color, glow, isActive, onClick }) => (
    <div onClick={onClick} className={`${th.bgCard} backdrop-blur-md border rounded-xl p-4 flex items-center gap-4 relative overflow-hidden group cursor-pointer transition-all duration-300 ${isActive ? `border-[color:var(--glow-color)] shadow-[0_0_20px_var(--glow-color)] scale-105` : `hover:${th.border}`}`} style={{ '--glow-color': color }}>
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl transition-opacity ${isActive ? 'opacity-50' : 'opacity-20 group-hover:opacity-40'}`} style={{ backgroundColor: glow }}></div>
      <div className={`p-3 rounded-lg ${th.bgInner} ${th.border} z-10 transition-transform group-hover:scale-110`}><Icon size={20} style={{ color: color }} /></div>
      <div className="z-10"><div className={`text-2xl font-black font-mono tracking-wider ${th.textMain}`}>{value}</div><div className={`text-[10px] ${th.textMuted} uppercase font-bold tracking-widest`}>{label}</div></div>
    </div>
  );

  const renderHabitItem = (habit) => (
    <div key={habit.id} className={`p-4 rounded-xl border transition-all group relative overflow-hidden ${habit.completed ? `${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/30 border-slate-800/50'} opacity-60` : `${isLightMode ? 'bg-white hover:border-slate-300 shadow-sm' : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:shadow-lg'}`} ${habit.isQuest ? 'border-yellow-500/50' : ''}`} onMouseEnter={() => setHoveredPart(habit.category)} onMouseLeave={() => setHoveredPart(null)}>
      {habit.isQuest && <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500"></div>}
      <div className="flex items-start justify-between pl-2">
        <div className="flex items-start gap-4">
          <button onClick={() => completeHabit(habit.id)} disabled={habit.completed} className="mt-0.5 shrink-0">
            {habit.completed ? <CheckCircle2 size={20} className="text-green-500" /> : <Circle size={20} className={`${th.textMuted} hover:text-cyan-500 transition-colors`} />}
          </button>
          <div>
            <p className={`text-sm font-semibold ${habit.completed ? `line-through ${th.textMutedLight}` : th.textMain}`}>{habit.name}</p>
            <div className="flex gap-2 mt-2">
              <span className={`text-[10px] px-2 py-0.5 rounded ${th.bgInner} ${th.textMuted} ${th.border} uppercase font-medium`}>{t[habit.category] || habit.category}</span>
              {habit.isQuest && <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold bg-yellow-900/20 text-yellow-500 border-yellow-900/50`}>Misión</span>}
            </div>
          </div>
        </div>
        <div className="text-right flex flex-col items-end justify-center h-full">
          <div className="group-hover:hidden flex flex-col items-end">
            <span className="block text-xs font-bold text-cyan-500">+{habit.points} XP</span>
            <span className={`block text-[10px] ${th.textMuted} flex items-center justify-end gap-1 mt-1 font-mono`}><Clock size={12}/> {habit.timeEst}m</span>
          </div>
          <div className="hidden group-hover:flex items-center gap-2 h-full my-auto">
            {habit.completed && (
               <button onClick={() => resetHabit(habit.id)} className={`p-2 ${th.bgInner} ${th.hover} ${th.textMuted} hover:text-cyan-500 rounded-lg transition-colors`} title="Restablecer"><RotateCcw size={16} /></button>
            )}
            <button onClick={() => editHabit(habit)} className={`p-2 ${th.bgInner} hover:bg-cyan-900/20 ${th.textMuted} hover:text-cyan-500 rounded-lg transition-colors`} title={t.editTask}><Edit2 size={16} /></button>
            <button onClick={() => deleteHabit(habit.id)} className={`p-2 ${th.bgInner} hover:bg-red-900/20 ${th.textMuted} hover:text-red-500 rounded-lg transition-colors`} title="Eliminar"><Trash2 size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRpgBar = ({ category, label, statData }) => {
    const progress = (statData.xp / statData.maxXp) * 100;
    const isHovered = hoveredPart === category;
    const Icon = statData.icon;
    const colorClass = statData.color;
    
    return (
      <div 
        className={`mb-3 cursor-pointer transition-all duration-300 p-2 rounded-lg border border-transparent ${isHovered ? `${th.hover} shadow-[0_0_10px_var(--neon-color)]` : th.hover}`}
        style={{ '--neon-color': colorClass, borderColor: isHovered ? colorClass : 'transparent' }}
        onMouseEnter={() => setHoveredPart(category)}
        onMouseLeave={() => setHoveredPart(null)}
        onClick={() => navigateToCategory(category)}
      >
        <div className="flex items-center justify-between mb-1">
          <div className={`flex items-center text-xs font-bold tracking-wider ${th.textMain}`}><Icon size={14} className="mr-2" style={{ color: colorClass }} />{label}<span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] ${th.bgInner} ${th.textMain} font-mono ${th.border}`}>{t.level} {statData.level}</span></div>
          <span className={`text-[10px] ${th.textMuted} font-mono`}>{statData.xp}/{statData.maxXp} XP</span>
        </div>
        <div className={`w-full ${isLightMode ? 'bg-slate-200' : 'bg-slate-900'} rounded-full h-1.5 overflow-hidden ${th.border}`}>
          <div className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]" style={{ width: `${progress}%`, backgroundColor: colorClass }}></div>
        </div>
      </div>
    );
  };

  const renderAvatarGlassBtn = ({ id, label, statData, top, left, right, bottom }) => {
    const isHovered = hoveredPart === id;
    const Icon = statData.icon;
    const color = statData.color;

    return (
      <button
        onClick={(e) => { e.stopPropagation(); setActivePopover(id); }}
        onMouseEnter={() => setHoveredPart(id)}
        onMouseLeave={() => setHoveredPart(null)}
        className={`absolute flex items-center gap-3 transition-all duration-300 hover:scale-110 z-30 p-2.5 rounded-2xl
          ${isHovered ? 'bg-white/20 border-white/40 drop-shadow-[0_0_20px_var(--btn-color)]' : 'bg-slate-900/30 border-white/10'}
          backdrop-blur-md border shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        `}
        style={{ top, left, right, bottom, '--btn-color': color }}
      >
         <div className="p-1.5 rounded-lg bg-black/40 shadow-inner" style={{ color: color }}>
           <Icon size={16} />
         </div>
         <div className="text-left">
           <div className="text-[10px] font-black tracking-wider text-white uppercase drop-shadow-md">
             {label}
           </div>
           <div className="text-[9px] font-mono text-white/80">
             LVL {statData.level}
           </div>
         </div>
      </button>
    )
  };

  const renderAvatarSection = () => {
    const currentAura = equipped.aura;
    const currentTitle = equipped.title;
    const currentDrone = equipped.drone;
    
    let currentBgUrl = null;
    if (equipped.bg) { currentBgUrl = equipped.bg.url; } 
    else if (avatarBg === 'auto') {
        const contextCategory = hoveredPart || activeCategory;
        if (contextCategory && categoryBackgrounds[contextCategory]) { currentBgUrl = categoryBackgrounds[contextCategory]; }
    } else if (categoryBackgrounds[avatarBg]) { currentBgUrl = categoryBackgrounds[avatarBg]; }

    return (
      <div className="flex flex-col gap-6 relative" ref={avatarContainerRef}>
        <div className={`relative flex items-center justify-center h-[550px] ${isLightMode ? 'bg-slate-200/50' : 'bg-slate-900/20'} rounded-3xl ${th.border} shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] overflow-hidden`}>
          
          {/* FONDOS Equipados */}
          {currentBgUrl ? (
            <div className="absolute inset-0 bg-cover bg-center opacity-50 z-0 transition-all duration-1000" style={{ backgroundImage: `url(${currentBgUrl})` }}></div>
          ) : (
            <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${isLightMode ? 'from-cyan-100/50' : 'from-cyan-900/10'} via-transparent to-transparent pointer-events-none z-0`}></div>
          )}

          {/* TÍTULO Equipado */}
          {currentTitle && (
            <div className="absolute top-10 z-30 bg-black/60 border border-white/20 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] backdrop-blur-md animate-pulse flex items-center gap-2">
              <Crown size={12} className="text-yellow-400" /><span className="text-[10px] font-black uppercase tracking-widest text-white">{currentTitle.name}</span>
            </div>
          )}

          {/* AURAS Equipadas */}
          {currentAura && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-40 z-0 animate-pulse" style={{ backgroundColor: currentAura.color }}></div>}
          
          {/* DRONES Equipados */}
          {currentDrone && (
            <div className="absolute top-1/3 right-1/4 z-20 animate-[bounce_3s_ease-in-out_infinite] text-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
               <Crosshair size={32} /><div className="w-8 h-1 bg-cyan-500/30 blur-md rounded-full mt-10 mx-auto opacity-50 scale-x-150"></div>
            </div>
          )}

          <button onClick={(e) => { e.stopPropagation(); setIsAvatarControlsOpen(!isAvatarControlsOpen); }} className={`absolute bottom-20 right-6 md:right-8 z-50 p-3 ${th.bgCard} backdrop-blur-md ${th.border} rounded-full ${th.textMuted} hover:text-cyan-500 transition-all shadow-xl group`} title="Configurar Avatar">
            <UserCog size={22} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button onClick={(e) => { e.stopPropagation(); navigateToStore(); }} className={`absolute bottom-20 left-6 md:left-8 z-50 p-3 ${th.bgCard} backdrop-blur-md ${th.border} rounded-full ${th.textMuted} hover:text-yellow-500 transition-all shadow-xl group`} title={t.shop}>
            <Store size={22} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Menú de Controles de Avatar */}
          {isAvatarControlsOpen && (
            <div className={`absolute bottom-36 right-6 md:right-8 z-40 flex flex-col items-end ${th.bgCard} p-4 rounded-2xl ${th.border} backdrop-blur-xl shadow-2xl w-60 animate-in fade-in slide-in-from-bottom-2 origin-bottom-right`} onClick={(e) => e.stopPropagation()}>
               <span className={`text-[9px] font-bold ${th.textMutedLight} uppercase tracking-widest w-full mb-1 border-b ${th.border} pb-1`}>Entorno / Fondo</span>
               <select value={avatarBg} onChange={(e) => setAvatarBg(e.target.value)} className={`w-full mb-3 p-2 ${th.bgInner} rounded-lg ${th.border} text-xs font-bold ${th.textMain} outline-none focus:border-cyan-500`}>
                  <option value="auto">Automático</option><option value="learning">Biblioteca</option><option value="health">Gimnasio</option><option value="nutrition">Naturaleza</option><option value="rest">Santuario</option><option value="economy">Metrópolis</option><option value="psychology">Jardín Zen</option><option value="work">Oficina Cyber</option><option value="leisure">Arcade Neón</option>
               </select>

               <span className={`text-[9px] font-bold ${th.textMutedLight} uppercase tracking-widest w-full mb-1 border-b ${th.border} pb-1`}>Tipo de Holograma</span>
               <select value={avatarGender} onChange={(e) => setAvatarGender(e.target.value)} className={`w-full mb-3 p-2 ${th.bgInner} rounded-lg ${th.border} text-xs font-bold ${th.textMain} outline-none focus:border-cyan-500`}>
                  <option value="male">{t.masc}</option><option value="female">{t.fem}</option><option value="alien">{t.alien}</option><option value="dino">{t.dino}</option><option value="ogre">{t.ogre}</option><option value="robot">{t.robot}</option><option value="pet">{t.pet}</option>
               </select>

               <span className={`text-[9px] font-bold ${th.textMutedLight} uppercase tracking-widest w-full mb-1 border-b ${th.border} pb-1`}>Imagen Personalizada</span>
               <input type="file" ref={avatarInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
               
               {avatarUrl ? (
                 <div className="w-full flex gap-2 mt-1">
                   <button onClick={() => avatarInputRef.current.click()} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-bold ${th.textMain} ${th.bgInner} ${th.hover} transition-all ${th.border}`}><Edit2 size={12} /> Cambiar</button>
                   <button onClick={removeAvatar} className="px-3 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-all border border-red-700"><Trash2 size={14} /></button>
                 </div>
               ) : (
                 <button onClick={() => avatarInputRef.current.click()} className="flex items-center gap-2 py-2 mt-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all w-full justify-center shadow-lg"><ImageIcon size={14} /> {t.changeAvatar}</button>
               )}
               
               {avatarUrl && (
                 <div className={`w-full mt-3 pt-3 border-t ${th.border} flex flex-col gap-3`}>
                   <div className="flex items-center gap-2 w-full"><ZoomIn size={14} className={`${th.textMuted} shrink-0`}/><input type="range" min="0.5" max="3" step="0.1" value={avatarScale} onChange={(e) => setAvatarScale(parseFloat(e.target.value))} className={`w-full accent-cyan-500 h-1 ${th.bgInner} rounded-lg appearance-none cursor-pointer`} /></div>
                   <div className="flex items-center justify-center gap-2 mt-1"><Move size={14} className={`${th.textMuted} shrink-0`}/>
                     <div className="grid grid-cols-3 gap-1 w-24">
                       <div></div><button onClick={() => setAvatarOffsetY(y => y - 10)} className={`${th.bgInner} ${th.hover} hover:text-cyan-500 rounded p-1 flex justify-center`}><ChevronLeft className="rotate-90" size={14}/></button><div></div>
                       <button onClick={() => setAvatarOffsetX(x => x - 10)} className={`${th.bgInner} ${th.hover} hover:text-cyan-500 rounded p-1 flex justify-center`}><ChevronLeft size={14}/></button>
                       <div className={`flex items-center justify-center text-[8px] ${th.textMutedLight} font-bold`}>POS</div>
                       <button onClick={() => setAvatarOffsetX(x => x + 10)} className={`${th.bgInner} ${th.hover} hover:text-cyan-500 rounded p-1 flex justify-center`}><ChevronRight size={14}/></button>
                       <div></div><button onClick={() => setAvatarOffsetY(y => y + 10)} className={`${th.bgInner} ${th.hover} hover:text-cyan-500 rounded p-1 flex justify-center`}><ChevronRight className="rotate-90" size={14}/></button><div></div>
                     </div>
                   </div>
                 </div>
               )}
            </div>
          )}

          {/* Botones Etiquetas */}
          {Object.entries(stats).map(([key, stat], idx) => {
             const positions = [
               { top: '8%', left: '4%' }, { top: '8%', right: '4%' }, { top: '32%', left: '2%' }, { top: '45%', right: '2%' },
               { bottom: '28%', left: '4%' }, { bottom: '28%', right: '4%' }, { bottom: '8%', left: '15%' }, { bottom: '8%', right: '15%' }
             ];
             return (
                <div key={key}>{renderAvatarGlassBtn({ id: key, label: t[key] || key, statData: stat, ...positions[idx] })}</div>
             )
          })}

          <div className="relative z-10 w-full h-full flex items-center justify-center pt-8 overflow-hidden pointer-events-none">
            {avatarUrl && (
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mix-blend-screen opacity-90">
                 <img src={avatarUrl} alt="Avatar" className="max-w-none max-h-none object-contain mt-8 mask-image-gradient transition-transform duration-200 pointer-events-auto" style={{ transform: `scale(${avatarScale}) translate(${avatarOffsetX}px, ${avatarOffsetY}px)`, WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }} />
              </div>
            )}
            <svg viewBox="0 0 300 500" className="relative z-10 w-[65%] max-w-[300px] h-auto overflow-visible drop-shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-500 pointer-events-auto">
              <defs>
                <filter id="glow-strong" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor={isLightMode ? "#cbd5e1" : "#1e293b"} />
                   <stop offset="100%" stopColor={isLightMode ? "#94a3b8" : "#0f172a"} />
                </linearGradient>
              </defs>
              {!avatarUrl && (
                <g stroke={th.avatarStroke} strokeWidth="1" fill="url(#bodyGrad)" className="transition-all duration-500">
                  <path d={currentPaths.shoulders} /><path d={currentPaths.chest} /><path d={currentPaths.stomach} /><path d={currentPaths.leftArm} /><path d={currentPaths.rightArm} /><polygon points={currentPaths.head} />
                </g>
              )}
              <polygon points={currentPaths.head} fill={(hoveredPart === 'learning' || hoveredPart === 'psychology') ? "#22d3ee" : "transparent"} opacity={(hoveredPart === 'learning' || hoveredPart === 'psychology') ? "0.6" : "1"} stroke="#22d3ee" strokeWidth={(hoveredPart === 'learning' || hoveredPart === 'psychology') ? "3" : "1"} filter={(hoveredPart === 'learning' || hoveredPart === 'psychology') ? "url(#glow-strong)" : ""} onMouseEnter={() => setHoveredPart('learning')} onMouseLeave={() => setHoveredPart(null)} onClick={(e) => { e.stopPropagation(); setActivePopover('learning'); }} className="cursor-pointer transition-all duration-300"/>
              <path d={currentPaths.chest} fill={hoveredPart === 'health' ? "#ec4899" : "transparent"} opacity={hoveredPart === 'health' ? "0.5" : "1"} stroke="#ec4899" strokeWidth={hoveredPart === 'health' ? "3" : "1"} filter={hoveredPart === 'health' ? "url(#glow-strong)" : ""} onMouseEnter={() => setHoveredPart('health')} onMouseLeave={() => setHoveredPart(null)} onClick={(e) => { e.stopPropagation(); setActivePopover('health'); }} className="cursor-pointer transition-all duration-300"/>
              <path d={currentPaths.stomach} fill={hoveredPart === 'nutrition' ? "#4ade80" : "transparent"} opacity={hoveredPart === 'nutrition' ? "0.5" : "1"} stroke="#4ade80" strokeWidth={hoveredPart === 'nutrition' ? "3" : "1"} filter={hoveredPart === 'nutrition' ? "url(#glow-strong)" : ""} onMouseEnter={() => setHoveredPart('nutrition')} onMouseLeave={() => setHoveredPart(null)} onClick={(e) => { e.stopPropagation(); setActivePopover('nutrition'); }} className="cursor-pointer transition-all duration-300"/>
              <path d={currentPaths.leftArm} fill={hoveredPart === 'economy' ? "#eab308" : "transparent"} opacity={hoveredPart === 'economy' ? "0.5" : "1"} stroke="#eab308" strokeWidth={hoveredPart === 'economy' ? "3" : "1"} filter={hoveredPart === 'economy' ? "url(#glow-strong)" : ""} onMouseEnter={() => setHoveredPart('economy')} onMouseLeave={() => setHoveredPart(null)} onClick={(e) => { e.stopPropagation(); setActivePopover('economy'); }} className="cursor-pointer transition-all duration-300"/>
              <path d={currentPaths.rightArm} fill={hoveredPart === 'rest' ? "#a78bfa" : "transparent"} opacity={hoveredPart === 'rest' ? "0.5" : "1"} stroke="#a78bfa" strokeWidth={hoveredPart === 'rest' ? "3" : "1"} filter={hoveredPart === 'rest' ? "url(#glow-strong)" : ""} onMouseEnter={() => setHoveredPart('rest')} onMouseLeave={() => setHoveredPart(null)} onClick={(e) => { e.stopPropagation(); setActivePopover('rest'); }} className="cursor-pointer transition-all duration-300"/>
            </svg>
          </div>

          {/* POPOVER DE CATEGORÍA INTERACTIVA */}
          {activePopover && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] animate-in fade-in zoom-in-95 duration-200">
               <div className={`${th.bgCard} backdrop-blur-2xl border ${th.border} rounded-3xl p-6 w-[280px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col items-center text-center`}>
                  <button onClick={(e) => { e.stopPropagation(); setActivePopover(null); }} className={`absolute top-3 right-3 ${th.textMuted} ${th.hover} transition-colors ${th.bgInner} rounded-full p-1`}><span className="leading-none w-4 h-4 flex items-center justify-center font-bold">&times;</span></button>
                  {(() => {
                     const stat = stats[activePopover];
                     const data = categoryData[activePopover] || { desc: "" };
                     const Icon = stat.icon;
                     return (
                       <>
                         <div className={`p-3 rounded-2xl ${th.bgInner} border-2 shadow-lg mb-3`} style={{ borderColor: stat.color, color: stat.color }}><Icon size={28} /></div>
                         <h3 className={`text-xl font-black uppercase tracking-widest ${th.textMain} mb-2`} style={{ textShadow: `0 0 10px ${stat.color}40` }}>{t[activePopover]}</h3>
                         <p className={`text-xs ${th.textMuted} mb-6 font-medium leading-relaxed`}>{data.desc}</p>
                         <button onClick={(e) => { e.stopPropagation(); setActivePopover(null); navigateToCategory(activePopover); }} className="w-full py-2.5 rounded-xl font-bold text-xs text-white uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:scale-[1.02]" style={{ backgroundColor: stat.color, boxShadow: `0 5px 20px ${stat.color}50` }}>{t.enterSection}</button>
                       </>
                     )
                  })()}
               </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- VISTAS COMPLETAS ---
  const renderDashboardView = () => {
    const habitsForSelectedDate = habits.filter(h => h.date === selectedDate);
    const pendingCount = habitsForSelectedDate.filter(h => !h.completed).length;
    const urgentCount = habitsForSelectedDate.filter(h => !h.completed && h.priority === 'Alta').length;
    const completedCount = habitsForSelectedDate.filter(h => h.completed).length;
    const totalMinutes = habitsForSelectedDate.filter(h => !h.completed).reduce((acc, curr) => acc + (curr.timeEst || 15), 0);
    const estTimeString = `${Math.floor(totalMinutes / 60) > 0 ? `${Math.floor(totalMinutes / 60)}h ` : ''}${totalMinutes % 60}m`;

    const filteredHabits = habitsForSelectedDate.filter(h => {
      if (dashboardFilter === 'pending') return !h.completed;
      if (dashboardFilter === 'urgent') return !h.completed && h.priority === 'Alta';
      if (dashboardFilter === 'completed') return h.completed;
      return true;
    });

    const handleDashboardFilter = (filterName) => {
      setDashboardFilter(dashboardFilter === filterName ? 'all' : filterName);
      setTimeout(() => { habitsPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
    };

    return (
      <>
        {/* BANNER PROMOCIONAL */}
        <div className={`relative w-full h-64 md:h-72 overflow-hidden shrink-0 group border-b ${th.border}`}>
          {banners.map((b, i) => (
             <div key={b.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentBanner === i ? 'opacity-100' : 'opacity-0'}`}>
               <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${b.image})` }}></div>
               <div className={`absolute inset-0 bg-gradient-to-r ${isLightMode ? 'from-white via-white/80' : 'from-[#030712] via-[#030712]/80'} to-transparent`}></div>
               <div className={`absolute inset-0 bg-gradient-to-t ${isLightMode ? 'from-white' : 'from-[#030712]'} to-transparent`}></div>
               <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 tracking-tight mb-4 drop-shadow-lg">
                    {i === 0 ? `¡Bienvenidos a ${t.appTitle}!` : b.title}
                  </h1>
                  <p className={`text-sm md:text-base ${th.textMain} font-medium leading-relaxed drop-shadow-md`}>{b.desc}</p>
               </div>
             </div>
          ))}
          <div className="absolute bottom-6 left-8 md:left-16 flex gap-2 z-20">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setCurrentBanner(i)} className={`h-1.5 rounded-full transition-all duration-500 ${currentBanner === i ? 'bg-cyan-500 w-8 shadow-[0_0_8px_#22d3ee]' : 'bg-gray-400 hover:bg-gray-500 w-2'}`}></button>
            ))}
          </div>
        </div>

        {/* STATUS BAR RÁPIDO */}
        <div className="p-6 md:px-8 flex justify-end shrink-0 -mt-16 z-20 relative">
          <div className={`flex items-center gap-4 ${th.bgCard} backdrop-blur-md p-2.5 rounded-2xl border shadow-xl`}>
            <div className="flex flex-col items-center px-3 group cursor-help" title="Días seguidos cumpliendo metas">
              <span className={`text-[9px] ${th.textMuted} uppercase font-bold`}>Racha</span>
              <span className="text-lg font-black text-orange-500 font-mono leading-none mt-1 flex items-center gap-1">
                <Zap size={14} className="fill-orange-500" /> {streak}
              </span>
            </div>
            <div className={`w-px h-8 ${th.border}`}></div>
            <div className="flex flex-col items-center px-3">
              <span className={`text-[9px] ${th.textMuted} uppercase font-bold`}>{t.level} Global</span>
              <span className="text-lg font-black text-cyan-500 font-mono leading-none mt-1">
                {Object.values(stats).reduce((acc, curr) => acc + curr.level, 0)}
              </span>
            </div>
            <div className={`w-px h-8 ${th.border}`}></div>
            <div onClick={navigateToStore} className={`flex flex-col items-center px-3 cursor-pointer ${th.hover} rounded-xl transition-colors py-1 group`}>
              <span className={`text-[9px] ${th.textMuted} uppercase font-bold flex items-center gap-1 group-hover:text-cyan-500`}><Star size={8} className="text-yellow-500 group-hover:animate-spin"/> {t.points}</span>
              <span className="text-lg font-black text-yellow-500 font-mono leading-none mt-1">{coins}</span>
            </div>
          </div>
        </div>

        {/* FILA DE ESTADÍSTICAS */}
        <div className="px-6 md:px-8 mb-6 grid grid-cols-2 md:grid-cols-5 gap-4 shrink-0">
          {renderStatCard({ icon: ListTodo, value: pendingCount, label: t.pending, color: "#06b6d4", glow: "#06b6d4", isActive: dashboardFilter === 'pending', onClick: () => handleDashboardFilter('pending') })}
          {renderStatCard({ icon: AlertCircle, value: urgentCount, label: t.urgent, color: "#ec4899", glow: "#ec4899", isActive: dashboardFilter === 'urgent', onClick: () => handleDashboardFilter('urgent') })}
          {renderStatCard({ icon: Clock, value: estTimeString, label: t.estimatedTime, color: "#eab308", glow: "#eab308" })}
          {renderStatCard({ icon: CheckSquare, value: completedCount, label: t.completed, color: "#22c55e", glow: "#22c55e", isActive: dashboardFilter === 'completed', onClick: () => handleDashboardFilter('completed') })}
          
          <div onClick={navigateToCalendar} className={`${th.bgCard} backdrop-blur-md border hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all group scale-100 hover:scale-105`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BarChart2 size={14} className="text-purple-500 group-hover:animate-pulse" />
                <span className={`text-[10px] ${th.textMutedLight} uppercase font-bold tracking-widest group-hover:text-purple-500`}>{t.weeklyPerf}</span>
              </div>
              <CalendarDays size={12} className={`${th.textMuted} group-hover:text-purple-500`} />
            </div>
            <div className="flex items-end justify-between gap-1 flex-1">
              {[40, 70, 45, 90, 60, 80, 50].map((val, i) => (
                <div key={i} className={`w-full ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'} rounded-sm relative h-full`}>
                  <div className="absolute bottom-0 w-full bg-purple-500/50 rounded-sm transition-all group-hover:bg-purple-500" style={{ height: `${val}%` }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NUEVA CABECERA MINIMALISTA PARA EL AVATAR */}
        <div className="px-6 md:px-8 mb-6">
          <div className={`relative overflow-hidden rounded-2xl ${th.bgCard} border ${th.border} p-5 md:p-6 shadow-[0_0_20px_rgba(6,182,212,0.1)]`}>
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-fuchsia-500"></div>
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pl-3">
                <div>
                  <h2 className="text-lg md:text-xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-2 mb-1">
                    <UserCog size={20} className="text-cyan-400" />
                    Tu Identidad Digital
                  </h2>
                  <p className={`text-xs ${th.textMuted} max-w-3xl leading-relaxed font-medium`}>
                    Este es tu reflejo en el sistema. A medida que completas misiones y hábitos, tu avatar acumulará experiencia. Equípalo con las recompensas de la tienda para forjar tu evolución.
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* GRID DASHBOARD */}
        <div className="px-6 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          {/* COLUMNA 1: AVATAR EXTRAÍDO */}
          {renderAvatarSection()}

          {/* COLUMNA 2: Hábitos y Calendario Rápido */}
          <div className="flex flex-col gap-6">
            <div ref={habitsPanelRef} className={`${th.bgCard} backdrop-blur-md rounded-2xl p-6 border shadow-xl flex-1 min-h-[350px] flex flex-col`}>
              <div className={`flex justify-between items-center mb-5 border-b ${th.border} pb-3`}>
                <h2 className={`text-xs font-bold ${th.textMuted} flex items-center gap-2 flex-wrap`}>
                  <span className="w-2 h-2 rounded-full bg-fuchsia-500 mr-1 shadow-[0_0_8px_#d946ef]"></span>
                  {t.habitsList}
                  {dashboardFilter !== 'all' && (
                     <button onClick={() => setDashboardFilter('all')} className={`ml-2 px-2 py-0.5 rounded ${th.bgInner} text-cyan-500 ${th.hover} text-[10px] uppercase border border-cyan-500/50 flex items-center gap-1 transition-colors`}>
                        Filtro: {t[dashboardFilter] || dashboardFilter} <span className={`${th.textMuted} hover:text-red-500`}>×</span>
                     </button>
                  )}
                  <span className={`ml-2 text-[10px] ${th.textMuted} font-mono ${th.bgInner} px-2 py-1 rounded border ${th.border}`}>{selectedDate}</span>
                </h2>
                <button onClick={() => { setNewHabit({...initialHabitState, date: selectedDate}); setIsModalOpen(true); }} className={`${isLightMode ? 'bg-cyan-50' : 'bg-cyan-900/40'} hover:bg-cyan-500/20 text-cyan-500 p-2 px-4 rounded-lg transition-colors border border-cyan-500/50 flex items-center gap-2 text-xs font-bold shrink-0`}><Plus size={16} /> {t.addHabit}</button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {filteredHabits.length === 0 ? (
                   <div className={`text-center flex flex-col items-center justify-center ${th.textMutedLight} text-xs py-12 h-full border-2 border-dashed ${th.border} rounded-xl ${th.bgInner}`}><ListTodo size={40} className="mb-4 opacity-50" />No hay tareas para este filtro.</div>
                ) : (
                  filteredHabits.map(habit => renderHabitItem(habit))
                )}
              </div>
            </div>

            <div className={`${th.bgCard} backdrop-blur-md rounded-2xl p-5 border shadow-xl transition-all duration-300`}>
              <div className="flex justify-between items-center cursor-pointer group" onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}>
                <h2 className={`text-xs font-bold ${th.textMuted} flex items-center`}>
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_#3b82f6]"></span>
                  {t.calendar} 
                  {!isCalendarExpanded && <span className={`ml-3 text-[10px] font-mono text-cyan-500`}>{selectedDate}</span>}
                </h2>
                <div className="flex items-center gap-3">
                   <button onClick={(e) => { e.stopPropagation(); navigateToCalendar(); }} className={`text-[9px] uppercase font-bold text-blue-500 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block`}>Ver Detalle Completo</button>
                   <div className={`p-1.5 rounded-lg ${th.bgInner} ${th.textMuted} group-hover:text-cyan-500 transition-colors`}>
                     {isCalendarExpanded ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
                   </div>
                </div>
              </div>

              {isCalendarExpanded && (
                <div className={`mt-5 pt-4 border-t ${th.border} animate-in fade-in slide-in-from-top-2`}>
                  <div className={`flex justify-between items-center mb-4`}>
                    <div className={`flex gap-2 ${th.textMuted} items-center ${th.bgInner} px-2 py-1 rounded-lg border ${th.border}`} onClick={(e) => e.stopPropagation()}>
                      <button onClick={prevMonth} className={`p-1 ${th.hover} hover:text-cyan-500 rounded transition-colors`}><ChevronLeft size={16} /></button>
                      <span className={`text-xs font-bold w-24 text-center uppercase tracking-wider ${th.textMain}`}>{t.months[currentMonth]} {currentYear}</span>
                      <button onClick={nextMonth} className={`p-1 ${th.hover} hover:text-cyan-500 rounded transition-colors`}><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <div className={`grid grid-cols-7 gap-2 text-center text-[10px] font-bold ${th.textMutedLight} mb-3 border-b ${th.border} pb-2`}><div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div><div>D</div></div>
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(startDay)].map((_, i) => (<div key={`empty-${i}`} className="aspect-square rounded-lg border border-transparent"></div>))}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1;
                      const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                      const isSelected = selectedDate === dateStr;
                      const dayTasks = habits.filter(h => h.date === dateStr);
                      const hasTasks = dayTasks.length > 0;
                      const allCompleted = hasTasks && dayTasks.every(h => h.completed);

                      return (
                        <button key={day} onClick={(e) => { e.stopPropagation(); handleDayClick(day); }} className={`aspect-square rounded-lg flex items-center justify-center text-xs relative cursor-pointer transition-all ${isSelected ? `bg-cyan-500/20 text-cyan-600 border border-cyan-500 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-110 z-10` : `${isLightMode ? 'bg-slate-100 border-slate-200 hover:bg-slate-200' : 'bg-slate-800/30 border-transparent hover:bg-slate-700'} ${th.textMuted} hover:${th.textMain}`}`}>
                          {day}{hasTasks && (<div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${allCompleted ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-pink-500 shadow-[0_0_5px_#ec4899]'}`}></div>)}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCategoryView = () => {
    if (!activeCategory || !categoryData[activeCategory]) return null;
    const data = categoryData[activeCategory];
    const stat = stats[activeCategory];
    const categoryHabits = habits.filter(h => h.category === activeCategory);
    const vaultItems = storeItems.downloads.filter(item => item.category === activeCategory && inventory.includes(item.id));
    const CategoryIcon = stat.icon;
    
    // LÓGICA PARA ROTAR EL CONSEJO DEL SISTEMA
    const tipsList = data.tips && data.tips.length > 0 ? data.tips : ["Aprende algo nuevo cada día."];
    const currentTip = tipsList[tipIndex % tipsList.length];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 relative">
        <button onClick={navigateToDashboard} className={`absolute top-6 left-6 md:top-8 md:left-8 z-[60] p-3 rounded-full ${th.bgCard} backdrop-blur-xl border ${th.border} shadow-lg transition-all hover:scale-110 hover:shadow-cyan-500/20 group`} title={t.backToDash}>
           <Home size={20} className={`${th.textMain} group-hover:text-cyan-500 transition-colors`} />
        </button>

        <div className="relative w-full h-64 md:h-80 overflow-hidden shrink-0 border-b border-slate-800 flex items-end">
           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${data.banner})` }}></div>
           <div className={`absolute inset-0 bg-gradient-to-t ${isLightMode ? 'from-white via-white/80' : 'from-[#030712] via-[#030712]/60'} to-transparent`}></div>
           
           <div className="relative z-10 p-8 md:p-12 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6 pl-24 md:pl-28">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-3 rounded-2xl ${isLightMode ? 'bg-white' : 'bg-slate-900/80'} border shadow-lg backdrop-blur-md`} style={{ borderColor: stat.color, color: stat.color }}><CategoryIcon size={32} /></div>
                  <h1 className={`text-4xl md:text-5xl font-black uppercase tracking-widest ${th.textMain} drop-shadow-md`} style={{ textShadow: isLightMode ? 'none' : `0 0 20px ${stat.color}80` }}>{t[activeCategory] || activeCategory}</h1>
                </div>
                <p className={`${th.textMain} max-w-xl font-medium mt-4 leading-relaxed opacity-90`}>{data.desc}</p>
                
                <div className="flex gap-2 mt-6">
                   <button onClick={() => setCategoryTab('tasks')} className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${categoryTab === 'tasks' ? 'text-white border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]' : `${th.bgInner} ${th.textMuted} ${th.border} hover:bg-slate-800 hover:text-white`}`} style={{ backgroundColor: categoryTab === 'tasks' ? stat.color : '' }}>{t.categoryTasks}</button>
                   <button onClick={() => setCategoryTab('academy')} className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${categoryTab === 'academy' ? 'text-white border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]' : `${th.bgInner} ${th.textMuted} ${th.border} hover:bg-slate-800 hover:text-white`}`} style={{ backgroundColor: categoryTab === 'academy' ? stat.color : '' }}><GraduationCap size={14} className="inline mr-1 mb-0.5"/> {t.academy}</button>
                   <button onClick={() => setCategoryTab('vault')} className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${categoryTab === 'vault' ? 'text-white border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]' : `${th.bgInner} ${th.textMuted} ${th.border} hover:bg-slate-800 hover:text-white`}`} style={{ backgroundColor: categoryTab === 'vault' ? stat.color : '' }}><Archive size={14} className="inline mr-1 mb-0.5"/> {t.vault}</button>
                </div>
              </div>

              <div className={`${th.bgCard} backdrop-blur-md border rounded-2xl p-6 w-full md:w-72 shadow-2xl shrink-0`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold ${th.textMuted} uppercase tracking-widest`}>Nivel Actual</span>
                  <span className="text-2xl font-black font-mono" style={{ color: stat.color }}>{stat.level}</span>
                </div>
                <div className={`w-full ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'} rounded-full h-3 overflow-hidden border ${th.border} mb-2`}>
                  <div className="h-full rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${(stat.xp / stat.maxXp) * 100}%`, backgroundColor: stat.color }}><div className="absolute inset-0 bg-white/20"></div></div>
                </div>
                <div className={`text-right text-[10px] ${th.textMuted} font-mono`}>{stat.xp} / {stat.maxXp} XP para subir</div>
              </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {categoryTab === 'tasks' && (
              <div className={`${th.bgCard} backdrop-blur-md rounded-2xl p-6 border shadow-xl flex-1 animate-in fade-in`}>
                <div className={`flex justify-between items-center mb-6 border-b ${th.border} pb-4`}>
                  <h2 className={`text-sm font-bold ${th.textMuted} uppercase tracking-widest flex items-center gap-2`}><ListTodo size={18} style={{ color: stat.color }} /> {t.categoryTasks}</h2>
                  <button onClick={() => { setNewHabit({...initialHabitState, category: activeCategory}); setIsModalOpen(true); }} className={`${th.bgInner} ${th.hover} p-2 px-4 rounded-xl transition-colors border flex items-center gap-2 text-xs font-bold ${th.textMain} shadow-sm`}><Plus size={16} style={{ color: stat.color }} /> Añadir Tarea</button>
                </div>
                <div className="space-y-4">
                  {categoryHabits.length === 0 ? (
                     <div className={`text-center py-16 border-2 border-dashed ${th.border} rounded-2xl ${th.textMutedLight}`}>No hay misiones activas en esta área.</div>
                  ) : (
                    categoryHabits.map(habit => renderHabitItem(habit))
                  )}
                </div>
              </div>
            )}

            {categoryTab === 'academy' && (
              <div className={`${th.bgCard} backdrop-blur-md rounded-2xl p-8 border shadow-xl flex-1 animate-in fade-in flex flex-col`}>
                 <h2 className={`text-sm font-bold ${th.textMuted} uppercase tracking-widest flex items-center gap-2 mb-2`}><BookOpen size={18} style={{ color: stat.color }} /> Árbol de Conocimiento</h2>
                 <p className={`text-xs ${th.textMutedLight} mb-8`}>Desbloquea cápsulas de sabiduría, supera los retos y consolida tu conocimiento.</p>
                 
                 <div className="flex-1 flex flex-col items-center justify-center py-10 relative">
                   <div className={`absolute top-0 bottom-0 w-1 ${th.bgInner} ${th.border} border-l border-r z-0`}></div>
                   {data.academy && data.academy.length > 0 ? data.academy.map((mod, idx) => {
                     const isUnlocked = stat.level >= mod.reqLvl || completedCapsules.includes(mod.id) || idx === 0;
                     const isCompleted = completedCapsules.includes(mod.id);
                     
                     return (
                       <div key={mod.id} className="relative z-10 flex flex-col items-center mb-12 last:mb-0 group w-full max-w-sm">
                         <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-3 py-1 rounded-full ${isCompleted ? 'bg-green-500/20 text-green-500' : isUnlocked ? `${th.bgInner} ${th.textMuted}` : 'bg-transparent text-transparent'}`}>
                           {isCompleted ? 'Completado' : isUnlocked ? `Módulo ${idx + 1}` : ''}
                         </div>
                         <button onClick={() => isUnlocked && openCapsule(mod)} disabled={!isUnlocked} className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all duration-300 ${isCompleted ? 'bg-green-900/20 border-green-500/50 hover:bg-green-900/40 hover:scale-105 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : isUnlocked ? `bg-slate-900 border-cyan-500 hover:bg-cyan-900/40 hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)]` : `${th.bgInner} border-slate-800 opacity-50 cursor-not-allowed`}`}>
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${isCompleted ? 'bg-green-500 border-green-400 text-slate-900' : isUnlocked ? 'bg-slate-950 border-cyan-500 text-cyan-500' : 'bg-slate-900 border-slate-700 text-slate-600'}`}>
                             {isCompleted ? <Check size={20} /> : isUnlocked ? <Play size={20} className="ml-1" /> : <Lock size={20} />}
                           </div>
                           <div className="text-left">
                             <h3 className={`font-black text-sm uppercase tracking-wider ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{mod.title}</h3>
                             <p className={`text-xs mt-1 leading-tight ${isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>{isUnlocked ? mod.desc : `Requiere Nivel ${mod.reqLvl}`}</p>
                           </div>
                         </button>
                       </div>
                     );
                   }) : (
                     <div className={`text-center ${th.textMutedLight} text-sm`}>Aún no hay cápsulas disponibles para esta categoría.</div>
                   )}
                 </div>
              </div>
            )}

            {categoryTab === 'vault' && (
              <div className={`${th.bgCard} backdrop-blur-md rounded-2xl p-6 border shadow-xl flex-1 animate-in fade-in`}>
                <div className={`flex justify-between items-center mb-6 border-b ${th.border} pb-4`}><h2 className={`text-sm font-bold ${th.textMuted} uppercase tracking-widest flex items-center gap-2`}><Archive size={18} style={{ color: stat.color }} /> {t.vault}</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vaultItems.length === 0 ? (
                     <div className={`col-span-full text-center py-16 border-2 border-dashed ${th.border} rounded-2xl ${th.textMutedLight} text-xs`}>Tu bóveda está vacía.<br/>Visita el Mercado para adquirir guías y DLCs.</div>
                  ) : (
                    vaultItems.map(item => {
                      const ItemIcon = item.icon;
                      return (
                      <div key={item.id} className={`${th.bgInner} border ${th.border} rounded-xl p-4 flex flex-col group hover:border-cyan-500/50 transition-colors`}>
                        <div className="flex justify-between items-start mb-3">
                           <div className={`p-2 rounded-lg bg-slate-900 border border-slate-700`} style={{ color: stat.color }}><ItemIcon size={20} /></div>
                           <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded bg-slate-800 text-gray-400`}>{item.format}</span>
                        </div>
                        <h3 className={`text-sm font-bold ${th.textMain} mb-1`}>{item.name}</h3>
                        <p className={`text-[10px] ${th.textMuted} mb-4 flex-1`}>{item.desc}</p>
                        <button className="w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-800 text-cyan-400 hover:bg-cyan-900 hover:text-white transition-colors flex items-center justify-center gap-2"><Download size={14} /> Abrir / Descargar</button>
                      </div>
                    )})
                  )}
                </div>
              </div>
            )}
            
            {/* AVATAR EXTRAÍDO PARA CATEGORÍA */}
            {renderAvatarSection()}
          </div>

          <div className="flex flex-col gap-6">
            <div className={`bg-gradient-to-br ${isLightMode ? 'from-white/80 to-white/40' : 'from-white/5 to-white/0'} backdrop-blur-xl rounded-2xl p-6 border ${isLightMode ? 'border-white' : 'border-white/10'} shadow-xl relative overflow-hidden`}>
               <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20" style={{ backgroundColor: stat.color }}></div>
               <h3 className={`text-[10px] font-black ${th.textMuted} uppercase tracking-widest mb-4 flex items-center gap-2`}><Lightbulb size={14} style={{ color: stat.color }} /> {t.tips}</h3>
               <p key={currentTip} className={`text-sm ${th.textMain} leading-relaxed font-medium relative z-10 italic animate-in fade-in duration-500`}>"{currentTip}"</p>
            </div>

            <div className={`${th.bgCard} backdrop-blur-md rounded-2xl p-6 border shadow-xl`}>
               <h3 className={`text-[10px] font-black ${th.textMuted} uppercase tracking-widest mb-5 flex items-center gap-2 border-b ${th.border} pb-3`}><Unlock size={14} style={{ color: stat.color }} /> {t.unlockables}</h3>
               <div className="space-y-4">
                 {data.achievements.map((ach, idx) => {
                    const isUnlocked = stat.level >= ach.reqLvl;
                    const AchIcon = ach.icon;
                    return (
                      <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl border ${isUnlocked ? `${th.bgInner} ${th.border}` : `bg-transparent ${th.border} opacity-60`}`}>
                         <div className={`p-2 rounded-lg flex items-center justify-center border ${isUnlocked ? `${isLightMode ? 'bg-white' : 'bg-slate-900'} shadow-[0_0_10px_currentColor]` : `${th.bgInner} ${th.textMuted}`}`} style={{ color: isUnlocked ? stat.color : '', borderColor: isUnlocked ? stat.color : '' }}>{isUnlocked ? <AchIcon size={20} /> : <Lock size={20} />}</div>
                         <div>
                           <div className={`text-xs font-bold uppercase tracking-wider ${isUnlocked ? th.textMain : th.textMuted}`}>{ach.name}</div>
                           <div className={`text-[9px] ${th.textMutedLight} font-mono mt-0.5`}>{isUnlocked ? 'Desbloqueado' : `Requiere Nivel ${ach.reqLvl}`}</div>
                         </div>
                      </div>
                    )
                 })}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStoreView = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 relative">
        <button onClick={navigateToDashboard} className={`absolute top-6 left-6 md:top-8 md:left-8 z-[60] p-3 rounded-full ${th.bgCard} backdrop-blur-xl border ${th.border} shadow-lg transition-all hover:scale-110 hover:shadow-cyan-500/20 group`} title={t.backToDash}>
           <Home size={20} className={`${th.textMain} group-hover:text-cyan-500 transition-colors`} />
        </button>

        <div className={`p-8 md:p-12 border-b ${th.border} ${isLightMode ? 'bg-slate-100' : 'bg-slate-900/50'} relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>

          <div className="max-w-7xl mx-auto flex flex-col items-center text-center mt-10">
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4 shadow-[0_0_30px_rgba(234,179,8,0.2)]"><Store size={40} className="text-yellow-500" /></div>
            <h1 className="text-4xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-2 drop-shadow-sm">{t.shop}</h1>
            <p className={`${th.textMuted} max-w-2xl text-sm`}>Intercambia tus Puntos de Evolución (PE) por estética universal para tu avatar o por contenido real de crecimiento personal.</p>
            <div className={`mt-8 flex items-center gap-3 ${th.bgInner} px-6 py-3 rounded-2xl border shadow-xl`}><span className={`text-xs font-bold ${th.textMuted} uppercase tracking-widest`}>Tu Saldo</span><span className="text-2xl font-black text-yellow-500 font-mono flex items-center gap-2"><Star size={20} className="text-yellow-500" /> {coins} PE</span></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10 space-y-12">
          <div>
            <h2 className={`text-lg font-black ${th.textMain} uppercase tracking-widest flex items-center gap-2 mb-6 border-b ${th.border} pb-3`}><Shield size={20} className="text-cyan-500" /> Estética Universal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {storeItems.aesthetics.map(item => {
                 const isOwned = inventory.includes(item.id);
                 const canBuy = coins >= item.price;
                 const isItemEquipped = equipped[item.type]?.id === item.id;
                 const ItemIcon = item.icon;

                 return (
                   <div key={item.id} className={`${th.bgCard} backdrop-blur-md rounded-2xl border p-5 flex flex-col transition-all ${isOwned ? `border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.1)]` : `hover:${th.border}`}`}>
                      <div className="flex justify-between items-start mb-4"><div className={`p-3 rounded-xl ${th.bgInner} border shadow-inner`} style={{ color: item.color || '#94a3b8' }}><ItemIcon size={24} /></div><span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${th.bgInner} ${th.textMutedLight} border`}>{item.type}</span></div>
                      <h3 className={`text-sm font-bold ${th.textMain} mb-1`}>{item.name}</h3><p className={`text-[10px] ${th.textMuted} mb-6 flex-1 leading-relaxed`}>{item.desc}</p>
                      <div className="mt-auto">
                        {!isOwned ? (
                          <button onClick={() => handleBuyItem(item)} disabled={!canBuy} className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${canBuy ? `${th.bgInner} text-yellow-600 hover:text-yellow-500 border border-yellow-500/50` : `${th.bgInner} opacity-50 cursor-not-allowed`}`}><Star size={14} /> {item.price} PE</button>
                        ) : (
                          <button onClick={() => handleEquipItem(item)} className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${isItemEquipped ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : `${th.bgInner} text-cyan-600 hover:bg-cyan-500 hover:text-white`}`}>{isItemEquipped ? t.equipped : t.equip}</button>
                        )}
                      </div>
                   </div>
                 )
               })}
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-black ${th.textMain} uppercase tracking-widest flex items-center gap-2 mb-6 border-b ${th.border} pb-3`}><FileText size={20} className="text-green-500" /> Crecimiento Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {storeItems.downloads.map(item => {
                 const isOwned = inventory.includes(item.id);
                 const canBuy = coins >= item.price;
                 const catColor = initialStats[item.category].color;
                 const ItemIcon = item.icon;

                 return (
                   <div key={item.id} className={`${th.bgCard} backdrop-blur-md rounded-2xl border p-5 flex flex-col transition-all ${isOwned ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : `hover:${th.border}`}`}>
                      <div className="flex justify-between items-start mb-4"><div className={`p-3 rounded-xl ${th.bgInner} border shadow-inner`} style={{ color: catColor }}><ItemIcon size={24} /></div><span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${th.bgInner} ${th.textMutedLight} border`}>{item.format}</span></div>
                      <h3 className={`text-sm font-bold ${th.textMain} mb-1`}>{item.name}</h3><p className={`text-[10px] ${th.textMuted} mb-6 flex-1 leading-relaxed`}>{item.desc}</p>
                      <div className="mt-auto">
                        {!isOwned ? (
                          <button onClick={() => handleBuyItem(item)} disabled={!canBuy} className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${canBuy ? `${th.bgInner} text-yellow-600 hover:text-yellow-500 border border-yellow-500/50` : `${th.bgInner} opacity-50 cursor-not-allowed`}`}><Star size={14} /> {item.price} PE</button>
                        ) : (
                          <button onClick={() => alert("Descargable ahora disponible en La Bóveda de su categoría respectiva.")} className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${th.bgInner} text-green-600 hover:bg-green-500 hover:text-white border border-green-500/50 flex items-center justify-center gap-2`}><Download size={14} /> {t.download}</button>
                        )}
                      </div>
                   </div>
                 )
               })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCalendarView = () => {
    const habitsForSelectedDate = habits.filter(h => h.date === selectedDate);
    const totalHabits = habits.length;
    const totalCompleted = habits.filter(h => h.completed).length;
    const globalCompletionRate = totalHabits === 0 ? 0 : Math.round((totalCompleted / totalHabits) * 100);

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 relative">
        <button onClick={navigateToDashboard} className={`absolute top-6 left-6 md:top-8 md:left-8 z-[60] p-3 rounded-full ${th.bgCard} backdrop-blur-xl border ${th.border} shadow-lg transition-all hover:scale-110 hover:shadow-cyan-500/20 group`} title={t.backToDash}>
           <Home size={20} className={`${th.textMain} group-hover:text-cyan-500 transition-colors`} />
        </button>

        <div className={`p-8 md:p-12 border-b ${th.border} ${isLightMode ? 'bg-slate-100' : 'bg-slate-900/50'} relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>

          <div className="max-w-7xl mx-auto flex flex-col items-center text-center mt-10">
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]"><CalendarDays size={40} className="text-purple-500" /></div>
            <h1 className="text-4xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-2 drop-shadow-md">{t.calendar}</h1>
            <p className={`${th.textMuted} max-w-2xl text-sm`}>Analiza tu progreso en el tiempo. Descubre tus patrones de productividad y ajusta tus hábitos para maximizar resultados.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className={`${th.bgCard} backdrop-blur-md rounded-2xl p-8 border shadow-xl`}>
              <div className={`flex justify-between items-center mb-6 border-b ${th.border} pb-4`}>
                <h2 className={`text-lg font-bold ${th.textMain} flex items-center gap-2`}><CalendarIcon size={20} className="text-blue-500"/> Calendario de Tareas</h2>
                <div className={`flex gap-3 ${th.textMuted} items-center ${th.bgInner} px-3 py-1.5 rounded-xl border`}>
                  <button onClick={prevMonth} className={`p-1.5 ${th.hover} hover:text-cyan-500 rounded transition-colors`}><ChevronLeft size={18} /></button>
                  <span className={`text-sm font-black w-32 text-center uppercase tracking-wider ${th.textMain}`}>{t.months[currentMonth]} {currentYear}</span>
                  <button onClick={nextMonth} className={`p-1.5 ${th.hover} hover:text-cyan-500 rounded transition-colors`}><ChevronRight size={18} /></button>
                </div>
              </div>
              
              <div className={`grid grid-cols-7 gap-2 text-center text-xs font-bold ${th.textMutedLight} mb-4 border-b ${th.border} pb-2`}><div>LUN</div><div>MAR</div><div>MIE</div><div>JUE</div><div>VIE</div><div>SAB</div><div>DOM</div></div>
              
              <div className="grid grid-cols-7 gap-3">
                {[...Array(startDay)].map((_, i) => (<div key={`empty-${i}`} className="aspect-square rounded-xl border border-transparent"></div>))}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                  const isSelected = selectedDate === dateStr;
                  const dayTasks = habits.filter(h => h.date === dateStr);
                  const hasTasks = dayTasks.length > 0;
                  const allCompleted = hasTasks && dayTasks.every(h => h.completed);

                  return (
                    <button key={day} onClick={() => handleDayClick(day)} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative cursor-pointer transition-all hover:scale-105 ${isSelected ? 'bg-cyan-500/20 text-cyan-600 border-2 border-cyan-500 font-black shadow-[0_0_20px_rgba(34,211,238,0.4)] z-10' : `${th.bgInner} ${th.textMuted} border border-transparent hover:border-cyan-500/50`}`}>
                      <span>{day}</span>
                      {hasTasks && (<div className={`mt-1 w-2 h-2 rounded-full ${allCompleted ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-pink-500 shadow-[0_0_8px_#ec4899]'}`}></div>)}
                    </button>
                  )
                })}
              </div>
            </div>

            <div ref={habitsPanelRef} className={`${th.bgCard} backdrop-blur-md rounded-2xl p-6 border shadow-xl`}>
              <div className={`flex justify-between items-center mb-5 border-b ${th.border} pb-3`}>
                <h2 className={`text-sm font-bold ${th.textMuted} uppercase tracking-widest flex items-center gap-2`}><ListTodo size={18} className="text-cyan-500" /> Tareas de la Fecha</h2>
                <span className={`text-xs font-mono text-cyan-600 ${isLightMode ? 'bg-cyan-100' : 'bg-cyan-900/20'} px-3 py-1 rounded border border-cyan-500/50`}>{selectedDate}</span>
              </div>
              <div className="space-y-3">
                {habitsForSelectedDate.length === 0 ? (
                   <div className={`text-center py-10 border-2 border-dashed ${th.border} rounded-xl ${th.textMutedLight}`}>Día libre. No hay tareas programadas.</div>
                ) : (
                  habitsForSelectedDate.map(habit => renderHabitItem(habit))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
             <div className={`${th.bgCard} backdrop-blur-md rounded-2xl p-8 border shadow-xl`}>
                <h2 className={`text-lg font-bold ${th.textMain} flex items-center gap-2 mb-6 border-b ${th.border} pb-4`}><PieChart size={20} className="text-purple-500"/> {t.detailedMetrics}</h2>
                <div className="flex flex-col items-center mb-8">
                   <div className={`relative w-40 h-40 flex items-center justify-center rounded-full ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'} mb-4`} style={{ background: `conic-gradient(#22c55e ${globalCompletionRate}%, ${isLightMode ? '#e2e8f0' : '#1e293b'} 0)` }}>
                      <div className={`absolute w-36 h-36 ${th.bgInner} rounded-full flex flex-col items-center justify-center border-4 ${th.border} shadow-inner`}>
                         <span className="text-3xl font-black text-green-500">{globalCompletionRate}%</span>
                         <span className={`text-[9px] uppercase font-bold ${th.textMutedLight} tracking-widest`}>Completado</span>
                      </div>
                   </div>
                   <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                      <span className="text-green-500 flex items-center gap-1"><Circle size={10} className="fill-green-500"/> Hechas: {totalCompleted}</span>
                      <span className={`${th.textMuted} flex items-center gap-1`}><Circle size={10} className="fill-current"/> Total: {totalHabits}</span>
                   </div>
                </div>

                <h3 className={`text-xs font-bold ${th.textMuted} uppercase tracking-widest mb-4 flex items-center gap-2`}><TrendingUp size={14} className="text-cyan-500" /> {t.xpDistribution}</h3>
                <div className="space-y-4">
                  {Object.entries(stats).map(([key, stat]) => {
                     const totalXpInGame = Object.values(stats).reduce((acc, curr) => acc + (curr.level * 100) + curr.xp, 0);
                     const currentStatXp = (stat.level * 100) + stat.xp;
                     const percentage = totalXpInGame === 0 ? 0 : Math.round((currentStatXp / totalXpInGame) * 100);
                     
                     return (
                       <div key={key} className="flex flex-col gap-1">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                             <span className={`${th.textMain} flex items-center gap-1`}><stat.icon size={10} style={{color: stat.color}}/> {t[key] || key}</span>
                             <span style={{color: stat.color}}>{percentage}%</span>
                          </div>
                          <div className={`w-full ${isLightMode ? 'bg-slate-200' : 'bg-slate-800'} rounded-full h-1.5 overflow-hidden`}>
                             <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: stat.color }}></div>
                          </div>
                       </div>
                     )
                  })}
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-500 ${th.bgApp}`}>
      {/* BARRA LATERAL */}
      <aside className={`fixed inset-y-0 left-0 z-[100] ${th.bgSidebar} border-r backdrop-blur-xl w-64 transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col justify-between">
          <div>
            <div className={`p-6 border-b ${th.border} flex items-center justify-between min-w-[16rem]`}><h1 className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 uppercase flex items-center gap-2"><Activity size={24} className="text-cyan-500" /> {t.appTitle}</h1></div>
            <nav className="p-4 space-y-2 min-w-[16rem]">
              <button onClick={navigateToDashboard} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs ${currentView === 'dashboard' ? 'bg-cyan-500/20 text-cyan-600 border border-cyan-500/50' : `${th.hover} ${th.textMuted} hover:${th.textMain} border border-transparent`}`}><LayoutDashboard size={18} /> {t.dashboard}</button>
              <button onClick={navigateToCalendar} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs ${currentView === 'calendar' ? 'bg-purple-500/20 text-purple-600 border border-purple-500/50' : `${th.hover} ${th.textMuted} hover:${th.textMain} border border-transparent`}`}><CalendarIcon size={18} /> Calendario</button>
              <button onClick={navigateToStore} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs ${currentView === 'store' ? 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/50' : `${th.hover} ${th.textMuted} hover:${th.textMain} border border-transparent`}`}><Store size={18} /> {t.shop}</button>
            </nav>
            <div className={`p-4 border-t ${th.border} min-w-[16rem]`}>
               <h3 className={`text-[10px] ${th.textMutedLight} uppercase font-bold tracking-widest mb-3 flex items-center gap-2`}><Star size={12}/> {t.skillMap}</h3>
               <div className="space-y-3">
                  {Object.entries(stats).map(([key, stat]) => {
                     const isCategoryActive = currentView === 'category' && activeCategory === key;
                     return (
                       <div key={key} className={`flex items-center justify-between group cursor-pointer p-1.5 rounded-lg transition-colors ${isCategoryActive ? th.bgInner : th.hover}`} onClick={() => navigateToCategory(key)}>
                         <div className="flex items-center gap-2"><div className={`p-1.5 rounded-md ${th.bgCard} border group-hover:border-[color:var(--hc)] transition-colors`} style={{ '--hc': stat.color, borderColor: isCategoryActive ? stat.color : '' }}><stat.icon size={12} style={{ color: stat.color }} /></div><span className={`text-[10px] font-semibold uppercase ${isCategoryActive ? th.textMain : `${th.textMuted} group-hover:${th.textMain}`}`}>{t[key] || key}</span></div>
                         <span className="text-[10px] font-mono font-bold" style={{ color: stat.color }}>LVL {stat.level}</span>
                       </div>
                     )
                  })}
               </div>
            </div>
          </div>
          <div className={`p-4 space-y-1 min-w-[16rem] border-t ${th.border} mt-4`}>
            <input type="file" ref={fileInputRef} accept=".csv" onChange={handleImportCSV} className="hidden" />
            <button onClick={() => fileInputRef.current.click()} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl ${th.hover} ${th.textMuted} hover:text-cyan-500 transition-all font-bold text-xs group`}><Upload size={16} className="group-hover:text-cyan-500" /> {t.import}</button>
            <button onClick={handleExportCSV} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl ${th.hover} ${th.textMuted} hover:text-fuchsia-500 transition-all font-bold text-xs group`}><Download size={16} className="group-hover:text-fuchsia-500" /> {t.export}</button>
            <button onClick={() => setIsLightMode(!isLightMode)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl ${th.hover} ${th.textMuted} hover:text-yellow-500 transition-all font-bold text-xs group mt-2 border-t ${th.border} pt-3`}>{isLightMode ? <Moon size={16} className="group-hover:text-yellow-500"/> : <Sun size={16} className="group-hover:text-yellow-500"/>} {isLightMode ? t.darkMode : t.lightMode}</button>
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl ${th.hover} ${th.textMuted} hover:${th.textMain} transition-all font-bold text-xs`}><Languages size={16} /> {lang === 'es' ? 'English (EN)' : 'Español (ES)'}</button>
          </div>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`absolute top-8 -right-8 w-8 h-14 ${th.bgInner} border border-l-0 ${th.border} rounded-r-xl flex items-center justify-center ${th.textMuted} hover:text-cyan-500 shadow-xl transition-colors cursor-pointer z-50`}>{isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}</button>
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL CON MANEJO DE SCROLL */}
      <div ref={mainScrollRef} className={`flex-1 h-screen overflow-y-auto custom-scrollbar relative flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
         {currentView === 'dashboard' && renderDashboardView()}
         {currentView === 'category' && renderCategoryView()}
         {currentView === 'store' && renderStoreView()}
         {currentView === 'calendar' && renderCalendarView()}
         {currentView === 'skillMap' && renderSkillMapView()}
      </div>

      {/* WIDGET FLOTANTE: HYPER-FOCUS */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 transition-all duration-500">
         <button onClick={() => setIsFocusMinimized(!isFocusMinimized)} className={`p-2.5 ${th.bgCard} border ${th.border} rounded-full ${th.textMuted} hover:text-cyan-500 shadow-xl backdrop-blur-md transition-colors z-10`}>{isFocusMinimized ? <Maximize2 size={16}/> : <Minimize2 size={16}/>}</button>
         <div className={`${th.bgCard} backdrop-blur-xl border ${isFocusActive ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : th.border} rounded-2xl p-5 flex flex-col items-center justify-center transition-all duration-500 origin-bottom-right w-48 ${isFocusMinimized ? 'scale-0 opacity-0 absolute right-0 bottom-0 pointer-events-none' : 'scale-100 opacity-100 relative'}`}>
            <h3 className={`text-[10px] font-bold ${th.textMuted} uppercase tracking-widest mb-2 flex items-center gap-1`}><Zap size={12} className={isFocusActive ? 'text-cyan-500 animate-pulse' : ''} /> {t.focusMode}</h3>
            <div className={`text-4xl font-black font-mono tracking-wider mb-4 ${isFocusActive ? 'text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]' : th.textMain}`}>{formatTime(focusTimeLeft)}</div>
            <button onClick={toggleFocus} className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${isFocusActive ? `${th.bgInner} text-red-500 border border-red-500/50 hover:bg-red-500/10` : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg'}`}>{isFocusActive ? <><Square size={14} fill="currentColor"/> Pausar</> : <><Play size={14} fill="currentColor"/> Iniciar</>}</button>
         </div>
         <div className={`transition-all duration-500 origin-right ${isFocusMinimized ? 'scale-100 opacity-100 relative' : 'scale-0 opacity-0 absolute right-0 bottom-0 pointer-events-none'}`}>
            <div className={`${isLightMode ? 'bg-cyan-50' : 'bg-cyan-900/90'} backdrop-blur-xl border border-cyan-500 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg`}>
               <span className="text-cyan-600 font-mono font-bold text-lg leading-none">{formatTime(focusTimeLeft)}</span>
               <button onClick={toggleFocus} className="text-cyan-600 hover:text-cyan-400 transition-colors">{isFocusActive ? <Square size={16} fill="currentColor"/> : <Play size={16} fill="currentColor"/>}</button>
            </div>
         </div>
      </div>

      {/* MODALES FLOTANTES GLOBALES */}
      {isModalOpen && (
        <div className={`fixed inset-0 ${th.modalOverlay} backdrop-blur-sm z-[120] flex items-center justify-center p-4`}>
          <div className={`${th.modalBg} rounded-3xl p-8 w-full max-w-md shadow-[0_0_50px_rgba(6,182,212,0.2)]`}>
            <h3 className="text-xl font-black text-cyan-500 mb-6 uppercase tracking-widest">{newHabit.id ? t.editTask : t.addHabit}</h3>
            <input type="text" placeholder={t.habitName} value={newHabit.name} onChange={(e) => setNewHabit({...newHabit, name: e.target.value})} className={`w-full ${th.bgInner} rounded-xl p-4 text-sm ${th.textMain} focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all mb-5 border ${th.border}`}/>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div><label className={`text-[10px] ${th.textMuted} uppercase font-bold block mb-2`}>Categoría</label><select value={newHabit.category} onChange={(e) => setNewHabit({...newHabit, category: e.target.value})} className={`w-full ${th.bgInner} border ${th.border} rounded-xl p-3 text-xs ${th.textMain} focus:outline-none focus:border-cyan-500`}><option value="learning">{t.learning}</option><option value="health">{t.health}</option><option value="nutrition">{t.nutrition}</option><option value="rest">{t.rest}</option><option value="economy">{t.economy}</option><option value="psychology">{t.psychology}</option><option value="work">{t.work}</option><option value="leisure">{t.leisure}</option></select></div>
              <div><label className={`text-[10px] ${th.textMuted} uppercase font-bold block mb-2`}>{t.priority}</label><select value={newHabit.priority} onChange={(e) => setNewHabit({...newHabit, priority: e.target.value})} className={`w-full ${th.bgInner} border ${th.border} rounded-xl p-3 text-xs ${th.textMain} focus:outline-none focus:border-cyan-500`}><option value="Baja">Baja</option><option value="Media">Media</option><option value="Alta">Alta</option></select></div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-6">
              <div><label className={`text-[10px] ${th.textMuted} uppercase font-bold block mb-2`}>Tiempo Est. (min)</label><input type="number" min="1" value={newHabit.timeEst} onChange={(e) => setNewHabit({...newHabit, timeEst: parseInt(e.target.value) || 0})} className={`w-full ${th.bgInner} border ${th.border} rounded-xl p-3 text-xs ${th.textMain} focus:outline-none focus:border-cyan-500`} /></div>
              <div><label className={`text-[10px] ${th.textMuted} uppercase font-bold block mb-2`}>{t.date}</label><input type="date" value={newHabit.date} onChange={(e) => setNewHabit({...newHabit, date: e.target.value})} className={`w-full ${th.bgInner} border ${th.border} rounded-xl p-3 text-xs ${th.textMuted} focus:outline-none focus:border-cyan-500 ${isLightMode ? '' : '[color-scheme:dark]'}`} /></div>
            </div>
            <div className="mb-8">
              <label className={`text-[10px] ${th.textMuted} uppercase font-bold block mb-3`}>{t.points} XP (+PE)</label>
              <input type="range" min="5" max="50" step="5" value={newHabit.points} onChange={(e) => setNewHabit({...newHabit, points: parseInt(e.target.value)})} className="w-full accent-cyan-500"/>
              <div className={`text-center text-sm font-mono font-bold text-cyan-600 mt-2 ${isLightMode ? 'bg-cyan-50 border-cyan-200' : 'bg-cyan-900/20 border-cyan-900/50'} py-2 rounded-lg border`}>+{newHabit.points} XP <span className={`${th.textMutedLight} mx-2`}>|</span> +{Math.floor(newHabit.points/2)} <Star size={12} className="inline text-yellow-500 mb-0.5"/></div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setIsModalOpen(false); setNewHabit({ ...initialHabitState, date: selectedDate }); }} className={`flex-1 py-3 rounded-xl border ${th.border} ${th.textMuted} ${th.hover} transition-colors text-xs font-bold uppercase tracking-wider`}>{t.cancel}</button>
              <button onClick={handleSaveHabit} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold transition-colors text-xs uppercase tracking-wider shadow-lg">{t.save}</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: STORY MODE (CÁPSULA ACADEMIA) */}
      {activeCapsule && (
        <div className={`fixed inset-0 ${th.modalOverlay} backdrop-blur-md z-[120] flex items-center justify-center p-4 animate-in fade-in`}>
          <div className={`${th.bgCard} rounded-3xl w-full max-w-lg h-[80vh] flex flex-col shadow-2xl overflow-hidden relative border ${th.border}`}>
             <div className={`p-4 border-b ${th.border} ${th.bgInner} flex flex-col gap-3 z-20`}>
                <div className="flex justify-between items-center w-full">
                  <button onClick={prevCapsuleStep} disabled={capsuleStep === 0} className={`text-[10px] font-bold uppercase tracking-wider ${capsuleStep === 0 ? 'opacity-0' : `${th.textMuted} hover:${th.textMain}`}`}><ChevronLeft size={14} className="inline mb-0.5"/> Anterior</button>
                  <div className="flex gap-2 items-center">
                    {capsuleStep < activeCapsule.slides.length ? (
                      <button onClick={nextCapsuleStep} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider transition-colors shadow-lg flex items-center gap-1">{t.next} <ChevronRight size={14}/></button>
                    ) : capsuleStep === activeCapsule.slides.length ? (
                      <button onClick={nextCapsuleStep} disabled={quizSelected !== activeCapsule.quiz.correct} className={`px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 ${quizSelected === activeCapsule.quiz.correct ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' : `${th.bgInner} ${th.textMuted} cursor-not-allowed border ${th.border}`}`}>Continuar <ChevronRight size={14}/></button>
                    ) : (
                      <button onClick={completeCapsule} disabled={feynmanText.length < 10} className={`px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 ${feynmanText.length >= 10 ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : `${th.bgInner} ${th.textMuted} cursor-not-allowed border ${th.border}`}`}><Check size={14}/> {t.finish}</button>
                    )}
                    <button onClick={closeCapsule} className={`ml-2 p-1.5 rounded-full ${th.bgCard} border ${th.border} ${th.textMuted} hover:text-red-500 hover:bg-red-500/10 transition-colors`}><span className="text-lg font-black leading-none w-5 h-5 flex items-center justify-center">&times;</span></button>
                  </div>
                </div>
                <div className="flex-1 flex gap-1.5 px-1">
                   {[...Array(activeCapsule.slides.length + 2)].map((_, idx) => (
                      <div key={idx} className={`h-1 flex-1 rounded-full transition-colors ${idx <= capsuleStep ? 'bg-cyan-500 shadow-[0_0_8px_#06b6d4]' : isLightMode ? 'bg-slate-200' : 'bg-slate-800'}`}></div>
                   ))}
                </div>
             </div>

             <div className={`flex-1 p-8 flex flex-col justify-center relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${isLightMode ? 'from-cyan-50 via-transparent' : 'from-cyan-900/10 via-transparent'} to-transparent overflow-y-auto`}>
                {capsuleStep < activeCapsule.slides.length && (
                   <div className="text-center animate-in slide-in-from-right-4 fade-in">
                     <div className="mx-auto w-20 h-20 mb-6 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]"><BookOpen size={32} className="text-cyan-500" /></div>
                     <h2 className={`text-2xl font-black uppercase tracking-widest ${th.textMain} mb-8`}>{activeCapsule.title}</h2>
                     <p className={`text-lg ${th.textMuted} leading-relaxed font-medium`}>{activeCapsule.slides[capsuleStep]}</p>
                   </div>
                )}
                {capsuleStep === activeCapsule.slides.length && (
                   <div className="animate-in slide-in-from-right-4 fade-in w-full">
                     <h3 className={`text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-6 flex items-center justify-center gap-2`}><Activity size={16}/> Comprobación</h3>
                     <p className={`text-xl font-bold ${th.textMain} mb-8 text-center leading-relaxed`}>{activeCapsule.quiz.q}</p>
                     <div className="space-y-4">
                       {activeCapsule.quiz.options.map((opt, idx) => (
                          <button key={idx} onClick={() => setQuizSelected(idx)} className={`w-full p-5 rounded-2xl border-2 text-sm font-bold transition-all text-left flex items-center justify-between ${quizSelected === idx ? (idx === activeCapsule.quiz.correct ? 'border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-red-500 bg-red-500/10 text-red-500') : `${th.border} ${th.bgInner} ${th.textMain} hover:border-cyan-500/50 hover:shadow-md`}`}>
                            <span>{opt}</span>{quizSelected === idx && idx === activeCapsule.quiz.correct && <CheckCircle2 size={18}/>}
                          </button>
                       ))}
                     </div>
                   </div>
                )}
                {capsuleStep === activeCapsule.slides.length + 1 && (
                   <div className="animate-in slide-in-from-right-4 fade-in w-full h-full flex flex-col justify-center">
                     <h3 className={`text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-4 flex items-center justify-center gap-2`}><Brain size={16}/> Técnica Feynman</h3>
                     <p className={`text-2xl font-black ${th.textMain} mb-2 text-center`}>¿Qué has aprendido hoy?</p>
                     <p className={`text-xs ${th.textMuted} mb-8 text-center px-4`}>Si no puedes explicarlo en una oración, no lo has entendido por completo. Sé breve.</p>
                     <div className="relative">
                       <textarea value={feynmanText} onChange={(e) => setFeynmanText(e.target.value)} placeholder="Resume el concepto clave o cómo lo aplicarás hoy mismo..." className={`w-full h-40 ${th.bgInner} border-2 ${th.border} rounded-2xl p-5 text-sm ${th.textMain} focus:outline-none focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all resize-none`} maxLength={150} />
                       <div className={`absolute bottom-4 right-4 text-[10px] font-bold ${feynmanText.length >= 10 ? 'text-purple-500' : th.textMutedLight}`}>{feynmanText.length}/150</div>
                     </div>
                     <div className={`mt-8 p-5 rounded-2xl ${isLightMode ? 'bg-cyan-50 border-cyan-200' : 'bg-cyan-900/20 border-cyan-900/50'} border flex items-center gap-4`}>
                        <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl text-white shadow-lg"><Star size={24}/></div>
                        <div><div className="text-xs font-black text-cyan-600 uppercase tracking-widest mb-1">Recompensa de Módulo</div><div className={`text-[11px] font-medium ${th.textMuted}`}>50 XP + {activeCapsule.rewardCoins} PE + 1 Reto de Acción Diaria</div></div>
                     </div>
                   </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}