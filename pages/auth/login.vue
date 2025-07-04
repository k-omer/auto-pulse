<template>
  <div class="world-class-auth">
    <!-- Background Elements -->
    <div class="auth-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <v-container class="auth-container">
      <v-row justify="center" align="center" class="min-vh-100">
        <v-col cols="12" sm="8" md="6" lg="4" xl="3">
          <!-- Logo/Brand Section -->
          <div class="brand-section mb-10">
            <div class="brand-icon">
              <v-icon icon="mdi-car-sports" size="48" color="primary"></v-icon>
            </div>
            <h1 class="brand-title">AutoScout Assistant Pro</h1>
            <p class="brand-subtitle">Welcome back to your deal finder</p>
          </div>

          <!-- Main Auth Card -->
          <div class="glass-auth-card">
            <div class="auth-header mb-8">
              <h2 class="auth-title">Sign In</h2>
              <p class="auth-subtitle">Access your dashboard and manage your deals</p>
            </div>

            <v-form class="auth-form">
              <div class="form-group mb-6">
                <label class="form-label">Email Address</label>
                <v-text-field
                  type="email"
                  placeholder="Enter your email"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="premium-field"
                  prepend-inner-icon="mdi-email-outline"
                  hide-details
                />
              </div>

              <div class="form-group mb-6">
                <label class="form-label">Password</label>
                <v-text-field
                  type="password"
                  placeholder="Enter your password"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  class="premium-field"
                  prepend-inner-icon="mdi-lock-outline"
                  hide-details
                />
              </div>

              <div class="form-options mb-8">
                <v-checkbox
                  label="Remember me"
                  density="compact"
                  class="premium-checkbox"
                  hide-details
                />
                <NuxtLink to="/auth/reset" class="forgot-link">
                  Forgot password?
                </NuxtLink>
              </div>

              <v-btn
                color="primary"
                size="x-large"
                rounded="xl"
                block
                class="magic-btn login-btn mb-6"
              >
                <v-icon start icon="mdi-login"></v-icon>
                Sign In
              </v-btn>

              <!-- Divider -->
              <div class="auth-divider mb-6">
                <span class="divider-text">or continue with</span>
              </div>

              <!-- Social Login -->
              <div class="social-login mb-8">
                <v-btn
                  variant="outlined"
                  size="large"
                  rounded="xl"
                  class="social-btn"
                  block
                >
                  <v-icon start icon="mdi-google"></v-icon>
                  Google
                </v-btn>
              </div>

              <!-- Sign Up Link -->
              <div class="auth-footer">
                <p class="footer-text">
                  Don't have an account?
                  <NuxtLink to="/auth/signup" class="auth-link">
                    Create one here
                  </NuxtLink>
                </p>
              </div>
            </v-form>
          </div>

          <!-- Trust Indicators -->
          <div class="trust-section mt-8">
            <div class="trust-item">
              <v-icon icon="mdi-shield-check" size="16" color="success"></v-icon>
              <span>256-bit SSL encryption</span>
            </div>
            <div class="trust-item">
              <v-icon icon="mdi-lock" size="16" color="success"></v-icon>
              <span>GDPR compliant</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// Add auth logic here later
</script>

<style scoped>
.world-class-auth {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  overflow: hidden;
}

/* Background Elements */
.auth-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%);
  backdrop-filter: blur(20px);
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation: float1 8s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  top: 60%;
  right: 15%;
  animation: float2 10s ease-in-out infinite;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 20%;
  animation: float3 6s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(10px) rotate(-3deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(3deg); }
}

@keyframes float3 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(-2deg); }
  75% { transform: translateY(15px) rotate(4deg); }
}

/* Container */
.auth-container {
  position: relative;
  z-index: 1;
}

/* Brand Section */
.brand-section {
  text-align: center;
  animation: slideInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.brand-icon {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 20px;
  padding: 1rem;
  display: inline-flex;
  margin-bottom: 1rem;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  animation: iconGlow 3s ease-in-out infinite;
}

@keyframes iconGlow {
  0%, 100% { box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 12px 40px rgba(59, 130, 246, 0.5); }
}

.brand-title {
  font-size: 1.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.brand-subtitle {
  color: rgba(0, 0, 0, 0.6);
  font-size: 1rem;
  margin: 0;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glass Auth Card */
.glass-auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Auth Header */
.auth-title {
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  text-align: center;
}

.auth-subtitle {
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 0;
}

/* Form Elements */
.form-group {
  position: relative;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.premium-field :deep(.v-field) {
  background: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.premium-field:hover :deep(.v-field) {
  background: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.premium-field :deep(.v-field--focused) {
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2) !important;
  border-color: #3B82F6 !important;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.premium-checkbox :deep(.v-selection-control) {
  color: #374151;
}

.forgot-link {
  color: #3B82F6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #2563EB;
}

/* Magic Button */
.magic-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.magic-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
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

.login-btn {
  font-size: 1rem;
  height: 56px;
}

/* Divider */
.auth-divider {
  position: relative;
  text-align: center;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
}

.divider-text {
  background: rgba(255, 255, 255, 0.9);
  padding: 0 1rem;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  position: relative;
  z-index: 1;
}

/* Social Login */
.social-btn {
  transition: all 0.3s ease;
  border-color: rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Auth Footer */
.footer-text {
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  font-size: 0.875rem;
}

.auth-link {
  color: #3B82F6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.auth-link:hover {
  color: #2563EB;
}

/* Trust Section */
.trust-section {
  display: flex;
  justify-content: center;
  gap: 2rem;
  animation: fadeIn 1s ease-in-out 0.6s backwards;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .glass-auth-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .brand-title {
    font-size: 1.5rem;
  }
  
  .auth-title {
    font-size: 1.75rem;
  }
  
  .trust-section {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}
</style> 