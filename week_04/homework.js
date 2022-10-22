/* D3 Line Chart */

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-canada.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m") // convert date in type string to date

    for (let d of data) { 
        d.Num = +d.Num; // Convert value from string type to int
        d.Month = timeParse(d.Month); // Use timeParse function to convert Month column to date
    }

    let x = d3.scaleTime() // Set scale of x-axis to time
        .domain(d3.extent(data, d => d.Month)) // use month column's domain for x-axis values
        .range([margin.left, width - margin.right]); // place x-axis dimension on page
    
    let y = d3.scaleLinear() // Set scale of y-axis to continuous values
        .domain([0, d3.max(data, d => d.Num)]) // use Num column's 
        .range([height-margin.bottom, margin.top]); // place y-axis dimension
    
    svg.append("g") // Add js element to chart
      .attr("transform", `translate(0,${height - margin.bottom})`) //resize element
      .call(d3.axisBottom(x).tickSizeOuter(0)); // Set to x-axis and add ticks
    
    svg.append("g") // Add js element to chart
      .attr("transform", `translate(${margin.left},0)`) // resize element
      .call(d3.axisLeft(y)); // Set to y-axis

    svg.append("text") // Add labels and place along x-axis
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Year");
    
    svg.append("text") // Add labels and place along y-axis
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    let line = d3.line() //Add line based on column values of rows
        .x(d => x(d.Month))
        .y(d => y(d.Num));
    
    svg.append("path") // Use line object to draw path object 
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "red")
  });