# Introducción 
Este proyecto permite iniciar una App vacía con la Configuración para que corra como PWA (Progressive Web App), usando el FWK Ionic 5.0 sobre Angular.

El proyecto tiene una Home vacía y una página de Instrucciones para instalación de la APP en dispositivos IOS. En sistemas Android la PWA puede ser instalada directamente, luego de que se invita al usuario desde un botón (en un Toast Notification)

# Requerimientos
Se necesita tener instalado NODE y NPM.
# Comienzo
1.	Instalar las dependencias :

`$ npm install `

2. Para iniciar un servidor de desarrollo local para desarrollo / prueba de aplicaciones ejecute :

`$ ionic serve`
- No se puede correr la PWA en este modo, solo sirve para desarrollar.

# Build
3. Para correr el proyecto como PWA deberá hacer el build del mismo :

`$ ionic build --prod`

4. Los archivos se guardan en la carpeta /www. 
Puede correr un servidor virtual para levantar la aplicación de forma local. Ej: Instalar Http Server:
`$ npm install --global http-server`

Pararse en la carpeta del build: `$ cd www`
Ejecutar el servicio:  `$ http-server `


[Más info sobre PWA en al siguente enlace](https://ionicframework.com/docs/angular/pwa)]
