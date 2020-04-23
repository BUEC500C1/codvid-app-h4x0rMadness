import React, {Component} from "react";
import {Text, View} from "react-native";

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