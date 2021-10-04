const app = Vue.createApp({
  data(){
    return {
      product: 'Socks',
      image: './assets/images/socks_green.jpg',
      inventory: 100,
      onSale: true
    }
  }
})

const mountedApp = app.mount('#app')
