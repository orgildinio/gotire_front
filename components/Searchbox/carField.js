import { Button, Select } from "antd";
import axios from "axios";
import { toastControl } from "lib/toastControl";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CarField = ({ searchPath }) => {
  const [makes, setMakes] = useState([]);
  const [years, setYears] = useState([]);
  const [models, setModels] = useState([]);
  const [options, setOptions] = useState([]);
  const [make, setMake] = useState(null);
  const [year, setYear] = useState(null);
  const [model, setModel] = useState(null);
  const [option, setOption] = useState(null);

  const router = useRouter();

  const handleSearch = () => {
    if (make && model && year && option) {
      router.push(
        `/${searchPath}?carmake=${make}&carmodel=${model}&caryear=${year}&caroption=${option}`
      );
    } else {
      toastControl("error", "Талбаруудыг сонгоно уу");
    }
  };

  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     const result = await axios.get(
  //       `https://api.wheel-size.com/v2/modifications/?make=${make}&model=${model}&year=${year}&user_key=5c53c728656ad6ab73949f3ff71230c8`
  //     );
  //     if (result && result.data) {
  //       const { data } = result.data;
  //       setOptions(() =>
  //         data.map((el) => ({
  //           value: el.slug,
  //           label: el.name,
  //         }))
  //       );
  //     }
  //   };
  //   if (make && model && year) {
  //     setOption();
  //     fetchOptions().catch((err) => console.log(err));
  //   }
  // }, [make, model, year]);

  // useEffect(() => {
  //   const fetchYears = async () => {
  //     const result = await axios.get(
  //       `https://api.wheel-size.com/v2/years/?make=${make}&model=${model}&user_key=5c53c728656ad6ab73949f3ff71230c8`
  //     );
  //     if (result && result.data) {
  //       const { data } = result.data;
  //       setYears(() =>
  //         data.map((el) => ({
  //           value: el.slug,
  //           label: el.name,
  //         }))
  //       );
  //     }
  //   };
  //   if (make && model) {
  //     setYear();
  //     setOption();
  //     fetchYears().catch((err) => console.log(err));
  //   }
  // }, [make, model]);

  // useEffect(() => {
  //   const fetchModels = async () => {
  //     const result = await axios.get(
  //       `https://api.wheel-size.com/v2/models/?make=${make}&user_key=5c53c728656ad6ab73949f3ff71230c8`
  //     );
  //     if (result && result.data) {
  //       const { data } = result.data;
  //       setModels(() =>
  //         data.map((el) => ({
  //           value: el.slug,
  //           label: el.name,
  //         }))
  //       );
  //     }
  //   };
  //   if (make) {
  //     setModel();
  //     setYear();
  //     setOption();
  //     fetchModels().catch((err) => console.log(err));
  //   }
  // }, [make]);

  // useEffect(() => {
  //   const fetchMakes = async () => {
  //     const result = await axios.get(
  //       `https://api.wheel-size.com/v2/makes/?user_key=5c53c728656ad6ab73949f3ff71230c8`
  //     );
  //     if (result && result.data) {
  //       const { data } = result.data;
  //       setMakes(() =>
  //         data.map((el) => ({
  //           value: el.slug,
  //           label: (
  //             <>
  //               <img src={el.logo} className="search-make-img" /> {el.name}
  //             </>
  //           ),
  //         }))
  //       );
  //     }
  //   };
  //   setYear();
  //   setModel();
  //   setOption();
  //   fetchMakes().catch((err) => console.log(err));
  // }, []);

  return (
    <>
      {" "}
      <div className="search-inputs">
        <div className="row gy-2">
          <div className="col-md-3">
            <Select
              showSearch
              placeholder="Үйлдвэрлэгч"
              className="search-input"
              options={makes}
              onSelect={(value, event) => setMake(value)}
            ></Select>
          </div>
          <div className="col-md-3">
            <Select
              showSearch
              placeholder="Машины загвар"
              className="search-input"
              options={models}
              value={model}
              disabled={models.length <= 0 ? true : false}
              onSelect={(value) => setModel(value)}
            ></Select>
          </div>
          <div className="col-md-3">
            <Select
              showSearch
              placeholder="Үйлдвэрлэгдсэн огноо"
              className="search-input"
              disabled={years.length <= 0 ? true : false}
              options={years}
              value={year}
              onSelect={(value) => setYear(value)}
            ></Select>
          </div>

          <div className="col-md-2">
            <Select
              showSearch
              placeholder="Нэмэлт тодруулга"
              className="search-input"
              disabled={options.length <= 0 ? true : false}
              options={options}
              value={option}
              onSelect={(value) => setOption(value)}
            ></Select>
          </div>

          <div className="col-md-1">
            <Button className="search-head-btn" onClick={() => handleSearch()}>
              Хайх
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarField;
