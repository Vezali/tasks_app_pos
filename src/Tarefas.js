import React, { useLayoutEffect, useRef } from 'react'
import { StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import TaskList from './Tarefas/TaskList'
import TarefaForm from './TarefaForm'
import { LoginStyles } from './LoginStyles'
import user from './service/user'

const Tab = createBottomTabNavigator()

const bottomBarOptions = {
    activeTintColor: '#047857'
}

const btnStyles = StyleSheet.create({
    btn: {
        width: 28,
        height: 28
    }
})

const GearsIcon = () => (<Image source={require('./assets/gears.png')} style={btnStyles.btn} />)
const AddIcon = () => (<Image source={require('./assets/add.png')} style={btnStyles.btn} />)
const LogoutIcon = () => (<Image source={require('./assets/logout.png')} style={btnStyles.btn} />)

const options = ({ route }) => {
    return {
        tabBarIcon: () => {
            if (route.name == 'Adicionar') return <AddIcon />
            return <GearsIcon />
        }
    }
}

const LogoutButton = ({ onLogout }) => (
    <TouchableOpacity onPress={onLogout}>
        <LogoutIcon />
    </TouchableOpacity>
)

export default function Tasks({ navigation }) {
    const modalizeRef = useRef(null);

    const onOpen = () => {
        if (modalizeRef.current) modalizeRef.current.open()
    }

    const closeModal = () => {
        if (modalizeRef.current) modalizeRef.current.close()
    }

    const logout = () => {
        user.id = ''
        user.name = ''
        navigation.dispatch(StackActions.popToTop())
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
            headerRight: () => <LogoutButton onLogout={() => onOpen()} />
        })
    }, [navigation])
    
    const tabListeners = {
        focus: (evt) => { console.log('user tasks') }
    }

    return (
        <>
            <Tab.Navigator 
                tabBarOptions={bottomBarOptions} 
                screenOptions={options}>
                <Tab.Screen name="Tarefas" 
                    component={TaskList} 
                    listeners={tabListeners} />
                <Tab.Screen name="Adicionar" component={TarefaForm} />
            </Tab.Navigator>

            <Modalize ref={modalizeRef} modalHeight={160}>
                <Text>Deseja sair do aplicativo ?</Text>

                <TouchableOpacity style={LoginStyles.btnAcessar}
                    onPress={logout}>
                    <Text style={LoginStyles.btnAcessarText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={LoginStyles.btnAcessar}
                    onPress={closeModal}>
                    <Text style={LoginStyles.btnAcessarText}>Não</Text>
                </TouchableOpacity>
            </Modalize>
        </>
    )
}
