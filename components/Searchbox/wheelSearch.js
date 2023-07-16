import { useState } from "react";
import CarField from "./carField";
import TireSize from "./tireSize";

const WheelSearch = (props) => {
  const [tab, setTab] = useState("car");

  return (
    <>
      <div className="tire-search-box">
        <div className="search-tabs">
          <div
            onClick={() => setTab("car")}
            className={`search-tab ${tab === "car" && "active"}`}
          >
            Машинаар
          </div>
        </div>
        {tab == "size" && <TireSize />}
        {tab == "car" && <CarField searchPath="wheels" />}
      </div>
    </>
  );
};

export default WheelSearch;
