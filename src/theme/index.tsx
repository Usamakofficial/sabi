import React, { useMemo } from 'react'
import { Text, TextProps as TextPropsOriginal } from 'rebass'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components/macro'

import { cssStringFromTheme } from '../nft/css/cssStringFromTheme'
import { darkTheme } from '../nft/themes/darkTheme'
import { useIsDarkMode } from '../state/user/hooks'
import { colors as ColorsPalette, colorsDark, colorsLight } from './colors'
import { AllColors, Colors, ThemeColors } from './styled'
import { opacify } from './utils'

export * from './components'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  deprecated_upToExtraSmall: 500,
  deprecated_upToSmall: 720,
  deprecated_upToMedium: 960,
  deprecated_upToLarge: 1280,
}

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
}

// deprecated - please use the animations.ts file
const transitions = {
  duration: {
    slow: '500ms',
    medium: '250ms',
    fast: '125ms',
  },
  timing: {
    ease: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
}

const opacities = {
  hover: 0.6,
  click: 0.4,
}

const deprecated_mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(
  MEDIA_WIDTHS
).reduce((accumulator, size) => {
  ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {}) as any

const deprecated_white = ColorsPalette.black
const deprecated_black = ColorsPalette.black

function uniswapThemeColors(darkMode: boolean): ThemeColors {
  return {
    userThemeColor: darkMode ? colorsDark.userThemeColor : colorsDark.userThemeColor,

    background: darkMode ? colorsDark.background : colorsDark.background,
    backgroundBackdrop: darkMode ? colorsDark.backgroundBackdrop : colorsDark.backgroundBackdrop,
    backgroundSurface: darkMode ? colorsDark.backgroundSurface : colorsDark.backgroundSurface,
    backgroundModule: darkMode ? colorsDark.backgroundModule : colorsDark.backgroundModule,
    backgroundFloating: darkMode ? colorsDark.backgroundFloating : colorsDark.backgroundFloating,
    backgroundInteractive: darkMode ? colorsDark.backgroundInteractive : colorsDark.backgroundInteractive,
    backgroundOutline: darkMode ? colorsDark.backgroundOutline : colorsDark.backgroundOutline,
    backgroundScrim: darkMode ? colorsDark.backgroundScrim : colorsDark.backgroundScrim,

    textPrimary: darkMode ? colorsDark.textPrimary : colorsDark.textPrimary,
    textSecondary: darkMode ? colorsDark.textSecondary : colorsDark.textSecondary,
    textTertiary: darkMode ? colorsDark.textTertiary : colorsDark.textTertiary,

    accentAction: darkMode ? colorsDark.accentAction : colorsDark.accentAction,
    accentActive: darkMode ? colorsDark.accentActive : colorsDark.accentActive,
    accentSuccess: darkMode ? colorsDark.accentSuccess : colorsDark.accentSuccess,
    accentWarning: darkMode ? colorsDark.accentWarning : colorsDark.accentWarning,
    accentFailure: darkMode ? colorsDark.accentFailure : colorsDark.accentFailure,
    accentCritical: darkMode ? colorsDark.accentCritical : colorsDark.accentCritical,

    accentActionSoft: darkMode ? colorsDark.accentActionSoft : colorsDark.accentActionSoft,
    accentActiveSoft: darkMode ? colorsDark.accentActiveSoft : colorsDark.accentActiveSoft,
    accentSuccessSoft: darkMode ? colorsDark.accentSuccessSoft : colorsDark.accentSuccessSoft,
    accentWarningSoft: darkMode ? colorsDark.accentWarningSoft : colorsDark.accentWarningSoft,
    accentFailureSoft: darkMode ? colorsDark.accentFailureSoft : colorsDark.accentFailureSoft,

    accentTextDarkPrimary: darkMode ? colorsDark.accentTextDarkPrimary : colorsDark.accentTextDarkPrimary,
    accentTextDarkSecondary: darkMode ? colorsDark.accentTextDarkSecondary : colorsDark.accentTextDarkSecondary,
    accentTextDarkTertiary: darkMode ? colorsDark.accentTextDarkTertiary : colorsDark.accentTextDarkTertiary,

    accentTextLightPrimary: darkMode ? colorsDark.accentTextLightPrimary : colorsDark.accentTextLightPrimary,
    accentTextLightSecondary: darkMode ? colorsDark.accentTextLightSecondary : colorsDark.accentTextLightSecondary,
    accentTextLightTertiary: darkMode ? colorsDark.accentTextLightTertiary : colorsDark.accentTextLightTertiary,

    white: ColorsPalette.black,
    black: ColorsPalette.black,

    // chain colors are same for light/dark mode
    chain_1: colorsDark.chain_1,
    chain_3: colorsDark.chain_3,
    chain_4: colorsDark.chain_4,
    chain_5: colorsDark.chain_5,
    chain_10: colorsDark.chain_10,
    chain_137: colorsDark.chain_137,
    chain_42: colorsDark.chain_42,
    chain_420: colorsDark.chain_420,
    chain_42161: colorsDark.chain_42161,
    chain_421611: colorsDark.chain_421611,
    chain_80001: colorsDark.chain_80001,

    shallowShadow: darkMode ? colorsDark.shallowShadow : colorsDark.shallowShadow,
    deepShadow: darkMode ? colorsDark.deepShadow : colorsDark.deepShadow,
    hoverState: opacify(24, ColorsPalette.blue200),
    hoverDefault: opacify(8, ColorsPalette.gray200),
    stateOverlayHover: darkMode ? colorsDark.stateOverlayHover : colorsDark.stateOverlayHover,
    stateOverlayPressed: darkMode ? colorsDark.stateOverlayPressed : colorsDark.stateOverlayPressed,
  }
}

function oldColors(darkMode: boolean): Colors {
  return {
    darkMode,
    // base
    deprecated_white,
    deprecated_black,

    // text
    deprecated_text1: darkMode ? colorsDark.textPrimary : colorsDark.textPrimary,
    deprecated_text2: darkMode ? colorsDark.textSecondary : colorsDark.textSecondary,
    deprecated_text3: darkMode ? colorsDark.textTertiary : colorsDark.textTertiary,
    deprecated_text4: darkMode ? ColorsPalette.gray200 : ColorsPalette.gray200,
    deprecated_text5: darkMode ? ColorsPalette.gray500 : ColorsPalette.gray500,

    // backgrounds / grays
    deprecated_bg0: darkMode ? ColorsPalette.gray900 : ColorsPalette.gray900,
    deprecated_bg1: darkMode ? ColorsPalette.gray800 : ColorsPalette.gray800,
    deprecated_bg2: darkMode ? ColorsPalette.gray700 : ColorsPalette.gray700,
    deprecated_bg3: darkMode ? ColorsPalette.gray600 : ColorsPalette.gray600,
    deprecated_bg4: darkMode ? ColorsPalette.gray500 : ColorsPalette.gray500,
    deprecated_bg5: darkMode ? ColorsPalette.gray400 : ColorsPalette.gray400,
    deprecated_bg6: darkMode ? ColorsPalette.gray300 : ColorsPalette.gray300,

    //specialty colors
    deprecated_modalBG: darkMode ? opacify(40, ColorsPalette.black) : opacify(40, ColorsPalette.black),
    deprecated_advancedBG: darkMode ? opacify(10, ColorsPalette.black) : opacify(10, ColorsPalette.black),

    //primary colors
    deprecated_primary1: darkMode ? colorsDark.accentAction : colorsLight.accentAction,
    deprecated_primary2: darkMode ? ColorsPalette.blue400 : ColorsPalette.blue400,
    deprecated_primary3: darkMode ? ColorsPalette.blue300 : ColorsPalette.blue300,
    deprecated_primary4: darkMode ? '#376bad70' : '#376bad70',
    deprecated_primary5: darkMode ? '#153d6f70' : '#153d6f70',

    // color text
    deprecated_primaryText1: darkMode ? colorsDark.accentAction : colorsDark.accentAction,

    // secondary colors
    deprecated_secondary1: darkMode ? colorsDark.accentAction : colorsDark.accentAction,
    deprecated_secondary2: darkMode ? opacify(25, ColorsPalette.gray900) : opacify(25, ColorsPalette.gray900),
    deprecated_secondary3: darkMode ? opacify(25, ColorsPalette.gray900) : opacify(25, ColorsPalette.gray900),

    // other
    deprecated_red1: darkMode ? colorsDark.accentFailure : colorsDark.accentFailure,
    deprecated_red2: darkMode ? colorsDark.accentFailure : colorsDark.accentFailure,
    deprecated_red3: darkMode ? colorsDark.accentFailure : colorsDark.accentFailure,
    deprecated_green1: darkMode ? colorsDark.accentSuccess : colorsDark.accentSuccess,
    deprecated_yellow1: ColorsPalette.yellow400,
    deprecated_yellow2: ColorsPalette.yellow500,
    deprecated_yellow3: ColorsPalette.yellow600,
    deprecated_blue1: darkMode ? colorsDark.accentAction : colorsDark.accentAction,
    deprecated_blue2: darkMode ? colorsDark.accentAction : colorsDark.accentAction,
    deprecated_error: darkMode ? colorsDark.accentFailure : colorsDark.accentFailure,
    deprecated_success: darkMode ? colorsDark.accentSuccess : colorsDark.accentSuccess,
    deprecated_warning: darkMode ? colorsDark.accentWarning : colorsDark.accentWarning,

    // dont wanna forget these blue yet
    deprecated_blue4: darkMode ? '#153d6f70' : '#153d6f70',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
    // deprecated_blue5: '#869EFF',
  }
}

function getTheme(darkMode: boolean): DefaultTheme {
  return {
    ...uniswapThemeColors(darkMode),
    ...oldColors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#000',

    // media queries
    deprecated_mediaWidth: deprecated_mediaWidthTemplates,

    // deprecated - please use hardcoded exported values instead of
    // adding to the theme object
    breakpoint: BREAKPOINTS,
    transition: transitions,
    opacity: opacities,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()
  const themeObject = useMemo(() => getTheme(darkMode), [darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof AllColors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

/**
 * Preset styles of the Rebass Text component
 */
export const ThemedText = {
  BodyPrimary(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'textPrimary'} {...props} />
  },
  BodySecondary(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'textSecondary'} {...props} />
  },
  HeadlineSmall(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={20} lineHeight="28px" color={'textPrimary'} {...props} />
  },
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={36} color={'textPrimary'} {...props} />
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={14} color={'accentAction'} {...props} />
  },
  MediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={20} color={'textPrimary'} {...props} />
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={16} color={'textPrimary'} {...props} />
  },
  SubHeaderSmall(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={14} color={'textSecondary'} {...props} />
  },
  DeprecatedMain(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'deprecated_text2'} {...props} />
  },
  DeprecatedLink(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'deprecated_primary1'} {...props} />
  },
  DeprecatedLabel(props: TextProps) {
    return <TextWrapper fontWeight={600} color={'deprecated_text1'} {...props} />
  },
  DeprecatedBlack(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'deprecated_text1'} {...props} />
  },
  DeprecatedWhite(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'deprecated_white'} {...props} />
  },
  DeprecatedBody(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'deprecated_text1'} {...props} />
  },
  DeprecatedLargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  DeprecatedMediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  DeprecatedSubHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  DeprecatedSmall(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  DeprecatedBlue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'deprecated_blue1'} {...props} />
  },
  DeprecatedYellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'deprecated_yellow3'} {...props} />
  },
  DeprecatedDarkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'deprecated_text3'} {...props} />
  },
  DeprecatedGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'deprecated_bg3'} {...props} />
  },
  DeprecatedItalic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'deprecated_text2'} {...props} />
  },
  DeprecatedError({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'deprecated_red1' : 'deprecated_text2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.deprecated_text1};
  background-color: linear-gradient(to left, #e4d7c5, #c7a210) !important;
}

a {
 color: ${({ theme }) => theme.deprecated_blue1}; 
}

:root {
  ${({ theme }) => (theme.darkMode ? cssStringFromTheme(darkTheme) : cssStringFromTheme(darkTheme))}
}
`
