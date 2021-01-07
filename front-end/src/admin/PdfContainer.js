import React from 'react';
import {Link, Redirect} from 'react-router-dom'

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
      <section className="pdf-toolbar">     
        <button onClick={createPdf}>Create PDF</button>
      </section>
    </section>
  )
}