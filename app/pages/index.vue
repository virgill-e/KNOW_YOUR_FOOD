<template>
  <div class="bg-white flex flex-col items-center justify-center px-8 py-40">
    <div class="w-full max-w-md space-y-8">
      
      <!-- Titre -->
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-bold text-black tracking-wider uppercase relative">
          <span class="relative z-10">Barcode Scanner</span>
          <div class="absolute inset-0 blur-xl bg-black opacity-10"></div>
        </h1>
        <p class="text-gray-600 text-sm tracking-wide font-light">
          Enter the barcode number or scan it
        </p>
      </div>

      <!-- Input du qrcode -->
      <div class="relative group">
        <!-- Effet de glow animé -->
        <div class="absolute -inset-0.5 bg-linear-to-r from-black to-gray-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
        
        <div class="relative">
          <input 
            type="text" 
            placeholder="Enter barcode..."
            class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 
                   focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
                   transition-all duration-300 font-mono tracking-wider
                   hover:border-gray-400 hover:bg-gray-100/50"
          />
                    
          <!-- Bouton caméra dans l'input -->
          <button 
            type="button"
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
      <button class="w-full relative group overflow-hidden rounded-lg">
        <!-- Background du bouton -->
        <div class="absolute inset-0 bg-black transition-transform duration-300 group-hover:scale-105"></div>
        <div class="absolute inset-0 bg-linear-to-r from-transparent via-gray-800 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        <!-- Contenu du bouton -->
        <div class="relative px-8 py-4 flex items-center justify-center space-x-3">
          <span class="text-white font-bold tracking-wider uppercase text-sm">Validate Barcode</span>
          <svg class="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>