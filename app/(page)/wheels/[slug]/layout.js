import base from "lib/base";
import { getTire } from "lib/tire";
import { getWheel } from "lib/wheel";

export async function generateMetadata({ params }) {
  const { wheel } = await getWheel(params.slug);
  let title = "Gotire.mn - дугуй, обудын төрөлжсөн худалдаа";

  if (wheel) {
    title = wheel.name + " - " + title;
  }

  let openGraph = {
    images:
      wheel && wheel.pictures && wheel.pictures[0] !== ""
        ? `${base.cdnUrl}/${wheel.pictures[0]}`
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
