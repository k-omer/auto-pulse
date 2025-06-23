<template>
  <div class="world-class-dashboard">
    <!-- Welcome Hero Section -->
    <div class="hero-section mb-10">
      <div class="hero-card">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="hero-title">Welcome back! 👋</h1>
            <p class="hero-subtitle">Let's find some amazing deals today</p>
          </div>
          <div class="hero-illustration">
            <div class="floating-icon">
              <v-icon icon="mdi-car-sports" size="64" color="primary"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Premium Stats Grid -->
    <v-row class="stats-grid mb-10">
      <v-col 
        cols="12" 
        sm="6" 
        md="4" 
        v-for="(stat, index) in stats" 
        :key="index"
        class="stat-col"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="premium-stat-card">
          <div class="stat-background"></div>
          <div class="stat-content">
            <div class="stat-icon-wrapper">
              <v-icon :icon="stat.icon" size="28" color="white"></v-icon>
            </div>
            <div class="stat-details">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-change" :class="stat.trend">
                <v-icon :icon="stat.trendIcon" size="16"></v-icon>
                {{ stat.change }}
              </div>
            </div>
          </div>
          <div class="stat-glow"></div>
        </div>
      </v-col>
    </v-row>

    <!-- Advanced Controls Section -->
    <div class="controls-section mb-8">
      <div class="glass-card">
        <v-row align="center">
          <v-col cols="12" md="4">
            <div class="control-group">
              <label class="control-label">Sort by</label>
              <v-select
                :items="sortOptions"
                variant="solo-filled"
                density="compact"
                rounded="lg"
                class="premium-select"
                hide-details
              />
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="control-group">
              <label class="control-label">Filter</label>
              <v-text-field
                placeholder="Search deals..."
                variant="solo-filled"
                density="compact"
                rounded="lg"
                prepend-inner-icon="mdi-magnify"
                class="premium-search"
                hide-details
              />
            </div>
          </v-col>
          <v-col cols="12" md="4" class="d-flex justify-end">
            <v-btn
              color="primary"
              size="large"
              rounded="xl"
              prepend-icon="mdi-plus-circle"
              class="magic-btn"
              to="/search-criteria"
            >
              New Search
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Premium Deals Table -->
    <div class="deals-section">
      <div class="glass-card">
        <div class="table-header mb-6">
          <div class="d-flex align-center justify-space-between">
            <div>
              <h2 class="section-title">Recent Deals</h2>
              <p class="section-subtitle">{{ deals.length }} deals found</p>
            </div>
            <v-chip color="success" variant="tonal" size="small">
              <v-icon start icon="mdi-sync"></v-icon>
              Live
            </v-chip>
          </div>
        </div>

        <!-- Enhanced Data Table -->
        <div class="premium-table-wrapper">
          <v-data-table
            :headers="headers"
            :items="deals"
            class="premium-data-table"
            hide-default-footer
            :loading="false"
          >
            <template v-slot:item="{ item }">
              <tr class="table-row-premium">
                <td class="py-6">
                  <div class="d-flex align-center">
                    <v-avatar size="40" class="brand-avatar mr-4">
                      <v-icon icon="mdi-car" color="primary"></v-icon>
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold">{{ item.brand || 'BMW' }}</div>
                      <div class="text-caption text-medium-emphasis">Luxury</div>
                    </div>
                  </div>
                </td>
                <td class="py-6">
                  <div class="font-weight-medium">{{ item.model || 'X5' }}</div>
                  <div class="text-caption text-medium-emphasis">SUV</div>
                </td>
                <td class="py-6">{{ item.year || '2020' }}</td>
                <td class="py-6">
                  <div class="price-cell">
                    <span class="currency">€</span>
                    <span class="amount">{{ (item.price || 45000).toLocaleString() }}</span>
                  </div>
                </td>
                <td class="py-6">
                  <v-chip
                    :color="getScoreColor(item.score || 8.5)"
                    variant="flat"
                    size="small"
                    class="score-chip"
                  >
                    <v-icon start size="16" icon="mdi-star"></v-icon>
                    {{ item.score || '8.5' }}
                  </v-chip>
                </td>
                <td class="py-6">
                  <div class="action-buttons">
                    <v-btn
                      icon="mdi-eye-outline"
                      variant="text"
                      size="small"
                      class="action-btn"
                    />
                    <v-btn
                      icon="mdi-heart-outline"
                      variant="text"
                      size="small"
                      class="action-btn"
                    />
                  </div>
                </td>
              </tr>
            </template>

            <!-- Empty state -->
            <template v-slot:no-data>
              <div class="empty-state py-16">
                <div class="empty-illustration mb-6">
                  <v-icon icon="mdi-car-search" size="80" color="surface-variant"></v-icon>
                </div>
                <h3 class="empty-title mb-2">No deals found yet</h3>
                <p class="empty-subtitle mb-6">Set up your search criteria to start finding amazing deals</p>
                <v-btn 
                  color="primary" 
                  size="large" 
                  rounded="xl"
                  prepend-icon="mdi-tune"
                  to="/search-criteria"
                  class="magic-btn"
                >
                  Create Search Criteria
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { 
    label: 'Current Plan', 
    value: 'Free', 
    icon: 'mdi-crown-outline',
    change: 'Active',
    trend: 'positive',
    trendIcon: 'mdi-check-circle'
  },
  { 
    label: 'Alerts Remaining', 
    value: '10', 
    icon: 'mdi-bell-ring-outline',
    change: '+2 today',
    trend: 'positive',
    trendIcon: 'mdi-trending-up'
  },
  { 
    label: 'Deals Found', 
    value: '0', 
    icon: 'mdi-car-multiple',
    change: 'Set up search',
    trend: 'neutral',
    trendIcon: 'mdi-information'
  }
]

const sortOptions = [
  'Opportunity Score',
  'Price (Low to High)',
  'Price (High to Low)',
  'Date Added',
  'Brand'
]

const headers = [
  { title: 'Brand', key: 'brand' },
  { title: 'Model', key: 'model' },
  { title: 'Year', key: 'year' },
  { title: 'Price', key: 'price' },
  { title: 'Score', key: 'score' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const deals = []

const getScoreColor = (score: number) => {
  if (score >= 8) return 'success'
  if (score >= 6) return 'warning'
  return 'error'
}
</script>

<style scoped>
.world-class-dashboard {
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

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
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

/* Premium Stats */
.stats-grid .stat-col {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
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

.premium-stat-card {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
}

.premium-stat-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2);
}

.stat-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  border-radius: 50%;
  opacity: 0.1;
  transform: translate(30px, -30px);
}

.stat-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
}

.stat-icon-wrapper {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 16px;
  padding: 12px;
  margin-right: 1rem;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0.25rem;
}

.stat-change {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.positive { color: #3B82F6; }
.stat-change.negative { color: #EF4444; }
.stat-change.neutral { color: #6B7280; }

/* Glass Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Controls */
.control-group {
  position: relative;
}

.control-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.5rem;
}

.premium-select :deep(.v-field),
.premium-search :deep(.v-field) {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.premium-select:hover :deep(.v-field),
.premium-search:hover :deep(.v-field) {
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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

/* Table Enhancements */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.section-subtitle {
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

.premium-table-wrapper {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
}

.premium-data-table :deep(.v-data-table__thead) {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.premium-data-table :deep(.v-data-table__td) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.table-row-premium {
  transition: all 0.2s ease;
}

.table-row-premium:hover {
  background: rgba(59, 130, 246, 0.04) !important;
  transform: scale(1.01);
}

.brand-avatar {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
}

.price-cell {
  display: flex;
  align-items: baseline;
}

.currency {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 0.25rem;
}

.amount {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.score-chip {
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(59, 130, 246, 0.1) !important;
  transform: scale(1.1);
}

/* Empty State */
.empty-state {
  text-align: center;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.empty-subtitle {
  color: rgba(0, 0, 0, 0.6);
}

.empty-illustration {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style> 