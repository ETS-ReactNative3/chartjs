import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Components/Home/home';
import Link from './Components/Home/home';

Enzyme.configure({ adapter: new Adapter() });

describe('<Home/>', () => {



  

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    const wrapper=shallow(<Home />);
      expect(wrapper.find(Link)).toHaveLength(4);
  });
});
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
