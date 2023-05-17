import React, { Fragment, useEffect, useState } from "react";


const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

   async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });
     

      const parseRes = await response.json();
      
      console.log(parseRes)


    } catch (err) {
      console.error(err.message);
    }
  };

 

  useEffect(() => {
    getName();
  });

  return (
    <Fragment>
      <h1 className="mt-5">Dashboard</h1>
     
    </Fragment>
  );
};

export default Dashboard;