import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import MapCircle from "react-native-maps/lib/components/MapCircle";
import MapMarker from "react-native-maps/lib/components/MapMarker";
import data from "./countries";

class Covid_Info_Init extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            country_name_json: data,
            TotalConfirmed: '',
            TotalDeaths: '',
            StartDate: '2000-01-01T00:00:00.000Z',
            EndDate: '',
            summary_json: '',
            CountriesJson: '',
            localConfirmed: '',
            localDeaths: '',
            localRecovered: '',
            globalConfirmed: '',
            globalDeaths: '',
            globalRecovered: '',
            random: '',
        }
    }
    componentDidMount() {
        this.renderMarkers();
        let newDate = new Date();
        this.state.EndDate = newDate.toISOString();
        fetch('https://api.covid19api.com/summary')
            .then((response) => response.json())
            .then(responseJson => {
                this.setState({
                        summary_json: responseJson,
                        globalConfirmed: responseJson['Global']['TotalConfirmed'],
                        globalDeath: responseJson['Global']['TotalDeaths'],
                        globalRecovered: responseJson['Global']['TotalRecovered'],
                    },
                    function(){}
                );
                console.log(this.state.globalConfirmed+','+this.state.globalDeath+','+this.state.globalRecovered);
            })
            .catch(error => {
                console.error(error);
            });
    }
    //https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
    //https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
    //https://api.covid19api.com/country/south-africa
    get_info(name) {
        //const link = "https://api.covid19api.com/country/" + name;
        var c = 0, d = 0, r = 0;
        var a = fetch("https://api.covid19api.com/country/" + name)
            .then((response) => response.json())
            .then(responseJson => {
                if (responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]) {
                    return [responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Confirmed'],
                    responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Deaths'],
                    responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Recovered']];
                }
            });
        console.log(typeof(a));
        return [c,d,r];
    }
    renderMarkers() {
        return data.map((country,i) =>{
            const a = this.get_info(country.CountryName);
            
            return (
                <Marker
                    key = {i}
                    coordinate={{latitude: country.CapitalLatitude, longitude: country.CapitalLongitude}}
                    title={country.CountryName}
                    description={"Confirmed: " + a[0] + " Deaths: "  +
                                " Recovered: " }
                    pinColor={'#99001d'}
                />
            )
        })
        
    }
    
    
    render() {
        return this.renderMarkers();
    }
}

class Display_Markers extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            Confirmed:  '',
            Deaths:     '',
            Recovered:  '',
        }
    }

    componentDidMount() {
        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState({
                isShowingText: !this.state.isShowingText
            });
        }, 1000);
    }
    get_info(name) {
        fetch("https://api.covid19api.com/country/" + name)
            .then((response) => response.json())
            .then(responseJson => {
                if (responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]) {
                    this.state.Confirmed = responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Confirmed'].toString();
                    this.state.Deaths = responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Deaths'].toString();
                    this.state.Recovered = responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Recovered'].toString();
                }
            });
        
        
    }
    
    renderMarkers()
    {
        return data.map((country, i) => {
            return (
                <Marker
                    key={i}
                    coordinate={{latitude: country.CapitalLatitude, longitude: country.CapitalLongitude}}
                    title={country.CountryName}
                    description={"Confirmed: " + this.state.Confirmed + " " +
                                 "Deaths: "    + this.state.Deaths + " " +
                                "Recovered: " + this.state.Recovered}
                    pinColor={'#99001d'}
                    onPress={e => {
                        console.log(country.CountryName + " is pressed");
                        console.log(this.state.Confirmed);
                        this.get_info(country.CountryName);
                        
                    }}
                />
            )
        })

    }
    render() {
        return this.renderMarkers();
    }
}
export default class App extends Component {
    
    render() {
        
        return (
            <View style={{position: 'relative', height: "100%"}}>


                <MapView
                    style={styles.map}
                    mapType={"hybrid"}
                    maxZoomLevel={3}>
                    <Display_Markers/>

                </MapView>
                
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        width: "100%",
        height: "100%",
        zIndex: -1
    }
});

