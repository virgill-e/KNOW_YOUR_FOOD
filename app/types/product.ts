export interface OpenFoodFactsProduct {
    product_name?: string
    brands?: string
    categories?: string
    image_url?: string
    nutriscore_grade?: string
    ecoscore_grade?: string
    nova_groups?: number
    ingredients_text?: string
    nutriments?: {
        energy_100g?: number
        fat_100g?: number
        carbohydrates_100g?: number
        proteins_100g?: number
        salt_100g?: number
    }
}

export interface OpenFoodFactsResponse {
    status: number
    code?: string
    product?: OpenFoodFactsProduct
    status_verbose?: string
}
