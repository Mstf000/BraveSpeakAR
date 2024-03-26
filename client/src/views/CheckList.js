import React, { useState } from 'react';
import '../assets/css/CheckList.css'; // Make sure the path to your CSS file is correct.

const xR ="Feeling nervous, anxious, or on edge"
const Checklist = () => {
  const [checkboxes, setCheckboxes] = useState({
    "MsTF List Test 1": { top: false, items: { "Feeling nervous, anxious, or on edge": false, "Not being able to stop or control worrying": false, "Worrying too much about different things": false, "Trouble relaxing": false } },
    "MsTF List Test 2": { top: false, items: { Choice1: false, Choice2: false, Choice3: false, Choice4: false } }
  });

  const handleCheckboxChange = (category, key, isTop) => {
    const newCheckboxes = { ...checkboxes };
    if (isTop) {
      const newState = !newCheckboxes[category].top;
      newCheckboxes[category].top = newState;
      Object.keys(newCheckboxes[category].items).forEach(itemKey => {
        newCheckboxes[category].items[itemKey] = newState;
      });
    } else {
      newCheckboxes[category].items[key] = !newCheckboxes[category].items[key];
      const allChecked = Object.values(newCheckboxes[category].items).every(val => val);
      newCheckboxes[category].top = allChecked;
    }
    setCheckboxes(newCheckboxes);
  };

  return (
    <form>
      {Object.entries(checkboxes).map(([category, { top, items }]) => (
        <div className="checkbox-group" key={category}>
          <label className="checkbox-label">
            <input
              className="checkbox"
              type="checkbox"
              name={category}
              data-top="true"
              checked={top}
              onChange={() => handleCheckboxChange(category, null, true)}
            />
            <svg className="check-icon" width="24px" height="24px" viewBox="0 0 24 24">
              <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <rect className="check-icon__box" x="1" y="1" width="22" height="22"/>
                <polyline className="check-icon__box-worm" points="23,1 1,1 1,23 23,23 23,4" stroke-dasharray="30 146" stroke-dashoffset="30"/>
                <polyline className="check-icon__check-worm" points="23,4 10,17 5,12 18,12" stroke-dasharray="17.38 149.68" stroke-dashoffset="103.38"/>
              </g>
            </svg>
            <strong className="checkbox-text">{category.charAt(0).toUpperCase() + category.slice(1)}</strong>
          </label>

          {Object.entries(items).map(([key, checked]) => (
            <label className="checkbox-label" key={key}>
              <input
                className="checkbox"
                type="checkbox"
                name={category}
                value={key}
                checked={checked}
                onChange={() => handleCheckboxChange(category, key, false)}
              />
              <svg className="check-icon" width="24px" height="24px" viewBox="0 0 24 24">
                <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <rect className="check-icon__box" x="1" y="1" width="22" height="22"/>
                  <polyline className="check-icon__box-worm" points="23,1 1,1 1,23 23,23 23,4" stroke-dasharray="30 146" stroke-dashoffset="30"/>
                  <polyline className="check-icon__check-worm" points="23,4 10,17 5,12 18,12" stroke-dasharray="17.38 149.68" stroke-dashoffset="103.38"/>
                </g>
              </svg>
              <span className="checkbox-text">{key.replace(/_/g, ' ')}</span>
            </label>
          ))}
        </div>
      ))}
    </form>
  );
};

export default Checklist;
