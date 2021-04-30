import {useScrollToTop, useTheme} from '@react-navigation/native'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import api from '../api/api'
import Card from '../components/common/Card'
import Layout from '../components/common/Layout'
import store from '../redux/storeConfig'

export default function BrowsePage({navigation}) {
    const {colors} = useTheme()
    const [json, setJson] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    let ref = useRef(null)

    const onRefresh = useCallback(() => {
        reFetchPhotos()
    }, [])

    const reFetchPhotos = () => {
        console.log('re-fetch')
        setRefreshing(true)
        api.getPhotos(store.getState().user.accessToken)
            .then(data => setJson(data))
            .catch(error => console.error(error))
            .finally(() => {
                setRefreshing(false)
            })
    }

    const fetchPhotos = () => {
        console.log('fetch')
        setIsLoading(true)
        api.getPhotos(store.getState().user.accessToken)
            .then(data => {
                setJson(data)
                // console.log(data)
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false))
    }

    const handleImage = (url, height, width) => {
        navigation.navigate({
            name: 'Modal',
            params: {url, height, width}
        })
    }
    const handleAddToCollection = photo_id => {
        navigation.navigate({
            name: 'AddToCollection',
            params: {photo_id}
        })
    }

    useScrollToTop(ref)

    useEffect(() => {
        fetchPhotos()
    }, [])

    const scrollEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        )
    }

    return (
        <Layout>
            {isLoading ? (
                <View style={s.loader}>
                    <ActivityIndicator color={colors.text} size="large" />
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
                <ScrollView
                    ref={ref}
                    onScroll={({nativeEvent}) => {
                        if (scrollEnd(nativeEvent)) {
                            console.log('kkk')
                        }
                    }}
                    scrollEventThrottle={1000}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={s.root}>
                    {json.map(image => (
                        <View style={s.cardContainer} key={image.id}>
                            <Card
                                onAddToCollection={handleAddToCollection}
                                onImageClick={handleImage}
                                image={image}
                            />
                        </View>
                    ))}
                </ScrollView>
                // <ScrollView
                //     ref={ref}
                //     refreshControl={
                //         <RefreshControl
                //             refreshing={refreshing}
                //             onRefresh={onRefresh}
                //         />
                //     }
                //     contentContainerStyle={s.root}>
                //         {json.map(image => (

                //     ))}
                // <View style={s.container}>
                //     <FlatList
                //         ref={ref}
                //         keyExtractor={i => i.id}
                //         data={json}
                //         renderItem={image => (
                //             <Card
                //                 onAddToCollection={handleAddToCollection}
                //                 onImageClick={handleImage}
                //                 image={image}
                //             />
                //         )}
                //     />
                // </View>

                // </ScrollView>
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
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    cardContainer: {
        // marginBottom: 12,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
        fontFamily: 'JosefinSans-Regular'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    container: {
        flex: 1,
        height: '100%'
    }
})
