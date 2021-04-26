/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
import Card from '../components/common/Card'
import Layout from '../components/common/Layout'

export default function BrowsePage({ref}) {
    const [mounted, setMounted] = useState(false)
    const {colors} = useTheme()
    const [json, setJson] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        reFetchPhotos()
    }, [])

    const reFetchPhotos = () => {
        setRefreshing(true)
        fetch(
            `https://api.unsplash.com/photos?client_id=b5GmlhbzhvbS8olwRMHJydH1_w3NNqIi51jZuJBSepw`
        )
            .then(response => response.json())
            .then(json => setJson(json))
            .catch(error => console.error(error))
            .finally(() => setRefreshing(false))
    }

    const fetchPhotos = () => {
        setIsLoading(true)
        fetch(
            `https://api.unsplash.com/photos?client_id=b5GmlhbzhvbS8olwRMHJydH1_w3NNqIi51jZuJBSepw`
        )
            .then(response => response.json())
            .then(json => setJson(json))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchPhotos()
    }, [mounted])

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
                            <Card image={image} />
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
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
        fontFamily: 'JosefinSans-Regular'
    },
    cardContainer: {
        // marginBottom: 12
    }
})
