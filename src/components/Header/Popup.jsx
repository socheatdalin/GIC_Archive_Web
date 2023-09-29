import React, { useState } from 'react';
import PopupContent from './PopupContent';

function Popup() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      <button onClick={togglePopup}>Toggle Popup</button>
      {isPopupVisible && <PopupContent />}
    </div>
  );
}

export default Popup;
