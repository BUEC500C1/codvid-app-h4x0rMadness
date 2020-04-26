import React, { Component } from 'react';
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
        }
    }
    get_info(name) {
        //https://api.covid19api.com/total/country/china
        console.log("parse in info: " + name);
        fetch("https://api.covid19api.com/total/country/" + name)
            .then((response) => response.json())
            .then(responseJson => {
                if (responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]) {
                    this.setState({
                        Confirmed: responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Confirmed'].toString(),
                        Deaths: responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Deaths'].toString(),
                        Recovered: responseJson[Object.keys(responseJson)[Object.keys(responseJson).length - 1]]['Recovered'].toString(),
                    });
                }
            });
    }
    
    fetch_markers() {
        //if(this.state.markers) this.state.markers.pop();
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
            
    }
    
    get_country(lat, lon) {
        //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&result_type=country&key=YOURAPIKEY")
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson);
                console.log(responseJson['results']['formatted_address']);
                if(responseJson)
                    this.setState({
                        countryname: responseJson['results']['formatted_address']
                    })
            });
        console.log(this.state.countryname);
    }
    _onMarkerPress (mkr) {
        //console.log("if worked..."+mkr.Marker.title);
        var res = mkr.nativeEvent.coordinate;
        console.log("lat" +res['latitude']+"lon"+res['longitude']);
        this.get_country(res['latitude'],res['longitude']);
        console.log(this.state.countryname);
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
        return (
            <View
                style={{position: 'absolute', top: 700, left: 0, right: 0, bottom: 0, justifyContent: 'center',
                    alignItems: 'center' }}>
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

