# Projet Les Petits Plats

### Contexte

Après avoir édité des livres de cuisine pendant plusieurs années, l’entreprise Les Petits Plats a décidé de se lancer dans un nouveau projet : réaliser son propre site de recettes de cuisine à l’instar de Marmiton ou 750g.   
Les sites offrant des recettes de cuisine sont nombreux. Ce qui peut faire la différence sur le site? la fluidité du moteur de recherche.

### Objectif

Implémenter un formulaire de recherche performant et rapide.

### Contraintes 

Ecrire soi-même tout le Javascript sans librairie en respectant les principes du GreenCode

1. La recherche doit pouvoir se faire via le champ principal ou via les tags
(ingrédients, ustensiles ou appareil)
2. La recherche principale se lance à partir de 3 caractères entrés par l’utilisateur
dans la barre de recherche
3. La recherche s’actualise pour chaque nouveau caractère entré
4. La recherche principale affiche les premiers résultats le plus rapidement possible
5. Les champs ingrédients, ustensiles et appareil de la recherche avancée
proposent seulement les éléments restant dans les recettes présentes sur la
page
6. Les retours de recherche doivent être une intersection des résultats. Si l’on
ajoute les tags “coco” et “chocolat” dans les ingrédients, on doit récupérer les
recettes qui ont à la fois de la coco et du chocolat.
7. Comme pour le reste du site, le code HTML et CSS pour l’interface devra
passer avec succès le validateur W3C .
8. Aucune librairie ne sera utilisée pour le JavaScript du moteur de recherche

### Maquette

[Lien vers la maquette Figma](https://www.figma.com/design/LY5VQTAqnrAf0bWObOBrt8/Les-petits-plats---Maquette-2.0?node-id=0-1&node-type=canvas&t=d3Aq5uuVRxdd43KF-0)

### Réalisation

Implémenter l'interface à partir le la maquette Figma.
Implémenter un formulaire de recherche: Faire deux implémentations différentes pour pouvoir comparer leurs performances et choisir la meilleure.
Réaliser une fiche d’investigation de fonctionnalité.
