import React from "react"
import { View, FlatList, StyleSheet } from "react-native"

import CategoryItem from "./CategoryItem"

const CategoryList = ({
    categories,
    activeCategoryId,
    setActiveCategoryId,
}) => {
    const data = [
        { _id: "hottest", name: "Top sale" },
        { _id: "newest", name: "Newest" },
        ...categories
    ]

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <CategoryItem
                        category={item}
                        isActive={
                            activeCategoryId && activeCategoryId === item._id
                        }
                        onPress={() => setActiveCategoryId(item._id)}
                    />
                )}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default CategoryList

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        height: 30,
    },
})
