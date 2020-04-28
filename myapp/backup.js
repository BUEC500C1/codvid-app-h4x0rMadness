import React, {Component} from "react";
import {Text, View} from "react-native";
import {Marker} from "react-native-maps";
import data from "./countries";

class Blink extends Component {
    // 声明state对象
    state = { isShowingText: true };

    componentDidMount() {
        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState({
                isShowingText: !this.state.isShowingText
            });
        }, 1000);
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        if (!this.state.isShowingText) {
            return null;
        }

        return (
            <View style={{position: 'absolute', top: 800, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Centered text</Text>
            </View>
            //<Text>{this.props.text}</Text>
        );
    }
}


<Blink text='I love to blink' />
<Blink text='Yes blinking is so great' />
<Blink text='Why did they ever take this out of HTML' />
<Blink text='Look at me look at me look at me' />
    
    class Get_data extends Component {
        constructor(props){
            super(props);
            this.state = {
                TotalConfirmed: '',
                TotalDeaths: '',
                Date: '',
            };
        }

        componentDidMount() {
            fetch('https://api.covid19api.com/summary')
                .then((response) => response.json())
                .then(responseJson => {
                    this.setState({
                            TotalConfirmed: responseJson['Countries'][235]['TotalConfirmed'],
                            TotalDeaths: responseJson['Countries'][235]['TotalDeaths'],
                            Date: responseJson['Countries'][235]['Date'],
                        },
                        function(){}
                    );

                })
                .catch(error => {
                    console.error(error);
                });
        }
        //<Text style = {style.text}>Total Confirmed Cases: {this.state.TotalConfirmed}</Text>
        render(){

            return(

                <Marker
                    coordinate={{latitude: 38, longitude: -122}}
                    title={this.state.TotalConfirmed.toString() + "my dude!"}
                    description="this is a marker example"
                    pinColor={'#990300'}
                />
            )
        }
    }

//renderMarkers()
//{
//    return data.map((country, i) => {
//        return (
//            <Marker
//                key={i}
//                coordinate={{latitude: country.CapitalLatitude, longitude: country.CapitalLongitude}}
//                title={country.CountryName}
//                description= ''
//                pinColor={'#99001d'}
//                
//                onPress={
//                    
//                    //this.__onMarkerPress.bind()
//                   
//                        //this.get_info(country.CountryName);
//                        //console.log(country.CountryName + " "+"Confirmed: " + this.state.Confirmed + " " +"Deaths: "
//                        //    + this.state.Deaths + " " +"Recovered: " + this.state.Recovered);
//                        //this.get_info(country.CountryName);
//                        //this.forceUpdate();
//                        //this.state.isClicked =  true;
//                    
//                >/}
//            />
//            //<Display_Data c={this.state.Confirmed} d={this.state.Deaths} r={this.state.Recovered}/>]
//        )
//    })
//
//}

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
////////

import React, { Component, useState } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import MapCircle from "react-native-maps/lib/components/MapCircle";
import MapMarker from "react-native-maps/lib/components/MapMarker";
import data from "./countries";
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

class Display_Markers extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            countryname: '',
            markers: [],
            Confirmed:  '',
            Deaths:     '',
            Recovered:  '',
            lat: '',
            lon: '',
        }
    }
    reduce_markers() {
        var subarr = [];
        for(var i = 0; i < this.state.markers.length && i < 420; i++){
            subarr[i] = this.state.markers[i];
        }
        this.setState({
            markers: subarr,
        });
    }

    get_info(name) {
        //https://api.covid19api.com/total/country/china
        console.log("parse in info: " + name);
        fetch("https://api.covid19api.com/total/country/" + name)
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson);

                if (responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]) {
                    this.setState({
                        Confirmed: responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Confirmed'],
                        Deaths: responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Deaths'],
                        Recovered: responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Recovered'],
                    });
                }
            });
    }

    fetch_markers() {
        //this.state.markers = [];
        for(var i = 0; i < Object.keys(data).length - 1; i++){
            var item = data[i];
            var marker = <Marker
                key = {i}
                coordinate={{latitude: item.CapitalLatitude, longitude: item.CapitalLongitude}}
                title={item.CountryName}
                pinColor={'#99001d'}
                onPress={this._onMarkerPress.bind(this)}
            />;
            this.state.markers.push(marker);

        }
        console.log("len of array: "+this.state.markers.length)

    }

    get_country(lat, lon) {
        //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
        //https://maps.googleapis.com/maps/api/geocode/json?latlng=45,-75&key=AIzaSyD3KeUMIqlikl0HLvhqojXGOZ6e6EfLDdg
        //"https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&result_type=country&key=AIzaSyD3KeUMIqlikl0HLvhqojXGOZ6e6EfLDdg"
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&result_type=country&key=AIzaSyD3KeUMIqlikl0HLvhqojXGOZ6e6EfLDdg"
        )
            .then((response) => response.json())
            .then(responseJson => {
                //console.log("lethal legal name: " +JSON.stringify(responseJson.results["0"]["formatted_address"]))
                this.setState({
                    countryname: JSON.stringify(responseJson.results["0"]["formatted_address"])
                });

            });
        console.log("lmc"+this.state.countryname);
    }
    _onMarkerPress (mkr) {
        //console.log("if worked..."+mkr.Marker.title);
        //this.reduce_markers();
        var res = mkr.nativeEvent.coordinate;
        console.log("lat " +res['latitude']+" lon "+res['longitude']);

        this.get_country(res['latitude'],res['longitude']);
        console.log("countryname: "+this.state.countryname);
        var substr = this.state.countryname.substring(1, this.state.countryname.length - 1);
        this.state.countryname= substr;

        if(this.state.countryname)
            this.get_info(this.state.countryname);
        this.state.markers.push(
            <Display_Data
                c={this.state.Confirmed}
                d={this.state.Deaths}
                r={this.state.Recovered}
                name={this.state.countryname}
            />
        );
        console.log("type: " + typeof(this.state.countryname))
        this.forceUpdate();

    }
    render() {
        this.fetch_markers();
        return (
            this.state.markers

        )


    }
}
class Display_Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country:    this.props.name,
            confirmed:  this.props.c,
            deaths:     this.props.d,
            recovered:  this.props.r,
        }    ;
        //console.log("c" + this.props.c)
    }
    render() {
        console.log("c in dd: " + this.state.confirmed);
        return (
            <View
                style={{position: 'absolute', top: 500, left: 0, right: 0, bottom: 0, justifyContent: 'center',
                    alignItems: 'flex-start' }}>
                <Text style={{fontSize: 20, color: 'white'}}>
                    Country:  {this.state.country}
                </Text>
                <Text style={{fontSize: 20, color: 'white'}}>
                    Confirmed:  {this.state.confirmed}
                </Text>
                <Text style={{fontSize: 20, color: 'white'}}>
                    Deaths:  {this.state.deaths}
                </Text>
                <Text style={{fontSize: 20, color: 'white'}}>
                    Recovered:  {this.state.recovered}
                </Text>
            </View>
        );
    }
}
class Total_Summary extends Component {
    constructor() {
        super();
        this.state = {
            confirmed: '',
            deaths: '',
            recovered: '',
        }
    }
    componentDidMount() {
        //https://api.covid19api.com/summary
        fetch("https://api.covid19api.com/summary")
            .then((response) => response.json())
            .then(responseJson => {
                if (responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]) {
                    this.setState({
                        confirmed: responseJson['Global']['TotalConfirmed'],
                        deaths: responseJson['Global']['TotalDeaths'],
                        recovered: responseJson['Global']['TotalRecovered'],
                    });
                }
            });
    }
    render() {
        return (
            <View
                style={{position: 'absolute', top: 700, left: 0, right: 0, bottom: 0, justifyContent: 'center',
                    alignItems: 'flex-start' }}>
                <Text style={{fontSize: 20, color: 'white'}}>
                    Total Confirmed:  {this.state.confirmed}
                </Text>
                <Text style={{fontSize: 20, color: 'white'}}>
                    Total Deaths:         {this.state.deaths}
                </Text>
                <Text style={{fontSize: 20, color: 'white'}}>
                    Total Recovered:  {this.state.recovered}
                </Text>
            </View>
        )
    }
}
class Date_Picker extends Component {
    constructor() {
        super();
        const [date, setDate] = useState(new Date());

    }
    componentDidMount() {
    }

    render() {
        return (
            <DatePicker
                showCaption={true}
                dateConfig={this.dateConfig}
            />
        );
    }

}
export default class App extends Component {
    constructor() {
        super();


    }
    render() {
        return (

            <View style={{position: 'relative', height: "100%"}}>


                <MapView
                    style={styles.map}
                    mapType={"hybrid"}
                    maxZoomLevel={3}>
                    <Total_Summary/>
                    <Display_Markers/>



                </MapView>


            </View>

        );
    }
}

