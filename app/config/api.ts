/**
 * Configuration de l'API OpenFoodFacts
 */
export const OPENFOODFACTS_CONFIG = {
    baseUrl: 'https://world.openfoodfacts.net/api/v2',
    endpoints: {
        product: (barcode: string) => `/product/${barcode}`,
        search: '/search'
    }
} as const
