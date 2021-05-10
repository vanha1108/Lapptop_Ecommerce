import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"

import { get as getAllCategories } from "../../../services/categoryService"
import { get, getTop } from "../../../services/productService"
import navigation from "../../../navigations/rootNavigation"
import screens from "../../../assets/constants/screens"

const useProductList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [canLoadMore, setCanLoadMore] = useState(false)
    const [products, setProducts] = useState([])
    const [hottestProducts, setHottestProducts] = useState([])
    const [newestProducts, setNewestProducts] = useState([])
    const [categories, setCategories] = useState([])

    const [filters, setFilters] = useState({
        limit: 20,
        page: 1,
        search: "",
        category: null,
        isMobile: true,
    })

    const changeFilters = useCallback(
        (valueObject) => {
            setFilters({
                ...filters,
                ...valueObject,
            })
        },
        [filters],
    )

    const getTopProducts = useCallback(async () => {
        try {
            const res = await getTop()
            const { newestProducts, hottestProducts } = res.data
            setNewestProducts(newestProducts)
            setHottestProducts(hottestProducts)
        } catch(err) {}
    }, [])

    const getCategories = useCallback(async () => {
        try {
            const res = await getAllCategories()
            setCategories(res.data?.items)
        } catch (err) {}
    }, [])

    const getProducts = useCallback(async () => {
        if (["hottest", "newest"].includes(filters.category)) return
        setIsLoading(true)
        try {
            const res = await get(filters)
            const { items, total } = res.data
            setProducts(items)
            setCanLoadMore(items.length < total)
        } catch (err) {
            Alert.alert(err.response?.data || err.message)
        }
        setIsLoading(false)
    })

    const goToDetail = useCallback((product) => {
        navigation.navigate(screens.PRODUCT_DETAIL, { product })
    }, [])

    const loadMore = useCallback(() => {
        changeFilters({ page: filters.page + 1 })
    }, [filters])

    useEffect(() => {
        getCategories()
        getTopProducts()
    }, [])

    useEffect(() => {
        getProducts()
    }, [filters])

    return {
        products,
        newestProducts,
        hottestProducts,
        categories,
        filters,
        changeFilters,
        isLoading,
        canLoadMore,
        getProducts,
        goToDetail,
        loadMore,
    }
}

export default useProductList
