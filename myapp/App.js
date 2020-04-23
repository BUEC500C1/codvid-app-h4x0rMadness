import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import MapCircle from "react-native-maps/lib/components/MapCircle";
import MapMarker from "react-native-maps/lib/components/MapMarker";
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
class Covid_Info_Init extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json_data: data,
            TotalConfirmed: '',
            TotalDeaths: '',
            Date: '',
        }
    }
    componentDidMount() {

    }
    renderMarkers() {
        return this.state.json_data.map((country,i) =>{
            return (
                <Marker
                    key = {i}
                    coordinate={{latitude: country.CapitalLatitude, longitude: country.CapitalLongitude}}
                    title={country.CountryName}
                    description="Current Cases: "
                    pinColor={'#99001d'}
                />
            )
        })
    }
    render() {
        return this.renderMarkers()
    }

}

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
                console.log(this.state.jsondata);
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
//class NameForm extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {value: ''};
//
//        this.handleChange = this.handleChange.bind(this);
//        this.handleSubmit = this.handleSubmit.bind(this);
//    }
//
//    handleChange(event) {
//        this.setState({value: event.target.value});
//    }
//
//    handleSubmit(event) {
//        alert('提交的名字: ' + this.state.value);
//        event.preventDefault();
//    }
//
//    render() {
//        return (
//            <form onSubmit={this.handleSubmit}>
//                <input type=”text” name=”email” />
//            </form>
//        );
//    }
//}
export default class App extends Component {

    render() {

        return (

            <View style={{position: 'relative', height: "100%"}}>

                
                <MapView
                    style={styles.map}
                    mapType={"hybrid"}
                    maxZoomLevel={3}>
                    <Covid_Info_Init/>

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

