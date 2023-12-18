# Documentation

# La stack

<img src="https://github.com/get-icon/geticon/raw/master/icons/mongodb-icon.svg" alt="Mongo Icon" width="100" height="100"/>
<img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React Icon" width="100" height="100"/>
<img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="TypeScript Icon" width="100" height="100"/>
<img src="https://github.com/get-icon/geticon/raw/master/icons/fastify-icon.svg" alt="Fastify Icon" width="100" height="100"/>


Pour ce projet, nous étions libres de choisir la stack choisie en dehors de MongoDB. Nous avons choisis React en TypeScript pour le front et Fastify pour le back. Nous avons choisis TypeScript car c'est plus robuste  et plus maintenable. Fastify quant à lui est un framwork qui est très léger et rapide, répondant donc à nos besoins.

# Hébergement de la base de données

Pour héberger les données, nous avons utilisé MongoAtlas, qui est un service de MongoDB proposé gratuitement. 

<img src="https://i.ibb.co/c2GfMt7/image.png"/>

# Le Front

## Les composants
 Les composants sont utilisés dans les pages afin de réduire le nombre de lignes de code.

### Barre de recherche

Le composant `SearchAppBar` permet de rechercher un `Customer`. Il intègre les `Routes` pour la navigation.

## Le layout

Le `Layout` permet de donner aux enfants du composant le style. Il suffit d'envelopper les éléments dans ce composant. 

<img src="https://i.ibb.co/0rrBwq7/image.png"/>

Exemple de page `NotFound` avec le `Layout` qui permet de renvoyer l’utilisateur à l'aide d'un bouton sur la page principale.

## Pages

Les pages contiennent les composants nécessaire à la complétion de celle-ci.

### Add

La page `Add` affiche différents champs d'entrées afin que l'utilisateur entre les données souhaitées pour les inclure dans la base de données.


### CustomerDetails

La page `CustomerDetails` affiche les détails du `Customer` à travers différent champs. 
<img src="https://i.ibb.co/8XYTnvk/image.png"/>

### Landing

La page `Landing` permet de lister tous les `Customers`. Une petite icone représentant une poubelle permet de supprimer le `Customer` en question. Un bouton, nommé `Add Customer` juste dessous cette liste, permet de rediriger l'utilisateur vers la page `Modify`, permettant à l'utilisateur de modifier un `Customer`.

<img src="https://i.ibb.co/qWvMcfV/image.png"/>


### Modify

La page `Modify` permet aux utilisateurs de modifier les données existantes. Elle est équipée d'interfaces interactives pour faciliter la mise à jour des informations.

### NotFound

La page `NotFound` est une page d'erreur affichée lorsque l'utilisateur tente d'accéder à une page qui n'existe pas ou n'est plus disponible. Elle est utile pour informer l'utilisateur de l'erreur et le rediriger vers des pages valides. Elle possède un bouton qui permet de retourner sur la page principale.

### SearchList

La page `SearchList` est conçue pour afficher les résultats d'une recherche. Elle présente les données trouvées de manière organisée, permettant aux utilisateurs de naviguer facilement à travers les résultats de leur recherche. Lorsque l'utilisateur clique sur un des `Customers`, il est renvoyé vers la page `CustomerDetails`.

<img src="https://i.ibb.co/WWzH1kN/image.png"/>

## Le Store

Le store permet de garder en mémoire le `Customer` choisit lorsqu'on clique dessus, afin de le passer aux différents composants qui en ont besoin. 

## Les Types

### Customer

Le type `Customer` prends les valeurs `id`, `username`, `name`, `address` et `email`.

## Les Routes

Les routes permettent à l'utilisateur de pouvoir naviguer entre les différentes pages de l'application.

<img src="https://i.ibb.co/488VL34/image.png"/>

L'élément `Suspense`permet d'afficher un texte lors d'un chargement. 

# Le back 

Le back permet la connexion à la base de données et d'en récupérer le contenu afin de l'envoyer au front.

## Connexion à la base de données

Pour se connecter à la base de données hébergée sur [MongoAtlas](https://www.mongodb.com/atlas/database), nous avons utilisé le `Pattern Repository`, qui permet de regrouper et de centraliser les appels à la base de données dans un classe.

<img src="https://i.ibb.co/SwbvCZq/image.png"/>

## Endpoints

Les `Endpoits` sont des liens de l'API permettant au front de récupérer certaines données voulues.  


## Clients

### Obtenir tous les `Customers`

- **Endpoint :** `/customers`
- **Méthode :** `GET`
- **Description :** Récupère une liste de tous les `Customers`.

### Obtenir un `Customer` par son nom d'utilisateur

- **Endpoint :** `/customer/username/:username`
- **Méthode :** `GET`
- **Description :** Récupère les détails d'un `Customer` en fonction de son nom d'utilisateur.
- **Paramètres :**
  - `username` : Chaîne de caractères (obligatoire)
  
<img src="https://i.ibb.co/2WWCLfz/image.png"/>

<img src="https://i.ibb.co/BKYKsJN/image.png"/>

### Obtenir un `Customer` par son ID

- **Endpoint :** `/customer/id/:id`
- **Méthode :** `GET`
- **Description :** Récupère les détails d'un `Customer` en fonction de son identifiant unique.
- **Paramètres :**
  - `id` : Chaîne de caractères (obligatoire)

### Rechercher un `Customer`

- **Endpoint :** `/customer/:valeur`
- **Méthode :** `GET`
- **Description :** Recherche des `Customers` correspondant à une partie de leur nom d'utilisateur.
- **Paramètres :**
  - `valeur` : Chaîne de caractères (obligatoire)

## Créer un `Customer`

- **Endpoint :** `/customer`
- **Méthode :** `POST`
- **Description :** Crée un nouvel enregistrement de `Customer`.
- **Corps de la requête :**
  - `username` : Chaîne de caractères
  - `name` : Chaîne de caractères
  - `address` : Chaîne de caractères
  - `email` : Chaîne de caractères

## Mettre à jour un `Customer`

- **Endpoint :** `/customer`
- **Méthode :** `PUT`
- **Description :** Met à jour le nom d'utilisateur d'un `Customer` existant.
- **Corps de la requête :**
  - `id` : Chaîne de caractères (obligatoire)
  - `username` : Chaîne de caractères (obligatoire)

## Supprimer un `Customer` par son ID

- **Endpoint :** `/customer/id/:id`
- **Méthode :** `DELETE`
- **Description :** Supprime un `Customer` en fonction de son identifiant unique.
- **Paramètres :**
  - `id` : Chaîne de caractères (obligatoire)

## Supprimer un `Customer` par son nom d'utilisateur

- **Endpoint :** `/customer/username/:username`
- **Méthode :** `DELETE`
- **Description :** Supprime un `Customer` en fonction de son nom d'utilisateur.
- **Paramètres :**
  - `username` : Chaîne de caractères (obligatoire)
