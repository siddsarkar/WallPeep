import {useTheme} from '@react-navigation/native'
import React from 'react'
import {Text} from 'react-native'
import Layout from '../components/common/Layout'

export default function RegisterPage() {
  const {colors} = useTheme()
  return (
    <Layout>
      <Text style={{color: colors.text}}>Register</Text>
    </Layout>
  )
}
