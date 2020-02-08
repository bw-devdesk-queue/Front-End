import React from "react";
import { Tabs, TabList, Tab } from "@reach/tabs";

const AdminTabs = () => {
  return (
    <div className="a-tabs">
      <Tabs>
        <TabList>
          <Tab>Unassigned Tickets</Tab>
          <Tab>My Open Tickets</Tab>
        </TabList>
      </Tabs>
    </div>
  );
};

export default AdminTabs;
