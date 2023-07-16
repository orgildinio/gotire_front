import base from "lib/base";
import { getService } from "lib/services";

export async function generateMetadata({ params }) {
  const { service } = await getService(params.slug);
  let title = "Gotire.mn - дугуй, обудын төрөлжсөн худалдаа";

  if (service) {
    title = service.name + " - " + title;
  }

  let openGraph = {
    images:
      service && service.pictures && service.pictures[0] !== ""
        ? `${base.cdnUrl}/${service.pictures[0]}`
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
