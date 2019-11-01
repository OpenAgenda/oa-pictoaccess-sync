# Résumé

Boucle sur une selection d'agendas pour mettre à jour les lieux y étant référencés avec des identifiants pictoaccess fournis sur un csv à une URL définie.

Ce script a été testé sur node v12.11.1

# Développement

Le script `run.js` peut-être executé par un cron une fois les variables d'environnement définies. En développement, un fichier `config.dev.js` doit être créé exportant les valeurs suivantes:

```
module.exports = {
  csvPath: 'urlducsvPictoAccess',
  secretKey: 'cléSecretedUnCompteOAAdministateurDesAgendas',
  forceUpdate: false
};
```

Installation: `yarn`

Lancer `yarn dev` pour executer le script avec la configuration de développement.

Lancer les tests: `yarn test`

# Log

01/11/2019

 * Un fichier gitignoré contient une config de développement: `config.dev.js`. Il contient les informations sensibles, c'est à dire les clés du compte utilisé pour mettre à jour les lieux sur OpenAgenda et le chemin vers le fichier CSV source des lieux pictoaccess
 * Précisé une version de node. la dépendence geolib est [incompatible](https://github.com/manuelbieh/geolib/issues/208) avec node v12.11.0
