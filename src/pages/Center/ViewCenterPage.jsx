import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { httpService } from "../../services/services";

export default function ViewCenterPage() {
  console.log(useParams());
  const [jambCenter, setJambCenter] = useState({});

  const { id } = useParams();

  async function GetCenter() {
    const path = `getCenters/${id}`;
    const res = await httpService.get(path);
    if (res) {
      console.log(res.data);
      setJambCenter(res.data.jambCenter);
    }
  }

  useEffect(() => {
    GetCenter();
  }, []);
  return (
    <div>
      <div className="p-3">
        <div className="h2">{jambCenter.centerName}</div>
      </div>
    </div>
  );
}
