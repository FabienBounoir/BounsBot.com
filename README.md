# Le Frontend du site Bouns'Bot

Le site permet dans un premier temps de détaillant les fonctionnalité du [Bouns'Bot](https://bounsbot.herokuapp.com/commandes) mais aussi la visualisation des levels des utilisateurs, mais aussi de pouvoir gerer directement le Bot discord avec l'interface web.

Une petit Demo du Bouns'Bot est disponible [ici](https://bounsbot.herokuapp.com/demo) 

## Technologie:

Le site est realisé principalement en [React](https://reactnative.dev/), 
La page [Demo](https://bounsbot.herokuapp.com/demo) utilise [socket.io](https://socket.io/) pour l'envoie des messages, mais aussi de la voix aux differents clients connecté
Le site est hebergé sur [Heroku](https://www.heroku.com/)

Pour recuperer les differents User de la page [level](http://bounsbot.herokuapp.com/level) j'utilise une [API](https://github.com/FabienBounoir/BounsBot-Backend) faite maison.

L'oauth2 [Discord](https://discord.com/developers/docs/intro) est integré sur le site internet pour pouvoir avoir les guilds / le profil de l'utilisateur connecté directement sur le site.

### Information

Pour voir en action le Bouns'Bot cela se passe [ici](https://discord.gg/KxedRVTutX)
