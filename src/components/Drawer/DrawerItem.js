import React from 'react'
import { StyleSheet, Image } from 'react-native'
import {
    DrawerItem
} from '@react-navigation/drawer';

const DrawerItemComponent = ({img, label, onPress}) => {
    return (
        
        <DrawerItem 
            icon={() => (
                <Image 
                    source= {img}
                    size = {20}

                />
            )}
            label= {label}
            onPress={onPress}
        />
    
    )
}

export default DrawerItemComponent

const styles = StyleSheet.create({})
