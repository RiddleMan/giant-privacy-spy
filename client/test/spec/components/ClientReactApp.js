'use strict';

describe('ClientReactApp', () => {
  let React = require('react/addons');
  let ClientReactApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ClientReactApp = require('components/ClientReactApp.js');
    component = React.createElement(ClientReactApp);
  });

  it('should create a new instance of ClientReactApp', () => {
    expect(component).toBeDefined();
  });
});
