import React, { useState } from 'react';
import './AppointmentTable.css';

const AppointmentTable = ({ appointments, handleTermSelection }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleHourClick = (date, hour) => {
    setSelectedDateTime({ date, hour });
    handleTermSelection(date, hour);
  };

  return (
    <div>
      <table className="appointment-table">
        <tbody>
          {Array.from(appointments).map(([date, hours]) => (
            <tr key={date}>
              <td className="date-column">{date}</td>
              <td className="hours-column">
                <div className="button-container">
                  {hours.map((hour) => {
                    const isSelected =
                      selectedDateTime &&
                      selectedDateTime.date === date &&
                      selectedDateTime.hour === hour;

                    return (
                      <button
                        key={hour}
                        className={`hour-button ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleHourClick(date, hour)}
                        disabled={isSelected}
                      >
                        {hour}
                      </button>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
