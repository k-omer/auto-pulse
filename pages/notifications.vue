<template>
  <div class="world-class-notifications">
    <!-- Hero Section -->
    <div class="hero-section mb-10">
      <div class="hero-card">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="hero-title">Notification Settings</h1>
            <p class="hero-subtitle">Customize how you receive deal alerts</p>
          </div>
          <div class="notification-illustration">
            <div class="floating-icon">
              <v-icon icon="mdi-bell-ring" size="64" color="primary"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-row>
      <!-- Notification Settings -->
      <v-col cols="12" lg="8">
        <div class="glass-card mb-8">
          <h2 class="section-title mb-6">Email Notifications</h2>
          
          <!-- Notification Types -->
          <div class="notification-types mb-8">
            <div v-for="(type, index) in notificationTypes" :key="index" class="notification-card" :style="{ animationDelay: `${index * 100}ms` }">
              <div class="notification-header">
                <div class="notification-icon">
                  <v-icon :icon="type.icon" size="24" color="primary"></v-icon>
                </div>
                <div class="notification-info">
                  <h3 class="notification-title">{{ type.title }}</h3>
                  <p class="notification-description">{{ type.description }}</p>
                </div>
                <div class="notification-toggle">
                  <v-switch
                    v-model="type.enabled"
                    color="primary"
                    hide-details
                    class="premium-switch"
                  />
                </div>
              </div>
              
              <!-- Frequency Settings (shown when enabled) -->
              <div v-if="type.enabled" class="frequency-settings">
                <div class="frequency-label">Frequency</div>
                <v-btn-toggle
                  v-model="type.frequency"
                  mandatory
                  rounded="lg"
                  class="frequency-toggle"
                >
                  <v-btn value="instant" size="small">Instant</v-btn>
                  <v-btn value="daily" size="small">Daily</v-btn>
                  <v-btn value="weekly" size="small">Weekly</v-btn>
                </v-btn-toggle>
              </div>
            </div>
          </div>

          <!-- Advanced Settings -->
          <div class="advanced-settings">
            <h3 class="section-subtitle mb-4">Advanced Settings</h3>
            <div class="settings-grid">
              <div class="setting-item">
                <div class="setting-info">
                  <div class="setting-label">Quiet Hours</div>
                  <div class="setting-description">Pause notifications during specific hours</div>
                </div>
                <v-switch v-model="quietHours" color="primary" hide-details class="premium-switch" />
              </div>
              
              <div v-if="quietHours" class="quiet-hours-config">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="Start Time"
                      type="time"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      class="premium-field"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="End Time"
                      type="time"
                      variant="outlined"
                      density="comfortable"
                      rounded="lg"
                      class="premium-field"
                    />
                  </v-col>
                </v-row>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <div class="setting-label">Score Threshold</div>
                  <div class="setting-description">Only notify for deals above this score</div>
                </div>
                <div class="score-slider">
                  <v-slider
                    v-model="scoreThreshold"
                    :min="0"
                    :max="10"
                    :step="0.5"
                    color="primary"
                    track-color="surface-variant"
                    thumb-label
                    class="premium-slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>

      <!-- Preview Panel -->
      <v-col cols="12" lg="4">
        <div class="glass-card sticky-card">
          <h3 class="section-title mb-6">Email Preview</h3>
          
          <!-- Email Mock-up -->
          <div class="email-preview">
            <div class="email-header">
              <div class="email-subject">🚗 New Deal Alert: BMW X5</div>
              <div class="email-meta">from: alerts@autoscout.pro</div>
            </div>
            <div class="email-body">
              <div class="email-content">
                <h4>Great Deal Found!</h4>
                <p>We found a BMW X5 with an opportunity score of <strong>8.5</strong></p>
                <div class="deal-summary">
                  <div class="deal-price">€45,000</div>
                  <div class="deal-savings">Save €7,000</div>
                </div>
                <v-btn size="small" color="primary" rounded="lg" class="email-btn">
                  View Deal
                </v-btn>
              </div>
            </div>
          </div>

          <!-- Test Email -->
          <v-btn
            color="primary"
            size="large"
            rounded="xl"
            prepend-icon="mdi-email-send"
            block
            class="magic-btn mb-6"
            variant="outlined"
          >
            Send Test Email
          </v-btn>

          <!-- Notification History -->
          <div class="notification-history">
            <h4 class="history-title mb-3">Recent Notifications</h4>
            <div class="history-list">
              <div v-for="notification in notificationHistory" :key="notification.id" class="history-item">
                <div class="history-icon">
                  <v-icon :icon="notification.icon" size="16" :color="notification.color"></v-icon>
                </div>
                <div class="history-info">
                  <div class="history-title">{{ notification.title }}</div>
                  <div class="history-time">{{ notification.time }}</div>
                </div>
                <div class="history-status">
                  <v-chip :color="notification.status === 'delivered' ? 'success' : 'warning'" size="x-small" variant="tonal">
                    {{ notification.status }}
                  </v-chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const quietHours = ref(false)
const scoreThreshold = ref(7.5)

const notificationTypes = ref([
  {
    title: 'New Deal Alerts',
    description: 'Get notified when new deals match your criteria',
    icon: 'mdi-car-search',
    enabled: true,
    frequency: 'instant'
  },
  {
    title: 'Price Drops',
    description: 'Alert when tracked vehicles decrease in price',
    icon: 'mdi-trending-down',
    enabled: true,
    frequency: 'daily'
  },
  {
    title: 'Weekly Summary',
    description: 'Weekly digest of all detected opportunities',
    icon: 'mdi-email-newsletter',
    enabled: false,
    frequency: 'weekly'
  }
])

const notificationHistory = [
  { 
    id: 1, 
    title: 'BMW X5 Deal Alert', 
    time: '2 hours ago', 
    icon: 'mdi-car', 
    color: 'primary',
    status: 'delivered'
  },
  { 
    id: 2, 
    title: 'Weekly Summary', 
    time: 'Yesterday', 
    icon: 'mdi-email', 
    color: 'secondary',
    status: 'delivered'
  },
  { 
    id: 3, 
    title: 'Price Drop Alert', 
    time: '2 days ago', 
    icon: 'mdi-trending-down', 
    color: 'warning',
    status: 'pending'
  }
]
</script>

<style scoped>
.world-class-notifications {
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
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* Notification Cards */
.notification-types .notification-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.notification-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.15);
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

.notification-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-icon {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-info {
  flex: 1;
}

.notification-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.notification-description {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

.frequency-settings {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.frequency-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.75rem;
}

.frequency-toggle :deep(.v-btn-group) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Advanced Settings */
.settings-grid {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-label {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
}

.setting-description {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.quiet-hours-config {
  grid-column: 1 / -1;
  margin-top: 1rem;
}

.score-slider {
  min-width: 150px;
}

/* Premium Components */
.premium-switch :deep(.v-switch__track) {
  background: rgba(0, 0, 0, 0.1) !important;
}

.premium-field :deep(.v-field) {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.premium-slider :deep(.v-slider-track__fill) {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
}

/* Email Preview */
.email-preview {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.email-header {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.email-subject {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.email-meta {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

.email-body {
  padding: 1.5rem;
}

.email-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.email-content p {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
}

.deal-summary {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  text-align: center;
}

.deal-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.deal-savings {
  font-size: 0.875rem;
  color: #3B82F6;
  font-weight: 500;
}

.email-btn {
  font-size: 0.75rem;
}

/* Magic Button */
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

/* Notification History */
.history-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.history-list {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.history-item:last-child {
  border-bottom: none;
}

.history-icon {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.history-info {
  flex: 1;
}

.history-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.history-time {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}
</style> 