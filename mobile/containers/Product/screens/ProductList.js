import React from "react"
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    FlatList,
} from "react-native"

import metrics from "../../../assets/constants/metrics"

import Header from "../../../components/Header/Header"
import CategoryList from "../components/CategoryList"
import SearchBox from "../../../components/Inputs/SearchBox"
import ProductItem from "../components/ProductItem"

import useProductList from "../hooks/useProductList"
import useCart from "../../Cart/hooks/useCart"

const ProductList = () => {
    const {
        products,
        hottestProducts,
        newestProducts,
        categories,
        isLoading,
        filters,
        canLoadMore,
        loadMore,
        changeFilters,
        getProducts,
        goToDetail,
    } = useProductList()

    const { addProduct } = useCart()

    const renderEmpty = () => <Text style={styles.noDataText}>No products.</Text>

    const renderFooter = () => {
        return canLoadMore ? (
            <TouchableOpacity onPress={loadMore}>
                <Text style={styles.loadMoreText}>Load more</Text>
            </TouchableOpacity>
        ) : null
    }

    const isHottest = filters.category === "hottest"
    const isNewest = filters.category === "newest"

    const data = isHottest 
        ? hottestProducts
        : isNewest
            ? newestProducts
            : products

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Header title="Product list" />
                <View style={styles.searchBox}>
                    <SearchBox
                        value={filters.search}
                        onSearch={(searchString) =>
                            changeFilters({ search: searchString })
                        }
                    />
                </View>
                <CategoryList
                    categories={categories}
                    activeCategoryId={filters.category}
                    setActiveCategoryId={(id) =>
                        filters.category !== id
                            ? changeFilters({ category: id })
                            : changeFilters({ category: null })
                    }
                />
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={getProducts}
                        />
                    }
                    numColumns={2}
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ProductItem
                            product={item}
                            onPress={() => goToDetail(item)}
                            addProduct={addProduct}
                        />
                    )}
                    ListEmptyComponent={renderEmpty}
                    ListFooterComponent={renderFooter}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: metrics.screenHeight,
        backgroundColor: "#fff",
    },
    searchBox: {
        paddingHorizontal: 4,
        paddingTop: 8,
    },
    loadMoreText: {
        textAlign: "center",
        marginBottom: 8,
        color: metrics.colorPrimaryDisabled,
        textDecorationLine: "underline",
    },
    noDataText: {
        textAlign: "center",
        marginTop: 8
    }
})

export default ProductList
