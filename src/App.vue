<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F1F1F1;

}

.container {
  max-width: 1040px;
  margin: 0 auto;
}

.header {
  position: relative;
  height: 80px;
}

#nav {
  display: flex;
  justify-content: space-between;

  .nav-leftside {
    display: flex;
    align-items: center;
    & a {
      margin-left: 20px;
    }
  }

  .nav-rightside {
    display: flex;
    align-items: center;
    a.router-link-active {
      color: #1390E5;
      border: none;
    }

  }

  a {
    height: 78px;
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    border-bottom: 2px solid #fff;

    &.router-link-active {
      border-bottom: 2px solid #1390E5;
    }
  }
}

.header {
  background-color: #fff;
}

.notFound {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10vh;
}

img {
  object-fit: cover;
}

a:focus {
  outline: 2px dashed darkblue;
  outline-offset: 2px;
  transition: .1s;
}

button:focus {
  outline: 2px dashed darkblue;
  outline-offset: 2px;
  transition: .1s;
}

.el-input__inner:focus {
  background: rgba(197, 228, 249, 0.3) !important;
}

</style>
