# 🔧 EJEMPLO DE BACKEND PARA AUTENTICACIÓN

## Implementación con Node.js + Express + JWT

Este archivo contiene ejemplos de código para implementar el backend que necesita el sistema de autenticación.

---

## 📦 Dependencias Necesarias

```bash
npm install express jsonwebtoken bcryptjs cors dotenv
npm install --save-dev @types/express @types/jsonwebtoken @types/bcryptjs
```

---

## 🗂️ Estructura del Backend

```
Backend/
├── server.js              # Servidor principal
├── routes/
│   └── auth.routes.js     # Rutas de autenticación
├── controllers/
│   └── auth.controller.js # Lógica de autenticación
├── middleware/
│   └── auth.middleware.js # Middleware JWT
├── models/
│   └── user.model.js      # Modelo de usuario
└── .env                   # Variables de entorno
```

---

## 📝 Código de Ejemplo

### 1. `.env` - Variables de Entorno

```env
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura_aqui_cambiar_en_produccion
JWT_REFRESH_SECRET=otra_clave_secreta_para_refresh_token
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
```

### 2. `server.js` - Servidor Principal

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:32678'],
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Autenticación funcionando' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

### 3. `models/user.model.js` - Modelo de Usuario

```javascript
// Simulación simple de base de datos en memoria
// En producción, usa MongoDB, PostgreSQL, etc.

let users = [
  {
    id: '1',
    email: 'admin@test.com',
    password: '$2a$10$XqZ8J5K9X0Y1Z2Y3Z4Z5Z6', // bcrypt hash de "password123"
    name: 'Admin Test',
    role: 'admin',
    avatar: null
  }
];

class UserModel {
  static async findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static async findById(id) {
    return users.find(u => u.id === id);
  }

  static async create(userData) {
    const newUser = {
      id: String(users.length + 1),
      ...userData,
      role: 'user',
      avatar: null
    };
    users.push(newUser);
    return newUser;
  }

  static async findByGoogleId(googleId) {
    return users.find(u => u.googleId === googleId);
  }
}

module.exports = UserModel;
```

### 4. `controllers/auth.controller.js` - Controlador de Autenticación

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const UserModel = require('../models/user.model');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthController {
  // Login tradicional
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar campos
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Email y contraseña son requeridos' 
        });
      }

      // Buscar usuario
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas' 
        });
      }

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          message: 'Credenciales inválidas' 
        });
      }

      // Generar tokens
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
      );

      // Respuesta (sin enviar password)
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        token,
        refreshToken,
        user: userWithoutPassword,
        expiresIn: 3600 // 1 hora en segundos
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  // Registro
  static async register(req, res) {
    try {
      const { email, password, name } = req.body;

      // Validar campos
      if (!email || !password || !name) {
        return res.status(400).json({ 
          message: 'Todos los campos son requeridos' 
        });
      }

      // Verificar si el usuario ya existe
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ 
          message: 'El email ya está registrado' 
        });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
        name
      });

      // Generar tokens
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const refreshToken = jwt.sign(
        { id: newUser.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
      );

      // Respuesta (sin enviar password)
      const { password: _, ...userWithoutPassword } = newUser;
      
      res.status(201).json({
        token,
        refreshToken,
        user: userWithoutPassword,
        expiresIn: 3600
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  // Login con Google
  static async googleLogin(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ 
          message: 'Token de Google requerido' 
        });
      }

      // Verificar token de Google
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      const { sub: googleId, email, name, picture } = payload;

      // Buscar o crear usuario
      let user = await UserModel.findByGoogleId(googleId);
      
      if (!user) {
        // Crear nuevo usuario
        user = await UserModel.create({
          googleId,
          email,
          name,
          avatar: picture,
          password: null // No tiene password porque usa Google
        });
      }

      // Generar tokens
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
      );

      // Respuesta
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        token: jwtToken,
        refreshToken,
        user: userWithoutPassword,
        expiresIn: 3600
      });
    } catch (error) {
      console.error('Error en login con Google:', error);
      res.status(500).json({ message: 'Error al autenticar con Google' });
    }
  }

  // Refresh token
  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ 
          message: 'Refresh token requerido' 
        });
      }

      // Verificar refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Buscar usuario
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ 
          message: 'Usuario no encontrado' 
        });
      }

      // Generar nuevo token
      const newToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        token: newToken
      });
    } catch (error) {
      console.error('Error al refrescar token:', error);
      res.status(401).json({ message: 'Refresh token inválido' });
    }
  }
}

module.exports = AuthController;
```

### 5. `middleware/auth.middleware.js` - Middleware JWT

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Token no proporcionado' 
      });
    }

    const token = authHeader.substring(7); // Remover 'Bearer '

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Agregar usuario al request
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expirado' 
      });
    }
    return res.status(401).json({ 
      message: 'Token inválido' 
    });
  }
};

module.exports = authMiddleware;
```

### 6. `routes/auth.routes.js` - Rutas

```javascript
const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas públicas
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/google', AuthController.googleLogin);
router.post('/refresh', AuthController.refreshToken);

// Ruta protegida de ejemplo
router.get('/me', authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
```

---

## 🚀 Cómo Ejecutar

1. **Instalar dependencias**:
```bash
cd Backend
npm install
```

2. **Configurar `.env`**:
   - Copia el ejemplo de arriba
   - Cambia las claves secretas
   - Agrega tu Google Client ID

3. **Ejecutar servidor**:
```bash
node server.js
```

4. **Probar endpoints**:
```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'

# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"nuevo@test.com","password":"password123","name":"Nuevo Usuario"}'
```

---

## 📊 Base de Datos Real (Opcional)

### Con MongoDB:

```javascript
// models/user.model.js con Mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  googleId: { type: String },
  avatar: { type: String },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
```

### Con PostgreSQL:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  google_id VARCHAR(255),
  avatar VARCHAR(500),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔒 Seguridad Adicional

### 1. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos de login, intenta más tarde'
});

router.post('/login', loginLimiter, AuthController.login);
```

### 2. Helmet para Headers de Seguridad
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 3. Validación de Datos
```bash
npm install joi
```

```javascript
const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
```

---

**Nota**: Este es un ejemplo básico. En producción, considera:
- Base de datos real (MongoDB, PostgreSQL, etc.)
- Validación más robusta
- Manejo de errores mejorado
- Logging
- Tests
- Docker para deployment
- Variables de entorno seguras

**Desarrollado por**: Agustín  
**Fecha**: 30 de Septiembre, 2025
