# users-vue

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### run server
```
nodemon server
```
Ce projet contient la vulnérabilité d'injection de commande. A travers des input mal sécurisés, un utilisateur frauduleux pourra trouver des informations en injectant des commandes. Il convient de vérifier les inputs et d'assainir les données (e.g ne pas utiliser la commande exec du module child_process)
