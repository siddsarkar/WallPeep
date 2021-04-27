/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useTheme} from '@react-navigation/native'
import React from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {
    DebugInstructions,
    Header,
    ReloadInstructions
} from 'react-native/Libraries/NewAppScreen'
import Layout from '../components/common/Layout'
import Section from '../components/common/Section'

const LandingPage = () => {
    const {colors} = useTheme()

    const backgroundStyle = {
        backgroundColor: colors.background
    }

    return (
        <Layout>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <Header />
                <View style={backgroundStyle}>
                    <Section title="Step One">
                        Edit <Text style={styles.highlight}>App.js</Text> to
                        change this screen and then come back to see your edits.
                    </Section>
                    <Section title="See Your Changes">
                        <ReloadInstructions />
                    </Section>
                    <Section title="Debug">
                        <DebugInstructions />
                    </Section>
                    <Section title="Learn More">
                        Read the docs to discover what to do next:
                    </Section>
                </View>
            </ScrollView>
        </Layout>
    )
}

export default LandingPage

const styles = StyleSheet.create({
    highlight: {
        fontWeight: '700'
    }
})
