<template>
  <img ref="img">
</template>
<script>
export default {
  name: "authImg",
  props: {
    authSrc: {
      type: String,
      required: false,
      default: "",
    }
  },
  mounted() {
    let token = window.sessionStorage.getItem('token')
    Object.defineProperty(Image.prototype, 'authSrc', {
      writable: true,
      enumerable: true,
      configurable: true
    })
    let img = this.$refs.img
    let request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', this.authSrc, true);
    request.setRequestHeader('Authorization', token);  //根据后端需求添加的权限标志
    request.onreadystatechange = e => {
      if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
        img.src = URL.createObjectURL(request.response);
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        }
      }
    };
    request.send(null);
  },
}
</script>

<style>
img{
  width: 100%;
}
</style>
