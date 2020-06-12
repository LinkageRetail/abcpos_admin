import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import storage from '../model/storage.js'

export default ({ app, Vue }) => {
  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: storage.get("lang") || 'en-us',
    fallbackLocale: 'en-us',
    messages
  })
}
