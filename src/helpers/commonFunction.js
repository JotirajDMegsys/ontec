import { PixelRatio, Dimensions } from "react-native";
import { COLOR_LIST } from "./colorlist";
const ValidateEmail = async (email) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
        return false;
    }
    else {
        return true
    }

};

const ValidateMobileNo = async (phoneNumber) => {
    let phoneRegex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
    if (phoneRegex.test(phoneNumber) === false) {
        return false;
    }
    else {
        return true
    }

};

const getFontSize = (text, baseFontSize, screenPercent) => {
    if(!text || !text?.length)
    return baseFontSize;
    // Get the screen width
    const screenWidth = Dimensions.get('window').width;

    // Calculate the length of the text
    const textLength = text?.length;

    // Calculate the dynamic font size based on text length and screen width
    const dynamicFontSize = Math.min(baseFontSize, screenWidth*screenPercent/ textLength);

    // Adjust font size based on pixel density
    const adjustedFontSize = dynamicFontSize * PixelRatio.getFontScale();

    return adjustedFontSize;
};

const getWidthByScreenSize = (screenPercent) => {
    // Get the screen width
    const screenWidth = Dimensions.get('window').width;
    return screenWidth * screenPercent/100;
};

const getColorByConsumption = (consumption) => {
    console.log("consumptionconsumption", consumption);
    if(consumption > 100){
        return COLOR_LIST.CONSUMPTION_COLORS['red']
    }else if(consumption >= 80){
        return COLOR_LIST.CONSUMPTION_COLORS['amber']
    }else if(consumption > 0){
        return COLOR_LIST.CONSUMPTION_COLORS['green']
    }else{
        return COLOR_LIST.CONSUMPTION_COLORS['default']
    }
}

// Function to make string upto specific charaters
const truncateString = (str, num) => {
    return str?.length > num ? str.slice(0, num) + "..." : str;
};

export { ValidateEmail, ValidateMobileNo, getFontSize, getWidthByScreenSize, getColorByConsumption, truncateString}
