// ============================================================================
// CONFIGURACIÓN DE AMBIENTE - Actualizado por Agustín
// ============================================================================
// Variables de entorno para producción

export const environment = {
  production: true,
  reqresApiUrl: 'https://reqres.in/api',
  jsonServerApiUrl: 'https://your-production-api.com',
  apiVersion: 'v1',
  defaultTimeout: 30000, // 30 seconds
  
  // AGREGADO POR AGUSTÍN: Google OAuth Client ID
  googleClientId: 'TU_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
};
