import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            background: '#FAFBFC',
            surface: '#FFFFFF',
            'surface-bright': '#FFFFFF',
            'surface-light': '#FEFEFE',
            'surface-variant': '#F1F5F9',
            'on-surface-variant': '#64748B',
            primary: '#3B82F6',        // Blue-500 (changed from emerald)
            'primary-darken-1': '#2563EB',  // Blue-600 (changed from emerald)
            'primary-lighten-1': '#60A5FA', // Blue-400 (changed from emerald)
            'primary-lighten-2': '#93C5FD', // Blue-300 (changed from emerald)
            'primary-lighten-3': '#DBEAFE', // Blue-100 (changed from emerald)
            secondary: '#64748B',      // Gray-500
            'secondary-darken-1': '#475569',
            'secondary-lighten-1': '#94A3B8',
            accent: '#2563EB',         // Blue-600 (changed from purple)
            error: '#EF4444',          // Red-500
            'error-lighten-1': '#F87171',
            info: '#06B6D4',           // Cyan-500
            'info-lighten-1': '#22D3EE',
            success: '#22C55E',        // Green-500
            'success-lighten-1': '#4ADE80',
            warning: '#F59E0B',        // Amber-500
            'warning-lighten-1': '#FBBF24',
            // Custom colors for premium UI (updated to blue theme)
            'glass': 'rgba(255, 255, 255, 0.7)',
            'glass-dark': 'rgba(255, 255, 255, 0.1)',
            'shadow-light': 'rgba(0, 0, 0, 0.05)',
            'shadow-medium': 'rgba(0, 0, 0, 0.1)',
            'gradient-start': '#3B82F6',  // Blue-500 (changed from emerald)
            'gradient-end': '#2563EB',    // Blue-600 (changed from emerald)
            'on-background': '#111827', // Gray-900
            'on-surface': '#111827',    // Gray-900
            'on-primary': '#FFFFFF',
            'on-secondary': '#FFFFFF',
            'on-accent': '#FFFFFF',
            'on-error': '#FFFFFF',
            'on-info': '#FFFFFF',
            'on-success': '#FFFFFF',
            'on-warning': '#FFFFFF',
          },
        },
      },
    },
    defaults: {
      VCard: {
        elevation: 0,
        style: 'border: 1px solid rgba(0, 0, 0, 0.05); backdrop-filter: blur(10px);'
      },
      VBtn: {
        style: 'transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform: scale(1);'
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
}) 