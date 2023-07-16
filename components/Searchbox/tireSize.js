import { Button, Select } from "antd";
import axios from "axios-base";
import { toastControl } from "lib/toastControl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TireSize = () => {
  const [widths, setWidths] = useState([]);
  const [heights, setHeights] = useState([]);
  const [diameters, setDiameters] = useState([]);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [diameter, setDiameter] = useState(null);

  const router = useRouter();

  const handleSearch = () => {
    if (diameter && width && height) {
      router.push(`/tires?tiresize=${width}/${height}R${diameter}`);
    } else {
      toastControl("error", "Талбаруудыг сонгоно уу");
    }
  };

  useEffect(() => {
    const fetchDiameter = async () => {
      const result = await axios.get(
        `tires/groups?width=${width}&height=${height}`
      );
      if (result && result.data) {
        const { diameter } = result.data;
        setDiameters(() =>
          diameter.map((el) => ({
            value: el.name,
            label: el.name,
          }))
        );
      }
    };
    if (width && height) {
      setDiameter();
      fetchDiameter().catch((err) => console.log(err));
    }
  }, [width, height]);

  useEffect(() => {
    const fetchHeight = async () => {
      const result = await axios.get(`tires/groups?width=${width}`);
      if (result && result.data) {
        const { height } = result.data;
        setHeights(() =>
          height.map((el) => ({
            value: el.name,
            label: el.name,
          }))
        );
      }
    };
    if (width) {
      setHeight();
      setDiameter();
      fetchHeight().catch((err) => console.log(err));
    }
  }, [width]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("tires/groups");
      if (result && result.data) {
        const { width } = result.data;
        setWidths(() =>
          width.map((el) => ({
            value: el.name,
            label: el.name,
          }))
        );
      }
    };
    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      {" "}
      <div className="search-inputs">
        <div className="row gy-2">
          <div className="col-md-3">
            <Select
              placeholder="Дугуйны өргөн"
              className="search-input"
              options={widths}
              onSelect={(value, event) => setWidth(value)}
            ></Select>
          </div>
          <div className="col-md-3">
            <Select
              placeholder="Хажуугийн хана"
              className="search-input"
              options={heights}
              value={height}
              disabled={heights.length <= 0 ? true : false}
              onSelect={(value) => setHeight(value)}
            ></Select>
          </div>
          <div className="col-md-3">
            <Select
              placeholder="Диаметр"
              className="search-input"
              disabled={diameters.length <= 0 ? true : false}
              options={diameters}
              value={diameter}
              onSelect={(value) => setDiameter(value)}
            ></Select>
          </div>
          <div className="col-md-3">
            <Button className="search-head-btn" onClick={() => handleSearch()}>
              Хайх
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TireSize;
