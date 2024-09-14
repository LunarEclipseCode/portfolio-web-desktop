import React, { useEffect } from "react";

export default function NumWorks() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.numworks.com/simulator/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="h-full w-full bg-ub-cool-grey" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <iframe src="https://www.numworks.com/simulator/embed/" width="100%" height="100%" bg="#111111" frameBorder="0" title="NumWorks" style={{ border: "none" }}></iframe>
    </div>
  );
}

export const displayNumWorks = () => {
  return <NumWorks />;
};
