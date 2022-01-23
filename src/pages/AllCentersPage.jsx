import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import { errorAlert } from "../components/alerts";
import Loader from "../components/elements/Loader";
import { getAllCenterApi } from "../redux/actions/centerActions";
import PageHelmet from "../utils/PageHelmet";
import CenterDetail from "./Center/CenterDetail";

const AllCentersPage = () => {
  const history = useHistory();
  const [testCenters, setTestCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState({});

  const columns = [
    {
      name: "Center Name",
      selector: (row) => row.centerName,
      sortable: true,
      // grow: 1,
    },
    {
      name: "Reference No.",
      selector: "referenceNumber",
      sortable: true,
    },
    {
      name: "Address",
      selector: "address",
      sortable: true,
    },
    {
      name: "LGA",
      selector: "localGovernmentArea",
      sortable: true,
    },
    {
      name: "State",
      selector: "state",
      sortable: true,
    },
    {
      name: "Center Admin",
      selector: "centerAdministrator",
      sortable: true,
    },
    {
      name: "Center Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Center Phone",
      selector: "phoneNumber",
      sortable: true,
    },
  ];

  const GetAllCenters = async () => {
    setLoading(true);
    try {
      const response = await getAllCenterApi();
      setTestCenters(response.jambCenters);
      setLoading(false);
    } catch (error) {
      errorAlert(error);
    }
  };

  const viewCenterDetail = (row) => {
    history.push(`/viewCenter/${row._id}/`);
  };

  useEffect(() => {
    GetAllCenters();
  }, []);

  return (
    <>
      <PageHelmet title="All Test Centers" />
      <div className="container py-4">
        {/* <div className="h3 text-center">ALL TEST CENTERS</div> */}

        {/* Serach Functionality */}
        {/* <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4"></div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            <DataTable
              title="All Test Centers"
              columns={columns}
              data={testCenters}
              highlightOnHover
              pointerOnHover
              progressPending={loading}
              progressComponent={<Loader />}
              pagination
              paginationServer
              onRowClicked={viewCenterDetail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCentersPage;
