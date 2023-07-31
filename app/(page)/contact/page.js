import Loading from "app/loading";
import ContactPage from "components/Contact/ContactPage";
import GoogleAnalytics from "components/GoogleAnalytics";

import { getWebInfo } from "lib/webinfo";
import { Suspense, use } from "react";

export default async function Page() {
  const { webInfo } = await getWebInfo();
  return (
    <div>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <main>
        <Suspense fallback={<Loading />}>
          <div
            className="pageDetailsHeader"
            style={{
              background: `url(/images/header.jpg)`,
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <h2> Холбоо барих </h2>
            </div>
          </div>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <ContactPage webInfo={webInfo} />
                </div>
              </div>
            </div>
          </section>
        </Suspense>
      </main>
    </div>
  );
}
