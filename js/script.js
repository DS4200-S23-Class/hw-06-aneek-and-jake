const height = 500; 
const div_width = "100%";

function colorMap (d) {
  if(d.Species === "virginica") {
      return "blue";
  } else if (d.Species === "versicolor") {
      return "red";
  } else {
      return "green";
  }
}

let width = document.getElementById('left').clientWidth;

  d3.csv("data/iris.csv").then(function(data) {
  /* left visualization */ 
  const svg_1 = d3.select("#Petal_Sepal_Length_Scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale1 = d3.scaleLinear()
    .domain([d3.min(data, d => d.Sepal_Length) - 2, d3.max(data, d => d.Sepal_Length) + 4])
    .range([50, width - 50]);

  const yScale1 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Petal_Length)])
    .range([height - 50, 50]);

  var myCircle1 = svg_1.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale1(d.Sepal_Length))
        .attr("cy", d => yScale1(d.Petal_Length))
        .attr("r", 3)
        .attr("class", "circle")
        .style("fill", d => colorMap(d));

  
  /* Referenced HW5) */
  const xAxis1 = d3.axisBottom(xScale1);
  const yAxis1 = d3.axisLeft(yScale1);

  svg_1.append("g")
    .attr("transform", "translate(0," + (height - 50) + ")")
    .call(xAxis1);

  svg_1.append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis1);


  /* middle visualization */
  const svg_2 = d3.select("#Petal_Sepal_Width_Scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale2 = d3.scaleLinear()
    .domain([d3.min(data, d => d.Sepal_Width) - 2, d3.max(data, d => d.Sepal_Width) + 4])
    .range([50, width - 50]);

  const yScale2 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Petal_Width)])
    .range([height - 50, 50]);

  var myCircle2 = svg_2.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale2(d.Sepal_Width))
        .attr("cy", d => yScale2(d.Petal_Width))
        .attr("r", 3)
        .attr("class", "circle")
        .style("fill", d => colorMap(d));

  
  /* Referenced HW5) */
  const xAxis2 = d3.axisBottom(xScale2);
  const yAxis2 = d3.axisLeft(yScale2);

  svg_2.append("g")
    .attr("transform", "translate(0," + (height - 50) + ")")
    .call(xAxis2);

  svg_2.append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis2);


  /* right visualization */
  const svg_3 = d3.select("#Count_Iris_Bar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const counts = d3.rollup(data, v => v.length, d => d.Species);

  const colorMap_Bar = {
    "virginica": "blue",
    "versicolor": "red",
    "setosa": "green"
  };

  const xScale3 = d3.scaleBand()
    .domain(counts.keys())
    .range([50, width - 50])
    .padding(0.1);

  const yScale3 = d3.scaleLinear()
    .domain([0, d3.max(counts.values()) + 10])
    .range([height - 50, 50]);

  var MyRect = svg_3.append("g")
        .selectAll("rect")
        .data(counts)
        .enter()
        .append("rect")
        .attr("x", d => xScale3(d[0]))
        .attr("y", d => yScale3(d[1]))
        .attr("width", xScale3.bandwidth())
        .attr("height", (d) => 450 - yScale3(d[1]))
        .attr("class", "rect")
        .style("opacity", 0.5)
        .style("fill", d => colorMap_Bar[d[0]]);

  
  /* Referenced HW5) */
  const xAxis3 = d3.axisBottom(xScale3);
  const yAxis3 = d3.axisLeft(yScale3);

  svg_3.append("g")
    .attr("transform", "translate(0," + (height - 50) + ")")
    .call(xAxis3);

  svg_3.append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis3);



  //add brushing
  svg_2
    .call(d3.brush()                
      .extent( [ [0,0], [width,height]]) 
      .on("start brush", updateChart) 
    )

  // Function that is triggered when brushing is performed
  function updateChart(event) {
    extent = event.selection; 
    myCircle1.classed("selected", function(d){return isBrushed(extent, xScale2(d.Sepal_Width), yScale2(d.Petal_Width))});
  }

  
  // A function that return TRUE or FALSE according if a dot is in the selection or not
  function isBrushed(brush_coords, cx, cy) {
       var x0 = brush_coords[0][0],
           x1 = brush_coords[1][0],
           y0 = brush_coords[0][1],
           y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
  }


});



