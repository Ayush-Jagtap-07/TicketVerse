import React, { useState, useEffect } from 'react';
import { Zap, Info } from 'lucide-react';

const SeatSelection = ({ theatreLayout, seats, onSeatSelect }) => {
  const { totalRows, seatsPerRow, categories, aisles, disabledSeats } = theatreLayout;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [viewMode, setViewMode] = useState('desktop');
  const [showLegend, setShowLegend] = useState(false);
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
        const status = seats.filter(seat => seat.seatNumber == seatNumber)[0].status;
        // console.log(status);
        rowSeats.push({
          seatNumber,
          row: String.fromCharCode(64 + row),
          rowNumber: row,
          column: col,
          category: rowLabels[row]?.name || 'STANDARD',
          price: rowLabels[row]?.price || 100,
          status: status
        });
      }
      seatMap.push(rowSeats);
    }
    return seatMap;
  };

  const seatMap = generateSeatMap();
  // console.log(seatMap);


  // const handleSeatClick = (seat) => {
  //   if (seat.status === 'DISABLED') return;
  //   setSelectedSeats((prev) =>
  //     prev.includes(seat.seatNumber)
  //       ? prev.filter((s) => s !== seat.seatNumber)
  //       : [...prev, seat.seatNumber]
  //   );

  //   // Send seat details (including price and category) to ShowTimePage
  //   const selectedSeatDetails = selectedSeats.map(seatNum => {
  //     for (const row of seatMap) {
  //       if (Array.isArray(row)) {
  //         const seat = row.find(s => s.seatNumber === seatNum);
  //         if (seat) return seat;
  //       }
  //     }
  //     return null;
  //   }).filter(Boolean);

  //   onSeatSelect(selectedSeatDetails);
  // };

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

  const getTotalPrice = () => {
    let total = 0;
    selectedSeats.forEach(seatNum => {
      // Find the seat in our map
      for (const row of seatMap) {
        if (Array.isArray(row)) {
          const seat = row.find(s => s.seatNumber === seatNum);
          if (seat) {
            total += seat.price;
            break;
          }
        }
      }
    });
    return total;
  };

  // Function to get all non-aisle seats flattened for mobile view
  const getAllSeats = () => {
    const allSeats = [];
    seatMap.forEach(row => {
      if (Array.isArray(row)) {
        row.forEach(seat => {
          if (seat.seatNumber) {
            allSeats.push(seat);
          }
        });
      }
    });
    return allSeats;
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
                            className={`mx-1 rounded-top position-relative small fw-medium 
                        ${seat.status === 'DISABLED' ? 'btn-light border' :
                                selectedSeats.includes(seat.seatNumber) ? ' btn-success text-white' :
                                  `border ${categoryStyle.bgClass} ${categoryStyle.borderClass}`}`}
                            style={{
                              width: '32px',
                              height: '32px',
                              cursor: seat.status === 'DISABLED' ? 'not-allowed' : 'pointer',
                              opacity: seat.status === 'DISABLED' ? 0.5 : 1,
                              transition: 'transform 0.2s'
                            }}
                            disabled={seat.status === 'DISABLED'}
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


      {/* Seat Map - Mobile/Compact View */}
      {/* {viewMode === 'mobile' && (
        <div className="row row-cols-6 row-cols-sm-8 row-cols-md-10 g-1 mb-4">
          {getAllSeats().map((seat, index) => {
            const categoryStyle = getCategoryStyle(seat.category);

            return (
              <div className="col" key={seat.seatNumber}>
                <button
                  id={`seat-${seat.seatNumber}`}
                  className={`
                    w-100 py-2 rounded position-relative d-flex flex-column align-items-center justify-content-center
                    ${seat.status === 'DISABLED'
                      ? 'btn-light border'
                      : selectedSeats.includes(seat.seatNumber)
                        ? ' btn-success text-white'
                        : `border ${categoryStyle.bgClass} ${categoryStyle.borderClass}`
                    }
                  `}
                  disabled={seat.status === 'DISABLED'}
                  onClick={() => handleSeatClick(seat)}
                  title={`${seat.category} - ₹${seat.price}`}
                >
                  <span style={{ fontSize: "0.65rem" }}>{seat.row}</span>
                  <span className="fw-bold small">{seat.column}</span>
                </button>
              </div>
            );
          })}
        </div>
      )} */}

      {/* Screen */}
      <div className="text-center mt-4 mb-5">
        <div className="bg-dark text-white p-2 rounded mx-auto" style={{ maxWidth: "400px" }}>
          <div className="bg-secondary w-100 rounded opacity-75" style={{ height: "8px" }}></div>
          <div className="small mt-1">SCREEN</div>
        </div>
      </div>
      {/* Selected Seats Summary */}
      {/* <div className="card mt-4">
        <div className="card-body">
          <h3 className="card-title h5">Your Selection</h3>
          {selectedSeats.length > 0 ? (
            <div>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {selectedSeats.map(seatNum => {
                  // Find the seat in our map
                  let seat = null;
                  for (const row of seatMap) {
                    if (Array.isArray(row)) {
                      const foundSeat = row.find(s => s.seatNumber === seatNum);
                      if (foundSeat) {
                        seat = foundSeat;
                        break;
                      }
                    }
                  }

                  const category = seat?.category || 'STANDARD';
                  const price = seat?.price || 100;
                  const categoryStyle = getCategoryStyle(category);

                  return (
                    <span key={seatNum} className={`badge ${categoryStyle.bgClass} ${categoryStyle.textClass} py-2 px-3`}>
                      {seatNum} - ₹{price}
                    </span>
                  );
                })}
              </div>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <div className="text-muted small">Total Seats: {selectedSeats.length}</div>
                  <div className="fw-bold fs-5">Total: ₹{getTotalPrice()}</div>
                </div>
                <button className="btn btn-primary mt-2 mt-md-0" onClick={handleCheckout()}>
                  Continue to Checkout
                </button>
              </div>
            </div>
          ) : (
            <p className="text-muted">No seats selected. Click on available seats to select them.</p>
          )}
        </div>
      </div> */}

    </div>
  );
};


export default SeatSelection;
