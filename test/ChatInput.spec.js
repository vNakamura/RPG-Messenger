import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';

import TextareaAutoresize from 'react-textarea-autosize';
import { ChatInput } from '../src/components/ChatInput';

describe('<ChatInput />', function () {
  const sendAction = spy();

  it('should have a <TextareaAutoresize /> component', function () {
    const wrapper = shallow(<ChatInput  onSend={sendAction} />);
    expect(wrapper).to.have.exactly(1).descendants(TextareaAutoresize);
  });

  it('should have a send button only if text input has content', function () {
    const wrapper = shallow(<ChatInput  onSend={sendAction} />);
    expect(wrapper).to.not.have.descendants('button');
    wrapper.setState({ text: 'abc' });
    expect(wrapper).to.have.exactly.descendants('button');
  });

  it('should trim the message before sending and then clean the input field', function () {
    sendAction.reset()
    const wrapper = shallow(<ChatInput onSend={sendAction} />);
    wrapper.setState({ text: ' ab c \n' });
    wrapper.find('button').simulate('click');
    expect(sendAction).to.have.been.calledOnce;
    expect(wrapper).to.have.state('text').equal('');
  });

});
