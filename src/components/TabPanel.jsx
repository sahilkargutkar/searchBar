import React, { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabPanel = () => {
  const [tabs, setTabs] = useState([]);
  const [newAdult, setNewAdult] = useState(1);
  const [createNewChild, setCreateNewChild] = useState(0);

  const [panel, setPanel] = useState([]);
  const [tabIndex, setTabIndex] = useState(2);

  const createNewTab = () => {
    const newTab = {
      value: `${tabIndex}`,
      label: `Room ${tabIndex}`,
    };

    setTabs([...tabs, newTab]);

    setPanel([
      ...panel,
      {
        value: `${tabIndex}`,
        child: () => (
          <div key={tabIndex}>
            <div>
              Adults: <button>-</button>
              {newAdult}{" "}
              <button onClick={() => setNewAdult(newAdult + 1)}>+</button>
            </div>
            <div>
              Child :<button>-</button>
              {createNewChild} <button>+</button>
            </div>
          </div>
        ),
      },
    ]);

    setTabIndex(tabIndex + 1);
  };

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group onChange={(index) => {}}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full px-4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Room 1
          </Tab>

          {tabs.map((category) => (
            <Tab
              key={category.value}
              className={({ selected }) =>
                classNames(
                  "w-full px-4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category.label}
            </Tab>
          ))}
          <Tab>
            <button className="bg-white shadow" onClick={createNewTab}>
              +
            </button>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          {panel.map((people) => (
            <Tab.Panel
              key={people.value}
              className={classNames(
                "rounded-xl bg-white p-3",
                "focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2"
              )}
            >
              {panel.child}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabPanel;
