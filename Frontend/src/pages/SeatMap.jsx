import React, { useState, useEffect, useMemo } from 'react';
import { Zap, Info } from 'lucide-react';

const SeatSelection = ({ theatreLayout, seats, onSeatSelect }) => {
  const { totalRows, seatsPerRow, categories, aisles, disabledSeats } = theatreLayout;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [viewMode, setViewMode] = useState('desktop');
  const [showLegend, setShowLegend] = useState(false);
  console.log("Seats from seatmap :");
  console.log(seats);

  const generateSeatMap = () => {
    let seatMap = [];
    let rowLabels = {};
    // Assign row labels from top to bottom
    categories.forEach(category => {
      for (let i = category.rowsRange.start; i <= category.rowsRange.end; i++) {
        rowLabels[i] = { name: category.name, price: category.basePrice };
      }
    });

    // Generate seat structure (from back row to front row for traditional layout)
    for (let row = 1; row <= totalRows; row++) {
      // Check if this is an aisle row
      if (aisles.rows.includes(row)) {
        seatMap.push({ isAisleRow: true, rowNumber: row });
        continue;
      }

      let rowSeats = [];
      for (let col = 1; col <= seatsPerRow; col++) {
        // Check if this position is an aisle column
        if (aisles.columns.includes(col)) {
          rowSeats.push({ isAisleColumn: true, column: col });
          continue;
        }

        const seatNumber = `${String.fromCharCode(64 + row)}${col}`;
        // const status = seats.filter(seat => seat.seatNumber == seatNumber)[0].status;
        // console.log(status);

        const seatMapByNumber = useMemo(() => {
          const map = {};
          seats.forEach(seat => {
            map[seat.seatNumber] = seat;
          });
          return map;
        }, [seats]);

        // const seat = seats.filter(seat => seat.seatNumber == seatNumber)[0];
        const seat = seatMapByNumber[seatNumber];
        rowSeats.push({
          seatNumber,
          row: String.fromCharCode(64 + row),
          rowNumber: row,
          column: col,
          // category: rowLabels[row]?.name || 'STANDARD',
          category: seat.category,
          // price: rowLabels[row]?.price || 100,
          price: seat.price || 100,
          // status: status
          status: seat.status
        });
      }
      seatMap.push(rowSeats);
    }
    return seatMap;
  };

  const seatMap = generateSeatMap();
  // console.log(seatMap);

  const handleSeatClick = (seat) => {
    if (seat.status === 'DISABLED') return;

    setSelectedSeats((prevSelectedSeats) => {
      return prevSelectedSeats.includes(seat.seatNumber)
        ? prevSelectedSeats.filter((s) => s !== seat.seatNumber)
        : [...prevSelectedSeats, seat.seatNumber];
    });
  };

  // Use useEffect to update the parent component after state updates
  useEffect(() => {
    const selectedSeatDetails = selectedSeats.map(seatNum => {
      for (const row of seatMap) {
        if (Array.isArray(row)) {
          const seat = row.find(s => s.seatNumber === seatNum);
          if (seat) return seat;
        }
      }
      return null;
    }).filter(Boolean);

    onSeatSelect(selectedSeatDetails);
  }, [selectedSeats]); // Runs whenever selectedSeats changes



  const getCategoryStyle = (category) => {
    switch (category) {
      case 'VIP': return { bgClass: 'bg-danger', textClass: 'text-white', borderClass: 'border-danger' };
      case 'PREMIUM': return { bgClass: 'bg-warning', textClass: 'text-dark', borderClass: 'border-warning' };
      case 'STANDARD': return { bgClass: 'bg-info', textClass: 'text-white', borderClass: 'border-info' };
      default: return { bgClass: 'bg-secondary', textClass: 'text-white', borderClass: 'border-secondary' };
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        {/* <h2 className="mb-3">Select seats !</h2> */}

        {/* View mode toggle */}
        <div className="btn-group mb-3">
          <button
            onClick={() => setViewMode('desktop')}
            className={`btn btn-sm ${viewMode === 'desktop' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            Normal View
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`btn btn-sm ${viewMode === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            Compact View
          </button>
        </div>

        {/* Legend toggle */}
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center mx-auto mb-3"
        >
          <Info size={16} className="me-1" />
          {showLegend ? 'Hide Legend' : 'Show Legend'}
        </button>

        {/* Legend */}
        {showLegend && (
          <div className="card mb-3 mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-body">
              <div className="row row-cols-2 row-cols-md-4 g-2">
                <div className="col">
                  <div className="d-flex align-items-center">
                    <div className="bg-secondary rounded me-2" style={{ width: "16px", height: "16px" }}></div>
                    <small>Standard</small>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center">
                    <div className="bg-info rounded me-2" style={{ width: "16px", height: "16px" }}></div>
                    <small>Comfort</small>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center">
                    <div className="bg-warning rounded me-2" style={{ width: "16px", height: "16px" }}></div>
                    <small>Premium</small>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center">
                    <div className="bg-danger rounded me-2" style={{ width: "16px", height: "16px" }}></div>
                    <small>VIP</small>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center">
                    <div className="border border-secondary rounded me-2" style={{ width: "16px", height: "16px" }}></div>
                    <small>Available</small>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center">
                    <div className="bg-success rounded me-2" style={{ width: "16px", height: "16px" }}></div>
                    <small>Selected</small>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center">
                    <div className="bg-light border rounded me-2" style={{ width: "16px", height: "16px" }}></div>
                    <small>Unavailable</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Seat Map - Desktop View */}
      {viewMode === 'desktop' && (
        <div className="d-flex flex-column align-items-center overflow-auto pb-4">
          <div className="d-inline-block">
            {seatMap.map((row, rowIndex) => {
              // Handle aisle row
              if (row.isAisleRow) {
                return (
                  <div key={`aisle-row-${row.rowNumber}`} className="my-3" style={{ height: "10px" }}></div>
                );
              }

              // Handle normal row
              return (
                <div key={rowIndex} className="d-flex align-items-center mb-2">
                  <span className="me-2 fw-medium small text-center" style={{ width: "25px" }}>
                    {row.find(s => s.row)?.row}
                  </span>
                  <div className="d-flex">
                    {row.map((seat, seatIndex) => {
                      // Handle aisle column
                      if (seat.isAisleColumn) {
                        return <div key={`aisle-col-${seat.column}`} style={{ width: "12px" }}></div>;
                      }
                      // console.log(seat.category);

                      const categoryStyle = getCategoryStyle(seat.category);
                      // console.log(categoryStyle);
                      return (
                        <button
                          id={`seat-${seat.seatNumber}`}
                          key={seat.seatNumber}
                          className={`
                            mx-1 rounded-top position-relative small fw-medium 
                            ${seat.status === 'BOOKED'
                              ? 'btn-light border text-white'
                              : selectedSeats.includes(seat.seatNumber)
                                ? ' btn-success text-white'
                                : `border ${categoryStyle.bgClass} ${categoryStyle.borderClass}`
                            }
                          `}
                          style={{
                            width: "32px",
                            height: "32px",
                            cursor: seat.status === 'BOOKED' ? 'not-allowed' : 'pointer',
                            opacity: seat.status === 'BOOKED' ? 0.5 : 1,
                            transition: 'transform 0.2s'
                          }}
                          disabled={seat.status === 'BOOKED'}
                          onClick={() => handleSeatClick(seat)}
                          title={`${seat.category} - ₹${seat.price}`}
                          onMouseOver={(e) => {
                            if (seat.status !== 'BOOKED') {
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {seat.column}
                          {seat.category === 'VIP' && <Zap size={8} className="position-absolute top-0 end-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


      {/* Seat Map - Mobile/Compact View */}
      {viewMode === 'mobile' && (
        <div className="d-flex flex-column align-items-center overflow-hidden pb-4">
          <div className="d-inline-block" style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%' }}>
            <div style={{ display: 'inline-block' }}>
              {seatMap.map((row, rowIndex) => {
                if (row.isAisleRow) {
                  return (
                    <div key={`aisle-row-${row.rowNumber}`} className="my-3" style={{ height: '10px' }}></div>
                  );
                }

                return (
                  <div key={rowIndex} className="d-flex align-items-center mb-2">
                    <span className="me-2 fw-medium small text-center" style={{ width: '25px' }}>
                      {row.find(s => s.row)?.row}
                    </span>
                    <div className="d-flex">
                      {row.map((seat, seatIndex) => {
                        if (seat.isAisleColumn) {
                          return <div key={`aisle-col-${seat.column}`} style={{ width: '12px' }}></div>;
                        }

                        const categoryStyle = getCategoryStyle(seat.category);
                        return (
                          <button
                            id={`seat-${seat.seatNumber}`}
                            key={seat.seatNumber}
                            className={`
                            mx-1 rounded-top position-relative small fw-medium 
                            ${seat.status === 'BOOKED'
                                ? 'btn-light border text-white'
                                : selectedSeats.includes(seat.seatNumber)
                                  ? ' btn-success text-white'
                                  : `border ${categoryStyle.bgClass} ${categoryStyle.borderClass}`
                              }
                          `}
                            style={{
                              width: "32px",
                              height: "32px",
                              cursor: seat.status === 'BOOKED' ? 'not-allowed' : 'pointer',
                              opacity: seat.status === 'BOOKED' ? 0.5 : 1,
                              transition: 'transform 0.2s'
                            }}
                            disabled={seat.status === 'BOOKED'}
                            onClick={() => handleSeatClick(seat)}
                            title={`${seat.category} - ₹${seat.price}`}
                            onMouseOver={(e) => {
                              if (seat.status !== 'DISABLED') {
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            {seat.column}
                            {seat.category === 'VIP' && <Zap size={8} className="position-absolute top-0 end-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}



      {/* Screen */}
      <div className="text-center mt-4 mb-5">
        <div className="bg-dark text-white p-2 rounded mx-auto" style={{ maxWidth: "400px" }}>
          <div className="bg-secondary w-100 rounded opacity-75" style={{ height: "8px" }}></div>
          <div className="small mt-1">SCREEN</div>
        </div>
      </div>
    </div>
  );
};


export default SeatSelection;
