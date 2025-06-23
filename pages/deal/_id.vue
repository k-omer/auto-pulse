<template>
  <div class="world-class-deal-details">
    <!-- Hero Section -->
    <div class="hero-section mb-10">
      <div class="hero-card">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="hero-title">Deal Analysis</h1>
            <p class="hero-subtitle">Detailed insights for this opportunity</p>
          </div>
          <div class="score-display">
            <div class="score-circle">
              <div class="score-value">8.5</div>
              <div class="score-label">Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-row>
      <!-- Main Deal Information -->
      <v-col cols="12" lg="8">
        <div class="glass-card mb-8">
          <div class="card-header mb-6">
            <div class="d-flex align-center">
              <div class="car-avatar mr-4">
                <v-icon icon="mdi-car-sports" size="32" color="white"></v-icon>
              </div>
              <div>
                <h2 class="deal-title">BMW X5 xDrive40i</h2>
                <p class="deal-subtitle">2020 • Luxury SUV • 45,000 km</p>
              </div>
            </div>
          </div>

          <!-- Key Metrics -->
          <v-row class="metrics-grid mb-8">
            <v-col cols="6" md="3" v-for="(metric, index) in dealMetrics" :key="index">
              <div class="metric-card" :style="{ animationDelay: `${index * 100}ms` }">
                <div class="metric-icon">
                  <v-icon :icon="metric.icon" size="20" color="primary"></v-icon>
                </div>
                <div class="metric-value">{{ metric.value }}</div>
                <div class="metric-label">{{ metric.label }}</div>
              </div>
            </v-col>
          </v-row>

          <!-- Deal Description -->
          <div class="deal-description mb-6">
            <h3 class="section-title mb-4">Vehicle Details</h3>
            <div class="description-grid">
              <div class="detail-item" v-for="detail in vehicleDetails" :key="detail.label">
                <span class="detail-label">{{ detail.label }}</span>
                <span class="detail-value">{{ detail.value }}</span>
              </div>
            </div>
          </div>

          <!-- Pricing Analysis -->
          <div class="pricing-analysis">
            <h3 class="section-title mb-4">Pricing Analysis</h3>
            <div class="price-breakdown">
              <div class="price-item">
                <span class="price-label">Listed Price</span>
                <span class="price-value current">€45,000</span>
              </div>
              <div class="price-item">
                <span class="price-label">Market Value</span>
                <span class="price-value market">€52,000</span>
              </div>
              <div class="price-item highlight">
                <span class="price-label">Potential Savings</span>
                <span class="price-value savings">€7,000</span>
              </div>
            </div>
          </div>
        </div>
      </v-col>

      <!-- Action Panel -->
      <v-col cols="12" lg="4">
        <div class="glass-card sticky-card">
          <h3 class="section-title mb-6">Quick Actions</h3>
          
          <!-- Interest Buttons -->
          <div class="action-buttons mb-6">
            <v-btn
              color="success"
              size="large"
              rounded="xl"
              prepend-icon="mdi-heart"
              block
              class="magic-btn mb-3"
            >
              Mark as Interested
            </v-btn>
            <v-btn
              color="surface-variant"
              size="large"
              rounded="xl"
              prepend-icon="mdi-heart-off"
              block
              class="magic-btn"
              variant="outlined"
            >
              Not Interested
            </v-btn>
          </div>

          <!-- Notes Section -->
          <div class="notes-section mb-6">
            <h4 class="notes-title mb-3">Personal Notes</h4>
            <v-textarea
              placeholder="Add your thoughts about this deal..."
              variant="solo-filled"
              rounded="lg"
              rows="4"
              class="premium-textarea"
              hide-details
            />
            <v-btn
              color="primary"
              size="small"
              rounded="pill"
              prepend-icon="mdi-content-save"
              class="mt-3"
            >
              Save Note
            </v-btn>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <h4 class="notes-title mb-3">Contact Seller</h4>
            <div class="contact-item mb-2">
              <v-icon icon="mdi-phone" size="16" class="mr-2 text-medium-emphasis"></v-icon>
              <span>+32 123 456 789</span>
            </div>
            <div class="contact-item mb-4">
              <v-icon icon="mdi-map-marker" size="16" class="mr-2 text-medium-emphasis"></v-icon>
              <span>Brussels, Belgium</span>
            </div>
            <v-btn
              color="primary"
              size="large"
              rounded="xl"
              prepend-icon="mdi-phone"
              block
              class="magic-btn"
              variant="outlined"
            >
              Contact Seller
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const dealMetrics = [
  { label: 'Year', value: '2020', icon: 'mdi-calendar' },
  { label: 'Mileage', value: '45k km', icon: 'mdi-speedometer' },
  { label: 'Engine', value: '3.0L', icon: 'mdi-engine' },
  { label: 'Fuel', value: 'Petrol', icon: 'mdi-gas-station' }
]

const vehicleDetails = [
  { label: 'Brand', value: 'BMW' },
  { label: 'Model', value: 'X5 xDrive40i' },
  { label: 'Body Type', value: 'SUV' },
  { label: 'Transmission', value: 'Automatic' },
  { label: 'Drive Type', value: 'All-Wheel Drive' },
  { label: 'Color', value: 'Alpine White' },
  { label: 'Interior', value: 'Black Leather' },
  { label: 'Previous Owners', value: '2' }
]
</script>

<style scoped>
.world-class-deal-details {
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

.score-display {
  position: relative;
}

.score-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  animation: scoreGlow 2s ease-in-out infinite;
}

.score-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.score-label {
  font-size: 0.75rem;
  opacity: 0.9;
}

@keyframes scoreGlow {
  0%, 100% { box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 12px 40px rgba(59, 130, 246, 0.5); }
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

/* Card Header */
.car-avatar {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.deal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.deal-subtitle {
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

/* Metrics Grid */
.metrics-grid .metric-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
}

.metric-icon {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  padding: 8px;
  display: inline-flex;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
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

/* Section Titles */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* Description Grid */
.description-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.detail-value {
  font-weight: 600;
  color: #111827;
}

/* Pricing Analysis */
.price-breakdown {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.price-item:last-child {
  border-bottom: none;
}

.price-item.highlight {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
  border-radius: 12px;
  padding: 1rem;
  margin: 0.5rem 0;
}

.price-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.price-value {
  font-weight: 700;
  font-size: 1.1rem;
}

.price-value.current { color: #111827; }
.price-value.market { color: #6B7280; }
.price-value.savings { color: #3B82F6; }

/* Action Buttons */
.magic-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
}

.magic-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.3);
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

/* Notes Section */
.notes-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.premium-textarea :deep(.v-field) {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.premium-textarea:hover :deep(.v-field) {
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Contact Info */
.contact-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
}
</style> 