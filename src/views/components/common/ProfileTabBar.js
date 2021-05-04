import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileTabBar({
  state,
  descriptors,
  navigation,
  position,
  colors,
}) {
  return (
    <View style={[s.tabBar, {backgroundColor: colors.card}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon
            : 'emoticon-confused';

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolateNode(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.4)),
        });
        const backgroundOpacity = Animated.interpolateNode(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <Pressable
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[s.iconText, s.tab]}>
            <Animated.View
              style={[
                s.tabBackground,
                {
                  backgroundColor: colors.cardHeader,
                  opacity: backgroundOpacity,
                },
              ]}
            />
            <Animated.View style={[s.metaIcons, {opacity}]}>
              <MaterialCommunityIcons
                color={colors.text}
                name={icon}
                size={18}
              />
            </Animated.View>
            <Animated.Text
              style={[
                s.tabsText,
                {
                  opacity,
                  color: colors.text,
                },
              ]}>
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  tabBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',

    borderRadius: 4,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'absolute',
    padding: 8,
    backgroundColor: 'green',
  },
  root: {
    height: '100%',
    // backgroundColor: 'green'
  },
  text: {
    marginTop: 12,
    fontSize: 28,
  },
  subText: {
    marginTop: 4,
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
  },
  headerWrapper: {
    // height: 200,
    padding: 12,
  },
  metaIcons: {
    paddingRight: 6,
  },
  tab: {
    justifyContent: 'center',
    height: 40,

    // padding: 6,
  },
  tabsText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
