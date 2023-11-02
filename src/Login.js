import React from "react";
import { signin, socialLogin } from "./service/ApiService";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");
    // ApiService의 signin 메서드로 로그인
    signin({ username: username, password: password });
  };

  const handleSocialLogin = (provider) => {
    // console.log(provider);
    socialLogin(provider);
  };

  return (
    <Container component={"main"} maxWidth="xs" style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={handleSubmit}>
        {/* submit 버튼을 누르면 handleSubmit 실행 */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              vairant="outlined"
              required
              fullWidth
              id="username"
              label="아이디"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              vairant="outlined"
              required
              fullWidth
              id="password"
              label="비밀번호"
              name="password"
              type="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={() => handleSocialLogin("github")}
              variant="contained"
              style={{ backgroundColor: "#000" }}
            >
              깃허브로 로그인하기
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={() => handleSocialLogin("google")}
              variant="contained"
              style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
            >
              구글로 로그인하기
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={() => handleSocialLogin("kakao")}
              variant="contained"
              style={{ backgroundColor: "#FEE500", color: "#191919" }}
            >
              카카오로 로그인하기
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={() => handleSocialLogin("naver")}
              variant="contained"
              style={{ backgroundColor: "#1EC800" }}
            >
              네이버로 로그인하기
            </Button>
          </Grid>
          <Grid item>
            <Link to="/signup" variant="body2">
              계정이 없나요? 여기서 가입하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;
