import React, {useState, Fragment} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import './Chart.css'

const formatData = (array) => {
    return {
        x: array.map(item => {
            return item.x
        }),
        y: array.map(item => {
            return item.y
        })
    }
}


const Chart = (props) => {
    const { data } = props
    const formattedData = formatData(data)
    const [customizeOpen, toggleCustomizeOpen] = useState(false);
    const [customWidth, changeWidth] = useState(500);
    const [customHeight, changeHeight ] = useState(400);
    const [customChartType, changeChartType ] = useState(0);
    const [customChartColor, changeColorChart ] = useState('#FFFFFF');
    const [widthError, toggleWidthError ] = useState(false);
    const [heightError, toggleHeightError ] = useState(false);
    const [finalSettings, changeSettings ] = useState({
        width: 500,
        height: 400,
        chartType: 0,
        chartColor: '#FFFFFF'
    })
    const { chartColor, chartType, height, width } = finalSettings
    const options = {
        title: {
            text: 'Test'
        },
        chart:{
            height, 
            width,
            type: chartType === 0 ? 'line' : 'bar',
            backgroundColor: chartColor
        },
        xAxis: {
            categories: formattedData.x
        },
        series: [{
            data: formattedData.y
        }],
        responsive: true,
        credits: {
            enabled: false
        },
    }
    return (
        <div>
            <Card className='card-styling' >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
                <Button 
                    onClick={() => { 
                        let error = false
                        if(customizeOpen){
                            if(isNaN(customWidth)){
                                error = true
                                toggleWidthError(true)
                            }else{
                                toggleWidthError(false)
                            }
                            if(isNaN(customHeight)){
                                error = true
                                toggleHeightError(true)
                            }else{
                                toggleHeightError(false)
                            }
                            if(!error){
                                toggleCustomizeOpen(!customizeOpen)
                                changeSettings({
                                    width: parseInt(customWidth),
                                    height: parseInt(customHeight),
                                    chartType: customChartType,
                                    chartColor: customChartColor
                                })
                            }
                        }else{
                            toggleCustomizeOpen(!customizeOpen)
                        }
                    }} 
                    color={customizeOpen ? 'primary' : 'secondary'} variant="contained"
                >
                    {customizeOpen ? 'Apply Changes' : 'Customize'}
                </Button>
                {customizeOpen && (
                    <Button className='cancel-button' onClick={() => { 
                        toggleCustomizeOpen(!customizeOpen)
                        }} 
                        color='default' variant="contained"
                    >
                        Cancel
                    </Button>
                )}
                {customizeOpen && (
                    <Fragment>
                        <div className='text-center my-3'>
                            <h4>Form Options</h4>
                        </div>
                        <div className='row my-4'>
                            <div className='col-lg-6'>
                                <TextField 
                                    value={customWidth} 
                                    error={widthError}
                                    helperText='Numbers only please' 
                                    id="standard-basic" 
                                    label="Width" 
                                    onChange={evt =>{
                                        const userInput = evt.target.value
                                        changeWidth(userInput)
                                    }}  
                                />
                            </div>
                            <div className='col-lg-6'>
                                <TextField 
                                    value={customHeight} 
                                    error={heightError}
                                    helperText='Numbers only please'  
                                    id="standard-basic" 
                                    label="Height" 
                                    onChange={evt =>{
                                        const userInput = evt.target.value
                                        changeHeight(userInput)
                                    }} 
                                />
                            </div>
                        </div>
                        <div className='row my-4'>
                            <div className='col-lg-6'>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Chart Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-placeholder-label-label"
                                    id="demo-simple-select-placeholder-label"
                                    value={customChartType}
                                    onChange={evt => {
                                        const userInput = evt.target.value
                                        changeChartType(userInput)
                                    }}
                                >
                                    <MenuItem value={0}>Line Chart</MenuItem>
                                    <MenuItem value={1}>Bar Chart</MenuItem>
                                </Select>
                            </div>
                            <div className='col-lg-6'>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Chart Color
                                </InputLabel>
                                <input 
                                    type="color" 
                                    id="favcolor" 
                                    name="favcolor" 
                                    value={customChartColor}
                                    onChange={evt => {
                                        const userInput = evt.target.value
                                        changeColorChart(userInput)
                                    }}    
                                />
                            </div>
                        </div>
                    </Fragment>
                )}
            </Card>
        </div>
    )
} 

export default Chart