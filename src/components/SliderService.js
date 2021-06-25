import React, { useEffect, useState } from "react";
import { useRef } from "react";
import drop from "../img/expand_more.png";
import DivShow from "./DivShow";
// import HireDesk from "./HireDesk";
// import HireMob from "./HireMob";
// import Form from './Form'
// import { TextField } from "@material-ui/core/ExpansionPanel";

// const [clicked, setClicked] = useState(false);

function useOutsideAlerter(ref, click) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // setClicked(false);
        click(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

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
    console.log(isChecked);
  };

  useEffect(() => {
    passChecked(isChecked);
  }, [isChecked, passChecked]);

  const [clicked, setClicked] = useState(false);
  const slide =
    isChecked.length === 0
      ? clicked
        ? "borderslide"
        : "noneslide"
      : clicked
      ? "borderslideTop"
      : "noneslide";

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setClicked);

  return (
    <>
      <div className="inputslider" onClick={()=>setClicked(!clicked)}>
        {isChecked.length === 0 ? null : <p>select your service *</p>}
        <h1>
          {/* select your service *{" "} */}
          {isChecked.length === 0 ? (
            <>select your service * </>
          ) : (
            <>
              {isChecked.join(", ").toString().slice(0, 30)}
              {isChecked.join(", ").toString().length > 30 ? <>...</> : null}
            </>
          )}
          <span>
            <img src={drop} alt="drop-icon" />
          </span>
        </h1>
        <div className={slide} ref={wrapperRef}>
          {Object.keys(checkedboxes).map((each, index) => {
            return (
              <div
                className="inputslide"
                htmlFor={each}
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
                  style={{ marginRight: "10px" }}
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
      {/* <div style={{display:'none'}}>
      <HireMob />
      <HireDesk />
      </div> */}
    </>
  );
};

export default SliderService;
