import React, { Component, useState } from 'react';
import { DatePickerIOS, View, Platform, StyleSheet, Text } from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import data from "./countries";
import DatePicker from 'react-native-datepicker';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 50,
        padding:16,
        zIndex: 0,
    },
    //container: {
    //    ...StyleSheet.absoluteFillObject,
    //},
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
        this.state = {date: "02-02-2020"}

    }
    
    render() {
        console.log(new Date());
        return (
            <View>
                <DatePicker
                    style={{width: 500}}
                    date={this.state.date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    format="DD-MM-YYYY"
                    minDate="01-01-2000"
                    maxDate="01-01-2001"
                    confirmBtnText="Select"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 10,
                            top: 750,
                            marginLeft: 2
                        },
                        dateInput: {
                            marginLeft: 100
                        }
                    }}
                    //onDateChange={(date) => {this.setState({date: date})}}
                />
            </View>
        )
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

                    

                    

                    <Total_Summary/>
                    <Display_Markers/>
                    
                    <Date_Picker/>
                </MapView>
                
                
            </View>
            
        );
    }
}

