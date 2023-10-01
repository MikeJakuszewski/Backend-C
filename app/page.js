"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [listOfOrders, setListOfOrders] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios("/api/orders");
        setData(response.data.teamDataList);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function getNextDate(dateString) {
    let months = {
      9: "September",
      10: "October",
    };

    let givenDate = new Date(dateString);
    givenDate.setDate(givenDate.getDate() + 1);

    let year = givenDate.getFullYear();
    let month = givenDate.getMonth() + 1;
    let day = givenDate.getDate();

    return `${months[month]} ${day}, ${year}`;
  }

  const getPickingList = (orderData) => {
    const { packingTeam, pickingTeam } = orderData;
    setListOfOrders(
      <div>
        <div className="ml-2">
          <span className=" text-red-600 font-semibold text-[25px]">
            List for the packing team
          </span>
          <div className="ml-5">
            <div>
              <span className=" font-semibold"> Order Date : </span>
              {packingTeam.orderDate}{" "}
            </div>
            <div>
              <span className="font-semibold">Line Items : </span>
              {packingTeam.lineItems.map((lineItem) => {
                return (
                  <div className="ml-5" key={lineItem.lineItemId}>
                    {lineItem.lineItem}{" "}
                    <div className="ml-5">
                      {lineItem.subItems.map((subItem, i) => {
                        return <div key={i}>-{subItem}</div>;
                      })}
                    </div>{" "}
                  </div>
                );
              })}{" "}
            </div>
            <div>
              <span className="font-semibold">Ships to : </span>
              <div className="ml-2">-{packingTeam.customerName} </div>
              <div className="ml-2">-{packingTeam.shippingAddress}</div>
            </div>
          </div>
        </div>
        <div className="ml-2">
          <span className=" text-red-600 font-semibold text-[25px] ">
            List of the picking team
          </span>
          <div className="ml-5">
            <div>
              <span className="font-semibold">Items : </span>
              {pickingTeam.lineItems.map((lineItem, i) => {
                return (
                  <div key={i}>
                    {lineItem.subItems.map((subItem, i) => {
                      return (
                        <div key={i}>
                          - {lineItem.quantity} {subItem}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  console.log(data);

  return (
    <div>
      {data.map((orderData, index) => {
        let previousDate = getNextDate(orderData.packingTeam.orderDate);
        return (
          <div key={index}>
            <button
              onClick={() => getPickingList(orderData)}
              className="bg-green-500 p-3 m-2"
            >
              Generate Order List for{" "}
              <span className="font-semibold"> {previousDate} </span> from
              orders placed on{" "}
              <span className="font-semibold">
                {" "}
                {orderData.packingTeam.orderDate}{" "}
              </span>
            </button>
          </div>
        );
      })}
      {listOfOrders}
    </div>
  );
}
