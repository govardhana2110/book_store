import React from "react";

const TableComponent = ({ data }) => {
  return (
    <div style={{ color: "black" }}>
      <table>
        <thead>
          <tr>
            {data && Object.keys(data[0]).map((key) => <td>{key}</td>)}
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              {Object.keys(item).map((keys) => (
                <td>{item[keys]}</td>
              ))}
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableComponent;
