<template>
  <div class="world-class-export">
    <!-- Hero Section -->
    <div class="hero-section mb-10">
      <div class="hero-card">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="hero-title">Export Deals</h1>
            <p class="hero-subtitle">Download your data in multiple formats</p>
          </div>
          <div class="export-illustration">
            <div class="floating-icon">
              <v-icon icon="mdi-download-circle" size="64" color="primary"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-row>
      <!-- Export Options -->
      <v-col cols="12" lg="8">
        <div class="glass-card mb-8">
          <h2 class="section-title mb-6">Export Options</h2>
          
          <!-- Export Format Cards -->
          <v-row class="export-formats mb-8">
            <v-col cols="12" md="4" v-for="(format, index) in exportFormats" :key="index">
              <div 
                class="format-card" 
                :class="{ active: selectedFormat === format.type }"
                :style="{ animationDelay: `${index * 100}ms` }"
                @click="selectedFormat = format.type"
              >
                <div class="format-icon">
                  <v-icon :icon="format.icon" size="32" :color="selectedFormat === format.type ? 'white' : 'primary'"></v-icon>
                </div>
                <div class="format-details">
                  <h3 class="format-title">{{ format.title }}</h3>
                  <p class="format-description">{{ format.description }}</p>
                  <div class="format-features">
                    <v-chip
                      v-for="feature in format.features"
                      :key="feature"
                      size="small"
                      variant="tonal"
                      class="mr-1 mb-1"
                    >
                      {{ feature }}
                    </v-chip>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Filter Options -->
          <div class="filter-section mb-8">
            <h3 class="section-subtitle mb-4">Export Filters</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  label="Date Range"
                  :items="dateRanges"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="premium-select"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Deal Status"
                  :items="statusOptions"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="premium-select"
                  multiple
                  chips
                />
              </v-col>
            </v-row>
          </div>

          <!-- Data Preview -->
          <div class="preview-section">
            <h3 class="section-subtitle mb-4">Data Preview</h3>
            <div class="preview-table">
              <v-data-table
                :headers="previewHeaders"
                :items="previewData"
                class="premium-preview-table"
                hide-default-footer
                density="compact"
              >
                                 <template v-slot:[`item.score`]="{ item }">
                   <v-chip
                     :color="getScoreColor(item.score)"
                     variant="tonal"
                     size="small"
                   >
                     {{ item.score }}
                   </v-chip>
                 </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </v-col>

      <!-- Export Panel -->
      <v-col cols="12" lg="4">
        <div class="glass-card sticky-card">
          <h3 class="section-title mb-6">Export Summary</h3>
          
          <!-- Export Stats -->
          <div class="export-stats mb-6">
            <div class="stat-item">
              <div class="stat-label">Total Records</div>
              <div class="stat-value">247</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">File Size (est.)</div>
              <div class="stat-value">1.2 MB</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Selected Format</div>
              <div class="stat-value">{{ getSelectedFormatName() }}</div>
            </div>
          </div>

          <!-- Export Button -->
          <v-btn
            color="primary"
            size="large"
            rounded="xl"
            prepend-icon="mdi-download"
            block
            class="magic-btn mb-6"
            :loading="isExporting"
            @click="startExport"
          >
            {{ isExporting ? 'Preparing...' : 'Start Export' }}
          </v-btn>

          <!-- Progress Section (shown during export) -->
          <div v-if="isExporting" class="progress-section mb-6">
            <div class="progress-label mb-2">Export Progress</div>
            <v-progress-linear
              :model-value="exportProgress"
              color="primary"
              rounded
              height="8"
              class="mb-2"
            />
            <div class="progress-text">{{ exportProgress }}% Complete</div>
          </div>

          <!-- Export History -->
          <div class="export-history">
            <h4 class="history-title mb-3">Recent Exports</h4>
            <div class="history-list">
              <div v-for="export_ in exportHistory" :key="export_.id" class="history-item">
                <div class="history-info">
                  <div class="history-name">{{ export_.name }}</div>
                  <div class="history-date">{{ export_.date }}</div>
                </div>
                <v-btn
                  icon="mdi-download"
                  variant="text"
                  size="small"
                  class="history-download"
                />
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const selectedFormat = ref('csv')
const isExporting = ref(false)
const exportProgress = ref(0)

const exportFormats = [
  {
    type: 'csv',
    title: 'CSV',
    description: 'Comma-separated values for spreadsheets',
    icon: 'mdi-file-delimited',
    features: ['Excel Compatible', 'Lightweight', 'Universal']
  },
  {
    type: 'excel',
    title: 'Excel',
    description: 'Microsoft Excel workbook with formatting',
    icon: 'mdi-microsoft-excel',
    features: ['Formatted', 'Charts', 'Multiple Sheets']
  },
  {
    type: 'pdf',
    title: 'PDF',
    description: 'Professional report format',
    icon: 'mdi-file-pdf-box',
    features: ['Print Ready', 'Branded', 'Professional']
  }
]

const dateRanges = [
  'Last 7 days',
  'Last 30 days',
  'Last 3 months',
  'Last 6 months',
  'All time'
]

const statusOptions = [
  'New',
  'Interested',
  'Not Interested',
  'Contacted'
]

const previewHeaders = [
  { title: 'Brand', key: 'brand' },
  { title: 'Model', key: 'model' },
  { title: 'Price', key: 'price' },
  { title: 'Score', key: 'score' }
]

const previewData = [
  { brand: 'BMW', model: 'X5', price: '€45,000', score: 8.5 },
  { brand: 'Audi', model: 'Q7', price: '€52,000', score: 7.8 },
  { brand: 'Mercedes', model: 'GLE', price: '€48,000', score: 8.2 }
]

const exportHistory = [
  { id: 1, name: 'deals_export_2024_01.csv', date: '2 hours ago' },
  { id: 2, name: 'monthly_report.pdf', date: 'Yesterday' },
  { id: 3, name: 'deals_backup.xlsx', date: '3 days ago' }
]

const getSelectedFormatName = () => {
  const format = exportFormats.find(f => f.type === selectedFormat.value)
  return format ? format.title : 'CSV'
}

const getScoreColor = (score: number) => {
  if (score >= 8) return 'success'
  if (score >= 6) return 'warning'
  return 'error'
}

const startExport = () => {
  isExporting.value = true
  exportProgress.value = 0
  
  // Simulate export progress
  const interval = setInterval(() => {
    exportProgress.value += 10
    if (exportProgress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        isExporting.value = false
        exportProgress.value = 0
      }, 500)
    }
  }, 200)
}
</script>

<style scoped>
.world-class-export {
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

/* Export Format Cards */
.export-formats .format-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
  height: 100%;
}

.format-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15);
}

.format-card.active {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-color: #3B82F6;
  color: white;
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
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

.format-icon {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 16px;
  padding: 1rem;
  display: inline-flex;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.format-card.active .format-icon {
  background: rgba(255, 255, 255, 0.2);
}

.format-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.format-description {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.format-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

/* Premium Select */
.premium-select :deep(.v-field) {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.premium-select:hover :deep(.v-field) {
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Preview Table */
.preview-table {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.premium-preview-table :deep(.v-data-table__thead) {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

/* Export Stats */
.export-stats {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.stat-value {
  font-weight: 600;
  color: #111827;
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

/* Progress Section */
.progress-section {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.progress-text {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
}

/* Export History */
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
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.history-item:last-child {
  border-bottom: none;
}

.history-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.history-date {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

.history-download {
  transition: all 0.2s ease;
}

.history-download:hover {
  background: rgba(59, 130, 246, 0.1) !important;
  transform: scale(1.1);
}
</style> 