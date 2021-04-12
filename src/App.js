import React from "react";
import "./style.css";

export default function App() {
const designerRef = React.useRef(null)
  const [state, setState] = React.useState({
    canvas: {},
    elements: []
  })

React.useLayoutEffect(() => {
  console.log(designerRef.current.getBoundingClientRect())
  setState(prev => {
    return {...prev, canvas: designerRef.current.getBoundingClientRect() }
  })
}, [])


  const dragHandler = e => {
    e.dataTransfer.setData('item', e.target.width)
    console.log("Drag", e);
  };
  const dropHandler = e => {
    e.preventDefault();
    console.log("Drop", e);
    setState(prev => {
      var ele = e.dataTransfer.getData('item')
      var newElement = {
          x: (e.clientX - prev.canvas.left),
          y: (e.clientY - prev.canvas.top),
          width: (ele.width),
          height: (ele.height),
        }
        console.log('New element added:', ele, newElement)
      return {
        ...prev,
        elements: [...prev.elements, newElement]
      }
    })
  };

  const dragOverHandler = e => {
    e.preventDefault();
    //console.log("Drag Over", e);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h1>Hello StackBlitz!</h1>
      <br />
      <div
        style={{ width: "100%", height: "100%", backgroundColor: "lightgrey" }}
      >
        <h2>Report Designer</h2>
        <div style={{ display: "flex-inline" }}>
          <label
            onDragStart={e => dragHandler(e)}
            draggable="true"
            className="designerIcon"
          >
            Textbox
          </label>
        </div>
        <div
        ref={designerRef}
          onDrop={e => dropHandler(e)}
          onDragOver={e => dragOverHandler(e)}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            margin: 10
          }}
        >
        {
          state.elements.map(element => {
            return <label 
            style={{ 
              position: 'absolute', 
              top:(element.y + state.canvas.top), 
              left: (element.x + state.canvas.left - (element.width / 2))}}>
            New element
            </label>
          })
        }
        </div>
      </div>
    </div>
  );
}
