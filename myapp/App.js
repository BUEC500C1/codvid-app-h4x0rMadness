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
                style={{position: 'absolute', top: 700, left: 0, right: 0, bottom: 0, justifyContent: 'center',
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

