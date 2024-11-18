# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura limpia con TypeScript

IMPORTANTE: Se debe configurar GMAIL para poder enviar correos, esto activando la verificación en 2 pasos y posteriormente crear un llave de acceso. Más información en:

https://support.google.com/accounts/answer/185839?hl=es-419&co=GENIE.Platform%3DDesktop
https://www.google.com/intl/es/account/about/passkeys/


# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false

```

3.Ejecutar el comando ```npm install```

4. Instalar docker y abrirlo

5.Levantar las bases de datos con el comando

``` docker compose up-d  ```

6.Ejecuta ```npm run dev``` para correr la aplicación