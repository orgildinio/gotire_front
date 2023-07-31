import GoogleAnalytics from "components/GoogleAnalytics";
import RandomTire from "components/Product/RandomTire";
import ServiceDetails from "components/Service/service-details";
import { getService } from "lib/services";

export default async function Page({ params: { slug } }) {
  const { service } = await getService(slug);

  if (!service) {
    return;
  }

  return (
    <div>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <main>
        <ServiceDetails page={service} />
        <RandomTire />
      </main>
    </div>
  );
}
