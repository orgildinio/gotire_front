import { useState } from "react";
import CarField from "./carField";
import TireSize from "./tireSize";

const TireSearch = (props) => {
  const [tab, setTab] = useState("size");

  return (
    <>
      <div className="tire-search-box">
        <div className="search-tabs">
          <div
            onClick={() => setTab("size")}
            className={`search-tab ${tab === "size" && "active"}`}
          >
            Дугуйны хэмжээгээр
          </div>
          <span> / </span>
          <div
            onClick={() => setTab("car")}
            className={`search-tab ${tab === "car" && "active"}`}
          >
            Машинаар
          </div>
        </div>
        {tab == "size" && <TireSize />}
        {tab == "car" && <CarField searchPath={"tires"} />}
      </div>
    </>
  );
};

export default TireSearch;
