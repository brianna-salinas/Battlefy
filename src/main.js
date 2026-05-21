/**
 * @file main.js
 * @summary Application entry point. Bootstraps Vue, PrimeVue, Pinia, Router, and I18n.
 * @author Brianna Salinas Guzman
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import router from './shared/infrastructure/router/index.js'
import i18n from './shared/infrastructure/i18n/index.js'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: { darkModeSelector: '.app-dark' }
  }
})
app.use(ConfirmationService)
app.use(ToastService)

// Register PrimeVue components with pv- prefix
app.component('pv-toolbar', Toolbar)
app.component('pv-button', Button)
app.component('pv-card', Card)
app.component('pv-data-table', DataTable)
app.component('pv-column', Column)
app.component('pv-tag', Tag)
app.component('pv-select', Select)
app.component('pv-input-number', InputNumber)
app.component('pv-message', Message)
app.component('pv-progress-spinner', ProgressSpinner)
app.component('pv-confirm-dialog', ConfirmDialog)
app.component('pv-toast', Toast)

app.mount('#app')
