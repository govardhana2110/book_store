import React from "react";
import "./table.css";

const TableComponent = ({ data, editClick, deleteClick }) => {
  return (
    <table className="responsive-table">
      <thead>
        <tr>
          {data.length &&
            Object.keys(data[0]).map((key) => <td key={key}>{key}</td>)}
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {data.length &&
          data.map((item, index) => (
            <tr key={`${index}_${item.bookName}`}>
              {Object.keys(item).map((keys) => (
                <td className="truncate" key={item[keys]}>
                  {keys === "image" ? (
                    <img src={item[keys]} alt="#" width={50} height={50}></img>
                  ) : (
                    item[keys]
                  )}
                </td>
              ))}
              <td
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                <button onClick={() => editClick(index)}>Edit</button>
                <button onClick={() => deleteClick(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default TableComponent;
