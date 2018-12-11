import Cookie from './cookie'
export function redirectLogin() {
    localStorage.clear();
    Cookie.removeItem("roles");
    const returnUrl =
        window.location.pathname +
        (window.location.search || "") + "#/login";
    window.location.replace(returnUrl);
}