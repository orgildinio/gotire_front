import SideSearch from "components/Generals/SideSearch";
import GoogleAnalytics from "components/GoogleAnalytics";
import HomeMenu from "components/Home/HomeMenu";
import MakeTopList from "components/Home/MakeTopList";
import ReachTires from "components/Home/ReachTires";
import SearchHeaderBox from "components/Home/SearchHeaderBox";
import WheelList from "components/Home/WheelList";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <GoogleAnalytics ga_id={`G-0DFS7DK8C1`} />

      <HomeMenu />
      {/* <SearchHeaderBox /> */}
      <MakeTopList />
      <ReachTires />
      <WheelList />
      <SideSearch />
    </>
  );
}
