const chartIt = async () => {
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [
                {
                    label: 'Global Average Temperature',
                    data: data.global,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Northern Hemisphere',
                    data: data.northern,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Southern Hemisphere',
                    data: data.southern,
                    fill: false,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value + ' °';
                        }
                    }
                }]
            }
        }
    });
};

const getData = async () => {
    const response = await fetch('./data/ZonAnn.Ts+dSST.csv');
    const data = await response.text();

    const xs = [];
    const global = [];
    const northern = [];
    const southern = [];

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xs.push(year);

        global.push(parseFloat(columns[1]) + 14);
        northern.push(parseFloat(columns[2]) + 14);
        southern.push(parseFloat(columns[3]) + 14);
    });
    return { xs, global, northern, southern };
};

chartIt();
