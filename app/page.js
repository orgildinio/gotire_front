import SideSearch from "components/Generals/SideSearch";
import HomeMenu from "components/Home/HomeMenu";
import MakeTopList from "components/Home/MakeTopList";
import ReachTires from "components/Home/ReachTires";
import SearchHeaderBox from "components/Home/SearchHeaderBox";
import WheelList from "components/Home/WheelList";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <HomeMenu />
      {/* <SearchHeaderBox /> */}
      <MakeTopList />
      <ReachTires />
      <WheelList />
      <SideSearch />
    </>
  );
}
