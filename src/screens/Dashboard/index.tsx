import React from "react"
import { Feather } from '@expo/vector-icons'
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName
} from './styles'
import { RFValue } from "react-native-responsive-fontsize"

export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://github.com/scarvalhos.png' }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Samara</UserName>
                        </User>
                    </UserInfo>
                    <Feather name="power" size={RFValue(24)}  />
                </UserWrapper>
            </Header>
        </Container>
    )
}