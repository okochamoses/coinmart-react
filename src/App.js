import React, { Component } from 'react';
import Routes from './routes/Routes';

// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes

// default
import './assets/scss/theme.scss';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';


// configure fake backend
configureFakeBackend();

/**
 * Main app component
 */
class App extends Component {
  async componentDidMount() {
    await this.loadScripts()
  }
  
  async loadScripts() {
    // var Tawk_API = Tawk_API || {};

    // var Tawk_LoadStart = new Date();

    await (function () {
        var s1 = document.createElement('script'),
            s0 = document.getElementsByTagName('script')[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/5e9a2f8569e9320caac4d6dc/1e654lr8v';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
}
  render() {
    return <Routes></Routes>;
  }
}

export default App;
