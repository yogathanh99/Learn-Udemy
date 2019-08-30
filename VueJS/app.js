new Vue({
  el: '#app',
  data: {
    title: 'Hello VueJS',
    url: 'https://youtube.com',
    count: 0,
    name: 'Thanh',
    loginType: 'username',
    items: ['Dog', 'Cat', 'Fish', 'Lion'],
  },
  methods: {
    // text(name) {
    //   return `Hello ${name}`;
    // },
    changeAmount(value) {
      this.count += value;
    },
    handleChangeValue(e) {
      this.name = e.target.value;
    },
    logMessage() {
      console.log('Hello');
    },
    toggleType() {
      if (this.loginType === 'username') this.loginType = 'email';
      else this.loginType = 'username';
    },
  },
});
