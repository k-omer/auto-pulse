<template>
  <v-app class="premium-app">
    <v-navigation-drawer
      app
      permanent
      width="280"
      class="premium-drawer"
      :style="{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(0, 0, 0, 0.08)'
      }"
    >
      <div class="drawer-content pa-6">
        <!-- Logo Section -->
        <div class="logo-section mb-8">
          <div class="d-flex align-center mb-2">
            <div class="logo-icon-wrapper mr-3">
              <v-icon icon="mdi-car-sports" size="32" color="white" class="logo-icon"></v-icon>
            </div>
            <div>
              <div class="text-h6 font-weight-bold text-primary">AutoScout</div>
              <div class="text-caption text-medium-emphasis">Assistant Pro</div>
            </div>
          </div>
          <v-divider class="premium-divider" />
        </div>

        <!-- Navigation Items -->
        <v-list class="premium-nav" nav density="comfortable">
          <v-list-item 
            v-for="item in navItems" 
            :key="item.to"
            :to="item.to" 
            :prepend-icon="item.icon" 
            :title="item.title"
            class="premium-nav-item mb-1"
            rounded="xl"
          />
        </v-list>

        <!-- Upgrade Card -->
        <v-card 
          class="upgrade-card mt-8" 
          rounded="xl" 
          variant="tonal" 
          color="primary"
          :style="{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }"
        >
          <v-card-text class="pa-4">
            <div class="text-center">
              <v-icon icon="mdi-rocket-launch" size="24" color="primary" class="mb-2"></v-icon>
              <div class="text-subtitle-2 font-weight-bold mb-1">Upgrade to Pro</div>
              <div class="text-caption text-medium-emphasis mb-3">Unlock unlimited alerts</div>
              <v-btn 
                size="small" 
                color="primary" 
                variant="flat" 
                rounded="pill"
                to="/subscription"
                class="premium-btn"
              >
                Upgrade Now
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-navigation-drawer>

    <v-app-bar 
      flat 
      height="80"
      class="premium-app-bar"
      :style="{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }"
    >
      <v-toolbar-title class="premium-title ml-4">
        <span class="text-h5 font-weight-light">Good morning</span>
        <div class="text-caption text-medium-emphasis">Ready to find some great deals?</div>
      </v-toolbar-title>
      
      <v-spacer />
      
      <!-- Search Bar -->
      <v-text-field
        placeholder="Quick search..."
        variant="solo-filled"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        rounded="pill"
        max-width="300"
        class="premium-search mr-4"
        hide-details
      />
      
      <!-- User Actions -->
      <v-btn 
        icon="mdi-bell-outline" 
        variant="text" 
        class="premium-icon-btn mr-2"
        size="large"
      />
      
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn 
            v-bind="props"
            icon
            size="large"
            class="premium-avatar mr-4"
          >
            <v-avatar color="primary" size="40">
              <v-icon icon="mdi-account" color="white"></v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="premium-menu">
          <v-list-item to="/account" prepend-icon="mdi-account-outline">Account</v-list-item>
          <v-list-item to="/auth/login" prepend-icon="mdi-logout">Logout</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="premium-main">
      <div class="main-content pa-8">
        <NuxtPage />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const navItems = [
  { to: '/', icon: 'mdi-view-dashboard-variant-outline', title: 'Dashboard' },
  { to: '/search-criteria', icon: 'mdi-tune-variant', title: 'Search Criteria' },
  { to: '/export', icon: 'mdi-download-outline', title: 'Export' },
  { to: '/notifications', icon: 'mdi-bell-outline', title: 'Notifications' },
  { to: '/subscription', icon: 'mdi-crown-outline', title: 'Subscription' },
  { to: '/account', icon: 'mdi-account-outline', title: 'Account' }
]
</script>

<style scoped>
.premium-app {
  background: linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%);
}

.premium-drawer {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.logo-icon-wrapper {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.logo-icon {
  filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.3));
}

.premium-divider {
  background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
  height: 1px;
  border: none;
}

.premium-nav-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 4px;
}

.premium-nav-item:hover {
  transform: translateX(8px);
  background: rgba(59, 130, 246, 0.08) !important;
}

.upgrade-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.upgrade-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.premium-btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.premium-app-bar {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.premium-search :deep(.v-field) {
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.premium-search:hover :deep(.v-field) {
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.premium-icon-btn {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-icon-btn:hover {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.1) !important;
}

.premium-avatar {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-avatar:hover {
  transform: scale(1.05);
}

.premium-menu {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.premium-main {
  background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%);
  min-height: 100vh;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
}

/* Global animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.drawer-content {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
