import { ViewStyle } from "react-native";

//tout mettre d'un coup dans le shadow je pense que la plateforme gérera nativament cela ou alors le compileur
export const Shadows = {
    dp2: {
        shadowOpacity: 0.2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2
    }
}satisfies Record<string, ViewStyle>