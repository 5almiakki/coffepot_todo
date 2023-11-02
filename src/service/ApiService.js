import { API_BASE_URL } from "../api-config";

// 로그인에 관련되지 않은 api 콜은 모두 이 함수로 이뤄짐
export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const refreshToken = localStorage.getItem("REFRESH_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken)
  }
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }

  return (
    fetch(options.url, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          window.location.href = "/login"; // redirect
        } else {
          // Promise.reject(response);
          // throw Error(response);
          new Error(response);
        }
      })
      .catch((error) => {
        console.log("http error");
        console.log(error);
      })
  );
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      if (response.accessToken) { // token이 있으면
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem("ACCESS_TOKEN", response.accessToken);
        // Todo 화면으로 리디렉트
        window.location.href = "/";
      }
      if (response.refreshToken) {
        localStorage.setItem("REFRESH_TOKEN", response.refreshToken);
      }
    });
}

// 기존의 토큰은 로컬 스토리지에서 없애면 로그아웃됨
export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  localStorage.setItem("REFRESH_TOKEN", null);
  window.location.href = "/login";
}

export function socialLogin(provider) {
  const frontendUrl = window.location.protocol + "//" + window.location.host;
  window.location.href = API_BASE_URL + "/auth/authorize/" + provider
    + "?redirect_url=" + frontendUrl;
}
