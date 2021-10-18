import React, { Component } from "react";

import "./Input.scss";
import "./Select.scss";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      onChange: props.onChange,
      shift: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.options.length > 0) {
      const [sitem] = nextProps.options.filter(
        (option, key) => option.value === nextProps.value
      );
      this.setState({
        value: typeof sitem !== "undefined" ? sitem.text : "",
      });
    }
  }
  /**
   * @param sitem : <div className="select-item" >
   * @param siold : <div className="select-item selected" >
   * @param shead : <input className="select-head" >
   * @param sbody : <div className="select-body" >
   */
  handleItemClicked = (sitem, siold = null, shead = null, sbody = null) => {
    if (!sitem.classList.contains("selected")) {
      if (sbody == null) sbody = sitem.parentNode;
      if (shead == null) shead = sbody.previousSibling.previousSibling;
      if (siold == null) siold = sbody.querySelector(".selected");
      if (siold != null) siold.classList.remove("selected");
      sitem.classList.add("selected");
      const eventChange = {
        target: {
          name: shead.name,
          value: sitem.getAttribute("value"),
        },
      };
      this.state.onChange(eventChange);
      this.setState({
        value: sitem.innerText,
      });
    }
  };
  onItemClick = (event) => {
    let sitem = event.target;
    this.handleItemClicked(sitem);
  };
  replace = (str, ref) => {
    for (let i = 0; i < str.length; i++) {
      Array.prototype.forEach.call(ref, (value, key) => {
        if (str[i] === key) str[i] = value;
      });
    }
    return str;
  };
  onChange = (event) => {
    let shead = event.target,
      items = shead.parentNode.querySelectorAll(".select-item"),
      sitem = shead.parentNode.querySelector(".select-item.selected"),
      toReplace = { á: "a", é: "e", í: "i", ó: "o", ú: "u", ü: "u" },
      toMatch = this.replace(shead.value.toLowerCase(), toReplace),
      str = "";
    if (sitem !== null) sitem.classList.remove("selected");
    for (let i = 0; i < items.length; i++) {
      str = this.replace(items[i].innerHTML.toLowerCase(), toReplace);
      if (str.includes(toMatch)) {
        items[i].classList.remove("hide");
      } else {
        items[i].classList.add("hide");
      }
    }
    this.setState({
      value: shead.value,
    });
  };
  handleSelected = (event) => {
    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      let shead = event.target,
        items = shead.parentNode.querySelectorAll(".select-item:not(.hide)"),
        shift = this.state.shift,
        indx,
        jndx;
      for (
        indx = 0;
        indx < items.length && !items[indx].classList.contains("selected");
        indx++
      );
      if (indx !== items.length) {
        let sbody = shead.nextSibling.nextSibling;
        jndx = indx;
        switch (event.key) {
          case "ArrowUp":
          case "ArrowLeft":
            if (indx > 0) {
              indx--;
              shift -= 39.2;
            }
            break;
          case "ArrowDown":
          case "ArrowRight":
            if (indx < items.length - 1) {
              indx++;
              shift += 39.2;
            }
            break;
          default:
            break;
        }
        if (shift <= 0) {
          shift = 0;
        } else if (shift >= 117.6) {
          shift = 117.6;
        }
        this.setState({ shift });
        if (indx !== jndx) {
          this.handleItemClicked(items[indx], items[jndx], shead, sbody);
          sbody.scrollTo(0, items[indx].offsetTop - shift);
        }
      } else {
        indx = 0;
        jndx = 0;
        this.handleItemClicked(items[indx]);
      }
    }
  };
  render() {
    let classAttr = "input-container";
    if (this.props.className) {
      classAttr += ` ${this.props.className}`;
    }
    return (
      <div className="select-container">
        <div className={classAttr}>
          <input
            autoComplete="off"
            className="select-head"
            id={this.props.id}
            name={this.props.name}
            onChange={this.onChange}
            onKeyDown={this.handleSelected}
            required
            type="text"
            value={this.state.value}
          />
          <label htmlFor={this.props.id}>{this.props.placeholder}</label>
          <div className="select-body">
            {this.props.options.map((option, key) => (
              <div
                className={
                  option.value === this.props.value
                    ? "select-item selected"
                    : "select-item"
                }
                key={key}
                onClick={this.onItemClick}
                value={option.value}
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Select;
