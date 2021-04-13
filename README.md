# pickngo_mobile_fe
MOIS projekt - PicknGo - bageta na míru. Mobilní multiplarformní aplikace pro studenty UHK.

Pro spuštění:

(npx react-native start)

npx react-native run-android - mělo by stačit pouze toto

Více info: https://reactnative.dev/docs/environment-setup

Pokud používáte emulátor, tak se sám spustí a aplikace se pustí v něm (doporučuju emulátor zapnout předem - někdy se tak dlouho načítá, že nasazení failne)

Pokud používáte fyzické zařízení tak doporučuji příkazem "adb devices" zjistit, zda je zařízení rdy, jinak se začne pouštět emulátor a nasazovat se v něm. Zjistí se to tak, že vlevo je vždy ID zařízení (nebo tk něco) a vpravo napsáno "device", nikoliv "unauthorized".

Podle toho v čem pouštíte, musíte také měnit v app/constants/endpoints/index.js URL endpointů (viz komentář v souboru).
