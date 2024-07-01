const merchantAppId = 'kpd4f4c3a64c3d46a0918969d28c6112';
const baseUrl = 'http://127.0.0.1:8000/api/v1';
function autoLogin() {
  console.log('merchantAppId', merchantAppId);
  getMiniAppToken()
    .then((token) => {
      //2. Verify the returned token of the Super APP. If the token is verified, login is not required.
      authToken(token);
    })
    .catch((ex) => {
      console.log(ex);
    })
    .finally(() => {});
}
//1.get token from Super app
function getMiniAppToken() {
  return new Promise((resolve, reject) => {
    window.ma
      .native('gethwssostring', { merchantAppId: merchantAppId })
      .then((res) => {
        //"getMiniAppToken"It is only a name. The actual interface is subject to the actual environment.
        console.log('res', res);
        let data = JSON.parse(res);
        resolve(data.token);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}

// 3.call H5 service auth token and get userinfo
function authToken(token) {
  // let loading = weui.loading('loading', {});
  window
    .fetch(baseUrl + '/auth/token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authToken: token,
      }),
    })
    .then((res) => {
      res.json().then((json) => {
        console.log(json);
        let openId = customer_info.openID;
        console.log(openId);
        document.getElementById(
          'userinfo'
        ).innerHTML = `openId: <br> <span style='color:red;'>${openId}</span>`;
      });
    })
    .finally(() => {
      // loading.hide();
    });
}


