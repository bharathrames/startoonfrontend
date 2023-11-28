import React, { useState, useEffect } from 'react';
import './SeatBooking.css';

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [showSeatInfo, setShowSeatInfo] = useState(false);

  const handleSeatClick = (seatNumber) => {
   
    const isSelected = selectedSeats.includes(seatNumber);
    let updatedSeats;

    if (isSelected) {
      updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
    } else {
      updatedSeats = [...selectedSeats, seatNumber];
    }

    
    const amount = updatedSeats.length * 1500;
    setSelectedSeats(updatedSeats);
    setTotalAmount(amount);
  };

  const handleSeatHover = (seatNumber) => {
    
    const timeoutId = setTimeout(() => {
      setHoveredSeat(seatNumber);
    }, 1000);

    
    return () => clearTimeout(timeoutId);
  };

  const renderSeats = (totalRows, totalCols, deckType) => {
    const seats = [];

    for (let row = 1; row <= totalRows; row++) {
      for (let col = 1; col <= totalCols; col++) {
        const seatNumber = `${deckType}${row}${col}`;
        const isSelected = selectedSeats.includes(seatNumber);

        seats.push(
          <div
            key={seatNumber}
            className={`seat ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatNumber)}
            onMouseEnter={() => handleSeatHover(seatNumber)}
            onMouseLeave={() => setHoveredSeat(null)}
          >
            {seatNumber}
            {hoveredSeat === seatNumber && (
              <div className="tooltip">1500 Rupees</div>
            )}
          </div>
        );
      }
    }

    return seats;
  };

  const handleContinueClick = () => {
    
    alert('Booking successful!');
    window.location.reload();
  };

  return (
    <>
      <div className="seat-booking-container">
        <div className="lower-deck">
          <h2>Lower Deck</h2>
          <hr />
          <div className="seat-grid">{renderSeats(5, 3, 'L')}</div>
        </div>
        <div className="centers">
          <div
            className="seat-type-info"
            onMouseEnter={() => setShowSeatInfo(true)}
            onMouseLeave={() => setShowSeatInfo(false)}
          >
           Hover to know about the seat type!!!
          </div>
          {showSeatInfo && (
            
<div className='knowabout'>
<div class='available-item1'>
<div class='contenttext'>Available</div>
</div>
<div class='available-item2'>
<div class='contenttext'>Available only for women</div>
</div>
<div class='available-item3'>
<div class='contenttext'>selected by you</div>
</div>
<div class='available-item4'>
<div class='contenttext'>Booked by others</div>
</div>
<div class='available-item5'>
<div class='contenttext'>Booked by female passengers</div>
</div>
            </div>
          )}
        </div>

        <div className="upper-deck">
          <h2>Upper Deck</h2>
          <hr />
          <div className="seat-grid">{renderSeats(5, 3, 'U')}</div>
        </div>
      </div>
      <div className='center'>
      {selectedSeats.length > 0 && (
       
        <div className="booking-details">
          <h2>Booking Details</h2>
          <p>Number of Seats: {selectedSeats.length}</p>
          <p>Selected Seats: {selectedSeats.join(', ')}</p>
          <p>Total Amount: {totalAmount}</p>
        </div>
      )}
</div>
      {selectedSeats.length > 0 && (
       
        <div className="button-container">
          <button className="continue-button" onClick={handleContinueClick}>Continue</button>
        </div>
      )}
      

    </>
  );
};

export default SeatBooking;
