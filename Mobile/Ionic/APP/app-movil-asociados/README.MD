# OPA App Movil

## Installation Dev

login and add opa registry
```bash
npm login --scope=@OPASAS --registry=https://npm.pkg.github.com
npm config set @opasas:registry https://npm.pkg.github.com/
```

install deps npm
```bash
npm install
```

add platform android
```bash
ionic cordova platform add android
```

build app angular for cordova
```bash
ionic build --engine cordova  --prod --cordova-assets --platform android
```


cordova install plugins and copy frontend
```bash
ionic cordova prepare
```

set build version: 4.0.1
set graddle version: 6.1.1

____________________________________
comandos para generar apk 


1. ionic build


2. ionic cordova prepare


3. ionic build --engine cordova  --prod --cordova-assets --platform android


4. ionic cordova build android --release

____________________________________________

  <!-- <allow-navigation href="blob:*" /> -->
