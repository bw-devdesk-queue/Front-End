import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

const AdminTabs = () => {
  return (
    <div className="a-tabs">
      <Tabs>
        <TabList>
          <Tab>Unassigned Tickets</Tab>
          <Tab>My Open Tickets</Tab>
          <Tab>Administrator</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Take Ownership of a Ticket</p>
          </TabPanel>
          <TabPanel>
            <p>Follow up on these Tickets</p>
          </TabPanel>
          <TabPanel>
            <p>Admins Only</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AdminTabs;
