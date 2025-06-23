<template>
  <div class="world-class-search-criteria">
    <!-- Hero Section -->
    <div class="hero-section mb-10">
      <div class="hero-card">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="hero-title">Search Criteria</h1>
            <p class="hero-subtitle">Define your perfect car deal parameters</p>
          </div>
          <div class="search-illustration">
            <div class="floating-icon">
              <v-icon icon="mdi-car-search" size="64" color="primary"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-row>
      <!-- Main Form -->
      <v-col cols="12" lg="8">
        <div class="glass-card mb-8">
          <h2 class="section-title mb-6">Vehicle Preferences</h2>
          
          <v-form class="search-form">
            <!-- Brand & Model -->
            <div class="form-section mb-8">
              <h3 class="section-subtitle mb-4">Brand & Model</h3>
              <v-row>
                <v-col cols="12" md="6">
                  <label class="form-label">Brand</label>
                  <v-select
                    :items="brands"
                    placeholder="Select brand(s)"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="premium-select"
                    multiple
                    chips
                    hide-details
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <label class="form-label">Model</label>
                  <v-select
                    :items="models"
                    placeholder="Select model(s)"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="premium-select"
                    multiple
                    chips
                    hide-details
                  />
                </v-col>
              </v-row>
            </div>

            <!-- Price Range -->
            <div class="form-section mb-8">
              <h3 class="section-subtitle mb-4">Price Range</h3>
              <div class="price-section">
                <div class="price-display mb-4">
                  <div class="price-label">Budget Range</div>
                  <div class="price-values">
                    €{{ formatPrice(priceRange[0]) }} - €{{ formatPrice(priceRange[1]) }}
                  </div>
                </div>
                <v-range-slider
                  v-model="priceRange"
                  :min="0"
                  :max="200000"
                  :step="1000"
                  color="primary"
                  track-color="surface-variant"
                  class="premium-slider"
                />
                <div class="slider-labels">
                  <span>€0</span>
                  <span>€200k+</span>
                </div>
              </div>
            </div>

            <!-- Year Range -->
            <div class="form-section mb-8">
              <h3 class="section-subtitle mb-4">Year Range</h3>
              <v-row>
                <v-col cols="6">
                  <label class="form-label">From Year</label>
                  <v-select
                    :items="years"
                    placeholder="2010"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="premium-select"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <label class="form-label">To Year</label>
                  <v-select
                    :items="years"
                    placeholder="2024"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="premium-select"
                    hide-details
                  />
                </v-col>
              </v-row>
            </div>

            <!-- Mileage -->
            <div class="form-section mb-8">
              <h3 class="section-subtitle mb-4">Maximum Mileage</h3>
              <div class="mileage-section">
                <div class="mileage-display mb-4">
                  <div class="mileage-label">Max Kilometers</div>
                  <div class="mileage-value">{{ formatMileage(maxMileage) }} km</div>
                </div>
                <v-slider
                  v-model="maxMileage"
                  :min="0"
                  :max="300000"
                  :step="5000"
                  color="primary"
                  track-color="surface-variant"
                  class="premium-slider"
                  thumb-label
                />
              </div>
            </div>

            <!-- Fuel Type -->
            <div class="form-section mb-8">
              <h3 class="section-subtitle mb-4">Fuel Type</h3>
              <div class="fuel-grid">
                <div 
                  v-for="(fuel, index) in fuelTypes" 
                  :key="index"
                  class="fuel-card"
                  :class="{ active: selectedFuels.includes(fuel.value) }"
                  @click="toggleFuel(fuel.value)"
                  :style="{ animationDelay: `${index * 100}ms` }"
                >
                  <div class="fuel-icon">
                    <v-icon :icon="fuel.icon" size="24" :color="selectedFuels.includes(fuel.value) ? 'white' : 'primary'"></v-icon>
                  </div>
                  <div class="fuel-name">{{ fuel.name }}</div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="form-actions">
              <v-btn
                color="surface-variant"
                size="large"
                rounded="xl"
                prepend-icon="mdi-backup-restore"
                class="action-btn mr-4"
                variant="outlined"
              >
                Reset
              </v-btn>
              <v-btn
                color="primary"
                size="large"
                rounded="xl"
                prepend-icon="mdi-content-save"
                class="magic-btn"
              >
                Save Search Criteria
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-col>

      <!-- Preview Panel -->
      <v-col cols="12" lg="4">
        <div class="glass-card sticky-card">
          <h3 class="section-title mb-6">Search Preview</h3>
          
          <!-- Criteria Summary -->
          <div class="criteria-summary mb-6">
            <div class="summary-item">
              <div class="summary-label">Brands</div>
              <div class="summary-value">BMW, Audi, Mercedes</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Price Range</div>
              <div class="summary-value">€20,000 - €80,000</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Year Range</div>
              <div class="summary-value">2018 - 2024</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">Max Mileage</div>
              <div class="summary-value">100,000 km</div>
            </div>
          </div>

          <!-- Estimated Results -->
          <div class="results-estimate mb-6">
            <div class="estimate-header mb-3">
              <h4 class="estimate-title">Estimated Results</h4>
            </div>
            <div class="estimate-stats">
              <div class="stat-item">
                <div class="stat-icon">
                  <v-icon icon="mdi-car-multiple" size="20" color="primary"></v-icon>
                </div>
                <div class="stat-details">
                  <div class="stat-value">~1,247</div>
                  <div class="stat-label">Current Listings</div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <v-icon icon="mdi-trending-up" size="20" color="success"></v-icon>
                </div>
                <div class="stat-details">
                  <div class="stat-value">~15</div>
                  <div class="stat-label">Daily New Cars</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Settings -->
          <div class="notification-settings">
            <h4 class="settings-title mb-3">Notification Settings</h4>
            <div class="settings-list">
              <div class="setting-item">
                <div class="setting-info">
                  <div class="setting-name">Instant Alerts</div>
                  <div class="setting-desc">Real-time notifications</div>
                </div>
                <v-switch
                  v-model="instantAlerts"
                  color="primary"
                  hide-details
                  class="premium-switch"
                />
              </div>
              <div class="setting-item">
                <div class="setting-info">
                  <div class="setting-name">Score Threshold</div>
                  <div class="setting-desc">Only deals above 7.5</div>
                </div>
                <v-chip color="primary" variant="tonal" size="small">7.5+</v-chip>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const priceRange = ref([20000, 80000])
const maxMileage = ref(100000)
const selectedFuels = ref(['petrol', 'diesel'])
const instantAlerts = ref(true)

const brands = [
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 
  'Honda', 'Ford', 'Porsche', 'Volvo', 'Peugeot'
]

const models = [
  'X5', 'C-Class', 'A4', 'Golf', 'Corolla',
  'Civic', 'Focus', '911', 'XC60', '308'
]

const years = Array.from({ length: 15 }, (_, i) => 2024 - i)

const fuelTypes = [
  { name: 'Petrol', value: 'petrol', icon: 'mdi-gas-station' },
  { name: 'Diesel', value: 'diesel', icon: 'mdi-fuel' },
  { name: 'Electric', value: 'electric', icon: 'mdi-lightning-bolt' },
  { name: 'Hybrid', value: 'hybrid', icon: 'mdi-leaf' }
]

const formatPrice = (price: number) => {
  return (price / 1000).toFixed(0) + 'k'
}

const formatMileage = (mileage: number) => {
  return mileage.toLocaleString()
}

const toggleFuel = (fuelValue: string) => {
  const index = selectedFuels.value.indexOf(fuelValue)
  if (index > -1) {
    selectedFuels.value.splice(index, 1)
  } else {
    selectedFuels.value.push(fuelValue)
  }
}
</script>

<style scoped>
.world-class-search-criteria {
  position: relative;
  overflow: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
}

.hero-card {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 300;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

.floating-icon {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(5deg); }
  66% { transform: translateY(5px) rotate(-3deg); }
}

/* Glass Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.sticky-card {
  position: sticky;
  top: 2rem;
}

/* Section Titles */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.section-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* Form Sections */
.form-section {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

/* Premium Form Controls */
.premium-select :deep(.v-field),
.premium-field :deep(.v-field) {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.premium-select:hover :deep(.v-field),
.premium-field:hover :deep(.v-field) {
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Price Section */
.price-section {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
}

.price-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.price-values {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3B82F6;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 0.5rem;
}

/* Mileage Section */
.mileage-section {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
}

.mileage-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mileage-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.mileage-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3B82F6;
}

/* Premium Sliders */
.premium-slider :deep(.v-slider-track__fill) {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
}

.premium-slider :deep(.v-slider-thumb) {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Fuel Grid */
.fuel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.fuel-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.fuel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
}

.fuel-card.active {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-color: #3B82F6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.3);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}

.fuel-icon {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  padding: 8px;
  display: inline-flex;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.fuel-card.active .fuel-icon {
  background: rgba(255, 255, 255, 0.2);
}

.fuel-name {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Action Buttons */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
}

/* Magic Button */
.magic-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
}

.magic-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
}

.magic-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.magic-btn:hover::before {
  left: 100%;
}

/* Criteria Summary */
.criteria-summary {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.summary-value {
  font-weight: 500;
  color: #111827;
  font-size: 0.875rem;
}

/* Results Estimate */
.results-estimate {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.estimate-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.estimate-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

/* Notification Settings */
.notification-settings {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.settings-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.setting-desc {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

.premium-switch :deep(.v-switch__track) {
  background: rgba(0, 0, 0, 0.1) !important;
}
</style> 