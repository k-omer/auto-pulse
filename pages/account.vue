<template>
  <div class="world-class-account">
    <!-- Hero Section -->
    <div class="hero-section mb-10">
      <div class="hero-card">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="hero-title">Account Settings</h1>
            <p class="hero-subtitle">Manage your profile and preferences</p>
          </div>
          <div class="profile-avatar">
            <div class="avatar-circle">
              <v-icon icon="mdi-account-circle" size="64" color="white"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-row>
      <!-- Main Settings -->
      <v-col cols="12" lg="8">
        <!-- Profile Section -->
        <div class="glass-card mb-8">
          <h2 class="section-title mb-6">Profile Information</h2>
          
          <v-form class="profile-form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="First Name"
                  value="John"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="premium-field"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Last Name"
                  value="Doe"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="premium-field"
                />
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Email"
                  value="john.doe@example.com"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="premium-field"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Phone"
                  value="+32 123 456 789"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="premium-field"
                />
              </v-col>
            </v-row>

            <v-btn
              color="primary"
              size="large"
              rounded="xl"
              prepend-icon="mdi-content-save"
              class="magic-btn"
            >
              Save Changes
            </v-btn>
          </v-form>
        </div>

        <!-- Security Section -->
        <div class="glass-card mb-8">
          <h2 class="section-title mb-6">Security</h2>
          
          <div class="security-settings">
            <div class="security-item">
              <div class="security-info">
                <div class="security-title">Password</div>
                <div class="security-description">Last changed 30 days ago</div>
              </div>
              <v-btn
                variant="outlined"
                size="small"
                rounded="lg"
                prepend-icon="mdi-lock-reset"
              >
                Change Password
              </v-btn>
            </div>

            <div class="security-item">
              <div class="security-info">
                <div class="security-title">Two-Factor Authentication</div>
                <div class="security-description">Add an extra layer of security</div>
              </div>
              <v-switch
                color="primary"
                hide-details
                class="premium-switch"
              />
            </div>

            <div class="security-item">
              <div class="security-info">
                <div class="security-title">Login Notifications</div>
                <div class="security-description">Get notified of new sign-ins</div>
              </div>
              <v-switch
                v-model="loginNotifications"
                color="primary"
                hide-details
                class="premium-switch"
              />
            </div>
          </div>
        </div>

        <!-- Preferences Section -->
        <div class="glass-card">
          <h2 class="section-title mb-6">Preferences</h2>
          
          <div class="preferences-grid">
            <div class="preference-item">
              <div class="preference-info">
                <div class="preference-title">Language</div>
                <div class="preference-description">Interface language</div>
              </div>
              <v-select
                :items="languages"
                variant="outlined"
                density="comfortable"
                rounded="lg"
                class="premium-select preference-control"
                value="English"
              />
            </div>

            <div class="preference-item">
              <div class="preference-info">
                <div class="preference-title">Currency</div>
                <div class="preference-description">Default currency for prices</div>
              </div>
              <v-select
                :items="currencies"
                variant="outlined"
                density="comfortable"
                rounded="lg"
                class="premium-select preference-control"
                value="EUR (€)"
              />
            </div>

            <div class="preference-item">
              <div class="preference-info">
                <div class="preference-title">Time Zone</div>
                <div class="preference-description">Used for notifications</div>
              </div>
              <v-select
                :items="timeZones"
                variant="outlined"
                density="comfortable"
                rounded="lg"
                class="premium-select preference-control"
                value="Europe/Brussels"
              />
            </div>
          </div>
        </div>
      </v-col>

      <!-- Sidebar -->
      <v-col cols="12" lg="4">
        <!-- Usage Stats -->
        <div class="glass-card sticky-card mb-8">
          <h3 class="section-title mb-6">Usage Statistics</h3>
          
          <div class="stats-grid">
            <div v-for="(stat, index) in usageStats" :key="index" class="stat-card" :style="{ animationDelay: `${index * 100}ms` }">
              <div class="stat-icon">
                <v-icon :icon="stat.icon" size="20" color="primary"></v-icon>
              </div>
              <div class="stat-details">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subscription Info -->
        <div class="glass-card mb-8">
          <h3 class="section-title mb-6">Subscription</h3>
          
          <div class="subscription-card">
            <div class="subscription-plan">
              <div class="plan-name">Pro Plan</div>
              <div class="plan-price">€29/month</div>
            </div>
            <div class="subscription-details">
              <div class="detail-item">
                <span class="detail-label">Next billing</span>
                <span class="detail-value">Jan 15, 2024</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Alerts used</span>
                <span class="detail-value">247 / 1000</span>
              </div>
            </div>
            <v-btn
              color="primary"
              size="large"
              rounded="xl"
              prepend-icon="mdi-credit-card"
              block
              class="magic-btn"
              variant="outlined"
            >
              Manage Billing
            </v-btn>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="glass-card danger-zone">
          <h3 class="section-title danger-title mb-4">Danger Zone</h3>
          
          <div class="danger-actions">
            <v-btn
              color="warning"
              size="large"
              rounded="xl"
              prepend-icon="mdi-download"
              block
              class="danger-btn mb-3"
              variant="outlined"
            >
              Export Data
            </v-btn>
            <v-btn
              color="error"
              size="large"
              rounded="xl"
              prepend-icon="mdi-delete"
              block
              class="danger-btn"
              variant="outlined"
            >
              Delete Account
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const loginNotifications = ref(true)

const languages = ['English', 'French', 'German', 'Dutch', 'Spanish']
const currencies = ['EUR (€)', 'USD ($)', 'GBP (£)', 'CHF (₣)']
const timeZones = [
  'Europe/Brussels',
  'Europe/London', 
  'Europe/Paris',
  'Europe/Berlin',
  'America/New_York'
]

const usageStats = [
  { label: 'Alerts Created', value: '12', icon: 'mdi-bell' },
  { label: 'Deals Found', value: '247', icon: 'mdi-car' },
  { label: 'Searches', value: '89', icon: 'mdi-magnify' },
  { label: 'Exports', value: '5', icon: 'mdi-download' }
]
</script>

<style scoped>
.world-class-account {
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

.avatar-circle {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 50%;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  animation: avatarGlow 3s ease-in-out infinite;
}

@keyframes avatarGlow {
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

/* Section Titles */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* Premium Form Fields */
.premium-field :deep(.v-field) {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.premium-field:hover :deep(.v-field) {
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.premium-select :deep(.v-field) {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.premium-switch :deep(.v-switch__track) {
  background: rgba(0, 0, 0, 0.1) !important;
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

/* Security Settings */
.security-settings {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.security-item:last-child {
  border-bottom: none;
}

.security-title {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
}

.security-description {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

/* Preferences Grid */
.preferences-grid {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: grid;
  gap: 1.5rem;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.preference-info {
  flex: 1;
}

.preference-title {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
}

.preference-description {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.preference-control {
  min-width: 200px;
}

/* Usage Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.stat-card:hover {
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

.stat-icon {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

/* Subscription Card */
.subscription-card {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.subscription-plan {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.plan-price {
  font-size: 1.5rem;
  font-weight: 300;
  color: #3B82F6;
}

.subscription-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.detail-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.detail-value {
  font-weight: 500;
  color: #111827;
}

/* Danger Zone */
.danger-zone {
  border: 1px solid rgba(239, 68, 68, 0.2) !important;
  background: rgba(254, 242, 242, 0.9) !important;
}

.danger-title {
  color: #DC2626 !important;
}

.danger-actions {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(239, 68, 68, 0.1);
}

.danger-btn {
  transition: all 0.3s ease;
}

.danger-btn:hover {
  transform: translateY(-2px);
}
</style> 