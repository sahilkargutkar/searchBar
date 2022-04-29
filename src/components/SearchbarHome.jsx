import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import TabPanel from "./TabPanel";

const SearchbarHome = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openTab, setOpenTab] = useState(false);

  const [bookRoomData, setBookRoomData] = useState([
    { rooms: 1, adults: 0, children: 0 },
  ]);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (index, event) => {
    const values = [...bookRoomData];
    if (event.target.name === "rooms") {
      values[index].rooms = event.target.value + 1;
    } else if (event.target.name === "adults" && event.target.value > 0) {
      values[index].adults = event.target.value;
    } else if (event.target.name === "children" && event.target.value > 0) {
      values[index].children = event.target.value;
    }

    setBookRoomData(values);
  };

  return (
    <div>
      <div class="sm:flex items-center bg-white  overflow-hidden px-2 py-1 justify-between">
        <input
          class="text-base text-gray-400 flex-grow outline-none px-2 "
          type="text"
          placeholder="Enter your destination"
        />
        {openDate ? (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
            className="absolute top-60"
          />
        ) : (
          <></>
        )}

        <div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
          <span
            className="cursor-pointer"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(date[0].startDate, "MMM dd")} - ${format(
              date[0].endDate,
              "MMM dd"
            )}`}
          </span>

          <span onClick={() => setOpenTab(!openTab)}>Open Tab </span>

          {openTab ? (
            <span className="absolute top-60">
              <TabPanel />
            </span>
          ) : (
            <></>
          )}
          {bookRoomData.map((data, i) => {
            return (
              <span
                value={data.rooms}
                onChange={(event) => handleChange(i, event)}
              ></span>
            );
          })}
          <button class="bg-red-500 text-white text-base px-4 py-2 font-thin">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchbarHome;
