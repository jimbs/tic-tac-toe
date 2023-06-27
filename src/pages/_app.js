import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  async function getStatus(e) {
    const res = await fetch("/dole-tracking");
    const jsonRes = (await res.json())[0];
    document.querySelector("#dole_status").innerText = jsonRes.status;
  }

  useEffect(()=>{
    getStatus()
  })

  return <Component {...pageProps} />;
}
