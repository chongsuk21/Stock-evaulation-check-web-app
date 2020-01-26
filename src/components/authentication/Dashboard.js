import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import Navigation from '../Navigation';
import { Bar, Line, Polar, Pie } from 'react-chartjs-2';
import _ from 'lodash';


import {
    getProfile,
    getPrice,
    getDcf,
    setTicker,
    getQuote,
    getFinancialratio,
    getFinancialGrowth,
    getRating,
    getHistoricalPrices,
    getFinancialStatements,
    getKeyRatios,
    getCashflow,
    getFreeCashflow,
    getCapitalExpenditure,
    getCompanyRating,
    getBalanceSheet,
    getProfitabilityRank
} from "../../actions";
import {
    filterFinancialsForDate, filterFinancialsForEPS,
    filterFinancialsForNetIncome,
    filterFinancialsForRevenue,
    filterBalanceForPie,
    filterCashflowForNetcashflow,
    filterCashflowForDate,
    filterFreeCashflowForNetcashflow,
    filterCapitalExpenditure,
    filterCompanyRating

} from "../../utilities/filtering";
import {format} from "../../utilities/CurrencyFormat";

const mapStateToProps = state => {
    return {
        profile: state.finance.profile,
        price: state.finance.price,
        dcf: state.finance.dcf,
        ticker:state.finance.ticker,
        quote:state.finance.quote,
        ratios:state.finance.ratios,
        filtered_ratios:state.finance.filtered_ratios,
        growth:state.finance.growth,
        rating:state.finance.rating,
        histoPrices:state.finance.histoPrices,
        keyratios:state.finance.keyratios,
        financials: state.finance.financials,
        cashflow: state.finance.cashflow,
        freecashflow:state.finance.freecashflow,
        balanceSheet: state.finance.balanceSheet,
        financialStrengthRatio: state.finance.financialStrengthRatio,
        financialStrengthKeys: state.finance.financialStrengthKeys,
        valuationRatio: state.finance.valuationRatio,
        profitabilityRank: state.finance.profitabilityRank
    }
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strengthKeys: ['Debt Ratio', 'Debt to Equity Ratio', 'Current Ratio', 'Capital Expenditure Coverage Ratio'],
            ticker: '',
            start: false,
            options: {
                chart: {
                    type: 'candlestick',
                    height: 350
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    tooltip: {
                        enabled: true
                    }
                }
            }
        };

        this.update = this.update.bind(this);
    }
  update = () => {
     this.props.getProfile(this.state.ticker);
     this.props.getPrice(this.state.ticker);
     this.props.getDcf(this.state.ticker);
     this.props.getQuote(this.state.ticker);
     this.props.getFinancialratio(this.state.ticker);
     this.props.getFinancialGrowth(this.state.ticker);
     this.props.getRating(this.state.ticker);
     this.props.getHistoricalPrices(this.state.ticker);
     this.props.getKeyRatios(this.state.ticker);
     this.props.getFinancialStatements(this.state.ticker);
     this.props.getCashflow(this.state.ticker);
     this.props.getFreeCashflow(this.state.ticker);
     this.props.getCapitalExpenditure(this.state.ticker);
     this.props.getCompanyRating(this.state.ticker);
     this.props.getBalanceSheet(this.state.ticker);
     this.props.getProfitabilityRank(this.state.ticker);
     this.setState({...this.state, start: true});
   };





  render() {
      if (!this.state.start)
          return (
            <div className="abc">
                <img className="img" style={{}} src={require("../../logo.png")} />
               <section style={!this.state.start ? {position: 'fixed', top: '50%', left: '15%', width: '85%'} : {}}>
                   <form className="formTest">
                  <input type="text" id="searchName" placeholder="Enter in stock symbol."
                         onChange={evt => {this.setState({...this.state, ticker: evt.target.value.toUpperCase()})}}/>
                  <input type="button" id="submitBtn" value="Submit" onClick={this.update}/>
                </form>

            </section>
            </div>
          );
      else {
               const Revdata = {
              labels: filterFinancialsForDate(this.props.financials),
              datasets: [
                  {
                      label: 'Revenue',
                      lineTension: 0.1,
                      backgroundColor: 'rgba(75,192,192,0.4)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointHitRadius: 10,
                      data: filterFinancialsForRevenue(this.props.financials)
                  },
                  {
                      label: 'Net Income',
                      lineTension: 0.1,
                      backgroundColor: 'black',
                      borderColor: 'rgba(75,192,192,1)',
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointHitRadius: 10,
                      data: filterFinancialsForNetIncome(this.props.financials)
                  }
              ]
          };

           const Revoptions = {
               legend: {
                   labels: {
                       fontColor: "white",
                   }
               },
              scales: {
                  yAxes: [{
                      ticks: {
                          fontColor: 'white',
                          beginAtZero: true,
                          callback: (value) => {
                              return format('CAD', value);
                          }
                      }
                  }],
                  xAxes: [{
                      ticks: {
                          fontColor: 'white',
                      }
                  }]
              },
          };

           const EPSdata = {
              labels: filterFinancialsForDate(this.props.financials),
              datasets: [
                  {
                      label: 'EPS YoY',
                      lineTension: 0.1,
                      backgroundColor: 'rgba(75,192,192,0.4)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: 'rgba(75,192,192,1)',
                      pointBackgroundColor: '#fff',
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                      pointHoverBorderWidth: 2,
                      pointHitRadius: 10,
                      data: filterFinancialsForEPS(this.props.financials)
                  }
              ]
          };

           const EPSoptions = {
               legend: {
                   labels: {
                       fontColor: "white",
                   }
               },
              scales: {
                  yAxes: [{
                      ticks: {
                          fontColor: 'white',
                          beginAtZero: true,
                          callback: (value) => {
                              return format('CAD', value);
                          }
                      }
                  }],
                  xAxes: [{
                      ticks: {
                          fontColor: 'white',
                      }
                  }]
              },
          };

          const PieData = {
              datasets: [{
                  data: filterBalanceForPie(this.props.balanceSheet),
                  backgroundColor: [
                      '#FF6384',
                      '#4BC0C0',
                      '#FFCE56',
                      '#E7E9ED',
                      '#36A2EB'
                  ],
                  label: 'My dataset' // for legend
              }],
              labels: [
                  'Cash and cash equivalents',
                  'Total Debt',
                  'Total assets',
                  'Total shareholders equity',
                  'Retained earnings (deficit)'
              ]
          };
          const Cfdata = {
             labels: filterCashflowForDate(this.props.cashflow),
             datasets: [
                 {
                     label: 'Net Cashflow',
                     lineTension: 0.1,
                     backgroundColor: 'rgba(75,192,192,0.4)',
                     borderColor: 'rgba(75,192,192,1)',
                     borderCapStyle: 'butt',
                     borderDash: [],
                     borderDashOffset: 0.0,
                     borderJoinStyle: 'miter',
                     pointBorderColor: 'rgba(75,192,192,1)',
                     pointBackgroundColor: '#fff',
                     pointBorderWidth: 1,
                     pointHoverRadius: 5,
                     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                     pointHoverBorderColor: 'rgba(220,220,220,1)',
                     pointHoverBorderWidth: 2,
                     pointHitRadius: 10,
                     data: filterCashflowForNetcashflow(this.props.cashflow)
                 },
                 {
                     label: 'Free Cashflow',
                     lineTension: 0.1,
                     backgroundColor: 'black',
                     borderColor: 'rgba(75,192,192,1)',
                     borderCapStyle: 'butt',
                     borderDash: [],
                     borderDashOffset: 0.0,
                     borderJoinStyle: 'miter',
                     pointBorderColor: 'rgba(75,192,192,1)',
                     pointBackgroundColor: '#fff',
                     pointBorderWidth: 1,
                     pointHoverRadius: 5,
                     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                     pointHoverBorderColor: 'rgba(220,220,220,1)',
                     pointHoverBorderWidth: 2,
                     pointHitRadius: 10,
                     data: filterFreeCashflowForNetcashflow(this.props.cashflow)
                 },
                 {
                     label: 'Capital Expenditure',
                     lineTension: 0.1,
                     backgroundColor: 'red',
                     borderColor: 'rgba(75,192,192,1)',
                     borderCapStyle: 'butt',
                     borderDash: [],
                     borderDashOffset: 0.0,
                     borderJoinStyle: 'miter',
                     pointBorderColor: 'rgba(75,192,192,1)',
                     pointBackgroundColor: '#fff',
                     pointBorderWidth: 1,
                     pointHoverRadius: 5,
                     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                     pointHoverBorderColor: 'rgba(220,220,220,1)',
                     pointHoverBorderWidth: 2,
                     pointHitRadius: 10,
                     data: filterCapitalExpenditure(this.props.cashflow)
                 }
             ]
         };
          const Cfoptions = {
              legend: {
                  labels: {
                      fontColor: "white",
                  }
              },
             scales: {
                 yAxes: [{
                     fontColor: 'white',
                     ticks: {
                         beginAtZero: true,
                         callback: (value) => {
                             return format('CAD', value);
                         }
                     }
                 }],
                 xAxes: [{
                     ticks: {
                         fontColor: 'white',
                     }
                 }]
             },
         };

         const CMRdata = {
           datasets: [{
                data: [
                  this.props.rating?this.props.rating.ratingDetails['P/B'].score:"",
                  this.props.rating?this.props.rating.ratingDetails.ROA.score:"",
                  this.props.rating?this.props.rating.ratingDetails.DCF.score:"",
                  this.props.rating?this.props.rating.ratingDetails['P/E'].score:"",
                  this.props.rating?this.props.rating.ratingDetails.ROE.score:"",
                  this.props.rating?this.props.rating.ratingDetails['D/E'].score:""
                ],
                backgroundColor: [
                  '#FF6384',
                  '#4BC0C0',
                  '#FFCE56',
                  '#E7E9ED',
                  '#36A2EB',
                  '#B8860B'
                ],
                label: 'Company Rating' // for legend
                }],
                labels: [
                  'P/B',
                  'ROA',
                  'DCF',
                  'P/E',
                  'ROE',
                  'D/E'
                ]
        };
          return (

              <div className="abc">
                 <section>
                     <form className="formTest">
                    <input type="text" id="searchName" placeholder="Enter in stock symbol."
                           onChange={evt => {this.setState({...this.state, ticker: evt.target.value.toUpperCase()})}}/>
                    <input type="button" id="submitBtn" value="Submit" onClick={this.update}/>
                  </form>

              </section>
                  {/*JSON.stringify(this.props.dcf, null, 2)*/}




                  <Card className="defaultcard summary">
                    <h1>Executive Summary</h1>
                    <Card.Img variant="top" className="logo" src={this.props.profile? this.props.profile.profile.image: ""} />
                    <Card.Body>
                      <Card.Title className="title">
                      {this.props.profile? this.props.profile.profile.companyName: ""}

                      </Card.Title>

                      <Card.Text className="description">
                      <br />
                      {this.props.profile? "Price : $" + this.props.profile.profile.price: ""}
                      {this.props.quote && this.props.quote.change > 0? <span class="fa fa-caret-up"></span> : <span class="fa fa-caret-down"></span>}
                      {this.props.quote? "  "+this.props.quote.change +"(" +this.props.quote.changesPercentage + ")":""}
                      <br />
                      {this.props.profile? "Market Cap: " + this.props.profile.profile.mktCap: ""}
                      <br />
                        {this.props.profile? this.props.profile.profile.description: ""}
                        <br />
                        {this.props.profile? "CEO : " + this.props.profile.profile.ceo: ""}
                        <br />
                        {this.props.profile? "Industry : " + this.props.profile.profile.industry: ""}

                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Card style={{ width: '84%',borderColor:'red' , margin:'2%',marginLeft:'10%'}}>
                      <Card.Body>
                          <Card.Title>Financial Strength</Card.Title>
                          <table>
                              {}
                              {
                                  _.map(this.props.financialStrengthRatio, (data) => {
                                      return (
                                          <tr>
                                              <td>{data.key}</td>
                                              <td>{data.value}</td>
                                          </tr>
                                      )

                                  })}
                          </table>

                      </Card.Body>
                  </Card>

                  <Card style={{ width: '84%',borderColor:'red' , margin:'2%',marginLeft:'10%'}}>
                      <Card.Body>
                          <Card.Title>Profitability</Card.Title>
                          <table>
                              {}
                              {
                                  _.map(this.props.profitabilityRank, (data) => {
                                      return (
                                          <tr>
                                              <td>{data.key}</td>
                                              <td>{data.value}</td>
                                          </tr>
                                      )

                                  })}
                          </table>

                      </Card.Body>
                  </Card>



                  <Card className="defaultcard Growth">
                      <Card.Body>
                          <Card.Title className="title">
                              Financial Growth
                          </Card.Title>
                          <Card.Text className="description">
                              <div className="firstgraph">
                              <Bar data={Revdata} options={Revoptions}/>
                              </div>
                              <Line data={EPSdata} options={EPSoptions} />

                          </Card.Text>
                      </Card.Body>
                  </Card>

                  <Card className="defaultcard Growth">
                      <Card.Body>
                          <Card.Title className="title">
                              Financials Contd.
                          </Card.Title>
                          <Card.Text className="description">
                          <div className="thirdgraph">
                          <Bar data={Cfdata} options={Cfoptions}/>
                          </div>
                          <Pie data={PieData}/>

                          </Card.Text>
                      </Card.Body>
                  </Card>

                  <Card className="defaultcard Growth">
                      <Card.Body>
                          <Card.Title className="title">
                              Metrics Rating
                          </Card.Title>
                          <Card.Text className="description">

                          <Polar data={CMRdata} />

                          <div>Score: {this.props.rating ? this.props.rating.rating.score : ''}</div>
                          <div>Rating: {this.props.rating ? this.props.rating.rating.rating : ''}</div>
                          <div>Recommendation: {this.props.rating ? this.props.rating.rating.recommendation : ''}</div>
                          </Card.Text>
                      </Card.Body>
                  </Card>


                  <hr />
                  <div className="dcf">

                  <Card style={{ width: '120rem' ,borderColor:'red'}}>
                    <Card.Body>
                      <Card.Title>Fair Value</Card.Title>
                      {this.props.profile? <ProgressBar now={100} label={`Market Price: ${"$ "+this.props.profile.profile.price}`} />: ""}
                      {this.props.dcf? <ProgressBar now={100} label={`Fair Value: ${"$ "+this.props.dcf.dcf}`} />: ""}

                      <div style={{ fontSize:'large'}}>Price to Book Ratio: {this.props.valuationRatio ? this.props.valuationRatio[0].value : ''}</div>
                        <div style={{ fontSize:'large'}}>Price to Earnings Ratio: {this.props.valuationRatio ? this.props.valuationRatio[1].value : ''}</div>
                        <div style={{ fontSize:'large'}}>Enterprise Value Multiple: {this.props.valuationRatio ? this.props.valuationRatio[2].value : ''}</div>
                    </Card.Body>
                  </Card>

              </div>

                  { this.state.ticker ?
                      <TradingViewWidget theme={Themes.DARK} symbol={this.state.ticker}/>
                      : ''
                  }

              </div>
          );
      }
  }
}

const mapDispatchToProps = {
    getProfile,
    getPrice,
    getDcf,
    setTicker,
    getQuote,
    getFinancialratio,
    getFinancialGrowth,
    getRating,
    getHistoricalPrices,
    getKeyRatios,
    getFinancialStatements,
    getCashflow,
    getFreeCashflow,
    getCapitalExpenditure,
    getCompanyRating,
    getBalanceSheet,
    getProfitabilityRank
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
