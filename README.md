# Plat'Est - Observatoire du Trafic Alsacien 🚗🌤️

Plat'Est est une plateforme interactive de visualisation géographique du territoire alsacien et du trafic routier en temps réel. Elle affiche les limites des départements du **Bas-Rhin (67)** et du **Haut-Rhin (68)**, intègre la météo en direct sur le réseau routier, et cartographie les ralentissements et incidents routiers réels.

Cette plateforme fonctionne exclusivement avec de la **donnée réelle en temps réel** issue des services officiels de TomTom et Open-Meteo. Il n'y a plus de mode de simulation ou démo.

---

## 🚀 Fonctionnalités
- **Carte Interactive (Folium/Leaflet)** :
  - Fonds de carte personnalisables (Premium Sombre, OpenStreetMap, Épuré Clair).
  - Tracé officiel et mise en surbrillance des limites du territoire alsacien.
  - Couches de trafic TomTom (flux en temps réel et icônes d'incidents) superposées.
  - Marqueurs cliquables géolocalisant chaque incident avec descriptif, retard estimé et longueur du bouchon.
- **Régulateur de Zoom** : Boutons de recentrage rapide sur l'Alsace entière, Strasbourg, Colmar, Mulhouse et le Col de Saverne.
- **Météo Intégrée (Open-Meteo)** : Température et état du ciel actualisés pour les villes clés du réseau routier (Strasbourg, Haguenau, Colmar, Mulhouse).
- **Indicateurs de Performance (KPI)** : Comptage des incidents actifs réels, somme totale des retards sur le réseau, et sévérité globale.
- **Journal et Filtres de Recherche** : Recherche textuelle d'un axe (ex: A35) et filtrage par sévérité pour retrouver rapidement les blocages clés.
- **Statistiques Graphiques** : Analyse visuelle du cumul de minutes perdues par axe routier et répartition des sévérités d'accidents.
- **Alerte Sécurité Routière** : Adaptation automatique des conseils de sécurité et de vitesse en fonction de la météo (ex: abaissement de vitesse obligatoire en cas de pluie sur l'A35).

---

## 📦 Architecture du Projet
```text
platt_traf/
├── .streamlit/
│   └── config.toml          # Thème et paramètres du serveur Streamlit
├── data/
│   └── alsace.geojson       # Limites territoriales d'Alsace pré-filtrées
├── scripts/
│   └── download_geojson.py  # Script de téléchargement et filtrage du GeoJSON
├── app.py                   # Code source principal du tableau de bord Streamlit
├── requirements.txt         # Dépendances logicielles du projet
└── README.md                # Ce guide d'utilisation
```

---

## 🛠️ Installation et Démarrage

### 1. Activer votre environnement Anaconda
L'exécution de l'application utilise l'environnement `base` d'Anaconda. Ouvrez une invite de commande (Anaconda Prompt ou PowerShell) et déplacez-vous dans le dossier de l'application.

### 2. Configurer votre Clé API TomTom
Créez un compte gratuit sur le **[TomTom Developer Portal](https://developer.tomtom.com/)** pour obtenir votre clé API gratuite (2 500 requêtes gratuites par jour).

Vous pouvez configurer votre clé de deux façons :
- **Directement dans le code** : Ouvrez le fichier [app.py](file:///c:/Users/hamilton.de-araujo/OneDrive%20-%20Alsace/Apps/platt_traf/app.py) et collez votre clé dans la variable `TOMTOM_API_KEY` à la ligne 12 :
  ```python
  TOMTOM_API_KEY = "VOTRE_CLE_API_ICI"
  ```
- **Via une Variable d'Environnement** : Définissez une variable nommée `TOMTOM_API_KEY` dans votre terminal ou système avant de lancer Streamlit :
  ```powershell
  $env:TOMTOM_API_KEY="VOTRE_CLE_API_ICI"
  ```
- **Via l'interface** : Si aucune clé n'est configurée dans le code ou l'environnement, l'application affichera un message d'explications et vous demandera de coller votre clé dans le champ masqué du panneau latéral gauche.

### 3. Démarrer l'application
Lancez le serveur Streamlit en exécutant la commande suivante dans votre terminal :

```powershell
& "C:\Users\hamilton.de-araujo\AppData\Local\anaconda3\Scripts\streamlit.exe" run app.py
```

L'application s'ouvrira automatiquement dans votre navigateur à l'adresse :
👉 [http://localhost:8501](http://localhost:8501)
