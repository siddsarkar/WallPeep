import React, {useEffect, useRef} from 'react'
import {Animated} from 'react-native'

export default ({style, children}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const swipeAnim = useRef(new Animated.Value(50)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(swipeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            })
        ]).start()
    }, [fadeAnim, swipeAnim])

    return (
        <Animated.View
            style={{
                ...style,
                opacity: fadeAnim,
                transform: [{translateY: swipeAnim}]
            }}>
            {children}
        </Animated.View>
    )
}
