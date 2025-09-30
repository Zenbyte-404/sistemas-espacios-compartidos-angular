// ============================================================================
// SERVIDOR BACKEND SIMPLE - Por Agustín
// ============================================================================
// Este servidor funciona SIN base de datos, solo para testing del login
// Ejecutar: node server-simple.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// "Base de datos" en memoria (usuarios de prueba)
const users = [
  {
    id: '1',
    email: 'admin@test.com',
    password: 'password123', // En producción usar bcrypt
    name: 'Admin Test',
    role: 'admin',
    avatar: null
  },
  {
    id: '2',
    email: 'user@test.com',
    password: 'password123',
    name: 'Usuario Test',
    role: 'user',
    avatar: null
  }
];

// ============================================================================
// ENDPOINTS DE AUTENTICACIÓN
// ============================================================================

// POST /auth/login - Login tradicional
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('📧 Login attempt:', email);
  
  // Buscar usuario
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ 
      message: 'Credenciales inválidas' 
    });
  }
  
  // Generar token simple (en producción usar JWT real)
  const token = `token_${user.id}_${Date.now()}`;
  const refreshToken = `refresh_${user.id}_${Date.now()}`;
  
  // Respuesta exitosa
  const { password: _, ...userWithoutPassword } = user;
  
  console.log('✅ Login exitoso:', user.email);
  
  res.json({
    token,
    refreshToken,
    user: userWithoutPassword,
    expiresIn: 3600
  });
});

// POST /auth/register - Registro de usuario
app.post('/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  
  console.log('📝 Registro attempt:', email);
  
  // Verificar si ya existe
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ 
      message: 'El email ya está registrado' 
    });
  }
  
  // Crear nuevo usuario
  const newUser = {
    id: String(users.length + 1),
    email,
    password,
    name,
    role: 'user',
    avatar: null
  };
  
  users.push(newUser);
  
  // Generar token
  const token = `token_${newUser.id}_${Date.now()}`;
  const refreshToken = `refresh_${newUser.id}_${Date.now()}`;
  
  const { password: _, ...userWithoutPassword } = newUser;
  
  console.log('✅ Registro exitoso:', newUser.email);
  
  res.status(201).json({
    token,
    refreshToken,
    user: userWithoutPassword,
    expiresIn: 3600
  });
});

// POST /auth/google - Login con Google
app.post('/auth/google', (req, res) => {
  const { token } = req.body;
  
  console.log('🔐 Google login attempt');
  
  // Simular usuario de Google
  const googleUser = {
    id: '999',
    email: 'google@test.com',
    name: 'Usuario Google',
    role: 'user',
    avatar: 'https://via.placeholder.com/150'
  };
  
  const jwtToken = `token_${googleUser.id}_${Date.now()}`;
  const refreshToken = `refresh_${googleUser.id}_${Date.now()}`;
  
  console.log('✅ Google login exitoso');
  
  res.json({
    token: jwtToken,
    refreshToken,
    user: googleUser,
    expiresIn: 3600
  });
});

// POST /auth/refresh - Refrescar token
app.post('/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({ 
      message: 'Refresh token requerido' 
    });
  }
  
  // Generar nuevo token
  const newToken = `token_refreshed_${Date.now()}`;
  
  console.log('🔄 Token refrescado');
  
  res.json({
    token: newToken
  });
});

// GET /auth/me - Obtener usuario actual (ruta protegida de ejemplo)
app.get('/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      message: 'Token no proporcionado' 
    });
  }
  
  res.json({
    user: {
      id: '1',
      email: 'admin@test.com',
      name: 'Admin Test',
      role: 'admin'
    }
  });
});

// ============================================================================
// RUTA DE PRUEBA
// ============================================================================

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API de Autenticación funcionando',
    endpoints: {
      login: 'POST /auth/login',
      register: 'POST /auth/register',
      google: 'POST /auth/google',
      refresh: 'POST /auth/refresh',
      me: 'GET /auth/me'
    },
    usuariosPrueba: [
      { email: 'admin@test.com', password: 'password123' },
      { email: 'user@test.com', password: 'password123' }
    ]
  });
});

// ============================================================================
// INICIAR SERVIDOR
// ============================================================================

const PORT = 3000;
app.listen(PORT, () => {
  console.log('');
  console.log('============================================');
  console.log('🚀 SERVIDOR BACKEND INICIADO');
  console.log('============================================');
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log('');
  console.log('👤 Usuarios de prueba:');
  console.log('   Email: admin@test.com');
  console.log('   Pass:  password123');
  console.log('');
  console.log('   Email: user@test.com');
  console.log('   Pass:  password123');
  console.log('');
  console.log('📚 Endpoints disponibles:');
  console.log('   POST /auth/login');
  console.log('   POST /auth/register');
  console.log('   POST /auth/google');
  console.log('   POST /auth/refresh');
  console.log('   GET  /auth/me');
  console.log('============================================');
  console.log('');
});
