<template>
  <div class="world-class-subscription">
    <!-- Hero Section -->
    <div class="hero-section mb-10">
      <div class="hero-card">
        <div class="text-center">
          <h1 class="hero-title mb-4">Choose Your Plan</h1>
          <p class="hero-subtitle">Unlock the full potential of deal finding</p>
          <div class="pricing-switch mt-8">
            <div class="switch-wrapper">
              <span class="switch-label" :class="{ active: !isAnnual }">Monthly</span>
              <div class="custom-switch" @click="toggleBilling">
                <div class="switch-track">
                  <div class="switch-thumb" :class="{ annual: isAnnual }"></div>
                </div>
              </div>
              <span class="switch-label" :class="{ active: isAnnual }">
                Annual
                <v-chip color="success" size="x-small" variant="tonal" class="ml-2">Save 20%</v-chip>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Cards -->
    <v-row class="pricing-grid mb-10">
      <v-col 
        cols="12" 
        md="4" 
        v-for="(plan, index) in plans" 
        :key="index"
        :style="{ animationDelay: `${index * 150}ms` }"
      >
        <div 
          class="pricing-card" 
          :class="{ 
            popular: plan.popular,
            current: plan.current 
          }"
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="popular-badge">
            <v-icon icon="mdi-star" size="16"></v-icon>
            Most Popular
          </div>

          <!-- Current Plan Badge -->
          <div v-if="plan.current" class="current-badge">
            <v-icon icon="mdi-check-circle" size="16"></v-icon>
            Current Plan
          </div>

          <div class="plan-header">
            <div class="plan-icon">
              <v-icon :icon="plan.icon" size="32" color="white"></v-icon>
            </div>
            <h3 class="plan-name">{{ plan.name }}</h3>
            <p class="plan-description">{{ plan.description }}</p>
          </div>

          <div class="plan-pricing">
            <div class="price-display">
              <span class="currency">€</span>
              <span class="amount">{{ isAnnual ? plan.yearlyPrice : plan.monthlyPrice }}</span>
              <span class="period">{{ isAnnual ? '/year' : '/month' }}</span>
            </div>
            <div v-if="isAnnual && plan.monthlySavings" class="savings">
              Save €{{ plan.monthlySavings }}/month
            </div>
          </div>

          <div class="plan-features">
            <div 
              v-for="(feature, fIndex) in plan.features" 
              :key="fIndex"
              class="feature-item"
              :style="{ animationDelay: `${(index * 150) + (fIndex * 50)}ms` }"
            >
              <v-icon 
                :icon="feature.included ? 'mdi-check' : 'mdi-close'" 
                size="16" 
                :color="feature.included ? 'success' : 'error'"
              ></v-icon>
              <span :class="{ disabled: !feature.included }">{{ feature.text }}</span>
            </div>
          </div>

          <div class="plan-action">
            <v-btn
              :color="plan.current ? 'surface-variant' : plan.popular ? 'primary' : 'primary'"
              :variant="plan.current ? 'outlined' : 'flat'"
              size="large"
              rounded="xl"
              block
              class="magic-btn plan-btn"
              :disabled="plan.current"
            >
              <v-icon 
                :icon="plan.current ? 'mdi-check' : plan.name === 'Free' ? 'mdi-download' : 'mdi-crown'" 
                start
              ></v-icon>
              {{ plan.current ? 'Current Plan' : plan.buttonText }}
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Feature Comparison -->
    <div class="comparison-section mb-10">
      <div class="glass-card">
        <h2 class="section-title text-center mb-8">Feature Comparison</h2>
        
        <div class="comparison-table">
          <div class="table-header">
            <div class="feature-column">Features</div>
            <div class="plan-column">Free</div>
            <div class="plan-column">Pro</div>
            <div class="plan-column popular-col">Enterprise</div>
          </div>
          
          <div 
            v-for="(feature, index) in comparisonFeatures" 
            :key="index"
            class="table-row"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="feature-cell">
              <div class="feature-name">{{ feature.name }}</div>
              <div class="feature-desc">{{ feature.description }}</div>
            </div>
            <div class="plan-cell">
              <component 
                :is="typeof feature.free === 'boolean' ? 'v-icon' : 'span'"
                :icon="feature.free === true ? 'mdi-check' : feature.free === false ? 'mdi-close' : ''"
                :color="feature.free === true ? 'success' : feature.free === false ? 'error' : ''"
                size="20"
              >
                {{ typeof feature.free === 'string' ? feature.free : '' }}
              </component>
            </div>
            <div class="plan-cell">
              <component 
                :is="typeof feature.pro === 'boolean' ? 'v-icon' : 'span'"
                :icon="feature.pro === true ? 'mdi-check' : feature.pro === false ? 'mdi-close' : ''"
                :color="feature.pro === true ? 'success' : feature.pro === false ? 'error' : ''"
                size="20"
              >
                {{ typeof feature.pro === 'string' ? feature.pro : '' }}
              </component>
            </div>
            <div class="plan-cell">
              <component 
                :is="typeof feature.enterprise === 'boolean' ? 'v-icon' : 'span'"
                :icon="feature.enterprise === true ? 'mdi-check' : feature.enterprise === false ? 'mdi-close' : ''"
                :color="feature.enterprise === true ? 'success' : feature.enterprise === false ? 'error' : ''"
                size="20"
              >
                {{ typeof feature.enterprise === 'string' ? feature.enterprise : '' }}
              </component>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <div class="glass-card">
        <h2 class="section-title text-center mb-8">Frequently Asked Questions</h2>
        
        <v-expansion-panels variant="accordion" class="faq-panels">
          <v-expansion-panel
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-panel"
          >
            <v-expansion-panel-title class="faq-question">
              {{ faq.question }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="faq-answer">
              {{ faq.answer }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isAnnual = ref(false)

const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    icon: 'mdi-gift-outline',
    monthlyPrice: 0,
    yearlyPrice: 0,
    current: true,
    buttonText: 'Current Plan',
    features: [
      { text: '10 alerts per month', included: true },
      { text: 'Basic search criteria', included: true },
      { text: 'Email notifications', included: true },
      { text: 'CSV export', included: false },
      { text: 'Priority support', included: false },
      { text: 'Advanced filters', included: false }
    ]
  },
  {
    name: 'Pro',
    description: 'For serious car traders',
    icon: 'mdi-rocket-launch',
    monthlyPrice: 29,
    yearlyPrice: 290,
    monthlySavings: 6,
    popular: true,
    buttonText: 'Upgrade to Pro',
    features: [
      { text: '1,000 alerts per month', included: true },
      { text: 'Advanced search criteria', included: true },
      { text: 'Instant notifications', included: true },
      { text: 'CSV & Excel export', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced filters', included: true }
    ]
  },
  {
    name: 'Enterprise',
    description: 'For dealerships and businesses',
    icon: 'mdi-office-building',
    monthlyPrice: 99,
    yearlyPrice: 990,
    monthlySavings: 20,
    buttonText: 'Contact Sales',
    features: [
      { text: 'Unlimited alerts', included: true },
      { text: 'Custom search criteria', included: true },
      { text: 'Real-time notifications', included: true },
      { text: 'All export formats', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: true }
    ]
  }
]

const comparisonFeatures = [
  {
    name: 'Monthly Alerts',
    description: 'Number of deal alerts you can receive',
    free: '10',
    pro: '1,000',
    enterprise: 'Unlimited'
  },
  {
    name: 'Search Criteria',
    description: 'Number of saved search profiles',
    free: '1',
    pro: '10',
    enterprise: 'Unlimited'
  },
  {
    name: 'Export Formats',
    description: 'Available data export options',
    free: false,
    pro: true,
    enterprise: true
  },
  {
    name: 'API Access',
    description: 'Programmatic access to your data',
    free: false,
    pro: false,
    enterprise: true
  },
  {
    name: 'Support Level',
    description: 'Customer support priority',
    free: 'Community',
    pro: 'Email',
    enterprise: 'Priority'
  }
]

const faqs = [
  {
    question: 'Can I change my plan at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start.'
  },
  {
    question: 'How accurate are the deal scores?',
    answer: 'Our algorithm analyzes thousands of data points and has a 85%+ accuracy rate in identifying underpriced vehicles.'
  }
]

const toggleBilling = () => {
  isAnnual.value = !isAnnual.value
}
</script>

<style scoped>
.world-class-subscription {
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
  padding: 4rem 3rem;
  position: relative;
  overflow: hidden;
}

.hero-title {
  font-size: 3rem;
  font-weight: 300;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

/* Pricing Switch */
.pricing-switch {
  display: flex;
  justify-content: center;
}

.switch-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
}

.switch-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.switch-label.active {
  color: #3B82F6;
  font-weight: 600;
}

.custom-switch {
  cursor: pointer;
}

.switch-track {
  width: 48px;
  height: 24px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  position: relative;
  transition: background 0.3s ease;
}

.switch-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.switch-thumb.annual {
  transform: translateX(24px);
}

/* Pricing Grid */
.pricing-grid .v-col {
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

/* Pricing Cards */
.pricing-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15);
}

.pricing-card.popular {
  border-color: #3B82F6;
  transform: scale(1.05);
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-8px);
  box-shadow: 0 25px 70px rgba(59, 130, 246, 0.25);
}

.pricing-card.current {
  border-color: #6B7280;
  background: rgba(248, 250, 252, 0.9);
}

/* Badges */
.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.current-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #6B7280;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Plan Header */
.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-icon {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 20px;
  padding: 1rem;
  display: inline-flex;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.plan-description {
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

/* Plan Pricing */
.plan-pricing {
  text-align: center;
  margin-bottom: 2rem;
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.currency {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3B82F6;
}

.amount {
  font-size: 3rem;
  font-weight: 300;
  color: #111827;
  margin: 0 0.25rem;
}

.period {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.6);
}

.savings {
  font-size: 0.875rem;
  color: #2563EB;
  font-weight: 500;
}

/* Plan Features */
.plan-features {
  flex: 1;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  animation: fadeInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

@keyframes fadeInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
}

.feature-item span {
  font-size: 0.875rem;
  color: #374151;
}

.feature-item span.disabled {
  color: rgba(0, 0, 0, 0.4);
  text-decoration: line-through;
}

/* Plan Action */
.plan-action {
  margin-top: auto;
}

/* Magic Button */
.magic-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
}

.magic-btn:not(:disabled):hover {
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

.magic-btn:not(:disabled):hover::before {
  left: 100%;
}

/* Glass Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* Comparison Table */
.comparison-table {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 1.5rem;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.popular-col {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
  border-radius: 8px;
  color: #2563EB;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.table-row:last-child {
  border-bottom: none;
}

@keyframes fadeIn {
  to { opacity: 1; }
  from { opacity: 0; }
}

.feature-cell {
  text-align: left;
}

.feature-name {
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.feature-desc {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.plan-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #374151;
}

/* FAQ Section */
.faq-panels :deep(.v-expansion-panel) {
  background: rgba(255, 255, 255, 0.6) !important;
  margin-bottom: 1rem;
  border-radius: 12px !important;
  box-shadow: none !important;
}

.faq-panels :deep(.v-expansion-panel-title) {
  font-weight: 600;
  color: #111827;
}

.faq-panels :deep(.v-expansion-panel-text) {
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .pricing-card.popular {
    transform: none;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .plan-cell {
    justify-content: flex-start;
  }
}
</style> 