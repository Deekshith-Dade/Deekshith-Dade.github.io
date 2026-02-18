"use client";

import { useEffect, useState } from "react";

export default function ClientDate({ date }) {
  const [formattedDate, setFormattedDate] = useState(null);
  
  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }));
  }, [date]);
  
  if (!formattedDate) {
    return <span>{date}</span>; // Fallback to raw date string during SSR
  }
  
  return <span>{formattedDate}</span>;
}
