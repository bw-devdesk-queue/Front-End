import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

const StudentTabs = () => {

  
  return (
    <div className="tabs">
      <Tabs>
        
        <TabPanels>
          <TabPanel>
            <h1>completed Tickets</h1>
          </TabPanel>
          <TabPanel>
            <h1>Non Completed Tickets</h1>
          </TabPanel>
          <TabPanel>
            <h1>create a ticket form!</h1>
          </TabPanel>
        </TabPanels><TabList>
          <Tab>completed Tickets</Tab>
          <Tab>Non Completed Tickets</Tab>
          <Tab >Create a Ticket</Tab>
        </TabList>
      </Tabs>
    </div>
  );
};

export default StudentTabs;
