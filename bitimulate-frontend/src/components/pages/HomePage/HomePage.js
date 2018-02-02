import React, { Component } from 'react';
import { PageTemplate, PolyBackground, Block } from 'components';
import { HeaderContainer } from 'containers';

export class HomePage extends Component {
  render() {
    return (
      <PageTemplate
        header={<HeaderContainer />}
      >
        <PolyBackground>
          <Block center shadow>
            <h1>
              Please Trade Here - Virtual Crypto Currency Trading Center
            </h1>
            <h2>
              You Can Trade Based On POLONIEX Live Data
            </h2>
          </Block>
        </PolyBackground>
      </PageTemplate>
    );
  }
}

export default HomePage;
