import {useScrollToTop, useTheme} from '@react-navigation/native'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPhotos} from '../../redux/actions/imageActions'
import Card from '../components/common/Card'
import Layout from '../components/common/Layout'

export default function BrowsePage({navigation}) {
    const {colors} = useTheme()
    const {page, per_page, order_by, photos, error} = useSelector(
        (state) => state.images
    )

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
    const [moreLoading, setMoreLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const ref = useRef(null)
    useScrollToTop(ref)

    useEffect(() => {
        ;(async function () {
            await dispatch(fetchPhotos())
            setIsLoading(false)
        })()
    }, [dispatch])

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        dispatch(fetchPhotos()).then(() => setRefreshing(false))
    }, [dispatch])

    const handleImage = (url, height, width) => {
        navigation.navigate({
            name: 'Modal',
            params: {url, height, width}
        })
    }
    const handleAddToCollection = ({photo_id, current_user_collections}) => {
        navigation.navigate({
            name: 'AddToCollection',
            params: {photo_id, current_user_collections}
        })
    }

    const handleLoadMore = () => {
        setMoreLoading(true)
        dispatch(fetchPhotos({page: page + 1, per_page, order_by})).then(() => {
            setMoreLoading(false)
            console.log('Fetched Page', page + 1)
        })
    }

    return (
        <Layout>
            {error && (
                <View style={s.loader}>
                    <Image
                        style={{height: 250, width: 250}}
                        source={require('../../assets/images/rate-limit.png')}
                    />
                </View>
            )}
            {isLoading ? (
                <View style={s.loader}>
                    <ActivityIndicator color={colors.text} size='large' />
                    <Text
                        style={[
                            s.text,
                            {
                                color: colors.text
                            }
                        ]}>
                        Loading...
                    </Text>
                </View>
            ) : (
                <FlatList
                    ref={ref}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={photos}
                    keyExtractor={(img) => img.id}
                    renderItem={({item}) => (
                        <View style={s.cardContainer}>
                            <Card
                                onAddToCollection={handleAddToCollection}
                                onImageClick={handleImage}
                                image={item}
                            />
                        </View>
                    )}
                    onEndReached={() => !moreLoading && handleLoadMore()}
                    onEndReachedThreshold={0.1}
                    scrollEnabled={!isLoading}
                    initialNumToRender={3}
                    ListFooterComponent={() => {
                        if (error) return null
                        return (
                            <View style={s.footerLoader}>
                                <ActivityIndicator
                                    color={colors.text}
                                    size='large'
                                />
                            </View>
                        )
                    }}
                />
            )}
        </Layout>
    )
}

const s = StyleSheet.create({
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    cardContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
        fontFamily: 'JosefinSans-Regular'
    },
    footerLoader: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 12,
        alignItems: 'center'
    }
})
