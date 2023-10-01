"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios("/api/orders");

      console.log(response.data);
    }
    fetchData();
  }, []);

  return <div>test</div>;
}
