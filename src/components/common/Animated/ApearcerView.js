import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

const ApearcerView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const swipeAnim = useRef(new Animated.Value(50)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(swipeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // callback
    });

    return () => {
      console.log('un');
    };
  }, [fadeAnim, swipeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
        transform: [{translateY: swipeAnim}],
      }}>
      {props.children}
    </Animated.View>
  );
};

export default ApearcerView;
