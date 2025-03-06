import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Dashboard = () => {
  const [tabs, setTabs] = useState([
    { id: "0", name: "Tab 1", layout: [], active: true },
    { id: "1", name: "Tab 2", layout: [], active: false },
    { id: "2", name: "Tab 3", layout: [], active: false },
  ]);

  const [counter, setCounter] = useState(3);
  const [width] = useState(window.innerWidth);

  const addTab = () => {
    const newTab = {
      id: `${counter}`,
      name: `Tab ${counter + 1}`,
      layout: [],
      active: false,
    };
    setTabs([...tabs, newTab]);
    setCounter(counter + 1);
  };

  const switchTab = (id) => {
    setTabs(
      tabs.map((tab) => ({
        ...tab,
        active: tab.id === id,
      }))
    );
  };

  const addBox = (id) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === id
          ? {
              ...tab,
              layout: [
                ...tab.layout,
                {
                  i: `box-${tab.layout.length}`,
                  x: 0, // Set initial x to 0
                  y: 0, // Set initial y to 0
                  w: 1,
                  h: 1,
                },
              ],
            }
          : tab
      )
    );
  };

  const removeBox = (id, boxId) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === id
          ? { ...tab, layout: tab.layout.filter((box) => box.i !== boxId) }
          : tab
      )
    );
  };

  const activeTab = tabs.find((tab) => tab.active);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      {/* Tab Bar */}
      <div className="flex space-x-2 bg-gray-300 p-2 overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`p-2 cursor-pointer rounded ${
              tab.active ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => switchTab(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Add Tab Button */}
      <button
        className="p-2 m-2 bg-red text-white rounded self-start" style={{ background: "blue" }}
        onClick={addTab}
      >
        + Add Tab
      </button>

      {/* Tab Content */}
      <div className="flex-grow p-4">
        {activeTab && activeTab.id === "0" ? (
          <>
            <button
              className="mb-4 p-2  text-white rounded"
              style={{ background: "blue" }}
              onClick={() => addBox(activeTab.id)}
            >
              Add Box
            </button>
            <div style={{ maxWidth: "90vw" }}>
              <GridLayout
                className="layout"
                layout={activeTab?.layout || []}
                cols={3}
                rowHeight={window.innerHeight / 3}
                width={width * 0.9}
                draggableHandle=".drag-handle"
                isResizable={true}
                compactType="horizontal" // Enable horizontal compaction
                onLayoutChange={(newLayout) =>
                  setTabs(
                    tabs.map((tab) =>
                      tab.id === activeTab.id
                        ? { ...tab, layout: newLayout }
                        : tab
                    )
                  )
                }
              >
                {activeTab?.layout.map((box) => (
                  <div
                    key={box.i}
                    className="bg-white border rounded shadow p-2 relative"
                  >
                    <div className="drag-handle cursor-move p-1 text-center">
                      Drag Me
                    </div>
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded"
                      onClick={() => removeBox(activeTab.id, box.i)}
                    >
                      X
                    </button>
                    Box {box.i}
                  </div>
                ))}
              </GridLayout>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-lg font-semibold bg-white shadow rounded">
            {activeTab?.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;