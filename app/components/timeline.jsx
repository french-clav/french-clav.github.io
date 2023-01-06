import React from "react";
import Chart from "react-apexcharts";
import "../styles/timeline.css";

export default function Timeline(props) {
    const series = [
        {
            data: [
                {
                    x: 'Code',
                    y: [
                        new Date('2019-03-02').getTime(),
                        new Date('2019-03-04').getTime()
                    ]
                },
                {
                    x: 'Test',
                    y: [
                        new Date('2019-03-04').getTime(),
                        new Date('2019-03-08').getTime()
                    ]
                },
                {
                    x: 'Validation',
                    y: [
                        new Date('2019-03-08').getTime(),
                        new Date('2019-03-12').getTime()
                    ]
                },
                {
                    x: 'Deployment',
                    y: [
                        new Date('2019-03-12').getTime(),
                        new Date('2019-03-18').getTime()
                    ]
                }
            ]
        }
    ];

    return (
        <div className="timelineContainer">
            <div className="timeline">
                <Chart
                    series={series}
                    type="rangeBar"
                    width="100%"
                    options={{
                        plotOptions: {
                            bar: {
                                horizontal: true
                            }
                        },
                        xaxis: {
                            type: 'datetime',
                            position: 'top',
                            labels: {
                                format: "yyyy"
                            }
                        },
                        yaxis: {
                            // show: false,
                            labels: {
                                // show: false
                            }
                        },
                        grid: {
                            yaxis: {
                                lines: {
                                    show: false
                                }
                            },
                            xaxis: {
                                lines: {
                                    show: true,
                                }
                            },
                            borderColor: '#EEEEEE',
                        },
                        chart: {
                            toolbar: {
                                show: false
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}