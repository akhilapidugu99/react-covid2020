import React, { Component } from 'react';
import axios from'axios';
import state from './State.js';
import StateComponent from './SearchComponent.jsx';
import SearchComponent from './StateComponent.jsx';
class HomeComponent extends Component {
    constructor()
    {
        super();
        this.state={
            state_Covid_Data:[],
            display_gData:[],
            total_Active:0,
            total_Confirmed:0,
            total_Recovered:0,
            total_Deceased:0
        }
    }
    componentDidMount=()=>{
        let total_Active=0;
        let total_Confirmed=0;
        let total_Recovered=0;
        let total_Deceased=0;
        axios.get('https://api.covid19india.org/state_district_wise.json')
        .then((response)=>{
        let covid_Data=response.data;
        let state_Covid_Data=[];
            state_Covid_Data=state.map((stateName)=>{
                let district_Data=Object.values(covid_Data[stateName]['districtData']);
                let active_Cases=district_Data.reduce((previous,data)=>previous+data.active,0);
                total_Active+=active_Cases;
                let confirmed_Cases=district_Data.reduce((previous,data)=>previous+data.confirmed,0);
                total_Confirmed+=confirmed_Cases;
                let recovered_Cases=district_Data.reduce((previous,data)=>previous+data.recovered,0);
                total_Recovered+=recovered_Cases;
                let deceased_Cases=district_Data.reduce((previous,data)=>previous+data.deceased,0);
                total_Deceased+=deceased_Cases;
                let recovery_Rate=recovered_Cases/active_Cases;
                let stateInfo={
                    stateName:stateName,
                    active_Cases:active_Cases,
                    confirmed_Cases:confirmed_Cases,
                    recovered_Cases:recovered_Cases,
                    deceased_Cases:deceased_Cases,
                    recovery_Rate:recovery_Rate
                }
                return stateInfo;
            });
           state_Covid_Data.sort((data1,data2)=>data1.recovery_Rate-data2.recovery_Rate);
            this.setState({
                state_Covid_Data:[...state_Covid_Data],
                display_Data:[...state_Covid_Data],
                total_Active:total_Active,
                total_Confirmed:total_Confirmed,
                total_Recovered:total_Recovered,
                total_Deceased:total_Deceased
            });
        })
        .catch((error)=>console.log(error));
    }

    render() {
        return (
            <div>
                <h1>India covid cases</h1>
                <SearchComponent/>
                <StateComponent />
            </div>
        );
    }
}
export default HomeComponent;