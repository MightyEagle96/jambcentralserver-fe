import React, { useState, useEffect } from "react";
import { getAllCenterApi } from "../redux/actions/centerActions";
import { httpService } from "../services/services";
import { errorAlert } from "../components/alerts";
import PageHelmet from "../utils/PageHelmet";
import Loader from "../components/elements/Loader";
import DataTable from "react-data-table-component";

const AllCentersPage = () => {
  const [testCenters, setTestCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Center Name",
      selector: "centerName",
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
      console.log(response);
      setTestCenters(response.jambCenters);
      setLoading(false);
    } catch (error) {
      errorAlert(error);
    }
  };

  useEffect(() => {
    GetAllCenters();
  }, []);

  return (
    <>
      <PageHelmet title="All Test Centers" />
      <div className="container">
        <div className="p-4">
          <div className="mt-3">
            <div className="h3 text-center">ALL TEST CENTERS</div>
            <div className="row">
              <div className="col-md-8">
                
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <DataTable
                  columns={columns}
                  data={testCenters}
                  highlightOnHover
                  pointerOnHover
                  progressPending={loading}
                  progressComponent={<Loader />}
                  pagination
                  paginationServer
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCentersPage;
