# 🔍 Know - Barcode Scanner & Product Information

**Know your food** est une application web permettant de scanner des codes-barres pour obtenir des informations détaillées sur les produits alimentaires via l'API OpenFoodFacts.

## ✨ Fonctionnalités

- 📷 **Scan de codes-barres en temps réel** - Utilisez votre caméra pour scanner directement les codes-barres et QR codes
- ⌨️ **Saisie manuelle** - Entrez manuellement le code-barres si vous le connaissez
- 📊 **Informations nutritionnelles** - Consultez les scores Nutri-Score, Eco-Score et NOVA
- 🌍 **Base de données mondiale** - Accès à la base de données collaborative OpenFoodFacts
- 📱 **Design responsive** - Interface optimisée pour mobile et desktop

## 🛠️ Technologies utilisées

- **[Nuxt 4](https://nuxt.com/)** - Framework Vue.js pour applications web modernes
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progressif
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[html5-qrcode](https://github.com/mebjas/html5-qrcode)** - Bibliothèque de scan de QR codes et codes-barres
- **[OpenFoodFacts API](https://world.openfoodfacts.org/)** - API pour les informations produits
- **TypeScript** - Typage statique pour JavaScript

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm, pnpm, yarn ou bun

### Étapes d'installation

1. Clonez le dépôt :
```bash
git clone <votre-repo>
cd know
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur à l'adresse `http://localhost:3000`


## 🌐 API

Ce projet utilise l'API OpenFoodFacts v2 :
- **Endpoint** : `https://world.openfoodfacts.net/api/v2/product/{barcode}`
- **Documentation** : [OpenFoodFacts API Docs](https://openfoodfacts.github.io/openfoodfacts-server/api/)
