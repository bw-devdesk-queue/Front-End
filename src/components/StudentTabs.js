import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

const StudentTabs = () => {
  return (
    <div className="tabs">
      <Tabs>
        <TabList>
          <Tab>Trouble Tickets</Tab>
          <Tab>Create a Ticket</Tab>
          <Tab>Student Portal</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>List of Tickets!</p>
          </TabPanel>
          <TabPanel>
            <p>create a ticket form!</p>
          </TabPanel>
          <TabPanel>
            <p>Students</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default StudentTabs;
