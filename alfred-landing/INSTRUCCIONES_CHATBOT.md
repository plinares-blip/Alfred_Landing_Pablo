# Instrucciones para Arreglar el Chatbot Concierge

El error "Internal Server Error" (500) en el chat se debe a que falta configurar la **API Key de Google Gemini**. Sigue estos pasos para solucionarlo:

## 1. Crear el archivo de entorno

1. En la carpeta `alfred-landing`, crea un archivo llamado `.env.local`.
2. Pega el siguiente contenido:

```bash
# Archivo: alfred-landing/.env.local
GEMINI_API_KEY=TU_CLAVE_DE_API_GEMINI_AQUI
```

## 2. Obtener tu API Key

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Crea una nueva API Key.
3. Cópiala y pégala en lugar de `TU_CLAVE_DE_API_GEMINI_AQUI` en el archivo `.env.local`.

## 3. Verificar el Modelo (Opcional)

Si sigue fallando después de poner la clave correcta, verifica en `app/api/chat/route.ts` que el modelo sea correcto. Actualmente está configurado como `gemini-1.5-flash`.

```typescript
// app/api/chat/route.ts
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // O intenta con "gemini-pro" si este falla
  systemInstruction: systemInstruction,
});
```

## 4. Reiniciar el Servidor

Después de editar `.env.local`, debes reiniciar el servidor de desarrollo:

1. Presiona `Ctrl + C` en la terminal donde corre `npm run dev`.
2. Vuelve a ejecutar `npm run dev`.

¡Listo! El chatbot debería funcionar correctamente.
