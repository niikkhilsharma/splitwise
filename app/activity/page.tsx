import React from "react";

const ActivityPage = () => {
  return (
    <div className="h-[90%] p-4">
      <h2 className="text-2xl font-medium text-gray-600">Activity</h2>
      <div className="flex h-full w-full items-center justify-center text-center text-lg tracking-wide">
        Their is no activity in your account yet. <br />
        Try adding an expense!
      </div>
    </div>
  );
};

export default ActivityPage;
