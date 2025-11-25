import type { OpenFoodFactsResponse } from '~/types/product'
import { OPENFOODFACTS_CONFIG } from '~/config/api'

export const useOpenFoodFacts = () => {
    /**
     * Récupère les informations d'un produit par son code-barres
     * @param barcode - Le code-barres du produit
     * @returns Les données du produit ou null si non trouvé
     */
    const getProductByBarcode = async (barcode: string): Promise<OpenFoodFactsResponse | null> => {
        if (!barcode || !barcode.trim()) {
            throw new Error('Barcode is required')
        }

        try {
            const response = await $fetch<OpenFoodFactsResponse>(
                `${OPENFOODFACTS_CONFIG.baseUrl}${OPENFOODFACTS_CONFIG.endpoints.product(barcode.trim())}`
            )

            return response
        } catch (error) {
            console.error('Error fetching product from OpenFoodFacts:', error)
            throw error
        }
    }

    return {
        getProductByBarcode
    }
}
