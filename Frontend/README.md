# 🌐 Proyecto Integrador - Angular

## 📌 Descripción
# 🏢 Sistema de Espacios Compartidos

Este proyecto es una aplicación web para la **gestión de espacios compartidos** como salas de estudio, coworking y laboratorios.  
Permite a los usuarios:

- 📅 Reservar espacios de forma sencilla.  
- ⏱️ Ver disponibilidad en tiempo real.  
- 🔔 Recibir notificaciones de sus reservas.  
- 👥 Administrar usuarios y roles.  
- 📊 Llevar un control eficiente del uso de cada espacio.  

## 🛡️ Mejoras de Seguridad Implementadas

- **Protección XSRF** - Implementada protección contra falsificación de solicitudes entre sitios (CSRF)
- **Headers de Seguridad** - Configurados headers HTTP para mejorar la seguridad (CSP, XSS Protection, etc.)
- **Manejo de Errores** - Sistema centralizado de manejo de errores HTTP
- **Tipado Estricto** - Mejor tipado TypeScript para mayor seguridad en tiempo de compilación
- **Interceptores HTTP** - Para manejo consistente de solicitudes y respuestas
- **Variables de Entorno** - Configuración sensible movida a archivos de entorno

## 🚀 Tecnologías utilizadas

### Frontend
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" width="80" height="80"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="80" height="80"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="80" height="80"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="80" height="80"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" width="80" height="80"/>
</p>

### Herramientas de Desarrollo
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VSCode" width="60" height="60"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="NPM" width="60" height="60"/>
</p>

## 🚀 Empezando

### Requisitos Previos
- Node.js (v16 o superior)
- npm (v8 o superior) o yarn
- Angular CLI (última versión estable)

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd sistemas-espacios-compartidos-angular/Frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   # Copiar el archivo de ejemplo de entorno
   cp src/environments/environment.ts.example src/environments/environment.ts
   # Editar según sea necesario
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```
   La aplicación estará disponible en `http://localhost:4200/`

## 🧪 Ejecutando las pruebas

Para ejecutar las pruebas unitarias:
```bash
ng test
```

Para ejecutar las pruebas de extremo a extremo:
```bash
ng e2e
```

## 🛠️ Estructura del Proyecto

```
src/
├── app/
│   ├── core/                  # Servicios, interceptores y funcionalidad central
│   ├── features/              # Módulos de características
│   ├── shared/                # Componentes, directivas y pipes compartidos
│   ├── app.component.ts       # Componente raíz
│   └── app.config.ts          # Configuración de la aplicación
├── assets/                   # Archivos estáticos
├── environments/             # Configuraciones de entorno
└── styles/                   # Estilos globales
```

## 📂 Integrantes del Proyecto

| Nº | Nombre en GitHub | Nombre completo |
|:--:|:-----------------|:----------------|
| 1  | [Nico0626](https://github.com/Nico0626) | Nicolas |
| 2  | [marian-casa](https://github.com/marian-casa) | Mariano Casarino |
| 3  | [JoseTiranti](https://github.com/JoseTiranti) | Jose Tiranti |
| 4  | [Agustín G.](https://github.com/AgustinGibaut) | Agustin Gibaut |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- A nuestros mentores y profesores por su guía
- A la comunidad de código abierto por las herramientas utilizadas
- A todos los contribuyentes que han ayudado a mejorar este proyecto
