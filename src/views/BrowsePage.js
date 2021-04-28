import {useTheme} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
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

    const onRefresh = useCallback(() => {
        reFetchPhotos()
    }, [])

    const reFetchPhotos = () => {
        setRefreshing(true)
        setIsLoading(true)
        setJson([])
        api.getPhotos(store.getState().user.accessToken)
            .then(data => setJson(data))
            .catch(error => console.error(error))
            .finally(() => {
                setRefreshing(false)
                setIsLoading(false)
            })
    }

    const fetchPhotos = () => {
        setIsLoading(true)
        api.getPhotos(store.getState().user.accessToken)
            .then(data => setJson(data))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false))
    }

    const handleImage = url => {
        navigation.navigate({
            name: 'Modal',
            params: {url}
        })
    }
    const handleAddToCollection = photo_id => {
        navigation.navigate({
            name: 'AddToCollection',
            params: {photo_id}
        })
    }

    useEffect(() => {
        fetchPhotos()
    }, [])

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
    }
})
