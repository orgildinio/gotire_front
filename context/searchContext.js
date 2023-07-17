"use client";
import axios from "axios";
import { getSearch, getTires } from "lib/tire";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNotificationContext } from "./notificationContext";

const searchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [car, setCar] = useState(null);
  const [querys, setQuerys] = useState(null);
  const [search, setSearch] = useState(null);
  const [tires, setTires] = useState([]);
  const [paginate, setPaginate] = useState(null);
  const searchParams = useSearchParams();
  const { setContentLoad } = useNotificationContext();
  const [wheelsize, setWheelsize] = useState(null);
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const removeQuery = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const buildQuerys = () => {
    let query = "";
    let fields = [];

    const searchFields = [
      "make",
      "tiresize",
      "use",
      "season",
      "setof",
      "minprice",
      "maxprice",
      "sort",
    ];

    searchFields.map((field) => {
      if (searchParams.get(field)) {
        query += `${field}=${searchParams.get(field)}&`;
        if (
          searchParams.get(field) &&
          searchParams.get(field).split(",").length > 0
        ) {
          searchParams
            .get(field)
            .split(",")
            .map((el) => fields.push({ name: field, data: el }));
        }
      } else {
        query += `${field}=&`;
      }
    });

    setQuerys(fields);
    return query;
  };

  useEffect(() => {
    setContentLoad(true);
    const fetchDatas = async () => {
      const qrys = buildQuerys();
      setQuerys(qrys);
      const { search: result } = await getSearch(qrys);
      const { tires, pagination } = await getTires(qrys);
      setSearch(result);
      setTires(tires);
      setPaginate(pagination);
      setContentLoad(false);
    };

    // setCar({
    //   slug: "b19de9dd40",
    //   name: "1.8 VVT-i (ZRE152N)",
    //   body: "ZRE152N",
    //   trim: "1.8 VVT-i",
    //   trim_scoring: null,
    //   trim_attributes: [],
    //   trim_body_types: [],
    //   trim_levels: [],
    //   make: {
    //     slug: "toyota",
    //     name: "Toyota",
    //     name_en: "Toyota",
    //   },
    //   model: {
    //     slug: "corolla-rumion",
    //     name: "Corolla Rumion",
    //     name_en: "Corolla Rumion",
    //   },
    //   generation: {
    //     slug: "14491b756b",
    //     name: "",
    //     platform: "",
    //     start: 2007,
    //     end: 2015,
    //     bodies: [
    //       {
    //         slug: "1cc8a8ea51",
    //         name: "Estate, 5d (E150)",
    //         image:
    //           "https://cdn.wheel-size.com/automobile/body/toyota-corolla-rumion-2007-2015-1470303739.57.jpg",
    //       },
    //     ],
    //   },
    //   start_year: 2009,
    //   end_year: 2012,
    //   engine: {
    //     fuel: "Petrol",
    //     capacity: null,
    //     type: "I4",
    //     power: {
    //       kW: 106,
    //       PS: 144,
    //       hp: 142,
    //     },
    //     code: null,
    //   },
    //   regions: ["jdm"],
    //   technical: {
    //     wheel_fasteners: {
    //       type: "Lug nuts",
    //       thread_size: "M12 x 1.5",
    //     },
    //     wheel_tightening_torque: null,
    //     stud_holes: 5,
    //     pcd: 114.3,
    //     centre_bore: "60.1",
    //     bolt_pattern: "5x114.3",
    //     rear_axis_stud_holes: null,
    //     rear_axis_pcd: null,
    //     rear_axis_centre_bore: null,
    //     rear_axis_bolt_pattern: "N/A",
    //   },
    //   tire_type: "Passenger",
    //   wheels: [
    //     {
    //       is_stock: true,
    //       showing_fp_only: true,
    //       is_recommended_for_winter: false,
    //       is_runflat_tires: false,
    //       is_pressed_steel_rims: false,
    //       front: {
    //         tire_pressure: null,
    //         rim: "6Jx15 ET39",
    //         rim_diameter: 15,
    //         rim_width: 6,
    //         rim_offset: 39,
    //         tire: "195/65R15",
    //         tire_sizing_system: "metric",
    //         tire_construction: "R",
    //         tire_width: 195,
    //         tire_aspect_ratio: 65,
    //         tire_diameter: null,
    //         tire_section_width: null,
    //         tire_is_82series: false,
    //         load_index: null,
    //         speed_index: null,
    //       },
    //       rear: {
    //         tire_pressure: null,
    //         rim: "",
    //         rim_diameter: null,
    //         rim_width: null,
    //         rim_offset: null,
    //         tire: "",
    //         tire_sizing_system: null,
    //         tire_construction: null,
    //         tire_width: null,
    //         tire_aspect_ratio: null,
    //         tire_diameter: null,
    //         tire_section_width: null,
    //         tire_is_82series: false,
    //         load_index: null,
    //         speed_index: null,
    //       },
    //     },
    //     {
    //       is_stock: true,
    //       showing_fp_only: true,
    //       is_recommended_for_winter: false,
    //       is_runflat_tires: false,
    //       is_pressed_steel_rims: false,
    //       front: {
    //         tire_pressure: null,
    //         rim: "6.5Jx16 ET45",
    //         rim_diameter: 16,
    //         rim_width: 6.5,
    //         rim_offset: 45,
    //         tire: "205/55R16",
    //         tire_sizing_system: "metric",
    //         tire_construction: "R",
    //         tire_width: 205,
    //         tire_aspect_ratio: 55,
    //         tire_diameter: null,
    //         tire_section_width: null,
    //         tire_is_82series: false,
    //         load_index: null,
    //         speed_index: null,
    //       },
    //       rear: {
    //         tire_pressure: null,
    //         rim: "",
    //         rim_diameter: null,
    //         rim_width: null,
    //         rim_offset: null,
    //         tire: "",
    //         tire_sizing_system: "metric",
    //         tire_construction: "R",
    //         tire_width: null,
    //         tire_aspect_ratio: null,
    //         tire_diameter: null,
    //         tire_section_width: null,
    //         tire_is_82series: false,
    //         load_index: null,
    //         speed_index: null,
    //       },
    //     },
    //   ],
    // });

    fetchDatas().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let query = "";
    let fields = [];

    const searchFields = [
      "make",
      "tiresize",
      "use",
      "season",
      "setof",
      "minprice",
      "maxprice",
      "sort",
    ];

    searchFields.map((field) => {
      if (searchParams.get(field)) {
        query += `${field}=${searchParams.get(field)}&`;
        if (
          searchParams.get(field) &&
          searchParams.get(field).split(",").length > 0
        ) {
          searchParams
            .get(field)
            .split(",")
            .map((el) => fields.push({ name: field, data: el }));
        }
      } else {
        query += `${field}=&`;
      }
    });

    const fetchData = async (qrys) => {
      setContentLoad(true);
      const { search: result } = await getSearch(qrys);
      const { tires, pagination } = await getTires(qrys);
      setSearch(result);
      setTires(tires);
      setPaginate(pagination);
      setContentLoad(false);
    };

    if (query != "") {
      setQuerys(fields);
      fetchData(query).catch((err) => console.log(err));
    }
  }, [searchParams]);

  useEffect(() => {
    let query = "";
    const fields = ["carmake", "carmodel", "caryear", "caroption"];

    fields.map((field) => {
      const data = searchParams.get(field);
      if (field === "carmake") query += `make=${data}&`;
      if (field === "carmodel") query += `model=${data}&`;
      if (field === "caryear") query += `year=${data}&`;
      if (field === "caroption") query += `modification=${data}&`;
    });
    query += `user_key=5c53c728656ad6ab73949f3ff71230c8`;

    const fetchData = async () => {
      const result = await axios.get(
        `https://api.wheel-size.com/v2/search/by_model/?${query}`
      );
        console.log(result)
      if (result) {
        const carData = result.data.data;

        setCar(carData[0]);

        let wheels = carData[0].wheels;
        carData[0].map((car) => {
          wheels = [...car.wheels];
        });

        if (wheels && wheels.length > 0) {
          let tiresizes = "";

          wheels.map((wheel) => {
            tiresizes += wheel.front.tire + ",";
          });
          setWheelsize(tiresizes.slice(0, -1));
        }
      }
    };

    if (query || query !== "user_key=5c53c728656ad6ab73949f3ff71230c8") {
      fetchData().catch(err => console.log(err));
    }
  }, [searchParams]);

  return (
    <searchContext.Provider
      value={{
        car,
        querys,
        search,
        setCar,
        setQuerys,
        setSearch,
        tires,
        paginate,
        removeQuery,
        createQueryString,
        buildQuerys,
        setTires,
        setPaginate,
        wheelsize,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export const useSearchContext = () => useContext(searchContext);
