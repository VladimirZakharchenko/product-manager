import { Button as AntdButton } from 'antd';

type ButtonProps ={
    text: string
    bgColor?: string
    color?: string
}

export const Button = (props : ButtonProps) => {
    return(
        <AntdButton>{props.text}</AntdButton>
    )
}