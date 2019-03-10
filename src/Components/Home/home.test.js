import React from 'react';

// import {  shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import Home from './home';
// import Link from '../Home/home';



describe('<Home/>', () => {
    
    it('should render two <home/> elements if not authenticated', () => {
        let wrapper=shallow(<Home/>)
        expect(wrapper).toHaveLength(1);
    });
});