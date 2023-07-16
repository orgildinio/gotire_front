import base from "lib/base";
import { getTire } from "lib/tire";

export async function generateMetadata({ params }) {
  const { tire } = await getTire(params.slug);
  let title = "Gotire.mn - дугуй, обудын төрөлжсөн худалдаа";

  if (tire) {
    title = tire.name + " - " + title;
  }

  let openGraph = {
    images:
      tire && tire.pictures && tire.pictures[0] !== ""
        ? `${base.cdnUrl}/${tire.pictures[0]}`
        : `${base.baseUrl}/images/header.jpg`,
  };

  return {
    title,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
