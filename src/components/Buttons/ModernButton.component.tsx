import React, { FC } from 'react';
import styled from 'styled-components';

import { ButtonVariant, TextButtonProps } from './Button.types';
import { ButtonPadding, DefaultButtonThemes } from './Button.constants';
import { FontSize } from '../../config';
import { Colors } from '../../config';
import { BaseButton } from './BaseButton.component';

const StyledButton = styled(BaseButton)<TextButtonProps>(
    (props) => `
    position: relative;
    padding: ${props.buttonPadding || ButtonPadding.default};
    width: fit-content;
    font-size: ${props.fontSize || FontSize.default};
    color: ${getTextColorForVariant(props)};
    background-color: ${getBackgroundColorForVariant(props)};
    border: solid 0.125em ${resolveBorderColor(props)};
    transition: all 0.4s;
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
    box-sizing: content-box;

    &:focus,
    &:active {
        outline: ${resolveBorderColor(props)};
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
        width: 0;
        opacity: 1;
        z-index: -1;
        transition: all 0.15s ease;
    }

    &:hover::after {
        content: '';
        position: absolute;
        top: -2%;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${resolveBackgroundColor(props)};
        border: none;
        height: 104%;
        width: 101%;
        opacity: 1;
        z-index: -1;
    }
    &:hover {
        border: solid 0.125em ${resolveBorderColor(props)};
        color: ${resolveTextColor(props)};
    }
`
);

const getBackgroundColorForVariant = (props: TextButtonProps) => {
    switch (props.buttonVariant) {
        case ButtonVariant.OUTLINE:
            return Colors.TRANSPARENT;
        case ButtonVariant.SOLID:
            return resolveBackgroundColor(props);
    }
};

const resolveBackgroundColor = ({ buttonTheme, disabled }: TextButtonProps) => {
    let color =
        buttonTheme?.backgroundColor ||
        DefaultButtonThemes.PRIMARY.backgroundColor;
    return disabled
        ? buttonTheme?.disabledBackgroundColor ||
              DefaultButtonThemes.PRIMARY.disabledBackgroundColor
        : color;
};

const resolveBorderColor = ({ buttonTheme, disabled }: TextButtonProps) => {
    let color =
        buttonTheme?.borderColor || DefaultButtonThemes.PRIMARY.borderColor;
    return disabled
        ? buttonTheme?.disabledBorderColor ||
              DefaultButtonThemes.PRIMARY.disabledBorderColor
        : color;
};

const getTextColorForVariant = (props: TextButtonProps) => {
    switch (props.buttonVariant) {
        case ButtonVariant.OUTLINE:
            return resolveBorderColor(props);
        case ButtonVariant.SOLID:
            return resolveTextColor(props);
    }
};

const resolveTextColor = ({ disabled, buttonTheme }: TextButtonProps) => {
    let color =
        buttonTheme?.contentColor || DefaultButtonThemes.PRIMARY.contentColor;
    return disabled
        ? buttonTheme?.disabledContentColor ||
              DefaultButtonThemes.PRIMARY.disabledContentColor
        : color;
};

export const ModernButton: FC<TextButtonProps> = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};
