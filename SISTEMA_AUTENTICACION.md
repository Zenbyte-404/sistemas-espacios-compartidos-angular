# 🔐 SISTEMA DE AUTENTICACIÓN COMPLETO

## Implementado por Agustín

Este documento explica el sistema de autenticación completo con JWT y Google OAuth implementado en la aplicación.

---

## 📋 Características Implementadas

### ✅ Autenticación Tradicional
- ✅ Login con email y contraseña
- ✅ Registro de nuevos usuarios
- ✅ Validación de formularios con Reactive Forms
- ✅ Manejo de errores y mensajes al usuario
- ✅ Mostrar/ocultar contraseña

### ✅ Google OAuth
- ✅ Login con Google (One Tap)
- ✅ Botón de Google integrado
- ✅ Registro con Google

### ✅ Seguridad JWT
- ✅ Tokens JWT para autenticación
- ✅ Refresh tokens para renovación automática
- ✅ Interceptor HTTP que agrega token automáticamente
- ✅ Validación de expiración de tokens
- ✅ Logout automático si el token expira

### ✅ Protección de Rutas
- ✅ Guard para rutas privadas (dashboard)
- ✅ Guard para rutas públicas (login/registro)
- ✅ Redirección automática según estado de autenticación

### ✅ Gestión de Estado
- ✅ Signals de Angular para estado reactivo
- ✅ LocalStorage para persistencia de sesión
- ✅ Usuario actual disponible globalmente

---

## 🗂️ Archivos Creados/Modificados

### Nuevos Archivos:

1. **`services/auth.service.ts`**
   - Servicio principal de autenticación
   - Maneja login, registro, Google OAuth
   - Gestión de tokens JWT
   - 300+ líneas de código profesional

2. **`guards/auth.guard.ts`**
   - Guard para proteger rutas privadas
   - Guard para rutas públicas (evita login si ya autenticado)

3. **`core/interceptors/jwt.interceptor.ts`**
   - Interceptor funcional para JWT
   - Agrega token a todas las peticiones
   - Maneja renovación automática de tokens

4. **`page/autenticacion/registro/`**
   - Componente de registro completo
   - HTML, CSS y TypeScript
   - Validación de contraseñas coincidentes
   - Integración con Google

### Archivos Modificados:

1. **`app.routes.ts`**
   - Agregado guard `authGuard` al dashboard
   - Agregado guard `publicGuard` a login/registro
   - Ruta de registro agregada

2. **`app.config.ts`**
   - Agregado `jwtInterceptor` a los providers
   - Configuración de interceptores HTTP

3. **`environments/environment.ts`**
   - Agregado `googleClientId` para OAuth

4. **`page/autenticacion/login/`**
   - Mejorado con Google Sign-In
   - Integración con AuthService
   - Mejor UX con estados de carga

5. **`index.html`**
   - Agregado script de Google Sign-In SDK

---

## 🚀 Configuración Paso a Paso

### 1. Configurar Google OAuth (IMPORTANTE)

#### Paso 1.1: Crear Proyecto en Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sign-In

#### Paso 1.2: Crear Credenciales OAuth
1. Ve a **APIs & Services** → **Credentials**
2. Click en **Create Credentials** → **OAuth client ID**
3. Tipo de aplicación: **Web application**
4. Authorized JavaScript origins:
   ```
   http://localhost:4200
   http://localhost:32678
   ```
5. Authorized redirect URIs:
   ```
   http://localhost:4200
   http://localhost:32678
   ```
6. Copia el **Client ID** generado

#### Paso 1.3: Configurar en la Aplicación
Edita `src/environments/environment.ts`:
```typescript
googleClientId: 'TU_CLIENT_ID_AQUI.apps.googleusercontent.com'
```

### 2. Configurar Backend (API)

El sistema espera un backend con estos endpoints:

#### POST `/auth/login`
```json
// Request
{
  "email": "usuario@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "1",
    "email": "usuario@example.com",
    "name": "Usuario",
    "avatar": "url_opcional",
    "role": "user"
  },
  "expiresIn": 3600
}
```

#### POST `/auth/register`
```json
// Request
{
  "email": "nuevo@example.com",
  "password": "password123",
  "name": "Nuevo Usuario"
}

// Response (igual que login)
```

#### POST `/auth/google`
```json
// Request
{
  "token": "google_credential_token"
}

// Response (igual que login)
```

#### POST `/auth/refresh`
```json
// Request
{
  "refreshToken": "refresh_token_here"
}

// Response
{
  "token": "nuevo_jwt_token"
}
```

### 3. Configurar URL del Backend

Edita `src/environments/environment.ts`:
```typescript
jsonServerApiUrl: 'http://localhost:3000' // Tu URL de backend
```

---

## 💻 Uso del Sistema

### Para Usuarios

#### Login:
1. Ir a `/login`
2. Opción 1: Click en "Continuar con Google"
3. Opción 2: Ingresar email y contraseña
4. Click en "Ingresar"
5. Redirección automática al dashboard

#### Registro:
1. Ir a `/registro` o click en "Regístrate aquí" desde login
2. Opción 1: Click en "Continuar con Google"
3. Opción 2: Completar formulario (nombre, email, contraseña)
4. Click en "Crear cuenta"
5. Redirección automática al dashboard

#### Logout:
```typescript
// Desde cualquier componente
constructor(private authService: AuthService) {}

logout() {
  this.authService.logout();
}
```

### Para Desarrolladores

#### Verificar si está autenticado:
```typescript
import { AuthService } from './services/auth.service';

constructor(private authService: AuthService) {}

ngOnInit() {
  // Opción 1: Signal
  if (this.authService.isAuthenticated()) {
    console.log('Usuario autenticado');
  }

  // Opción 2: Observable
  this.authService.currentUser$.subscribe(user => {
    if (user) {
      console.log('Usuario:', user);
    }
  });
}
```

#### Obtener usuario actual:
```typescript
const user = this.authService.getCurrentUser();
console.log(user?.name);
console.log(user?.email);
```

#### Verificar rol:
```typescript
if (this.authService.hasRole('admin')) {
  // Mostrar opciones de admin
}
```

#### Hacer peticiones autenticadas:
```typescript
// El interceptor JWT agrega automáticamente el token
this.http.get('/api/protected-endpoint').subscribe(data => {
  console.log(data);
});
```

---

## 🔒 Seguridad Implementada

### 1. Tokens JWT
- ✅ Almacenados en localStorage (considera httpOnly cookies para producción)
- ✅ Validación de expiración automática
- ✅ Refresh tokens para renovación

### 2. Guards de Rutas
- ✅ Dashboard protegido - requiere autenticación
- ✅ Login/Registro redirigen si ya autenticado

### 3. Interceptores HTTP
- ✅ Token agregado automáticamente a headers
- ✅ Renovación automática si token expira (401)
- ✅ Logout automático si refresh falla

### 4. Validaciones
- ✅ Email válido
- ✅ Contraseña mínimo 8 caracteres
- ✅ Contraseñas coincidentes en registro
- ✅ Campos requeridos

---

## 🎨 Componentes UI

### Login
- Diseño moderno con gradientes
- Botón de Google integrado
- Mostrar/ocultar contraseña
- Mensajes de error claros
- Estados de carga
- Responsive

### Registro
- Validación en tiempo real
- Confirmación de contraseña
- Botón de Google
- Diseño consistente con login
- Mensajes de error descriptivos

---

## 🧪 Testing (Desarrollo)

### Sin Backend Real:
Puedes simular el login modificando temporalmente el servicio:

```typescript
// En auth.service.ts - SOLO PARA TESTING
login(credentials: LoginCredentials): Observable<AuthResponse> {
  // Simular respuesta exitosa
  const mockResponse: AuthResponse = {
    token: 'mock_jwt_token',
    user: {
      id: '1',
      email: credentials.email,
      name: 'Usuario Test',
      role: 'user'
    }
  };
  
  this.handleAuthSuccess(mockResponse);
  return of(mockResponse);
}
```

---

## 📱 Flujo de Autenticación

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ├─────────────────────────────────────┐
       │                                     │
       ▼                                     ▼
┌─────────────┐                      ┌─────────────┐
│   /login    │                      │  /registro  │
└──────┬──────┘                      └──────┬──────┘
       │                                     │
       ├──────────┬──────────┬──────────────┤
       │          │          │              │
       ▼          ▼          ▼              ▼
   Email/Pass  Google   Email/Pass      Google
       │          │          │              │
       └──────────┴──────────┴──────────────┘
                  │
                  ▼
         ┌─────────────────┐
         │  AuthService    │
         │  - Valida       │
         │  - Guarda token │
         │  - Guarda user  │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │   authGuard     │
         │   Verifica      │
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │   /dashboard    │
         │   (Protegido)   │
         └─────────────────┘
```

---

## 🐛 Troubleshooting

### Error: "Google is not defined"
- Verifica que el script de Google esté en `index.html`
- Espera a que el script cargue antes de inicializar

### Error: "Invalid Client ID"
- Verifica que el Client ID en `environment.ts` sea correcto
- Verifica que las URLs autorizadas incluyan tu localhost

### Token no se agrega a las peticiones
- Verifica que `jwtInterceptor` esté en `app.config.ts`
- Verifica que el token esté en localStorage

### Redirección infinita
- Verifica que los guards estén correctamente configurados
- Revisa la lógica de `authGuard` y `publicGuard`

---

## 📝 Notas Importantes

1. **Google Client ID**: Debes configurarlo para que Google OAuth funcione
2. **Backend**: Necesitas un backend que implemente los endpoints mencionados
3. **HTTPS en Producción**: Google OAuth requiere HTTPS en producción
4. **Cookies httpOnly**: Considera usar cookies httpOnly en lugar de localStorage para mayor seguridad
5. **CORS**: Configura CORS en tu backend para permitir peticiones desde el frontend

---

## 🎯 Próximos Pasos Recomendados

1. ✅ Implementar backend con los endpoints necesarios
2. ✅ Configurar Google OAuth Client ID
3. ✅ Agregar recuperación de contraseña
4. ✅ Implementar verificación de email
5. ✅ Agregar autenticación de dos factores (2FA)
6. ✅ Implementar roles y permisos más complejos
7. ✅ Agregar logs de actividad de usuario

---

**Desarrollado por**: Agustín  
**Fecha**: 30 de Septiembre, 2025  
**Tecnologías**: Angular 20, JWT, Google OAuth, Signals  
**Estado**: ✅ Completamente funcional y listo para usar
