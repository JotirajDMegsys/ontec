// import React, {useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
//   Pressable,
//   FlatList
// } from 'react-native';
// import {ScrollView, Animated} from 'react-native';
// import {SandtoneHome} from '../../utils/SandtoneHome';
// import BackNavigation from '../../components/backNavigation';
// import {BarChart, ProgressChart, GaugeChart} from 'react-native-chart-kit';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import Swiper from 'react-native-swiper';
// import leftArrow from "../../assets/dashbordLeftArrow.png"
// import rightArrow from "../../assets/dashbordRightArrow.png"
// import lightArrow from "../../assets/lighticon.png"
// import airArrow from "../../assets/airicon.png"
// import waterArrow from "../../assets/watericon.png"
// import dashRight from "../../assets/dashProRight.png"
// import dashLeft from "../../assets/dashProLeft.png"
// import Home from '../../assets/FillHomeImage.png';
// import { Toast } from 'react-native-toast-notifications';

// //  images
// import electricity from '../../assets/electricity/electricityIcon.png';
// import arrow from '../../assets/RightArrow.png';
// import Bottom from '../../components/Bottom';
// import { COMPANY_ID } from '../../helpers/enum';
// import {getConsumptionMasters, getConsumptionData} from '../../redux/slice/getConsumptionMaster';
// import {useDispatch, useSelector} from 'react-redux';
// import Shimmer from '../../utils/Shimmer';
// import {useFocusEffect} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Dimensions } from "react-native";
// import { current } from '@reduxjs/toolkit';
// import { COLOR_LIST } from '../../helpers/colorlist';
// import { UTILITY } from '../../helpers/meterData';
// import { getColorByConsumption, getWidthByScreenSize } from '../../helpers/commonFunction';
// import { Alert } from 'react-native';
// import { WebView } from 'react-native-webview';

// export const Consumption = ({route}) => {
//   const screenWidth = Dimensions.get("window").width;
//   const cycle = {1:'Today', 2: 'This Week', 3: 'This Month', 4: 'This Year'} // To display inside circular progress
//   const dispatch = useDispatch();
//   const {
//     getConsumptionMasterIsLoading,
//     getConsumptionMasterData,
//     getConsumptionMasterIsSuccess,
//     getConsumptionMasterIsError,
//     getConsumptionDashboardIsLoading,
//     getConsumptionDashboardData,
//     getConsumptionDashboardIsSuccess,
//     getConsumptionDashboardIsError,
//     getConsumptionLineXData,
//     getConsumptionLineYData,
//     consumptionProgressData
//   } = useSelector(state => ({
//     getConsumptionMasterIsLoading: state.consumptionData.getConsumptionMasterIsLoading,
//     getConsumptionMasterData:state.consumptionData.getConsumptionMasterData,
//     getConsumptionMasterIsSuccess: state.consumptionData.getConsumptionMasterIsSuccess,
//     getConsumptionMasterIsError: state.consumptionData.getConsumptionMasterIsError,

//     getConsumptionDashboardIsLoading: state.consumptionData.getConsumptionDashboardIsLoading,
//     getConsumptionDashboardData:state.consumptionData.getConsumptionDashboardData,
//     getConsumptionDashboardIsSuccess: state.consumptionData.getConsumptionDashboardIsSuccess,
//     getConsumptionDashboardIsError: state.consumptionData.getConsumptionDashboardIsError,
//     getConsumptionLineXData: state.consumptionData.getConsumptionLineXData,
//     getConsumptionLineYData: state.consumptionData.getConsumptionLineYData,
//     consumptionProgressData: state.consumptionData.consumptionProgressData,
//   }));
//   const [viewMode, setViewMode] = useState('daily');
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [data, setData] = useState({
//     labels: [],
//     datasets: [{ data: [] }],
//   });
//   const [hourlyData, setHourlyData] = useState([]);
//   const [selectedHourlyData, setSelectedHourlyData] = useState([]);

//   const [noDataFound, setNoDataFound] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const onRefresh = () => {
//     setNoDataFound(false);
//     setRefreshing(true);
//     getMasters();
//     // Simulate a refresh action (e.g., fetch new data)
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000); // Simulating a 2-second refresh process
//   };

// //forDrillDown
// const webViewRef = useRef(null);

// const handleNavigation = (event) => {
//   const { url } = event;
//   if (url === 'about:blank') {
//     return; // Ignore initial WebView load
//   }
//   if (url === 'goBack://') {
//     // Handle go back action
//     webViewRef.current.goBack();
//   }
// };

// const [consumptiondataForWeekly,setConsumptiondataForWeekly]= useState([]);

// const jsonData = {

//     "days": [
//       {
//         "day": "Mon",
//         "data": [
//           // {"label": "Mon.", "value": 25.793},
//           {"label": "0", "value": 0.06},
//           {"label": "1", "value": 0.175},
//           {"label": "2", "value": 1.427},
//           {"label": "3", "value": 0.145},
//           {"label": "4", "value": 0.155},
//           {"label": "5", "value": 0.969},
//           {"label": "6", "value": 2.199},
//           {"label": "7", "value": 2.214},
//           {"label": "8", "value": 2.24},
//           {"label": "9", "value": 2.278},
//           {"label": "10", "value": 0.803},
//           {"label": "11", "value": 0.841},
//           {"label": "12", "value": 1.075},
//           {"label": "13", "value": 0.536},
//           {"label": "14", "value": 1.427},
//           {"label": "15", "value": 0.332},
//           {"label": "16", "value": 0.162},
//           {"label": "17", "value": 0.408},
//           {"label": "18", "value": 0.787},
//           {"label": "19", "value": 1.315},
//           {"label": "20", "value": 2.031},
//           {"label": "21", "value": 0.6},
//           {"label": "22", "value": 0.632},
//           {"label": "23", "value": 0.63},

//         ]
//       },
//       {
//         "day": "Tue",
//         "data": [
//           // {"label": "Mon.", "value": 25.793},
//           {"label": "0", "value": 0.06},
//           {"label": "1", "value": 0.175},
//           {"label": "2", "value": 1.427},
//           {"label": "3", "value": 0.145},
//           {"label": "4", "value": 0.155},
//           {"label": "5", "value": 0.969},
//           {"label": "6", "value": 2.199},
//           {"label": "7", "value": 2.214},
//           {"label": "8", "value": 2.24},
//           {"label": "9", "value": 2.278},
//           {"label": "10", "value": 0.803},
//           {"label": "11", "value": 0.841},
//           {"label": "12", "value": 1.075},
//           {"label": "13", "value": 0.536},
//           {"label": "14", "value": 1.427},
//           {"label": "15", "value": 0.332},
//           {"label": "16", "value": 0.162},
//           {"label": "17", "value": 0.408},
//           {"label": "18", "value": 0.787},
//           {"label": "19", "value": 1.315},
//           {"label": "20", "value": 2.031},
//           {"label": "21", "value": 0.6},
//           {"label": "22", "value": 0.632},
//           {"label": "23", "value": 0.63},

//         ]
//       },
//       {
//         "day": "Wed",
//         "data": [
//           // {"label": "Mon.", "value": 25.793},
//           {"label": "0", "value": 0.06},
//           {"label": "1", "value": 0.175},
//           {"label": "2", "value": 1.427},
//           {"label": "3", "value": 0.145},
//           {"label": "4", "value": 0.155},
//           {"label": "5", "value": 0.969},
//           {"label": "6", "value": 2.199},
//           {"label": "7", "value": 2.214},
//           {"label": "8", "value": 2.24},
//           {"label": "9", "value": 2.278},
//           {"label": "10", "value": 0.803},
//           {"label": "11", "value": 0.841},
//           {"label": "12", "value": 1.075},
//           {"label": "13", "value": 0.536},
//           {"label": "14", "value": 1.427},
//           {"label": "15", "value": 0.332},
//           {"label": "16", "value": 0.162},
//           {"label": "17", "value": 0.408},
//           {"label": "18", "value": 0.787},
//           {"label": "19", "value": 1.315},
//           {"label": "20", "value": 2.031},
//           {"label": "21", "value": 0.6},
//           {"label": "22", "value": 0.632},
//           {"label": "23", "value": 0.63},

//         ]
//       },
//       {
//         "day": "Thu",
//         "data": [
//           // {"label": "Mon.", "value": 25.793},
//           {"label": "0", "value": 0.06},
//           {"label": "1", "value": 0.175},
//           {"label": "2", "value": 1.427},
//           {"label": "3", "value": 0.145},
//           {"label": "4", "value": 0.155},
//           {"label": "5", "value": 0.969},
//           {"label": "6", "value": 2.199},
//           {"label": "7", "value": 2.214},
//           {"label": "8", "value": 2.24},
//           {"label": "9", "value": 2.278},
//           {"label": "10", "value": 0.803},
//           {"label": "11", "value": 0.841},
//           {"label": "12", "value": 1.075},
//           {"label": "13", "value": 0.536},
//           {"label": "14", "value": 1.427},
//           {"label": "15", "value": 0.332},
//           {"label": "16", "value": 0.162},
//           {"label": "17", "value": 0.408},
//           {"label": "18", "value": 0.787},
//           {"label": "19", "value": 1.315},
//           {"label": "20", "value": 2.031},
//           {"label": "21", "value": 0.6},
//           {"label": "22", "value": 0.632},
//           {"label": "23", "value": 0.63},

//         ]
//       },
//       {
//         "day": "Fri",
//         "data": [
//           // {"label": "Mon.", "value": 25.793},
//           {"label": "0", "value": 0.06},
//           {"label": "1", "value": 0.175},
//           {"label": "2", "value": 1.427},
//           {"label": "3", "value": 0.145},
//           {"label": "4", "value": 0.155},
//           {"label": "5", "value": 0.969},
//           {"label": "6", "value": 2.199},
//           {"label": "7", "value": 2.214},
//           {"label": "8", "value": 2.24},
//           {"label": "9", "value": 2.278},
//           {"label": "10", "value": 0.803},
//           {"label": "11", "value": 0.841},
//           {"label": "12", "value": 1.075},
//           {"label": "13", "value": 0.536},
//           {"label": "14", "value": 1.427},
//           {"label": "15", "value": 0.332},
//           {"label": "16", "value": 0.162},
//           {"label": "17", "value": 0.408},
//           {"label": "18", "value": 0.787},
//           {"label": "19", "value": 1.315},
//           {"label": "20", "value": 2.031},
//           {"label": "21", "value": 0.6},
//           {"label": "22", "value": 0.632},
//           {"label": "23", "value": 0.63},

//         ]
//       },
//       {
//         "day": "sat",
//         "data": [
//           // {"label": "Mon.", "value": 25.793},
//           {"label": "0", "value": 0.06},
//           {"label": "1", "value": 0.175},
//           {"label": "2", "value": 1.427},
//           {"label": "3", "value": 0.145},
//           {"label": "4", "value": 0.155},
//           {"label": "5", "value": 0.969},
//           {"label": "6", "value": 2.199},
//           {"label": "7", "value": 2.214},
//           {"label": "8", "value": 2.24},
//           {"label": "9", "value": 2.278},
//           {"label": "10", "value": 0.803},
//           {"label": "11", "value": 0.841},
//           {"label": "12", "value": 1.075},
//           {"label": "13", "value": 0.536},
//           {"label": "14", "value": 1.427},
//           {"label": "15", "value": 0.332},
//           {"label": "16", "value": 0.162},
//           {"label": "17", "value": 0.408},
//           {"label": "18", "value": 0.787},
//           {"label": "19", "value": 1.315},
//           {"label": "20", "value": 2.031},
//           {"label": "21", "value": 0.6},
//           {"label": "22", "value": 0.632},
//           {"label": "23", "value": 0.63},

//         ]
//       },
//       {
//         "day": "sun",
//         "data": [
//           // {"label": "Mon.", "value": 25.793},
//           {"label": "0", "value": 0.06},
//           {"label": "1", "value": 0.175},
//           {"label": "2", "value": 1.427},
//           {"label": "3", "value": 0.145},
//           {"label": "4", "value": 0.155},
//           {"label": "5", "value": 0.969},
//           {"label": "6", "value": 2.199},
//           {"label": "7", "value": 2.214},
//           {"label": "8", "value": 2.24},
//           {"label": "9", "value": 2.278},
//           {"label": "10", "value": 0.803},
//           {"label": "11", "value": 0.841},
//           {"label": "12", "value": 1.075},
//           {"label": "13", "value": 0.536},
//           {"label": "14", "value": 1.427},
//           {"label": "15", "value": 0.332},
//           {"label": "16", "value": 0.162},
//           {"label": "17", "value": 0.408},
//           {"label": "18", "value": 0.787},
//           {"label": "19", "value": 1.315},
//           {"label": "20", "value": 2.031},
//           {"label": "21", "value": 0.6},
//           {"label": "22", "value": 0.632},
//           {"label": "23", "value": 0.63},

//         ]
//       },
//       // {
//       //   "day": "Thursday",
//       //   "data": [
//       //     {"label": "Thu.", "value": 11.87},
//       //     {"label": "00:00", "value": 0.164},
//       //     {"label": "01:00", "value": 0.209},
//       //     {"label": "02:00", "value": 2.937},
//       //     {"label": "03:00", "value": 0.169},
//       //     {"label": "04:00", "value": 0.169},
//       //     {"label": "05:00", "value": 0.358},
//       //     {"label": "06:00", "value": 0.271},
//       //     {"label": "07:00", "value": 0.603},
//       //     {"label": "08:00", "value": 0.715},
//       //     {"label": "09:00", "value": 2.187},
//       //     {"label": "10:00", "value": 2.03},
//       //     {"label": "11:00", "value": 0.739},
//       //     {"label": "12:00", "value": 1.319},
//       //     {"label": "13:00", "value": 0.371},
//       //     {"label": "14:00", "value": 0.357},
//       //     {"label": "15:00", "value": 0.701},
//       //     {"label": "16:00", "value": 1.458},
//       //     {"label": "17:00", "value": 0.66},
//       //     {"label": "18:00", "value": 0.954},
//       //     {"label": "19:00", "value": 0.663},
//       //     {"label": "20:00", "value": 0.214},
//       //     {"label": "21:00", "value": 0.145},
//       //     {"label": "22:00", "value": 0.165},
//       //     {"label": "23:00", "value": 0.166}
//       //   ]
//       // },
//       // Repeat the structure for other days
//     ]

// };

// const linkedData = jsonData.days.map(dayData => ({
// id: dayData.day,
// linkedchart: {
//   chart: {
//     xAxisName: 'Hourly',
//     yAxisName: 'consumption',
//     theme: 'fusion',
//     valuePosition: 'top',
//     showValues: '1',
//     xAxisNameFontSize: '6',
//     yAxisNameFontSize: '6',
//     xAxisValueFontSize: '6',
//     yAxisValueFontSize: '8',
//     valueFontSize: '6',
//     xAxisLabelRotation: '90', // Set the rotation angle to 0 to keep the labels horizontal
//   },
//   data: dayData.data.map(dataPoint => ({
//     label: dataPoint.label,
//     value: dataPoint.value
//   }))
// }
// }));

// const chartConfig = {
// type: 'column2d',
// width: '100%',
// height: '100%',
// dataFormat: 'json',
// dataSource: {
//   chart: {
//     xAxisName: 'Weeks',
//     yAxisName: 'consumption',
//     theme: 'fusion',
//     valuePosition: 'top',
//     showValues: '1',
//     xAxisNameFontSize: '12',
//     yAxisNameFontSize: '8',
//     xAxisValueFontSize: '8',
//     yAxisValueFontSize: '8',
//     valueFontSize: '12',
//     xAxisNameRotate: '0', // Set the rotation angle to 0 to keep the labels horizontal
//   },
//   data: jsonData.days.map((dayData, index) => ({
//     label: dayData.day,
//     value: `${(index + 1) * 10}`,
//     link: `newchart-json-${dayData.day}`,
//   })),
//   linkeddata: linkedData,
// },
// };
//   const chartDataa = JSON.stringify(chartConfig);

//   const [selectedView, setSelectedView] = useState('Daily');
//   const [selectedCycle, setSelectedCycle] = useState(1);
//   const [selectedMeter, setSelectedMeter] = useState(route?.params?.meterId || '');
//   // console.log("propspropsprops", route?.params?.meterId);
//   const handleViewClick = view => {
//     setSelectedView(view.name); //selectedView === view ? null : view
//     setSelectedCycle(view.id);
//     getConsumptionDashboard(selectedMeter);
//   };

//   const getViewBackgroundColor = view => {
//     return selectedView === view ? '#FFFFFFFF' : '#252D3FFF';
//   };

//   const getViewFontColor = view => {
//     return selectedView === view ? '#252D3FFF' : '#FFFFFFFF';
//   };

//   const [consumptionCylceList, setConsumptionCylceList] = useState([]);
//   const [propertyList, setPropertyList] = useState([]);
//   const [averageConsumption, setAverageConsumption] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [currentUtility, setCurrentUtility] = useState(null);

//   useEffect(() => {
//     setNoDataFound(false);
//     setAverageConsumption(null);
//     if (getConsumptionMasterData && getConsumptionMasterIsSuccess) {
//       setConsumptionCylceList(getConsumptionMasterData.consumptionCylceList);
//       setPropertyList(getConsumptionMasterData.propertyList);
//       setNoDataFound(false);
//       setSelectedView(getConsumptionMasterData && getConsumptionMasterData[0] && getConsumptionMasterData[0].name ? getConsumptionMasterData[0].name : null);
//       // setSelectedMeter(getConsumptionMasterData.propertyList[currentIndex] ? getConsumptionMasterData.propertyList[currentIndex].meterList[0].meterId.toString(): '62030884');
//       if(getConsumptionMasterData.propertyList.length > 0){
//         getConsumptionDashboard(getConsumptionMasterData.propertyList[0]?.meterList[0]?.meterId.toString() || '');
//         setCurrentUtility(getConsumptionMasterData.propertyList[0]?.meterList[0]?.utilityType.charAt(0).toUpperCase()+ getConsumptionMasterData.propertyList[0]?.meterList[0]?.utilityType.slice(1))
//       }
//     }else{
//       setConsumptionCylceList([]);
//       setPropertyList([]);
//       getMasters();
//       setNoDataFound(true);
//     }

//     // console.log("==", getConsumptionDashboardData);
//   }, [getConsumptionMasterData, getConsumptionMasterIsSuccess]);
//   useEffect(() => {
//     getMasters();
//   }, [])
//   useEffect(() => {
//     setAverageConsumption(null);
//     setProgress(0);
//     setNoDataFound(false);
//     // console.log("getConsumptionDashboardDatagetConsumptionDashboardData", getConsumptionDashboardData);
//     if (getConsumptionDashboardData && getConsumptionDashboardIsSuccess===true && getConsumptionDashboardIsLoading === false && getConsumptionDashboardData.consumptionCycleId === selectedCycle) {
//       setAverageConsumption(getConsumptionDashboardData.aerageConsumption);
//       setConsumptiondataForWeekly(getConsumptionDashboardData)
//       setProgress((consumptionProgressData.actualValue / consumptionProgressData.targetValue*100).toFixed(2));
//       // setProgressRingData({
//       //   // labels: ["Swim"], // optional
//       //   data: [consumptionProgressData.actualValue/consumptionProgressData.targetValue * 100] // Calculating consumption usage percentage
//       // })

//     }
//     else{
//       getConsumptionDashboard(selectedMeter);
//       setAverageConsumption(null);
//       setNoDataFound(true);
//     }

//     // console.log("==", getConsumptionDashboardData);
//   }, [getConsumptionDashboardData, getConsumptionDashboardIsSuccess]);

//   console.log(consumptiondataForWeekly,"condijojojojoj");

// console.log(getConsumptionDashboardData.lineChartDto,"jotirajk");
//   useEffect(() => {
//     const lineChartDto = {
//       "xAxisdata": [
//         "Thu.",
//         "Wed.",
//         "Tue.",
//         "Mon.",
//         "Sun.",
//         "Sat.",
//         "Fri."
//     ],
//       "seriesLineData": [
//         0.25,0.23,0.67,0.98,0.76,0.56,0.3

//       ]
//     };
//     // const lineChartDto = {...getConsumptionDashboardData.lineChartDto};

//     const updatedData = {
//       labels: lineChartDto.xAxisdata.map(day => day.slice(0, 3)),
//       datasets: [{ data: lineChartDto.seriesLineData }],
//     };
//     setData(updatedData);
// //     var sampleHourlyData = [];

// // if (getConsumptionDashboardData.hourlyData) {
// //     // If hourlyData is not null, loop through each object
// //     getConsumptionDashboardData.hourlyData.forEach(function(item) {
// //         // Extract relevant information
// //         var day = item.parentID || ""; // Assuming this is the day
// //         var time = item.arg || ""; // Assuming this is the time
// //         var value = item.val || ""; // Assuming this is the value

// //         // Push the extracted information into the sampleHourlyData array
// //         sampleHourlyData.push({
// //             parentID: day,
// //             arg: time,
// //             val: value
// //         });
// //     });
// // } else {
// //     // Handle the case where hourlyData is null
// //     // You can choose to do nothing or handle it differently based on your requirements
// //     console.log("hourlyData is null. Skipping processing.");
// // }

// // // Pushing an empty object if both value and parentID are empty
// // if (!getConsumptionDashboardData.hourlyData && !sampleHourlyData.length) {
// //     sampleHourlyData.push({
// //         parentID: "",
// //         arg: "",
// //         val: ""
// //     });
// // }

//   //   var sampleHourlyData = [];
//   //   if (getConsumptionDashboardData.hourlyData) {
//   //     // If hourlyData is not null, loop through each object
//   //     getConsumptionDashboardData.hourlyData.forEach(function(item) {
//   //         // Extract relevant information
//   //         var day = item.parentID; // Assuming this is the day
//   //         var time = item.arg; // Assuming this is the time
//   //         var value = item.val;

//   //         // Push the extracted information into the sampleHourlyData array
//   //         sampleHourlyData.push({
//   //             parentID: day,
//   //             arg: time,
//   //             val: value
//   //         });
//   //     });
//   // } else {
//   //     // Handle the case where hourlyData is null
//   //     // You can choose to do nothing or handle it differently based on your requirements
//   //     console.log("hourlyData is null. Skipping processing.");

//   // }

//     // Loop through each object in the provided data
//     // getConsumptionDashboardData.hourlyData.forEach(function(item) {
//     //     // Extract relevant information
//     //     var day = item.parentID; // Assuming this is the day
//     //     var time = item.arg; // Assuming this is the time
//     //     var value = item.val;

//     //     // Push the extracted information into the sampleHourlyData array
//     //     sampleHourlyData.push({
//     //       parentID: day,
//     //       arg: time,
//     //       val: value
//     //     });
//     // });
//     const sampleHourlyData = [
//       { arg: "Sat.", val: 4.227, parentID: "" },
//       { arg: "10:00", val: 1.224, parentID: "Sat." },
//       { arg: "09:00", val: 1.311, parentID: "Sat." },
//       { arg: "08:00", val: 0.293, parentID: "Sat." },
//       { arg: "07:00", val: 0.361, parentID: "Sat." },
//       { arg: "06:00", val: 0.16, parentID: "Sat." },
//       { arg: "05:00", val: 0.158, parentID: "Sat." },
//       { arg: "04:00", val: 0.152, parentID: "Sat." },
//       { arg: "03:00", val: 0.152, parentID: "Sat." },
//       { arg: "02:00", val: 0.166, parentID: "Sat." },
//       { arg: "01:00", val: 0.166, parentID: "Sat." },
//       { arg: "11:00", val: 0.084, parentID: "Sat." },
//       { arg: "12:00", val: 0.084, parentID: "Sat." },
//       { arg: "13:00", val: 0.084, parentID: "Sat." },
//       { arg: "14:00", val: 0.084, parentID: "Sat." },
//       { arg: "15:00", val: 0.084, parentID: "Sat." },
//       { arg: "16:00", val: 0.084, parentID: "Sat." },
//       { arg: "17:00", val: 0.084, parentID: "Sat." },
//       { arg: "18:00", val: 0.084, parentID: "Sat." },
//       {arg: "19:00", val: 0.084, parentID: "Sat." },
//       { arg: "20:00", val: 0.084, parentID: "Sat." },
//       { arg: "21:00", val: 0.084, parentID: "Sat." },
//       { arg: "22:00", val: 0.084, parentID: "Sat." },
//       { arg: "23:00", val: 0.084, parentID: "Sat." },
//       { arg: "24:00", val: 0.084, parentID: "Sat." },

//       { arg: "Fri.", val: 23.906, parentID: "" },
//       { arg: "1", val: 0.232, parentID: "Fri." },
//       { arg: "2", val: 0.371, parentID: "Fri." },
//       { arg: "3", val: 0.502, parentID: "Fri." },
//       { arg: "4", val: 0.479, parentID: "Fri." },
//       { arg: "5", val: 0.849, parentID: "Fri." },
//       { arg: "6", val: 0.775, parentID: "Fri." },
//       { arg: "7", val: 0.529, parentID: "Fri." },
//       { arg: "8", val: 0.491, parentID: "Fri." },
//       { arg: "9", val: 0.499, parentID: "Fri." },
//       { arg: "10", val: 0.539, parentID: "Fri." },
//       { arg: "11", val: 0.44, parentID: "Fri." },
//       { arg: "12", val: 0.798, parentID: "Fri." },
//       { arg: "13", val: 2.376, parentID: "Fri." },
//       { arg: "14", val: 3.4, parentID: "Fri." },
//       { arg: "15", val: 2.345, parentID: "Fri." },
//       { arg: "16", val: 0.504, parentID: "Fri." },
//       { arg: "17", val: 1.217, parentID: "Fri." },
//       { arg: "18", val: 2.168, parentID: "Fri." },
//       { arg: "19", val: 1.042, parentID: "Fri." },
//       { arg: "20", val: 0.176, parentID: "Fri." },
//       { arg: "21", val: 0.765, parentID: "Fri." },
//       { arg: "22", val: 3.144, parentID: "Fri." },
//       { arg: "23", val: 0.178, parentID: "Fri." },
//       { arg: "24", val: 0.178, parentID: "Fri." },

//     ];
//     // const sampleHourlyData = [getConsumptionDashboardData[0].hourlyData]
//     setHourlyData(sampleHourlyData);
//   }, [getConsumptionDashboardData]);

//   console.log(hourlyData);
//   const handleBarPress = (index) => {
//     const selectedDate = data.labels[index];
//     setSelectedDay(selectedDate);

//     const matchedData = hourlyData.filter(item => item.parentID.slice(0, 3) === selectedDate);

//     // if (matchedData.length > 0) {
//     //   setSelectedHourlyData(matchedData);
//     //   setViewMode('hourly');
//     // } else {
//     //   setSelectedHourlyData([]);
//     // }
//     if (matchedData.length > 0) {
//       setSelectedHourlyData(matchedData);
//     } else {

//       // setSelectedHourlyData([
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },

//       //   // { arg: "10:00", val: 1.224, parentID: "Sat." },
//       //   // { arg: "09:00", val: 1.311, parentID: "Sat." },
//       //   // { arg: "08:00", val: 0.293, parentID: "Sat." },
//       //   // { arg: "07:00", val: 0.361, parentID: "Sat." },
//       //   // { arg: "06:00", val: 0.16, parentID: "Sat." },
//       //   // { arg: "05:00", val: 0.158, parentID: "Sat." },
//       //   // { arg: "04:00", val: 0.152, parentID: "Sat." },
//       //   // { arg: "03:00", val: 0.152, parentID: "Sat." },
//       //   // { arg: "02:00", val: 0.166, parentID: "Sat." },
//       //   // { arg: "01:00", val: 0.166, parentID: "Sat." },
//       //   // { arg: "00:00", val: 0.084, parentID: "Sat." },
//       //   // { arg: "Fri.", val: 23.906, parentID: "" },
//       //   // { arg: "23:00", val: 0.232, parentID: "Fri." },
//       //   // { arg: "22:00", val: 0.371, parentID: "Fri." },
//       //   // { arg: "21:00", val: 0.502, parentID: "Fri." },
//       // ]);
//       setSelectedHourlyData([{ arg: ' ', val: 0 },]);

//     }
//     setViewMode('hourly');

//   };

//   const goBackToDaily = () => {
//     setViewMode('daily');
//     setSelectedDay(null);
//   };

//   const chartData = viewMode === 'daily' ? data : {
//     // labels: selectedHourlyData.map(item => item.arg),
//     //  labels :selectedHourlyData.map(item => item.arg.replace(":00", "")),
//      labels : selectedHourlyData.map(item => item.arg.replace(/^0*|\:00$/g, "")),

//     datasets: [{ data: selectedHourlyData.map(item => item.val) }]
//   };
//   const maxLabelLength = Math.max(...chartData.labels.map(label => label.length));
//   const shouldEnableScroll = maxLabelLength > 56;

// console.log(shouldEnableScroll);

//   const getMasters = async () => {
//     let userId = await AsyncStorage.getItem('userId');
//     let dataObj = {
//       userId:userId,
//       companyId: COMPANY_ID
//     };
//     console.log('======================1', dataObj);
//     dispatch(getConsumptionMasters(dataObj));
//   };

//   const getConsumptionDashboard = async (meterId) => {
//     setSelectedMeter(meterId);
//     setAverageConsumption(null);
//     let userId = await AsyncStorage.getItem('userId');
//     let dataObj = {
//       propertyId:propertyList[currentIndex].propertyId,
//       meterId: meterId,
//       consumptionCylceTypeId:selectedCycle
//     };
//     console.log('======================1', dataObj);
//     dispatch(getConsumptionData(dataObj));
//   };

//   const swiperRef = React.createRef();
//   const swiperRefPro = React.createRef();

//   const handleNext = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollBy(1, true);
//     }
//   };

//   const handlePrev = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollBy(-1, true);
//     }
//   };
//   const [index, setIndex] = useState(0);
//   const handleNextPro = () => {
//     console.log('===================', swiperRefPro.current);
//     if (swiperRefPro.current.state.index < (propertyList.length-1) && swiperRefPro.current) {
//       swiperRefPro.current.scrollBy(1, true);
//     }
//   };

//   const handlePrevPro = () => {
//     if (swiperRefPro.current.state.index > 0 && swiperRefPro.current) {
//       swiperRefPro.current.scrollBy(-1, true);
//     }
//   };

//   const [indexOne, setIndexOne] = useState(0);

//   const scrollToNext = () => {
//     setIndexOne(indexOne + 1);
//   };

//   const scrollToPrevious = () => {
//     setIndexOne(indexOne - 1);
//   };
//   const ringConfig = {
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientToOpacity: 0,
//   color: (opacity = 1) => `rgba(255, 202, 79, ${opacity})`, // Green color
//   strokeWidth: 20, // Width of the progress ring
//   barPercentage: 0.8,
//   useShadowColorFromDataset: false,
// };
//   // const [progressRingData, setProgressRingData] = useState({
//   //   // labels: ["Swim"], // optional
//   //   data: [consumptionProgressData.actualValue/consumptionProgressData.targetValue * 100] // Calculating consumption usage percentage
//   // });

//   // const gaugeData = {
//   //   labels: ['Low', 'Medium', 'High'],
//   //   data: [0.4, 0.6, 0.8],
//   // };
//   const [currentIndex, setCurrentIndex] = useState(0);
//   // useEffect(() => {
//   //   getConsumptionDashboard();
//   // }, [selectedMeter]);

//   const handlePropertyChanged = (index) => {
//     console.log("===============================prop id=", index);
//     if(index >= 0 && index < propertyList.length){    setCurrentIndex(index);
//     setSelectedMeter(propertyList ? propertyList[index].meterList[0].meterId.toString(): '');
//     // console.log("===============================prop Meter=", selectedMeter, propertyList[index].meterList[0]);
//     getConsumptionDashboard(propertyList ? propertyList[index].meterList[0].meterId.toString(): '');
//     setCurrentUtility(propertyList ? propertyList[index].meterList[0].utilityType.charAt(0).toUpperCase()+ propertyList[index].meterList[0].utilityType.slice(1) : '');
//     }
//   };

//   const handleBarClick = (data) => {
//     // console.log('kjhkj');
//     Alert.alert(`Bar Clicked`, `Label: ${data.x}\nValue: ${data.y}`);
//   };

//   // const fillAnimation = useRef(new Animated.Value(0)).current;

//   // useEffect(() => {
//   //   Animated.timing(fillAnimation, {
//   //     duration: 2000, // Animation duration
//   //     useNativeDriver: false, // Make sure to set this to false when using AnimatedCircularProgress
//   //   }).start();
//   // }, [fillAnimation]);

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: '#F8F9FAFF',
//         // borderColor: 'red',
//         // borderWidth: 2,
//       }}>
//         <BackNavigation
//         title={`Consumption Dashboard`}
//         screenName={'dashBoard'}
//         isRightIcon={true}
//         backgroundColor={'#F8F9FA00'}
//       />
//         {getConsumptionMasterIsSuccess && getConsumptionMasterData ? (
//       <ScrollView style={{flex:1, marginBottom:60}}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={['#007BFF']} // Customize the loading spinner color
//           tintColor="#007BFF" // Customize the loading spinner color (Android)
//         />
//       }
//       >
//         {averageConsumption && progress && averageConsumption.dayTime > 0 ? (
//         <View style={{marginTop: 20, height: 200, width: "100%", alignItems: 'center', justifyContent: 'center'}}>
//         <AnimatedCircularProgress
//           size={200}
//           width={20}
//           fill={progress}
//           tintColor={UTILITY[currentUtility].primeColor}
//           backgroundColor={UTILITY[currentUtility].secondaryColor}
//           lineCap="round"
//           arcSweepAngle={260}
//           duration={2000}
//           rotation={230}
//           onAnimationComplete={() => console.log('onAnimationComplete')}
//         />
//           <Text style={{position: 'absolute', bottom: 30, left: '72%', color: '#000', fontSize: 10}}>{consumptionProgressData.targetValue}{getConsumptionDashboardData.meterUnit}</Text>

//         <View style={{position: 'absolute', alignItems: 'center',}}>
//         <Image
//           source={UTILITY[currentUtility].icon}
//           style={{
//             marginTop: 0,
//             width: 30,
//             height: 30,
//             borderRadius: 25,
//             alignSelf: 'center',
//           }}
//         />
//           <Text style={{color: getColorByConsumption(progress), fontSize: 26}}>{consumptionProgressData.actualValue.toFixed(2)} <Text style={{fontSize: 10, fontFamily: COLOR_LIST.FONT_REGULAR}}>{getConsumptionDashboardData.meterUnit}</Text></Text>
//           <Text style={{color: COLOR_LIST.TEXT, fontSize: 12, fontFamily: COLOR_LIST.FONT_REGULAR}}>{cycle[selectedCycle]}</Text>
//           <Text style={{color: COLOR_LIST.TEXT, fontSize: 12}}>{progress} % of target</Text>
//           <Text style={{color: UTILITY[currentUtility].secondaryColor, fontSize: 12}}>#{selectedMeter}</Text>
//         </View>

//       </View>

//         ):(
//           <View style={{width:'100%', height:200, paddingTop:25, alignItems:'center'}}>
//           <Shimmer containerStyle = {{height:170, width:170, borderRadius:85}}/>
//           </View>
//         )}
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   {propertyList.length > 0 ? (
//     <FlatList
//     data={propertyList[currentIndex].meterList}
//     // style={{borderColor:'red', borderWidth:2}}

//     horizontal
//     renderItem={({ item }) => {
//       return (
//         <Pressable
//             onPress={() => {
//               getConsumptionDashboard(item.meterId);
//               setCurrentUtility(item.utilityType.charAt(0).toUpperCase()+ item.utilityType.slice(1))
//             }}
//             style={{
//               backgroundColor:item.meterId === selectedMeter ? COLOR_LIST.DARK_CARD_BG : COLOR_LIST.BRIGHT_BG,
//               borderRadius: 3,
//               shadowColor: '#171a1f',
//               shadowOffset: {
//                 width: 0,
//                 height: 0,
//               },
//               shadowOpacity: 0.2,
//               shadowRadius: 2,
//               elevation: 2,
//               flexDirection:'row',
//               alignItems: 'center',
//               justifyContent:'space-around',
//               paddingHorizontal:7,
//               margin:5
//             }}>
//             <View style={{marginVertical:5}}>
//               <Image source={UTILITY[item.utilityType.charAt(0).toUpperCase()+ item.utilityType.slice(1)].icon}  style={{width: 18, height: 18}} />
//             </View>
//             <View style={{justifyContent:'center' }}>
//               <Text style={{marginLeft:5, fontSize:14, color: item.meterId === selectedMeter ? COLOR_LIST.BRIGHT_TEXT : COLOR_LIST.TEXT}}>{item.meterId}</Text>
//             </View>
//           </Pressable>
//       )
//     }}
//     keyExtractor={(item) => item.toString()}
//     initialScrollIndex={indexOne}
//     scrollToIndex={(params) => {
//       scrollToNext(params.index);
//     }}
//   />) : null}
// </View>
//         <View key={index} style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 20, alignItems: 'center' }}>
//         <TouchableOpacity onPress={handlePrevPro} style={{}}>
//         <Image style={{ width: 30, height: 30 }} source={dashLeft} />
//         </TouchableOpacity>
//         <Swiper
//         style={{ height: 110 }}
//         ref={swiperRefPro}
//         loop={false}
//         showsPagination={false}
//         onIndexChanged={handlePropertyChanged}
//         >
//         {propertyList.map((item, index) => {
//         return (

//         <View style={{ flex: 1 }} key={index}>
//         <View style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginHorizontal: 10,
//         marginVertical: 15,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: '#FFFFFFFF',
//         ...Platform.select({
//         ios: {
//           shadowColor: '#171a1f',
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.2,
//           shadowRadius: 9,
//         },
//         android: {
//           elevation: 5,
//         },
//         }),
//         }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//         <View>
//           <Image source={Home} style={{ width: 28, height: 32 }} />
//         </View>
//         <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
//           <Text style={{ fontFamily: 'Catamaran-SemiThick', fontSize: 16, fontWeight: '400', color: '#171A1FFF' }}>{item.propertyName}</Text>
//           <Text style={{ fontSize: 12, fontWeight: '400', color: '#171A1FFF', marginTop: 5 }}>Unit No: {item.unitNumber}</Text>
//         </View>
//         </View>
//         </View>
//         </View>

//         );
//         })}
//         </Swiper>

//         <TouchableOpacity onPress={handleNextPro} style={{}}>
//         <Image style={{ width: 30, height: 30 }} source={dashRight} />
//         </TouchableOpacity>
//         </View>

//         <View
//           style={{
//             marginTop: 19,
//             // borderColor: 'red',
//             // borderWidth: 2,
//             marginHorizontal: 28,
//           }}>

//           {averageConsumption && averageConsumption.dayTime > 0 ? (
//             <View style={styles.box_style}>
//             <View
//               style={[
//                 styles.box

//               ]}>
//               <View style={{marginVertical: 11,}}>
//                 <Text style={styles.boxText}>Daily</Text>
//                 <View style={styles.inside_box}>
//                   <Text style={styles.boxNumber}>{averageConsumption.daily.toFixed(2)}</Text>
//                   <Text style={styles.text}>{getConsumptionDashboardData.meterUnit}</Text>
//                 </View>
//               </View>
//               <View>
//               <Text
//             style={{
//               marginTop:-7,
//               height: 0,
//               marginHorizontal: 5,
//               borderColor: '#EC3237FF',
//               borderStyle: 'solid',
//               borderBottomWidth: 6,
//               borderBottomRightRadius: 60,
//               borderBottomLeftRadius: 50,
//             }}></Text>
//         </View>
//             </View>
//            <View
//               style={[
//                 styles.box
//               ]}>
//               <View style={{marginVertical: 11}}>
//                 <Text style={styles.boxText}>Day Time</Text>
//                 <View style={styles.inside_box}>
//                   <Text style={styles.boxNumber}>{averageConsumption.dayTime.toFixed(2)}</Text>
//                   <Text style={styles.text}>{getConsumptionDashboardData.meterUnit}</Text>
//                 </View>
//               </View>
//               <View>
//               <Text
//             style={{
//               marginTop:-7,
//               height: 0,
//               marginHorizontal: 5,
//               borderColor: '#EC3237FF',
//               borderStyle: 'solid',
//               borderBottomWidth: 6,
//               borderBottomRightRadius: 60,
//               borderBottomLeftRadius: 50,
//             }}></Text>
//         </View>
//             </View>
//             <View
//               style={[
//                 styles.box,{}
//               ]}>
//               <View style={{marginVertical: 11}}>
//                 <Text style={styles.boxText}>Night Time</Text>
//                 <View style={styles.inside_box}>
//                   <Text style={styles.boxNumber}>{averageConsumption.nightTime.toFixed(2)}</Text>
//                   <Text style={styles.text}>{getConsumptionDashboardData.meterUnit}</Text>
//                 </View>
//               </View>
//               <View>
//           <Text
//             style={{
//               marginTop:-7,
//               height: 0,
//               marginHorizontal: 5,
//               borderColor: '#EC3237FF',
//               borderStyle: 'solid',
//               borderBottomWidth: 6,
//               borderBottomRightRadius:10,
//               borderBottomLeftRadius: 10,
//             }}></Text>
//         </View>
//             </View>
//             </View>
//             ):
//             (
//           <View style={styles.box_style}>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//           </View>
//             )
//             }
//         </View>
//         <View
//           style={{
//             marginTop: 16,
//             marginHorizontal: 28,
//             backgroundColor: '#252D3FFF',
//             paddingHorizontal: 5,
//             paddingVertical: 3,
//             borderRadius: 26
//           }}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           {consumptionCylceList.map((item, index) => (
//                   <TouchableOpacity key={item.id} onPress={() => handleViewClick(item)} >
//                   <View
//                     style={{
//                       width:70,
//                       height: 39,
//                       backgroundColor: 'red',
//                       borderRadius: 28,
//                       backgroundColor: getViewBackgroundColor(item.name),
//                       justifyContent: 'center',
//                     }}>
//                     <Text style={{fontSize: 16, textAlign: 'center', color: getViewFontColor(item.name)}}>{item.name}</Text>
//                   </View>
//                 </TouchableOpacity>
//                 ))}
//           </View>

//         </View>
//             {/* {averageConsumption && averageConsumption.dayTime > 0 ? (
//         <View style={{ borderColor: 'red',
//         borderWidth: 2,}}>
//           <BarChart
//             data={LineChartData}
//             style={{ marginVertical: 16,borderRadius:16, alignSelf:'center'}}
//             width={getWidthByScreenSize(90)}
//             height={220}
//             chartConfig={chartConfig}
//             showValuesOnTopOfBars = {true}
//             fromZero = {true}
//             showBarTops={false}
//             onDataPointClick={()=>{console.log('masoud')}}
//             // yAxisSuffix = {getConsumptionDashboardData.meterUnit}
//           />

//         </View>

//             ) : (<View
//               style={{marginHorizontal: 28, marginVertical: 16,borderRadius:16,borderColor:'red',borderWidth:2 }}
//               width={350}
//               height={250}
//             >
//               {selectedCycle > 1 ? (<Text style={{color:COLOR_LIST.CONSUMPTION_LOADING_TEXT, textAlign:'center', marginBottom:10}}>We are loading your consumption data. This can take sevaral minutes, please wait...</Text>):(<Text style={{color:COLOR_LIST.CONSUMPTION_LOADING_TEXT, textAlign:'center', marginBottom:10}}>Loading your consumption data, please wait...</Text>)}
//               <Shimmer containerStyle = {{height:'100%', width:'100%', borderRadius: 26,}}></Shimmer>
//           </View>)}

//           <View style={{ }}>
//       <View style={{marginTop:20 ,marginHorizontal:10}}>

//         {viewMode === 'hourly' ? (
//                       <View style={{ marginLeft:5}}>

//               <ScrollView horizontal={!shouldEnableScroll}>

//               <BarChart
//                 data={chartData}
//                 width={455}
//                 height={200}
//                 xLabelsOffset={-10}
//                 yAxisSuffix=""
//                 yAxisInterval={1}
//                 chartConfig={{
//                   backgroundColor: '#ffffff',
//                   // backgroundGradientFrom: '#2f95dc',
//                   backgroundGradientTo: '#999999',
//                   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                   style: {
//                     // borderColor: 'red', borderWidth: 2,
//                     borderRadius: 16,
//                     borderColor: '#ffffff',
//                     borderWidth: 2,
//                     marginHorizontal:10
//                   },
//                   barPercentage:0.2
//                 }}
//                 style={{ borderRadius: 20 }} // Apply border radius to the whole chart

//               />

//           </ScrollView>
//           </View>

//         ) : (
//           <>
//             <BarChart
//               data={chartData}
//               width={340}
//               height={200}
//               // xLabelsOffset={3}
//               yAxisSuffix=""
//               // xAxisLabel='hours'
//               yAxisInterval={1}
//               paddingRight={10}
//               chartConfig={{
//                 backgroundColor: '#ffffff',
//                 // backgroundGradientFrom: '#2f95dc',
//                 backgroundGradientTo: '#999999',
//                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 style: {
//                   // borderColor: 'red', borderWidth: 2,
//                   borderRadius: 16,
//                   borderColor: '#ffffff',
//                   borderWidth: 2,
//                   marginLeft: 0
//                 },
//                 barPercentage:0.6

//               }}
//               style={{ borderRadius: 20 }} // Apply border radius to the whole chart

//             />
//             {data.datasets[0].data.map((value, index) => (
//               <View key={index} style={{ left: 78 }}>
//                 <TouchableOpacity
//                   style={{
//                     position: 'absolute',
//                     left: (index * 39),
//                     bottom: 0,
//                     width: 15,
//                     height: 300,
//                     // borderColor:'red', borderWidth: 2
//                   }}
//                   onPress={() => handleBarPress(index)}
//                 />
//               </View>
//             ))}
//           </>
//         )}
//         {viewMode === 'hourly' && selectedHourlyData.length === 1 && selectedHourlyData[0].arg === ' ' && (
//           <View style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: [{ translateX: -50 }, { translateY: -50 }],
//             zIndex: 10,
//           }}>
//             <Text style={{ fontSize: 18, color: '#ff0000' }}>No data found</Text>
//           </View>
//         )}
//          {viewMode === 'hourly' && (
//           <TouchableOpacity onPress={goBackToDaily} style={{marginHorizontal:10}}>
//             <Text style={{ fontSize:14, color: '#999999' }}>Back to Daily</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//       </ScrollView>): !noDataFound || true ? ( // remove true to show no data
//       <ScrollView style={{flex:1}}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={['#007BFF']} // Customize the loading spinner color
//           tintColor="#007BFF" // Customize the loading spinner color (Android)
//         />
//       }>

// <View style={{width:'100%', height:200, paddingTop:25, alignItems:'center'}}>
//           <Shimmer containerStyle = {{height:170, width:170, borderRadius:85}}/>
//           </View>

//         <View
//           style={{
//             marginTop:20, alignContent:'center', width:'100%'}}>
//           <View style={{ alignSelf:'center',
//         marginHorizontal: 11,
//         width:264,
//         height: 70, borderRadius: 35, paddingHorizontal: 10,
//         ...Platform.select({
//           ios: {
//             shadowColor: '#171a1f',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0,
//             shadowRadius: 9,
//           },
//           android: {
//             elevation: 1,
//           },
//         }),
//       }}>
//         <View style={{ flexDirection: 'row', marginHorizontal: 16, }}>
//           {/* <Image source={Home} style={{ width: 28, height: 32, marginVertical: 15 }} /> */}
//             <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
//               <Shimmer containerStyle = {{height:'100%', width:'100%'}}></Shimmer>
//             </View>

//           </View>

//         </View>
//         </View>

//         <View
//           style={{
//             marginTop: 19,
//             // borderColor: 'red',
//             // borderWidth: 2,
//             marginHorizontal: 28,
//           }}>
//           <View style={styles.box_style}>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//           </View>
//         </View>

//         <View
//           style={{
//             marginTop: 16,
//             marginHorizontal: 28,
//             backgroundColor: '#252D3FFF',
//             borderRadius: 26, height:40
//           }}>
//           <Shimmer containerStyle = {{height:'100%', width:'100%', borderRadius: 26,}}></Shimmer>
//         </View>

//         <View
//             style={{marginHorizontal: 28, marginVertical: 16,borderRadius:16}}
//             width={350}
//             height={220}
//           >
//             <Shimmer containerStyle = {{height:'100%', width:'100%', borderRadius: 26,}}></Shimmer>
//         </View>
//       </ScrollView>) : (
//           <ScrollView
//           style={styles.container}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={['#007BFF']} // Customize the loading spinner color
//               tintColor="#007BFF" // Customize the loading spinner color (Android)
//             />
//           }
//         >
//           <View style={{marginTop:20}}>
//             <Text style={{fontSize:20, alignSelf:'center', color:'red', justifyContent:'center'}}>No property found!</Text>
//           </View>
//         </ScrollView>

//         )}
//         <View>
//           <Text>hiiiii</Text>
//         </View>
//       <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
//         <Bottom />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   box_style: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   box: {
//     width: 101,
//     height: 71,
//     backgroundColor: '#252D3FFF',
//     borderRadius: 17,
//   },
//   boxText: {
//     fontSize: 9,
//     fontWeight: '400',
//     lineHeight: 14,
//     color: '#FFFFFFFF',
//     paddingLeft: 20,
//   },
//   boxNumber: {
//     fontSize: 14,
//     fontWeight: '700',
//     lineHeight: 36,
//     color: '#FFFFFFFF',
//   },
//   text: {
//     fontSize: 8,
//     fontWeight: '400',
//     lineHeight: 14,
//     color: '#FFFFFFFF',
//     marginTop: 8,
//     paddingLeft: 5,
//   },
//   inside_box: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// import React, {useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   RefreshControl,
//   Pressable,
//   FlatList
// } from 'react-native';
// import {ScrollView, Animated} from 'react-native';
// import {SandtoneHome} from '../../utils/SandtoneHome';
// import BackNavigation from '../../components/backNavigation';
// import {BarChart, ProgressChart, GaugeChart} from 'react-native-chart-kit';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import Swiper from 'react-native-swiper';
// import leftArrow from "../../assets/dashbordLeftArrow.png"
// import rightArrow from "../../assets/dashbordRightArrow.png"
// import lightArrow from "../../assets/lighticon.png"
// import airArrow from "../../assets/airicon.png"
// import waterArrow from "../../assets/watericon.png"
// import dashRight from "../../assets/dashProRight.png"
// import dashLeft from "../../assets/dashProLeft.png"
// import Home from '../../assets/FillHomeImage.png';
// import { Toast } from 'react-native-toast-notifications';

// //  images
// import electricity from '../../assets/electricity/electricityIcon.png';
// import arrow from '../../assets/RightArrow.png';
// import Bottom from '../../components/Bottom';
// import { COMPANY_ID } from '../../helpers/enum';
// import {getConsumptionMasters, getConsumptionData} from '../../redux/slice/getConsumptionMaster';
// import {useDispatch, useSelector} from 'react-redux';
// import Shimmer from '../../utils/Shimmer';
// import {useFocusEffect} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Dimensions } from "react-native";
// import { current } from '@reduxjs/toolkit';
// import { COLOR_LIST } from '../../helpers/colorlist';
// import { UTILITY } from '../../helpers/meterData';
// import { getColorByConsumption, getWidthByScreenSize } from '../../helpers/commonFunction';
// import { Alert } from 'react-native';

// export const Consumption = ({route}) => {
//   const screenWidth = Dimensions.get("window").width;
//   const cycle = {1:'Today', 2: 'This Week', 3: 'This Month', 4: 'This Year'} // To display inside circular progress
//   const dispatch = useDispatch();
//   const {
//     getConsumptionMasterIsLoading,
//     getConsumptionMasterData,
//     getConsumptionMasterIsSuccess,
//     getConsumptionMasterIsError,
//     getConsumptionDashboardIsLoading,
//     getConsumptionDashboardData,
//     getConsumptionDashboardIsSuccess,
//     getConsumptionDashboardIsError,
//     getConsumptionLineXData,
//     getConsumptionLineYData,
//     consumptionProgressData,
//     consumptionHourlyData
//   } = useSelector(state => ({
//     getConsumptionMasterIsLoading: state.consumptionData.getConsumptionMasterIsLoading,
//     getConsumptionMasterData:state.consumptionData.getConsumptionMasterData,
//     getConsumptionMasterIsSuccess: state.consumptionData.getConsumptionMasterIsSuccess,
//     getConsumptionMasterIsError: state.consumptionData.getConsumptionMasterIsError,

//     getConsumptionDashboardIsLoading: state.consumptionData.getConsumptionDashboardIsLoading,
//     getConsumptionDashboardData:state.consumptionData.getConsumptionDashboardData,
//     getConsumptionDashboardIsSuccess: state.consumptionData.getConsumptionDashboardIsSuccess,
//     getConsumptionDashboardIsError: state.consumptionData.getConsumptionDashboardIsError,
//     getConsumptionLineXData: state.consumptionData.getConsumptionLineXData,
//     getConsumptionLineYData: state.consumptionData.getConsumptionLineYData,
//     consumptionProgressData: state.consumptionData.consumptionProgressData,
//     consumptionHourlyData: state.consumptionData.consumptionHourlyData,

//   }));

//   console.log(consumptionHourlyData,"00000000000");
//   const [noDataFound, setNoDataFound] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const onRefresh = () => {
//     setNoDataFound(false);
//     setRefreshing(true);
//     getMasters();
//     // Simulate a refresh action (e.g., fetch new data)
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000); // Simulating a 2-second refresh process
//   };

//   const LineChartData = {
//     labels: getConsumptionLineXData,

//     datasets: [
//       {
//         data: getConsumptionLineYData,
//         color: (opacity = 1) => `rgba(0,0,0,${opacity})`, // optional
//         strokeWidth: 2, // optional
//       },
//     ],
//   };

// //drill down

// const [viewMode, setViewMode] = useState('daily');
// const [selectedDay, setSelectedDay] = useState(null);
// const [data, setData] = useState({
//   labels: [],
//   datasets: [{ data: [] }],
// });
// const [hourlyData, setHourlyData] = useState([]);
// const [selectedHourlyData, setSelectedHourlyData] = useState([]);

// useEffect(() => {

//   const lineChartDto = {
//     xAxisdata: newXAxisdata,
//     seriesLineData: newSeriesLineData
//   };

//   const newXAxisdata = getConsumptionLineXData;
//   const newSeriesLineData = getConsumptionLineYData;

//   // Updating the lineChartDto with new data
//   lineChartDto.xAxisdata = newXAxisdata;
//   lineChartDto.seriesLineData = newSeriesLineData;

//   const updatedData = {
//     labels: lineChartDto.xAxisdata.map(day => day.slice(0, 3)),
//     datasets: [{ data: lineChartDto.seriesLineData }],
//   };
//   setData(updatedData);

//   // // Loop through each object in the provided data
//   // consumptionHourlyData.forEach(function(item) {
//   //     // Extract relevant information
//   //     var day = item.parentID; // Assuming this is the day
//   //     var time = item.arg; // Assuming this is the time
//   //     var value = item.val;

//   //     // Push the extracted information into the sampleHourlyData array
//   //     sampleHourlyData.push({
//   //       parentID: day,
//   //       arg: time,
//   //       val: value
//   //     });
//   // });
//   if (consumptionHourlyData != null) {
//     var sampleHourlyData = [];
//     consumptionHourlyData.forEach(function(item) {
//       // Extract relevant information
//       var day = item.parentID; // Assuming this is the day
//       var time = item.arg; // Assuming this is the time
//       var value = item.val;

//       // Push the extracted information into the sampleHourlyData array
//       sampleHourlyData.push({
//         parentID: day,
//         arg: time,
//         val: value
//       });
//     });
//   } else {
//     console.log('No consumption hourly data available.');
//   }

//   setHourlyData(sampleHourlyData);
// }, [getConsumptionLineXData,getConsumptionLineYData]);

// // useEffect(() => {
// //   // const lineChartDto = {
// //   //   "xAxisdata": [
// //   //     "Thu.",
// //   //     "Wed.",
// //   //     "Tue.",
// //   //     "Mon.",
// //   //     "Sun.",
// //   //     "Sat.",
// //   //     "Fri."
// //   // ],
// //   //   "seriesLineData": [
// //   //     0.1,0.23,0.67,0.98,0.76,0.56,0.3

// //   //   ]
// //   // };
// //   // const lineChartDto = {...getConsumptionDashboardData[0].lineChartDto};
// //   const newXAxisdata = getConsumptionLineXData;
// //   const newSeriesLineData = getConsumptionLineYData;

// //   // Updating the lineChartDto with new data
// //   lineChartDto.xAxisdata = newXAxisdata;
// //   lineChartDto.seriesLineData = newSeriesLineData;

// //   const updatedData = {
// //     labels: lineChartDto.xAxisdata.map(day => day.slice(0, 3)),
// //     datasets: [{ data: lineChartDto.seriesLineData }],
// //   };
// //   setData(updatedData);

// //   // var sampleHourlyData = [];

// //   // // Loop through each object in the provided data
// //   // getConsumptionDashboardData[0].hourlyData.forEach(function(item) {
// //   //     // Extract relevant information
// //   //     var day = item.parentID; // Assuming this is the day
// //   //     var time = item.arg; // Assuming this is the time
// //   //     var value = item.val;

// //   //     // Push the extracted information into the sampleHourlyData array
// //   //     sampleHourlyData.push({
// //   //       parentID: day,
// //   //       arg: time,
// //   //       val: value
// //   //     });
// //   // });
// //   const sampleHourlyData = [
// //     { arg: "Sat.", val: 4.227, parentID: "" },
// //     { arg: "10:00", val: 1.224, parentID: "Sat." },
// //     { arg: "09:00", val: 1.311, parentID: "Sat." },
// //     { arg: "08:00", val: 0.293, parentID: "Sat." },
// //     { arg: "07:00", val: 0.361, parentID: "Sat." },
// //     { arg: "06:00", val: 0.16, parentID: "Sat." },
// //     { arg: "05:00", val: 0.158, parentID: "Sat." },
// //     { arg: "04:00", val: 0.152, parentID: "Sat." },
// //     { arg: "03:00", val: 0.152, parentID: "Sat." },
// //     { arg: "02:00", val: 0.166, parentID: "Sat." },
// //     { arg: "01:00", val: 0.166, parentID: "Sat." },
// //     { arg: "11:00", val: 0.084, parentID: "Sat." },
// //     { arg: "12:00", val: 0.084, parentID: "Sat." },
// //     { arg: "13:00", val: 0.084, parentID: "Sat." },
// //     { arg: "14:00", val: 0.084, parentID: "Sat." },
// //     { arg: "15:00", val: 0.084, parentID: "Sat." },
// //     { arg: "16:00", val: 0.084, parentID: "Sat." },
// //     { arg: "17:00", val: 0.084, parentID: "Sat." },
// //     { arg: "18:00", val: 0.084, parentID: "Sat." },
// //     {arg: "19:00", val: 0.084, parentID: "Sat." },
// //     { arg: "20:00", val: 0.084, parentID: "Sat." },
// //     { arg: "21:00", val: 0.084, parentID: "Sat." },
// //     { arg: "22:00", val: 0.084, parentID: "Sat." },
// //     { arg: "23:00", val: 0.084, parentID: "Sat." },
// //     { arg: "24:00", val: 0.084, parentID: "Sat." },

// //     { arg: "Fri.", val: 23.906, parentID: "" },
// //     { arg: "23", val: 0.232, parentID: "Fri." },
// //     { arg: "22", val: 0.371, parentID: "Fri." },
// //     { arg: "21", val: 0.502, parentID: "Fri." },
// //     { arg: "20", val: 0.479, parentID: "Fri." },
// //     { arg: "19", val: 0.849, parentID: "Fri." },
// //     { arg: "18", val: 0.775, parentID: "Fri." },
// //     { arg: "17", val: 0.529, parentID: "Fri." },
// //     { arg: "16", val: 0.491, parentID: "Fri." },
// //     { arg: "15", val: 0.499, parentID: "Fri." },
// //     { arg: "14", val: 0.539, parentID: "Fri." },
// //     { arg: "13", val: 0.44, parentID: "Fri." },
// //     { arg: "12", val: 0.798, parentID: "Fri." },
// //     { arg: "11", val: 2.376, parentID: "Fri." },
// //     { arg: "10", val: 3.4, parentID: "Fri." },
// //     { arg: "9", val: 2.345, parentID: "Fri." },
// //     { arg: "8", val: 0.504, parentID: "Fri." },
// //     { arg: "7", val: 1.217, parentID: "Fri." },
// //     { arg: "6", val: 2.168, parentID: "Fri." },
// //     { arg: "5", val: 1.042, parentID: "Fri." },
// //     { arg: "4", val: 0.176, parentID: "Fri." },
// //     { arg: "3", val: 0.765, parentID: "Fri." },
// //     { arg: "2", val: 3.144, parentID: "Fri." },
// //     { arg: "1", val: 0.178, parentID: "Fri." },
// //   ];

// //   // const sampleHourlyData = [getConsumptionDashboardData[0].hourlyData]
// //   setHourlyData(sampleHourlyData);
// // }, []);

// const handleBarPress = (index) => {
//   const selectedDate = data.labels[index];
//   setSelectedDay(selectedDate);
//   console.log(selectedDate);

//   // const matchedData = hourlyData.filter(item => item.parentID.slice(0, 3) === selectedDate);
//   if (hourlyData && hourlyData.length > 0) {
//     const matchedData = hourlyData.filter(item => item.parentID.slice(0, 3) === selectedDate);
//     if (matchedData.length > 0) {
//       setSelectedHourlyData(matchedData);
//     } else {

//       // setSelectedHourlyData([
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },
//       //   { arg: "", val: 4.227, parentID: "" },

//       //   // { arg: "10:00", val: 1.224, parentID: "Sat." },
//       //   // { arg: "09:00", val: 1.311, parentID: "Sat." },
//       //   // { arg: "08:00", val: 0.293, parentID: "Sat." },
//       //   // { arg: "07:00", val: 0.361, parentID: "Sat." },
//       //   // { arg: "06:00", val: 0.16, parentID: "Sat." },
//       //   // { arg: "05:00", val: 0.158, parentID: "Sat." },
//       //   // { arg: "04:00", val: 0.152, parentID: "Sat." },
//       //   // { arg: "03:00", val: 0.152, parentID: "Sat." },
//       //   // { arg: "02:00", val: 0.166, parentID: "Sat." },
//       //   // { arg: "01:00", val: 0.166, parentID: "Sat." },
//       //   // { arg: "00:00", val: 0.084, parentID: "Sat." },
//       //   // { arg: "Fri.", val: 23.906, parentID: "" },
//       //   // { arg: "23:00", val: 0.232, parentID: "Fri." },
//       //   // { arg: "22:00", val: 0.371, parentID: "Fri." },
//       //   // { arg: "21:00", val: 0.502, parentID: "Fri." },
//       // ]);
//       setSelectedHourlyData([{ arg: ' ', val: 0 },]);

//     }
//     setViewMode('hourly');
//   } else {
//     console.log('hourlyData is null or empty.');
//   }
//   // if (matchedData.length > 0) {
//   //   setSelectedHourlyData(matchedData);
//   //   setViewMode('hourly');
//   // } else {
//   //   setSelectedHourlyData([]);
//   // }

// };
// // console.log(hourlyData,"kkkkkkk");

// const goBackToDaily = () => {
//   setViewMode('daily');
//   setSelectedDay(null);
//   if(selectedView !="Daily"){
//     goBackToDaily();
//   }
// };
// console.log(selectedHourlyData,"selectedHourlyData");
// const chartData = viewMode === 'daily' ? data : {
//   // labels: selectedHourlyData.map(item => item.arg),
//   //  labels :selectedHourlyData.map(item => item.arg.replace(":00", "")),
//    labels : selectedHourlyData.map(item => item.arg.replace(/^0*|\:00$/g, "")),

//   datasets: [{ data: selectedHourlyData.map(item => item.val) }]
// };

// const maxLabelLength = Math.max(...chartData.labels.map(label => label.length));
// const shouldEnableScroll = maxLabelLength > 56;

// console.log(chartData,"chartDtta",LineChartData,"lineChatdata...");

//   const chartConfig = {
//     backgroundGradientFrom: COLOR_LIST.GRAPH_BG, // Black
//     backgroundGradientFromOpacity: 1, // 50% opacity
//     backgroundGradientTo: '#33478B', // Light grayish-blue
//     backgroundGradientToOpacity: 0.8, // 50% opacity
//     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for text with full opacity
//     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for labels with full opacity
//     onClick: function (){
//       console.log("----------");
//     }
//   };

//   const [selectedView, setSelectedView] = useState('Daily');
//   const [selectedCycle, setSelectedCycle] = useState(1);
//   const [selectedMeter, setSelectedMeter] = useState(route?.params?.meterId || '');
//   console.log("propspropsprops", route?.params?.meterId);
//   const handleViewClick = view => {
//     setSelectedView(view.name); //selectedView === view ? null : view
//     setSelectedCycle(view.id);
//     getConsumptionDashboard(selectedMeter);
//   };

//   const getViewBackgroundColor = view => {
//     return selectedView === view ? '#FFFFFFFF' : '#252D3FFF';
//   };

//   const getViewFontColor = view => {
//     return selectedView === view ? '#252D3FFF' : '#FFFFFFFF';
//   };

//   const [consumptionCylceList, setConsumptionCylceList] = useState([]);
//   const [propertyList, setPropertyList] = useState([]);
//   const [averageConsumption, setAverageConsumption] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [currentUtility, setCurrentUtility] = useState(null);

//   useEffect(() => {
//     setNoDataFound(false);
//     setAverageConsumption(null);
//     if (getConsumptionMasterData && getConsumptionMasterIsSuccess) {
//       setConsumptionCylceList(getConsumptionMasterData.consumptionCylceList);
//       setPropertyList(getConsumptionMasterData.propertyList);
//       setNoDataFound(false);
//       setSelectedView(getConsumptionMasterData && getConsumptionMasterData[0] && getConsumptionMasterData[0].name ? getConsumptionMasterData[0].name : null);
//       // setSelectedMeter(getConsumptionMasterData.propertyList[currentIndex] ? getConsumptionMasterData.propertyList[currentIndex].meterList[0].meterId.toString(): '62030884');
//       if(getConsumptionMasterData.propertyList.length > 0){
//         getConsumptionDashboard(getConsumptionMasterData.propertyList[0]?.meterList[0]?.meterId.toString() || '');
//         setCurrentUtility(getConsumptionMasterData.propertyList[0]?.meterList[0]?.utilityType.charAt(0).toUpperCase()+ getConsumptionMasterData.propertyList[0]?.meterList[0]?.utilityType.slice(1))
//       }
//     }else{
//       setConsumptionCylceList([]);
//       setPropertyList([]);
//       getMasters();
//       setNoDataFound(true);
//     }

//     // console.log("==", getConsumptionDashboardData);
//   }, [getConsumptionMasterData, getConsumptionMasterIsSuccess]);
//   useEffect(() => {
//     getMasters();
//   }, [])
//   useEffect(() => {
//     setAverageConsumption(null);
//     setProgress(0);
//     setNoDataFound(false);
//     console.log("getConsumptionDashboardDatagetConsumptionDashboardData", getConsumptionDashboardData);
//     if (getConsumptionDashboardData && getConsumptionDashboardIsSuccess===true && getConsumptionDashboardIsLoading === false && getConsumptionDashboardData.consumptionCycleId === selectedCycle) {
//       setAverageConsumption(getConsumptionDashboardData.aerageConsumption);
//       setProgress((consumptionProgressData.actualValue / consumptionProgressData.targetValue*100).toFixed(2));
//       // setProgressRingData({
//       //   // labels: ["Swim"], // optional
//       //   data: [consumptionProgressData.actualValue/consumptionProgressData.targetValue * 100] // Calculating consumption usage percentage
//       // })

//     }
//     else{
//       getConsumptionDashboard(selectedMeter);
//       setAverageConsumption(null);
//       setNoDataFound(true);
//     }

//     console.log("==", getConsumptionDashboardData);
//   }, [getConsumptionDashboardData, getConsumptionDashboardIsSuccess]);

//   console.log(averageConsumption,"averageConsumptionaverageConsumptionaverageConsumption");
//   const getMasters = async () => {
//     let userId = await AsyncStorage.getItem('userId');
//     let dataObj = {
//       userId:userId,
//       companyId: COMPANY_ID
//     };
//     console.log('======================1', dataObj);
//     dispatch(getConsumptionMasters(dataObj));
//   };

//   const getConsumptionDashboard = async (meterId) => {
//     setSelectedMeter(meterId);
//     setAverageConsumption(null);
//     let userId = await AsyncStorage.getItem('userId');
//     let dataObj = {
//       propertyId:propertyList[currentIndex].propertyId,
//       meterId: meterId,
//       consumptionCylceTypeId:selectedCycle
//     };
//     console.log('======================1', dataObj);
//     dispatch(getConsumptionData(dataObj));
//   };

//   const swiperRef = React.createRef();
//   const swiperRefPro = React.createRef();

//   const handleNext = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollBy(1, true);
//     }
//   };

//   const handlePrev = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollBy(-1, true);
//     }
//   };
//   const [index, setIndex] = useState(0);
//   const handleNextPro = () => {
//     console.log('===================', swiperRefPro.current);
//     if (swiperRefPro.current.state.index < (propertyList.length-1) && swiperRefPro.current) {
//       swiperRefPro.current.scrollBy(1, true);
//     }
//   };

//   const handlePrevPro = () => {
//     if (swiperRefPro.current.state.index > 0 && swiperRefPro.current) {
//       swiperRefPro.current.scrollBy(-1, true);
//     }
//   };

//   console.log(selectedView,"selectedview");

//   const [indexOne, setIndexOne] = useState(0);

//   const scrollToNext = () => {
//     setIndexOne(indexOne + 1);
//   };

//   const scrollToPrevious = () => {
//     setIndexOne(indexOne - 1);
//   };
//   const ringConfig = {
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientToOpacity: 0,
//   color: (opacity = 1) => `rgba(255, 202, 79, ${opacity})`, // Green color
//   strokeWidth: 20, // Width of the progress ring
//   barPercentage: 0.8,
//   useShadowColorFromDataset: false,
// };
//   // const [progressRingData, setProgressRingData] = useState({
//   //   // labels: ["Swim"], // optional
//   //   data: [consumptionProgressData.actualValue/consumptionProgressData.targetValue * 100] // Calculating consumption usage percentage
//   // });

//   // const gaugeData = {
//   //   labels: ['Low', 'Medium', 'High'],
//   //   data: [0.4, 0.6, 0.8],
//   // };
//   const [currentIndex, setCurrentIndex] = useState(0);
//   // useEffect(() => {
//   //   getConsumptionDashboard();
//   // }, [selectedMeter]);

//   const handlePropertyChanged = (index) => {
//     console.log("===============================prop id=", index);
//     if(index >= 0 && index < propertyList.length){    setCurrentIndex(index);
//     setSelectedMeter(propertyList ? propertyList[index].meterList[0].meterId.toString(): '');
//     console.log("===============================prop Meter=", selectedMeter, propertyList[index].meterList[0]);
//     getConsumptionDashboard(propertyList ? propertyList[index].meterList[0].meterId.toString(): '');
//     setCurrentUtility(propertyList ? propertyList[index].meterList[0].utilityType.charAt(0).toUpperCase()+ propertyList[index].meterList[0].utilityType.slice(1) : '');
//     }
//   };

//   const handleBarClick = (data) => {
//     console.log('kjhkj');
//     Alert.alert(`Bar Clicked`, `Label: ${data.x}\nValue: ${data.y}`);
//   };

//   // const fillAnimation = useRef(new Animated.Value(0)).current;

//   // useEffect(() => {
//   //   Animated.timing(fillAnimation, {
//   //     duration: 2000, // Animation duration
//   //     useNativeDriver: false, // Make sure to set this to false when using AnimatedCircularProgress
//   //   }).start();
//   // }, [fillAnimation]);

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: '#F8F9FAFF',
//         // borderColor: 'red',
//         borderWidth: 2,
//       }}>
//         <BackNavigation
//         title={`Consumption Dashboard`}
//         screenName={'dashBoard'}
//         isRightIcon={true}
//         backgroundColor={'#F8F9FA00'}
//       />
//         {getConsumptionMasterIsSuccess && getConsumptionMasterData ? (
//       <ScrollView style={{flex:1, marginBottom:60}}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={['#007BFF']} // Customize the loading spinner color
//           tintColor="#007BFF" // Customize the loading spinner color (Android)
//         />
//       }
//       >
//         {averageConsumption && progress && averageConsumption.dayTime > 0 ? (
//         <View style={{marginTop: 20, height: 200, width: "100%", alignItems: 'center', justifyContent: 'center'}}>
//         <AnimatedCircularProgress
//           size={200}
//           width={20}
//           fill={progress}
//           tintColor={UTILITY[currentUtility].primeColor}
//           backgroundColor={UTILITY[currentUtility].secondaryColor}
//           lineCap="round"
//           arcSweepAngle={260}
//           duration={2000}
//           rotation={230}
//           onAnimationComplete={() => console.log('onAnimationComplete')}
//         />
//           <Text style={{position: 'absolute', bottom: 30, left: '72%', color: '#000', fontSize: 10}}>{consumptionProgressData.targetValue}{getConsumptionDashboardData.meterUnit}</Text>

//         <View style={{position: 'absolute', alignItems: 'center',}}>
//         <Image
//           source={UTILITY[currentUtility].icon}
//           style={{
//             marginTop: 0,
//             width: 30,
//             height: 30,
//             borderRadius: 25,
//             alignSelf: 'center',
//           }}
//         />
//           <Text style={{color: getColorByConsumption(progress), fontSize: 26}}>{consumptionProgressData.actualValue.toFixed(2)} <Text style={{fontSize: 10, fontFamily: COLOR_LIST.FONT_REGULAR}}>{getConsumptionDashboardData.meterUnit}</Text></Text>
//           <Text style={{color: COLOR_LIST.TEXT, fontSize: 12, fontFamily: COLOR_LIST.FONT_REGULAR}}>{cycle[selectedCycle]}</Text>
//           <Text style={{color: COLOR_LIST.TEXT, fontSize: 12}}>{progress} % of target</Text>
//           <Text style={{color: UTILITY[currentUtility].secondaryColor, fontSize: 12}}>#{selectedMeter}</Text>
//         </View>

//       </View>

//         ):(
//           <View style={{width:'100%', height:200, paddingTop:25, alignItems:'center'}}>
//           <Shimmer containerStyle = {{height:170, width:170, borderRadius:85}}/>
//           </View>
//         )}
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   {propertyList.length > 0 ? (
//     <FlatList
//     data={propertyList[currentIndex].meterList}
//     // style={{borderColor:'red', borderWidth:2}}

//     horizontal
//     renderItem={({ item }) => {
//       return (
//         <Pressable
//             onPress={() => {
//               getConsumptionDashboard(item.meterId);
//               setCurrentUtility(item.utilityType.charAt(0).toUpperCase()+ item.utilityType.slice(1))
//             }}
//             style={{
//               backgroundColor:item.meterId === selectedMeter ? COLOR_LIST.DARK_CARD_BG : COLOR_LIST.BRIGHT_BG,
//               borderRadius: 3,
//               shadowColor: '#171a1f',
//               shadowOffset: {
//                 width: 0,
//                 height: 0,
//               },
//               shadowOpacity: 0.2,
//               shadowRadius: 2,
//               elevation: 2,
//               flexDirection:'row',
//               alignItems: 'center',
//               justifyContent:'space-around',
//               paddingHorizontal:7,
//               margin:5
//             }}>
//             <View style={{marginVertical:5}}>
//               <Image source={UTILITY[item.utilityType.charAt(0).toUpperCase()+ item.utilityType.slice(1)].icon}  style={{width: 18, height: 18}} />
//             </View>
//             <View style={{justifyContent:'center' }}>
//               <Text style={{marginLeft:5, fontSize:14, color: item.meterId === selectedMeter ? COLOR_LIST.BRIGHT_TEXT : COLOR_LIST.TEXT}}>{item.meterId}</Text>
//             </View>
//           </Pressable>
//       )
//     }}
//     keyExtractor={(item) => item.toString()}
//     initialScrollIndex={indexOne}
//     scrollToIndex={(params) => {
//       scrollToNext(params.index);
//     }}
//   />) : null}
// </View>
//         <View key={index} style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 20, alignItems: 'center' }}>
//         <TouchableOpacity onPress={handlePrevPro} style={{}}>
//         <Image style={{ width: 30, height: 30 }} source={dashLeft} />
//         </TouchableOpacity>
//         <Swiper
//         style={{ height: 110 }}
//         ref={swiperRefPro}
//         loop={false}
//         showsPagination={false}
//         onIndexChanged={handlePropertyChanged}
//         >
//         {propertyList.map((item, index) => {
//         return (

//         <View style={{ flex: 1 }} key={index}>
//         <View style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginHorizontal: 10,
//         marginVertical: 15,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: '#FFFFFFFF',
//         ...Platform.select({
//         ios: {
//           shadowColor: '#171a1f',
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.2,
//           shadowRadius: 9,
//         },
//         android: {
//           elevation: 5,
//         },
//         }),
//         }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//         <View>
//           <Image source={Home} style={{ width: 28, height: 32 }} />
//         </View>
//         <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
//           <Text style={{ fontFamily: 'Catamaran-SemiThick', fontSize: 16, fontWeight: '400', color: '#171A1FFF' }}>{item.propertyName}</Text>
//           <Text style={{ fontSize: 12, fontWeight: '400', color: '#171A1FFF', marginTop: 5 }}>Unit No: {item.unitNumber}</Text>
//         </View>
//         </View>
//         </View>
//         </View>

//         );
//         })}
//         </Swiper>

//         <TouchableOpacity onPress={handleNextPro} style={{}}>
//         <Image style={{ width: 30, height: 30 }} source={dashRight} />
//         </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             marginTop: 19,
//             // borderColor: 'red',
//             // borderWidth: 2,
//             marginHorizontal: 28,
//           }}>

//           {averageConsumption && averageConsumption.dayTime > 0 ? (
//             <View style={styles.box_style}>
//             <View
//               style={[
//                 styles.box
//               ]}>
//               <View style={{marginVertical: 11,}}>
//                 <Text style={styles.boxText}>Daily</Text>
//                 <View style={styles.inside_box}>
//                   <Text style={styles.boxNumber}>{averageConsumption.daily.toFixed(2)}</Text>
//                   <Text style={styles.text}>{getConsumptionDashboardData.meterUnit}</Text>
//                 </View>
//               </View>
//               <View>
//               <Text
//             style={{
//               marginTop:-7,
//               height: 0,
//               marginHorizontal: 5,
//               borderColor: '#EC3237FF',
//               borderStyle: 'solid',
//               borderBottomWidth: 6,
//               borderBottomRightRadius: 60,
//               borderBottomLeftRadius: 50,
//             }}></Text>
//         </View>
//             </View>
//            <View
//               style={[
//                 styles.box
//               ]}>
//               <View style={{marginVertical: 11}}>
//                 <Text style={styles.boxText}>Day Time</Text>
//                 <View style={styles.inside_box}>
//                   <Text style={styles.boxNumber}>{averageConsumption.dayTime.toFixed(2)}</Text>
//                   <Text style={styles.text}>{getConsumptionDashboardData.meterUnit}</Text>
//                 </View>
//               </View>
//               <View>
//               <Text
//             style={{
//               marginTop:-7,
//               height: 0,
//               marginHorizontal: 5,
//               borderColor: '#EC3237FF',
//               borderStyle: 'solid',
//               borderBottomWidth: 6,
//               borderBottomRightRadius: 60,
//               borderBottomLeftRadius: 50,
//             }}></Text>
//         </View>
//             </View>
//             <View
//               style={[
//                 styles.box,{}
//               ]}>
//               <View style={{marginVertical: 11}}>
//                 <Text style={styles.boxText}>Night Time</Text>
//                 <View style={styles.inside_box}>
//                   <Text style={styles.boxNumber}>{averageConsumption.nightTime.toFixed(2)}</Text>
//                   <Text style={styles.text}>{getConsumptionDashboardData.meterUnit}</Text>
//                 </View>
//               </View>
//               <View>
//           <Text
//             style={{
//               marginTop:-7,
//               height: 0,
//               marginHorizontal: 5,
//               borderColor: '#EC3237FF',
//               borderStyle: 'solid',
//               borderBottomWidth: 6,
//               borderBottomRightRadius:10,
//               borderBottomLeftRadius: 10,
//             }}></Text>
//         </View>
//             </View>
//             </View>
//             ):
//             (
//           <View style={styles.box_style}>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//           </View>
//             )
//             }
//         </View>
//         <View
//           style={{
//             marginTop: 16,
//             marginHorizontal: 28,
//             backgroundColor: '#252D3FFF',
//             paddingHorizontal: 5,
//             paddingVertical: 3,
//             borderRadius: 26
//           }}>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           {consumptionCylceList.map((item, index) => (
//                   <TouchableOpacity key={item.id} onPress={() => handleViewClick(item)} >
//                   <View
//                     style={{
//                       width:70,
//                       height: 39,
//                       backgroundColor: 'red',
//                       borderRadius: 28,
//                       backgroundColor: getViewBackgroundColor(item.name),
//                       justifyContent: 'center',
//                     }}>
//                     <Text style={{fontSize: 16, textAlign: 'center', color: getViewFontColor(item.name)}}>{item.name}</Text>
//                   </View>
//                 </TouchableOpacity>
//                 ))}
//           </View>

//         </View>
//             {averageConsumption && averageConsumption.dayTime > 0 ? (
//        selectedView === "Daily" ? (
//         // <View>
//         //   <Text style={{borderColor:'red',color:'black',borderWidth:2}}>Helllo Daily</Text>
//         // </View>
//       <View style={{marginTop:20 }}>

//         {viewMode === 'hourly' ? (
//           <View style={{marginHorizontal:15}}>

//               {/* <ScrollView horizontal={!shouldEnableScroll}> */}

//               <BarChart
//                 data={chartData}
//                 width={455}
//                 height={300}
//                 xLabelsOffset={-10}
//                 yAxisSuffix=""
//                 yAxisInterval={1}
//                 chartConfig={{

//                  backgroundGradientFrom: COLOR_LIST.GRAPH_BG, // Black
//     backgroundGradientFromOpacity: 1, // 50% opacity
//     backgroundGradientTo: '#33478B', // Light grayish-blue
//     backgroundGradientToOpacity: 0.8, // 50% opacity
//     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for text with full opacity
//     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                   style: {
//                     // borderColor: 'red', borderWidth: 2,
//                     borderRadius: 16,
//                     borderColor: '#ffffff',
//                     borderWidth: 2,
//                     // marginHorizontal:10
//                   },
//                   barPercentage:0.2
//                 }}
//               />

//           {/* </ScrollView> */}
//           </View>

//         ) : (
//           <View style={{marginHorizontal:15}}>
//             <BarChart
//               data={chartData}
//               width={340}
//               height={300}
//               // xLabelsOffset={3}
//               yAxisSuffix=""
//               // xAxisLabel='hours'
//               yAxisInterval={1}
//               paddingRight={10}
//               chartConfig={{ backgroundGradientFrom: COLOR_LIST.GRAPH_BG, // Black
//               backgroundGradientFromOpacity: 1, // 50% opacity
//               backgroundGradientTo: '#33478B', // Light grayish-blue
//               backgroundGradientToOpacity: 0.8, // 50% opacity
//               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for text with full opacity
//               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 style: {
//                   // borderColor: 'red', borderWidth: 2,
//                   borderRadius: 16,
//                   borderColor: '#ffffff',
//                   borderWidth: 2,
//                   marginLeft: 0
//                 },
//                 barPercentage:0.6

//               }}
//             />
//             {data.datasets[0].data.map((value, index) => (
//               <View key={index} style={{ left: 78 }}>
//                 <TouchableOpacity
//                   style={{
//                     position: 'absolute',
//                     left: (index * 39),
//                     bottom: 0,
//                     width: 15,
//                     height: 300,
//                     // borderColor:'red', borderWidth: 2
//                   }}
//                   onPress={() => handleBarPress(index)}
//                 />
//               </View>
//             ))}
//           </View>
//         )}
//         {viewMode === 'hourly' && selectedHourlyData.length === 1 && selectedHourlyData[0].arg === ' ' && (
//           <View style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: [{ translateX: -50 }, { translateY: -50 }],
//             zIndex: 10,
//           }}>
//             <Text style={{ fontSize: 18, color: '#ff0000' }}>No data found</Text>
//           </View>
//         )}
//         {viewMode === 'hourly' && (
//           <TouchableOpacity onPress={goBackToDaily} style={{}}>
//             <Text style={{ fontSize: 12, color: 'black' }}>Back to Daily</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       ) : (
//         <View>
//           <BarChart
//             data={LineChartData}
//             style={{ marginVertical: 16, borderRadius: 16, alignSelf: 'center' }}
//             width={getWidthByScreenSize(90)}
//             height={220}
//             chartConfig={chartConfig}
//             showValuesOnTopOfBars={true}
//             fromZero={true}
//             showBarTops={false}
//             onDataPointClick={() => { console.log('masoud') }}
//             // yAxisSuffix = {getConsumptionDashboardData.meterUnit}
//           />
//         </View>
//       )

//             ) :

//             null
//           //   (<View
//           //     style={{marginHorizontal: 28, marginVertical: 16,borderRadius:16}}
//           //     width={350}
//           //     height={250}
//           //   >
//           //     {selectedCycle > 1 ? (<Text style={{color:COLOR_LIST.CONSUMPTION_LOADING_TEXT, textAlign:'center', marginBottom:10}}>We are loading your consumption data. This can take sevaral minutes, please wait...</Text>):(<Text style={{color:COLOR_LIST.CONSUMPTION_LOADING_TEXT, textAlign:'center', marginBottom:10}}>Loading your consumption data, please wait...</Text>)}
//           //     <Shimmer containerStyle = {{height:'100%', width:'100%', borderRadius: 26,}}></Shimmer>
//           // </View>)

//           }

//       </ScrollView>): !noDataFound || true ? ( // remove true to show no data
//       <ScrollView style={{flex:1}}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={['#007BFF']} // Customize the loading spinner color
//           tintColor="#007BFF" // Customize the loading spinner color (Android)
//         />
//       }>

// <View style={{width:'100%', height:200, paddingTop:25, alignItems:'center'}}>
//           <Shimmer containerStyle = {{height:170, width:170, borderRadius:85}}/>
//           </View>

//         <View
//           style={{
//             marginTop:20, alignContent:'center', width:'100%'}}>
//           <View style={{ alignSelf:'center',
//         marginHorizontal: 11,
//         width:264,
//         height: 70, borderRadius: 35, paddingHorizontal: 10,
//         ...Platform.select({
//           ios: {
//             shadowColor: '#171a1f',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0,
//             shadowRadius: 9,
//           },
//           android: {
//             elevation: 1,
//           },
//         }),
//       }}>
//         <View style={{ flexDirection: 'row', marginHorizontal: 16, }}>
//           {/* <Image source={Home} style={{ width: 28, height: 32, marginVertical: 15 }} /> */}
//             <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
//               <Shimmer containerStyle = {{height:'100%', width:'100%'}}></Shimmer>
//             </View>

//           </View>

//         </View>
//         </View>

//         <View
//           style={{
//             marginTop: 19,
//             // borderColor: 'red',
//             // borderWidth: 2,
//             marginHorizontal: 28,
//           }}>
//           <View style={styles.box_style}>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//             <View
//               style={[
//                 styles.box,
//               ]}>
//               <Shimmer containerStyle = {{height:72, borderRadius:10}}/>
//             </View>
//           </View>
//         </View>

//         <View
//           style={{
//             marginTop: 16,
//             marginHorizontal: 28,
//             backgroundColor: '#252D3FFF',
//             borderRadius: 26, height:40
//           }}>
//           <Shimmer containerStyle = {{height:'100%', width:'100%', borderRadius: 26,}}></Shimmer>
//         </View>

//         <View
//             style={{marginHorizontal: 28, marginVertical: 16,borderRadius:16}}
//             width={350}
//             height={220}
//           >
//             <Shimmer containerStyle = {{height:'100%', width:'100%', borderRadius: 26,}}></Shimmer>
//         </View>
//       </ScrollView>) : (
//           <ScrollView
//           style={styles.container}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={['#007BFF']} // Customize the loading spinner color
//               tintColor="#007BFF" // Customize the loading spinner color (Android)
//             />
//           }
//         >
//           <View style={{marginTop:20}}>
//             <Text style={{fontSize:20, alignSelf:'center', color:'red', justifyContent:'center'}}>No property found!</Text>
//           </View>
//         </ScrollView>

//         )}
//       <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
//         <Bottom />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   box_style: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   box: {
//     width: 101,
//     height: 71,
//     backgroundColor: '#252D3FFF',
//     borderRadius: 17,
//   },
//   boxText: {
//     fontSize: 9,
//     fontWeight: '400',
//     lineHeight: 14,
//     color: '#FFFFFFFF',
//     paddingLeft: 20,
//   },
//   boxNumber: {
//     fontSize: 14,
//     fontWeight: '700',
//     lineHeight: 36,
//     color: '#FFFFFFFF',
//   },
//   text: {
//     fontSize: 8,
//     fontWeight: '400',
//     lineHeight: 14,
//     color: '#FFFFFFFF',
//     marginTop: 8,
//     paddingLeft: 5,
//   },
//   inside_box: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// for linechart

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import {ScrollView, Animated} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';

import {SandtoneHome} from '../../utils/SandtoneHome';
import BackNavigation from '../../components/backNavigation';
// import {BarChart, ProgressChart, GaugeChart} from 'react-native-chart-kit';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Swiper from 'react-native-swiper';
import leftArrow from '../../assets/dashbordLeftArrow.png';
import rightArrow from '../../assets/dashbordRightArrow.png';
import lightArrow from '../../assets/lighticon.png';
import airArrow from '../../assets/airicon.png';
import waterArrow from '../../assets/watericon.png';
import dashRight from '../../assets/dashProRight.png';
import dashLeft from '../../assets/dashProLeft.png';
import Home from '../../assets/FillHomeImage.png';
import {Toast} from 'react-native-toast-notifications';
// import {Svg, Text as SvgText} from 'react-native-svg';

//  images
import electricity from '../../assets/electricity/electricityIcon.png';
import arrow from '../../assets/RightArrow.png';
import Bottom from '../../components/Bottom';
import {COMPANY_ID} from '../../helpers/enum';
import {
  getConsumptionMasters,
  getConsumptionData,
} from '../../redux/slice/getConsumptionMaster';
import {useDispatch, useSelector} from 'react-redux';
import Shimmer from '../../utils/Shimmer';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
import {current} from '@reduxjs/toolkit';
import {COLOR_LIST} from '../../helpers/colorlist';
import {UTILITY} from '../../helpers/meterData';
import {
  getColorByConsumption,
  getWidthByScreenSize,
} from '../../helpers/commonFunction';
import {Alert} from 'react-native';

export const Consumption = ({route}) => {
  const screenWidth = Dimensions.get('window').width;
  const cycle = {1: 'Today', 2: 'This Week', 3: 'This Month', 4: 'This Year'}; // To display inside circular progress
  const dispatch = useDispatch();
  const {
    getConsumptionMasterIsLoading,
    getConsumptionMasterData,
    getConsumptionMasterIsSuccess,
    getConsumptionMasterIsError,
    getConsumptionDashboardIsLoading,
    getConsumptionDashboardData,
    getConsumptionDashboardIsSuccess,
    getConsumptionDashboardIsError,
    getConsumptionLineXData,
    getConsumptionLineYData,
    consumptionProgressData,
    consumptionHourlyData,
  } = useSelector(state => ({
    getConsumptionMasterIsLoading:
      state.consumptionData.getConsumptionMasterIsLoading,
    getConsumptionMasterData: state.consumptionData.getConsumptionMasterData,
    getConsumptionMasterIsSuccess:
      state.consumptionData.getConsumptionMasterIsSuccess,
    getConsumptionMasterIsError:
      state.consumptionData.getConsumptionMasterIsError,

    getConsumptionDashboardIsLoading:
      state.consumptionData.getConsumptionDashboardIsLoading,
    getConsumptionDashboardData:
      state.consumptionData.getConsumptionDashboardData,
    getConsumptionDashboardIsSuccess:
      state.consumptionData.getConsumptionDashboardIsSuccess,
    getConsumptionDashboardIsError:
      state.consumptionData.getConsumptionDashboardIsError,
    getConsumptionLineXData: state.consumptionData.getConsumptionLineXData,
    getConsumptionLineYData: state.consumptionData.getConsumptionLineYData,
    consumptionProgressData: state.consumptionData.consumptionProgressData,
    consumptionHourlyData: state.consumptionData.consumptionHourlyData,
  }));
console.log(getConsumptionDashboardData,"----------------------------------------------------",);

  const [selectedValue, setSelectedValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle data point press
  const handleDataPointPress = value => {
    setSelectedValue(value);
    //("hjrfohroego");
    setModalVisible(true); // Show modal
  };

  // Function to close modal
  const closeModal = () => {
    setModalVisible(false);
  };
  //(consumptionHourlyData,"00000000000");
  const [noDataFound, setNoDataFound] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setNoDataFound(false);
    setRefreshing(true);
    getMasters();
    // Simulate a refresh action (e.g., fetch new data)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a 2-second refresh process
  };

  const LineChartData = {
    labels: getConsumptionLineXData,

    datasets: [
      {
        data: getConsumptionLineYData,
        color: (opacity = 1) => `rgba(0,0,0,${opacity})`, 
        strokeWidth: 2, 
      },
    ],
  };

  console.log(getConsumptionLineYData,"getConsumptionLineYDatagetConsumptionLineYData",getConsumptionLineXData);

  const [viewMode, setViewMode] = useState('daily');
  const [selectedDay, setSelectedDay] = useState(null);
  const [data, setData] = useState({
    labels: [],
    datasets: [{data: []}],
  });
  const [hourlyData, setHourlyData] = useState([]);
  const [selectedHourlyData, setSelectedHourlyData] = useState([]);

  //(hourlyData,"hourlydatahourlydata");
  useEffect(() => {
    const lineChartDto = {
      xAxisdata: newXAxisdata,
      seriesLineData: newSeriesLineData,
    };

    const newXAxisdata = getConsumptionLineXData;
    const newSeriesLineData = getConsumptionLineYData;

    // Updating the lineChartDto with new data
    lineChartDto.xAxisdata = newXAxisdata;
    lineChartDto.seriesLineData = newSeriesLineData;

    const updatedData = {
      labels: lineChartDto.xAxisdata.map(day => day.slice(0, 3)),
      datasets: [{data: lineChartDto.seriesLineData}],
    };
    setData(updatedData);

    if (consumptionHourlyData !== null) {
      var sampleHourlyData = [];
      consumptionHourlyData?.forEach(function (item) {
        // Extract relevant information
        var day = item.parentID; // Assuming this is the day
        var time = item.arg; // Assuming this is the time
        var value = item.val;

        // Push the extracted information into the sampleHourlyData array
        sampleHourlyData.push({
          parentID: day,
          arg: time,
          val: value,
        });
      });
    } else {
      //('No consumption hourly data available.');
    }

    setHourlyData(sampleHourlyData);
  }, [getConsumptionLineXData, getConsumptionLineYData]);

  const handleBarPress = index => {
    const selectedDate = data.labels[index];
    setSelectedDay(selectedDate);
    //(selectedDate);

    // const matchedData = hourlyData.filter(item => item.parentID.slice(0, 3) === selectedDate);
    if (hourlyData && hourlyData.length > 0) {
      const matchedData = hourlyData.filter(
        item => item.parentID.slice(0, 3) === selectedDate,
      );
      if (matchedData.length > 0) {
        setSelectedHourlyData(matchedData);
      } else {
        // setSelectedHourlyData([
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },
        //   { arg: "", val: 4.227, parentID: "" },

        //   // { arg: "10:00", val: 1.224, parentID: "Sat." },
        //   // { arg: "09:00", val: 1.311, parentID: "Sat." },
        //   // { arg: "08:00", val: 0.293, parentID: "Sat." },
        //   // { arg: "07:00", val: 0.361, parentID: "Sat." },
        //   // { arg: "06:00", val: 0.16, parentID: "Sat." },
        //   // { arg: "05:00", val: 0.158, parentID: "Sat." },
        //   // { arg: "04:00", val: 0.152, parentID: "Sat." },
        //   // { arg: "03:00", val: 0.152, parentID: "Sat." },
        //   // { arg: "02:00", val: 0.166, parentID: "Sat." },
        //   // { arg: "01:00", val: 0.166, parentID: "Sat." },
        //   // { arg: "00:00", val: 0.084, parentID: "Sat." },
        //   // { arg: "Fri.", val: 23.906, parentID: "" },
        //   // { arg: "23:00", val: 0.232, parentID: "Fri." },
        //   // { arg: "22:00", val: 0.371, parentID: "Fri." },
        //   // { arg: "21:00", val: 0.502, parentID: "Fri." },
        // ]);
        setSelectedHourlyData([{arg: ' ', val: 0}]);
      }
      setViewMode('hourly');
    } else {
      //('hourlyData is null or empty.');
    }
    // if (matchedData.length > 0) {
    //   setSelectedHourlyData(matchedData);
    //   setViewMode('hourly');
    // } else {
    //   setSelectedHourlyData([]);
    // }
  };
  // //(hourlyData,"kkkkkkk");

  const goBackToDaily = () => {
    setViewMode('daily');
    setSelectedDay(null);
    if (selectedView != 'Daily') {
      goBackToDaily();
    }
  };
  //(selectedHourlyData,"selectedHourlyData");

  // const labels = selectedHourlyData.map((item, index) => {
  //   // Original label processing
  //   const originalLabel = item.arg.replace(/^0*|\:00$/g, '');

  //   // Alternate label logic
  //   const alternateLabel = ''; // Replace this with your actual alternate label logic

  //   // Return original label for even indices and alternate label for odd indices
  //   return index % 2 === 0 ? originalLabel : alternateLabel;
  // });
  const labels = selectedHourlyData
    .map((item, index) => {
      // Original label processing
      const originalLabel = item.arg.replace(/^0*|\:00$/g, '');

      // Alternate label logic (replace with your actual logic)
      const alternateLabel = ''; // Replace with your alternate label logic here

      // Return alternate label for even indices and original label for odd indices
      return index % 2 === 0 ? alternateLabel : originalLabel;
    })
    .reverse();
  const chartData =
    viewMode === 'daily'
      ? data
      : {
          // labels: selectedHourlyData.map(item => item.arg),
          //  labels :selectedHourlyData.map(item => item.arg.replace(":00", "")),
          //  labels : selectedHourlyData.map(item => item.arg.replace(/^0*|\:00$/g, "")),

          labels: labels,

          datasets: [{data: selectedHourlyData.map(item => item.val)}],
        };

  const maxLabelLength = Math.max(
    ...chartData.labels.map(label => label.length),
  );
  const shouldEnableScroll = maxLabelLength > 56;

  //(chartData,"chartDtta",LineChartData,"lineChatdata...");

  const chartConfig = {
    backgroundGradientFrom: COLOR_LIST.GRAPH_BG, // Black
    backgroundGradientFromOpacity: 1, // 50% opacity
    backgroundGradientTo: '#33478B', // Light grayish-blue
    backgroundGradientToOpacity: 0.8, // 50% opacity
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for text with full opacity
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for labels with full opacity
    onClick: function () {
      //("----------");
    },
    barPercentage: 0.6,
  };

  const [selectedView, setSelectedView] = useState('Daily');
  const [selectedCycle, setSelectedCycle] = useState(1);
  const [selectedMeter, setSelectedMeter] = useState(
    route?.params?.meterId || '',
  );
  console.log(route?.params?.propertyName?.selectedPropertyName,'propspropsprops', route?.params?.meterId,route?.params?.propertyId?.selectedProperty);
  const handleViewClick = view => {
    setSelectedView(view.name); //selectedView === view ? null : view
    setSelectedCycle(view.id);
    getConsumptionDashboard(selectedMeter);
  };

  const getViewBackgroundColor = view => {
    return selectedView === view ? '#FFFFFFFF' : '#252D3FFF';
  };

  const getViewFontColor = view => {
    return selectedView === view ? '#252D3FFF' : '#FFFFFFFF';
  };

  const [consumptionCylceList, setConsumptionCylceList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [averageConsumption, setAverageConsumption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentUtility, setCurrentUtility] = useState(null);

  useEffect(() => {
    setNoDataFound(false);
    setAverageConsumption(null);
    if (getConsumptionMasterData && getConsumptionMasterIsSuccess) {
      setConsumptionCylceList(getConsumptionMasterData.consumptionCylceList);
      setPropertyList(getConsumptionMasterData.propertyList);
      setNoDataFound(false);
      setSelectedView(
        getConsumptionMasterData &&
          getConsumptionMasterData[0] &&
          getConsumptionMasterData[0].name
          ? getConsumptionMasterData[0].name
          : null,
      );
      // setSelectedMeter(getConsumptionMasterData.propertyList[currentIndex] ? getConsumptionMasterData.propertyList[currentIndex].meterList[0].meterId.toString(): '62030884');
      if (getConsumptionMasterData.propertyList.length > 0) {
        getConsumptionDashboard(
          getConsumptionMasterData.propertyList[0]?.meterList[0]?.meterId.toString() ||
            '',
        );
        setCurrentUtility(
          getConsumptionMasterData.propertyList[0]?.meterList[0]?.utilityType
            .charAt(0)
            .toUpperCase() +
            getConsumptionMasterData.propertyList[0]?.meterList[0]?.utilityType.slice(
              1,
            ),
        );
      }
    } else {
      setConsumptionCylceList([]);
      setPropertyList([]);
      getMasters();
      setNoDataFound(true);
    }

    // //("==", getConsumptionDashboardData);
  }, [getConsumptionMasterData, getConsumptionMasterIsSuccess]);

  useEffect(() => {
    getMasters();
  }, []);
  useEffect(() => {
    setAverageConsumption(null);
    // setProgress(0);
    setNoDataFound(false);
    //("getConsumptionDashboardDatagetConsumptionDashboardData", getConsumptionDashboardData);
    if (
      getConsumptionDashboardData &&
      getConsumptionDashboardIsSuccess === true &&
      getConsumptionDashboardIsLoading === false &&
      getConsumptionDashboardData.consumptionCycleId === selectedCycle
    ) {
      setAverageConsumption(getConsumptionDashboardData.aerageConsumption);
   
      setProgress(
        (
          (consumptionProgressData.actualValue /
            consumptionProgressData.targetValue) *
          100
        ).toFixed(2)
      );
  
      console.log(consumptionProgressData ,"0-9-9-9-9-9-9",consumptionProgressData.targetValue);
      // setProgressRingData({
      //   // labels: ["Swim"], // optional
      //   data: [consumptionProgressData.actualValue/consumptionProgressData.targetValue * 100] // Calculating consumption usage percentage
      // })
    } else {
      getConsumptionDashboard(selectedMeter);
      setAverageConsumption(null);
      setNoDataFound(true);
    }

    //("==", getConsumptionDashboardData);
  }, [getConsumptionDashboardData, getConsumptionDashboardIsSuccess]);

  // const [selectedValue, setSelectedValue] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState({x: 0, y: 0});

  const handleDataPointClick = data => {
    const roundedValue = data.value.toFixed(1); // Round the value to 2 decimal places
    setSelectedValue(roundedValue);
    console.log(data.value, 'data.value');
    setSelectedPoint({x: data.x, y: data.y});
  };

  // console.log(  getConsumptionDashboardIsSuccess , getConsumptionDashboardIsLoading,"averageConsumptionaverageConsumptionaverageConsumption");
  const getMasters = async () => {
    let userId = await AsyncStorage.getItem('userId');
    let dataObj = {
      userId: userId,
      companyId: COMPANY_ID,
    };
    //('======================1', dataObj);
    dispatch(getConsumptionMasters(dataObj));
  };

  // console.log(
  //   getConsumptionLineYData?.lineChartDto?.seriesLineData[0],
  //   'getConsumptionDashboardDatagetConsumptionDashboardData',
  // );

  const getConsumptionDashboard = async meterId => {
    setSelectedMeter(meterId);
    setAverageConsumption(null);
    let userId = await AsyncStorage.getItem('userId');
    let dataObj = {
      // propertyId: propertyList[currentIndex].propertyId,
      
      meterId: meterId,
      consumptionCylceTypeId: selectedCycle,
    };
    //('======================1', dataObj);
    dispatch(getConsumptionData(dataObj));
  };

  const swiperRef = React.createRef();
  const swiperRefPro = React.createRef();

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };

  //(chartData,"chartDatachartDatachartData");

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1, true);
    }
  };
  const [index, setIndex] = useState(0);
  const handleNextPro = () => {
    //('===================', swiperRefPro.current);
    if (
      swiperRefPro.current.state.index < propertyList.length - 1 &&
      swiperRefPro.current
    ) {
      swiperRefPro.current.scrollBy(1, true);
    }
  };

  const handlePrevPro = () => {
    if (swiperRefPro.current.state.index > 0 && swiperRefPro.current) {
      swiperRefPro.current.scrollBy(-1, true);
    }
  };

  //(selectedView,"selectedview");

  const [indexOne, setIndexOne] = useState(0);

  const scrollToNext = () => {
    setIndexOne(indexOne + 1);
  };

  const scrollToPrevious = () => {
    setIndexOne(indexOne - 1);
  };
  const ringConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 202, 79, ${opacity})`, // Green color
    strokeWidth: 20, // Width of the progress ring
    barPercentage: 0.8,
    useShadowColorFromDataset: false,
  };
  // const [progressRingData, setProgressRingData] = useState({
  //   // labels: ["Swim"], // optional
  //   data: [consumptionProgressData.actualValue/consumptionProgressData.targetValue * 100] // Calculating consumption usage percentage
  // });

  // const gaugeData = {
  //   labels: ['Low', 'Medium', 'High'],
  //   data: [0.4, 0.6, 0.8],
  // };
  const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect(() => {
  //   getConsumptionDashboard();
  // }, [selectedMeter]);

  const handlePropertyChanged = index => {
    //("===============================prop id=", index);
    if (index >= 0 && index < propertyList.length) {
      setCurrentIndex(index);
      setSelectedMeter(
        propertyList ? propertyList[index].meterList[0].meterId.toString() : '',
      );
      //("===============================prop Meter=", selectedMeter, propertyList[index].meterList[0]);
      getConsumptionDashboard(
        propertyList ? propertyList[index].meterList[0].meterId.toString() : '',
      );
      setCurrentUtility(
        propertyList
          ? propertyList[index].meterList[0].utilityType
              .charAt(0)
              .toUpperCase() +
              propertyList[index].meterList[0].utilityType.slice(1)
          : '',
      );
    }
  };

  const handleBarClick = data => {
    //('kjhkj');
    Alert.alert(`Bar Clicked`, `Label: ${data.x}\nValue: ${data.y}`);
  };

  // const fillAnimation = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.timing(fillAnimation, {
  //     duration: 2000, // Animation duration
  //     useNativeDriver: false, // Make sure to set this to false when using AnimatedCircularProgress
  //   }).start();
  // }, [fillAnimation]);
console.log(averageConsumption, progress,getConsumptionLineYData[0] );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F8F9FAFF',
        // borderColor: 'red',
        borderWidth: 2,
      }}>
      <BackNavigation
        title={`Consumption Dashboard`}
        screenName={'dashBoard'}
        isRightIcon={true}
        backgroundColor={'#F8F9FA00'}
      />
      {getConsumptionMasterIsSuccess && getConsumptionMasterData ? (
        <ScrollView
          style={{flex: 1, marginBottom: 60}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007BFF']} // Customize the loading spinner color
              tintColor="#007BFF" // Customize the loading spinner color (Android)
            />
          }>
          { getConsumptionDashboardIsSuccess==true && getConsumptionDashboardIsLoading ==false  && averageConsumption ? (
            <View
              style={{
                marginTop: 20,
                height: 200,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AnimatedCircularProgress
                size={200}
                width={20}
                fill={progress}
                tintColor={UTILITY[currentUtility]?.primeColor  }
              
                backgroundColor={UTILITY[currentUtility]?.secondaryColor  }
                lineCap="round"
                arcSweepAngle={260}
                duration={2000}
                rotation={230}
                onAnimationComplete={() => console.log('onAnimationComplete')}
              />
              <Text
                style={{
                  position: 'absolute',
                  bottom: 30,
                  left: '72%',
                  color: '#000',
                  fontSize: 10,
                }}>
                {consumptionProgressData.targetValue}
                {getConsumptionDashboardData.meterUnit}
                
              </Text>

              <View style={{position: 'absolute', alignItems: 'center'}}>
                <Image
                  source={UTILITY[currentUtility]?.icon}
                  style={{
                    marginTop: 0,
                    width: 30,
                    height: 30,
                    borderRadius: 25,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    color: getColorByConsumption(progress),
                    fontSize: 26,
                  }}>
                  {/* {consumptionProgressData.actualValue.toFixed(2)}{' '}pppp */}
                  {getConsumptionLineYData[0]}
                  {/* {getConsumptionLineYData?.lineChartDto?.seriesLineData[0]?.toFixed(2)}ppp */}

                  <Text
                    style={{fontSize: 10, fontFamily: COLOR_LIST.FONT_REGULAR}}>
                    {getConsumptionDashboardData.meterUnit}
                  </Text>
                </Text>
                <Text
                  style={{
                    color: COLOR_LIST.TEXT,
                    fontSize: 12,
                    fontFamily: COLOR_LIST.FONT_REGULAR,
                  }}>
                  {cycle[selectedCycle]}
                </Text>
                <Text style={{color: COLOR_LIST.TEXT, fontSize: 12}}>
                  {/* {progress} oppipipip */}
                  {parseFloat(
  ((consumptionProgressData.actualValue / consumptionProgressData.targetValue) * 100).toFixed(2)
)} % of target
                  
                </Text>
                <Text
                  style={{
                    color: UTILITY[currentUtility]?.secondaryColor || "#354865",
                    fontSize: 12,
                  }}>
                  #{selectedMeter}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: 200,
                paddingTop: 25,
                alignItems: 'center',
              }}>
              <Shimmer
                containerStyle={{height: 170, width: 170, borderRadius: 85}}
              />
            </View>
            //  <View
            //   style={{
            //     marginTop: 20,
            //     height: 200,
            //     width: '100%',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //   }}>
            //   <AnimatedCircularProgress
            //     size={200}
            //     width={20}
            //     fill={progress}
            
            //     tintColor={'#71B2FF'}
            //     backgroundColor={"#354865"}
            //     lineCap="round"
            //     arcSweepAngle={260}
            //     duration={2000}
            //     rotation={230}
            //     onAnimationComplete={() => console.log('onAnimationComplete')}
            //   />
            //   <Text
            //     style={{
            //       position: 'absolute',
            //       bottom: 30,
            //       left: '72%',
            //       color: '#000',
            //       fontSize: 10,
            //     }}>
            //     {consumptionProgressData.targetValue}
            //     {getConsumptionDashboardData.meterUnit}
                
            //   </Text>

            //   <View style={{position: 'absolute', alignItems: 'center'}}>
            //     <Image
            //       source={UTILITY[currentUtility]?.icon}
            //       style={{
            //         marginTop: 0,
            //         width: 30,
            //         height: 30,
            //         borderRadius: 25,
            //         alignSelf: 'center',
            //       }}
            //     />
            //     <Text
            //       style={{
            //         // color: getColorByConsumption(progress),
            //         fontSize: 26,
            //       }}>
            //       {/* {consumptionProgressData.actualValue.toFixed(2)}{' '}pppp */}
            //       {getConsumptionLineYData[0]}
            //       {/* {getConsumptionLineYData?.lineChartDto?.seriesLineData[0]?.toFixed(2)}ppp */}

            //       <Text
            //         style={{fontSize: 10, fontFamily: COLOR_LIST.FONT_REGULAR}}>
            //         {getConsumptionDashboardData.meterUnit}
            //       </Text>
            //     </Text>
            //     <Text
            //       style={{
            //         color: COLOR_LIST.TEXT,
            //         fontSize: 12,
            //         fontFamily: COLOR_LIST.FONT_REGULAR,
            //       }}>
            //       {cycle[selectedCycle]}
            //     </Text>
            //     <Text style={{color: COLOR_LIST.TEXT, fontSize: 12}}>
            //       {progress} % of target
            //     </Text>
            //     <Text
            //       style={{
            //         color: UTILITY[currentUtility]?.secondaryColor,
            //         fontSize: 12,
            //       }}>
            //       #{selectedMeter}
            //     </Text>
            //   </View>
            // </View>
          )}
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {propertyList.length > 0 ? (
              <FlatList
                data={propertyList[currentIndex].meterList}
                // style={{borderColor:'red', borderWidth:2}}

                horizontal
                renderItem={({item}) => {
                  return (
                    <Pressable
                      onPress={() => {
                        getConsumptionDashboard(item.meterId);
                        setCurrentUtility(
                          item.utilityType.charAt(0).toUpperCase() +
                            item.utilityType.slice(1),
                        );
                      }}
                      style={{
                        backgroundColor:
                          item.meterId === selectedMeter
                            ? COLOR_LIST.DARK_CARD_BG
                            : COLOR_LIST.BRIGHT_BG,
                        borderRadius: 3,
                        shadowColor: '#171a1f',
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        paddingHorizontal: 7,
                        margin: 5,
                      }}>
                      <View style={{marginVertical: 5}}>
                        <Image
                          source={
                            UTILITY[
                              item.utilityType.charAt(0).toUpperCase() +
                                item.utilityType.slice(1)
                            ].icon
                          }
                          style={{width: 18, height: 18}}
                        />
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 14,
                            color:
                              item.meterId === selectedMeter
                                ? COLOR_LIST.BRIGHT_TEXT
                                : COLOR_LIST.TEXT,
                          }}>
                          {item.meterId}
                        </Text>
                      </View>
                    </Pressable>
                  );
                }}
                keyExtractor={item => item.toString()}
                initialScrollIndex={indexOne}
                scrollToIndex={params => {
                  scrollToNext(params.index);
                }}
              />
            ) : null}
          </View>
          <View
            key={index}
            style={{
              marginTop: 10,
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={handlePrevPro} style={{}}>
              <Image style={{width: 30, height: 30}} source={dashLeft} />
            </TouchableOpacity>
            <Swiper
              style={{height: 110}}
              ref={swiperRefPro}
              loop={false}
              showsPagination={false}
              onIndexChanged={handlePropertyChanged}>
              {propertyList.map((item, index) => {
                return (
                  <View style={{flex: 1}} key={index}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10,
                        marginVertical: 15,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: '#FFFFFFFF',
                        ...Platform.select({
                          ios: {
                            shadowColor: '#171a1f',
                            shadowOffset: {width: 0, height: 4},
                            shadowOpacity: 0.2,
                            shadowRadius: 9,
                          },
                          android: {
                            elevation: 5,
                          },
                        }),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View>
                          <Image
                            source={Home}
                            style={{width: 28, height: 32}}
                          />
                        </View>
                        <View style={{marginHorizontal: 20, marginVertical: 3}}>
                          <Text
                            style={{
                              fontFamily: 'Catamaran-SemiThick',
                              fontSize: 16,
                              fontWeight: '400',
                              color: '#171A1FFF',
                            }}>
                            {item.propertyName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: '#171A1FFF',
                              marginTop: 5,
                            }}>
                            Unit No: {item.unitNumber}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </Swiper>

            <TouchableOpacity onPress={handleNextPro} style={{}}>
              <Image style={{width: 30, height: 30}} source={dashRight} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 19,
              // borderColor: 'red',
              // borderWidth: 2,
              marginHorizontal: 28,
            }}>
            {getConsumptionDashboardIsSuccess==true && getConsumptionDashboardIsLoading == false   && averageConsumption ? (
              <View style={styles.box_style}>
                <View style={[styles.box]}>
                  <View style={{marginVertical: 11}}>
                    <Text style={styles.boxText}>Daily</Text>
                    <View style={styles.inside_box}>
                      <Text style={styles.boxNumber}>
                        {averageConsumption?.daily.toFixed(2)}
                      </Text>
                      <Text style={styles.text}>
                        {getConsumptionDashboardData?.meterUnit}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        marginTop: -7,
                        height: 0,
                        marginHorizontal: 5,
                        borderColor: '#EC3237FF',
                        borderStyle: 'solid',
                        borderBottomWidth: 6,
                        borderBottomRightRadius: 60,
                        borderBottomLeftRadius: 50,
                      }}></Text>
                  </View>
                </View>
                <View style={[styles.box]}>
                  <View style={{marginVertical: 11}}>
                    <Text style={styles.boxText}>Day Time</Text>
                    <View style={styles.inside_box}>
                      <Text style={styles.boxNumber}>
                        {averageConsumption?.dayTime.toFixed(2)}
                      </Text>
                      <Text style={styles.text}>
                        {getConsumptionDashboardData.meterUnit}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        marginTop: -7,
                        height: 0,
                        marginHorizontal: 5,
                        borderColor: '#EC3237FF',
                        borderStyle: 'solid',
                        borderBottomWidth: 6,
                        borderBottomRightRadius: 60,
                        borderBottomLeftRadius: 50,
                      }}></Text>
                  </View>
                </View>
                <View style={[styles.box, {}]}>
                  <View style={{marginVertical: 11}}>
                    <Text style={styles.boxText}>Night Time</Text>
                    <View style={styles.inside_box}>
                      <Text style={styles.boxNumber}>
                        {averageConsumption?.nightTime.toFixed(2)}
                      </Text>
                      <Text style={styles.text}>
                        {getConsumptionDashboardData.meterUnit}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        marginTop: -7,
                        height: 0,
                        marginHorizontal: 5,
                        borderColor: '#EC3237FF',
                        borderStyle: 'solid',
                        borderBottomWidth: 6,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}></Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.box_style}>
                <View style={[styles.box]}>
                  <Shimmer containerStyle={{height: 72, borderRadius: 10}} />
                </View>
                <View style={[styles.box]}>
                  <Shimmer containerStyle={{height: 72, borderRadius: 10}} />
                </View>
                <View style={[styles.box]}>
                  <Shimmer containerStyle={{height: 72, borderRadius: 10}} />
                </View>
              </View>
              
            )}
          </View>
          <View
            style={{
              marginTop: 16,
              marginHorizontal: 28,
              backgroundColor: '#252D3FFF',
              paddingHorizontal: 5,
              paddingVertical: 3,
              borderRadius: 26,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {consumptionCylceList?.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleViewClick(item)}>
                  <View
                    style={{
                      width: 70,
                      height: 39,
                      backgroundColor: 'red',
                      borderRadius: 28,
                      backgroundColor: getViewBackgroundColor(item.name),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: getViewFontColor(item.name),
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {getConsumptionDashboardIsSuccess==true && getConsumptionDashboardIsLoading ==false  && averageConsumption ?  (
            selectedView === 'Daily' ? (
              <View style={{marginVertical: 10}}>
                {viewMode === 'hourly' && (
                  <TouchableOpacity
                    onPress={goBackToDaily}
                    style={{paddingBottom: 5, backgroundColor: '#252D3FFF'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: '#FFFFFFFF',
                      }}>
                      Back to Daily
                    </Text>
                  </TouchableOpacity>
                )}
                {viewMode === 'hourly' ? (
                  <View style={{}}>
                    {/* <LineChart
            data={chartData}
            width={356}  
            height={200} 
            xLabelsOffset={-10}
            yAxisSuffix=""
            yAxisInterval={1}
            fontSize={10}
            chartConfig={{
              backgroundGradientFrom: COLOR_LIST.GRAPH_BG,
              backgroundGradientFromOpacity: 1,
              backgroundGradientTo: '#33478B',
              backgroundGradientToOpacity: 0.8,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                borderColor: '#ffffff',
                borderWidth: 2,
              },
              barPercentage: 0.2,
            }}
            // onDataPointClick={({ value }) => handleDataPointPress(value)}

            bezier
            // onDataPointClick={({ value }) => handleDataPointPress(value)}
            // bezier
            renderDotContent={({ x, y, index, value }) => (
              <TouchableOpacity onPress={() => handleDataPointPress(value)} style={{ position: 'absolute', top: y - 24, left: x - 12 }}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 10 }}>{value}</Text>
              </TouchableOpacity>
            )}
          
          /> */}
                    <LineChart
                      data={chartData}
                      // width={356}
                      width={getWidthByScreenSize(100)}
                      fromZero={true}
                      height={200}
                      xLabelsOffset={-10}
                      yAxisSuffix=""
                      yAxisInterval={1}
                      chartConfig={{
                        backgroundGradientFrom: COLOR_LIST.GRAPH_BG,
                        backgroundGradientFromOpacity: 1,
                        backgroundGradientTo: '#33478B',
                        backgroundGradientToOpacity: 0.8,
                        color: (opacity = 1) =>
                          `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) =>
                          `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                          borderColor: '#ffffff',
                          borderWidth: 2,
                        },
                        barPercentage: 0.2,
                      }}
                      onDataPointClick={handleDataPointClick}
                    />
                    {selectedValue !== null && (
                      <View
                        style={{
                          position: 'absolute',
                          left: selectedPoint.x,
                          top: selectedPoint.y - 10,
                          backgroundColor: 'white',
                          padding: 2,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: COLOR_LIST.TEXT,
                            fontWeight: '300',
                            fontSize: 10,
                          }}>
                          {selectedValue}{' '}
                          {getConsumptionDashboardData.meterUnit}
                        </Text>
                      </View>
                    )}

                    {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Selected Value: {selectedValue}</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
                  </View>
                ) : (
                  <View style={{}}>
                    <BarChart
                      data={chartData}
                      // width={340}
                      // height={300}
                      // width={355}
                      width={getWidthByScreenSize(100)}
                      height={200}
                      fromZero={true}
                      yAxisSuffix=""
                      showValuesOnTopOfBars={true}
                      yAxisInterval={1}
                      chartConfig={{
                        backgroundGradientFrom: COLOR_LIST.GRAPH_BG,
                        backgroundGradientFromOpacity: 1,
                        backgroundGradientTo: '#33478B',
                        backgroundGradientToOpacity: 0.8,
                        color: (opacity = 1) =>
                          `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) =>
                          `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                          borderColor: '#ffffff',
                          borderWidth: 2,
                          marginLeft: 0,
                        },
                        barPercentage: 0.6,
                      }}
                    />
                    {data.datasets[0].data.map((value, index) => (
                      <View key={index} style={{left: 78}}>
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            // left: index * 45,
                            marginHorizontal: index * 47,

                            bottom: 0,
                            width: 25,

                            height: 200,
                            // borderColor:'red',borderWidth:2
                          }}
                          onPress={() => handleBarPress(index)}
                        />
                      </View>
                    ))}
                  </View>
                )}
                {viewMode === 'hourly' &&
                  selectedHourlyData.length === 1 &&
                  selectedHourlyData[0].arg === ' ' && (
                    <View
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: [{translateX: -50}, {translateY: -50}],
                        zIndex: 10,
                      }}>
                      <Text style={{fontSize: 18, color: '#ff0000'}}>
                        No data found
                      </Text>
                    </View>
                  )}
              </View>
            ) : (
              <View style={{}}>
                <BarChart
                  data={LineChartData}
                  style={{
                    marginVertical: 16,
                    borderRadius: 16,
                    alignSelf: 'center',
                  }}
                  width={getWidthByScreenSize(90)}
                  height={220}
                  chartConfig={chartConfig}
                  showValuesOnTopOfBars={true}
                  fromZero={true}
                  showBarTops={false}
                  onDataPointClick={() => {
                    console.log('masoud');
                  }}
                />
              </View>
            )
          ) : null}
        </ScrollView>
      ) : !noDataFound || true ? ( // remove true to show no data
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007BFF']} // Customize the loading spinner color
              tintColor="#007BFF" // Customize the loading spinner color (Android)
            />
          }>
          <View
            style={{
              width: '100%',
              height: 200,
              paddingTop: 25,
              alignItems: 'center',
            }}>
            <Shimmer
              containerStyle={{height: 170, width: 170, borderRadius: 85}}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              alignContent: 'center',
              width: '100%',
            }}>
            <View
              style={{
                alignSelf: 'center',
                marginHorizontal: 11,
                width: 264,
                height: 70,
                borderRadius: 35,
                paddingHorizontal: 10,
                ...Platform.select({
                  ios: {
                    shadowColor: '#171a1f',
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0,
                    shadowRadius: 9,
                  },
                  android: {
                    elevation: 1,
                  },
                }),
              }}>
              <View style={{flexDirection: 'row', marginHorizontal: 16}}>
                {/* <Image source={Home} style={{ width: 28, height: 32, marginVertical: 15 }} /> */}
                <View style={{marginHorizontal: 20, marginVertical: 3,}}>
                  <Shimmer
                    containerStyle={{height: '100%', width: '100%'}}></Shimmer>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 19,
              // borderColor: 'red',
              // borderWidth: 2,
              marginHorizontal: 28,
            }}>
            <View style={styles.box_style}>
              <View style={[styles.box]}>
                <Shimmer containerStyle={{height: 72, borderRadius: 10}} />
              </View>
              <View style={[styles.box]}>
                <Shimmer containerStyle={{height: 72, borderRadius: 10}} />
              </View>
              <View style={[styles.box]}>
                <Shimmer containerStyle={{height: 72, borderRadius: 10}} />
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 16,
              marginHorizontal: 28,
              backgroundColor: '#252D3FFF',
              borderRadius: 26,
              height: 40,
            }}>
            <Shimmer
              containerStyle={{
                height: '100%',
                width: '100%',
                borderRadius: 26,
              }}></Shimmer>
          </View>

          <View
            style={{marginHorizontal: 28, marginVertical: 16, borderRadius: 16}}
            width={350}
            height={220}>
            <Shimmer
              containerStyle={{
                height: '100%',
                width: '100%',
                borderRadius: 26,
              }}></Shimmer>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007BFF']} // Customize the loading spinner color
              tintColor="#007BFF" // Customize the loading spinner color (Android)
            />
          }>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: 'red',
                justifyContent: 'center',
              }}>
              No property found!
            </Text>
          </View>
        </ScrollView>
      )}
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Bottom />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 101,
    height: 71,
    backgroundColor: '#252D3FFF',
    borderRadius: 17,
  },
  boxText: {
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14,
    color: '#FFFFFFFF',
    paddingLeft: 20,
  },
  boxNumber: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 36,
    color: '#FFFFFFFF',
  },
  text: {
    fontSize: 8,
    fontWeight: '400',
    lineHeight: 14,
    color: '#FFFFFFFF',
    marginTop: 8,
    paddingLeft: 5,
  },
  inside_box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
