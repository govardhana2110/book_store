import React from "react";
import "./table.css";

const TableComponent = ({ data }) => {
  return (
    <table className="responsive-table">
      <thead>
        <tr>
          {data && Object.keys(data[0]).map((key) => <td key={key}>{key}</td>)}
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item,index) => (
          <tr key={index}>
            {Object.keys(item).map((keys) => (
              <td className="truncate" key={item[keys]}>
                {keys === "image" ? (
                  <img src={item[keys]} alt="#" width={50} height={50}></img>
                ) : (
                  item[keys]
                )}
              </td>
            ))}
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TableComponent;
