import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ConfigProvider } from 'antd';
import { IntlProvider } from "react-intl";

import AppLocale from './languages';

import Router from "./router/Router";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  // Redux
  const customise = useSelector(state => state.customise)
  const dispatch = useDispatch();


  // Lang
  const currentAppLocale = AppLocale[customise.language];

  useEffect(() => {
    document.querySelector("html").setAttribute("lang", customise.language);
  }, [customise]);

  useEffect(() => {
    const localUser = localStorage.getItem("userData");
    if(localUser){
      const data = JSON.parse(localUser);
      dispatch({
        type: "SET_USER",
        user: data.user,
        token: data.tokens,
        isLoggedIn: true,
      })
    }
  }, [])

  return (
    <ConfigProvider locale={currentAppLocale.antd} direction={customise.direction}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
      <GoogleOAuthProvider clientId="921278062544-m85n9811utb3995q9tt79nfqs2hosajb.apps.googleusercontent.com">
        <Router />
        </GoogleOAuthProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}