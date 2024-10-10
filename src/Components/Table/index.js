import React from "react";
import "./table.css";

const TableComponent = ({ data, editClick, deleteClick }) => {
  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => {
                if (
                  key !== "rating" &&
                  key !== "totalRatings" &&
                  key !== "imageUrl"
                ) {
                  return (
                    <th key={key}>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </th>
                  );
                }
                if (key === "imageUrl") {
                  return <th key="Image">Image</th>;
                }
                return null;
              })}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item, index) => (
              <tr key={`${index}_${item.bookName}`}>
                {Object.keys(item).map((key) => {
                  if (key !== "rating" && key !== "totalRatings") {
                    return (
                      <td className="truncate" key={item[key]}>
                        {key === "imageUrl" ? (
                          <img
                            src={`${process.env.REACT_APP_JSON_URL}${item[key]}`}
                            alt="#"
                            width={50}
                            height={50}
                          />
                        ) : (
                          item[key]
                        )}
                      </td>
                    );
                  }
                  return null;
                })}
                <td style={{ display: "flex", gap: "1rem" }}>
                  <button onClick={() => editClick(index)}>Edit</button>
                  <button onClick={() => deleteClick(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
