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
