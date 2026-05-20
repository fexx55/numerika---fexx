🚀 Guía de Instalación: Presentación Numérika AI
Para poder correr la presentación interactiva en sus computadoras, sigan estos pasos. Solo necesitan tener el archivo App.jsx que está en este repositorio.

1️⃣ Requisitos Previos
Node.js: Descarguen e instalen la versión recomendada (LTS) desde nodejs.org.

Visual Studio Code (VS Code): El editor de código.

Extensión recomendada: En VS Code, instalen la extensión Tailwind CSS IntelliSense para que les reconozca las clases de diseño.

2️⃣ Crear el proyecto base
Abran una terminal (pueden abrir VS Code y presionar Ctrl + Ñ o `Ctrl + ``) en la carpeta donde quieran guardar la presentación y ejecuten este comando para crear un proyecto limpio con Vite y React:

Bash
npm create vite@latest presentacion-numerika -- --template react
Entren a la carpeta que se acaba de crear:

Bash
cd presentacion-numerika
3️⃣ Instalar las dependencias
Ahora vamos a instalar todas las librerías que usa el código de la presentación (Iconos, el motor matemático y Tailwind CSS):

Bash
# Instalar los paquetes base de React
npm install

# Instalar las librerías de Numérika (Iconos y Matemáticas)
npm install lucide-react mathjs react-katex katex

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
4️⃣ Configurar Tailwind CSS
Ejecuten este comando para generar los archivos de configuración de Tailwind:

Bash
npx tailwindcss init -p
Esto va a crear un archivo llamado tailwind.config.js en la raíz del proyecto. Ábranlo y reemplacen todo su contenido con esto:

JavaScript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Luego, abran el archivo src/index.css (borren todo lo que traiga por defecto) y peguen estas tres líneas para inyectar Tailwind:

CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
5️⃣ Colocar el código de la presentación
Borren el archivo src/App.css (ya no lo necesitamos).

Descarguen el archivo App.jsx de este repositorio.

Vayan a la carpeta src de su proyecto local y reemplacen el App.jsx que viene por defecto por el que acaban de descargar.

6️⃣ ¡Ejecutar la presentación!
En la terminal, levanten el servidor de desarrollo con:

Bash
npm run dev
Les aparecerá un enlace (generalmente http://localhost:5173). Hagan Ctrl + Clic en el enlace y la presentación se abrirá en su navegador con los estilos, iconos y animaciones funcionando perfectamente. Podrán pasar las diapositivas con las flechas del teclado.
