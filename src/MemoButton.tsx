import React, {memo} from 'react';
import {Button} from "@mui/material";

type MemoButtonPT = {
    variant: "text" | "outlined" | "contained" | undefined
    onClick: () => void
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    nameButton: string
}



export const MemoButton: React.FC<MemoButtonPT> = memo(
    ({variant, onClick, color, nameButton}, ...rest) => {
        console.log(`Button: ${nameButton}`)
        return (
            <Button variant={variant}
                    onClick={onClick}
                    color={color}
                    {...rest}
            >{nameButton}</Button>
        )
    }
)

/*type MemoButtonPT = ButtonProps & {
    children: React.ReactNode
}*/

/*

export const MemoButton: React.FC<MemoButtonPT> = memo(
    ({children}, ...otherProps) => {
        console.log(`Button: ${children}`)
        return (
            <Button {...otherProps}>{children}</Button>
        )
    }
)*/
