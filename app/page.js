import MakeTopList from "components/Home/makeTopList";
import ReachTires from "components/Home/ReachTires";
import SearchHeaderBox from "components/Home/SearchHeaderBox";
import WheelList from "components/Home/WheelList";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <SearchHeaderBox />
      <MakeTopList />
      <ReachTires />
      <WheelList />
    </>
  );
}
