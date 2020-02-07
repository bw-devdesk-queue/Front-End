import React, { useState, useEffect } from "react";
import axios from "axios";

const DashPic = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    axios
      .get("https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY")
      .then(res => {
        setData(res.data);
        console.log(res.data, `data`);
      })
      .catch(error => {
        console.log("The data was not returned", error);
      });
  }, []);

  return (
    <div>
      {data.map(newData => (
        <div>
          <h1>{newData.caption}</h1>
        </div>
      ))}
    </div>
  );
};

export default DashPic;
