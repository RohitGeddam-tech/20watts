import React, { useEffect, useState } from "react";
import drop from "../img/expand_more.png";
// import { TextField } from "@material-ui/core/ExpansionPanel";

const SliderService = ({ initialChecked, passChecked }) => {
  let checkedboxes = {
    creative: { checked: false, value: "Creative Strategy" },
    brand: { checked: false, value: "Branding Campaign" },
    social: { checked: false, value: "Social Media Campaign" },
    video: { checked: false, value: "Video Campaign" },
    ground: { checked: false, value: "On-ground Engagements" },
    post: { checked: false, value: "Post Production" },
    production: { checked: false, value: "Production" },
  };

  const [isChecked, setChecked] = useState(initialChecked);

  const removeItemOnce = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const handleClick = (e, each) => {
    const val = checkedboxes[each].value;
    e.target.checked
      ? initialChecked.push(val)
      : removeItemOnce(initialChecked, val);
    setChecked(initialChecked);
  };

  useEffect(() => {
    passChecked(isChecked);
  }, [isChecked, passChecked]);

  const [clicked, setClicked] = useState(false);

  const slide = clicked ? "borderslide" : "noneslide";

  return (
    <>
      <div onMouseEnter={() => setClicked(true)} onMouseLeave={() => setClicked(false)} className="inputslider">
        <h1>
          select your service *{" "}
          <span>
            <img src={drop} alt="drop-icon" />
          </span>
        </h1>
        <div className={slide}>
          {Object.keys(checkedboxes).map((each, index) => {
            return (
              <div
                className="inputslide"
                // htmlFor={each}
                // onClick={(e) => e.target.classList.toggle("after")}
                key={index}
              >
                <input
                  id={each}
                  type="checkbox"
                  data-name={each}
                  onChange={(e) => {
                    handleClick(e, each);
                  }}
                  style={{ marginRight:'10px' }}
                />
                <label
                  htmlFor={each}
                  className="serviceslide-btn"
                  // onClick={(e) => {
                  //   e.target.classList.toggle("after");
                  // }}
                >
                  {checkedboxes[each].value}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SliderService;
