import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import SentEmail from './SentEmail';

describe('<SentEmail />', () => {

  let component;

  beforeEach(() => {
    const wrapper = mount(
      <SentEmail location={{query: {email: 'foo@bar.com' }}} />
    );

    component = wrapper.find(SentEmail);
  })

  it('should render correctly', () => { expect(component.exists()).to.be.true; });

  it('should render <div> containing <h1 class="checkEmail">', () => {
    const headerDiv = component.find('div').at(1);
    const headerDivChildren = component.find('div').at(1).children().first();

    expect(headerDiv.exists()).to.be.true;
    expect(headerDiv.children()).has.length(1);

    expect(headerDivChildren.name()).to.equal('h1');
    expect(headerDivChildren.hasClass('checkEmail')).to.be.true;
    expect(headerDivChildren.text()).to.equal('Check your email');
  });

});
