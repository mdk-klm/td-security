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

Il contient également la vulnérabilité "json injection". Sur le formualire de création d'un utilisateur, les champs ne sont pas sécurisés. En récupérant la donnée Json de la création d'un nouvel utilisateur, la manipuler pour outrepasser certains droits de lecture et d'écriture

On peut aussi remarquer une faille LFI au niveau du dossier public
