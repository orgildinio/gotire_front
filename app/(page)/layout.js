import NextScript from "next/script";

export default function RootLayout({ children }) {
  return (
    <>
      <NextScript
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-0DFS7DK8C1"
      ></NextScript>
      <NextScript>
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-0DFS7DK8C1');
      </NextScript>
      {children}
    </>
  );
}
