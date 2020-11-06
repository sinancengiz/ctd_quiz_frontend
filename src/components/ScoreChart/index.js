import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
// import Plot from "react-plotly.js";
import Plotly from "plotly.js";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class Chart extends React.Component {
  render() {
    
    return (
      <Container>
      <Row>
        <Col >
            <Plot 
          data = {[
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: this.props.score,
              title: { text: "Your Score"},
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 100] } },

            }
          ]}
          
          layout = {{ width: 600, height: 300 }}

        />
        </Col>
      

    </Row>
   
    </Container>
      );
    }
  }
  
export default Chart;
