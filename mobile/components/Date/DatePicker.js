import React from "react"
import { View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

export default ({ date, mode, onChange }) => <View>
    <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode || "date"}
        is24Hour={true}
        display="default"
        onChange={onChange}
    />
</View>