# Structure du Projet - OpenFoodFacts Integration

## 📁 Architecture

Ce projet suit les meilleures pratiques Nuxt 3 avec une séparation claire des responsabilités :

```
app/
├── composables/          # Logique réutilisable
│   └── useOpenFoodFacts.ts
├── types/               # Définitions TypeScript
│   └── product.ts
├── config/              # Configuration centralisée
│   └── api.ts
└── pages/               # Pages de l'application
    └── index.vue
```

## 🔧 Composables

### `useOpenFoodFacts()`

Composable pour interagir avec l'API OpenFoodFacts.

**Méthodes :**
- `getProductByBarcode(barcode: string)` - Récupère les informations d'un produit

**Exemple d'utilisation :**
```typescript
const { getProductByBarcode } = useOpenFoodFacts()

const response = await getProductByBarcode('3017620422003')
if (response?.status === 1) {
  console.log(response.product)
}
```

## 📝 Types

### `OpenFoodFactsProduct`
Interface TypeScript pour les données d'un produit.

### `OpenFoodFactsResponse`
Interface TypeScript pour la réponse de l'API.

## ⚙️ Configuration

Les constantes API sont centralisées dans `config/api.ts` pour faciliter la maintenance.

## 🎯 Bonnes Pratiques Implémentées

✅ Séparation de la logique API et UI  
✅ Typage TypeScript complet  
✅ Configuration centralisée  
✅ Gestion d'erreurs robuste  
✅ Composables réutilisables  
✅ Documentation JSDoc  
