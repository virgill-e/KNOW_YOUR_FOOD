<template>
  <div class="bg-white flex flex-col items-center justify-center px-8 py-40">
    <div class="w-full max-w-md space-y-8">
      
      <!-- Titre -->
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-bold text-black tracking-wider uppercase relative">
          <span class="relative z-10">Barcode Scanner</span>
        </h1>
        <p class="text-gray-600 text-sm tracking-wide font-light">
          Enter the barcode number or scan it
        </p>
      </div>

      <!-- Input du qrcode -->
      <div class="relative group"> 
        <div class="relative">
          <input 
            v-model="barcode"
            type="text" 
            placeholder="Enter barcode..."
            class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 
                   focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
                   transition-all duration-300 font-mono tracking-wider
                   hover:border-gray-400 hover:bg-gray-100/50"
            @keyup.enter="validateBarcode"
          />
                    
          <!-- Bouton caméra dans l'input -->
          <button 
            type="button"
            @click="openScanner"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md
                   bg-black text-white
                   hover:bg-gray-800 hover:scale-110
                   active:scale-95
                   transition-all duration-200
                   group/camera"
            title="Scan with camera"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Bouton de validation -->
      <button 
        @click="validateBarcode"
        class="w-full relative group overflow-hidden rounded-lg"
      >
        <!-- Background du bouton -->
        <div class="absolute inset-0 bg-black transition-transform duration-300 group-hover:scale-105"></div>
        <div class="absolute inset-0 bg-linear-to-r from-transparent via-gray-800 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        <!-- Contenu du bouton -->
        <div class="relative px-8 py-4 flex items-center justify-center space-x-3">
          <span class="text-white font-bold tracking-wider uppercase text-sm">
            Validate Barcode
          </span>
          <svg class="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </button>
    </div>

    <!-- Modal du scanner -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showScanner" 
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          @click.self="closeScanner"
        >
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <!-- Header du modal -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 class="text-xl font-bold text-black tracking-wide">Scan Barcode</h2>
              <button 
                @click="closeScanner"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Zone du scanner -->
            <div class="p-6">
              <div id="qr-reader" class="w-full rounded-lg overflow-hidden border-2 border-gray-300"></div>
              <p class="mt-4 text-center text-sm text-gray-600">
                Position the barcode or QR code within the frame
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Html5Qrcode } from 'html5-qrcode'

const barcode = ref('')
const error = ref<string | null>(null)
const showScanner = ref(false)
let html5QrCode: Html5Qrcode | null = null

const validateBarcode = async () => {
  if (!barcode.value.trim()) {
    error.value = 'Please enter a barcode'
    return
  }

  // Navigate to product page with barcode in URL
  await navigateTo(`/product/${barcode.value.trim()}`)
}

const openScanner = async () => {
  showScanner.value = true
  
  // Attendre que le DOM soit mis à jour
  await nextTick()
  
  try {
    html5QrCode = new Html5Qrcode("qr-reader")
    
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0
    }
    
    await html5QrCode.start(
      { facingMode: "environment" }, // Utiliser la caméra arrière sur mobile
      config,
      (decodedText) => {
        // Succès du scan
        barcode.value = decodedText
        closeScanner()
      },
      (errorMessage) => {
        // Erreur de scan (normal pendant le scan)
        // On ne fait rien ici car c'est normal d'avoir des erreurs pendant le scan
      }
    )
  } catch (err) {
    console.error('Error starting scanner:', err)
    error.value = 'Unable to access camera'
    showScanner.value = false
  }
}

const closeScanner = async () => {
  if (html5QrCode) {
    try {
      await html5QrCode.stop()
      html5QrCode.clear()
    } catch (err) {
      console.error('Error stopping scanner:', err)
    }
    html5QrCode = null
  }
  showScanner.value = false
}

// Nettoyer le scanner si le composant est démonté
onUnmounted(() => {
  if (html5QrCode) {
    html5QrCode.stop().catch(console.error)
  }
})
</script>

<style scoped>
/* Animations pour le modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
}
</style>