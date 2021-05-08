import {useTheme} from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from 'react'
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserCollections} from '../../../../redux/actions/collectionAction'
import CollectionCard from '../../../components/common/CollectionCard'

export default function CollectionsTab({navigation}) {
    const {colors} = useTheme()
    const {userCollections} = useSelector((state) => state.collections)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        dispatch(fetchUserCollections()).then(() => setRefreshing(false))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchUserCollections()).then(() => setIsLoading(false))
    }, [dispatch])

    return (
        <>
            {isLoading ? (
                <View style={s.loader}>
                    <ActivityIndicator color={colors.text} size='large' />
                </View>
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={{
                        paddingTop: 12,
                        alignItems: 'center'
                    }}>
                    {userCollections.map((collection) => (
                        <CollectionCard
                            collection={collection}
                            colors={colors}
                            onPress={() =>
                                navigation.navigate({
                                    name: 'Collection Content',
                                    params: {collection}
                                })
                            }
                            key={collection.id}
                        />
                    ))}
                </ScrollView>
            )}
        </>
    )
}

const s = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
