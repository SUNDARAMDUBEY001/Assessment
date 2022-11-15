import axios from "axios";
import {
    url_getDropDownData,
    url_getCategoryData,
} from "../Config/ApiAddress";

export async function GetDropDownData() {
    //console.log("Request");
    const { data: resp } = await axios.get(url_getDropDownData);
    console.log(resp);
    return resp;
}

export async function GetCategoryData(category) {
    console.log(category);
    const { data: resp } = await axios.get(url_getCategoryData + category);
    console.log(resp);
    return resp;
}