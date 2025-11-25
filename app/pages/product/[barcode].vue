<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-20">
    <!-- Loading State -->
    <div v-if="loading" class="w-full max-w-4xl space-y-8">
      <div class="text-center space-y-4">
        <div class="inline-block relative">
          <div class="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
        <h2 class="text-2xl font-bold text-black tracking-wider uppercase">
          Loading Product...
        </h2>
        <p class="text-gray-600 text-sm tracking-wide font-light">
          Fetching data from OpenFoodFacts
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="w-full max-w-4xl space-y-8">
      <div class="text-center space-y-6">
        <!-- Error Icon -->
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 relative group">
          <svg class="w-12 h-12 text-black relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>

        <!-- Error Title -->
        <div class="space-y-2">
          <h1 class="text-4xl font-bold text-black tracking-wider uppercase relative">
            <span class="relative z-10">{{ errorTitle }}</span>
          </h1>
          <p class="text-gray-600 text-lg tracking-wide font-light max-w-2xl mx-auto">
            {{ errorMessage }}
          </p>
        </div>

        <!-- Error Details -->
        <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
          <div class="space-y-3 text-left">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="flex-1">
                <p class="text-sm text-gray-600 font-mono">
                  Barcode: <span class="font-bold text-black">{{ barcode }}</span>
                </p>
              </div>
            </div>
            <div v-if="errorType === 'not_found'" class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-sm text-gray-600">
                This product is not in the OpenFoodFacts database. You can contribute by adding it!
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink 
            to="/"
            class="group relative overflow-hidden rounded-lg px-8 py-4 bg-black text-white hover:scale-105 transition-transform duration-300"
          >
            <div class="absolute inset-0 bg-linear-to-r from-transparent via-gray-800 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div class="relative flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span class="font-bold tracking-wider uppercase text-sm">Try Another</span>
            </div>
          </NuxtLink>

          <button 
            @click="retry"
            class="group relative overflow-hidden rounded-lg px-8 py-4 bg-gray-100 text-black hover:bg-gray-200 transition-colors duration-300"
          >
            <div class="relative flex items-center space-x-2">
              <svg class="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span class="font-bold tracking-wider uppercase text-sm">Retry</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Display -->
    <div v-else-if="product" class="w-full max-w-6xl space-y-8 animate-fade-in">
      <!-- Header -->
      <div class="text-center space-y-4">
        <NuxtLink 
          to="/"
          class="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300 group"
        >
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span class="text-sm tracking-wide font-light">Back to scanner</span>
        </NuxtLink>

        <h1 class="text-5xl font-bold text-black tracking-wider uppercase relative">
          <span class="relative z-10">{{ product.product_name || 'Unknown Product' }}</span>
        </h1>
        
        <p v-if="product.brands" class="text-xl text-gray-600 tracking-wide font-light">
          {{ product.brands }}
        </p>

        <div class="flex items-center justify-center space-x-2 text-sm text-gray-500 font-mono">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
          </svg>
          <span>{{ barcode }}</span>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div class="relative group">
          <div class="absolute -inset-0.5 bg-linear-to-r rounded-lg blur"></div>
          <div class="relative bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200 aspect-square flex items-center justify-center">
            <img 
              v-if="product.image_url" 
              :src="product.image_url" 
              :alt="product.product_name || 'Product image'"
              class="w-full h-full object-contain p-8"
            />
            <div v-else class="text-center space-y-4">
              <svg class="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="text-gray-400 text-sm tracking-wide">No image available</p>
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Scores -->
          <div v-if="product.nutriscore_grade || product.ecoscore_grade || product.nova_groups" class="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-if="product.nutriscore_grade" class="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center space-y-2">
              <p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Nutri-Score</p>
              <div class="text-4xl font-bold uppercase" :class="getNutriScoreColor(product.nutriscore_grade)">
                {{ product.nutriscore_grade }}
              </div>
            </div>
            <div v-if="product.ecoscore_grade" class="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center space-y-2">
              <p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Eco-Score</p>
              <div class="text-4xl font-bold uppercase" :class="getEcoScoreColor(product.ecoscore_grade)">
                {{ product.ecoscore_grade }}
              </div>
            </div>
            <div v-if="product.nova_groups" class="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center space-y-2">
              <p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Nova Score</p>
              <div class="text-4xl font-bold" :class="getNovaScoreColor(product.nova_groups)">
                {{ product.nova_groups }}
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div v-if="product.categories" class="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 space-y-3">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              <h3 class="text-sm font-bold text-black uppercase tracking-wider">Categories</h3>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">{{ product.categories }}</p>
          </div>

          <!-- Nutrition Facts -->
          <div v-if="product.nutriments" class="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 space-y-4">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <h3 class="text-sm font-bold text-black uppercase tracking-wider">Nutrition Facts (per 100g)</h3>
            </div>
            <div class="space-y-2">
              <div v-if="product.nutriments.energy_100g" class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Energy</span>
                <span class="text-sm font-bold text-black font-mono">{{ product.nutriments.energy_100g }} kJ</span>
              </div>
              <div v-if="product.nutriments.fat_100g !== undefined" class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Fat</span>
                <span class="text-sm font-bold text-black font-mono">{{ product.nutriments.fat_100g }} g</span>
              </div>
              <div v-if="product.nutriments.carbohydrates_100g !== undefined" class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Carbohydrates</span>
                <span class="text-sm font-bold text-black font-mono">{{ product.nutriments.carbohydrates_100g }} g</span>
              </div>
              <div v-if="product.nutriments.proteins_100g !== undefined" class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm text-gray-600">Proteins</span>
                <span class="text-sm font-bold text-black font-mono">{{ product.nutriments.proteins_100g }} g</span>
              </div>
              <div v-if="product.nutriments.salt_100g !== undefined" class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Salt</span>
                <span class="text-sm font-bold text-black font-mono">{{ product.nutriments.salt_100g }} g</span>
              </div>
            </div>
          </div>

          <!-- Ingredients -->
          <div v-if="product.ingredients_text" class="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 space-y-3">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="text-sm font-bold text-black uppercase tracking-wider">Ingredients</h3>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">{{ product.ingredients_text }}</p>
          </div>
        </div>
      </div>

      <!-- Share Button -->
      <div class="flex justify-center pt-8">
        <button 
          @click="shareProduct"
          class="group relative overflow-hidden rounded-lg px-8 py-4 bg-black text-white hover:scale-105 transition-transform duration-300"
        >
          <div class="absolute inset-0 bg-linear-to-r from-transparent via-gray-800 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <div class="relative flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
            </svg>
            <span class="font-bold tracking-wider uppercase text-sm">Share Product</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OpenFoodFactsProduct } from '~/types/product'

const route = useRoute()
const barcode = computed(() => route.params.barcode as string)

const loading = ref(true)
const error = ref(false)
const errorType = ref<'not_found' | 'api_error' | 'invalid_barcode'>('not_found')
const errorTitle = ref('')
const errorMessage = ref('')
const product = ref<OpenFoodFactsProduct | null>(null)

const { getProductByBarcode } = useOpenFoodFacts()

// Fetch product data on mount
onMounted(async () => {
  await fetchProduct()
})

const fetchProduct = async () => {
  loading.value = true
  error.value = false
  product.value = null

  try {
    // Validate barcode format
    if (!barcode.value || barcode.value.trim().length === 0) {
      throw new Error('invalid_barcode')
    }

    const response = await getProductByBarcode(barcode.value)
    
    if (response && response.status === 1 && response.product) {
      product.value = response.product
    } else {
      throw new Error('not_found')
    }
  } catch (err: any) {
    error.value = true
    
    // Determine error type
    if (err.message === 'invalid_barcode') {
      errorType.value = 'invalid_barcode'
      errorTitle.value = 'Invalid Barcode'
      errorMessage.value = 'The barcode format is invalid. Please check and try again.'
    } else if (err.message === 'not_found' || (err.response && err.response.status === 404)) {
      errorType.value = 'not_found'
      errorTitle.value = 'Product Not Found'
      errorMessage.value = 'This product is not available in the OpenFoodFacts database.'
    } else {
      errorType.value = 'api_error'
      errorTitle.value = 'Connection Error'
      errorMessage.value = 'Unable to connect to OpenFoodFacts API. Please check your internet connection and try again.'
    }
    
    console.error('Error fetching product:', err)
  } finally {
    loading.value = false
  }
}

const retry = () => {
  fetchProduct()
}

const shareProduct = async () => {
  const url = window.location.href
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.value?.product_name || 'Product',
        text: `Check out this product: ${product.value?.product_name || 'Unknown'} by ${product.value?.brands || 'Unknown'}`,
        url: url
      })
    } catch (err) {
      console.log('Share cancelled or failed:', err)
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
}

const getNutriScoreColor = (grade: string) => {
  const colors: Record<string, string> = {
    'a': 'text-green-600',
    'b': 'text-lime-600',
    'c': 'text-yellow-600',
    'd': 'text-orange-600',
    'e': 'text-red-600'
  }
  return colors[grade.toLowerCase()] || 'text-gray-600'
}

const getEcoScoreColor = (grade: string) => {
  const colors: Record<string, string> = {
    'a': 'text-green-600',
    'b': 'text-lime-600',
    'c': 'text-yellow-600',
    'd': 'text-orange-600',
    'e': 'text-red-600'
  }
  return colors[grade.toLowerCase()] || 'text-gray-600'
}

const getNovaScoreColor = (score: number) => {
  const colors: Record<number, string> = {
    1: 'text-green-600',
    2: 'text-yellow-600',
    3: 'text-orange-600',
    4: 'text-red-600'
  }
  return colors[score] || 'text-gray-600'
}

// SEO
useHead({
  title: computed(() => product.value?.product_name 
    ? `${product.value.product_name} - Product Info` 
    : 'Product Information'),
  meta: [
    {
      name: 'description',
      content: computed(() => product.value?.product_name 
        ? `Information about ${product.value.product_name} by ${product.value.brands || 'Unknown'}` 
        : 'Product information from OpenFoodFacts')
    }
  ]
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
