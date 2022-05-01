import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
// import TabPanel from "./TabPanel";
import TabPanelComponent from "./TabPanelComponent";
import axios from "axios";

const SearchbarHome = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openTab, setOpenTab] = useState(false);
  const [tabs, setTabs] = useState(["Room 1"]);
  const [newAdult, setNewAdult] = useState(1);
  const [childrenArray, setChildrenArray] = useState([]);
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "MYR"
  );
  const [nationality, setNationality] = useState(
    localStorage.getItem("nationality") || "MY"
  );
  const [countryCode, setCountyCode] = useState(
    localStorage.getItem("country") || "  MY"
  );
  // const [destCountryCode, setDestCountyCode] = useState(
  //   localStorage.getItem("destinationcountry") || "  MY"
  // );
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [outputValue, setOutputValue] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://autosuggest.prod.zentrumhub.com/api/locations/locationcontent/autosuggest?size=30&term=${searchInput}`
      );
      setAPIData(data);
      // console.log("APi Data")
      setOutputValue([]);
      APIData.locationSuggestions.filter((val) => {
        if (val.name.toLowerCase().includes(searchInput.toLowerCase())) {
          setOutputValue((outputValue) => [...outputValue, val]);
        }
        // return outputValue
      });
    };
    fetchData();

    // console.log(outputValue, "searchInput");
  }, [searchInput, APIData, outputValue]);

  const handleSubmit = () => {
    console.log("coordinates", filteredResults);
    console.log("date", date[0].startDate);
    //yyyy-MM-DD[T]HH:mm:ssZZ
    const obj = {
      checkIn: `${format(date[0].startDate, "yyyy-MM-dd")}T00:00:00.000Z`,
      checkOut: `${format(date[0].endDate, "yyyy-MM-dd")}T00:00:00.000Z`,
      currency: currency,
      occupancies: [{ numOfAdults: newAdult, childAges: childrenArray.length }],
      circularRegion: {
        centerLat: filteredResults.coordinates.lat,
        centerLong: filteredResults.coordinates.long,
        radiusInKm: 50,
      },
      nationality: nationality,
      countryOfResidence: countryCode,
      destinationCountryCode: filteredResults.country,
    };

    console.log("obj", obj);
  };

  return (
    <div>
      <div class="sm:flex items-center bg-white  overflow-hidden px-2 py-1 justify-between">
        <input
          class="text-base text-gray-400 flex-grow outline-none px-2 "
          type="search"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          placeholder="Enter your destination"
        />
        <span className="absolute top-60 bg-white text-black">
          {outputValue === "null" ? (
            <></>
          ) : (
            outputValue.map((item) => {
              // console.log(outputValue, "outputValue");

              return (
                <>
                  <p
                    onClick={(e) => {
                      setSearchInput(item.name);
                      setFilteredResults(item);
                    }}
                  >
                    {item.name}
                  </p>
                </>
              );
            })
          )}
        </span>

        {openDate ? (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
            className="absolute top-60"
            onFocusChange={(focusedInput) => {
              // Do not apply if it is null
              console.log("focusedInpput", focusedInput);

              if (focusedInput) {
                this.setState({ focusedInput });
              }
            }}
          />
        ) : (
          <></>
        )}

        <div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
          <span
            className="cursor-pointer"
            onClick={() => {
              setOpenDate(!openDate);
              setOpenTab(false);
            }}
          >
            {`${format(date[0].startDate, "MMM dd")} - ${format(
              date[0].endDate,
              "MMM dd"
            )}`}
          </span>

          <span
            className="cursor-pointer"
            onClick={() => {
              setOpenTab(!openTab);
              setOpenDate(false);
            }}
          >
            Rooms:{tabs.length} Adults:{newAdult} Children
            {childrenArray.length}
          </span>

          {openTab ? (
            <span className="absolute top-60 bg-white">
              <TabPanelComponent
                tabs={tabs}
                setTabs={setTabs}
                newAdult={newAdult}
                setNewAdult={setNewAdult}
                childrenArray={childrenArray}
                setChildrenArray={setChildrenArray}
              />
            </span>
          ) : (
            <></>
          )}
          {/* {bookRoomData.map((data, i) => {
            return (
              <span
                value={data.rooms}
                onChange={(event) => handleChange(i, event)}
              ></span>
            );
          })} */}
          <button
            onClick={handleSubmit}
            class="bg-red-500 text-white text-base px-4 py-2 font-thin"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchbarHome;
