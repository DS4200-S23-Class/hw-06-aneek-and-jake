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

/* left visualization */ 
const svg_1 = d3.select("#Petal_Sepal_Length_Scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.csv("data/iris.csv").then(function(data) {
  const xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.Sepal_Length) - 2, d3.max(data, d => d.Sepal_Length) + 4])
    .range([50, width - 50]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Petal_Length)])
    .range([height - 50, 50]);

  svg_1.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.Sepal_Length))
        .attr("cy", d => yScale(d.Petal_Length))
        .attr("r", 3)
        .attr("class", "circle")
        .style("fill", d => colorMap(d));

  
  /* Referenced HW5) */
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg_1.append("g")
    .attr("transform", "translate(0," + (height - 50) + ")")
    .call(xAxis);

  svg_1.append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis);

});

/* middle visualization */
const svg_2 = d3.select("#Petal_Sepal_Width_Scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.csv("data/iris.csv").then(function(data) {
  const xScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.Sepal_Width) - 2, d3.max(data, d => d.Sepal_Width) + 4])
    .range([50, width - 50]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Petal_Width)])
    .range([height - 50, 50]);

  svg_2.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.Sepal_Width))
        .attr("cy", d => yScale(d.Petal_Width))
        .attr("r", 3)
        .attr("class", "circle")
        .style("fill", d => colorMap(d));

  
  /* Referenced HW5) */
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg_2.append("g")
    .attr("transform", "translate(0," + (height - 50) + ")")
    .call(xAxis);

  svg_2.append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis);

});

/* right visualization */
const svg_3 = d3.select("#Count_Iris_Bar")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.csv("data/iris.csv").then(function(data) {

  const counts = d3.rollup(data, v => v.length, d => d.Species);

  const colorMap_Bar = {
    "virginica": "blue",
    "versicolor": "red",
    "setosa": "green"
  };

  const xScale = d3.scaleBand()
    .domain(counts.keys())
    .range([50, width - 50])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(counts.values()) + 10])
    .range([height - 50, 50]);

  svg_3.selectAll("rect")
        .data(counts)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => 450 - yScale(d[1]))
        .attr("class", "rect")
        .style("opacity", 0.5)
        .style("fill", d => colorMap_Bar[d[0]]);

  
  /* Referenced HW5) */
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg_3.append("g")
    .attr("transform", "translate(0," + (height - 50) + ")")
    .call(xAxis);

  svg_3.append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis);

});


