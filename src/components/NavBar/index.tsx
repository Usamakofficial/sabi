/*eslint-disable*/
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import Web3Status from 'components/Web3Status'
import { NftVariant, useNftFlag } from 'featureFlags/flags/nft'
import { chainIdToBackendName } from 'graphql/data/util'
import { useIsNftPage } from 'hooks/useIsNftPage'
import { Box } from 'nft/components/Box'
import { Row } from 'nft/components/Flex'
import logo from '../../assets/SAB.png'
// import { UniIcon } from 'nft/components/icons'
import { useIsMobile } from 'nft/hooks'
import { ReactNode, useMemo } from 'react'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'
import { ChainSelector } from './ChainSelector'
import { MenuDropdown } from './MenuDropdown'
import { ShoppingBag } from './ShoppingBag'
import * as styles from './style.css'

interface MenuItemProps {
  href: string
  id?: NavLinkProps['id']
  isActive?: boolean
  children: ReactNode
}

const MenuItem = ({ href, id, isActive, children }: MenuItemProps) => {
  return (
    <NavLink
      to={href}
      className={isActive ? styles.activeMenuItem : styles.menuItem}
      id={id}
      style={{ textDecoration: 'none' }}
    >
      {children}
    </NavLink>
  )
}

const PageTabs = () => {
  const { pathname } = useLocation()
  const nftFlag = useNftFlag()
  const { chainId: connectedChainId } = useWeb3React()
  const chainName = chainIdToBackendName(connectedChainId)

  const isPoolActive =
    pathname.startsWith('/pool') ||
    pathname.startsWith('/add') ||
    pathname.startsWith('/remove') ||
    pathname.startsWith('/increase') ||
    pathname.startsWith('/find')

  const isNftPage = useIsNftPage()

  return (
    <>
      <MenuItem href="/swap" isActive={pathname.startsWith('/swap')}>
        <Trans>Swap</Trans>
      </MenuItem>

      {nftFlag === NftVariant.Enabled && (
        <MenuItem href="/nfts" isActive={isNftPage}>
          <Trans>NFTs</Trans>
        </MenuItem>
      )}
      <MenuItem href="/pool" id={'pool-nav-link'} isActive={isPoolActive}>
        <Trans>Pool</Trans>
      </MenuItem>
      <a
        href="https://www.sabifi.io/"
        rel="noreferrer"
        className="gradient-text"
        target="_blank"
        style={{ textDecoration: 'none', fontWeight: '850' }}
      >
        <Trans>NFTs</Trans>
      </a>
    </>
  )
}

const useShouldHideNavbar = () => {
  const { pathname } = useLocation()
  const isMobile = useIsMobile()

  const shouldHideNavbar = useMemo(() => {
    const paths = ['/nfts/profile']
    if (!isMobile) return false

    for (const path of paths) {
      if (pathname.includes(path)) return true
    }

    return false
  }, [isMobile, pathname])

  return shouldHideNavbar
}

const Navbar = () => {
  const shouldHideNavbar = useShouldHideNavbar()
  const isNftPage = useIsNftPage()

  if (shouldHideNavbar) return null

  return (
    <>
      <nav className={styles.nav}>
        <Box display="flex" height="full" flexWrap="nowrap" alignItems="stretch">
          <Box className={styles.leftSideContainer}>
            <Box as="a" href="#/swap" className={styles.logoContainer}>
              <img src={logo} width="130" height="130" style={{ padding: '3px 0 0 0' }} className={styles.logo} />
            </Box>
            {!isNftPage && (
              <Box display={{ sm: 'flex', lg: 'none' }}>
                <ChainSelector leftAlign={true} />
              </Box>
            )}
            <Row gap="8" display={{ sm: 'none', lg: 'flex' }}>
              <PageTabs />
            </Row>
          </Box>
          <Box className={styles.rightSideContainer}>
            <Row gap="12">
              {isNftPage && <ShoppingBag />}
              {!isNftPage && (
                <Box display={{ sm: 'none', lg: 'flex' }}>
                  <ChainSelector />
                </Box>
              )}

              <Web3Status />
            </Row>
          </Box>
        </Box>
      </nav>
      <Box className={styles.mobileBottomBar}>
        <PageTabs />
        <Box marginY="4">
          <MenuDropdown />
        </Box>
      </Box>
    </>
  )
}

export default Navbar
