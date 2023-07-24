import base from "lib/base";
import { getSetProduct } from "lib/setProduct";
import { getTire } from "lib/tire";

export async function generateMetadata({ params }) {
  const { product } = await getSetProduct(params.slug);
  let title = "Gotire.mn - дугуй, обудын төрөлжсөн худалдаа";

  if (product) {
    title = product.name + " - " + title;
  }

  let openGraph = {
    images:
      product && product.pictures && product.pictures[0] !== ""
        ? `${base.cdnUrl}/${product.pictures[0]}`
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
