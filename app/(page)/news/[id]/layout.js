import base from "lib/base";
import { getContent } from "lib/news";

export async function generateMetadata({ params }) {
  const { news } = await getContent(params.id);
  let title = "Gotire.mn - дугуй, обудын төрөлжсөн худалдаа";

  if (news) {
    title = news.name + " - " + title;
  }

  let openGraph = {
    images:
      news && news.pictures && news.pictures[0]
        ? `${base.cdnUrl}/${news.pictures[0]}`
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
