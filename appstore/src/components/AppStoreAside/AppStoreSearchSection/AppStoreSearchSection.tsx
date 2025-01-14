import * as React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withBurgerMenuStatus, { WithBurgerMenuStatus } from '@src/HOC/withBurgerMenuStatus';
import { screenHash } from '@src/shared/constants/constants';
import { SET_BURGER_STATUS } from '@src/graphql/schemes/burgerMenu';
import { SET_SEARCH_STRING } from '@src/graphql/schemes/search';
import { MutateSetBurgerStatusProps } from '@src/graphql/types/mutateSetBurgerStatus';
import { MutateSetSearchStringProps } from '@src/graphql/types/mutateSetSearchString';

import AppStoreSearchInput from './AppStoreSearchInput/AppStoreSearchInput';
import styles, { IClasses } from './styles';

const asideSvgSpitePath: string = require('../aside-svg-spite.svg');

export interface AppStoreSearchSectionProps {
  classes?: IClasses,
  appStoreContext: number,
}

type Props = AppStoreSearchSectionProps
  & WithBurgerMenuStatus
  & MutateSetBurgerStatusProps
  & MutateSetSearchStringProps;

@injectSheet(styles)
class AppStoreSearchSection extends React.PureComponent<Props, {}> {

  private iconsPaths = {
    burgerIcon: `${asideSvgSpitePath}#i--burger`,
    crossIcon: `${asideSvgSpitePath}#i--cross`,
  };

  onLogoClick = () => {
    this.props.mutateSetSearchString({
      variables: {
        searchString: '',
        searchStringAfterEnterPress: '',
        isEnterPressed: false,
      },
    });

    if (this.props.isBurgerOpen) {
      this.toggleMenu(!this.props.isBurgerOpen);
    }
  }

  toggleMenu(isBurgerOpen: boolean) {
    this.props.mutateSetBurgerStatus({
      variables: {
        isBurgerOpen,
      },
    });
  }

  render() {
    const { classes, isBurgerOpen, appStoreContext } = this.props;

    return (
      <div className={classes!.searchSection}>
        <div className={classes!.content}>
          <Link to={{ pathname: '/' , hash: screenHash.MOST_POPULAR }} className={classes?.link}>
            <div onClick={this.onLogoClick} className={classes!.title}>
              <svg className={classes!.logo} xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23">
                <defs>
                  <linearGradient id="a" x1="50%" x2="50%" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="#1410B8" />
                    <stop offset="100%" stopColor="#4ED8E4" />
                  </linearGradient>
                </defs>
                {/* tslint:disable-next-line:max-line-length */}
                <path fill="url(#a)" fillRule="nonzero" d="M13.383 5.9h-7.69c.344 1.747 1.935 3.068 3.845 3.068 1.91 0 3.501-1.321 3.845-3.068zm0-1.416c-.344-1.747-1.934-3.068-3.845-3.068-1.91 0-3.5 1.32-3.844 3.068h7.689zM4.207 5.9h-2.74V19.35c0 .782.657 1.416 1.468 1.416h13.207c.81 0 1.467-.634 1.467-1.416V5.9h-2.74c-.357 2.532-2.608 4.484-5.33 4.484-2.723 0-4.974-1.952-5.332-4.484zm0-1.416C4.565 1.95 6.816 0 9.538 0c2.723 0 4.974 1.951 5.331 4.484h3.719c.27 0 .489.211.489.472V19.35c0 1.564-1.314 2.832-2.935 2.832H2.935C1.314 22.183 0 20.915 0 19.351V4.956a.48.48 0 0 1 .49-.472h3.717zm1.94 9.375v-1.416h7.109v1.416H6.147zm0-1.416h7.109v1.416H6.147v-1.416zm-.458-7.96a4.01 4.01 0 0 0 0 1.417h7.703a4.275 4.275 0 0 0 0-1.416H5.69z" />
              </svg>
              <div className={classes!.logoText}>Cloudworkz App Store</div>
            </div>
          </Link>

          <svg onClick={() => this.toggleMenu(!isBurgerOpen)} className={classes!.burger}>
            <use xlinkHref={isBurgerOpen ? this.iconsPaths.crossIcon : this.iconsPaths.burgerIcon} />
          </svg>
        </div>

        <AppStoreSearchInput appStoreContext={appStoreContext} />
      </div>
    );
  }
}

export default compose(
  withBurgerMenuStatus,
  graphql(SET_BURGER_STATUS, { name: 'mutateSetBurgerStatus' }),
  graphql(SET_SEARCH_STRING, { name: 'mutateSetSearchString' }),
)(AppStoreSearchSection);
