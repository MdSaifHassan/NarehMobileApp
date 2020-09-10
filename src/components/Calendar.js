import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../defaultComponents/Colors";
import { ButtonOutline, ButtonFill } from "../defaultComponents/Button";

import dateFormat from "dateformat";

const Calendar = ({ text, calData, oneLess, inputDate }) => {
  console.log(new Date(), "first inputDate");
  let initialDate = inputDate
    ? // ? dateFormat(inputDate, "dd mmm yyyy")
      new Date(inputDate)
    : new Date();
  console.log(inputDate, "second inputDate");
  let oneMonthLess = oneLess
    ? initialDate.setMonth(initialDate.getMonth() - 1)
    : initialDate;
  let oML = dateFormat(initialDate, "dd mmm yyyy");
  console.log(initialDate, "one month less");

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [mode, setMode] = useState("date");
  const [oneMonth, setOneMonth] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(selectedDate, "selectedDate");
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  console.log(date, "DATEPiKER");
  console.log(show);

  // const CalIn = date;
  const CalIn = dateFormat(date, "dd mmm yyyy");
  console.log(CalIn, "test calin");
  // date.toDateString().slice(4).split(" ").join(" ");
  // console.log(date + "   -- calendar input");
  return (
    <View
      style={{
        borderWidth: show ? 0.3 : 0,
        borderBottomColor: Colors.grey4,
        marginBottom: 10,
        // alignSelf: "flex-start",
        // paddingHorizontal: 10,
        // justifyContent: "flex-start",
      }}
    >
      <View style={styles.calendar}>
        {text && <Text style={styles.text}>{text}</Text>}
        <TouchableOpacity onPress={() => setShow(true)}>
          <View style={styles.inputCalendar}>
            <Text style={styles.input}>
              {CalIn} {CalIn ? calData(CalIn) : null}
            </Text>

            <AntDesign name="calendar" size={20} color="rgb(131, 77, 155)" />
          </View>
        </TouchableOpacity>
      </View>

      {show && Platform.OS === "ios" ? (
        <View
          style={
            {
              // minWidth: 300,
              // alignSelf: "center",
              // marginBottom: 10,
            }
          }
        >
          <View
            style={{
              marginVertical: 4,
              alignSelf: "flex-end",
            }}
          >
            {/* <ButtonOutline
              color={Colors.red1}
              size={10}
              title="CLOSE"
              onPress={() => setShow(false)}
            /> */}
            <ButtonOutline onPress={() => setShow(false)}>
              <Text
                style={{
                  color: Colors.red1,
                  paddingHorizontal: 5,
                  fontSize: 10,
                }}
              >
                CLOSE
              </Text>
            </ButtonOutline>
          </View>
          <DateTimePicker
            style={{ justifyContent: "flex-start" }}
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            textColor={Colors.voilet1}
          />
        </View>
      ) : show ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="spinner"
          onChange={onChange}
          style={{ width: "100%" }}
        />
      ) : null}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  calendar: {
    flexDirection: "row",
    marginRight: 10,
    // marginBottom: 20,
    // alignSelf: "center",
    paddingVertical: 10,
    // backgroundColor: "green",
  },
  inputCalendar: {
    flexDirection: "row",
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1,
  },
  input: {
    paddingBottom: 7,
    paddingRight: 10,
    color: Colors.grey2,
  },
  text: {
    fontSize: 14,
    fontFamily: "roboto-medium",
    fontWeight: "500",
    color: Colors.black1,
    lineHeight: 22,
    width: 40,
  },
});
