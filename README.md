# codvid-app-h4x0rMadness

a real-time app checking number of infected people within regions using React.

# Project Usage
## (this is a incomplete version, latest is in progress)

~~~
git clone https://github.com/BUEC500C1/codvid-app-h4x0rMadness.git
~~~

make sure you have react-native installed, then in the folder:
~~~
cd myadd/ios
pod install
~~~

make sure you have google geocoding api key and replace it in App.js
~~~
cd ..
react-native run-ios
~~~

# How to Reproduce 

## Step 1: [Setup your React Native environment](https://reactnative.dev/docs/environment-setup)
<p align="center">
  <img src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/1.jpg" width="40%">
</p>


## Step 2: Go through [React Native Tutorial](https://reactnative.dev/docs/tutorial) for "hello world"
<p align="center">
    <img src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/2.jpg" width="40%"/>
    <img src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/3.jpg" width="40%"/>
</p>

## Step 3: Develop use case to [display a map](https://github.com/react-native-community/react-native-maps)
<p align="center">
    <img title="Apple Map Version" src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/4.jpg" width="40%"/>
  
</p>
<p align="center">
    Apple Map Version
</p>



## Step 4: Using [Covid-19 API](https://covid19api.com/) to display data in application as text

## Step 5: Overlay the data on the maps
(Changed to *hybrid* map mode)
<p align="center">
    <img title="Apple Map Version" src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/5.jpg" width="40%"/>
</p>

<p align="center">
    Display markers for each country with the geo coordinates of its capital.
</p>

<p align="center">
    <img title="Apple Map Version" src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/6.jpg" width="40%"/>
</p>

<p align="center">
    Lay data with this format of view.
</p>

<p align="center">
    <img title="Apple Map Version" src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/7.jpg" width="40%"/>
</p>
<p align="center">
    Communicating with Covid API and get back data (refreshed in-time data) when pressed.
</p>
<p align="center">
    <img src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/8.jpg" width="40%"/>
    <img src="https://github.com/BUEC500C1/codvid-app-h4x0rMadness/blob/master/images/9.jpg" width="40%"/>
</p>
<p align="center">
    When the marker on map is clicked, the updated data will be displayed.
</p>
