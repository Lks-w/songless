# MusicWordle - Juego de Adivinanza Musical

MusicWordle es un juego de adivinanza musical estilo Wordle/Songle, donde los jugadores deben identificar una canción diaria a partir de un fragmento de 30 segundos. El juego ofrece pistas progresivas y un sistema de autocompletado inteligente para ayudar a los jugadores.

## Características

- 🎵 Reproductor de fragmentos musicales integrado con Spotify
- 🎮 Sistema de adivinanza con límite de 6 intentos diarios
- 🔍 Autocompletado inteligente basado en la API de Spotify
- 💡 Sistema de pistas progresivas (género, año, artista, álbum)
- 🗓️ Canción diaria diferente basada en la fecha como semilla
- 📊 Panel de estadísticas para seguimiento del progreso
- 🌓 Modo oscuro/claro
- 📱 Diseño responsivo para todas las pantallas

## Requisitos Previos

Para ejecutar este proyecto, necesitarás:

- Node.js (v14 o superior)
- Una cuenta de desarrollador de Spotify y credenciales de API

## Configuración del Proyecto

1. Clona este repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` basado en el archivo `.env.example` y completa con tus credenciales de Spotify:

```
# Frontend Environment Variables
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_API_URL=http://localhost:3001

# Backend Environment Variables
SPOTIFY_CLIENT_ID=c09adcdcbf4b4a7980b526fe7a2edead
SPOTIFY_CLIENT_SECRET=d65fb2cc14664fb697d37fc66115e47f
CLIENT_URL=http://localhost:5173
PORT=3001
```

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo frontend:

```bash
npm run dev
```

Para iniciar el servidor backend:

```bash
npm run server
```

Para iniciar ambos simultáneamente:

```bash
npm run dev:all
```

## Estructura del Proyecto

```
/
├── public/              # Archivos estáticos
├── server/              # Código del servidor backend
│   ├── index.js         # Punto de entrada del servidor
│   └── spotify.js       # Utilidades para la API de Spotify
├── src/
│   ├── components/      # Componentes React
│   ├── context/         # Contextos de React
│   ├── hooks/           # Hooks personalizados
│   ├── services/        # Servicios API
│   ├── types/           # Definiciones de tipos
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Punto de entrada de React
│   └── index.css        # Estilos globales
├── .env.example         # Ejemplo de variables de entorno
├── package.json         # Dependencias y scripts
└── README.md            # Documentación
```

## Despliegue

### Frontend

Para construir el frontend para producción:

```bash
npm run build
```

Los archivos estáticos se generarán en el directorio `dist/` y pueden ser servidos por cualquier servidor web estático.

### Backend

El backend requiere un servidor Node.js. Para el despliegue, recomendamos:

1. Configurar las variables de entorno en tu plataforma de hosting
2. Iniciar el servidor con:

```bash
node server/index.js
```

## Créditos

- Desarrollado con React, Vite y Tailwind CSS
- Música proporcionada por la API de Spotify
- Iconos de Lucide React
- Animaciones con Framer Motion

## Licencia

MIT