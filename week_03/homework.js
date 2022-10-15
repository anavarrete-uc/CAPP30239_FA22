/* Bar chart for Library Visits around UChicago*/

d3.csv("library_visits_jan22.csv").then(data => {

    for (let d of data) {
        d.num = +d.num;
    };

    const height = 500, // resize to fit height and width of chart and labels
            width = 700,
            margin = ({top: 25, right: 30, bottom:35, left: 50});

    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // have chart start at the upper left corner

    let x = d3.scaleBand()
            .domain(data.map(d => d.branch)) // returns array
            .range([margin.left, width - margin.right]) //place band within margins of viewBox
            .padding(0.1);

    let y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.num)]).nice() // round edges at top of bar chart
            .range([height - margin.bottom, margin.top]); //svgs are built from top down

    const xAxis = g => g  // define x-axis length
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const yAxis = g => g // define y-axis length
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar =  svg.selectAll(".bar") // set bar as chart element for all data rows
        .append("g")
        .data(data) // use rows from data for chart labels and values
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // declare shape of chart element
        .attr("fill", "red") // fill color for bar element
        .attr("x", d => x(d.branch)) // set labels for library branches on x-axis
        .attr("width", x.bandwidth()) // establish width of x value
        .attr("y", d => y(d.num)) // set value for visit num
        .attr("height", d => y(0) - y(d.num)); // set height for bar representing visits
}); 