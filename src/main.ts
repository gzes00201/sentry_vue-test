import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as Sentry from "@sentry/vue"

const app = createApp(App)

app.use(createPinia())
app.use(router)
Sentry.init({
  app,
  dsn: "http://b9e7333be50a45f3a3cd73931693db4a@34.125.166.65:9000/2",
  debug: true, // 嘗試給出更多錯誤資訊, 通常不建議在生產中打開它，儘管打開debug模式不會引起任何安全問題
  release: '1.0.0', // 版本號, 可認package.json 或任何你自定義的版本
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay({
        // Additional SDK configuration goes in here, for example:
        maskAllText: true,
        blockAllMedia: true,
      }),
  ],
  ignoreErrors: [
    'UCShellJava',
    '$ is not defined',
    'AbortError: The user aborted a request.',
    'Network error:',
    'Network Error',
    'Navigation cancelled from'
  ],// ignore 包含關鍵字的訊息
  tracesSampleRate: 1.0, // traces的採樣率，範圍為0.0到1.0。默認值是1.0
  sampleRate: 1.0, // 錯誤事件的採樣率，範圍為0.0到1.0。默認值是1.0
  replaysOnErrorSampleRate: 1.0,// 為1.0. 這確保每個用戶會話都將發送到哨兵。測試完成後，我們建議在生產中降低此值
  replaysSessionSampleRate: 1.0, // 發生錯誤時記錄的重播採樣率
})

app.mount('#app')
